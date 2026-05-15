// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Enable static output for Vercel
  output: 'static',
  
  // Add React integration
  integrations: [react(), sitemap()],
  
  // Set the site URL for production
  site: 'https://dialdinbarberstudio.com',
  base: '/',
  
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

  // Build optimizations for production
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  
  // Vite configuration for production optimization
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
