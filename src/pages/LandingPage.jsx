import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css";
import AnimatedLogo from "../components/AnimatedLogo";

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
    desc: "Our 6-hour package includes the DMV-required certificate for teen drivers.",
  },
  {
    icon: "📅",
    title: "Flexible Scheduling",
    desc: "Book sessions on your schedule — weekdays, weekends, mornings, or afternoons.",
  },
  {
    icon: "📍",
    title: "15+ Cities Covered",
    desc: "Serving the entire Bay Area from San Francisco to Brentwood.",
  },
];

// ── How It Works steps ──
const steps = [
  {
    number: "01",
    title: "Choose a Package",
    desc: "Browse our 2, 4, or 6-hour training packages — or book a DMV road test.",
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
  { value: "15+",  label: "Cities Served" },
  { value: "5★",   label: "Average Rating" },
  { value: "100%", label: "DMV Pass Rate" },
];

export default function LandingPage() {
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
            {/* Animated SVG car logo */}
            <AnimatedLogo />

            <h1 className={styles.heroTitle}>
              Drive with Confidence.<br />
              <span className={styles.heroAccent}>Learn the Right Way.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Bay Area's trusted driving school — certified instructors,
              flexible scheduling, and pick-up from your door.
            </p>

            {/* CTA buttons */}
            <div className={styles.heroBtns}>
              <Link to="/packages" className={styles.btnPrimary}>
                Explore Packages
              </Link>
              <Link to="/signup" className={styles.btnSecondary}>
                Create Account
              </Link>
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
           WHY CHOOSE US
          ════════════════════════════════ */}
      <section className={styles.section}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}        // animate only once as it scrolls into view
        >
          <p className={styles.sectionLabel}>Why Next Gen</p>
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
      <section className={`${styles.section} ${styles.sectionGray}`}>
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
            Join hundreds of students who passed their test with Next Gen Driving School.
          </p>
          <Link to="/packages" className={styles.btnPrimary}>
            Book a Session
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
