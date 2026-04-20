import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase email/password login
import { auth } from "../firebase";                         // Firebase auth instance
import { Link, useNavigate, useLocation } from "react-router-dom"; // routing helpers
import styles from '../styles/Login.module.css';

function Login() {
  const [email,    setEmail]    = useState(""); // controlled email input
  const [password, setPassword] = useState(""); // controlled password input

  const navigate = useNavigate(); // programmatic navigation after login
  const location = useLocation(); // read the current URL and any state attached to it

  // PrivateRoute stores the page the user was trying to reach inside location.state.from
  // If they came from e.g. /booking (with a selected package), we send them back there
  const from = location.state?.from;

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // stop the browser from reloading the page

    try {
      // Attempt Firebase sign-in with the entered credentials
      await signInWithEmailAndPassword(auth, email, password);

      // Clear inputs after a successful login
      setEmail("");
      setPassword("");

      if (from) {
        // If the user was redirected here from a protected page (e.g. /booking),
        // send them back there — and restore the original navigation state
        // so the booking page still has the package/city/price they chose
        navigate(from.pathname, { state: from.state, replace: true });
      } else {
        // No specific destination saved — fall back to the home page
        navigate("/");
      }
    } catch (err) {
      // Show Firebase error message (wrong password, user not found, etc.)
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)} // update email state on every keystroke
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)} // update password state on every keystroke
        />

        {/* Submit button */}
        <button className={styles.button}>Login</button>

        {/* Link to the sign-up page for new users */}
        <p className={styles.link}>
          Don't have an account?{" "}
          <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
