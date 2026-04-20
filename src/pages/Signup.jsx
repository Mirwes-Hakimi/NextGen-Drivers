import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase creates a new account
import { auth } from "../firebase";                             // Firebase auth instance
import { Link, useNavigate } from "react-router-dom";          // routing helpers
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
      setEmail("");
      setPassword("");

      // Send the new user to the home page
      navigate("/");
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
