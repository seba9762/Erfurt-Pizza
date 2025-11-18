# Payment Integration Guide for Erfurt Pizza

This guide explains how to integrate online payment systems into your Erfurt Pizza website.

## Table of Contents
1. [Overview](#overview)
2. [Payment Options for Germany](#payment-options-for-germany)
3. [Recommended Payment Providers](#recommended-payment-providers)
4. [Integration Instructions](#integration-instructions)
5. [Security Considerations](#security-considerations)

## Overview

The website currently supports three payment methods:
- **Cash Payment** (Barzahlung) - Pay on delivery or pickup
- **PayPal** - Requires integration
- **Credit Card** - Requires payment gateway integration

## Payment Options for Germany

For a pizza shop in Erfurt, Germany, here are the best payment providers:

### 1. **Stripe** (Recommended)
- ✅ Widely used, secure, and reliable
- ✅ Supports credit cards, SEPA, Giropay, Sofort
- ✅ Easy integration with JavaScript
- ✅ Transparent pricing: 1.4% + €0.25 per transaction
- ✅ No monthly fees

### 2. **PayPal**
- ✅ Trusted by German customers
- ✅ PayPal + Credit Card processing
- ✅ 2.49% + €0.35 per transaction
- ✅ Easy integration

### 3. **Mollie**
- ✅ Popular in Europe
- ✅ Supports iDEAL, SEPA, Giropay, credit cards
- ✅ Great for German market
- ✅ 0.29€ per transaction + fixed percentage

### 4. **Klarna**
- ✅ Very popular in Germany
- ✅ "Pay later" option
- ✅ Good for customer conversion
- ✅ Slightly higher fees

## Recommended Setup for Erfurt Pizza

### Best Solution: Stripe + PayPal
This combination covers 95% of German online shoppers:
- **Stripe** for credit cards, SEPA, Giropay
- **PayPal** for PayPal users
- Keep **Cash payment** for traditional customers

---

## Integration Instructions

### Option 1: Stripe Integration (Recommended)

#### Step 1: Create Stripe Account
1. Go to https://stripe.com/de
2. Sign up for a free account
3. Complete business verification
4. Get your API keys from the dashboard

#### Step 2: Add Stripe to Your Website

Add Stripe.js to your HTML (in `index.html`, before closing `</body>`):

```html
<script src="https://js.stripe.com/v3/"></script>
```

#### Step 3: Update JavaScript

Add this to your `script.js`:

```javascript
// Initialize Stripe (replace with your publishable key)
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');

// Modify processOrder function
async function processOrder(orderData) {
    const paymentMethod = orderData.paymentMethod;

    if(paymentMethod === 'card') {
        // Stripe payment
        try {
            const response = await fetch('/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: parseFloat(orderData.total) * 100, // Convert to cents
                    currency: 'eur',
                    order: orderData
                })
            });

            const { clientSecret } = await response.json();

            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: orderData.name,
                        email: orderData.email,
                        phone: orderData.phone
                    }
                }
            });

            if(error) {
                showNotification('Zahlung fehlgeschlagen: ' + error.message, 'error');
                return;
            }

            // Payment successful
            completeOrder(orderData);
        } catch(err) {
            showNotification('Fehler bei der Zahlung', 'error');
        }
    } else if(paymentMethod === 'paypal') {
        // PayPal payment (see PayPal section)
        handlePayPalPayment(orderData);
    } else {
        // Cash payment
        completeOrder(orderData);
    }
}
```

#### Step 4: Backend Setup (Node.js Example)

Create a simple backend server (`server.js`):

```javascript
const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');
const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, order } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            description: `Erfurt Pizza Order - ${order.name}`,
            metadata: {
                order_id: Date.now().toString(),
                customer_name: order.name,
                customer_phone: order.phone
            }
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            'whsec_YOUR_WEBHOOK_SECRET'
        );

        if(event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            // Save order to database
            console.log('Payment succeeded:', paymentIntent.id);
            // Send confirmation email
            // Update order status
        }

        res.json({ received: true });
    } catch(err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

### Option 2: PayPal Integration

#### Step 1: Create PayPal Business Account
1. Go to https://www.paypal.com/de/business
2. Sign up for a business account
3. Verify your account
4. Get your Client ID from https://developer.paypal.com/

#### Step 2: Add PayPal SDK

Add to your HTML before closing `</body>`:

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR"></script>
```

#### Step 3: Create PayPal Button

Add this to your checkout modal in HTML:

```html
<div id="paypal-button-container" style="display:none;"></div>
```

#### Step 4: Initialize PayPal

Add to your `script.js`:

```javascript
// Show PayPal button when PayPal is selected
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const paypalContainer = document.getElementById('paypal-button-container');

        if(e.target.value === 'paypal') {
            paypalContainer.style.display = 'block';
            initPayPalButton();
        } else {
            paypalContainer.style.display = 'none';
        }
    });
});

function initPayPalButton() {
    const total = parseFloat(document.getElementById('checkout-total').textContent);

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2),
                        currency_code: 'EUR'
                    },
                    description: 'Erfurt Pizza Order'
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Payment successful
                const orderData = getOrderData();
                orderData.paypalOrderId = data.orderID;
                completeOrder(orderData);
            });
        },
        onError: function(err) {
            showNotification('PayPal Zahlung fehlgeschlagen', 'error');
        }
    }).render('#paypal-button-container');
}
```

---

### Option 3: Mollie Integration (Alternative)

Mollie is very popular in Germany and easy to integrate.

#### Step 1: Sign up at https://www.mollie.com/de
#### Step 2: Get your API key
#### Step 3: Use Mollie Checkout

```javascript
// Backend example
const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: 'YOUR_API_KEY' });

app.post('/create-mollie-payment', async (req, res) => {
    const { amount, description, order } = req.body;

    const payment = await mollieClient.payments.create({
        amount: {
            currency: 'EUR',
            value: amount.toFixed(2)
        },
        description: description,
        redirectUrl: 'https://your-website.com/order-confirmation',
        webhookUrl: 'https://your-website.com/webhook',
        metadata: {
            order_id: order.id
        }
    });

    res.json({ checkoutUrl: payment._links.checkout.href });
});
```

---

## Simple Solution: No Backend Required

### Using PayPal Buttons Only (Easiest)

If you want to avoid backend development, use PayPal Checkout buttons:

1. Go to https://www.paypal.com/de/business/accept-payments/checkout
2. Create payment buttons
3. Embed them in your website

This is the simplest solution but gives you less control.

---

## Phone/WhatsApp Orders (Alternative)

For a local pizza shop, you might prefer:

1. **Accept online orders via the website** (current system)
2. **Customer receives order confirmation**
3. **You call them to confirm and take payment details** over the phone
4. **Or**: Redirect them to call/WhatsApp you with the order

This requires no payment integration but still provides a professional ordering experience.

### Implement WhatsApp Orders

Add this button to your confirmation modal:

```html
<a href="https://wa.me/4936165442275?text=Hallo,%20ich%20möchte%20bestellen:%20[ORDER_DETAILS]"
   class="btn btn-success">
    <i class="fab fa-whatsapp"></i> Per WhatsApp bestätigen
</a>
```

---

## Security Considerations

### Important Security Rules:

1. **Never store credit card data** on your server
2. **Use HTTPS** (SSL certificate required)
3. **Validate all inputs** on backend
4. **Use environment variables** for API keys
5. **Implement rate limiting** to prevent abuse
6. **Log all transactions** for auditing
7. **Comply with GDPR** for customer data

### Required for Germany (GDPR):
- Privacy policy (Datenschutzerklärung)
- Terms and conditions (AGB)
- Imprint (Impressum)
- Cookie consent banner

---

## Recommended Implementation Path

### Phase 1: Launch (Immediate)
✅ Cash payment on delivery
✅ Cash payment on pickup
✅ Phone/WhatsApp order confirmation

### Phase 2: Basic Online Payments (Week 2-3)
✅ PayPal integration (easiest)
✅ SSL certificate
✅ Privacy policy & terms

### Phase 3: Full Payment Options (Month 2)
✅ Stripe integration
✅ Credit card support
✅ SEPA direct debit
✅ Automated email confirmations

---

## Testing

### Test Mode:
- **Stripe test cards**: https://stripe.com/docs/testing
  - Success: `4242 4242 4242 4242`
  - Decline: `4000 0000 0000 0002`

- **PayPal Sandbox**: https://developer.paypal.com/tools/sandbox/

### Before Going Live:
- [ ] Test all payment methods
- [ ] Verify webhook endpoints
- [ ] Check email notifications
- [ ] Test on mobile devices
- [ ] Verify tax calculations
- [ ] Test refund process

---

## Support Resources

- **Stripe Documentation**: https://stripe.com/docs
- **PayPal Developer**: https://developer.paypal.com/
- **Mollie Docs**: https://docs.mollie.com/
- **German Payment Guide**: https://www.ehi.org/

---

## Questions?

For implementation help:
- Stripe Support: https://support.stripe.com/
- PayPal Support: https://www.paypal.com/de/cshelp/
- Developer Communities: Stack Overflow, Reddit r/webdev

---

## Cost Comparison (Monthly ~500€ revenue)

| Provider | Transaction Fee | Monthly Cost (estimate) |
|----------|----------------|------------------------|
| Cash | €0 | €0 |
| PayPal | 2.49% + €0.35 | ~€15 |
| Stripe | 1.4% + €0.25 | ~€10 |
| Mollie | 0.29€ + 1.4% | ~€8 |

**Recommendation**: Start with cash + PayPal, add Stripe later.
