require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paypal = require('@paypal/checkout-server-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// ==================== HEALTH CHECK ====================

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
    console.log(`🚀 Erfurt Pizza Backend running on port ${PORT}`);
    console.log(`📍 Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`💳 PayPal Mode: ${process.env.PAYPAL_MODE}`);
    console.log(`✅ Server ready to accept payments!`);
});
