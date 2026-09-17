import { Link } from "react-router-dom";
import styles from "../styles/InfoPage.module.css";
import { BUSINESS } from "../siteConfig";
import SEOHead from "../components/SEOHead";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../lib/structuredData";

// Locations hub — shown at /locations. Lists real service-area cities
// from siteConfig.js (kept in sync with Packages.jsx's SERVED_CITIES).
// Dedicated per-city pages (e.g. /locations/hayward) aren't built yet —
// each one needs genuinely unique, real local content (not the same
// text with the city name swapped), which requires city-specific facts
// not yet available. See DOMAIN-MIGRATION.md.
export default function LocationsPage() {
  return (
    <div className={styles.page}>
      <SEOHead
        title="Service Areas | Best Driving School"
        description="Best Driving School serves 20+ cities across the Bay Area and Sacramento region, including San Francisco, Oakland, Concord, Walnut Creek, Sacramento, and Folsom."
        path="/locations"
        structuredData={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/locations" },
          ]),
        ]}
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Service Areas</p>
        <h1 className={styles.heroHeading}>
          Where We <span>Serve</span>
        </h1>
        <p className={styles.heroSub}>
          We're based in Hayward and serve 20+ cities across the Bay Area and Sacramento
          region. Enter your ZIP code on the Packages page to confirm pricing for your area.
        </p>
        <Link to="/packages" className={styles.heroBtn}>Check Pricing by ZIP Code</Link>
      </section>

      {/* ── Content ── */}
      <div className={styles.content}>
        <h2 className={styles.sectionHeading}>Cities We Serve</h2>
        <div className={styles.grid}>
          {BUSINESS.serviceAreas.map((city) => (
            <div key={city} className={styles.card}>
              <p className={styles.cardTitle}>{city}, CA</p>
              <p className={styles.cardText}>
                Behind-the-wheel driving lessons and DMV test packages available.
              </p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaHeading}>Don't see your city?</p>
          <p className={styles.ctaSub}>
            Enter your ZIP code on the Packages page — we may still serve your area.
          </p>
          <Link to="/packages" className={styles.heroBtn}>Check Packages &amp; Pricing</Link>
        </div>
      </div>
    </div>
  );
}
