import { Link } from "react-router-dom";
import styles from "../styles/InfoPage.module.css";

// 404 Not Found page — shown when no route matches
export default function NotFound() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>404 — Page Not Found</p>
        <h1 className={styles.heroHeading}>
          Looks Like You <span>Took a Wrong Turn</span>
        </h1>
        <p className={styles.heroSub}>
          The page you're looking for doesn't exist. Head back home and get back
          on track.
        </p>
        <Link to="/" className={styles.heroBtn}>Back to Home</Link>
      </section>
    </div>
  );
}
