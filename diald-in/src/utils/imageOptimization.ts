import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

interface ImageOptimizationOptions {
  quality?: number;
  width?: number;
  format?: 'webp' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Optimize an image and convert it to WebP format
 */
export async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: ImageOptimizationOptions = {}
): Promise<void> {
  const {
    quality = 80,
    width,
    format = 'webp',
    fit = 'inside'
  } = options;

  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Process image with sharp
    let pipeline = sharp(inputPath);

    // Resize if width is specified
    if (width) {
      pipeline = pipeline.resize({
        width,
        fit,
        withoutEnlargement: true
      });
    }

    // Convert to specified format
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ quality });
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg({ quality });
        break;
      case 'png':
        pipeline = pipeline.png({ quality });
        break;
    }

    // Save the optimized image
    await pipeline.toFile(outputPath);
  } catch (error) {
    console.error(`Error optimizing image ${inputPath}:`, error);
    throw error;
  }
}

/**
 * Generate multiple sizes of an image for responsive srcset
 */
export async function generateResponsiveImages(
  inputPath: string,
  outputDir: string,
  baseName: string,
  sizes: number[],
  options: ImageOptimizationOptions = {}
): Promise<{ [key: string]: string }> {
  const results: { [key: string]: string } = {};

  for (const size of sizes) {
    const outputPath = path.join(
      outputDir,
      `${baseName}-${size}w.${options.format || 'webp'}`
    );

    await optimizeImage(inputPath, outputPath, {
      ...options,
      width: size
    });

    results[`${size}w`] = outputPath;
  }

  return results;
}

/**
 * Get image dimensions
 */
export async function getImageDimensions(
  inputPath: string
): Promise<{ width: number; height: number }> {
  const metadata = await sharp(inputPath).metadata();
  return {
    width: metadata.width || 0,
    height: metadata.height || 0
  };
}

/**
 * Generate srcset string from responsive images
 */
export function generateSrcSetString(
  images: { [key: string]: string }
): string {
  return Object.entries(images)
    .map(([size, path]) => `${path} ${size}`)
    .join(', ');
}

/**
 * Generate sizes attribute based on viewport breakpoints
 */
export function generateSizesAttribute(
  breakpoints: { [key: string]: string }
): string {
  return Object.entries(breakpoints)
    .map(([query, size]) => `(${query}) ${size}`)
    .join(', ');
} 