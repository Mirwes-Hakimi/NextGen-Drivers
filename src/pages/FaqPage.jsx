import { useState } from "react";
import { Link } from "react-router-dom";
import infoStyles from "../styles/InfoPage.module.css";
import styles from "../styles/Faq.module.css";
import { faqs } from "../data/faq";
import SEOHead from "../components/SEOHead";
import { buildBreadcrumbSchema } from "../lib/structuredData";

// FAQ page — shown at /faq. Content lives in src/data/faq.js, shared
// with the homepage's FAQ teaser section (LandingPage.jsx).
export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0); // which question is expanded

  // FAQPage structured data — only valid because every question/answer
  // pair below is real visible content on this page (Google's
  // guidelines require the structured data to match what's shown).
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className={infoStyles.page}>
      <SEOHead
        title="Frequently Asked Questions | Best Driving School"
        description="Answers to common questions about pricing, packages, DMV test preparation, scheduling, rescheduling, and payment at Best Driving School."
        path="/faq"
        structuredData={[
          faqSchema,
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />

      {/* ── Hero ── */}
      <section className={infoStyles.hero}>
        <p className={infoStyles.heroEyebrow}>Questions</p>
        <h1 className={infoStyles.heroHeading}>
          Frequently Asked <span>Questions</span>
        </h1>
        <p className={infoStyles.heroSub}>
          Everything you need to know about pricing, packages, DMV testing, and booking.
        </p>
        <Link to="/packages" className={infoStyles.heroBtn}>View Packages</Link>
      </section>

      {/* ── Content ── */}
      <div className={infoStyles.content}>
        <div className={styles.faqList}>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <span className={styles.faqCaret}>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className={styles.faqAnswer}>{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
