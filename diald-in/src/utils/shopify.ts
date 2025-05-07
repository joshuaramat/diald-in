/**
 * Shopify Product Data Utilities for Diald In Barber Studio
 * 
 * In a real implementation, this would fetch data from the Shopify API.
 * For this prototype, we're using static data to simulate the Shopify integration.
 */

import { SHOP_URL } from './seo';

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
}

// Static product data (would be replaced with actual Shopify API fetch)
const products: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'styling-pomade',
    title: 'DAKRI Styling Pomade',
    description: 'Medium hold with a natural shine. Perfect for classic styles that require flexibility and a healthy-looking finish.',
    price: 24.99,
    image: 'https://placehold.co/800x800/d4a86a/ffffff?text=Styling+Pomade',
    productType: 'Styling Products',
    tags: ['pomade', 'medium-hold', 'classic'],
    availableForSale: true
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'matte-clay',
    title: 'DAKRI Matte Clay',
    description: 'Strong hold with zero shine. Ideal for modern textured styles, featuring a reworkable formula that can be restyled throughout the day.',
    price: 28.99,
    image: 'https://placehold.co/800x800/2c3e50/ffffff?text=Matte+Clay',
    productType: 'Styling Products',
    tags: ['clay', 'strong-hold', 'matte'],
    availableForSale: true
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'beard-oil',
    title: 'DAKRI Beard Oil',
    description: 'Premium beard conditioning oil that softens facial hair while moisturizing the skin underneath, preventing itchiness and flaking.',
    price: 19.99,
    image: 'https://placehold.co/800x800/c0392b/ffffff?text=Beard+Oil',
    productType: 'Beard Care',
    tags: ['beard', 'conditioning', 'essential-oils'],
    availableForSale: true
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'daily-shampoo',
    title: 'DAKRI Daily Shampoo',
    description: 'Gentle, sulfate-free formula that cleanses hair without stripping natural oils. Infused with natural ingredients for healthier hair.',
    price: 21.99,
    compareAtPrice: 24.99,
    image: 'https://placehold.co/800x800/34495e/ffffff?text=Daily+Shampoo',
    productType: 'Hair Care',
    tags: ['shampoo', 'daily-use', 'sulfate-free'],
    availableForSale: true
  }
];

/**
 * Gets all available products
 * In a real implementation, this would fetch from the Shopify API at build time
 */
export async function getAllProducts(): Promise<ShopifyProduct[]> {
  // In a real implementation, this would be an API call
  // Using a timeout to simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 100);
  });
}

/**
 * Gets featured products (would be based on some criteria in a real implementation)
 */
export async function getFeaturedProducts(count = 3): Promise<ShopifyProduct[]> {
  const allProducts = await getAllProducts();
  return allProducts.slice(0, count);
}

/**
 * Generate a product URL
 */
export function getProductUrl(product: ShopifyProduct): string {
  return `${SHOP_URL}/products/${product.handle}`;
}

/**
 * Format price as currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price);
}

/**
 * Generate structured data for a product (JSON-LD)
 */
export function generateProductStructuredData(product: ShopifyProduct): any {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.image,
    "offers": {
      "@type": "Offer",
      "url": getProductUrl(product),
      "priceCurrency": "USD",
      "price": product.price,
      "availability": product.availableForSale 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock"
    },
    "brand": {
      "@type": "Brand",
      "name": "DAKRI"
    }
  };
} 