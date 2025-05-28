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
  section?: string;
}

export const DEFAULT_TITLE = "Diald In Barber Studio";
export const DEFAULT_DESCRIPTION = 
  "At Diald In Barber Studio, we're more than just a barbershop—we're a community hub where great conversations meet even better cuts. Our experienced barbers specialize in modern fades, classic cuts, beard grooming, and custom styles tailored to each client's unique look.";
export const DEFAULT_IMAGE = "/images/diald-in-og-image.jpg";
export const SITE_URL = "https://dialdinbarberstudio.com";
export const BOOKING_URL = "https://booksy.com/en-us/1461330_diald-in-barber-studio_barber-shop_119449_hayward";
export const BUSINESS_EMAIL = "dialdin.barberstudio@gmail.com";
export const SHOP_URL = "https://dakrihair.com/";
export const PHONE_NUMBER = "+15109635985"; // Business phone number

// Social media profiles
export const SOCIAL_PROFILES = {
  instagram: "https://instagram.com/dialdin.barberstudio",
  facebook: "https://facebook.com/dialdinbarber",
  youtube: "https://youtube.com/@dialdinbarber",
  shop: {
    instagram: "https://instagram.com/dakrihair"
  }
};

// Section-specific meta descriptions
export const SECTION_DESCRIPTIONS = {
  home: "Premium barbershop in Hayward, CA offering expert haircuts, beard grooming, and styling services. Book your appointment today for a fresh look.",
  services: "Explore our range of professional barber services including modern fades, classic cuts, beard grooming, and custom styles. Quality service at competitive prices.",
  about: "Meet the skilled barbers at Diald In Barber Studio. Learn about our commitment to excellence and the community we've built in Hayward.",
  booking: "Book your appointment at Diald In Barber Studio. Easy online booking system for haircuts, beard grooming, and styling services.",

  shop: "Shop premium hair products from Dakri Hair. Professional-grade styling products for the perfect look every time."
};

// Business hours configuration
export const BUSINESS_HOURS = [
  { day: "Monday", open: false },
  { day: "Tuesday", open: true, openTime: "08:00", closeTime: "19:00" },
  { day: "Wednesday", open: true, openTime: "08:00", closeTime: "19:00" },
  { day: "Thursday", open: true, openTime: "08:00", closeTime: "19:00" },
  { day: "Friday", open: true, openTime: "08:00", closeTime: "19:00" },
  { day: "Saturday", open: true, openTime: "08:00", closeTime: "15:00" },
  { day: "Sunday", open: false }
];

// Service offerings with descriptions and prices
export const SERVICES = [
  {
    name: "Basic Haircut",
    description: "Professional haircut tailored to your style preferences",
    price: "30.00",
    priceCurrency: "USD",
    duration: "PT30M"
  },
  {
    name: "Haircut and Beard",
    description: "Complete grooming package including haircut and beard styling",
    price: "45.00",
    priceCurrency: "USD",
    duration: "PT45M"
  },
  {
    name: "Kids Haircut (3-12 years old)",
    description: "Specialized haircut service for children",
    price: "25.00",
    priceCurrency: "USD",
    duration: "PT30M"
  },
  {
    name: "Beard Service",
    description: "Professional beard trimming and styling",
    price: "20.00",
    priceCurrency: "USD",
    duration: "PT20M"
  },
  {
    name: "Beard Service with Hair Lineup",
    description: "Beard styling with precision hairline shaping",
    price: "30.00",
    priceCurrency: "USD",
    duration: "PT30M"
  }
];

// Review aggregation data - ARCHIVED for future API integration
// export const REVIEW_AGGREGATE = {
//   ratingValue: "4.9",
//   reviewCount: "124",
//   bestRating: "5",
//   worstRating: "1"
// };

/**
 * Generate the full title with site name
 */
export function getPageTitle(title?: string, section?: string): string {
  if (!title && !section) return DEFAULT_TITLE;
  if (section) return `${section} | ${DEFAULT_TITLE}`;
  return `${title} | ${DEFAULT_TITLE}`;
}

/**
 * Generate full SEO metadata for a page
 */
export function generateSEOMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical = SITE_URL,
  image = DEFAULT_IMAGE,
  noindex = false,
  nofollow = false,
  section,
}: SEOProps = {}) {
  const fullTitle = getPageTitle(title, section);
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');
  
  const absoluteImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  
  // Generate opening hours specification for JSON-LD
  const openingHoursSpecification = BUSINESS_HOURS
    .filter(day => day.open)
    .map(day => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": day.day,
      "opens": day.openTime,
      "closes": day.closeTime
    }));

  // Generate service offerings for JSON-LD
  const serviceOfferings = SERVICES.map(service => ({
    "@type": "Offer",
    "name": service.name,
    "description": service.description,
    "price": service.price,
    "priceCurrency": service.priceCurrency,
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01",
    "url": BOOKING_URL
  }));

  // Generate review aggregation for JSON-LD - ARCHIVED for future API integration
  // const reviewAggregate = {
  //   "@type": "AggregateRating",
  //   "ratingValue": REVIEW_AGGREGATE.ratingValue,
  //   "reviewCount": REVIEW_AGGREGATE.reviewCount,
  //   "bestRating": REVIEW_AGGREGATE.bestRating,
  //   "worstRating": REVIEW_AGGREGATE.worstRating
  // };
  
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
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: DEFAULT_TITLE },
      { property: "og:locale", content: "en_US" },
      
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteImageUrl },
      { name: "twitter:site", content: "@dialdinbarber" },
      { name: "twitter:creator", content: "@dialdinbarber" },
      
      // Additional meta tags
      { name: "author", content: DEFAULT_TITLE },
      { name: "geo.region", content: "US-CA" },
      { name: "geo.placename", content: "Hayward" },
      { name: "geo.position", content: "37.6688;-122.0808" },
      { name: "ICBM", content: "37.6688, -122.0808" },
    ],
    link: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", href: `${SITE_URL}/feed.xml`, type: "application/rss+xml", title: "RSS Feed" },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BarberShop",
      "name": DEFAULT_TITLE,
      "description": description,
      "image": absoluteImageUrl,
      "url": canonical,
      "email": BUSINESS_EMAIL,
      "telephone": PHONE_NUMBER,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "22441 Foothill Blvd",
        "addressLocality": "Hayward",
        "addressRegion": "CA",
        "postalCode": "94541",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "37.6688",
        "longitude": "-122.0808"
      },
      "openingHoursSpecification": openingHoursSpecification,
      "sameAs": [
        SOCIAL_PROFILES.instagram,
        SOCIAL_PROFILES.facebook,
        SOCIAL_PROFILES.youtube,
        SOCIAL_PROFILES.shop.instagram
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Barber Services",
        "itemListElement": serviceOfferings
      }
      // ARCHIVED: Review and rating data for future API integration
      // "aggregateRating": reviewAggregate,
      // "review": {
      //   "@type": "Review",
      //   "reviewRating": {
      //     "@type": "Rating",
      //     "ratingValue": "5",
      //     "bestRating": "5"
      //   },
      //   "author": {
      //     "@type": "Person",
      //     "name": "James T."
      //   },
      //   "reviewBody": "Best barbershop in town! The attention to detail is amazing and they always make sure I leave looking my best. Haven't found anyone who can fade like these guys."
      // }
    }
  };
} 