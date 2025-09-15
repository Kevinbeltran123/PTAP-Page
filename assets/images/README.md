# 🖼️ Assets - Images Directory

This directory contains all the visual assets for the PTAP La Pola Interactive project.

## 📁 Directory Structure

```
assets/images/
├── README.md           # This file
├── ibal-logo.png       # IBAL company logo
├── favicon.ico         # Website favicon
└── preview.jpg         # Project preview image for README
```

## 🎨 Image Specifications

### **Logo (ibal-logo.png)**
- **Format:** PNG with transparency
- **Dimensions:** 200x200px minimum
- **Usage:** Header, loading screen, modal headers
- **Source:** Official IBAL branding guidelines

### **Favicon (favicon.ico)**
- **Format:** ICO (multi-resolution)
- **Sizes:** 16x16, 32x32, 48x48 pixels
- **Usage:** Browser tab icon
- **Design:** Simplified IBAL logo or water drop

### **Preview Image (preview.jpg)**
- **Format:** JPEG
- **Dimensions:** 1200x630px (social media optimized)
- **Usage:** README header, social media sharing
- **Content:** Screenshot of main application interface

## 📝 Adding New Images

When adding new images to this directory:

1. **Optimize file size** using tools like TinyPNG or ImageOptim
2. **Use WebP format** when possible with JPEG/PNG fallbacks
3. **Follow naming convention**: `descriptive-name.extension`
4. **Add responsive variants** if needed: `image@2x.jpg`, `image-mobile.jpg`
5. **Update this README** with new image descriptions

## 🔧 Image Processing

### Recommended Tools:
- **Optimization:** TinyPNG, ImageOptim, Squoosh
- **Editing:** GIMP, Photoshop, Figma
- **Format Conversion:** ImageMagick, online converters

### Example Commands:
```bash
# Convert to WebP
cwebp -q 80 input.jpg -o output.webp

# Resize image
convert input.jpg -resize 800x600 output.jpg

# Optimize PNG
optipng -o7 input.png
```

## 📜 License and Attribution

- **IBAL Logo:** Used with permission for educational purposes
- **Icons:** Emoji characters (Unicode standard)
- **Generated Images:** Created specifically for this project

All images should be properly licensed and attributed if sourced externally.