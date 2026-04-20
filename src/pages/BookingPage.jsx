
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/AuthContext";
import emailjs from "@emailjs/browser";                    // email sending library
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "../emailjs.config";                               // your EmailJS credentials
import styles from "../styles/BookingPage.module.css";

export default function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const selectedPackage = state?.selectedPackage || {};
  const selectedCity = state?.selectedCity || "";
  const price = state?.price || "";

  const isDMV = selectedPackage.type === "DMV";

  const [formData, setFormData] = useState({              /// all form values in one object
    firstName: "",                                        // student first name
    lastName: "",                                         /// student last name
    email: "",                                            // parent / student email
    phone: "+1",                                        
    dob: "",                                             
    address: "",                                          // home address
    agreedToTerms: false,                                 // terms checkbox
    sessions: [],                                         // array to store session data
  });

  const sessionCount = selectedPackage.sessions || 1;     // how many sessions this package has
  const sessionNumbers = Array.from(                     // [1, 2, ..., sessionCount]
    { length: sessionCount },
    (_, i) => i + 1
  );

  // Helper: add minutes to a "HH:MM" time string
  const addMinutesToTime = (timeStr, minutesToAdd) => {
    if (!timeStr) return "";                              // if empty, return empty
    const [hh, mm] = timeStr.split(":");                  // split "HH:MM" into parts
    const date = new Date();                              // create Date object
    date.setHours(parseInt(hh, 10));                      // set hours
    date.setMinutes(parseInt(mm, 10) + minutesToAdd);     // add minutes
    const newH = String(date.getHours()).padStart(2, "0");// format hours 2 digits
    const newM = String(date.getMinutes()).padStart(2, "0");// format minutes 2 digits
    return `${newH}:${newM}`;                             // return "HH:MM" string
  };

  // Update general (non-session) field values
  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;      // get info about input
    const fieldValue = type === "checkbox" ? checked : value; // checkbox uses checked
    setFormData((prev) => ({                              // update formData state
      ...prev,
      [name]: fieldValue,
    }));
  };

  // Generic function to update session-specific fields
  const handleSessionChange = (sessionIndex, field, value) => {
    setFormData((prev) => {
      const sessions = prev.sessions ? [...prev.sessions] : []; // copy existing sessions
      if (!sessions[sessionIndex]) {                        // if session obj missing
        sessions[sessionIndex] = {};                        // create empty object
      }
      sessions[sessionIndex][field] = value;                // set field value
      return {
        ...prev,
        sessions,                                           // store updated sessions
      };
    });
  };

  // When user selects a start time for a session
  const handleSessionStartChange = (sessionIndex, startTime) => {
    // Save start time
    handleSessionChange(sessionIndex, "startTime", startTime);

    // Calculate end time as +110 minutes (2:30 -> 4:20 example)
const duration = selectedPackage.sessionDurationMinutes || 120;
const endTime = addMinutesToTime(startTime, duration);

    // Save end time automatically
    handleSessionChange(sessionIndex, "endTime", endTime);
  };



  function calculateAge(dob) {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }


  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dob) {
      alert("Please enter date of birth.");
      return;
    }

    if (calculateAge(formData.dob) < 15) {
      alert("Students must be at least 15 years old to book a session.");
      return;
    }

    const now = new Date();

    for (let i = 0; i < formData.sessions.length; i++) {
      const session = formData.sessions[i];

      if (!session?.date || !session?.startTime) {
        alert(`Please complete date and time for Session ${i + 1}.`);
        return;
      }

      const selectedDateTime = new Date(`${session.date}T${session.startTime}`);

      if (selectedDateTime <= now) {
        alert(`Session ${i + 1} cannot be in the past.`);
        return;
      }

      const hour = selectedDateTime.getHours();
      if (hour < 8 || hour >= 18) {
        alert(`Session ${i + 1} must be between 8:00 AM and 6:00 PM.`);
        return;
      }
    }

    if (!formData.agreedToTerms) {
      alert("Please acknowledge the Terms and Conditions.");
      return;
    }

    try {
      setSubmitting(true);

      // ── Step 1: Save the booking to Firestore ──
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userEmail: user.email,
        package: selectedPackage.title,
        packageType: selectedPackage.type,
        city: selectedCity,
        price,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        address: formData.address,
        sessions: formData.sessions,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // ── Step 2: Build a readable sessions summary for the email ──
      // Turns each session into "Session 1: Mon Apr 14 — 10:00 AM to 12:00 PM"
      const sessionsText = formData.sessions
        .map((s, i) => {
          // Format the date from "YYYY-MM-DD" to a readable string
          const dateLabel = s.date
            ? new Date(s.date + "T00:00:00").toDateString()
            : "TBD";

          // Format start/end times from "HH:MM" to "12:30 PM" style
          const fmt = (t) => {
            if (!t) return "TBD";
            const [hh, mm] = t.split(":");
            const d = new Date();
            d.setHours(parseInt(hh, 10));
            d.setMinutes(parseInt(mm, 10));
            return d.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            });
          };

          return `Session ${i + 1}: ${dateLabel} — ${fmt(s.startTime)} to ${fmt(s.endTime)}`;
        })
        .join("\n");                               // one session per line in the email

      // ── Step 3: Send confirmation email via EmailJS ──
      await emailjs.send(
        EMAILJS_SERVICE_ID,                        // your EmailJS service
        EMAILJS_TEMPLATE_ID,                       // your EmailJS template
        {
          // These variable names must match exactly what you used in your template
          to_email:      formData.email,                              // recipient
          student_name:  `${formData.firstName} ${formData.lastName}`,// full name
          package_title: selectedPackage.title,                       // package name
          city:          selectedCity,                                 // city
          price:         price,                                        // price (no $)
          sessions_text: sessionsText,                                 // session list
        },
        EMAILJS_PUBLIC_KEY                         // your EmailJS public key
      );

      alert(
        `Booking confirmed! A confirmation email has been sent to ${formData.email}.`
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /// Get todays date in
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.page}>
    <div className={styles.container}>
      {/* Top summary: package + city + price */}
      <h2 className={styles.heading}>Book: {selectedPackage.title}</h2>
      <p className={styles.summary}>
        City: <strong>{selectedCity}</strong> &nbsp;·&nbsp; Price:{" "}
        <strong>${price}</strong>
      </p>

      {/* Main booking form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Student info grid */}
        <div className={styles.formGrid}>
          <label className={styles.fieldLabel}>
            Student First Name:
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleFieldChange}
              required
            />
          </label>

          <label className={styles.fieldLabel}>
            Student Last Name:
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleFieldChange}
              required
            />
          </label>

          <label className={styles.fieldLabel}>
            Parent / Student Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              required
            />
          </label>

          <label className={styles.fieldLabel}>
            Phone Number:
            <input
              name="phone"
              value={formData.phone}
              onChange={handleFieldChange}
              required
            />
          </label>

          <label className={styles.fieldLabel}>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleFieldChange}
              required
            />
          </label>

          <label className={styles.fieldLabel}>
            Home Address:
            <input
              name="address"
              value={formData.address}
              onChange={handleFieldChange}
              required
            />
          </label>
        </div>

        {/* Sessions area */}
        <h3 className={styles.subHeading}>Session Scheduling</h3>

        {isDMV && (
  <p className={styles.dmvNote}>
    This appointment includes a 45-minute warm-up practice before the DMV test.
  </p>
)}

        {sessionNumbers.map((num, idx) => {
          // Get session data if exists
          const session = formData.sessions?.[idx] || {};
          return (
            <div key={num} className={styles.sessionCard}>
              <h4>Session {num}</h4>

              <label className={styles.fieldLabel}>
                Date:
                <input
                  type="date"
                  value={session.date || ""}
                  onChange={(e) =>
                    handleSessionChange(idx, "date", e.target.value)
                  }
                  required
                  min={todayStr}
                />
              </label>

              <label className={styles.fieldLabel}>
                Time
                <div className={styles.timeRow}>
                  <input
                    type="time"
                    value={session.startTime || ""}
                    onChange={(e) =>
                      handleSessionStartChange(idx, e.target.value)
                    }
                    required
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={session.endTime || ""}
                    readOnly
                  />
                </div>
              </label>
            </div>
          );
        })}

        {/* Terms and conditions */}
        <label className={styles.termsRow}>
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleFieldChange}
            required
          />
          <span>
            Please acknowledge Terms and Conditions (link “Read more” here).
          </span>
        </label>

        {/* Buttons row */}
        <div className={styles.buttonRow}>
          <button type="submit" className={styles.primaryBtn} disabled={submitting}>
            {submitting ? "Saving..." : "Pay Now (Stripe later)"}
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => alert("Pay Later flow coming soon")}
          >
            Pay Later
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
