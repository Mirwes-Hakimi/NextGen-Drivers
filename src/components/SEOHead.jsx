import { useEffect } from "react";
import { SITE_URL, BUSINESS } from "../siteConfig";

// ─────────────────────────────────────────────────────────────
// SEOHead — drop this at the top of any page to set that page's
// title, meta description, canonical URL, Open Graph / Twitter tags,
// and JSON-LD structured data.
//
// Since this is a client-rendered SPA (no server-side rendering), tags
// are set via JS on mount rather than baked into the HTML per route.
// Google's crawler executes JS and reads these correctly; this is the
// standard approach for a Vite/React SPA without a Next.js-style
// framework.
//
// Usage:
//   <SEOHead
//     title="Driving Packages | Best Driving School"
//     description="Compare behind-the-wheel lesson packages and DMV
//       test prep pricing across the Bay Area and Sacramento region."
//     path="/packages"
//     structuredData={[buildLocalBusinessSchema(), buildBreadcrumbSchema([...])]}
//   />
// ─────────────────────────────────────────────────────────────
export default function SEOHead({ title, description, path, structuredData, noindex = false }) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = title;

    // Finds an existing <meta> tag by name/property, or creates one if
    // it doesn't exist yet — so repeated navigation updates the same
    // tag instead of piling up duplicates.
    const upsertMeta = (attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    // Open Graph
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", BUSINESS.name);
    upsertMeta("property", "og:image", BUSINESS.logo);

    // Twitter / X
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", BUSINESS.logo);

    // Canonical link — same upsert pattern as meta tags above
    let canonicalEl = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // Structured data (JSON-LD) — unlike the tags above, this is fully
    // replaced on every page since different pages need entirely
    // different schema blocks (not just updated field values).
    document.head.querySelectorAll('script[data-seo-jsonld="true"]').forEach((el) => el.remove());
    const schemas = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : [];
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [title, description, path, structuredData, noindex]);

  return null; // this component only manages <head>, renders nothing
}
