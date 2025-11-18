# Deployment Guide - Erfurt Pizza Website

Complete guide to hosting and deploying your Erfurt Pizza website online.

## Table of Contents
1. [Quick Start Options](#quick-start-options)
2. [Free Hosting Solutions](#free-hosting-solutions)
3. [Paid Hosting Solutions](#paid-hosting-solutions)
4. [Domain Setup](#domain-setup)
5. [Step-by-Step Deployment](#step-by-step-deployment)
6. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Quick Start Options

Your website is a **static website** (HTML, CSS, JavaScript), which means it's easy and cheap to host!

### Best Options for Your Pizza Shop:

| Option | Cost | Difficulty | Best For |
|--------|------|----------|----------|
| **Netlify** | FREE | ⭐ Easy | Beginners |
| **Vercel** | FREE | ⭐ Easy | Beginners |
| **GitHub Pages** | FREE | ⭐⭐ Medium | Tech-savvy users |
| **Hostinger** | ~€2/month | ⭐⭐ Medium | Custom domain + email |
| **All-Inkl** | ~€5/month | ⭐⭐ Medium | German hosting |

**Recommendation**: Start with **Netlify** (free, easy, professional)

---

## Free Hosting Solutions

### Option 1: Netlify (Recommended for Beginners) ⭐

**Pros:**
- ✅ Completely free
- ✅ Super easy setup (drag & drop)
- ✅ Free SSL certificate (HTTPS)
- ✅ Custom domain support
- ✅ Automatic deployments from Git
- ✅ Fast global CDN

**Steps to Deploy:**

1. **Create Account**
   - Go to https://www.netlify.com/
   - Sign up (free account)

2. **Deploy Your Site**

   **Method A: Drag & Drop (Easiest)**
   - Zip your website files:
     ```bash
     - index.html
     - styles.css
     - script.js
     - menu-data.js
     - assets/ (folder)
     ```
   - Drag the folder to Netlify dashboard
   - Your site is live in seconds!

   **Method B: Git Deploy (Recommended)**
   - Push your code to GitHub (you're already doing this!)
   - In Netlify: "Import from Git"
   - Select your repository
   - Click "Deploy"
   - Every push to GitHub = automatic update!

3. **Custom Domain** (Optional)
   - Buy domain (e.g., `erfurt-pizza.de`)
   - In Netlify: Settings → Domain management
   - Add your custom domain
   - Follow DNS instructions

**Your site will be:** `https://your-site-name.netlify.app`

---

### Option 2: Vercel

Very similar to Netlify, equally good!

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Import your repository
4. Deploy!

**Your site will be:** `https://your-site-name.vercel.app`

---

### Option 3: GitHub Pages

**Free hosting directly from your GitHub repository!**

**Steps:**

1. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Select your branch (`main` or `claude/erfurt-pizza-website-01KEwY4XZxJ4ZjrSsWMWStUK`)
   - Click Save

2. **Your site will be live at:**
   ```
   https://your-username.github.io/Erfurt-Pizza/
   ```

3. **Custom Domain** (Optional)
   - Add `CNAME` file with your domain
   - Configure DNS

**Note**: GitHub Pages doesn't support backend, perfect for static sites!

---

## Paid Hosting Solutions (For Full Control)

### Option 1: Hostinger (~€2-4/month)

**Best for**: Custom domain + email addresses

**Includes:**
- Web hosting
- Custom domain (e.g., erfurt-pizza.de)
- Email addresses (info@erfurt-pizza.de)
- SSL certificate
- Easy file upload

**Steps:**
1. Go to https://www.hostinger.de/
2. Choose "Web Hosting" plan
3. Register domain
4. Upload files via File Manager or FTP
5. Done!

---

### Option 2: All-Inkl (German Hosting) (~€5/month)

**Best for**: German customers, includes email

**Why All-Inkl:**
- German company (GDPR compliant)
- Excellent German support
- Reliable
- Good for businesses

**Steps:**
1. Go to https://all-inkl.com/
2. Choose "PrivatPlus" or "Premium" plan
3. Register domain
4. Upload via FTP or File Manager

---

### Option 3: IONOS by 1&1 (~€4/month)

Another German option, similar to All-Inkl.

---

## Domain Setup

### Where to Buy Domain:

**Recommended Domain Registrars:**
- **Namecheap** (https://www.namecheap.com/) - Cheap, reliable
- **Cloudflare** (https://www.cloudflare.com/) - Best prices
- **United Domains** (https://www.united-domains.de/) - German
- **IONOS** (https://www.ionos.de/) - German

### Good Domain Names for Your Shop:

- `erfurt-pizza.de` ⭐ (best)
- `pizza-erfurt.de`
- `erfurtpizza.de`
- `pizza-erfurt.com`

**Cost**: ~€5-12/year for .de domain

---

## Step-by-Step: Netlify Deployment (Detailed)

### Step 1: Prepare Your Files

Make sure you have:
```
Erfurt-Pizza/
├── index.html
├── styles.css
├── script.js
├── menu-data.js
├── assets/
│   ├── menu/
│   ├── placeholder.jpg
│   └── README.md
└── README.md (optional)
```

### Step 2: Sign Up for Netlify

1. Go to https://www.netlify.com/
2. Click "Sign up"
3. Choose "Sign up with GitHub" (easiest)

### Step 3: Deploy from Git (Recommended)

1. In Netlify dashboard, click "Add new site" → "Import an existing project"
2. Choose "GitHub"
3. Authorize Netlify
4. Select your `Erfurt-Pizza` repository
5. Configure build settings:
   - **Branch to deploy**: `main` (or your branch)
   - **Build command**: (leave empty)
   - **Publish directory**: `/` (root)
6. Click "Deploy site"

### Step 4: Configure Your Site

1. **Change site name**:
   - Site settings → Change site name
   - Choose: `erfurt-pizza` or any available name
   - Your URL: `https://erfurt-pizza.netlify.app`

2. **Enable HTTPS** (automatic)
   - Already enabled by default!

3. **Add custom domain** (if you have one):
   - Domain settings → Add custom domain
   - Follow DNS instructions

### Step 5: Automatic Deployments

Now, every time you push to GitHub:
- Netlify automatically rebuilds your site
- Changes go live in ~30 seconds
- You can rollback anytime

---

## Post-Deployment Checklist

After deploying, make sure to:

### 1. Test Everything
- [ ] Website loads correctly
- [ ] All pages navigate properly
- [ ] Menu items display
- [ ] Shopping cart works
- [ ] Forms submit correctly
- [ ] Mobile responsive
- [ ] All images load

### 2. Update Contact Information
- [ ] Update phone numbers in HTML
- [ ] Update Google Maps embed
- [ ] Update address
- [ ] Test phone number links

### 3. Add Essential Pages

Create these additional pages (required in Germany):

#### **Impressum** (Imprint) - REQUIRED BY LAW!
Create `impressum.html`:
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Impressum - Erfurt Pizza</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header"><!-- navigation --></header>

    <section class="section container">
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
            Erfurt Pizza<br>
            [Your Name / Business Name]<br>
            An der Lache 41<br>
            99086 Erfurt
        </p>

        <h2>Kontakt</h2>
        <p>
            Telefon: 0361 65 44 22 75<br>
            E-Mail: info@erfurt-pizza.de
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br>
            [Your VAT number if applicable]
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
            [Your Name]<br>
            An der Lache 41<br>
            99086 Erfurt
        </p>
    </section>

    <footer class="footer"><!-- footer --></footer>
</body>
</html>
```

#### **Datenschutzerklärung** (Privacy Policy)
Use a generator: https://www.datenschutz-generator.de/

#### **AGB** (Terms & Conditions)
Use a generator: https://www.agb.de/

### 4. Add Links in Footer

Update your footer in `index.html`:
```html
<div class="footer__content">
    <h3 class="footer__title">Rechtliches</h3>
    <ul class="footer__links">
        <li><a href="impressum.html">Impressum</a></li>
        <li><a href="datenschutz.html">Datenschutz</a></li>
        <li><a href="agb.html">AGB</a></li>
    </ul>
</div>
```

### 5. SEO Optimization

Add to `<head>` in `index.html`:
```html
<!-- Favicon -->
<link rel="icon" type="image/png" href="assets/favicon.png">

<!-- SEO Meta Tags -->
<meta name="description" content="Erfurt Pizza - Die beste Pizza in Erfurt! Bestellen Sie Pizza, Burger und indische Spezialitäten. Schnelle Lieferung in ganz Erfurt.">
<meta name="keywords" content="Pizza Erfurt, Pizza bestellen Erfurt, Lieferservice Erfurt, Burger Erfurt, Indisches Essen Erfurt">
<meta name="author" content="Erfurt Pizza">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://your-domain.com/">
<meta property="og:title" content="Erfurt Pizza - Beste Pizza in Erfurt">
<meta property="og:description" content="Bestellen Sie jetzt! Pizza, Burger und indische Spezialitäten mit schneller Lieferung.">
<meta property="og:image" content="https://your-domain.com/assets/og-image.jpg">

<!-- Local Business Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Erfurt Pizza",
  "image": "https://your-domain.com/assets/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "An der Lache 41",
    "addressLocality": "Erfurt",
    "postalCode": "99086",
    "addressCountry": "DE"
  },
  "telephone": "+4936165442275",
  "servesCuisine": ["Pizza", "Burger", "Indian"],
  "priceRange": "€€",
  "openingHours": [
    "Mo-Fr 16:30-22:30",
    "Sa-Su 14:45-22:30"
  ]
}
</script>
```

### 6. Google My Business

List your business on Google:
1. Go to https://www.google.com/business/
2. Claim your business listing
3. Add photos, menu, hours
4. Link to your website
5. Encourage customer reviews

### 7. Analytics (Optional)

Add Google Analytics to track visitors:

1. Create account: https://analytics.google.com/
2. Get tracking code
3. Add before `</head>` in HTML:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Performance Optimization

### 1. Image Optimization
- Compress all images: https://tinypng.com/
- Use WebP format when possible
- Add lazy loading:
  ```html
  <img src="image.jpg" loading="lazy" alt="Description">
  ```

### 2. Enable Caching

Add `_headers` file in root (for Netlify):
```
/*
  Cache-Control: public, max-age=31536000
```

### 3. Minify Files (Optional)

Use tools to compress your CSS and JS:
- https://www.minifier.org/

---

## Updating Your Website

### With Netlify + GitHub:
1. Make changes to your files
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Updated menu prices"
   git push
   ```
3. Netlify automatically deploys in 30 seconds!

### With FTP (Traditional Hosting):
1. Connect via FileZilla
2. Upload changed files
3. Done!

---

## Troubleshooting

### Website not loading?
- Check if files are in correct directory
- Verify `index.html` is in root
- Check browser console for errors

### Images not showing?
- Verify image paths are correct
- Check if images exist in `assets/` folder
- Make sure image names match exactly

### Forms not working?
- For contact forms, you need a backend
- Use Netlify Forms (free)
- Or use Formspree: https://formspree.io/

---

## Next Steps

1. **Deploy your website** using Netlify (easiest)
2. **Add your menu images**
3. **Buy a custom domain** (erfurt-pizza.de)
4. **Create Impressum, Datenschutz, AGB**
5. **Set up Google My Business**
6. **Add payment integration** (see PAYMENT_INTEGRATION.md)
7. **Promote your website** on social media
8. **Print the URL on your pizza boxes!**

---

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com/
- **GitHub Pages**: https://pages.github.com/
- **Hosting Comparison**: https://www.websiteplanet.com/
- **German Hosting Reviews**: https://www.webhostlist.de/

---

## Estimated Costs

### Free Option (Recommended to Start):
- Netlify hosting: **FREE**
- Custom domain: **€8-12/year**
- SSL certificate: **FREE** (included)
- **Total: ~€10/year**

### Paid Option (With Email):
- Hostinger hosting: **€2-4/month**
- Domain included: **FREE**
- Email addresses: **Included**
- **Total: ~€30-50/year**

---

## Quick Deploy Checklist

Before going live:

- [ ] All menu items added
- [ ] All images uploaded and optimized
- [ ] Contact information updated
- [ ] Phone numbers clickable (working)
- [ ] Google Maps link working
- [ ] Impressum page created
- [ ] Privacy policy added
- [ ] Tested on mobile phone
- [ ] Tested ordering process
- [ ] SSL enabled (HTTPS)
- [ ] Custom domain configured (optional)

**You're ready to launch! 🚀🍕**

---

Need help? Open an issue on GitHub or contact your web developer!
