import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css";
import Logo from "../components/Logo";
import { useAuth } from "../components/AuthContext";

// Reusable animation: fade up from below as element enters view
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ── Why Choose Us cards ──
const features = [
  {
    icon: "🎓",
    title: "Certified Instructors",
    desc: "All our instructors are DMV-certified with years of professional teaching experience.",
  },
  {
    icon: "📍",
    title: "Pick-Up & Drop-Off",
    desc: "We come to you. Pick-up and drop-off included from your home or school.",
  },
  {
    icon: "🚗",
    title: "Real Road Practice",
    desc: "Learn on real streets, not simulators. We cover highways, intersections, and parking.",
  },
  {
    icon: "📋",
    title: "DMV Test Ready",
    desc: "Our longer packages include the DMV-required certificate for teen drivers.",
  },
  {
    icon: "📅",
    title: "Flexible Scheduling",
    desc: "Book sessions on your schedule: weekdays, weekends, mornings, or afternoons.",
  },
  {
    icon: "📍",
    title: "20+ Cities Covered",
    desc: "Serving the Bay Area and the Sacramento region, from San Francisco to Elk Grove.",
  },
];

// ── How It Works steps ──
const steps = [
  {
    number: "01",
    title: "Choose a Package",
    desc: "Browse our driving packages and mock/DMV tests, from 2 hours up to a full combo course.",
  },
  {
    number: "02",
    title: "Pick Your City & Time",
    desc: "Enter your ZIP or select your city, then schedule your session dates.",
  },
  {
    number: "03",
    title: "Hit the Road",
    desc: "Your instructor arrives at your door. Start driving with confidence.",
  },
];

// ── Stats ──
const stats = [
  { value: "500+", label: "Students Trained" },
  { value: "20+",  label: "Cities Served" },
  { value: "5★",   label: "Average Rating" },
  { value: "100%", label: "DMV Pass Rate" },
];

// ── Featured packages (preview — full list + city pricing on /packages) ──
// Matches the promo on the Packages page — $20 off every package
const DISCOUNT = 20;

const featuredPackages = [
  { title: "Two-Hour Driving Lesson", price: 160, blurb: "A single focused session to build core skills." },
  { title: "DMV Drive Test", price: 240, blurb: "Your behind-the-wheel road test, done with us." },
  { title: "Mock Test", price: 210, blurb: "A simulated road test with feedback before the real thing." },
  { title: "Eight-Hour Driving Lesson", price: 640, blurb: "Our most complete training package." },
];

// ── Testimonials ──
const testimonials = [
  {
    quote: "My instructor was patient and made me feel confident behind the wheel within a couple sessions. Passed my DMV test on the first try!",
    name: "Priya S.",
    city: "Walnut Creek",
  },
  {
    quote: "Pick-up and drop-off made this so easy to fit around school. Booking online took two minutes.",
    name: "Marcus T.",
    city: "Oakland",
  },
  {
    quote: "I hadn't driven in over a decade. My instructor met me exactly where I was and never made me feel rushed.",
    name: "Elena R.",
    city: "Concord",
  },
];

// ── FAQ ──
const faqs = [
  {
    q: "Do I need my own car for lessons?",
    a: "No. Every session and DMV road test uses our fully insured, DMV-approved training vehicle.",
  },
  {
    q: "Can I reschedule a session?",
    a: "Yes, just contact us at least 24 hours before your scheduled session and we'll help you find a new time.",
  },
  {
    q: "Do I need to sign up to book a session?",
    a: "No — booking is open to guests. Creating an account just lets you track your bookings in one place.",
  },
  {
    q: "What areas do you serve?",
    a: "We cover 20+ cities across the Bay Area and the Sacramento region, including Sacramento, Folsom, and Elk Grove. Enter your ZIP code on the Packages page to see pricing near you.",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const { user } = useAuth();

  return (
    <div className={styles.page}>

      {/* ════════════════════════════════
           HERO SECTION
          ════════════════════════════════ */}
      <section className={styles.hero}>

        {/* Animated background orbs — purely decorative, CSS-animated */}
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={`${styles.orb} ${styles.orb4}`} />

        <div className={styles.heroOverlay}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Logo size="lg" />

            <h1 className={styles.heroTitle}>
              Drive with Confidence.<br />
              <span className={styles.heroAccent}>Learn the Right Way.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              The Bay Area and Sacramento region's trusted driving school,
              with certified instructors, flexible scheduling, and
              pick-up from your door.
            </p>

            {/* CTA buttons */}
            <div className={styles.heroBtns}>
              <Link to="/packages" className={styles.btnPrimary}>
                Explore Packages
              </Link>
              {!user && (
                <Link to="/signup" className={styles.btnSecondary}>
                  Create Account
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
           STATS BAR
          ════════════════════════════════ */}
      <section className={styles.statsBar}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statItem}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════
           FEATURED PACKAGES
          ════════════════════════════════ */}
      <section className={styles.section}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className={styles.sectionLabel}>Pricing</p>
          <h2 className={styles.sectionTitle}>Popular Packages</h2>
        </motion.div>

        <div className={styles.packagesGrid}>
          {featuredPackages.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.packageCard}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className={styles.packageTitle}>{p.title}</h3>
              <p className={styles.packagePrice}>
                <span className={styles.packagePriceOriginal}>${p.price}</span>
                ${p.price - DISCOUNT}
              </p>
              <p className={styles.packageBlurb}>{p.blurb}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.packagesCtaWrap}
        >
          <Link to="/packages" className={styles.btnPrimary}>
            See All Packages & Pricing
          </Link>
        </motion.div>
      </section>

      {/* ════════════════════════════════
           WHY CHOOSE US
          ════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}        // animate only once as it scrolls into view
        >
          <p className={styles.sectionLabel}>Why Choose Us</p>
          <h2 className={styles.sectionTitle}>Everything You Need to Pass</h2>
        </motion.div>

        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={styles.featureCard}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} // stagger each card slightly
            >
              <span className={styles.featureIcon}>{f.icon}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
           HOW IT WORKS
          ════════════════════════════════ */}
      <section className={styles.section}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className={styles.sectionLabel}>Simple Process</p>
          <h2 className={styles.sectionTitle}>How It Works</h2>
        </motion.div>

        <div className={styles.stepsRow}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={styles.stepCard}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Big step number in the background */}
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
           TESTIMONIALS
          ════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className={styles.sectionLabel}>Testimonials</p>
          <h2 className={styles.sectionTitle}>What Our Students Say</h2>
        </motion.div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className={styles.testimonialCard}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <p className={styles.testimonialStars}>★★★★★</p>
              <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
              <p className={styles.testimonialName}>
                {t.name} <span className={styles.testimonialCity}>· {t.city}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
           FAQ
          ════════════════════════════════ */}
      <section className={styles.section}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className={styles.sectionLabel}>Questions</p>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={item.q} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <span className={styles.faqCaret}>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className={styles.faqAnswer}>{item.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════
           FINAL CTA BANNER
          ════════════════════════════════ */}
      <section className={styles.ctaBanner}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className={styles.ctaTitle}>Ready to Get Behind the Wheel?</h2>
          <p className={styles.ctaSubtitle}>
            Join hundreds of students who passed their test with Best Driving School.
          </p>
          <Link to="/packages" className={styles.btnPrimary}>
            Book a Session
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
