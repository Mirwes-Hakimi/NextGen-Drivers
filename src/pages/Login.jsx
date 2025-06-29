
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";// firebase login
import { auth } from "../firebase"/// firebase config
import { Link, useNavigate } from "react-router-dom"// Navigation
import styles from '../styles/Login.module.css';


function Login(){
  const [email, setEmail] = useState("");/// Track email input
  const [password, setPassword] = useState("");// track password
  const navigate = useNavigate();/// To redirect after login

  /// Handle login form submission
  const handleLogin = async (e) =>{
    e.preventDefault();// prevent page reload
    try{
      await signInWithEmailAndPassword(auth, email, password);// firebase login
      setEmail("")
      setPassword("")
      navigate("/");/// redirect to home after login
    } catch (err){
      alert("Login failed: " + err.message); //// show error if login fails
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form} ><h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}/// update email state
        />

        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}/// update the password state
        />

        <button className={styles.button}>Login</button>
        <p className={styles.link}>Don't have an account? {""}
        <Link to="/signup">Sign up here</Link>
        </p>
      </form>

    
    </div>
  );
}

export default Login;