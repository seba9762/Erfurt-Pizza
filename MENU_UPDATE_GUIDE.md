# Menu Update Guide

This guide explains how to update your menu quarterly without any caching issues.

## Quick Update Process

### 1. Update Menu Data
Edit the `menu-data.js` file with your new menu items, prices, or changes:
```bash
# Edit the file
nano menu-data.js
# or use your preferred editor
```

### 2. Deploy to Netlify
```bash
git add menu-data.js
git commit -m "Update menu for [Quarter] [Year]"
git push
```

### 3. Verify Update
After Netlify deploys (usually 1-2 minutes):
- Visit your website
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check that menu changes are visible

## How Caching Works Now

### Menu Data (menu-data.js)
- **Cache Duration**: 0 seconds (always fresh)
- **Behavior**: Browsers always check for updates
- **Why**: Ensures menu changes appear immediately

### HTML Pages
- **Cache Duration**: 5 minutes
- **Behavior**: Revalidates every 5 minutes
- **Why**: Balances performance with freshness

### Static Assets (images, CSS, other JS)
- **Cache Duration**: 1 year
- **Behavior**: Cached for maximum performance
- **Why**: These files rarely change

## Troubleshooting

### Menu Not Updating?
1. **Clear your browser cache**: Ctrl+Shift+Delete (or Cmd+Shift+Delete)
2. **Hard refresh**: Ctrl+Shift+R (or Cmd+Shift+R)
3. **Check Netlify deploy**: Visit your Netlify dashboard to confirm deployment succeeded
4. **Wait 5 minutes**: HTML pages cache for up to 5 minutes

### For Immediate Updates
If you need changes to appear instantly for all users:
1. Deploy your changes
2. Go to Netlify dashboard
3. Click "Deploys" → "Trigger deploy" → "Clear cache and deploy site"

## Menu Data Structure

Each menu item should follow this format:
```javascript
{
    id: 1,                          // Unique ID
    name: "Pizza Margherita",       // Display name
    category: "pizza",              // Category (pizza, pasta, salads, etc.)
    tags: ["pizza", "vegetarian"],  // Tags for filtering
    description: "Sauce, cheese",   // Description
    image: "assets/menu/image.jpg", // Image path
    sizes: [                        // Price options
        { size: "26cm", price: 5.00 },
        { size: "30cm", price: 7.00 }
    ],
    isVegetarian: true,             // Vegetarian flag
    badge: "NEW"                    // Optional badge
}
```

## Best Practices

1. **Test Locally First**: Make changes and test in your local browser
2. **Backup Before Changes**: Keep a copy of menu-data.js before editing
3. **Update Images**: If adding new items, add images to `assets/menu/` first
4. **Consistent Pricing**: Ensure all prices follow the same format (e.g., 5.00 not 5)
5. **Deploy Off-Peak**: Update during slower business hours when possible

## Need Help?

- Check `README.md` for general setup
- Check `DEPLOYMENT_GUIDE.md` for deployment details
- Contact your web developer if you encounter issues
