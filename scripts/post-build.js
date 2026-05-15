import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { copyDir } from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir   = path.resolve(__dirname, '../src/assets/fonts');
const distDir     = path.resolve(__dirname, '../dist');
const destDir     = path.resolve(distDir, 'assets/fonts');

console.log('Running post-build font processing...');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Build may have failed.');
  process.exit(1);
}

console.log(`Copying fonts → dist/assets/fonts`);
copyDir(sourceDir, destDir);

console.log('Post-build font processing complete.');
