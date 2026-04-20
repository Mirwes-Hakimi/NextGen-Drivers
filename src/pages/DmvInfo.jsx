import { Link } from "react-router-dom";
import styles from "../styles/InfoPage.module.css";

// DMV information page — shown at /dmv
export default function DmvInfo() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>California DMV</p>
        <h1 className={styles.heroHeading}>
          DMV Road Test <span>Information</span>
        </h1>
        <p className={styles.heroSub}>
          Everything you need to know about the California DMV behind-the-wheel
          road test — what to expect, what's tested, and how we can help you pass.
        </p>
        <Link to="/packages" className={styles.heroBtn}>Book DMV Test Package</Link>
      </section>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* What the DMV tests */}
        <h2 className={styles.sectionHeading}>What the DMV Tests</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🔍</span>
            <p className={styles.cardTitle}>Pre-Drive Safety Check</p>
            <p className={styles.cardText}>
              The examiner will ask you to demonstrate basic vehicle controls —
              horn, windshield wipers, defroster, and emergency brake.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🛑</span>
            <p className={styles.cardTitle}>Intersections & Stops</p>
            <p className={styles.cardText}>
              Full stops at stop signs, correct right-of-way, and safe
              entry into intersections are among the most-tested skills.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🔀</span>
            <p className={styles.cardTitle}>Lane Changes</p>
            <p className={styles.cardText}>
              Checking mirrors, blind-spot checks, signaling, and smooth
              merging — all scored separately on the road test.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🔄</span>
            <p className={styles.cardTitle}>Turns & Backing</p>
            <p className={styles.cardText}>
              Wide or tight turns, left turns across traffic, and backing up
              in a straight line are standard test maneuvers.
            </p>
          </div>
        </div>

        {/* How our package helps */}
        <h2 className={styles.sectionHeading}>How Our DMV Package Helps</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>45-Minute Warm-Up Practice</p>
              <p className={styles.stepText}>
                Your instructor picks you up and drives you to the DMV, practicing
                the exact route and maneuvers the examiner is likely to use.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>DMV-Approved Vehicle Provided</p>
              <p className={styles.stepText}>
                You take the test in our vehicle — no need to worry about
                whether your own car meets DMV requirements.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Certified Instructor On-Site</p>
              <p className={styles.stepText}>
                Your instructor stays at the DMV while you test and can answer
                any questions before you go in.
              </p>
            </div>
          </div>
        </div>

        {/* Requirement callout */}
        <div className={styles.infoBox}>
          <p>
            <strong>Remember:</strong> You must bring your valid learner's permit,
            your DMV appointment confirmation, and proof of insurance (provided
            through our vehicle). You do NOT need to bring your own car.
          </p>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaHeading}>Ready to pass your road test?</p>
          <p className={styles.ctaSub}>
            Book our DMV Road Test package — we'll handle the car, the route
            practice, and the drop-off.
          </p>
          <Link to="/packages" className={styles.heroBtn}>Book DMV Package</Link>
        </div>
      </div>
    </div>
  );
}
