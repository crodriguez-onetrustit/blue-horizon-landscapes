// JSON-LD Schema Component for LocalBusiness SEO

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://bluehorizonlandscapes.com/#organization",
  name: "Blue Horizon Landscapes LLC",
  url: "https://bluehorizonlandscapes.com",
  telephone: "+1-914-755-8141",
  email: "contact@bluehorizonlandscapes.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Orange County",
    addressRegion: "NY",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 41.5030,
      longitude: -74.0234,
    },
    geoRadius: "50000",
  },
  serviceType: [
    "Lawn Maintenance",
    "Hardscaping",
    "Mulching",
    "Landscape Design",
    "Patio Installation",
    "Retaining Walls",
  ],
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "19",
    bestRating: "5",
  },
  sameAs: [
    "https://www.facebook.com/bluehorizonlandscapes",
    "https://www.instagram.com/bluehorizonlandscapes",
    "https://nextdoor.com/pages/blue-horizon-landscapes",
  ],
};
