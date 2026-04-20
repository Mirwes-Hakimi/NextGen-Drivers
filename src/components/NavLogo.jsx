import styles from "./NavLogo.module.css";

// ─────────────────────────────────────────────────────────────
// NavLogo — compact horizontal car mark for the navbar
//
// Designed to sit at ~36px tall inline with the brand text.
// Keeps it simple: body silhouette, two spinning wheels, and
// fading speed lines. No circular badge (too small for details).
// ─────────────────────────────────────────────────────────────

// Simple spinning wheel — just tyre + rim + 3 spokes + hub
function Wheel({ cx, cy, r = 9 }) {
  const spokes = [0, 120, 240].map((deg, i) => {   // 3 spokes at 120° apart
    const rad = (deg * Math.PI) / 180;
    return (
      <line
        key={i}
        x1={cx} y1={cy}
        x2={cx + (r - 2) * Math.sin(rad)}
        y2={cy - (r - 2) * Math.cos(rad)}
        className={styles.spoke}
      />
    );
  });

  return (
    <g className={styles.wheel}>
      <circle cx={cx} cy={cy} r={r}       className={styles.tyre}    />
      <circle cx={cx} cy={cy} r={r - 2.5} className={styles.rim}     />
      {spokes}
      <circle cx={cx} cy={cy} r={2}       className={styles.hub}     />
    </g>
  );
}

export default function NavLogo() {
  return (
    /*
      viewBox: 0 0 144 56
      Car faces RIGHT. Ground at y=50. Wheel centers: rear(24,50) front(116,50) r=9.
      Displayed at height: 36px → width ≈ 92px.
    */
    <svg
      viewBox="0 0 144 56"
      className={styles.car}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Next Gen Driving School"
    >
      {/* ── Speed lines (left = behind the car) ── */}
      <line x1="0" y1="22" x2="12" y2="22" className={`${styles.speedLine} ${styles.s1}`} />
      <line x1="0" y1="29" x2="10" y2="29" className={`${styles.speedLine} ${styles.s2}`} />
      <line x1="1" y1="36" x2="11" y2="36" className={`${styles.speedLine} ${styles.s3}`} />

      {/* ── Main car body ──
          Prius/Camry-inspired coupe profile.
          No wheel-arch cutouts — the dark wheel circles sit on top.
      ── */}
      <path
        className={styles.body}
        d={`
          M 8,48 Q 3,48 2,42 L 2,33
          Q 2,29 8,27
          L 18,25 L 26,16
          Q 32,9 42,7
          L 60,6 L 82,6
          Q 90,6 98,13
          L 118,34 L 132,34
          Q 138,34 140,39
          L 140,48 L 8,48 Z
        `}
      />

      {/* ── Cabin overlay (darker green for the roof/greenhouse) ── */}
      <path
        className={styles.cabin}
        d={`
          M 26,17 Q 32,9 42,7
          L 60,6 L 82,6
          Q 90,6 98,13
          L 116,34 L 26,34 Z
        `}
      />

      {/* ── Rear window glass ── */}
      <path className={styles.glass} d="M 28,17 L 42,8 L 60,7 L 70,7 L 70,34 L 28,34 Z" />

      {/* ── Windshield glass (raked) ── */}
      <path className={styles.glass} d="M 72,7 L 82,7 Q 89,7 96,13 L 114,34 L 96,34 Z" />

      {/* ── Window gloss ── */}
      <path className={styles.gloss} d="M 74,8 L 82,8 L 96,20 L 88,18 Z" />

      {/* ── B-pillar ── */}
      <rect x="70" y="7" width="2.5" height="27" className={styles.pillar} />

      {/* ── LED DRL strip (front) ── */}
      <path className={styles.drl} d="M 136,36 Q 140,39 140,44" />

      {/* ── Rear taillight ── */}
      <rect x="2" y="30" width="2.5" height="13" rx="1" className={styles.taillight} />

      {/* ── Wheels (drawn last so they sit over the body bottom edge) ── */}
      <Wheel cx={24}  cy={50} />   {/* rear  */}
      <Wheel cx={116} cy={50} />   {/* front */}

    </svg>
  );
}
