/**
 * Post-build script to copy fonts directly to the dist directory
 * Run after the Astro build to ensure fonts are properly available
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destination directories
const sourceDir = path.resolve(__dirname, '../src/assets/fonts');
const distAssetsDir = path.resolve(__dirname, '../dist/assets');
const distFontsDir = path.resolve(distAssetsDir, 'fonts');

console.log('Running post-build font processing...');

// Ensure dist directory exists
if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
  console.error('Error: dist directory does not exist. Build may have failed.');
  process.exit(1);
}

// Ensure assets directory exists in dist
if (!fs.existsSync(distAssetsDir)) {
  fs.mkdirSync(distAssetsDir, { recursive: true });
  console.log(`Created directory: ${distAssetsDir}`);
}

// Function to copy directory recursively
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
    console.log(`Created directory: ${dest}`);
  }

  // Get all files in the source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDir(srcPath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${path.relative(__dirname, srcPath)} -> ${path.relative(__dirname, destPath)}`);
    }
  }
}

// Start copying to dist/assets/fonts directory
console.log(`Copying font files from ${path.relative(__dirname, sourceDir)} to ${path.relative(__dirname, distFontsDir)}...`);
copyDir(sourceDir, distFontsDir);

console.log('Post-build font processing completed successfully!'); 