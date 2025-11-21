# Erfurt Pizza Backend API

Production-ready Node.js backend for processing payments via PayPal and Stripe.

## Features

- PayPal payment processing
- Stripe payment processing
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Request logging
- Health check endpoints
- Graceful shutdown
- Production-ready error handling

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

## 🌐 Production Deployment

### Option 1: Railway.app (Recommended - $5/month)

1. Push your code to GitHub
2. Go to https://railway.app/
3. Create new project → Deploy from GitHub
4. Select your repository
5. Configure:
   - Root Directory: `/backend-template`
   - Start Command: `npm start`
6. Add environment variables in Railway dashboard
7. Deploy!

### Option 2: Render.com ($7/month)

1. Go to https://render.com/
2. New Web Service → Connect repository
3. Configure:
   - Root Directory: `backend-template`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables
5. Deploy!

### Option 3: DigitalOcean ($12/month)

See [PRODUCTION-HOSTING-GUIDE.md](../PRODUCTION-HOSTING-GUIDE.md) for detailed instructions.

## 📊 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `FRONTEND_URL` | Your website URL | Yes |
| `PAYPAL_MODE` | sandbox or live | Yes |
| `PAYPAL_CLIENT_ID` | PayPal Client ID | Yes |
| `PAYPAL_CLIENT_SECRET` | PayPal Secret | Yes |
| `STRIPE_SECRET_KEY` | Stripe Secret Key | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe Public Key | Yes |

## 🔒 Security Features

- CORS protection (only accepts requests from configured origins)
- Rate limiting (100 requests per 15 minutes per IP)
- Request size limits (10MB max)
- Input validation
- Secure error handling (no sensitive info leaked in production)

## 🔧 Monitoring

### Check if backend is running:
```bash
curl https://your-backend-url.com/health
```

### View logs (Railway/Render):
Check the dashboard for real-time logs

### View logs (DigitalOcean with PM2):
```bash
pm2 logs erfurt-pizza-backend
```

## 🆘 Troubleshooting

### Backend not starting?
- Check if all environment variables are set
- Verify PayPal/Stripe credentials are correct
- Check logs for error messages

### CORS errors?
- Verify `FRONTEND_URL` matches your actual frontend URL
- Check if frontend is using correct backend URL

### Payment errors?
- Ensure you're using correct API keys (test vs live)
- Check PayPal/Stripe dashboard for error details

## 📞 Support

For detailed deployment instructions, see:
- [PRODUCTION-HOSTING-GUIDE.md](../PRODUCTION-HOSTING-GUIDE.md)
- [BACKEND-SETUP-GUIDE.md](../BACKEND-SETUP-GUIDE.md)

## License

ISC
