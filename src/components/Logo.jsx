import styles from "./Logo.module.css";

// ─────────────────────────────────────────────────────────────
// Logo — Wave Driving School brand mark
//
// Icon: the real Wave Driving School mark (public/wave-icon.png — a
// transparent-background version of the uploaded urlpicture.png, whose
// white background was baked into the pixels rather than true alpha).
// Wordmark is still rendered as text so it stays crisp at any size
// and can pick up light/dark theme colors — only the icon is a raster image.
//
// size: "sm" (navbar) | "lg" (hero)
// showText: set false to render the icon only
// ─────────────────────────────────────────────────────────────
export default function Logo({ size = "sm", showText = true }) {
  return (
    <div className={`${styles.lockup} ${size === "lg" ? styles.lockupLg : styles.lockupSm}`}>
      <img
        src="/wave-icon.png"
        alt="Wave Driving School"
        className={styles.icon}
      />

      {showText && (
        <span className={styles.textBlock}>
          <span className={styles.brandMain}>Wave</span>
          <span className={styles.brandSub}>Driving School</span>
        </span>
      )}
    </div>
  );
}
