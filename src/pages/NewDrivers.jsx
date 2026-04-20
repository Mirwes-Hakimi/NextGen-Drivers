import { Link } from "react-router-dom";
import styles from "../styles/InfoPage.module.css";

// New drivers guide page — shown at /new-drivers
export default function NewDrivers() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Complete Beginner's Guide</p>
        <h1 className={styles.heroHeading}>
          New to <span>Driving?</span>
        </h1>
        <p className={styles.heroSub}>
          Here's the full roadmap — from getting your learner's permit to
          holding your California driver's license.
        </p>
        <Link to="/packages" className={styles.heroBtn}>Start with a Lesson</Link>
      </section>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* Step-by-step roadmap */}
        <h2 className={styles.sectionHeading}>Your Path to a License</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Pass the Written Knowledge Test</p>
              <p className={styles.stepText}>
                Head to a California DMV office, pay the application fee, and
                pass the 46-question written test. You'll walk out with your
                learner's permit.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Hold Your Permit for 6 Months</p>
              <p className={styles.stepText}>
                California requires you to hold the permit for at least 6 months
                before you can take the road test (if you're under 18).
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Complete 50 Hours of Practice</p>
              <p className={styles.stepText}>
                Log at least 50 hours of supervised driving — 10 must be at
                night. A licensed driver 25 or older must be in the passenger
                seat.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Complete Professional Training</p>
              <p className={styles.stepText}>
                California requires 6 hours of behind-the-wheel training with a
                licensed instructor. Our packages satisfy this requirement and
                give you a completion certificate.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>5</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Pass the DMV Road Test</p>
              <p className={styles.stepText}>
                Schedule and pass your behind-the-wheel road test at your local
                DMV. Our DMV package includes warm-up practice and a
                DMV-approved vehicle.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>6</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Get Your License!</p>
              <p className={styles.stepText}>
                After passing the road test, your temporary license is printed
                on the spot. Your official card arrives by mail within 3–4 weeks.
              </p>
            </div>
          </div>
        </div>

        {/* Quick-reference cards */}
        <h2 className={styles.sectionHeading}>Good to Know</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🎂</span>
            <p className={styles.cardTitle}>Minimum Age</p>
            <p className={styles.cardText}>
              You can apply for a permit at 15½ in California. You can take the
              road test at 16 after meeting all requirements.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🌙</span>
            <p className={styles.cardTitle}>Night Driving</p>
            <p className={styles.cardText}>
              For the first 12 months after getting your license, teens cannot
              drive between 11 PM and 5 AM unless accompanied by a licensed
              adult 25+.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>📱</span>
            <p className={styles.cardTitle}>No Phone Use</p>
            <p className={styles.cardText}>
              California law prohibits all handheld phone use while driving —
              even with a full license. Hands-free only.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>👥</span>
            <p className={styles.cardTitle}>Passenger Restriction</p>
            <p className={styles.cardText}>
              For the first 12 months, teen drivers (under 18) cannot carry
              passengers under 20 unless accompanied by a licensed adult 25+.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaHeading}>Let's get you on the road</p>
          <p className={styles.ctaSub}>
            Book a lesson and let a certified instructor guide you through every
            step of the learning process.
          </p>
          <Link to="/packages" className={styles.heroBtn}>View All Packages</Link>
        </div>
      </div>
    </div>
  );
}
