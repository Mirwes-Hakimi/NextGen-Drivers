// ─────────────────────────────────────────────────────────────
// structuredData.js — builds JSON-LD structured data objects from the
// single source of truth in siteConfig.js. Never hardcode business
// facts directly into a page — call these builders instead, so a
// phone/address change in siteConfig.js automatically updates every
// page's structured data too.
//
// Only real, verifiable facts go into these objects — no fabricated
// ratings, review counts, or "aggregateRating" data.
// ─────────────────────────────────────────────────────────────

import { BUSINESS, SITE_URL } from "../siteConfig";

// Describes the business itself — used on every page (see SEOHead.jsx).
export function buildLocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool", // more specific than generic LocalBusiness — matches actual business type
    name: BUSINESS.name,
    telephone: BUSINESS.phoneTel,
    email: BUSINESS.email,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.logo,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    areaServed: BUSINESS.serviceAreas.map((city) => ({ "@type": "City", name: city })),
    priceRange: "$$",
  };

  // Only include openingHours/sameAs once real data exists — omitting a
  // field is correct SEO practice; a fabricated one is not.
  if (BUSINESS.hours) {
    schema.openingHoursSpecification = BUSINESS.hours;
  }
  if (BUSINESS.socialProfiles.length > 0) {
    schema.sameAs = BUSINESS.socialProfiles;
  }

  return schema;
}

// Identifies the organization behind the website (distinct from the
// physical-location-focused LocalBusiness schema above).
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    ...(BUSINESS.socialProfiles.length > 0 ? { sameAs: BUSINESS.socialProfiles } : {}),
  };
}

// Describes the website itself (helps search engines understand site
// identity, distinct from the business/organization schemas above).
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS.name,
    url: SITE_URL,
  };
}

// Breadcrumb trail for a page. `items` is an array of { name, path }
// in order from the homepage down to the current page, e.g.:
//   [{ name: "Home", path: "/" }, { name: "Packages", path: "/packages" }]
export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
