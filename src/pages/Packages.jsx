
import React from "react";
import styles from "../styles/Packages.module.css";

export default function Packages(){
  const packages = [
    {
      title: "Behind The Wheel Training Package: 2 Hours",
      price: "$170",
      description: "Two-Hour Driving Lesson Package",
      features: [
        
'✔️ Pick-up and drop-off included',
'✔️ Start driving from a parking lot or a quiet residential area',
'✔️ Comprehensive explanation of primary driving rules',
'✔️ Free “Student Driver” sticker provided"'
      ]

    },


{
   title: "Behind The Wheel Training Package: 4 Hours",
      price: "$320",
      description: "Four-Hour Driving Lesson Package",
      features: [
        
'✔️ Split into two sessions on different days',
'✔️ Pick-up and drop-off included',
'✔️ Start driving from a parking lot or a quiet residential area',
'✔️ Comprehensive explanation of primary driving rules',
'✔️ Practice stop signs, lane changing, traffic lights, and more',
'✔️ Free “Student Driver” sticker provided'
      ],
},

{
 
   title: "Behind The Wheel Training Package: 6 Hours",
      price: "$480",
      description: "Six-Hour Driving Lesson Package",
      features: [
        
'✔️ Split into three sessions on different days',
'✔️ Pick-up and drop-off included',
'✔️ Comprehensive explanation of primary driving rules',
'✔️ Start driving from a parking lot or a quiet residential area',
'✔️ Practice stop signs, lane changing, traffic lights, and more',
'✔️ 15-minute freeway practice',
'✔️ DMV-required certificate provided for teens',
'✔️ Free “Student Driver” sticker provided'
      ] 
},

{
title: "DMV Behind-The-Wheel Road Test: 2 Hours",
      price: "$250",
      description: "DMV Package:",
      features: [
        
'We provide a full-service DMV test preparation experience. Our package includes:',
'✔️ Pick-up Service: We pick you up from your address one hour before your DMV appointment',
'✔️ Crash Course & Mock Test: A final refresher to boost your confidence before the actual test.',
'✔️ Test Vehicle Provided: Our insured, registered, and DMV-approved car is included for your road test.',

      ]  
},

{
  title: "Crash Course Package 2 Hours",
      price: "$200",
      description: "Crash Course Package",
      features: [
        
'This package is designed to fully prepare you for your DMV road test with expert guidance. It includes:',
'✔️ Pick-Up & Drop-Off: Convenient transportation to and from your location.',
'✔️ Crash Course & Mock Test: A focused two-hour session covering key driving skills and a realistic mock test.',
'✔️ Certified Instructor: Our experienced instructor will guide you through every step, from A to Z',
      ] 

},

{
 title: "Combo Package ( 6 Hours + Driver ED Course )",
      price: "$499",
      description: "Combo Package: 6-Hour Driving Lessons + Online Ed Course",
      features: [
        
"✔️ Includes a DMV-approved online driver's education course",
'✔️ Six hours of behind-the-wheel training, split into three sessions on different days',
'✔️ Pick-up and drop-off included',
'✔️ Start driving in a parking lot or a quiet residential area',
'✔️ Learn essential driving rules, including stop signs, lane changes, and traffic signals',
'✔️ 15-minute freeway practice',
'✔️ DMV-required certificate provided for teens',
'✔️ Free “Student Driver” sticker included'
      ]  
}
];

return (
  <div className={styles.container}>
    <h2 className={styles.sectionTitle}>Our Packages</h2>
    <h1 className={styles.mainHeading}>Select a Plan According to Your Requirements</h1>
    <div className={styles.grid}>
     {packages.map((pkg, index) => (
      <div key={index} className={styles.card}>
      <h2 className={styles.title}>{pkg.title}</h2>
      <p className={styles.price}>{pkg.price}</p>
      <p className={styles.desc}>{pkg.description}</p>
      <ul className={styles.features}>
      {pkg.features.map((features, i) => (
        <li key={i} className={styles.featureItem}> {features}</li>
      ))}
      </ul>
      <button className={styles.buyBtn}>Book Now</button>
      </div>
     ))}
    
    </div>
  </div>
)

}