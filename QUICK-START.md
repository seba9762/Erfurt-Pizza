# Erfurt Pizza - Quick Start Guide 🚀

Get your pizza website up and running in 15 minutes!

## 🎯 Prerequisites

- Supabase account (https://supabase.com)
- Netlify account (https://netlify.com)
- GitHub account (to store code)

## ⚡ 5-Step Setup

### 1️⃣ Set Up Supabase (5 min)

1. Go to https://app.supabase.com
2. Create new project: **"erfurt-pizza"**
3. Go to **SQL Editor** → **New query**
4. Copy/paste entire `supabase-schema.sql` file
5. Click **"Run"**
6. Go to **Settings** → **API** and copy:
   - Project URL
   - anon/public key

### 2️⃣ Deploy to Netlify (3 min)

1. Push code to GitHub
2. Go to https://app.netlify.com
3. Click **"Add new site"** → **"Import from Git"**
4. Select your repository
5. Click **"Deploy"**

### 3️⃣ Add Environment Variables (2 min)

In Netlify → Site settings → Environment variables:

```
SUPABASE_URL = your-supabase-url
SUPABASE_ANON_KEY = your-supabase-anon-key
```

Then: **Deploys** → **Trigger deploy**

### 4️⃣ Test Your Site (2 min)

1. Visit your Netlify URL
2. Add item to cart
3. Complete checkout
4. Check Supabase → Table Editor → orders

### 5️⃣ Optional: Add Payments (3 min each)

**PayPal:**
```
PAYPAL_CLIENT_ID = your-client-id
PAYPAL_CLIENT_SECRET = your-secret
PAYPAL_MODE = sandbox
```

**Stripe:**
```
STRIPE_SECRET_KEY = sk_test_...
```

## 📁 Project Structure

```
erfurt-pizza/
├── index.html              # Main website
├── menu-data.js            # Menu items
├── script.js              # Frontend logic (updated for API)
├── payment-config.js      # Payment integration (updated for Netlify)
├── netlify/
│   └── functions/         # Backend API
│       ├── save-order.js
│       ├── get-orders.js
│       ├── update-order.js
│       ├── create-paypal-order.js
│       ├── create-stripe-session.js
│       └── utils/
│           ├── supabase.js
│           └── cors.js
├── supabase-schema.sql    # Database schema
├── netlify.toml           # Netlify config
└── .env.example           # Environment variables template
```

## 🔧 Key Features

✅ **Serverless** - No servers to manage
✅ **Free tier** - $0/month for small to medium traffic
✅ **Auto-scaling** - Handles traffic spikes
✅ **Global CDN** - Fast worldwide
✅ **HTTPS** - Automatic SSL
✅ **Database** - PostgreSQL via Supabase
✅ **Payments** - PayPal & Stripe ready

## 🎨 Customization

### Change Menu
Edit `menu-data.js` - add/remove items, change prices

### Change Styling
Edit `styles.css` - update colors, fonts, layout

### Change Logo
Replace image in `assets/` folder

### Change Restaurant Info
Edit contact details in `index.html`, `impressum.html`

## 🛠️ Local Development

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Copy environment variables
cp .env.example .env
# Edit .env with your credentials

# Install dependencies
cd netlify/functions && npm install && cd ../..

# Run local server
netlify dev
# Opens at http://localhost:8888
```

## 📊 View Orders

**Admin Dashboard:**
https://your-site.netlify.app/orders-dashboard.html

**Default password:** (check `orders-dashboard.html`)

**Or view in Supabase:**
Dashboard → Table Editor → orders

## 🚨 Troubleshooting

### "Failed to save order"
→ Check Supabase credentials in Netlify env vars

### "Payment failed"
→ Verify payment gateway credentials
→ Check sandbox vs live mode

### "Function timeout"
→ Check Netlify Functions logs
→ Verify Supabase connection

## 📚 Full Documentation

See `SUPABASE-NETLIFY-DEPLOYMENT.md` for:
- Detailed setup instructions
- Payment gateway configuration
- Security best practices
- Advanced features
- Troubleshooting guide

## 💡 Next Steps

1. ✅ Test order flow thoroughly
2. ✅ Update menu with your items
3. ✅ Customize styling to match brand
4. ✅ Set up payment gateways (optional)
5. ✅ Change admin password
6. ✅ Add custom domain (Netlify: Site settings → Domain management)
7. ✅ Set up email notifications (optional)

## 🎉 You're Done!

Your pizza ordering website is live! 🍕

**Support:**
- Check `SUPABASE-NETLIFY-DEPLOYMENT.md` for detailed help
- Netlify docs: https://docs.netlify.com
- Supabase docs: https://supabase.com/docs

Enjoy your new website! 🚀
