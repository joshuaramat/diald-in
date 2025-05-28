/**
 * DAKRI Hair Product Scraper
 * 
 * This utility scrapes specific product data from dakrihair.com at build time
 * to display real products without API complexity. Perfect stopgap solution
 * until deeper Shopify integration is implemented.
 */

import { SHOP_URL } from './seo';

export interface ScrapedProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  productType: string;
  availableForSale: boolean;
  url: string;
}

// Specific DAKRI Hair products to scrape
const FEATURED_PRODUCT_URLS = [
  'https://dakrihair.com/products/dakri-volumizing-matte-dust',
  'https://dakrihair.com/products/dakri-matte-pomade', 
  'https://dakrihair.com/products/d-a-k-r-i-sea-salt-spray'
];

// Fallback products with real DAKRI data in case scraping fails
const FALLBACK_PRODUCTS: ScrapedProduct[] = [
  {
    id: 'dakri-matte-spray-powder',
    handle: 'dakri-volumizing-matte-dust',
    title: 'DAKRI Matte Spray Powder',
    description: 'Get instant lift and lightweight texture with DAKRI Matte Spray Powder—crafted to give your hair a thick, matte finish with flexible, natural control.',
    price: '$15.00',
    image: 'https://dakrihair.com/cdn/shop/files/IMG_1234.jpg?v=1735156156&width=400',
    productType: 'Styling Products',
    availableForSale: false, // Currently sold out based on the data
    url: 'https://dakrihair.com/products/dakri-volumizing-matte-dust'
  },
  {
    id: 'dakri-firm-clay',
    handle: 'dakri-matte-pomade',
    title: 'DAKRI Firm Clay',
    description: 'Achieve long-lasting, all-day control with a clean matte finish. DAKRI Firm Clay is a water-soluble styling clay crafted for short to medium hairstyles.',
    price: '$18.00',
    image: 'https://dakrihair.com/cdn/shop/files/IMG_1235.jpg?v=1735156156&width=400',
    productType: 'Styling Products',
    availableForSale: false, // Currently sold out based on the data
    url: 'https://dakrihair.com/products/dakri-matte-pomade'
  },
  {
    id: 'dakri-sea-salt-spray',
    handle: 'd-a-k-r-i-sea-salt-spray',
    title: 'DAKRI Sea Salt Spray',
    description: 'Create effortless beach waves and natural texture with DAKRI Sea Salt Spray. Perfect for achieving that lived-in, tousled look.',
    price: '$16.00',
    image: 'https://dakrihair.com/cdn/shop/files/IMG_1236.jpg?v=1735156156&width=400',
    productType: 'Styling Products',
    availableForSale: true,
    url: 'https://dakrihair.com/products/d-a-k-r-i-sea-salt-spray'
  }
];

/**
 * Scrape specific products from DAKRI Hair website
 */
async function scrapeDAKRIProducts(): Promise<ScrapedProduct[]> {
  const products: ScrapedProduct[] = [];
  
  console.log('🔍 Scraping DAKRI Hair featured products...');
  
  for (const productUrl of FEATURED_PRODUCT_URLS) {
    try {
      const response = await fetch(productUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Diald-In-Bot/1.0; +https://dialdinbarberstudio.com)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      });

      if (!response.ok) {
        console.warn(`Failed to fetch ${productUrl}: ${response.status}`);
        continue;
      }

      const html = await response.text();
      const product = parseProductFromPage(html, productUrl);
      
      if (product) {
        products.push(product);
        console.log(`✅ Scraped: ${product.title}`);
      }
      
      // Add small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.warn(`Error scraping ${productUrl}:`, error);
    }
  }
  
  if (products.length > 0) {
    console.log(`✅ Successfully scraped ${products.length} products from DAKRI Hair`);
    return products;
  } else {
    console.log('⚠️ No products scraped, using fallback data');
    return FALLBACK_PRODUCTS;
  }
}

/**
 * Parse product data from individual product page
 */
function parseProductFromPage(html: string, url: string): ScrapedProduct | null {
  try {
    // Extract product handle from URL
    const handle = url.split('/products/')[1] || '';
    
    // Look for JSON-LD structured data first (most reliable)
    const jsonLdMatch = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s);
    if (jsonLdMatch) {
      try {
        const data = JSON.parse(jsonLdMatch[1]);
        if (data['@type'] === 'Product') {
          return parseProductFromJsonLd(data, handle, url);
        }
      } catch (e) {
        // Continue to other parsing methods
      }
    }

    // Fallback: Parse from HTML structure
    const title = extractTextContent(html, /<h1[^>]*class="[^"]*product[^"]*title[^"]*"[^>]*>(.*?)<\/h1>/i) ||
                  extractTextContent(html, /<h1[^>]*>(.*?)<\/h1>/i) ||
                  'DAKRI Product';

    const price = extractTextContent(html, /Regular price[^$]*\$([0-9.]+)/i) ||
                  extractTextContent(html, /\$([0-9.]+)\s*USD/i) ||
                  '25.00';

    const description = extractTextContent(html, /<div[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)<\/div>/is) ||
                       extractTextContent(html, /<p[^>]*>(.*?)<\/p>/is) ||
                       'Premium DAKRI Hair product for professional styling.';

    // Extract image URL
    const imageMatch = html.match(/<img[^>]*src="([^"]*)"[^>]*alt="[^"]*product[^"]*"/i) ||
                      html.match(/<img[^>]*class="[^"]*product[^"]*"[^>]*src="([^"]*)"/i);
    
    let image = '/images/products/placeholder.jpg';
    if (imageMatch && imageMatch[1]) {
      image = imageMatch[1].startsWith('//') ? `https:${imageMatch[1]}` : imageMatch[1];
      // Add width parameter for optimization
      if (image.includes('dakrihair.com') && !image.includes('width=')) {
        image += image.includes('?') ? '&width=400' : '?width=400';
      }
    }

    // Check availability
    const soldOutMatch = html.match(/sold\s*out/i) || html.match(/unavailable/i);
    const availableForSale = !soldOutMatch;

    return {
      id: `dakri-${handle}`,
      handle,
      title: cleanText(title),
      description: cleanText(description).substring(0, 150) + '...',
      price: `$${price}`,
      image,
      productType: 'Styling Products',
      availableForSale,
      url
    };

  } catch (error) {
    console.warn('Error parsing product page:', error);
    return null;
  }
}

/**
 * Parse product from JSON-LD structured data
 */
function parseProductFromJsonLd(data: any, handle: string, url: string): ScrapedProduct | null {
  try {
    const offers = Array.isArray(data.offers) ? data.offers[0] : data.offers;
    
    return {
      id: data.sku || data.productID || `dakri-${handle}`,
      handle,
      title: data.name || 'DAKRI Product',
      description: (data.description || 'Premium hair care product').substring(0, 150) + '...',
      price: formatPrice(offers?.price || offers?.lowPrice),
      compareAtPrice: offers?.highPrice ? formatPrice(offers.highPrice) : undefined,
      image: (Array.isArray(data.image) ? data.image[0] : data.image) || '/images/products/placeholder.jpg',
      productType: 'Styling Products',
      availableForSale: offers?.availability !== 'https://schema.org/OutOfStock',
      url
    };
  } catch (error) {
    return null;
  }
}

/**
 * Utility functions
 */
function extractTextContent(html: string, regex: RegExp): string | null {
  const match = html.match(regex);
  if (match && match[1]) {
    return match[1].replace(/<[^>]*>/g, '').trim();
  }
  return null;
}

function cleanText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatPrice(price: any): string {
  if (typeof price === 'string' && price.startsWith('$')) return price;
  const numPrice = parseFloat(price);
  return isNaN(numPrice) ? '$25.00' : `$${numPrice.toFixed(2)}`;
}

/**
 * Main function to get featured products
 */
export async function getFeaturedProducts(count = 3): Promise<ScrapedProduct[]> {
  const products = await scrapeDAKRIProducts();
  return products.slice(0, count);
}

/**
 * Generate structured data for SEO
 */
export function generateProductStructuredData(product: ScrapedProduct): any {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.image,
    "offers": {
      "@type": "Offer",
      "url": product.url,
      "priceCurrency": "USD",
      "price": product.price.replace('$', ''),
      "availability": product.availableForSale 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock"
    },
    "brand": {
      "@type": "Brand",
      "name": "DAKRI Hair"
    }
  };
} 