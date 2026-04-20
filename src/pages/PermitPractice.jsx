import { Link } from "react-router-dom";
import styles from "../styles/InfoPage.module.css";

// Permit practice tips page — shown at /practice
export default function PermitPractice() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Written Test Prep</p>
        <h1 className={styles.heroHeading}>
          Permit <span>Practice Tips</span>
        </h1>
        <p className={styles.heroSub}>
          The California DMV written knowledge test has 46 questions — you need
          38 correct to pass. Here's how to prepare.
        </p>
        <Link to="/packages" className={styles.heroBtn}>Book a Driving Lesson</Link>
      </section>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* Test overview */}
        <h2 className={styles.sectionHeading}>About the Knowledge Test</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>📝</span>
            <p className={styles.cardTitle}>46 Questions</p>
            <p className={styles.cardText}>
              The test covers traffic laws, road signs, safe driving practices,
              and DUI consequences. Questions are multiple choice.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>✅</span>
            <p className={styles.cardTitle}>38 Correct to Pass</p>
            <p className={styles.cardText}>
              You need at least 38 out of 46 answers correct. You have 3
              attempts per visit before you must reschedule.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>📖</span>
            <p className={styles.cardTitle}>Study the DMV Handbook</p>
            <p className={styles.cardText}>
              The official California Driver Handbook is the single best study
              resource. All test questions come directly from it.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🔁</span>
            <p className={styles.cardTitle}>Take Practice Tests</p>
            <p className={styles.cardText}>
              The DMV website offers free sample questions. Aim to consistently
              score above 90% before booking your real test.
            </p>
          </div>
        </div>

        {/* Study tips */}
        <h2 className={styles.sectionHeading}>Study Tips</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Read the Handbook Cover to Cover</p>
              <p className={styles.stepText}>
                Don't skip sections. Pay special attention to speed limits,
                right-of-way rules, and road sign meanings.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Focus on Road Signs</p>
              <p className={styles.stepText}>
                Signs are heavily tested. Know the difference between warning
                (yellow/diamond), regulatory (white/rectangle), and guide
                (green/rectangle) signs.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Memorize Key Speed Limits</p>
              <p className={styles.stepText}>
                15 mph in alleys and near schools. 25 mph in residential areas.
                65 mph on most freeways. These come up frequently.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Practice Under Time Pressure</p>
              <p className={styles.stepText}>
                Use a timer when doing practice tests so you're comfortable
                answering quickly on the real test day.
              </p>
            </div>
          </div>
        </div>

        {/* Info box */}
        <div className={styles.infoBox}>
          <p>
            <strong>Pro tip:</strong> Once you pass the written test and get your
            permit, you must hold it for at least 6 months before taking the road
            test. Use that time to log your 50 hours of practice driving —
            10 of which must be at night.
          </p>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaHeading}>Got your permit? Let's drive.</p>
          <p className={styles.ctaSub}>
            Book your first behind-the-wheel session and start building real road
            experience with a certified instructor.
          </p>
          <Link to="/packages" className={styles.heroBtn}>View Driving Packages</Link>
        </div>
      </div>
    </div>
  );
}
