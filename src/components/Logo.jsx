import styles from "./Logo.module.css";

// ─────────────────────────────────────────────────────────────
// Logo — Best Driving School brand mark
//
// The uploaded artwork (public/bestDrivingSchoo.png) already bakes the
// icon and wordmark into one wide lockup image, so this component just
// renders it at two sizes rather than re-typesetting the text in CSS.
//
// public/best-logo.png is a processed copy with the near-black background
// keyed out to real transparency — the original's background wasn't quite
// pure black, so it showed as a faint box against the site's true #000.
//
// size: "sm" (navbar) | "lg" (hero)
// ─────────────────────────────────────────────────────────────
export default function Logo({ size = "sm" }) {
  return (
    <img
      src="/best-logo.png"
      alt="Best Driving School"
      className={`${styles.logo} ${size === "lg" ? styles.logoLg : styles.logoSm}`}
    />
  );
}
