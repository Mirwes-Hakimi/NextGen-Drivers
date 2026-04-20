import { Link } from "react-router-dom";
import styles from "../styles/InfoPage.module.css";

// Teen driving course info page — shown at /teen-course
export default function TeenCourse() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>For Teens · Ages 15½+</p>
        <h1 className={styles.heroHeading}>
          Behind-the-Wheel <span>Teen Training</span>
        </h1>
        <p className={styles.heroSub}>
          Build real confidence on the road with a certified instructor by your
          side — from parking lots to freeways.
        </p>
        <Link to="/packages" className={styles.heroBtn}>View Packages & Pricing</Link>
      </section>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* What's covered */}
        <h2 className={styles.sectionHeading}>What You'll Learn</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🅿️</span>
            <p className={styles.cardTitle}>Parking Lot Basics</p>
            <p className={styles.cardText}>
              Every student starts in a quiet parking lot so you can get
              comfortable with the controls, steering, and braking before
              hitting the road.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🛑</span>
            <p className={styles.cardTitle}>Stop Signs & Intersections</p>
            <p className={styles.cardText}>
              Practice the correct stopping technique, right-of-way rules, and
              how to handle four-way stops safely.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🔀</span>
            <p className={styles.cardTitle}>Lane Changing & Merging</p>
            <p className={styles.cardText}>
              Learn to check mirrors, signal early, and merge smoothly — skills
              that will be tested at your DMV road test.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🛣️</span>
            <p className={styles.cardTitle}>Freeway Practice</p>
            <p className={styles.cardText}>
              Our 6-hour package includes freeway on-ramp and off-ramp practice
              so nothing surprises you on test day.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🚦</span>
            <p className={styles.cardTitle}>Traffic Lights & Signals</p>
            <p className={styles.cardText}>
              Understand yellow-light decisions, protected vs unprotected turns,
              and pedestrian signals.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>📋</span>
            <p className={styles.cardTitle}>DMV Certificate</p>
            <p className={styles.cardText}>
              Complete our 6-hour package and receive the California DMV-required
              completion certificate for teens.
            </p>
          </div>
        </div>

        {/* Requirements callout */}
        <div className={styles.infoBox}>
          <p>
            <strong>California requirement:</strong> Teens must hold a valid
            learner's permit for at least 6 months and complete 6 hours of
            professional behind-the-wheel training before taking the DMV road
            test. Our packages help you satisfy that requirement.
          </p>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaHeading}>Ready to get started?</p>
          <p className={styles.ctaSub}>
            Pick a package, choose your city, and book your first session today.
          </p>
          <Link to="/packages" className={styles.heroBtn}>Book a Session</Link>
        </div>
      </div>
    </div>
  );
}
