import { motion } from "framer-motion";
import styles from "../styles/LandingPage.module.css";
import { Link } from "react-router-dom";
import { style } from "framer-motion/client";

export default function LandingPage(){

    return (
        <div className={styles.container}>
         <section className={styles.hero}>
          <div className={styles.overlay}>
           <motion.div 
           className={styles.content}
           initial={{ opacity:0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           >
             <img src="./background.png" alt="Next Gen Driving School" className={styles.logo} />
              <h1 className={styles.title}>Next Gen Driving School</h1>
             <p className={styles.subtitle}>Master the road with confidence & certified instructors.</p>
             <a href="/packages">
               <button className={styles.ctaButton}>Explore Packages</button>
             </a>
        
        </motion.div>
        
        </div>
        
    </section>
 </div>
    )
}