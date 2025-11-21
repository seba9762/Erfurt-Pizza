# Backend API Setup Guide for Payment Processing

## 🎯 Why Do You Need a Backend?

**You CANNOT process payments securely from the frontend alone** because:

1. **API Keys Must Stay Secret**: Stripe Secret Key and PayPal Secret must never be in frontend code (anyone can see it!)
2. **Payment Verification**: Must verify payments server-side to prevent fraud
3. **Security**: Frontend code can be manipulated by users
4. **Database**: Need to store orders permanently (not just localStorage)

## 📦 Option 1: Node.js Backend (Recommended - Easiest)

### Step 1: Create Backend Folder

```bash
# In your project root, create a backend folder
mkdir backend
cd backend

# Initialize Node.js project
npm init -y

# Install required packages
npm install express @paypal/checkout-server-sdk stripe cors body-parser dotenv
```

### Step 2: Create Environment Variables File

Create `backend/.env`:

```env
# Server Configuration
PORT=3000
FRONTEND_URL=https://erfurtpizza.com

# PayPal Configuration
PAYPAL_MODE=sandbox
# Get from: https://developer.paypal.com/dashboard/
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_secret_here

# Stripe Configuration
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Database (optional - for production)
DATABASE_URL=postgresql://user:password@localhost:5432/erfurt_pizza
```

### Step 3: Create Server File

Create `backend/server.js`:

```javascript
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

// Configure PayPal environment
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

        // Store order temporarily (in production, use database)
        // For now, we'll pass it back to frontend

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

        // Capture the payment
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const client = getPayPalClient();
        const response = await client.execute(request);

        // Check if payment was successful
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

        // Extract amount (remove € and convert to cents)
        const amount = parseFloat(orderData.total.replace(/[^0-9.,]/g, '').replace(',', '.'));
        const amountInCents = Math.round(amount * 100);

        // Build line items from cart
        const lineItems = orderData.cart.map(item => {
            const itemName = item.size
                ? `${item.name} (${item.size})`
                : item.name;

            // Calculate item price including extras
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

        // Add delivery fee if applicable
        if (orderData.deliveryMethod === 'delivery') {
            const deliveryFee = 3.00; // From your deliveryInfo.fee
            lineItems.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Liefergebühr',
                    },
                    unit_amount: Math.round(deliveryFee * 100),
                },
                quantity: 1,
            });
        }

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancel.html`,
            customer_email: orderData.email || undefined,
            metadata: {
                customerName: orderData.name,
                customerPhone: orderData.phone,
                deliveryMethod: orderData.deliveryMethod,
                // Store order data in metadata (limited to 500 chars per value)
            }
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

        // Retrieve session from Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id);

        // Check payment status
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

// ==================== ORDER MANAGEMENT ====================

// Save Order (called after successful payment)
app.post('/api/save-order', async (req, res) => {
    try {
        const { orderData, paymentId, paymentMethod } = req.body;

        // In production, save to database
        // For now, we'll just return success

        const orderId = 'EP' + Date.now();

        // TODO: Save to database
        // await db.orders.create({
        //     id: orderId,
        //     customerName: orderData.name,
        //     customerPhone: orderData.phone,
        //     customerEmail: orderData.email,
        //     items: orderData.cart,
        //     total: orderData.total,
        //     paymentMethod: paymentMethod,
        //     paymentId: paymentId,
        //     status: 'confirmed',
        //     timestamp: new Date()
        // });

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

// ==================== WEBHOOK ENDPOINTS (Optional but Recommended) ====================

// PayPal Webhook
app.post('/api/webhook/paypal', async (req, res) => {
    // Verify webhook signature
    // Update order status based on payment events
    res.sendStatus(200);
});

// Stripe Webhook
app.post('/api/webhook/stripe', async (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        // Verify webhook signature
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        // Handle different event types
        switch (event.type) {
            case 'checkout.session.completed':
                // Payment successful
                const session = event.data.object;
                // Update order status in database
                break;
            case 'payment_intent.payment_failed':
                // Payment failed
                break;
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(400).send(`Webhook Error: ${error.message}`);
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

// Handle errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
});
```

### Step 4: Create package.json Scripts

Add to `backend/package.json`:

```json
{
  "name": "erfurt-pizza-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 5: Update Frontend to Use Backend

Update `payment-config.js`:

```javascript
// Add backend URL configuration
const backendURL = 'http://localhost:3000'; // Change to your backend URL in production

// Update processPayPalPayment function
async function processPayPalPayment(orderData) {
    if (!paymentConfig.paypal.enabled) {
        alert('PayPal-Zahlung ist noch nicht konfiguriert.');
        return false;
    }

    try {
        // Send order to backend
        const response = await fetch(`${backendURL}/api/create-paypal-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderData: orderData })
        });

        const data = await response.json();

        if (data.success && data.approvalUrl) {
            // Store order data
            sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
            sessionStorage.setItem('paypalOrderId', data.orderId);

            // Redirect to PayPal
            window.location.href = data.approvalUrl;
        } else {
            alert('Fehler bei der PayPal-Zahlung: ' + (data.error || 'Unbekannter Fehler'));
        }

        return true;
    } catch (error) {
        console.error('PayPal payment error:', error);
        alert('Fehler bei der PayPal-Zahlung. Bitte versuchen Sie es erneut.');
        return false;
    }
}

// Update processStripePayment function
async function processStripePayment(orderData) {
    if (!paymentConfig.stripe.enabled) {
        alert('Kreditkarten-Zahlung ist noch nicht konfiguriert.');
        return false;
    }

    try {
        // Send order to backend
        const response = await fetch(`${backendURL}/api/create-stripe-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderData: orderData })
        });

        const data = await response.json();

        if (data.success && data.url) {
            // Store order data
            sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));

            // Redirect to Stripe Checkout
            window.location.href = data.url;
        } else {
            alert('Fehler bei der Kreditkarten-Zahlung: ' + (data.error || 'Unbekannter Fehler'));
        }

        return true;
    } catch (error) {
        console.error('Stripe payment error:', error);
        alert('Fehler bei der Kreditkarten-Zahlung. Bitte versuchen Sie es erneut.');
        return false;
    }
}
```

### Step 6: Run the Backend

```bash
cd backend

# Start the server
npm start

# Or for development with auto-reload:
npm install -g nodemon
npm run dev
```

You should see:
```
🚀 Erfurt Pizza Backend running on port 3000
📍 Frontend URL: http://localhost:8080
💳 PayPal Mode: sandbox
✅ Server ready to accept payments!
```

## 📦 Option 2: PHP Backend (Alternative)

If you're more comfortable with PHP:

### Create `backend/api/create-paypal-order.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

require_once 'vendor/autoload.php';

use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;

// Load configuration
$paypalClientId = getenv('PAYPAL_CLIENT_ID');
$paypalSecret = getenv('PAYPAL_CLIENT_SECRET');

// Get order data
$input = json_decode(file_get_contents('php://input'), true);
$orderData = $input['orderData'];

// Extract amount
$amount = floatval(preg_replace('/[^0-9.,]/', '', $orderData['total']));
$amount = str_replace(',', '.', $amount);

// Configure PayPal
$environment = new SandboxEnvironment($paypalClientId, $paypalSecret);
$client = new PayPalHttpClient($environment);

// Create order
$request = new OrdersCreateRequest();
$request->prefer('return=representation');
$request->body = [
    'intent' => 'CAPTURE',
    'purchase_units' => [[
        'amount' => [
            'currency_code' => 'EUR',
            'value' => number_format($amount, 2, '.', '')
        ]
    ]],
    'application_context' => [
        'return_url' => 'https://erfurtpizza.com/payment-success.html',
        'cancel_url' => 'https://erfurtpizza.com/payment-cancel.html'
    ]
];

try {
    $response = $client->execute($request);

    // Find approval URL
    $approvalUrl = '';
    foreach ($response->result->links as $link) {
        if ($link->rel === 'approve') {
            $approvalUrl = $link->href;
            break;
        }
    }

    echo json_encode([
        'success' => true,
        'orderId' => $response->result->id,
        'approvalUrl' => $approvalUrl
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
```

## 🚀 Deployment Options

### Option 1: Deploy on Your Own Server (VPS)

```bash
# Example: Ubuntu server with Node.js
ssh user@your-server.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Upload your backend folder
scp -r backend/ user@your-server.com:/var/www/erfurt-pizza-backend/

# Install PM2 to keep server running
sudo npm install -g pm2

# Start server
cd /var/www/erfurt-pizza-backend
pm2 start server.js --name erfurt-pizza-backend

# Setup nginx reverse proxy
sudo nano /etc/nginx/sites-available/erfurt-pizza-api

# Add:
server {
    listen 80;
    server_name api.erfurtpizza.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Deploy on Heroku (Easy)

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
cd backend
heroku create erfurt-pizza-backend

# Set environment variables
heroku config:set PAYPAL_CLIENT_ID=your_client_id
heroku config:set PAYPAL_CLIENT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=your_stripe_key

# Deploy
git init
git add .
git commit -m "Initial backend"
git push heroku main

# Your backend URL: https://erfurt-pizza-backend.herokuapp.com
```

### Option 3: Deploy on Netlify Functions (Serverless)

Create `netlify/functions/create-paypal-order.js`:

```javascript
const paypal = require('@paypal/checkout-server-sdk');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { orderData } = JSON.parse(event.body);

    // PayPal setup
    const environment = new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
    );
    const client = new paypal.core.PayPalHttpClient(environment);

    // Create order logic (same as above)
    // ...

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true, approvalUrl: '...' })
    };
};
```

## 🔒 Security Checklist

- [ ] Never commit `.env` file (add to `.gitignore`)
- [ ] Use HTTPS in production
- [ ] Validate all input data
- [ ] Implement rate limiting
- [ ] Log all transactions
- [ ] Set up webhook signature verification
- [ ] Use environment variables for all secrets
- [ ] Implement CORS properly
- [ ] Add request validation middleware
- [ ] Set up error monitoring (Sentry, etc.)

## 🧪 Testing

### Test Locally:

```bash
# Start backend
cd backend
npm start

# In another terminal, test endpoint
curl -X POST http://localhost:3000/api/create-paypal-order \
  -H "Content-Type: application/json" \
  -d '{"orderData":{"total":"25.00 €","name":"Test User"}}'
```

## 📞 Next Steps

1. **Choose your backend technology** (Node.js recommended)
2. **Set up the backend server** (follow steps above)
3. **Get API credentials** (PayPal & Stripe)
4. **Configure `.env` file**
5. **Test with sandbox/test mode**
6. **Deploy backend to production server**
7. **Update frontend with backend URL**
8. **Test complete payment flow**
9. **Switch to live mode**

Need help with any specific step? Let me know!
