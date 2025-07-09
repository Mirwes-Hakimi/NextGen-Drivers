import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import styles from"../styles/Navbar.module.css";
import { FaBars, FaUser } from "react-icons/fa";
import { style } from "framer-motion/client";

export default function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className={styles.navbar}>
        <img src="/logo.png" alt="Next Gen Driving School" className={styles.logo} />
         <div className={styles.logo}>Next Gen Driving School </div>
          <div className={styles.desktopLinks}>
            <Link to="/" className={styles.link}>Home</Link>
            <Link to="/teen-course" className={styles.link} >Teen Course</Link>
            <Link to="/packages" className={styles.link}>Packages</Link>
            <Link to="/adult-course" className={styles.link}>Adult Course Permit</Link>
            <div className={styles.dropdown}>
             <button className={styles.dropdownButton}> View More🔽</button>
             <div className={styles.dropdownContent}>
               <Link to="/dmv" className={styles.link}>DMV</Link>
                <Link to="/practice" className={styles.link}>Permit Practice Set</Link>
                 <Link to="/new-drivers" className={styles.link} >New Drivers</Link>
                  <Link to="/education" className={styles.link}>Drivers Education Videos</Link>
             </div>
            </div>
          </div>

          {/* Mobile menu icon */}
        <div className={styles.mobileMenu}>
          <button onClick={toggleMenu} className={styles.menuButton}>
          <FaBars/>
          </button>
        
        </div>
    
          {/* Mobile dropdown links */}
          {menuOpen && (
            <div className={styles.mobileDropdown} >
            <Link to="/" className={styles.link} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/teen-course" className={styles.link}   onClick={() => setMenuOpen(false)}>Teen Course</Link>
            <Link to="/packages" className={styles.link} onClick={() => setMenuOpen(false)}>Packages</Link>
            <Link to="/adult-course" className={styles.link} onClick={() => setMenuOpen(false)}>Adult Course Permit</Link>

              <Link to="/dmv" className={styles.link} onClick={() => setMenuOpen(false)}>DMV</Link>
                <Link to="/practice" className={styles.link} onClick={() => setMenuOpen(false)}>Permit Practice Set</Link>
                 <Link to="/new-drivers" className={styles.link} onClick={() => setMenuOpen(false)}>New Drivers</Link>
                  <Link to="/education" className={styles.link} onClick={() => setMenuOpen(false)}>Drivers Education Videos</Link>
            
            </div>
          )

          }


    </nav>
    )
}