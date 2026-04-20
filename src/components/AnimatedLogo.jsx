import styles from "./AnimatedLogo.module.css";

// ─────────────────────────────────────────────────────────────
// Wheel — Camry-style 5-spoke alloy wheel
// cx/cy = center coordinates in the SVG viewBox
// ─────────────────────────────────────────────────────────────
function Wheel({ cx, cy }) {
  // 5 spokes evenly spaced at 72° apart, starting from top (0°)
  const spokes = [0, 72, 144, 216, 288].map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    return (
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={cx + 8.5 * Math.sin(rad)}
        y2={cy - 8.5 * Math.cos(rad)}
        className={styles.spoke}
      />
    );
  });

  return (
    // transform-box + transform-origin in CSS makes this rotate around its own center
    <g className={styles.wheelGroup}>
      <circle cx={cx} cy={cy} r={12}   className={styles.tyre}    />  {/* outer tyre */}
      <circle cx={cx} cy={cy} r={9.5}  className={styles.rimOuter}/>  {/* outer rim ring */}
      <circle cx={cx} cy={cy} r={5}    className={styles.rimInner}/>  {/* inner rim */}
      {spokes}
      <circle cx={cx} cy={cy} r={2.5}  className={styles.hub}     />  {/* center cap */}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────
// AnimatedLogo — circular badge containing animated Camry SVG
// ─────────────────────────────────────────────────────────────
// small=true renders a compact 44px version for the navbar
export default function AnimatedLogo({ small = false }) {
  return (
    <div className={`${styles.badge} ${small ? styles.badgeSmall : ""}`}>

      {/* Spinning conic gradient ring around the badge */}
      <div className={styles.ring} />

      {/*
        SVG viewBox: 0 0 200 80
        Car faces RIGHT. Front bumper on the right (~x=196), rear on the left (~x=15).
        Ground level: y=70. Wheel centers: rear (48,68), front (152,68). Wheel radius: 12.
        The long raked windshield and fastback C-pillar evoke the 2024+ Camry profile.
      */}
      <svg
        viewBox="0 0 200 80"
        className={`${styles.car} ${small ? styles.carSmall : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Next Gen Driving School logo"
      >

        {/* ── Speed lines (left side = behind the car) ── */}
        <line x1="2"  y1="29" x2="17" y2="29" className={`${styles.speedLine} ${styles.s1}`} />
        <line x1="4"  y1="35" x2="15" y2="35" className={`${styles.speedLine} ${styles.s2}`} />
        <line x1="2"  y1="41" x2="13" y2="41" className={`${styles.speedLine} ${styles.s3}`} />

        {/* ── Dashed road / ground line ── */}
        <line x1="10" y1="73" x2="198" y2="73" className={styles.road} />

        {/* ── MAIN BODY (Camry-inspired sedan profile) ──
            Path traced clockwise from rear-bottom:
            • Rear bumper curves up, trunk lid is flat
            • C-pillar is steep/fastback (2024 Camry signature)
            • Long flat roofline
            • A-pillar is deeply raked (~62° from vertical)
            • Long hood with gentle slope
            • Rounded front bumper
            • Wheel arches cut in via arcs (A command, CCW sweep=0 = arch goes upward)
        ── */}
        <path
          className={styles.body}
          d={`
            M 24,68
            Q 16,68 14,62 L 14,51
            Q 14,47 20,45
            L 36,42 L 53,36
            Q 59,29 66,25
            L 77,23 L 116,23
            Q 124,23 133,29
            L 151,43
            Q 163,43 173,43
            L 187,44
            Q 194,44 197,51
            L 197,61
            Q 197,68 190,68
            L 164,68
            A 12 12 0 0 0 140,68
            L 60,68
            A 12 12 0 0 0 36,68
            L 24,68 Z
          `}
        />

        {/* ── CABIN OVERLAY — darker shade over the greenhouse/roof area ── */}
        <path
          className={styles.cabin}
          d={`
            M 53,37 Q 59,29 66,25
            L 77,23 L 116,23
            Q 124,23 133,29
            L 151,43 L 53,43 Z
          `}
        />

        {/* ── LOWER BODY CLADDING — dark strip between wheel arches ── */}
        <path
          className={styles.cladding}
          d="M 60,61 Q 100,59 140,61 L 140,68 L 60,68 Z"
        />

        {/* ── WINDOWS ── */}

        {/* Windshield — wide at base, raked like the Camry (≈62° from vertical) */}
        <path className={styles.glass} d="M 118,24 L 131,24 L 150,43 L 131,43 Z" />

        {/* Front door window */}
        <path className={styles.glass} d="M 100,24 L 116,24 L 116,43 L 100,43 Z" />

        {/* Rear door window */}
        <path className={styles.glass} d="M 76,24 L 97,24 L 97,43 L 76,43 Z" />

        {/* Rear quarter window — small triangle at the C-pillar (Camry detail) */}
        <path className={styles.glass} d="M 66,25 L 74,23 L 74,37 Z" />

        {/* ── WINDOW GLOSS — subtle white shine on windshield ── */}
        <path className={styles.gloss} d="M 121,25 L 127,25 L 140,36 L 134,36 Z" />

        {/* ── B-PILLAR — vertical post between front and rear door windows ── */}
        <rect x="97" y="24" width="3.5" height="19" className={styles.pillar} />

        {/* ── BELTLINE — where windows sit on top of the door panels ── */}
        <line x1="53" y1="43" x2="151" y2="43" className={styles.beltline} />

        {/* ── BODY CHARACTER LINE — styling crease along the doors ── */}
        <path
          className={styles.characterLine}
          d="M 187,53 Q 160,51 110,52 Q 70,53 38,55"
        />

        {/* ── DOOR SEAMS — subtle vertical lines between doors ── */}
        <line x1="100" y1="43" x2="99"  y2="68" className={styles.doorSeam} />
        <line x1="76"  y1="43" x2="75"  y2="68" className={styles.doorSeam} />

        {/* ── SCHOOL NAME BANNER on the door panels ── */}
        {/* Green banner ribbon running along the middle of the doors */}
        <rect x="54" y="49" width="118" height="10" rx="2" className={styles.bannerBg} />
        {/* School name text inside the banner */}
        <text
          x="113"
          y="57"
          className={styles.bannerText}
          textAnchor="middle"
        >
          NEXT GEN DRIVING
        </text>

        {/* ── ROOF RAIL ── */}
        <line x1="77" y1="23" x2="116" y2="23" className={styles.roofRail} />

        {/* ── FRONT LED DRL (Camry hammerhead signature light strip) ── */}
        <path
          className={styles.drl}
          d="M 188,45 Q 193,47 196,50"
        />

        {/* ── MAIN HEADLIGHT (amber lens below DRL) ── */}
        <rect x="185" y="53" width="11" height="7" rx="2" className={styles.headlight} />

        {/* ── REAR LED TAILLIGHT BAR (full-height, Camry signature) ── */}
        <rect x="13" y="46" width="3.5" height="17" rx="1" className={styles.taillight} />

        {/* ── REAR CHROME STRIP / DIFFUSER ── */}
        <rect x="14" y="62" width="22" height="3" rx="1" className={styles.chrome} />

        {/* ── DUAL EXHAUST TIPS ── */}
        <rect x="16" y="64" width="5" height="3" rx="1.5" className={styles.exhaust} />
        <rect x="23" y="64" width="5" height="3" rx="1.5" className={styles.exhaust} />

        {/* ── FRONT LOWER GRILLE DETAIL ── */}
        <path
          className={styles.grille}
          d="M 191,60 Q 196,61 197,65 L 190,65 Z"
        />

        {/* ── WHEELS (drawn last so they appear over body/cladding) ── */}
        <Wheel cx={48}  cy={68} />   {/* rear wheel  */}
        <Wheel cx={152} cy={68} />   {/* front wheel */}

      </svg>

      {/* School initials below the car */}
      {/* Hide "NG" initials when small — too tiny to read */}
      {!small && <span className={styles.initials}>NG</span>}

    </div>
  );
}
