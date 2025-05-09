// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Enable static output for GitHub Pages
  output: 'static',
  
  // Set the site and base path for GitHub Pages
  // Replace 'joshuaramat' with your GitHub username if different
  site: 'https://joshuaramat.github.io',
  base: '/diald-in',
  
  // Image optimization settings
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.dialdinbarberstudio.com',
      },
    ],
  },

  // Build optimizations
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Enable server-side rendering for specific routes if needed later
  // server: { port: 3000, host: true },
});
