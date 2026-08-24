import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase creates a new account
import { auth } from "../firebase";                             // Firebase auth instance
import { Link, useNavigate } from "react-router-dom";          // routing helpers
import emailjs from "@emailjs/browser";                         // email sending library
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_WELCOME_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  SCHOOL_NOTIFY_EMAIL,
} from "../emailjs.config";
import styles from "../styles/Signup.module.css";

function Signup() {
  const [email,    setEmail]    = useState(""); // controlled email input value
  const [password, setPassword] = useState(""); // controlled password input value
  const navigate = useNavigate();               // used to redirect after successful signup

  // Handle form submission — creates a new Firebase user account
  const handleSignup = async (e) => {
    e.preventDefault(); // prevent the browser from reloading the page on submit

    try {
      // Ask Firebase to create a new account with the entered email + password
      await createUserWithEmailAndPassword(auth, email, password);

      // Clear the inputs after successful account creation
      const newUserEmail = email;
      setEmail("");
      setPassword("");

      // Send the new user to the home page — don't make them wait on email delivery
      navigate("/");

      // ── Welcome email to the new user AND a heads-up to the school — best effort ──
      // Failures here shouldn't block signup; just log them.
      const welcomeFields = { user_email: newUserEmail };
      const [userResult, schoolResult] = await Promise.allSettled([
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_WELCOME_TEMPLATE_ID,
          { ...welcomeFields, to_email: newUserEmail },      // welcome email to the new user
          EMAILJS_PUBLIC_KEY
        ),
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_WELCOME_TEMPLATE_ID,
          { ...welcomeFields, to_email: SCHOOL_NOTIFY_EMAIL }, // heads-up to the school
          EMAILJS_PUBLIC_KEY
        ),
      ]);

      if (userResult.status === "rejected") {
        console.error("Welcome email failed:", userResult.reason);
      }
      if (schoolResult.status === "rejected") {
        console.error("School signup notification failed:", schoolResult.reason);
      }
    } catch (err) {
      // Firebase returns specific error codes, e.g. "email already in use"
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignup} className={styles.form}>
        <h2>Sign Up</h2>

        {/* Email input — Firebase requires a valid email format */}
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)} // update state on every keystroke
        />

        {/* Password input — Firebase requires at least 6 characters */}
        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)} // update state on every keystroke
        />

        {/* Submit button triggers handleSignup via the form's onSubmit */}
        <button type="submit" className={styles.button}>Create Account</button>

        {/* Link back to login for users who already have an account */}
        <p className={styles.link}>
          Already have an account?{" "}
          <Link to="/login">Log in here</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
