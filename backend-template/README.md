# Erfurt Pizza Backend

Backend API for processing PayPal and Stripe payments.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend-template
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API keys
nano .env
```

### 3. Get API Credentials

#### PayPal:
1. Go to https://developer.paypal.com/
2. Log in and go to Dashboard → My Apps & Credentials
3. Create a new app (or use existing)
4. Copy **Client ID** and **Secret**
5. Paste into `.env` file

#### Stripe:
1. Go to https://dashboard.stripe.com/
2. Go to Developers → API Keys
3. Copy **Publishable Key** (`pk_test_...`)
4. Copy **Secret Key** (`sk_test_...`)
5. Paste into `.env` file

### 4. Run the Server

```bash
# Production mode
npm start

# Development mode (auto-reload)
npm run dev
```

You should see:
```
🚀 Erfurt Pizza Backend running on port 3000
📍 Frontend URL: http://localhost:8080
💳 PayPal Mode: sandbox
✅ Server ready to accept payments!
```

## 📝 API Endpoints

### PayPal

**Create Order:**
```
POST /api/create-paypal-order
Body: { "orderData": {...} }
```

**Capture Payment:**
```
POST /api/capture-paypal-payment
Body: { "orderId": "..." }
```

### Stripe

**Create Checkout Session:**
```
POST /api/create-stripe-session
Body: { "orderData": {...} }
```

**Verify Payment:**
```
GET /api/verify-stripe-payment?session_id=...
```

### Health Check

```
GET /health
```

## 🧪 Testing

### Test PayPal Sandbox:
- Use sandbox accounts from PayPal Developer Dashboard
- No real money is charged

### Test Stripe:
- Use test mode API keys (`pk_test_...`, `sk_test_...`)
- Test card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

## 🌐 Deployment

### Deploy to Heroku:

```bash
heroku create erfurt-pizza-backend
heroku config:set PAYPAL_CLIENT_ID=your_id
heroku config:set PAYPAL_CLIENT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=your_key
heroku config:set FRONTEND_URL=https://erfurtpizza.com
git push heroku main
```

### Deploy to Your Own Server:

```bash
# Upload files
scp -r . user@your-server:/var/www/backend/

# Install and start with PM2
ssh user@your-server
cd /var/www/backend
npm install
pm2 start server.js --name erfurt-pizza-backend
pm2 save
```

## 🔒 Security

- Never commit `.env` file
- Use HTTPS in production
- Keep API keys secret
- Implement rate limiting for production
- Set up webhook signature verification

## 📞 Support

See `BACKEND-SETUP-GUIDE.md` for detailed setup instructions.
