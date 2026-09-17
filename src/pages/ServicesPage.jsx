import { Link } from "react-router-dom";
import infoStyles from "../styles/InfoPage.module.css";
import SEOHead from "../components/SEOHead";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../lib/structuredData";

// Services hub — shown at /services, links out to each specific service page
const SERVICES = [
  {
    icon: "🧑‍🎓",
    title: "Teen Driving Lessons",
    desc: "Behind-the-wheel training for teens ages 15½ and up, with a certified instructor.",
    to: "/services/teen-driving-lessons",
  },
  {
    icon: "🚙",
    title: "Adult Driving Lessons",
    desc: "For first-time adult drivers or those returning to the road after time away.",
    to: "/services/adult-driving-lessons",
  },
  {
    icon: "📋",
    title: "DMV Test Preparation",
    desc: "A warm-up practice drive followed by your California DMV behind-the-wheel road test.",
    to: "/services/dmv-test-preparation",
  },
  {
    icon: "🔑",
    title: "DMV Test Car Rental",
    desc: "Use our fully insured, DMV-approved vehicle for your road test — no need to bring your own car.",
    to: "/services/dmv-test-car-rental",
  },
];

export default function ServicesPage() {
  return (
    <div className={infoStyles.page}>
      <SEOHead
        title="Driving Lessons & DMV Test Services | Best Driving School"
        description="Teen and adult driving lessons, DMV road test preparation, and DMV test car rental across the Bay Area and Sacramento region."
        path="/services"
        structuredData={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      {/* ── Hero ── */}
      <section className={infoStyles.hero}>
        <p className={infoStyles.heroEyebrow}>What We Offer</p>
        <h1 className={infoStyles.heroHeading}>
          Driving Lessons <span>& DMV Services</span>
        </h1>
        <p className={infoStyles.heroSub}>
          From your first lesson to test day, pick the service that matches where you are.
        </p>
        <Link to="/packages" className={infoStyles.heroBtn}>View Packages &amp; Pricing</Link>
      </section>

      {/* ── Content ── */}
      <div className={infoStyles.content}>
        <div className={infoStyles.grid}>
          {SERVICES.map((s) => (
            <Link key={s.to} to={s.to} className={infoStyles.card} style={{ textDecoration: "none" }}>
              <span className={infoStyles.cardIcon}>{s.icon}</span>
              <p className={infoStyles.cardTitle}>{s.title}</p>
              <p className={infoStyles.cardText}>{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
