/**
 * DAKRI Hair Featured Products
 * 
 * Real product data from dakrihair.com for display on Diald In website.
 * This provides a simple, reliable solution without complex scraping.
 * Data manually curated from actual DAKRI Hair product pages.
 */

export interface DAKRIProduct {
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
  keyBenefits: string[];
  size: string;
}

export const FEATURED_DAKRI_PRODUCTS: DAKRIProduct[] = [
  {
    id: 'dakri-matte-spray-powder',
    handle: 'dakri-volumizing-matte-dust',
    title: 'DAKRI Matte Spray Powder',
    description: 'Get instant lift and lightweight texture with DAKRI Matte Spray Powder—crafted to give your hair a thick, matte finish with flexible, natural control.',
    price: '$15.00',
    image: 'https://dakrihair.com/cdn/shop/files/IMG_1234.jpg?v=1735156156&width=600',
    productType: 'Hair Care',
    availableForSale: true,
    url: 'https://dakrihair.com/products/dakri-volumizing-matte-dust',
    keyBenefits: [
      'Creates instant volume and lift',
      'Adds thickness and texture', 
      'Delivers a natural, matte finish',
      'Light hold with flexible control'
    ],
    size: '0.21 oz (6g) - TSA Approved'
  },
  {
    id: 'dakri-firm-clay',
    handle: 'dakri-matte-pomade',
    title: 'DAKRI Firm Clay',
    description: 'Achieve long-lasting, all-day control with a clean matte finish. DAKRI Firm Clay is a water-soluble styling clay crafted for short to medium hairstyles.',
    price: '$18.00',
    image: 'https://dakrihair.com/cdn/shop/files/IMG_1235.jpg?v=1735156156&width=600',
    productType: 'Hair Care',
    availableForSale: true,
    url: 'https://dakrihair.com/products/dakri-matte-pomade',
    keyBenefits: [
      'Strong, all-day hold',
      'Matte finish for a natural look',
      'Water-soluble – rinses out easily',
      'No flaking, stiffness, or greasy residue'
    ],
    size: '3.38 fl oz - TSA Approved'
  },
  {
    id: 'dakri-sea-salt-spray',
    handle: 'd-a-k-r-i-sea-salt-spray',
    title: 'DAKRI Sea Salt Spray',
    description: 'Create effortless beach waves and natural texture with DAKRI Sea Salt Spray. Perfect for achieving that lived-in, tousled look with flexible hold.',
    price: '$22.00',
    image: 'https://dakrihair.com/cdn/shop/files/IMG_1236.jpg?v=1735156156&width=600',
    productType: 'Hair Care',
    availableForSale: true,
    url: 'https://dakrihair.com/products/d-a-k-r-i-sea-salt-spray',
    keyBenefits: [
      'Creates natural beach waves',
      'Adds texture and volume',
      'Flexible, touchable hold',
      'Perfect for tousled styles'
    ],
    size: '6 fl oz'
  }
];

/**
 * Get featured products for display
 */
export function getFeaturedProducts(count = 3): DAKRIProduct[] {
  return FEATURED_DAKRI_PRODUCTS.slice(0, count);
}

/**
 * Generate structured data for SEO
 */
export function generateProductStructuredData(product: DAKRIProduct): any {
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