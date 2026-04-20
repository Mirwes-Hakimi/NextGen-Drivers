import { Link } from "react-router-dom";
import styles from "../styles/InfoPage.module.css";

// Driver education tips/videos page — shown at /education
export default function DriverEd() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Driver Education</p>
        <h1 className={styles.heroHeading}>
          Learn Smarter, <span>Drive Safer</span>
        </h1>
        <p className={styles.heroSub}>
          Essential driving concepts, tips, and skills every new driver should
          know before getting behind the wheel.
        </p>
        <Link to="/packages" className={styles.heroBtn}>Book a Lesson</Link>
      </section>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* Core skills */}
        <h2 className={styles.sectionHeading}>Essential Skills</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🪞</span>
            <p className={styles.cardTitle}>Mirror & Blind Spot Checks</p>
            <p className={styles.cardText}>
              Check your rearview mirror every 5–8 seconds. Always do a
              shoulder (blind spot) check before changing lanes — mirrors alone
              don't show everything.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>↔️</span>
            <p className={styles.cardTitle}>Following Distance</p>
            <p className={styles.cardText}>
              Use the 3-second rule: pick a fixed object ahead, and make sure
              at least 3 seconds pass between when the car in front passes it
              and when you do. Double it in bad weather.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🔦</span>
            <p className={styles.cardTitle}>Night Driving</p>
            <p className={styles.cardText}>
              Reduce speed at night — your stopping distance often exceeds your
              headlight range. Never overdrive your headlights.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🌧️</span>
            <p className={styles.cardTitle}>Driving in Rain</p>
            <p className={styles.cardText}>
              Turn headlights on when wipers are on (California law). Slow down,
              increase following distance, and avoid cruise control on wet roads.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🅿️</span>
            <p className={styles.cardTitle}>Parallel Parking</p>
            <p className={styles.cardText}>
              Signal, pull up alongside the car ahead, reverse at a 45° angle
              toward the curb, then straighten. Practice in an empty lot first.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🚨</span>
            <p className={styles.cardTitle}>Handling Emergencies</p>
            <p className={styles.cardText}>
              If a tire blows, don't brake hard — grip the wheel firmly, ease
              off the gas, and steer straight while gradually slowing down.
            </p>
          </div>
        </div>

        {/* Key rules */}
        <h2 className={styles.sectionHeading}>Key California Rules</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>⚡</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Speed Limits to Memorize</p>
              <p className={styles.stepText}>
                15 mph near schools and in alleys · 25 mph in residential areas ·
                35 mph on most city arterials · 65 mph on freeways (70 where posted)
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>🚶</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Pedestrians Always Have Right of Way</p>
              <p className={styles.stepText}>
                Yield to pedestrians at all crosswalks — marked or unmarked. Stop
                at least one lane back so vehicles in other lanes can also see
                the pedestrian.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>🚑</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Move Over Law</p>
              <p className={styles.stepText}>
                When an emergency vehicle with lights/sirens approaches, pull to
                the right edge of the road and stop. When passing a stopped
                emergency vehicle on a freeway, move over one lane.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaHeading}>Put it all into practice</p>
          <p className={styles.ctaSub}>
            Knowing the rules is step one — let one of our instructors help you
            apply them on real roads.
          </p>
          <Link to="/packages" className={styles.heroBtn}>Book a Driving Session</Link>
        </div>
      </div>
    </div>
  );
}
