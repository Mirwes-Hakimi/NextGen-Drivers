import React from "react";
import styles from "../styles/Packages.module.css";
import { useAuth } from "../components/AuthContext";// get logged-in user

function Packages(){
  const { user } = useAuth();/// acess current user to conditionaly allow buying
  const handleBuy = (pkgName) => {///temprory placeholder for the buy button
    if(!user){
      alert("Please log in to purchase a package.");
    } else {
      alert (`You selected the ${pkgName} package.`);
    };

  };
  return (
    <div className={styles.container}>
    <h1 className={styles.heading}>Choose Your Driving Package</h1>
     <div className={styles.grid}>
     {/* package 1 basic*/}
     <div className={styles.card}>
       <h2 className={styles.title}>Basic</h2>
        <p className={styles.price}>$170</p>
        <p className={styles.desc}>1 lessons with certified instructor. DMV test not included.</p>
        <button className={styles.buyBtn} onClick={() => handleBuy("Basic")}>Buy Now</button>
     </div>
    
        {/* package 2 basic*/}
     <div className={styles.card}>
       <h2 className={styles.title}>Standard</h2>
        <p className={styles.price}>$540</p>
        <p className={styles.desc}>3 lessons with certified instructor. DMV test not included.</p>
        <button className={styles.buyBtn} onClick={() => handleBuy("Standard")}>Buy Now</button>
     </div>

        {/* package 3 basic*/}
     <div className={styles.card}>
       <h2 className={styles.title}>DMV Package</h2>
        <p className={styles.price}>$230</p>
        <p className={styles.desc}>2 lessons with certified instructor. DMV test not included.</p>
        <button className={styles.buyBtn} onClick={() => handleBuy("DMV Package")}>Buy Now</button>
      </div>
     </div>
     
    
    </div>
  )
}

export default Packages;