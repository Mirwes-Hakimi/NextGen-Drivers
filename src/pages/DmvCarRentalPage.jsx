import { Link } from "react-router-dom";
import styles from "../styles/InfoPage.module.css";
import SEOHead from "../components/SEOHead";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../lib/structuredData";

// DMV Test Car Rental — shown at /services/dmv-test-car-rental
export default function DmvCarRentalPage() {
  return (
    <div className={styles.page}>
      <SEOHead
        title="DMV Test Car Rental | Best Driving School"
        description="Use our fully insured, DMV-approved training vehicle for your California DMV behind-the-wheel road test — no need to bring your own car."
        path="/services/dmv-test-car-rental"
        structuredData={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "DMV Test Car Rental", path: "/services/dmv-test-car-rental" },
          ]),
        ]}
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>DMV Road Test</p>
        <h1 className={styles.heroHeading}>
          DMV Test <span>Car Rental</span>
        </h1>
        <p className={styles.heroSub}>
          Don't have a car that meets DMV requirements? Use ours for your road test.
        </p>
        <Link to="/packages" className={styles.heroBtn}>View DMV Package Pricing</Link>
      </section>

      {/* ── Content ── */}
      <div className={styles.content}>
        <h2 className={styles.sectionHeading}>Why Rent Our Vehicle</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>✅</span>
            <p className={styles.cardTitle}>DMV-Approved</p>
            <p className={styles.cardText}>
              Our training vehicle meets California DMV requirements, so there's no risk of
              being turned away on test day over an equipment issue.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🛡️</span>
            <p className={styles.cardTitle}>Fully Insured</p>
            <p className={styles.cardText}>
              The vehicle is fully insured for your test, so you don't need to arrange or
              prove your own insurance coverage for the exam.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>👨‍🏫</span>
            <p className={styles.cardTitle}>Instructor On-Site</p>
            <p className={styles.cardText}>
              Your instructor drives you to the DMV, stays on-site during your test, and is
              available to answer questions beforehand.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🔄</span>
            <p className={styles.cardTitle}>Included in Our DMV Package</p>
            <p className={styles.cardText}>
              Car rental for your test is bundled into our DMV road test package, along with
              a 50-minute warm-up practice drive — see the DMV Test Preparation page.
            </p>
          </div>
        </div>

        <div className={styles.infoBox}>
          <p>
            <strong>What to bring:</strong> your valid learner's permit, your DMV appointment
            confirmation, and your instructor will handle proof of insurance through our
            vehicle. You do not need to bring your own car.
          </p>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaHeading}>Ready to book your DMV test?</p>
          <p className={styles.ctaSub}>
            See DMV package pricing for your city and book your test-day session.
          </p>
          <Link to="/packages" className={styles.heroBtn}>View Packages</Link>
        </div>
      </div>
    </div>
  );
}
