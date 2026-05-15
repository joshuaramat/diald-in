import fs from 'fs';
import path from 'path';

/**
 * Recursively copies src directory into dest, creating dest if it doesn't exist.
 * @param {string} src  - Absolute source directory path
 * @param {string} dest - Absolute destination directory path
 */
export function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}
