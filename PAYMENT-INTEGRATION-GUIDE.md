# Payment Integration Guide - Erfurt Pizza

This guide explains how to integrate PayPal and Stripe payment gateways into your Erfurt Pizza website.

## 🎯 Current Status

- ✅ **Cash Payment**: Fully functional (no integration needed)
- ⚠️ **PayPal**: Stub implementation (needs configuration)
- ⚠️ **Stripe**: Stub implementation (needs configuration)
- ✅ **Automatic Receipt Printing**: Both kitchen receipt and customer invoice print automatically

## 🔄 Current Flow

### For Cash Payments (Working Now)
1. User selects items and goes to checkout
2. User selects "Barzahlung" (Cash)
3. Clicks "Jetzt Bezahlen"
4. Order is **immediately confirmed**
5. **Kitchen receipt prints automatically**
6. **Customer invoice prints automatically** (for kitchen records)
7. Confirmation shown to user

### For PayPal/Card Payments (Currently Demo Mode)
1. User selects items and goes to checkout
2. User selects "PayPal" or "Kreditkarte"
3. Clicks "Jetzt Bezahlen"
4. Redirected to payment-processing.html (demo page)
5. After 3 seconds, order is confirmed (simulating payment)
6. **Kitchen receipt prints automatically**
7. **Customer invoice prints automatically**
8. Confirmation shown to user

## 🚀 How to Enable Real Payment Processing

### Step 1: Get API Credentials

#### For PayPal:
1. Go to https://developer.paypal.com/
2. Log in with your PayPal account
3. Go to Dashboard → My Apps & Credentials
4. Create a new app or use existing one
5. Copy your **Client ID**
6. Note: Use **Sandbox** for testing, **Live** for production

#### For Stripe:
1. Go to https://dashboard.stripe.com/
2. Create an account or log in
3. Go to Developers → API Keys
4. Copy your **Publishable Key** (starts with `pk_`)
5. Copy your **Secret Key** (starts with `sk_`) - **Keep this secret!**
6. Note: Use **Test mode** for testing, toggle to **Live mode** for production

### Step 2: Configure payment-config.js

Open `payment-config.js` and update the configuration:

```javascript
const paymentConfig = {
    // PayPal Configuration
    paypal: {
        enabled: true, // ✅ Set to true
        mode: 'sandbox', // Use 'sandbox' for testing, 'live' for production
        clientId: 'YOUR_ACTUAL_PAYPAL_CLIENT_ID', // ✅ Paste your Client ID
        currency: 'EUR',
        locale: 'de_DE'
    },

    // Stripe Configuration
    stripe: {
        enabled: true, // ✅ Set to true
        publishableKey: 'YOUR_ACTUAL_STRIPE_PUBLISHABLE_KEY', // ✅ Paste your Publishable Key
        currency: 'eur',
        locale: 'de'
    }
};
```

### Step 3: Create Backend API (REQUIRED for Production)

⚠️ **IMPORTANT**: Payment processing requires a backend server. You cannot handle payments securely from the frontend alone!

#### Why Backend is Required:
- **Security**: API keys must be kept secret
- **Payment Verification**: Must verify payments server-side
- **Order Processing**: Must store orders securely in a database
- **Fraud Prevention**: Must validate and verify transactions

#### Backend Technology Options:
- **Node.js + Express** (Recommended)
- **PHP + Laravel/Symfony**
- **Python + Django/Flask**
- **Ruby on Rails**
- **Any server-side technology**

### Step 4: Backend API Endpoints Needed

You need to create these endpoints:

#### 1. Create PayPal Order
```javascript
POST /api/create-paypal-order
```
- Receives: Order data, total amount
- Creates PayPal order using PayPal SDK
- Returns: PayPal approval URL

#### 2. Capture PayPal Payment
```javascript
POST /api/capture-paypal-order
```
- Receives: PayPal order ID
- Captures the payment
- Returns: Payment status

#### 3. Create Stripe Checkout Session
```javascript
POST /api/create-stripe-session
```
- Receives: Order data, total amount
- Creates Stripe checkout session
- Returns: Session ID

#### 4. Verify Payment
```javascript
GET /api/verify-payment?payment_id=XXX&method=stripe
```
- Receives: Payment ID, payment method
- Verifies payment was successful
- Returns: Verification status

#### 5. Webhook Endpoints (Optional but Recommended)
```javascript
POST /api/webhook/paypal
POST /api/webhook/stripe
```
- Receives payment notifications from payment gateways
- Updates order status automatically
- Provides backup payment verification

## 📦 Example Backend Implementation

See the detailed backend examples in `payment-config.js` (bottom of file) for:

- Node.js/Express example endpoints
- PayPal SDK integration
- Stripe SDK integration
- Payment verification
- Error handling

### Quick Start with Node.js:

```bash
# Install dependencies
npm install express @paypal/checkout-server-sdk stripe body-parser

# Create server.js with the example code from payment-config.js
node server.js
```

## 🔒 Security Checklist

- [ ] Never expose secret API keys in frontend code
- [ ] Always verify payments server-side
- [ ] Use HTTPS for all payment pages
- [ ] Implement rate limiting on payment endpoints
- [ ] Log all payment transactions
- [ ] Set up webhook signatures verification
- [ ] Use environment variables for API keys
- [ ] Never store credit card information
- [ ] Implement CSRF protection
- [ ] Set up payment fraud detection

## 🧪 Testing

### PayPal Sandbox Testing:
1. Use sandbox accounts from PayPal Developer Dashboard
2. Test purchases with sandbox buyer accounts
3. No real money is charged

**Test Cards:**
- Email: Any sandbox buyer account email
- Password: Your sandbox account password

### Stripe Test Mode:
1. Use test API keys (start with `pk_test_` and `sk_test_`)
2. Use Stripe test card numbers
3. No real money is charged

**Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0027 6000 3184`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

## 📱 Receipt Printing

The system automatically prints receipts when an order is confirmed:

### What Prints Automatically:
1. **Kitchen Receipt** (Küchenbonbon)
   - For kitchen staff
   - Shows order details, special instructions
   - Simplified format for preparation

2. **Customer Invoice** (Rechnung)
   - For kitchen/office records
   - Complete invoice with all details
   - Legal receipt format

### When Receipts Print:
- ✅ Cash payment: Immediately after checkout
- ✅ PayPal payment: After successful payment
- ✅ Card payment: After successful payment

### Manual Printing:
- Admin can print receipts from `admin.html`
- Orders page has print buttons
- Both receipt types available

## 🌐 Going Live

### Before Launching:

1. **Switch to Production Mode:**
   ```javascript
   paymentConfig.paypal.mode = 'live';
   // Use production Stripe keys
   ```

2. **Update Return URLs:**
   ```javascript
   returnUrls: {
       success: 'https://erfurtpizza.com/payment-success.html',
       cancel: 'https://erfurtpizza.com/payment-cancel.html',
       error: 'https://erfurtpizza.com/payment-error.html'
   }
   ```

3. **Test Everything:**
   - [ ] Test each payment method
   - [ ] Verify receipts print correctly
   - [ ] Test order confirmation emails
   - [ ] Test failed payment scenarios
   - [ ] Test refund process

4. **Monitor:**
   - Set up payment monitoring
   - Configure email alerts for failed payments
   - Monitor server logs
   - Track payment success rate

## 🆘 Troubleshooting

### Payment Gateway Not Loading
- Check API keys are correct
- Verify `enabled: true` in config
- Check browser console for errors
- Ensure scripts are loaded in correct order

### Payment Fails But Shows Success
- Implement proper payment verification
- Check webhook configuration
- Verify backend validation

### Receipts Not Printing
- Check browser popup blocker settings
- Ensure print-receipts.js is loaded
- Test print function in console

### CORS Errors
- Configure backend to accept requests from your domain
- Set proper CORS headers
- Use environment-specific configurations

## 📞 Support

### PayPal Support:
- Developer: https://developer.paypal.com/support/
- Merchant: https://www.paypal.com/de/smarthelp/contact-us

### Stripe Support:
- Docs: https://stripe.com/docs
- Support: https://support.stripe.com/

## 📄 Additional Resources

- [PayPal Integration Guide](https://developer.paypal.com/docs/checkout/)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [PCI Compliance](https://www.pcisecuritystandards.org/)
- [Payment Security Best Practices](https://stripe.com/docs/security/guide)

---

## Quick Reference

### Files Modified/Created:
- ✅ `script.js` - Updated to use payment routing
- ✅ `payment-config.js` - Payment configuration and stubs
- ✅ `payment-processing.html` - Payment loading page
- ✅ `payment-success.html` - Payment success page
- ✅ `payment-cancel.html` - Payment cancellation page
- ✅ `index.html` - Added payment-config.js script
- ✅ `print-receipts.js` - Already has automatic printing

### Current Payment Status:
- 🟢 **Cash**: Production Ready
- 🟡 **PayPal**: Demo Mode (needs configuration)
- 🟡 **Stripe**: Demo Mode (needs configuration)
- 🟢 **Receipt Printing**: Production Ready

**Next Step**: Follow Step 1-4 above to enable real payment processing!
