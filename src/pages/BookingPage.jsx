
import React, { useState } from "react";                 
import { useLocation } from "react-router-dom";          
import styles from "../styles/BookingPage.module.css";  

export default function BookingPage() {
  const { state } = useLocation();                        /// get state from navigate()
  const selectedPackage = state?.selectedPackage || {};   /// selected package object
  const selectedCity = state?.selectedCity || "";         // city chosen on Packages page
  const price = state?.price || "";                       /// price for that city

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


  const handleSubmit = (e) => {
  e.preventDefault();

  // ✅ Age validation
  if (!formData.dob) {
    alert("Please enter date of birth.");
    return;
  }

  if (calculateAge(formData.dob) < 15) {
    alert("Students must be at least 15 years old to book a session.");
    return;
  }

  const now = new Date();

  // ✅ Validate each session
  for (let i = 0; i < formData.sessions.length; i++) {
    const session = formData.sessions[i];

    if (!session?.date || !session?.startTime) {
      alert(`Please complete date and time for Session ${i + 1}.`);
      return;
    }

    const selectedDateTime = new Date(`${session.date}T${session.startTime}`);

    // ❌ No past sessions
    if (selectedDateTime <= now) {
      alert(`Session ${i + 1} cannot be in the past.`);
      return;
    }

    // ✅ Business hours only (8AM–6PM)
    const hour = selectedDateTime.getHours();
    if (hour < 8 || hour >= 18) {
      alert(`Session ${i + 1} must be between 8:00 AM and 6:00 PM.`);
      return;
    }
  }

  // ✅ Terms agreement
  if (!formData.agreedToTerms) {
    alert("Please acknowledge the Terms and Conditions.");
    return;
  }


    console.log("Booking Data:", {                          // log data for now
      package: selectedPackage,
      city: selectedCity,
      price,
      formData,
    });

    alert(
      `Booking confirmed!\n` +
        `Package: ${selectedPackage.title}\n` +
        `City: ${selectedCity}\n` +
        `Price: $${price}`
    );

    // Reset form after submit (optional)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "+1",
      dob: "",
      address: "",
      agreedToTerms: false,
      sessions: [],
    });
  };

  /// Get todays date in
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.container}>
      {/* Top summary: package + city + price */}
      <h2 className={styles.heading}>Book: {selectedPackage.title}</h2>
      <p className={styles.summary}>
        City: <strong>{selectedCity}</strong> | Price:{" "}
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
                Time:
                {/* Start time input */}
                <input
                  type="time"
                  value={session.startTime || ""}
                  onChange={(e) =>
                    handleSessionStartChange(idx, e.target.value)
                  }
                  required
                  min={todayStr}
                />
                {"  "}to{"  "}
                {/* End time auto-filled, read-only */}
                <input
                  type="time"
                  value={session.endTime || ""}
                  readOnly
                  min={todayStr}
                />
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
          <button type="submit" className={styles.primaryBtn}>
            Pay Now (Stripe later)
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
  );
}
