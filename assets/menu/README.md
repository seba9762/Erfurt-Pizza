# Menu Images

This folder should contain images for all menu items.

## Image Requirements

- **Format**: JPG or PNG recommended
- **Size**: Recommended 800x600px or similar aspect ratio
- **Naming**: Should match the image paths in `menu-data.js`

## Required Images

Based on the menu data, you need the following images:

### Pizza
- pizza-margherita.jpg
- pizza-salami.jpg
- pizza-funghi.jpg
- pizza-prosciutto.jpg
- pizza-tonno.jpg
- pizza-hawaii.jpg
- pizza-quattro-formaggi.jpg
- pizza-diavola.jpg
- pizza-vegetaria.jpg
- pizza-americana.jpg
- pizza-tandoori.jpg
- pizza-paneer.jpg

### Burger
- burger-classic.jpg
- burger-cheese.jpg
- burger-bacon.jpg
- burger-chicken.jpg
- burger-veggie.jpg
- burger-double.jpg
- burger-spicy-chicken.jpg

### Indian Specialties
- chicken-curry.jpg
- butter-chicken.jpg
- tikka-masala.jpg
- chicken-korma.jpg
- chicken-vindaloo.jpg
- palak-paneer.jpg
- paneer-tikka-masala.jpg
- chana-masala.jpg
- dal-makhani.jpg
- veg-biryani.jpg
- chicken-biryani.jpg
- lamb-curry.jpg
- naan.jpg
- garlic-naan.jpg

### Salads
- salad-mixed.jpg
- salad-caesar.jpg
- salad-chicken.jpg
- salad-mozzarella.jpg
- salad-tuna.jpg

### Schnitzel
- schnitzel-wiener.jpg
- schnitzel-jaeger.jpg
- schnitzel-zigeuner.jpg
- schnitzel-hawaii.jpg

## How to Upload Images to Netlify

### Option 1: Drag & Drop (Current Method)
When you drag & drop your project folder to Netlify, make sure to:
1. Place all images in this `assets/menu/` folder
2. Select the **entire project folder** (not individual files) when dragging to Netlify
3. Ensure all images are inside the folder before dragging

### Option 2: Git Deploy (Recommended)
1. Add all images to this folder
2. Commit them to git:
   ```bash
   git add assets/menu/*.jpg
   git commit -m "Add menu images"
   git push
   ```
3. Netlify will automatically deploy the new version

### Option 3: Using Free Stock Images
If you don't have professional food photos yet, you can use free stock images from:
- [Pexels](https://www.pexels.com/search/food/)
- [Unsplash](https://unsplash.com/s/photos/food)
- [Pixabay](https://pixabay.com/images/search/food/)

## Current Status

⚠️ **Images are currently missing!**

The website will show a placeholder image (placeholder.svg) for all menu items until you add the actual images.

This is not a critical error - the website will still function normally, but adding real food photos will make it much more appealing to customers.
