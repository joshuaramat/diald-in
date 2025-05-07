/**
 * SEO utilities for Diald In Barber Studio
 */

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export const DEFAULT_TITLE = "Diald In Barber Studio";
export const DEFAULT_DESCRIPTION = 
  "At Diald In Barber Studio, we're more than just a barbershop—we're a community hub where great conversations meet even better cuts. Our experienced barbers specialize in modern fades, classic cuts, beard grooming, and custom styles tailored to each client's unique look.";
export const DEFAULT_IMAGE = "/images/diald-in-og-image.jpg";
export const SITE_URL = "https://dialdinbarberstudio.com";
export const BOOKING_URL = "https://booksy.com/en-us/dl/show-business/1369171";
export const BUSINESS_EMAIL = "dialdin.barberstudio@gmail.com";
export const SHOP_URL = "https://dakrihair.com/";

/**
 * Generate the full title with site name
 */
export function getPageTitle(title?: string): string {
  if (!title) return DEFAULT_TITLE;
  return `${title} | ${DEFAULT_TITLE}`;
}

/**
 * Generate full SEO metadata for a page
 */
export function generateSEOMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical = SITE_URL,
  image = DEFAULT_IMAGE,
  noindex = false,
  nofollow = false,
}: SEOProps = {}) {
  const fullTitle = getPageTitle(title === DEFAULT_TITLE ? undefined : title);
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');
  
  const absoluteImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  
  return {
    title: fullTitle,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: robotsContent },
      
      // Open Graph / Facebook
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: absoluteImageUrl },
      
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteImageUrl },
    ],
    link: [
      { rel: "canonical", href: canonical },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BarberShop",
      "name": DEFAULT_TITLE,
      "description": description,
      "image": absoluteImageUrl,
      "url": canonical,
      "email": BUSINESS_EMAIL,
      "telephone": "+12345678901", // Replace with actual phone number when available
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street", // Replace with actual address when available
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94101",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "18:00"
        }
      ]
    }
  };
} 