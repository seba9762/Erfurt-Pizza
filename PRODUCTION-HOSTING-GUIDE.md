# Production Hosting Guide - Scalable Solution for Erfurt Pizza

This guide provides a complete production-ready hosting solution that can handle all your traffic for both frontend and backend, with clear monthly costs.

## 🎯 Recommended Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Your Domain                          │
│                 erfurtpizza.com                          │
└─────────────────┬───────────────────────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
┌───────────────┐    ┌──────────────────┐
│   Frontend    │    │     Backend      │
│   (Netlify)   │    │   (Railway/      │
│   Static Site │    │    Render/       │
│   FREE        │    │    DigitalOcean) │
│   + CDN       │    │   $5-10/month    │
└───────────────┘    └──────────────────┘
```

## 💰 Complete Cost Breakdown

### Option 1: Most Economical ($5-7/month)
- **Frontend**: Netlify (FREE)
- **Backend**: Railway.app ($5/month)
- **Domain**: Cloudflare ($9/year ≈ $0.75/month)
- **Total**: ~$6/month

### Option 2: Recommended for Growth ($12-15/month)
- **Frontend**: Netlify (FREE)
- **Backend**: Render.com ($7/month) or Railway ($5-10/month)
- **Database**: Railway Postgres ($5/month)
- **Domain**: ($10/year)
- **Total**: ~$13/month

### Option 3: Maximum Performance ($20-30/month)
- **Frontend**: Netlify Pro ($19/month) or Vercel Pro ($20/month)
- **Backend**: DigitalOcean Droplet ($12/month)
- **Managed Database**: DigitalOcean Postgres ($15/month)
- **CDN**: Cloudflare (FREE)
- **Domain**: ($10/year)
- **Total**: ~$25-30/month

## 🚀 Solution 1: Railway.app (Easiest & Affordable)

**Perfect for**: Small to medium traffic, easy setup
**Cost**: $5/month (includes 500 hours runtime + $5 credit)
**Handles**: ~100k+ requests/month

### Why Railway?
- ✅ Extremely easy deployment (connect GitHub)
- ✅ Automatic HTTPS
- ✅ Auto-scaling
- ✅ Built-in PostgreSQL database
- ✅ Environment variables management
- ✅ Automatic deployments on git push
- ✅ Great for Node.js apps

### Step-by-Step: Deploy Backend on Railway

#### 1. Prepare Your Backend

First, let's create a proper backend structure from your template:

```bash
# Copy backend template to backend folder
mkdir -p backend
cp backend-template/package.json backend/
cp backend-template/server.js backend/ # (we'll create this)
```

#### 2. Create Production-Ready server.js

Your backend needs to be in a deployable state with proper error handling and logging.

#### 3. Create Railway Account

1. Go to https://railway.app/
2. Sign up with GitHub (easiest)
3. You get $5 free credit + $5/month for $5

#### 4. Deploy Backend

**In Railway Dashboard:**

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `Erfurt-Pizza` repository
4. Configure:
   - **Root Directory**: `/backend`
   - **Start Command**: `npm start`
   - **Build Command**: `npm install`

5. Add Environment Variables:
   ```
   PORT=3000
   FRONTEND_URL=https://erfurtpizza.com
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your_client_id
   PAYPAL_CLIENT_SECRET=your_secret
   STRIPE_SECRET_KEY=your_stripe_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
   NODE_ENV=production
   ```

6. Deploy!

**Your backend will be live at**: `https://your-app-name.railway.app`

#### 5. Update Frontend to Use Backend URL

In your `payment-config.js`, update:

```javascript
// Production backend URL
const backendURL = 'https://your-app-name.railway.app';
```

#### 6. Configure Custom Domain (Optional)

In Railway:
- Settings → Custom Domain
- Add: `api.erfurtpizza.com`
- Update DNS (Railway provides instructions)

---

## 🚀 Solution 2: Render.com (Great Alternative)

**Perfect for**: Similar to Railway, slightly different pricing
**Cost**: $7/month (Web Service plan)
**Handles**: Unlimited traffic

### Why Render?
- ✅ Simple deployment
- ✅ Automatic HTTPS
- ✅ Free SSL certificates
- ✅ PostgreSQL database ($7/month extra)
- ✅ Health checks & auto-restart
- ✅ DDoS protection

### Deploy on Render

1. Go to https://render.com/
2. Sign up with GitHub
3. New Web Service → Select your repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Starter ($7/month)

5. Add Environment Variables (same as Railway)

6. Deploy!

**Your backend**: `https://your-app.onrender.com`

---

## 🚀 Solution 3: DigitalOcean (Maximum Control)

**Perfect for**: High traffic, full control, scaling
**Cost**: $12/month (Basic Droplet) + $15/month (Managed Database)
**Handles**: Can handle massive traffic with proper setup

### Why DigitalOcean?
- ✅ Full server control
- ✅ Scalable (can upgrade anytime)
- ✅ Managed databases available
- ✅ Load balancers available
- ✅ Professional infrastructure
- ✅ Great documentation

### Deploy on DigitalOcean

#### 1. Create Droplet

1. Sign up at https://www.digitalocean.com/
2. Create → Droplets
3. Choose:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic $12/month (2GB RAM, 1 CPU)
   - **Datacenter**: Frankfurt (closest to Germany)
   - **Add SSH key** for secure access

#### 2. Set Up Server

SSH into your droplet:

```bash
ssh root@your_droplet_ip
```

Install Node.js and dependencies:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install nginx (reverse proxy)
apt install -y nginx

# Install certbot (for SSL)
apt install -y certbot python3-certbot-nginx
```

#### 3. Deploy Your Backend

```bash
# Create app directory
mkdir -p /var/www/erfurt-pizza-backend
cd /var/www/erfurt-pizza-backend

# Clone your repository
git clone https://github.com/your-username/Erfurt-Pizza.git .
cd backend

# Install dependencies
npm install --production

# Create .env file
nano .env
```

Add your environment variables:
```env
PORT=3000
FRONTEND_URL=https://erfurtpizza.com
PAYPAL_MODE=live
PAYPAL_CLIENT_ID=your_id
PAYPAL_CLIENT_SECRET=your_secret
STRIPE_SECRET_KEY=your_key
NODE_ENV=production
```

Start with PM2:
```bash
pm2 start server.js --name erfurt-pizza-backend
pm2 save
pm2 startup
```

#### 4. Configure Nginx

Create nginx config:

```bash
nano /etc/nginx/sites-available/erfurt-pizza-api
```

Add:
```nginx
server {
    listen 80;
    server_name api.erfurtpizza.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/erfurt-pizza-api /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 5. Add SSL Certificate

```bash
certbot --nginx -d api.erfurtpizza.com
```

Done! Your backend is now running at `https://api.erfurtpizza.com`

---

## 🗄️ Database Setup (For Storing Orders)

### Option 1: Railway PostgreSQL (Included with plan)

1. In Railway, click "New" → "Database" → "PostgreSQL"
2. Get connection URL from variables
3. Update your backend to connect to database

### Option 2: DigitalOcean Managed Database

1. Create → Databases → PostgreSQL
2. Choose plan: $15/month (1GB RAM)
3. Get connection details
4. Update backend connection string

### Database Schema for Orders

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    customer_address TEXT,
    items JSONB NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_method VARCHAR(20) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    payment_id VARCHAR(255),
    payment_status VARCHAR(20) DEFAULT 'pending',
    order_status VARCHAR(20) DEFAULT 'received',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_id ON orders(order_id);
CREATE INDEX idx_created_at ON orders(created_at);
CREATE INDEX idx_payment_status ON orders(payment_status);
```

---

## 🌐 DNS Configuration

### Point Domain to Services

**For Netlify (Frontend - erfurtpizza.com):**

Add DNS records:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

**For Backend (api.erfurtpizza.com):**

Railway/Render:
```
Type: CNAME
Name: api
Value: your-app.railway.app (or .onrender.com)
```

DigitalOcean:
```
Type: A
Name: api
Value: your_droplet_ip
```

---

## 📊 Traffic & Scaling Estimates

### What Each Plan Handles:

**Railway $5/month:**
- ~100,000 requests/month
- ~3,000 orders/month
- Perfect for starting out

**Render $7/month:**
- Unlimited requests (with reasonable use)
- Auto-scaling
- Good for growth

**DigitalOcean $12/month:**
- ~500,000 requests/month
- Can upgrade to handle millions
- Professional solution

### When to Upgrade:

- **0-50 orders/day**: Railway/Render $5-7/month ✅
- **50-200 orders/day**: Render $7/month or DigitalOcean $12/month
- **200+ orders/day**: DigitalOcean $24/month (4GB RAM) + Load Balancer

---

## 🔒 Security Checklist

### Essential Security Measures:

- [ ] HTTPS enabled (SSL certificates)
- [ ] Environment variables properly set (never in code)
- [ ] CORS configured (only your domain)
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (use parameterized queries)
- [ ] Webhook signature verification (PayPal/Stripe)
- [ ] Regular security updates
- [ ] Firewall configured (if using VPS)
- [ ] Backup strategy in place

### Add Rate Limiting to Backend:

```bash
npm install express-rate-limit
```

In `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 📈 Monitoring & Analytics

### 1. Uptime Monitoring (Free)

**UptimeRobot** (https://uptimerobot.com/)
- Monitor your backend URL
- Get alerts if it goes down
- Free for 50 monitors

### 2. Error Tracking

**Sentry** (https://sentry.io/)
- Free tier: 5k errors/month
- Real-time error reporting

Add to backend:
```bash
npm install @sentry/node
```

```javascript
const Sentry = require('@sentry/node');

Sentry.init({
    dsn: 'your-sentry-dsn',
    environment: process.env.NODE_ENV
});

// Add error handler
app.use(Sentry.Handlers.errorHandler());
```

### 3. Application Performance

**Railway/Render built-in metrics:**
- CPU usage
- Memory usage
- Response times

---

## 🚀 Deployment Workflow

### Automatic Deployments:

1. **Make changes** to your code locally
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update payment processing"
   git push origin main
   ```
3. **Automatic deployment**:
   - Frontend: Netlify deploys automatically (~30 seconds)
   - Backend: Railway/Render deploys automatically (~2 minutes)

### Manual Deployment (DigitalOcean):

```bash
# SSH into server
ssh root@your_droplet_ip

# Navigate to app
cd /var/www/erfurt-pizza-backend

# Pull latest changes
git pull origin main

# Install any new dependencies
cd backend
npm install --production

# Restart application
pm2 restart erfurt-pizza-backend
```

---

## 🆘 Troubleshooting

### Backend Not Responding:

**Railway/Render:**
1. Check logs in dashboard
2. Verify environment variables
3. Check health endpoint: `https://your-app.railway.app/health`

**DigitalOcean:**
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs erfurt-pizza-backend

# Restart if needed
pm2 restart erfurt-pizza-backend

# Check nginx
nginx -t
systemctl status nginx
```

### Database Connection Issues:

1. Verify connection string
2. Check firewall rules
3. Test connection:
   ```bash
   psql $DATABASE_URL
   ```

### Payment Processing Errors:

1. Check API keys are correct
2. Verify webhook URLs
3. Check Stripe/PayPal dashboard for errors
4. Review backend logs

---

## 📋 Production Launch Checklist

Before going live with payments:

### Backend:
- [ ] Backend deployed and accessible
- [ ] Health check endpoint working
- [ ] All environment variables set (PRODUCTION mode)
- [ ] Database connected (if using)
- [ ] SSL/HTTPS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Error logging set up
- [ ] Backups configured

### Payment Providers:
- [ ] Stripe: Switch from test to live keys
- [ ] PayPal: Switch from sandbox to production
- [ ] Test a real small transaction (€0.50)
- [ ] Verify webhooks are receiving events
- [ ] Check payment confirmation emails work

### Frontend:
- [ ] Backend URL updated to production
- [ ] All API endpoints tested
- [ ] Payment flow tested end-to-end
- [ ] Order confirmation working
- [ ] Receipt printing working

### Legal & Compliance:
- [ ] Impressum page complete
- [ ] Privacy policy updated (mention payment processors)
- [ ] Terms & Conditions reviewed
- [ ] Cookie consent (if using analytics)
- [ ] GDPR compliance checked

---

## 💡 Recommended Starting Setup

For Erfurt Pizza starting out, I recommend:

### Starting Configuration:
```
Frontend: Netlify (FREE)
Backend: Railway.app ($5/month)
Domain: Cloudflare ($9/year)
Total: ~$6/month
```

### After 6 Months (if growing):
```
Frontend: Netlify (FREE)
Backend: Render ($7/month)
Database: Railway Postgres ($5/month)
Total: ~$12/month
```

### After 1 Year (if successful):
```
Frontend: Netlify Pro ($19/month)
Backend: DigitalOcean Droplet ($12/month)
Database: DigitalOcean Managed DB ($15/month)
Monitoring: Sentry Pro ($26/month - optional)
Total: ~$46-72/month
```

---

## 🎯 Quick Start: Deploy in 30 Minutes

### Step 1: Frontend (5 minutes)
Your frontend is already on Netlify - ✅ Done!

### Step 2: Backend on Railway (20 minutes)

1. Sign up at Railway.app
2. Connect GitHub repository
3. Deploy from `/backend` directory
4. Add environment variables
5. Note your backend URL

### Step 3: Update Frontend (5 minutes)

1. Update `payment-config.js` with Railway URL
2. Commit and push
3. Netlify auto-deploys

### Step 4: Test (10 minutes)

1. Visit your website
2. Add items to cart
3. Try checkout with test payment
4. Verify order confirmation

**Done! You're live! 🎉**

---

## 📞 Support Resources

- **Railway**: https://docs.railway.app/
- **Render**: https://render.com/docs
- **DigitalOcean**: https://www.digitalocean.com/community/tutorials
- **Netlify**: https://docs.netlify.com/
- **Stripe**: https://stripe.com/docs
- **PayPal**: https://developer.paypal.com/docs/

---

## Need Help?

If you need assistance with deployment, create an issue on GitHub or reach out to a developer!

**Happy Selling! 🍕🚀**
