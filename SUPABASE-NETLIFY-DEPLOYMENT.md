# Erfurt Pizza - Supabase + Netlify Deployment Guide

Complete step-by-step guide to deploy your Erfurt Pizza website with Netlify (frontend + functions) and Supabase (database).

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Set Up Supabase Database](#step-1-set-up-supabase-database)
4. [Step 2: Deploy to Netlify](#step-2-deploy-to-netlify)
5. [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
6. [Step 4: Set Up Payment Gateways (Optional)](#step-4-set-up-payment-gateways-optional)
7. [Step 5: Test Your Deployment](#step-5-test-your-deployment)
8. [Troubleshooting](#troubleshooting)
9. [Local Development](#local-development)

---

## Overview

### Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Customers     │────────>│  Netlify         │────────>│   Supabase      │
│   (Browser)     │<────────│  - Static Site   │<────────│   PostgreSQL    │
│                 │         │  - Functions     │         │   Database      │
└─────────────────┘         └──────────────────┘         └─────────────────┘
                                    │
                                    ├──> PayPal API
                                    └──> Stripe API
```

### What You'll Get

✅ **Fully serverless architecture** - No servers to manage
✅ **Global CDN** - Fast loading worldwide via Netlify
✅ **Scalable database** - Supabase PostgreSQL with 500MB free
✅ **Automatic HTTPS** - SSL certificates included
✅ **Payment integration** - PayPal and Stripe support
✅ **Real-time orders** - Orders saved to database instantly
✅ **Admin dashboard** - View and manage orders

### Costs

- **Netlify**: Free tier (100GB bandwidth, 300 build minutes/month)
- **Supabase**: Free tier (500MB database, 2GB bandwidth, 50MB file storage)
- **Total**: **$0/month** for small to medium traffic

Upgrade when needed:
- Netlify Pro: $19/month (more bandwidth)
- Supabase Pro: $25/month (8GB database, 100GB bandwidth)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ GitHub account (to store your code)
- ✅ Netlify account (sign up at https://netlify.com)
- ✅ Supabase account (sign up at https://supabase.com)
- ✅ Optional: PayPal Developer account (https://developer.paypal.com)
- ✅ Optional: Stripe account (https://stripe.com)

---

## Step 1: Set Up Supabase Database

### 1.1 Create a Supabase Project

1. Go to https://app.supabase.com
2. Click **"New project"**
3. Fill in project details:
   - **Name**: `erfurt-pizza` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your location (e.g., `Europe (Frankfurt)`)
4. Click **"Create new project"**
5. Wait 1-2 minutes for setup to complete

### 1.2 Run Database Schema

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file `supabase-schema.sql` from your project
4. Copy the **entire contents** of the file
5. Paste into the SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: **"Success. No rows returned"**

This creates all necessary tables:
- `orders` - Customer orders
- `order_items` - Items in each order
- `menu_items` - Menu products (optional)
- `settings` - Restaurant settings
- `admin_users` - Admin authentication

### 1.3 Get Your Supabase API Credentials

1. Go to **Settings** → **API** (left sidebar)
2. Copy these values (you'll need them later):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)

**Important**: Keep these safe but the anon key is safe to expose in frontend.

---

## Step 2: Deploy to Netlify

### 2.1 Push Code to GitHub

If you haven't already:

```bash
# Initialize git repository (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit with Supabase integration"

# Create repository on GitHub
# Then push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/erfurt-pizza.git
git branch -M main
git push -u origin main
```

### 2.2 Connect to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"** (or your git provider)
4. Authorize Netlify to access your repositories
5. Select your `erfurt-pizza` repository

### 2.3 Configure Build Settings

Netlify should auto-detect settings, but verify:

- **Build command**: (leave empty)
- **Publish directory**: `.` (root directory)
- **Functions directory**: `netlify/functions` (should auto-detect)

Click **"Deploy site"**

### 2.4 Wait for Deployment

- Initial deployment takes 1-2 minutes
- You'll get a random URL like: `https://random-name-123.netlify.app`
- You can customize this later in **Site settings** → **Domain management**

---

## Step 3: Configure Environment Variables

### 3.1 Add Supabase Credentials to Netlify

1. In Netlify, go to your site
2. Click **Site settings** → **Environment variables**
3. Click **"Add a variable"** → **"Add a single variable"**
4. Add each of these:

| Key | Value | Where to get it |
|-----|-------|-----------------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase → Settings → API |
| `SUPABASE_ANON_KEY` | `eyJhbGc...` (long string) | Supabase → Settings → API |

Click **"Save"** after adding each variable.

### 3.2 Redeploy Site

After adding environment variables:

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for deployment to complete

---

## Step 4: Set Up Payment Gateways (Optional)

### Option A: PayPal Integration

#### 4.1 Create PayPal App

1. Go to https://developer.paypal.com/dashboard/
2. Login with your PayPal account
3. Go to **Apps & Credentials**
4. Under **Sandbox** (for testing), click **"Create App"**
5. Enter app name: `Erfurt Pizza`
6. Click **"Create App"**

#### 4.2 Get PayPal Credentials

Copy these credentials:
- **Client ID**: `AXXXXxxxxxxx...`
- **Secret**: `EXXXXxxxxxxx...`

#### 4.3 Add to Netlify Environment Variables

Add these variables in Netlify:

| Key | Value |
|-----|-------|
| `PAYPAL_CLIENT_ID` | Your Client ID |
| `PAYPAL_CLIENT_SECRET` | Your Secret |
| `PAYPAL_MODE` | `sandbox` (use `live` for production) |

#### 4.4 Switch to Live Mode (When Ready)

1. In PayPal Developer Dashboard, switch to **Live**
2. Create a **Live App**
3. Update Netlify environment variables with **Live credentials**
4. Change `PAYPAL_MODE` to `live`

### Option B: Stripe Integration

#### 4.1 Create Stripe Account

1. Go to https://dashboard.stripe.com/register
2. Complete registration
3. Activate your account (may require business verification)

#### 4.2 Get Stripe API Keys

1. Go to **Developers** → **API keys**
2. Copy:
   - **Publishable key**: `pk_test_...` (for testing)
   - **Secret key**: `sk_test_...` (for testing)

#### 4.3 Add to Netlify Environment Variables

| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (optional, can be in frontend) |

#### 4.4 Switch to Live Mode (When Ready)

1. In Stripe Dashboard, toggle from **Test mode** to **Live mode**
2. Copy **Live API keys**
3. Update Netlify environment variables
4. Verify account is activated for live payments

### 4.5 Test Payments

**PayPal Sandbox Test Accounts:**
- Go to https://developer.paypal.com/dashboard/accounts
- Use test buyer accounts to test payments
- No real money is charged in sandbox mode

**Stripe Test Cards:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

---

## Step 5: Test Your Deployment

### 5.1 Test Order Flow

1. Visit your Netlify URL
2. Browse menu and add items to cart
3. Click **"Zur Kasse"** (Checkout)
4. Fill in customer details
5. Choose payment method (Cash, PayPal, or Card)
6. Complete order

### 5.2 Verify Order in Supabase

1. Go to Supabase Dashboard
2. Click **Table Editor** → **orders**
3. You should see your test order!

### 5.3 Test Admin Dashboard

1. Visit `https://your-site.netlify.app/orders-dashboard.html`
2. Enter password (default from `orders-dashboard.html`)
3. View orders in real-time

**Security Note**: Change the default admin password!
- Edit `orders-dashboard.html`
- Find the password check logic
- Update to your secure password
- Or implement proper authentication using Supabase Auth

---

## Troubleshooting

### Issue: "Failed to save order"

**Possible causes:**
1. Supabase credentials not set correctly
2. Database schema not created
3. RLS policies blocking inserts

**Solution:**
1. Check environment variables in Netlify
2. Verify `supabase-schema.sql` was run successfully
3. Check Supabase logs: **Logs** → **Database**

### Issue: "PayPal payment failed"

**Possible causes:**
1. PayPal credentials incorrect
2. Wrong PayPal mode (sandbox vs live)

**Solution:**
1. Verify `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`
2. Check `PAYPAL_MODE` matches your credentials (sandbox or live)
3. Check Netlify Functions logs: **Functions** tab

### Issue: "Stripe payment failed"

**Possible causes:**
1. Stripe secret key incorrect
2. Using test key in live mode or vice versa

**Solution:**
1. Verify `STRIPE_SECRET_KEY` is correct
2. Match test/live mode with appropriate keys
3. Check Netlify Functions logs

### Issue: "Function timeout"

**Possible causes:**
1. Slow database response
2. Payment gateway delays

**Solution:**
1. Increase function timeout in `netlify.toml`
2. Check Supabase connection
3. Verify payment gateway API status

### Debugging Netlify Functions

1. Go to Netlify Dashboard → **Functions** tab
2. Click on a function (e.g., `save-order`)
3. View **Recent deploys** and **Function logs**
4. Look for error messages

### Debugging Supabase

1. Go to Supabase Dashboard → **Logs** → **Database**
2. Filter by time range
3. Look for SQL errors or connection issues

---

## Local Development

### Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Set Up Environment Variables Locally

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your credentials

### Install Dependencies

```bash
cd netlify/functions
npm install
cd ../..
```

### Run Local Development Server

```bash
netlify dev
```

This will:
- Start local server at `http://localhost:8888`
- Run Netlify Functions at `http://localhost:8888/.netlify/functions/`
- Load environment variables from `.env`
- Simulate production environment

### Test Netlify Functions Locally

```bash
# Test save-order function
curl -X POST http://localhost:8888/.netlify/functions/save-order \
  -H "Content-Type: application/json" \
  -d '{
    "orderData": {
      "name": "Test User",
      "phone": "123456789",
      "address": "Test Street 1",
      "city": "Erfurt",
      "cart": [],
      "total": "10.00"
    }
  }'
```

---

## Next Steps

### Security Enhancements

1. **Implement proper admin authentication**
   - Use Supabase Auth
   - Add role-based access control
   - See: https://supabase.com/docs/guides/auth

2. **Add rate limiting**
   - Prevent abuse of API endpoints
   - Use Netlify Edge Functions with rate limiting

3. **Enable CAPTCHA**
   - Prevent bot orders
   - Add Google reCAPTCHA to checkout form

### Performance Optimization

1. **Enable caching**
   - Cache static assets (already configured in `netlify.toml`)
   - Use CDN for images

2. **Optimize images**
   - Compress menu images
   - Use WebP format
   - Implement lazy loading

3. **Database indexing**
   - Already configured in schema
   - Monitor slow queries in Supabase

### Feature Additions

1. **Email notifications**
   - Use SendGrid or similar service
   - Send order confirmations to customers
   - Notify restaurant of new orders

2. **SMS notifications**
   - Use Twilio for SMS
   - Send order updates to customers

3. **Real-time order tracking**
   - Use Supabase Realtime
   - Update order status in real-time

4. **Menu management**
   - Create admin panel to manage menu
   - Update prices and availability
   - Add new items without code changes

---

## Support & Resources

### Documentation

- **Netlify**: https://docs.netlify.com
- **Supabase**: https://supabase.com/docs
- **PayPal**: https://developer.paypal.com/docs
- **Stripe**: https://stripe.com/docs

### Community

- **Netlify Community**: https://answers.netlify.com
- **Supabase Discord**: https://discord.supabase.com
- **Stack Overflow**: Tag questions with `netlify`, `supabase`

### Need Help?

If you encounter issues:
1. Check Netlify Function logs
2. Check Supabase Database logs
3. Review this guide's Troubleshooting section
4. Search community forums
5. Create an issue on GitHub

---

## Conclusion

Congratulations! 🎉 You now have a fully functional pizza ordering website with:

✅ Static frontend hosted on Netlify
✅ Serverless backend with Netlify Functions
✅ PostgreSQL database on Supabase
✅ Payment processing with PayPal/Stripe
✅ Admin dashboard for order management
✅ Automatic HTTPS and global CDN

**Total cost**: $0/month for small to medium traffic!

Enjoy your new pizza ordering system! 🍕
