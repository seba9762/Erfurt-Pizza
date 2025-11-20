# Netlify Deployment Guide for erfurtpizza.com

This guide will walk you through deploying your Erfurt Pizza website on Netlify (free) and connecting your custom domain from checkdomain.de.

## Overview

- **Domain**: erfurtpizza.com (purchased from checkdomain.de)
- **Hosting**: Netlify (free tier)
- **Site Type**: Static HTML/CSS/JavaScript website

## Step 1: Create a Netlify Account

1. Go to [https://www.netlify.com/](https://www.netlify.com/)
2. Click "Sign Up" in the top right
3. Sign up using one of these options:
   - GitHub (recommended if you're using GitHub for your code)
   - GitLab
   - Bitbucket
   - Email

## Step 2: Deploy Your Website to Netlify

### Option A: Deploy via Git (Recommended)

This is the best option for automatic updates when you push changes to your repository.

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare site for Netlify deployment"
   git push -u origin claude/erfurt-pizza-website-01KEwY4XZxJ4ZjrSsWMWStUK
   ```

2. **In Netlify Dashboard**:
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (e.g., GitHub)
   - Authorize Netlify to access your repositories
   - Select your "Erfurt-Pizza" repository
   - Configure build settings:
     - **Branch to deploy**: `claude/erfurt-pizza-website-01KEwY4XZxJ4ZjrSsWMWStUK` (or your main branch)
     - **Build command**: Leave empty (no build needed)
     - **Publish directory**: `.` (current directory)
   - Click "Deploy site"

3. **Wait for deployment** (usually takes 1-2 minutes)
   - You'll get a random Netlify URL like: `https://random-name-123456.netlify.app`

### Option B: Deploy via Drag & Drop (Quick Start)

If you don't want to use Git:

1. In Netlify Dashboard, click "Add new site" → "Deploy manually"
2. Drag and drop your entire project folder
3. Wait for deployment to complete

**Note**: With this option, you'll need to manually re-upload your site whenever you make changes.

## Step 3: Connect Your Custom Domain (erfurtpizza.com)

### In Netlify:

1. **Go to your site** in the Netlify dashboard
2. Click "Domain settings"
3. Click "Add a domain" or "Add custom domain"
4. Enter: `erfurtpizza.com`
5. Click "Verify" and then "Add domain"
6. Netlify will show you DNS configuration instructions

### DNS Records You Need to Configure:

Netlify will provide you with specific DNS records. Here's what you'll typically need to add:

#### For Root Domain (erfurtpizza.com):

**Option 1: Using A Record (if Netlify provides an IP)**
- Type: `A`
- Name: `@` (or leave empty)
- Value: `75.2.60.5` (Netlify's load balancer IP - verify this in your Netlify dashboard)

**Option 2: Using ALIAS/ANAME Record (preferred)**
- Type: `ALIAS` or `ANAME`
- Name: `@` (or leave empty)
- Value: Your Netlify subdomain (e.g., `random-name-123456.netlify.app`)

#### For WWW Subdomain (www.erfurtpizza.com):

- Type: `CNAME`
- Name: `www`
- Value: Your Netlify subdomain (e.g., `random-name-123456.netlify.app`)

## Step 4: Configure DNS at checkdomain.de

1. **Log in to checkdomain.de**:
   - Go to [https://www.checkdomain.de/](https://www.checkdomain.de/)
   - Log in to your account

2. **Navigate to DNS Settings**:
   - Go to your domain management
   - Find "erfurtpizza.com"
   - Click on "DNS" or "DNS-Einstellungen" or "Nameserver"

3. **Add DNS Records**:

   **Remove any existing A or CNAME records for @ and www first!**

   Then add these records:

   ```
   Type: A
   Host: @ (or leave empty for root domain)
   Value: 75.2.60.5
   TTL: 3600 (or Auto)
   ```

   ```
   Type: CNAME
   Host: www
   Value: [your-site-name].netlify.app
   TTL: 3600 (or Auto)
   ```

   **Important**: Replace `[your-site-name]` with your actual Netlify subdomain!

4. **Save Changes**

## Step 5: Enable HTTPS in Netlify

1. Back in Netlify, go to "Domain settings"
2. Scroll down to "HTTPS"
3. Click "Verify DNS configuration"
4. Once DNS is verified (may take up to 24 hours, but usually 10-30 minutes), click "Provision certificate"
5. Netlify will automatically set up a free SSL certificate from Let's Encrypt

## Step 6: Final Configuration

### In Netlify Dashboard:

1. **Set Primary Domain** (if not already set):
   - Go to "Domain settings"
   - Make sure `erfurtpizza.com` is set as the primary domain
   - `www.erfurtpizza.com` should redirect to `erfurtpizza.com`

2. **Enable Asset Optimization** (Optional but recommended):
   - Go to "Site settings" → "Build & deploy" → "Post processing"
   - Enable "Bundle CSS" and "Minify CSS"
   - Enable "Bundle JS" and "Minify JS"
   - Enable "Compress images"
   - Enable "Pretty URLs"

## Step 7: Test Your Website

1. **Wait for DNS Propagation** (10 minutes to 24 hours, usually quick)
2. **Test Your Domain**:
   - Visit `https://erfurtpizza.com`
   - Visit `https://www.erfurtpizza.com` (should redirect to the non-www version)
   - Check that HTTPS is working (green padlock in browser)

3. **Check DNS Propagation**:
   - Use [https://www.whatsmydns.net/](https://www.whatsmydns.net/)
   - Enter `erfurtpizza.com` to see if DNS has propagated globally

## Troubleshooting

### DNS Not Working After 24 Hours

1. **Check nameservers at checkdomain.de**:
   - Make sure you're using checkdomain's nameservers, not external ones
   - DNS records only work if you're using the correct nameservers

2. **Verify DNS Records**:
   - Double-check that you entered the correct values
   - Make sure there are no typos
   - Ensure old records are removed

### SSL Certificate Not Provisioning

1. Make sure DNS is properly configured and propagated
2. Wait 24-48 hours for full DNS propagation
3. Try "Renew certificate" in Netlify's HTTPS settings

### Site Not Updating

If using Git deployment:
- Push your changes to the branch you configured in Netlify
- Netlify will automatically rebuild and deploy

If using drag & drop:
- Go to "Deploys" tab in Netlify
- Drag and drop your updated files

## Free Tier Limits

Netlify's free tier includes:
- ✅ 100 GB bandwidth/month (plenty for a restaurant website)
- ✅ Automatic HTTPS
- ✅ Continuous deployment from Git
- ✅ Instant cache invalidation
- ✅ Automatic CDN distribution
- ✅ Custom domain support

This should be more than enough for your restaurant website!

## Updating Your Website

### If Using Git Deployment:
```bash
# Make your changes, then:
git add .
git commit -m "Update menu items"
git push
# Netlify will automatically deploy the changes!
```

### If Using Manual Deployment:
1. Make your changes locally
2. Go to Netlify dashboard → "Deploys"
3. Drag and drop your updated folder

## Support Resources

- **Netlify Documentation**: [https://docs.netlify.com/](https://docs.netlify.com/)
- **Netlify Support**: [https://www.netlify.com/support/](https://www.netlify.com/support/)
- **checkdomain.de Support**: [https://www.checkdomain.de/support/](https://www.checkdomain.de/support/)
- **DNS Propagation Checker**: [https://www.whatsmydns.net/](https://www.whatsmydns.net/)

## Summary Checklist

- [ ] Create Netlify account
- [ ] Deploy site to Netlify (via Git or drag & drop)
- [ ] Add custom domain `erfurtpizza.com` in Netlify
- [ ] Configure DNS records at checkdomain.de
  - [ ] A record for root domain (@)
  - [ ] CNAME record for www subdomain
- [ ] Wait for DNS propagation (10 min - 24 hours)
- [ ] Verify DNS configuration in Netlify
- [ ] Enable HTTPS (provision SSL certificate)
- [ ] Test website at erfurtpizza.com
- [ ] Test redirect from www.erfurtpizza.com

---

**Need Help?** If you encounter any issues, feel free to reach out to Netlify support or checkdomain.de support. Both have excellent customer service!
