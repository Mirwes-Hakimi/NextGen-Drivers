
import React, { useState } from "react";                 
import { Link } from "react-router-dom";                 
import styles from "../styles/Navbar.module.css";        
import { FaBars, FaUser } from "react-icons/fa";         

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);       
  const toggleMenu = () => setMenuOpen((v) => !v);       
  const closeMenu = () => setMenuOpen(false);            

  return (
    <nav className={styles.navbar}>
      {/* Brand (logo + text) */}
      <div className={styles.brand}>
        
        <img src="/logo.png" alt="Next Gen Driving School" className={styles.logoImg} />
        <span className={styles.logoText}>Next Gen Driving School</span>
      </div>

      {/* Desktop Links */}
      <div className={styles.desktopLinks}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/teen-course" className={styles.link}>Teen Course</Link>
        <Link to="/packages" className={styles.link}>Packages</Link>
        <Link to="/adult-course" className={styles.link}>Adult Course Permit</Link>

        {/* Desktop dropdown (hover) */}
        <div className={styles.dropdown}>
          <button className={styles.dropdownButton} type="button" aria-haspopup="true" aria-expanded="false">
            View More ▾
          </button>
          <div className={styles.dropdownContent} role="menu">
            <Link to="/dmv" className={styles.link}>DMV</Link>
            <Link to="/practice" className={styles.link}>Permit Practice Set</Link>
            <Link to="/new-drivers" className={styles.link}>New Drivers</Link>
            <Link to="/education" className={styles.link}>Drivers Education Videos</Link>
          </div>
        </div>

        {/* Optional: quick user icon route */}
        <Link to="/login" className={styles.link} aria-label="Student Login">
          <FaUser style={{ verticalAlign: "-2px" }} />
        </Link>
      </div>

      {/* Mobile hamburger */}
      <div className={styles.mobileMenu}>
        <button onClick={toggleMenu} className={styles.menuButton} aria-label="Open menu" aria-expanded={menuOpen}>
          <FaBars />
        </button>
      </div>

      {/* Mobile dropdown – only rendered when open */}
      {menuOpen && (
        <div className={styles.mobileDropdown}>
          <Link to="/" className={styles.link} onClick={closeMenu}>Home</Link>
          <Link to="/teen-course" className={styles.link} onClick={closeMenu}>Teen Course</Link>
          <Link to="/packages" className={styles.link} onClick={closeMenu}>Packages</Link>
          <Link to="/adult-course" className={styles.link} onClick={closeMenu}>Adult Course Permit</Link>
          <Link to="/dmv" className={styles.link} onClick={closeMenu}>DMV</Link>
          <Link to="/practice" className={styles.link} onClick={closeMenu}>Permit Practice Set</Link>
          <Link to="/new-drivers" className={styles.link} onClick={closeMenu}>New Drivers</Link>
          <Link to="/education" className={styles.link} onClick={closeMenu}>Drivers Education Videos</Link>
          <Link to="/login" className={styles.link} onClick={closeMenu}>
            <FaUser style={{ verticalAlign: "-2px" }} /> Student Login
          </Link>
        </div>
      )}
    </nav>
  );
}
