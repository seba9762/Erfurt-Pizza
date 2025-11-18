# 🍕 Erfurt Pizza Website

Modern, responsive, and fully functional website for Erfurt Pizza - Pizza, Burger & Indian Specialties in Erfurt, Germany.

![Website Preview](assets/preview.png)

## 🌟 Features

### ✅ Core Functionality
- **Dynamic Menu System** - Easy to update menu items with prices
- **Shopping Cart** - Full-featured cart with localStorage
- **Multiple Categories** - Pizza, Burgers, Indian Specialties, Salads, Schnitzel
- **Size Selection** - Different sizes for pizzas (26cm, 30cm, 40cm)
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Pickup & Delivery** - 20% discount for pickup orders

### 🛒 E-Commerce Features
- Add to cart functionality
- Quantity adjustment
- Price calculation
- Delivery fee calculation
- Pickup discount (20%)
- Order form with validation
- Order confirmation

### 🎨 Design Features
- Modern UI with smooth animations
- Professional color scheme (red/orange food theme)
- Beautiful typography (Poppins + Playfair Display)
- Smooth scroll effects
- Hover animations
- Mobile-first responsive design
- Custom scrollbar
- Loading states

### 📱 Sections
1. **Hero Section** - Eye-catching intro with CTA buttons
2. **About Section** - Restaurant story and values
3. **Specials Section** - Highlighted offers and features
4. **Menu Section** - Filterable menu with categories
5. **Contact Section** - Contact info + Google Maps integration
6. **Footer** - Links, contact, and social media

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Erfurt-Pizza.git
cd Erfurt-Pizza
```

### 2. Open in Browser
Simply open `index.html` in your web browser!

No build process required - it's a static website.

### 3. Customize

#### Update Menu Items
Edit `menu-data.js`:
```javascript
{
    id: 1,
    name: "Your Pizza Name",
    category: "pizza",
    tags: ["pizza", "all"],
    description: "Your description",
    image: "assets/menu/your-image.jpg",
    sizes: [
        { size: "26cm", price: 6.50 },
        { size: "30cm", price: 9.00 },
        { size: "40cm", price: 12.00 }
    ]
}
```

#### Update Contact Information
Edit `index.html`:
- Phone numbers
- Address
- Opening hours
- Google Maps link

## 📁 Project Structure

```
Erfurt-Pizza/
├── index.html                  # Main HTML file
├── styles.css                  # All styling
├── script.js                   # Main JavaScript
├── menu-data.js               # Menu items database
├── assets/                     # Images and media
│   ├── menu/                  # Menu item images
│   ├── hero-pizza.png         # Hero section image
│   ├── about-img.jpg          # About section image
│   └── placeholder.jpg        # Fallback image
├── PAYMENT_INTEGRATION.md     # Payment setup guide
├── DEPLOYMENT_GUIDE.md        # Hosting instructions
└── README.md                  # This file
```

## 💳 Payment Integration

The website is ready for payment integration!

**Currently supports:**
- Cash payment on delivery
- Cash payment on pickup
- Payment method selection (PayPal, Credit Card)

**To enable online payments:**
See [PAYMENT_INTEGRATION.md](PAYMENT_INTEGRATION.md) for detailed instructions on:
- Stripe integration
- PayPal integration
- Mollie integration
- German payment providers

## 🌐 Deployment

Multiple hosting options available:

### Free Options (Recommended)
- **Netlify** ⭐ (Easiest - drag & drop)
- **Vercel**
- **GitHub Pages**

### Paid Options
- **Hostinger** (~€2/month)
- **All-Inkl** (~€5/month)
- **IONOS** (~€4/month)

**See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step instructions.**

## 📊 SEO & Marketing

### Included Features
- Semantic HTML5
- Meta tags for SEO
- Open Graph tags for social sharing
- Local Business Schema markup
- Mobile-friendly (Google ranking factor)
- Fast loading times

### Next Steps
1. Add to Google My Business
2. Create social media profiles
3. Get customer reviews
4. Local SEO optimization

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No frameworks needed
- **Font Awesome** - Icons
- **Google Fonts** - Typography

**No dependencies, no build process, no npm!**

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization Guide

### Change Colors

Edit `:root` variables in `styles.css`:
```css
:root {
    --primary-color: #dc2626;     /* Your primary color */
    --secondary-color: #f97316;   /* Your secondary color */
}
```

### Add Menu Items

1. Add image to `assets/menu/`
2. Add item to `menu-data.js`
3. Refresh browser!

### Change Opening Hours

Edit the contact section in `index.html`:
```html
<p>Mo - Fr: 16:30 - 22:30 Uhr</p>
<p>Sa - So: 14:45 - 22:30 Uhr</p>
```

## 📸 Adding Images

### Menu Item Images
- **Size**: 600x400px (3:2 ratio)
- **Format**: JPG or PNG
- **Size**: < 200KB
- **Tool**: Use https://tinypng.com/ to compress

Place in: `assets/menu/`

### Other Images Needed
- `hero-pizza.png` - Main hero image (1000x1000px)
- `about-img.jpg` - Restaurant interior (800x600px)
- `placeholder.jpg` - Fallback image (600x400px)

## 🇩🇪 German Legal Requirements

**Required pages for German websites:**

1. **Impressum** (Imprint) - MANDATORY
2. **Datenschutzerklärung** (Privacy Policy) - MANDATORY
3. **AGB** (Terms & Conditions) - RECOMMENDED

Templates and generators:
- https://www.datenschutz-generator.de/
- https://www.impressum-generator.de/

## 📞 Contact Integration

### WhatsApp Orders
Already integrated! Phone numbers link to WhatsApp:
```html
<a href="tel:036165442275">0361 65 44 22 75</a>
```

### Email
Add your email:
```html
<a href="mailto:info@erfurt-pizza.de">info@erfurt-pizza.de</a>
```

## 🎯 Features Roadmap

### Current Features ✅
- [x] Responsive design
- [x] Menu filtering
- [x] Shopping cart
- [x] Order form
- [x] Mobile navigation
- [x] Google Maps integration

### Planned Features 🔜
- [ ] Online payment integration
- [ ] Email notifications
- [ ] Order tracking
- [ ] Customer accounts
- [ ] Loyalty program
- [ ] Multi-language support (EN/DE)

## 💡 Tips for Success

1. **Take great photos** of your food
2. **Update menu regularly** - keep it fresh
3. **Respond quickly** to phone orders
4. **Promote your website** on social media
5. **Print your URL** on pizza boxes and flyers
6. **Collect reviews** on Google
7. **Offer special online discounts**

## 📈 Analytics

To track visitors, add Google Analytics:

1. Create account: https://analytics.google.com/
2. Get tracking ID
3. Add to `index.html` before `</head>`

## 🔒 Security

- No sensitive data stored in frontend
- Form validation included
- HTTPS required for production (automatic with Netlify)
- No inline JavaScript
- Safe against XSS

## 🐛 Troubleshooting

### Images not loading?
- Check file paths
- Verify image names match `menu-data.js`
- Use placeholder.jpg as fallback

### Cart not saving?
- Check browser localStorage is enabled
- Clear cache and reload

### Mobile menu not working?
- Check JavaScript console for errors
- Verify script.js is loaded

## 📝 License

This project is created for Erfurt Pizza. All rights reserved.

## 🤝 Support

Need help?
1. Check the guides:
   - [PAYMENT_INTEGRATION.md](PAYMENT_INTEGRATION.md)
   - [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Open an issue on GitHub
3. Contact your developer

## 🎉 Credits

**Built with:**
- Font Awesome for icons
- Google Fonts for typography
- Love for good pizza! 🍕

---

**Made with ❤️ for Erfurt Pizza**

**Address**: An der Lache 41, 99086 Erfurt
**Phone**: 0361 65 44 22 75 / 0361 73 10 76 56

🍕 **Guten Appetit!** 🍕

---

## Quick Links

- 🌐 [Live Demo](#) (Add your URL here)
- 📖 [Documentation](#)
- 💳 [Payment Setup](PAYMENT_INTEGRATION.md)
- 🚀 [Deployment Guide](DEPLOYMENT_GUIDE.md)
- 🍕 [Menu Items](menu-data.js)
