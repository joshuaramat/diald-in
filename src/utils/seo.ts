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

export const DEFAULT_TITLE = "Diald In Barber Studio | Best Barbershop in Hayward, CA | Expert Haircuts & Beard Grooming";
export const DEFAULT_DESCRIPTION = 
  "Diald In Barber Studio is Hayward's premier barbershop offering expert haircuts, beard grooming, and styling services. Located at 22441 Foothill Blvd, our skilled barbers specialize in modern fades, classic cuts, and custom styles. Book your appointment today for the best haircut experience in Hayward, California.";
export const DEFAULT_IMAGE = "/images/logo/black/logo-lg.png";
export const SITE_URL = "https://dialdinbarberstudio.com";
export const BOOKING_URL = "https://booksy.com/en-us/1461330_diald-in-barber-studio_barber-shop_119449_hayward";
export const BUSINESS_EMAIL = "daniel@dialdinbarberstudio.com";
export const SHOP_URL = "https://dakrihair.com/";
export const PHONE_NUMBER = "+15109635985"; // Business phone number

// Social media profiles
export const SOCIAL_PROFILES = {
  instagram: "https://instagram.com/dialdin.barberstudio",
  facebook: "https://www.facebook.com/61574992139619",
  shop: {
    instagram: "https://instagram.com/dakrihair"
  }
};

// Section-specific meta descriptions - optimized for search queries
export const SECTION_DESCRIPTIONS = {
  home: "Diald In Barber Studio, Hayward's #1 rated barbershop offering professional haircuts, beard grooming, and styling services. Expert barbers, affordable prices, convenient Foothill Blvd location. Book online today!",
  services: "Professional barber services at Diald In Barber Studio Hayward: haircuts ($30), beard grooming ($20), kids cuts ($25). Modern fades, classic cuts, and custom styling by experienced barbers.",
  about: "Why choose Diald In Barber Studio? Meet our expert barbers in Hayward, CA. Professional haircut experience, community-focused barbershop, traditional craftsmanship with modern style.",
  booking: "Book your haircut appointment at Diald In Barber Studio Hayward. Choose your preferred barber, select services, and schedule online. Located at 22441 Foothill Blvd, Hayward, CA 94541.",
  shop: "Premium hair styling products from Dakri Hair. Professional-grade pomades, waxes, and styling products used by Diald In Barber Studio. Shop online for salon-quality results at home."
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
      { name: "keywords", content: "Diald In Barber Studio, barbershop Hayward, haircut Hayward CA, best barber Hayward, men's grooming, fade haircut, beard grooming, classic cuts, professional barber, Bay Area barbershop, Castro Valley barber, San Lorenzo barbershop" },
      { name: "geo.region", content: "US-CA" },
      { name: "geo.placename", content: "Hayward" },
      { name: "geo.position", content: "37.6688;-122.0808" },
      { name: "ICBM", content: "37.6688, -122.0808" },
      { name: "business:contact_data:street_address", content: "22441 Foothill Blvd" },
      { name: "business:contact_data:locality", content: "Hayward" },
      { name: "business:contact_data:region", content: "CA" },
      { name: "business:contact_data:postal_code", content: "94541" },
      { name: "business:contact_data:country_name", content: "United States" },
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
        SOCIAL_PROFILES.shop.instagram
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Barber Services",
        "itemListElement": serviceOfferings
      },
      "keywords": "barbershop, haircut, beard grooming, Hayward barber, men's grooming, fade haircut, classic cuts, styling services, professional barber, California barbershop",
      "paymentAccepted": "Cash, Credit Card, Debit Card",
      "currenciesAccepted": "USD",
      "alternateName": ["Diald In", "Diald In Barbershop", "Dialdin Barber Studio"],
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "37.6688",
          "longitude": "-122.0808"
        },
        "geoRadius": "25000"
      },
      "makesOffer": serviceOfferings,
      "knowsAbout": [
        "Men's haircuts",
        "Beard grooming",
        "Fade haircuts", 
        "Classic cuts",
        "Hair styling",
        "Barbering techniques",
        "Men's grooming"
      ]
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