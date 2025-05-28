import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../src/assets/images');
const outputDir = path.join(__dirname, '../public/images');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Logo variants
const variants = {
  black: 'Diald In Logo_option 2.1.PNG',
  white: 'Diald In Logo_option 5.1.PNG'
};

// Sizes for responsive images
const sizes = [
  { width: 320, suffix: 'sm' },
  { width: 640, suffix: 'md' },
  { width: 960, suffix: 'lg' },
  { width: 1280, suffix: 'xl' }
];

async function optimizeImage(inputPath, outputPath, width) {
  try {
    await sharp(inputPath)
      .resize(width, null, { fit: 'inside' })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(outputPath);
    console.log(`✓ Optimized ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(inputPath)}:`, error);
  }
}

async function processImages() {
  console.log('Starting image optimization...\n');

  for (const [variant, filename] of Object.entries(variants)) {
    const inputPath = path.join(sourceDir, filename);
    
    if (!fs.existsSync(inputPath)) {
      console.error(`✗ Source file not found: ${filename}`);
      continue;
    }

    // Create variant directory
    const variantDir = path.join(outputDir, 'logo', variant);
    if (!fs.existsSync(variantDir)) {
      fs.mkdirSync(variantDir, { recursive: true });
    }

    // Generate responsive sizes
    for (const size of sizes) {
      const outputPath = path.join(variantDir, `logo-${size.suffix}.png`);
      await optimizeImage(inputPath, outputPath, size.width);
    }
  }

  console.log('\nImage optimization complete!');
}

processImages().catch(console.error); 