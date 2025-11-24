# 🎯 PayPal Sandbox Testing Setup Guide

## Step 1: Get Your PayPal Sandbox Credentials

1. Go to **[PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)**
2. Log in with your PayPal account
3. Click **"Apps & Credentials"** in the left sidebar
4. Make sure **"Sandbox"** is selected at the top
5. Click **"Create App"** (or use an existing app)
6. You'll see two credentials:
   - **Client ID** (starts with `A...`)
   - **Secret** (click "Show" to reveal it)

## Step 2: Configure for Local Testing

### 2a. Update `.env` File

Open the `.env` file in your project root and paste your credentials:

```bash
# Replace these with your actual PayPal Sandbox credentials
PAYPAL_CLIENT_ID=YOUR_ACTUAL_SANDBOX_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_ACTUAL_SANDBOX_SECRET
PAYPAL_MODE=sandbox
```

### 2b. Update `payment-config.js`

Open `payment-config.js` and replace line 13:

```javascript
clientId: 'YOUR_PAYPAL_SANDBOX_CLIENT_ID',
```

With your actual Client ID:

```javascript
clientId: 'AYour-Actual-Client-ID-Here',
```

## Step 3: Install Dependencies

Make sure you have the PayPal SDK installed:

```bash
npm install @paypal/checkout-server-sdk
```

## Step 4: Test Locally with Netlify CLI

You need to use Netlify CLI to test the functions locally:

### 4a. Install Netlify CLI (if not installed)

```bash
npm install -g netlify-cli
```

### 4b. Run Local Dev Server

```bash
netlify dev
```

This will:
- Start your site on `http://localhost:8888`
- Load environment variables from `.env`
- Emulate Netlify Functions locally
- Allow PayPal testing to work

⚠️ **Don't use `python3 -m http.server` for PayPal testing** - it won't work because the Netlify Functions need to run!

## Step 5: Test the Payment Flow

1. Open `http://localhost:8888` in your browser
2. Add items to cart
3. Click "Zur Kasse"
4. Fill in customer details
5. Select **"PayPal"** as payment method
6. Click "Bestellung abschicken"
7. You should be redirected to PayPal Sandbox
8. Log in with a **Sandbox Test Account**:
   - Go to [Sandbox Accounts](https://developer.paypal.com/dashboard/accounts)
   - Use the "Personal Account" email and password
   - Or create a new test account

## Step 6: Verify Test Payment

After completing payment on PayPal:
- You'll be redirected back to your site
- Order should be saved to database
- Check the console for any errors

## Step 7: Deploy to Netlify (Production/Staging)

### 7a. Set Environment Variables in Netlify

1. Go to **Netlify Dashboard**
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add these variables:
   - `PAYPAL_CLIENT_ID` = Your Sandbox Client ID
   - `PAYPAL_CLIENT_SECRET` = Your Sandbox Secret
   - `PAYPAL_MODE` = `sandbox`

### 7b. Commit and Push Changes

```bash
git add payment-config.js
git commit -m "Enable PayPal Sandbox for testing"
git push
```

⚠️ **Never commit `.env` file** - it's already in `.gitignore`

### 7c. Redeploy Site

Netlify will auto-deploy when you push, or manually trigger a deploy:
- Go to **Deploys** tab
- Click **"Trigger deploy"** → **"Deploy site"**

## 🎉 You're Ready to Test!

### Test PayPal Integration:

1. Visit your Netlify site URL
2. Make a test order with PayPal payment
3. Use Sandbox test account credentials
4. Verify payment completes successfully

### Troubleshooting:

**Error: "Missing PayPal credentials"**
- Check environment variables are set correctly
- Redeploy after setting env vars

**PayPal redirect fails**
- Make sure you're using `netlify dev` (not python server)
- Check browser console for errors
- Verify Client ID matches in both `.env` and `payment-config.js`

**Payment doesn't complete**
- Check Netlify Function logs: `netlify functions:log`
- Verify PayPal credentials are correct
- Make sure using Sandbox test account

### Switch to Live Mode (Later):

When ready for production:
1. Get **Live** credentials from PayPal Dashboard
2. Update `PAYPAL_MODE=live` in environment variables
3. Update `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` with live credentials
4. Update `clientId` in `payment-config.js` with live Client ID
5. Go through PayPal's business verification process

## 📚 Useful Links:

- [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
- [PayPal Sandbox Testing Guide](https://developer.paypal.com/api/rest/sandbox/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
