// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Enable caching for better performance
  output: 'static',
  
  // Image optimization settings
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // Build optimizations
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Enable server-side rendering for specific routes if needed later
  // server: { port: 3000, host: true },
});
