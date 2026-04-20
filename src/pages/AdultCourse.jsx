import { Link } from "react-router-dom";
import styles from "../styles/InfoPage.module.css";

// Adult permit / behind-the-wheel course page — shown at /adult-course
export default function AdultCourse() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>For Adults · All Skill Levels</p>
        <h1 className={styles.heroHeading}>
          Adult <span>Driving Lessons</span>
        </h1>
        <p className={styles.heroSub}>
          Whether you're a first-time driver or returning after years off the
          road, our instructors meet you at your level.
        </p>
        <Link to="/packages" className={styles.heroBtn}>See Packages & Pricing</Link>
      </section>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* Who it's for */}
        <h2 className={styles.sectionHeading}>Who This Is For</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🆕</span>
            <p className={styles.cardTitle}>First-Time Drivers</p>
            <p className={styles.cardText}>
              Never driven before? No problem. We start from zero — car
              controls, mirrors, and basic maneuvers — in a calm, judgment-free
              environment.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>✈️</span>
            <p className={styles.cardTitle}>New to California</p>
            <p className={styles.cardText}>
              Moved from another state or country? We'll get you comfortable with
              California road rules and help you pass your CA DMV road test.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>⏸️</span>
            <p className={styles.cardTitle}>Returning Drivers</p>
            <p className={styles.cardText}>
              Haven't driven in years? We'll rebuild your confidence and refresh
              your skills at a pace that works for you.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>😰</span>
            <p className={styles.cardTitle}>Anxious Drivers</p>
            <p className={styles.cardText}>
              Driving anxiety is real. Our patient, experienced instructors
              specialize in building calm, confident drivers.
            </p>
          </div>
        </div>

        {/* How it works */}
        <h2 className={styles.sectionHeading}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Choose Your Package</p>
              <p className={styles.stepText}>
                Select 2, 4, or 6 hours depending on how much practice you need.
                You can always add sessions later.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>We Pick You Up</p>
              <p className={styles.stepText}>
                Your instructor picks you up from home, work, or anywhere
                convenient — no need to arrange transportation.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Learn at Your Own Pace</p>
              <p className={styles.stepText}>
                Sessions are customized to your comfort level. Your instructor
                gives real-time guidance and feedback the whole time.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Pass Your Road Test</p>
              <p className={styles.stepText}>
                When you're ready, book our DMV Road Test package and use our
                vehicle for your official test.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaHeading}>Start driving with confidence</p>
          <p className={styles.ctaSub}>
            Book a lesson today — pick-up and drop-off included in every session.
          </p>
          <Link to="/packages" className={styles.heroBtn}>Book a Lesson</Link>
        </div>
      </div>
    </div>
  );
}
