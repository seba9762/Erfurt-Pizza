# Quick Start: Deploy Your Erfurt Pizza Website

This guide will help you deploy both your frontend and backend in under 30 minutes.

## Current Status

✅ **Frontend**: Already configured for Netlify deployment
✅ **Backend**: Production-ready Node.js API with PayPal and Stripe

## Option 1: Budget Setup ($6/month) - RECOMMENDED

Perfect for starting out, can handle 100k+ requests/month.

### What You Get:
- Frontend on Netlify (FREE with CDN)
- Backend on Railway ($5/month)
- Custom domain ($9/year ≈ $0.75/month)
- Automatic HTTPS
- Auto-deploy on git push
- **Total: ~$6/month**

### Setup Steps:

#### 1. Frontend (Already Done! ✅)
Your frontend is already on Netlify. Just make sure:
- Connected to your GitHub repository
- Domain: erfurtpizza.com configured
- Automatic deployments enabled

#### 2. Backend on Railway (15 minutes)

1. **Sign up for Railway:**
   - Go to https://railway.app/
   - Click "Sign in with GitHub"
   - Authorize Railway

2. **Deploy Backend:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `Erfurt-Pizza` repository
   - Click on the service that was created
   - Go to Settings:
     - **Root Directory**: `backend-template`
     - **Start Command**: `npm start`

3. **Add Environment Variables:**
   - Go to Variables tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=3000
     FRONTEND_URL=https://erfurtpizza.com
     PAYPAL_MODE=sandbox
     PAYPAL_CLIENT_ID=<your_paypal_client_id>
     PAYPAL_CLIENT_SECRET=<your_paypal_secret>
     STRIPE_SECRET_KEY=<your_stripe_secret_key>
     STRIPE_PUBLISHABLE_KEY=<your_stripe_public_key>
     ```

4. **Get Your Backend URL:**
   - Go to Settings → Networking
   - Copy your Railway URL (e.g., `https://your-app.railway.app`)

#### 3. Connect Frontend to Backend (5 minutes)

1. Update `payment-config.js` in your repository:
   ```javascript
   // At the top of the file, add:
   const backendURL = 'https://your-app.railway.app';
   ```

2. Update the payment functions to use this URL:
   ```javascript
   // In processPayPalPayment function:
   const response = await fetch(`${backendURL}/api/create-paypal-order`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ orderData: orderData })
   });

   // In processStripePayment function:
   const response = await fetch(`${backendURL}/api/create-stripe-session`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ orderData: orderData })
   });
   ```

3. Commit and push:
   ```bash
   git add payment-config.js
   git commit -m "Connect frontend to Railway backend"
   git push
   ```

4. Netlify will automatically deploy (takes ~30 seconds)

#### 4. Test Everything (10 minutes)

1. Visit your website: https://erfurtpizza.com
2. Add items to cart
3. Go to checkout
4. Test with PayPal sandbox account or Stripe test card:
   - Card: 4242 4242 4242 4242
   - Expiry: 12/25
   - CVC: 123

**You're live! 🎉**

---

## Option 2: Better Performance ($13/month)

For growing business with more traffic.

### What You Get:
- Frontend on Netlify (FREE)
- Backend on Render ($7/month)
- PostgreSQL Database on Railway ($5/month)
- **Total: ~$13/month**
- Handles unlimited traffic

### Deploy to Render:

1. Go to https://render.com/
2. Sign up with GitHub
3. New → Web Service
4. Connect your repository
5. Configure:
   - **Name**: erfurt-pizza-backend
   - **Root Directory**: `backend-template`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Starter ($7/month)

6. Add Environment Variables (same as Railway)
7. Create Service

Your backend will be at: `https://erfurt-pizza-backend.onrender.com`

---

## Option 3: Maximum Control ($25-30/month)

For serious business with high traffic expectations.

### What You Get:
- Frontend on Netlify (FREE)
- Backend on DigitalOcean Droplet ($12/month)
- Managed PostgreSQL Database ($15/month)
- Full server control
- Can scale to handle massive traffic
- **Total: ~$27/month**

### Quick Setup:

See [PRODUCTION-HOSTING-GUIDE.md](PRODUCTION-HOSTING-GUIDE.md) for detailed instructions on setting up DigitalOcean.

---

## Getting Payment Credentials

### PayPal Setup:

1. Go to https://developer.paypal.com/
2. Log in with your PayPal account
3. Dashboard → My Apps & Credentials
4. Under "Sandbox", create new app or use existing
5. Copy:
   - **Client ID** → Use for `PAYPAL_CLIENT_ID`
   - **Secret** → Use for `PAYPAL_CLIENT_SECRET`
6. For production: Switch to "Live" tab and get live credentials

### Stripe Setup:

1. Go to https://dashboard.stripe.com/
2. Create account or log in
3. Developers → API Keys
4. Copy:
   - **Publishable key** (pk_test_...) → Use for `STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (sk_test_...) → Use for `STRIPE_SECRET_KEY`
5. For production: Activate your account and use live keys

---

## Comparison: Which Option to Choose?

| Feature | Budget ($6/mo) | Better ($13/mo) | Max Control ($27/mo) |
|---------|----------------|-----------------|----------------------|
| Handles Traffic | 100k requests | Unlimited | Massive scale |
| Orders/Day | Up to 3000 | Unlimited | Unlimited |
| Database | None (orders in logs) | PostgreSQL | Managed PostgreSQL |
| Setup Time | 30 minutes | 30 minutes | 1-2 hours |
| Technical Skills | Beginner | Beginner | Intermediate |
| Auto-Deploy | ✅ Yes | ✅ Yes | Manual |
| Best For | Starting out | Growing business | Established business |

**Recommendation:** Start with Budget option, upgrade when you're getting 50+ orders/day.

---

## After Deployment Checklist

- [ ] Frontend accessible at erfurtpizza.com
- [ ] Backend health check working: `https://your-backend.com/health`
- [ ] Test order with PayPal sandbox
- [ ] Test order with Stripe test card
- [ ] Verify order confirmation shows
- [ ] Check backend logs show orders
- [ ] Set up monitoring (UptimeRobot)
- [ ] Configure backup strategy (if using database)
- [ ] Update payment keys from test to live (when ready)

---

## Switching from Test to Production

When you're ready to accept real payments:

### PayPal:
1. Get your business verified on PayPal
2. Get Live API credentials from PayPal Developer Dashboard
3. Update environment variables:
   ```
   PAYPAL_MODE=live
   PAYPAL_CLIENT_ID=<live_client_id>
   PAYPAL_CLIENT_SECRET=<live_client_secret>
   ```

### Stripe:
1. Activate your Stripe account
2. Go to Dashboard → API Keys
3. Switch from "Test mode" to "Live mode"
4. Update environment variables:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

### IMPORTANT:
- Test with small real transaction first (€0.50)
- Monitor for errors in dashboard
- Keep test credentials saved for future testing

---

## Monitoring Your Website

### 1. Uptime Monitoring (FREE):
- Sign up at https://uptimerobot.com/
- Add monitor for your backend: `https://your-backend.com/health`
- Get alerts if website goes down

### 2. View Backend Logs:
- **Railway**: Dashboard → Deployments → Logs
- **Render**: Dashboard → Logs tab
- **DigitalOcean**: SSH in and run `pm2 logs`

### 3. Check Orders:
- Check backend logs for order details
- Later: Set up database to store orders permanently

---

## Updating Your Website

### Making Changes:

1. Edit files locally
2. Test locally if possible
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. Frontend deploys automatically on Netlify (~30 seconds)
5. Backend deploys automatically on Railway/Render (~2 minutes)

---

## Getting Help

- **Railway Issues**: Check logs in Railway dashboard
- **Render Issues**: Check logs in Render dashboard
- **Payment Issues**: Check PayPal/Stripe dashboard
- **Website Errors**: Open browser console (F12)

---

## Cost Summary

### Year 1 Costs:

**Budget Option:**
- Railway: $5 × 12 = $60/year
- Domain: $9/year
- **Total: $69/year (~$6/month)**

**Better Option:**
- Render: $7 × 12 = $84/year
- Railway DB: $5 × 12 = $60/year
- Domain: $9/year
- **Total: $153/year (~$13/month)**

**Max Control:**
- DigitalOcean: $12 × 12 = $144/year
- Database: $15 × 12 = $180/year
- Domain: $9/year
- **Total: $333/year (~$28/month)**

---

## Next Steps

1. Choose your deployment option
2. Follow the setup steps above
3. Deploy backend (15-30 minutes)
4. Connect frontend to backend (5 minutes)
5. Test everything (10 minutes)
6. Go live! 🚀🍕

**Need help? Check:**
- [PRODUCTION-HOSTING-GUIDE.md](PRODUCTION-HOSTING-GUIDE.md) - Detailed hosting guide
- [BACKEND-SETUP-GUIDE.md](BACKEND-SETUP-GUIDE.md) - Backend setup details
- [backend-template/README.md](backend-template/README.md) - Backend API docs

---

**You're ready to accept online orders! 🎉**
