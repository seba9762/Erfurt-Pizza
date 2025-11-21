/*==================== PAYMENT CONFIGURATION ====================*/

// Backend API URL (update this when you set up your backend)
const BACKEND_URL = 'http://localhost:3000'; // Change to your backend URL in production
// Examples:
// Local development: 'http://localhost:3000'
// Production: 'https://api.erfurtpizza.com'
// Heroku: 'https://erfurt-pizza-backend.herokuapp.com'

// Payment Gateway Configuration
const paymentConfig = {
    // PayPal Configuration
    paypal: {
        enabled: false, // Set to true when you have PayPal credentials
        mode: 'sandbox', // 'sandbox' for testing, 'live' for production
        clientId: 'YOUR_PAYPAL_CLIENT_ID', // Replace with your PayPal Client ID
        // Get credentials from: https://developer.paypal.com/dashboard/
        currency: 'EUR',
        locale: 'de_DE'
    },

    // Stripe Configuration
    stripe: {
        enabled: false, // Set to true when you have Stripe credentials
        publishableKey: 'YOUR_STRIPE_PUBLISHABLE_KEY', // Replace with your Stripe Publishable Key
        // Get credentials from: https://dashboard.stripe.com/apikeys
        currency: 'eur',
        locale: 'de'
    },

    // Return URLs (Update these with your actual domain)
    returnUrls: {
        success: window.location.origin + '/payment-success.html',
        cancel: window.location.origin + '/payment-cancel.html',
        error: window.location.origin + '/payment-error.html'
    }
};

/*==================== HELPER FUNCTIONS ====================*/

// Check if backend server is available
async function checkBackendAvailable() {
    try {
        const response = await fetch(`${BACKEND_URL}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return response.ok;
    } catch (error) {
        console.log('Backend not available, using demo mode');
        return false;
    }
}

/*==================== PAYPAL INTEGRATION ====================*/

// Initialize PayPal
function initializePayPal() {
    if (!paymentConfig.paypal.enabled) {
        console.warn('PayPal is not enabled. Set paymentConfig.paypal.enabled = true and add your Client ID');
        return;
    }

    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${paymentConfig.paypal.clientId}&currency=${paymentConfig.paypal.currency}&locale=${paymentConfig.paypal.locale}`;
    script.async = true;
    script.onload = () => {
        console.log('PayPal SDK loaded successfully');
    };
    document.head.appendChild(script);
}

// Process PayPal Payment
async function processPayPalPayment(orderData) {
    if (!paymentConfig.paypal.enabled) {
        alert('PayPal-Zahlung ist noch nicht konfiguriert. Bitte kontaktieren Sie den Administrator.');
        return false;
    }

    try {
        // Store order data temporarily
        sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));

        // Check if backend is available
        const useBackend = await checkBackendAvailable();

        if (useBackend) {
            // PRODUCTION MODE: Use real backend
            console.log('Using backend for PayPal payment');

            const response = await fetch(`${BACKEND_URL}/api/create-paypal-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderData: orderData })
            });

            const data = await response.json();

            if (data.success && data.approvalUrl) {
                // Store PayPal order ID
                sessionStorage.setItem('paypalOrderId', data.orderId);
                // Redirect to PayPal
                window.location.href = data.approvalUrl;
            } else {
                alert('Fehler bei der PayPal-Zahlung: ' + (data.error || 'Unbekannter Fehler'));
                return false;
            }
        } else {
            // DEMO MODE: Simulate payment flow
            console.log('Backend not available - using demo mode');
            window.location.href = 'payment-processing.html?method=paypal';
        }

        return true;
    } catch (error) {
        console.error('PayPal payment error:', error);
        // Fallback to demo mode if backend fails
        console.log('Falling back to demo mode');
        window.location.href = 'payment-processing.html?method=paypal';
        return true;
    }
}

/*==================== STRIPE INTEGRATION ====================*/

// Initialize Stripe
function initializeStripe() {
    if (!paymentConfig.stripe.enabled) {
        console.warn('Stripe is not enabled. Set paymentConfig.stripe.enabled = true and add your Publishable Key');
        return;
    }

    // Load Stripe.js
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = () => {
        // Initialize Stripe instance
        window.stripe = Stripe(paymentConfig.stripe.publishableKey);
        console.log('Stripe SDK loaded successfully');
    };
    document.head.appendChild(script);
}

// Process Stripe Payment
async function processStripePayment(orderData) {
    if (!paymentConfig.stripe.enabled) {
        alert('Kreditkarten-Zahlung ist noch nicht konfiguriert. Bitte kontaktieren Sie den Administrator.');
        return false;
    }

    try {
        // Store order data temporarily
        sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));

        // Check if backend is available
        const useBackend = await checkBackendAvailable();

        if (useBackend) {
            // PRODUCTION MODE: Use real backend
            console.log('Using backend for Stripe payment');

            const response = await fetch(`${BACKEND_URL}/api/create-stripe-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderData: orderData })
            });

            const data = await response.json();

            if (data.success && data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
            } else {
                alert('Fehler bei der Kreditkarten-Zahlung: ' + (data.error || 'Unbekannter Fehler'));
                return false;
            }
        } else {
            // DEMO MODE: Simulate payment flow
            console.log('Backend not available - using demo mode');
            window.location.href = 'payment-processing.html?method=stripe';
        }

        return true;
    } catch (error) {
        console.error('Stripe payment error:', error);
        // Fallback to demo mode if backend fails
        console.log('Falling back to demo mode');
        window.location.href = 'payment-processing.html?method=stripe';
        return true;
    }
}

/*==================== CASH PAYMENT ====================*/

// Process Cash Payment (No payment gateway needed)
function processCashPayment(orderData) {
    // Cash payment is processed immediately
    // No external payment gateway needed
    return processOrder(orderData);
}

/*==================== PAYMENT ROUTING ====================*/

// Main payment handler - routes to appropriate payment method
async function handlePaymentSubmit(orderData) {
    const paymentMethod = orderData.paymentMethod;

    console.log('Processing payment:', paymentMethod);

    switch(paymentMethod) {
        case 'cash':
            // Cash payment - process immediately
            processCashPayment(orderData);
            break;

        case 'paypal':
            // PayPal payment - redirect to PayPal
            await processPayPalPayment(orderData);
            break;

        case 'card':
            // Stripe payment - redirect to Stripe
            await processStripePayment(orderData);
            break;

        default:
            alert('Ungültige Zahlungsmethode ausgewählt.');
    }
}

/*==================== PAYMENT VERIFICATION ====================*/

// Verify payment after redirect back from payment gateway
// Call this function on payment success page
async function verifyPayment() {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('payment_id') || urlParams.get('session_id');
    const method = urlParams.get('method');

    if (!paymentId) {
        console.error('No payment ID found');
        return false;
    }

    try {
        // In production, verify payment with your backend
        /*
        const response = await fetch(`/api/verify-payment?payment_id=${paymentId}&method=${method}`);
        const data = await response.json();

        if (data.verified) {
            // Payment verified, retrieve and process the order
            const pendingOrder = JSON.parse(sessionStorage.getItem('pendingOrder'));
            if (pendingOrder) {
                processOrder(pendingOrder);
                sessionStorage.removeItem('pendingOrder');
            }
            return true;
        }
        */

        // For now, just retrieve and process the pending order
        const pendingOrder = JSON.parse(sessionStorage.getItem('pendingOrder'));
        if (pendingOrder) {
            processOrder(pendingOrder);
            sessionStorage.removeItem('pendingOrder');
            return true;
        }

        return false;
    } catch (error) {
        console.error('Payment verification error:', error);
        return false;
    }
}

/*==================== INITIALIZE PAYMENT SYSTEMS ====================*/

// Initialize payment systems on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize PayPal if enabled
    if (paymentConfig.paypal.enabled) {
        initializePayPal();
    }

    // Initialize Stripe if enabled
    if (paymentConfig.stripe.enabled) {
        initializeStripe();
    }

    // Show warning messages for disabled payment methods
    const paypalRadio = document.querySelector('input[name="payment"][value="paypal"]');
    const cardRadio = document.querySelector('input[name="payment"][value="card"]');

    if (paypalRadio && !paymentConfig.paypal.enabled) {
        const paypalLabel = paypalRadio.closest('.payment-method');
        if (paypalLabel) {
            const small = paypalLabel.querySelector('small');
            if (small) {
                small.textContent = '(Noch nicht verfügbar)';
                small.style.color = '#999';
            }
        }
    }

    if (cardRadio && !paymentConfig.stripe.enabled) {
        const cardLabel = cardRadio.closest('.payment-method');
        if (cardLabel) {
            const small = cardLabel.querySelector('small');
            if (small) {
                small.textContent = '(Noch nicht verfügbar)';
                small.style.color = '#999';
            }
        }
    }
});

/*==================== BACKEND API EXAMPLES ====================*/

/*
IMPORTANT: You need to create backend endpoints to handle payments securely.
Never expose API keys in frontend code!

Example Node.js/Express backend endpoints:

// PayPal Order Creation
app.post('/api/create-paypal-order', async (req, res) => {
    const { amount, currency, orderData } = req.body;

    // Use PayPal SDK to create order
    const order = await paypal.orders.create({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: currency,
                value: amount
            }
        }],
        application_context: {
            return_url: 'https://yourdomain.com/payment-success.html',
            cancel_url: 'https://yourdomain.com/payment-cancel.html'
        }
    });

    res.json({ approvalUrl: order.links.find(link => link.rel === 'approve').href });
});

// PayPal Order Capture (after user approves)
app.post('/api/capture-paypal-order', async (req, res) => {
    const { orderId } = req.body;
    const capture = await paypal.orders.capture(orderId);
    res.json({ verified: capture.status === 'COMPLETED' });
});

// Stripe Checkout Session
app.post('/api/create-stripe-session', async (req, res) => {
    const { amount, currency, orderData, successUrl, cancelUrl } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Erfurt Pizza Order',
                },
                unit_amount: amount,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: cancelUrl,
    });

    res.json({ id: session.id });
});

// Verify Stripe Payment
app.get('/api/verify-payment', async (req, res) => {
    const { payment_id, method } = req.query;

    if (method === 'stripe') {
        const session = await stripe.checkout.sessions.retrieve(payment_id);
        res.json({ verified: session.payment_status === 'paid' });
    }
});
*/
