import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { copyDir } from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir = path.resolve(__dirname, '../src/assets/fonts');
const publicDir = path.resolve(__dirname, '../public/assets/fonts');
const distDir   = path.resolve(__dirname, '../dist/assets/fonts');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log(`Copying fonts → public/assets/fonts`);
copyDir(sourceDir, publicDir);

if (fs.existsSync(path.resolve(__dirname, '../dist'))) {
  console.log(`Copying fonts → dist/assets/fonts`);
  copyDir(sourceDir, distDir);
}

console.log('Font copy complete.');
