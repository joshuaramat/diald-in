import { optimizeImage, generateResponsiveImages } from '../src/utils/imageOptimization';
import path from 'path';
import fs from 'fs/promises';

const LOGO_SIZES = [32, 64, 128, 256, 512];
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'optimized');

async function optimizeLogos() {
  const logos = [
    {
      input: 'src/assets/images/Diald In Logo_option 2.1.PNG',
      output: 'diald-in-logo-white',
      format: 'webp' as const
    },
    {
      input: 'src/assets/images/Diald In Logo_option 5.1.PNG',
      output: 'diald-in-logo-black',
      format: 'webp' as const
    }
  ];

  for (const logo of logos) {
    console.log(`Optimizing ${logo.input}...`);

    // Generate responsive sizes
    const responsiveImages = await generateResponsiveImages(
      logo.input,
      OUTPUT_DIR,
      logo.output,
      LOGO_SIZES,
      {
        format: logo.format,
        quality: 90,
        fit: 'contain'
      }
    );

    // Also generate a PNG fallback
    await optimizeImage(
      logo.input,
      path.join(OUTPUT_DIR, `${logo.output}.png`),
      {
        format: 'png',
        quality: 90,
        fit: 'contain'
      }
    );

    console.log(`Generated responsive images for ${logo.output}:`);
    console.log(responsiveImages);
  }
}

// Run the optimization
optimizeLogos().catch(console.error); 