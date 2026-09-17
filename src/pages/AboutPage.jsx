import { Link } from "react-router-dom";
import infoStyles from "../styles/InfoPage.module.css";
import { SCHOOL_PHONE, SCHOOL_PHONE_TEL, SCHOOL_ADDRESS } from "../siteConfig";
import SEOHead from "../components/SEOHead";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../lib/structuredData";

// About page — shown at /about
export default function AboutPage() {
  return (
    <div className={infoStyles.page}>
      <SEOHead
        title="About Us | Best Driving School"
        description="Best Driving School provides behind-the-wheel driving lessons and DMV road test packages across the Bay Area and Sacramento region."
        path="/about"
        structuredData={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      {/* ── Hero ── */}
      <section className={infoStyles.hero}>
        <p className={infoStyles.heroEyebrow}>About Us</p>
        <h1 className={infoStyles.heroHeading}>
          About <span>Best Driving School</span>
        </h1>
        <p className={infoStyles.heroSub}>
          Behind-the-wheel driving lessons and DMV road test preparation across the Bay Area
          and Sacramento region.
        </p>
        <Link to="/packages" className={infoStyles.heroBtn}>View Packages</Link>
      </section>

      {/* ── Content ── */}
      <div className={infoStyles.content}>
        <h2 className={infoStyles.sectionHeading}>What We Offer</h2>
        <div className={infoStyles.grid}>
          <div className={infoStyles.card}>
            <span className={infoStyles.cardIcon}>🚗</span>
            <p className={infoStyles.cardTitle}>Certified Instructors</p>
            <p className={infoStyles.cardText}>
              Behind-the-wheel lessons for teens (15½+), first-time adult drivers, and adults
              returning to driving after time away.
            </p>
          </div>

          <div className={infoStyles.card}>
            <span className={infoStyles.cardIcon}>📍</span>
            <p className={infoStyles.cardTitle}>Pick-Up &amp; Drop-Off</p>
            <p className={infoStyles.cardText}>
              We come to you for every session — no need to arrange your own transportation
              to a meeting point.
            </p>
          </div>

          <div className={infoStyles.card}>
            <span className={infoStyles.cardIcon}>✅</span>
            <p className={infoStyles.cardTitle}>DMV Test Vehicle Provided</p>
            <p className={infoStyles.cardText}>
              Take your California DMV road test in our fully insured, DMV-approved training
              vehicle — no need to bring your own car.
            </p>
          </div>

          <div className={infoStyles.card}>
            <span className={infoStyles.cardIcon}>💳</span>
            <p className={infoStyles.cardTitle}>Pay Online or at Your Session</p>
            <p className={infoStyles.cardText}>
              Book now and pay online right away, or pay later at your first session —
              whichever works for you.
            </p>
          </div>
        </div>

        <h2 className={infoStyles.sectionHeading}>Where We Serve</h2>
        <p className={infoStyles.cardText} style={{ maxWidth: 720 }}>
          We're based in Hayward, CA and serve 20+ cities across the greater Bay Area
          (including San Francisco, Oakland, Concord, Walnut Creek, and more) and the
          Sacramento region (including Sacramento, Folsom, and Elk Grove). Enter your ZIP code
          on the Packages page to confirm we serve your area.
        </p>

        {/* TODO: add real founding story / years in operation / instructor
            certifications & bios once confirmed — not fabricated here. */}

        <h2 className={infoStyles.sectionHeading}>Contact</h2>
        <p className={infoStyles.cardText}>
          <a href={`tel:${SCHOOL_PHONE_TEL}`}>{SCHOOL_PHONE}</a>
          <br />
          {SCHOOL_ADDRESS}
        </p>

        <div className={infoStyles.cta}>
          <p className={infoStyles.ctaHeading}>Ready to book your first lesson?</p>
          <p className={infoStyles.ctaSub}>
            Compare packages and pricing, then book online in a few minutes.
          </p>
          <Link to="/packages" className={infoStyles.heroBtn}>View Packages</Link>
        </div>
      </div>
    </div>
  );
}
