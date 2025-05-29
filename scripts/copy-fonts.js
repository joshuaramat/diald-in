/**
 * Script to copy font files to the public directory
 * Run with: node scripts/copy-fonts.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destination directories
const sourceDir = path.resolve(__dirname, '../src/assets/fonts');
const publicDir = path.resolve(__dirname, '../public/assets/fonts');
const distDir = path.resolve(__dirname, '../dist/assets/fonts');

// Create destination directory structure if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Function to copy directory recursively
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
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
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Start copying to public directory
console.log(`Copying font files from ${sourceDir} to ${publicDir}...`);
copyDir(sourceDir, publicDir);

// Try to copy to dist directory if it exists (for production builds)
if (fs.existsSync(path.resolve(__dirname, '../dist'))) {
  console.log(`Copying font files from ${sourceDir} to ${distDir}...`);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  copyDir(sourceDir, distDir);
}

console.log('Font files copied successfully!'); 