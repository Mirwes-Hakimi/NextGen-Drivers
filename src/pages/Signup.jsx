import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";

function Signup(){
  const [email, setEmail] = useState("")/// user email
  const [password, setPassword] = useState("")/// user password
  const navigate = useNavigate();/// redirect after sign up

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
       await createUserWithEmailAndPassword(auth, email, password);
       setEmail("")
       setPassword("")
       navigate("/");/// redirect to home
    } catch (err){
        alert("Signup faild: " + err.message)
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSignup} className={styles.form}>
       <h2>Sign Up</h2>

       <input
         type="email"
         placeholder="Email"
         className={styles.input}
         value={email}
         onChange={(e) => setEmail(e.target.value)}
       />

       <input
         type="password"
         placeholder="Password"
         className={styles.input}
         value={password}
         onChange={(e) => setPassword(e.target.value)}

       />

       <button type="submit" className={styles.button}>Create Account</button>
       
       <p className={styles.link}>Already have an account?{" "}
       <Link to="/login">Log in here</Link>
       </p>
      </form>
    
    </div>
  )
}

export default Signup;