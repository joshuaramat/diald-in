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

// Hero image to process
const heroImage = 'HERO.heif';

// Sizes for responsive images
const sizes = [
  { width: 320, suffix: 'sm' },
  { width: 640, suffix: 'md' },
  { width: 960, suffix: 'lg' },
  { width: 1280, suffix: 'xl' }
];

// Hero image sizes
const heroSizes = [
  { width: 1920, height: 1080, suffix: 'xl' },
  { width: 1280, height: 720, suffix: 'lg' },
  { width: 960, height: 540, suffix: 'md' },
  { width: 640, height: 360, suffix: 'sm' }
];

async function optimizeImage(inputPath, outputPath, width, options = {}) {
  try {
    let pipeline = sharp(inputPath).resize(width, options.height || null, { 
      fit: options.fit || 'inside' 
    });
    
    // Determine output format based on file extension
    const format = path.extname(outputPath).toLowerCase();
    
    if (format === '.jpg' || format === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: options.quality || 85 });
    } else if (format === '.webp') {
      pipeline = pipeline.webp({ quality: options.quality || 85 });
    } else if (format === '.png') {
      pipeline = pipeline.png({ quality: options.quality || 90, compressionLevel: 9 });
    }
    
    await pipeline.toFile(outputPath);
    console.log(`✓ Optimized ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(inputPath)}:`, error);
    console.error(error);
  }
}

async function processImages() {
  console.log('Starting image optimization...\n');

  // Process logo variants
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
  
  // Process hero image
  const heroInputPath = path.join(sourceDir, heroImage);
  if (fs.existsSync(heroInputPath)) {
    console.log(`\nProcessing hero image: ${heroImage}`);
    
    // Create hero directory
    const heroDir = path.join(outputDir, 'hero');
    if (!fs.existsSync(heroDir)) {
      fs.mkdirSync(heroDir, { recursive: true });
    }
    
    // Generate responsive sizes in JPEG
    for (const size of heroSizes) {
      const outputJpegPath = path.join(heroDir, `hero-${size.suffix}.jpg`);
      await optimizeImage(heroInputPath, outputJpegPath, size.width, { 
        height: size.height, 
        fit: 'cover',
        quality: 85
      });
    }
    
    // Generate responsive sizes in WebP (better compression, modern browsers)
    for (const size of heroSizes) {
      const outputWebpPath = path.join(heroDir, `hero-${size.suffix}.webp`);
      await optimizeImage(heroInputPath, outputWebpPath, size.width, { 
        height: size.height, 
        fit: 'cover',
        quality: 85
      });
    }
    
    // Create a default hero-image.jpg for fallback
    const defaultJpegPath = path.join(heroDir, 'hero-image.jpg');
    await optimizeImage(heroInputPath, defaultJpegPath, 1920, { 
      height: 1080, 
      fit: 'cover',
      quality: 85
    });
    
    // Create a default hero-image.webp for modern browsers
    const defaultWebpPath = path.join(heroDir, 'hero-image.webp');
    await optimizeImage(heroInputPath, defaultWebpPath, 1920, { 
      height: 1080, 
      fit: 'cover',
      quality: 85
    });
  } else {
    console.error(`✗ Hero image not found: ${heroImage}`);
  }

  console.log('\nImage optimization complete!');
}

processImages().catch(console.error); 