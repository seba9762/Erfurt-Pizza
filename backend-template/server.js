require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paypal = require('@paypal/checkout-server-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// CORS configuration - support multiple origins
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:8080',
    'https://erfurtpizza.com',
    'https://www.erfurtpizza.com'
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked origin: ${origin}`);
            callback(null, false);
        }
    },
    credentials: true
}));

// Body parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting (simple in-memory implementation)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100;

app.use((req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requestCounts.has(ip)) {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else {
        const record = requestCounts.get(ip);
        if (now > record.resetTime) {
            record.count = 1;
            record.resetTime = now + RATE_LIMIT_WINDOW;
        } else {
            record.count++;
            if (record.count > RATE_LIMIT_MAX_REQUESTS) {
                return res.status(429).json({
                    success: false,
                    error: 'Too many requests. Please try again later.'
                });
            }
        }
    }
    next();
});

// Clean up old rate limit records periodically
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of requestCounts.entries()) {
        if (now > record.resetTime) {
            requestCounts.delete(ip);
        }
    }
}, RATE_LIMIT_WINDOW);

// ==================== PAYPAL CONFIGURATION ====================

function getPayPalClient() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const environment = process.env.PAYPAL_MODE === 'live'
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(clientId, clientSecret);

    return new paypal.core.PayPalHttpClient(environment);
}

// ==================== PAYPAL ENDPOINTS ====================

// Create PayPal Order
app.post('/api/create-paypal-order', async (req, res) => {
    try {
        const { orderData } = req.body;

        // Extract amount (remove € and convert to number)
        const amount = parseFloat(orderData.total.replace(/[^0-9.,]/g, '').replace(',', '.'));

        // Create PayPal order request
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: amount.toFixed(2)
                },
                description: `Erfurt Pizza Order - ${orderData.name}`
            }],
            application_context: {
                brand_name: 'Erfurt Pizza',
                landing_page: 'BILLING',
                user_action: 'PAY_NOW',
                return_url: `${process.env.FRONTEND_URL}/payment-success.html`,
                cancel_url: `${process.env.FRONTEND_URL}/payment-cancel.html`
            }
        });

        // Execute PayPal request
        const client = getPayPalClient();
        const response = await client.execute(request);

        // Find approval URL
        const approvalUrl = response.result.links.find(link => link.rel === 'approve').href;

        res.json({
            success: true,
            orderId: response.result.id,
            approvalUrl: approvalUrl
        });

    } catch (error) {
        console.error('PayPal order creation error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Capture PayPal Payment
app.post('/api/capture-paypal-payment', async (req, res) => {
    try {
        const { orderId } = req.body;

        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const client = getPayPalClient();
        const response = await client.execute(request);

        if (response.result.status === 'COMPLETED') {
            res.json({
                success: true,
                verified: true,
                paymentId: response.result.id,
                status: response.result.status
            });
        } else {
            res.json({
                success: false,
                verified: false,
                status: response.result.status
            });
        }

    } catch (error) {
        console.error('PayPal capture error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ==================== STRIPE ENDPOINTS ====================

// Create Stripe Checkout Session
app.post('/api/create-stripe-session', async (req, res) => {
    try {
        const { orderData } = req.body;

        // Extract amount
        const amount = parseFloat(orderData.total.replace(/[^0-9.,]/g, '').replace(',', '.'));

        // Build line items from cart
        const lineItems = orderData.cart.map(item => {
            const itemName = item.size ? `${item.name} (${item.size})` : item.name;
            const basePrice = item.price;
            const extrasPrice = (item.extras || []).reduce((sum, extra) => sum + extra.price, 0);
            const itemUnitPrice = basePrice + extrasPrice;
            const priceInCents = Math.round(itemUnitPrice * 100);

            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: itemName,
                        description: item.extras && item.extras.length > 0
                            ? `Mit: ${item.extras.map(e => e.name).join(', ')}`
                            : undefined
                    },
                    unit_amount: priceInCents,
                },
                quantity: item.quantity,
            };
        });

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancel.html`,
            customer_email: orderData.email || undefined,
        });

        res.json({
            success: true,
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error('Stripe session creation error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Verify Stripe Payment
app.get('/api/verify-stripe-payment', async (req, res) => {
    try {
        const { session_id } = req.query;

        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            res.json({
                success: true,
                verified: true,
                paymentId: session.payment_intent,
                status: session.payment_status
            });
        } else {
            res.json({
                success: false,
                verified: false,
                status: session.payment_status
            });
        }

    } catch (error) {
        console.error('Stripe verification error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ==================== SAVE ORDER ====================

app.post('/api/save-order', async (req, res) => {
    try {
        const { orderData, paymentId, paymentMethod } = req.body;

        // Generate unique order ID
        const orderId = 'EP' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Log order (in production, save to database)
        console.log('Order saved:', {
            orderId,
            customerName: orderData.name,
            total: orderData.total,
            paymentMethod,
            paymentId,
            timestamp: new Date().toISOString()
        });

        // TODO: Save to database
        // await db.orders.create({ ... });

        res.json({
            success: true,
            orderId: orderId
        });

    } catch (error) {
        console.error('Order save error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ==================== HEALTH CHECK ====================

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        environment: ENVIRONMENT,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

app.get('/', (req, res) => {
    res.json({
        name: 'Erfurt Pizza Backend API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: '/health',
            paypal: {
                createOrder: 'POST /api/create-paypal-order',
                capturePayment: 'POST /api/capture-paypal-payment'
            },
            stripe: {
                createSession: 'POST /api/create-stripe-session',
                verifyPayment: 'GET /api/verify-stripe-payment'
            },
            orders: {
                save: 'POST /api/save-order'
            }
        }
    });
});

// ==================== ERROR HANDLING ====================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: ENVIRONMENT === 'production'
            ? 'Internal server error'
            : err.message
    });
});

// ==================== START SERVER ====================

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('\n' + '='.repeat(60));
    console.log('🍕 ERFURT PIZZA BACKEND API');
    console.log('='.repeat(60));
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${ENVIRONMENT}`);
    console.log(`📍 Frontend URL: ${process.env.FRONTEND_URL || 'Not configured'}`);
    console.log(`💳 PayPal Mode: ${process.env.PAYPAL_MODE || 'sandbox'}`);
    console.log(`🔒 HTTPS: ${ENVIRONMENT === 'production' ? 'Enabled (via reverse proxy)' : 'Not required for development'}`);
    console.log('='.repeat(60));
    console.log('✅ Server ready to accept payments!');
    console.log('='.repeat(60) + '\n');
});

// ==================== GRACEFUL SHUTDOWN ====================

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\nSIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

// Handle errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    if (ENVIRONMENT === 'production') {
        // In production, try to gracefully shutdown
        server.close(() => process.exit(1));
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
