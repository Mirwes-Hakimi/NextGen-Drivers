import { useState } from "react";
import { Link } from "react-router-dom";
import infoStyles from "../styles/InfoPage.module.css";
import styles from "../styles/Contact.module.css";
import { SCHOOL_NOTIFY_EMAIL } from "../emailjs.config";

// Contact page — shown at /contact
export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Opens the visitor's email client with the message pre-filled —
  // works with no backend or extra EmailJS template to set up.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Message from ${formData.name} via Best Driving School website`;
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    window.location.href = `mailto:${SCHOOL_NOTIFY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className={infoStyles.page}>

      {/* ── Hero ── */}
      <section className={infoStyles.hero}>
        <p className={infoStyles.heroEyebrow}>Get In Touch</p>
        <h1 className={infoStyles.heroHeading}>
          Contact <span>Best Driving School</span>
        </h1>
        <p className={infoStyles.heroSub}>
          Questions about lessons, pricing, or scheduling? Reach out and
          we'll get back to you, or book a session directly.
        </p>
        <Link to="/packages" className={infoStyles.heroBtn}>Book a Session</Link>
      </section>

      {/* ── Content ── */}
      <div className={infoStyles.content}>

        <div className={infoStyles.grid}>
          <div className={infoStyles.card}>
            <span className={infoStyles.cardIcon}>✉️</span>
            <p className={infoStyles.cardTitle}>Email Us</p>
            <p className={infoStyles.cardText}>
              <a href={`mailto:${SCHOOL_NOTIFY_EMAIL}`}>{SCHOOL_NOTIFY_EMAIL}</a>
              <br />We typically respond within one business day.
            </p>
          </div>

          <div className={infoStyles.card}>
            <span className={infoStyles.cardIcon}>📍</span>
            <p className={infoStyles.cardTitle}>Areas We Serve</p>
            <p className={infoStyles.cardText}>
              The greater Bay Area (San Francisco, Oakland, Walnut Creek,
              Concord, and more) and the Sacramento region, including
              Sacramento, Folsom, Elk Grove, Roseville, and Rancho Cordova.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className={styles.formWrap}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.fieldLabel}>
              Name:
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className={styles.fieldLabel}>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className={styles.fieldLabel}>
              Message:
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
            <p className={styles.note}>
              Opens your email app with this message ready to send.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
