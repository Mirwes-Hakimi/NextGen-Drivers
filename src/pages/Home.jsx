
import { useAuth } from "../components/AuthContext"; /// get loggedin user
import { signOut } from "firebase/auth"; /// firebase sign out
import { auth } from "../firebase"; ///firebase config
import { motion } from "framer-motion";
import CallbackButton from "../components/CallbackButton";
import styles from "../styles/Home.module.css";

export default function Home(){
    const { user } = useAuth(); // GET current user
    
    const handleLogout = () => {
        signOut(auth)// sign the user out
    };

    return (
        <div className={styles.container}>
          <div className={styles.logutSection}>
          {user && (

            <>
              <p className={styles.logoutText}>Logged in as: {user.email}</p>
           
           <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </>
          )}
        </div>
       <motion.h1
         className={styles.heading}
         initial={{ y: -100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.6 }}
         
       >Welcome to Next Gen Driving School</motion.h1>
       <p className={styles.subText}> Learn safe driving from the best instructors. Choose your package now.</p>
       <a
         href="https://www.dmv.ca.gov/"
         target="_black"
         rel="noopener noreferrer"
         className={styles.dmvLink}
       >Visit DMV site</a>
       <CallbackButton />
    </div>
    );
}