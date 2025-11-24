
# Nivaran

This is a code bundle for Nivaran. The original project is available at https://www.figma.com/design/3Ok290R1fyKaswpObI15pG/Nivaran.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Adding Photos and Images

All static images should be placed in the `public/` folder. This folder is served directly by the web server, and images can be referenced using absolute paths starting with `/`.

### Folder Structure for Images

Organize images in subfolders under `public/` for better management:

- `public/images/` - General images (logos, icons, backgrounds)
  - `logo.png` - Main site logo
  - `favicon.ico` - Browser favicon
- `public/images/products/` - Product-related photos
  - `product1.jpg` - Individual product images
  - `category-banner.jpg` - Category banners
- `public/images/banners/` - Hero and promotional banners
  - `hero-main.jpg` - Main hero section image
  - `promo-banner.jpg` - Promotional banners
- `public/images/testimonials/` - User testimonial photos
  - `user1.jpg` - Testimonial user photos
- `public/images/gallery/` - Photo galleries or additional visuals
  - `gallery1.jpg` - Gallery images

### How to Add Images

1. Copy your image files (`.jpg`, `.png`, `.webp`, `.svg`) into the appropriate subfolder under `public/`.
2. Use descriptive filenames (e.g., `hero-environmental.jpg` instead of `img1.jpg`).
3. Optimize images for web use (compress to reduce file size) using tools like TinyPNG or ImageOptim.

### Referencing Images in Code

- **In React Components** (files in `src/`): Use absolute paths starting with `/`.
  ```jsx
  <img src="/images/logo.png" alt="Nivaran Logo" />
  <img src="/images/products/solar-panel.jpg" alt="Solar Panel Product" />
  ```

- **In Standalone HTML Files** (e.g., `public/login.html`): Use relative paths.
  ```html
  <img src="images/logo.png" alt="Nivaran Logo" />
  ```

### Best Practices

- Use appropriate image formats: JPEG for photos, PNG for transparency, WebP for modern browsers.
- Include alt text for accessibility.
- Keep file sizes small (< 500KB per image) for faster loading.
- After adding images, rebuild the project with `npm run build` and redeploy to Vercel.

### Deployment

Images are automatically included in the build output. Push changes to GitHub to trigger Vercel deployment.  