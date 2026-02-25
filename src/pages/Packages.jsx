
import React, { useState } from "react";
import styles from "../styles/Packages.module.css";
import { useNavigate } from "react-router-dom";
import { zipToCity } from "../data/locations";
export default function Packages() {
  
  const packages = [
    {
      // Title for 2-hour package
      title: "Behind The Wheel Training Package: 2 Hours",
      // Number of sessions in this package\/
      type: "TRAINING",
      sessions: 1,
      cities: {
        "San Francisco": 210,
        "Daly City": 200,
        "Livermore": 180,
        "Pleasanton": 180,
        "Dublin": 180,
        "San Ramon": 180,
        "Danville": 180,
        "Alamo": 180,
        "Walnut Creek": 180,
        "Pleasant Hill": 170,
        "Concord": 170,
        "Pittsburg": 180,
        "Antioch": 180,
        "Brentwood": 185,
        "Oakland": 180,
      },
      // Bullet points for what’s included
      features: [
        "✔️ Pick-up and drop-off included",
        "✔️ Start driving from a parking lot or quiet residential area",
        "✔️ Comprehensive explanation of primary driving rules",
        "✔️ Free “Student Driver” sticker provided",
      ],
    },
    {
      // Title for 4-hour package
      title: "Behind The Wheel Training Package: 4 Hours",
      // 2 sessions of 2 hours
      type: "TRAINING",
      sessions: 2,
      cities: {
        "San Francisco": 390,
        "Daly City": 380,
        "Livermore": 360,
        "Pleasanton": 360,
        "Dublin": 360,
        "San Ramon": 360,
        "Danville": 360,
        "Alamo": 360,
        "Walnut Creek": 360,
        "Pleasant Hill": 340,
        "Concord": 340,
        "Pittsburg": 340,
        "Antioch": 360,
        "Brentwood": 365,
        "Oakland": 360,
      },
      features: [
        "✔️ Split into two sessions on different days",
        "✔️ Pick-up and drop-off included",
        "✔️ Start driving from a parking lot or quiet residential area",
        "✔️ Comprehensive explanation of primary driving rules",
        "✔️ Practice stop signs, lane changing, traffic lights, and more",
        "✔️ Free “Student Driver” sticker provided",
      ],
    },
    {
      // Title for 6-hour package
      title: "Behind The Wheel Training Package: 6 Hours",
      type: "TRAINING",
      sessions: 3,

      cities: {
        "San Francisco": 590,
        "Daly City": 550,
        "Livermore": 540,
        "Pleasanton": 540,
        "Dublin": 540,
        "San Ramon": 540,
        "Danville": 540,
        "Alamo": 540,
        "Walnut Creek": 540,
        "Pleasant Hill": 510,
        "Concord": 510,
        "Pittsburg": 540,
        "Antioch": 540,
        "Brentwood": 545,
        "Oakland": 540,
      },
      features: [
        "✔️ Split into three sessions on different days",
        "✔️ Pick-up and drop-off included",
        "✔️ Comprehensive explanation of primary driving rules",
        "✔️ Start driving from a parking lot or quiet residential area",
        "✔️ Practice stop signs, lane changing, traffic lights, and more",
        "✔️ 15-minute freeway practice",
        "✔️ DMV-required certificate for teens",
        "✔️ Free “Student Driver” sticker included",
      ],
    },
    {
  // DMV Road Test package
  title: "DMV Behind-The-Wheel Road Test (2 Hours)",
  
  // One appointment (practice + test)
   type: "DMV",
  sessions: 1,

  // City-based pricing
  cities: {
    // Higher-cost areas
    "San Francisco": 300,
    "Daly City": 300,

    // All other supported cities
    "Livermore": 250,
    "Pleasanton": 250,
    "Dublin": 250,
    "San Ramon": 250,
    "Danville": 250,
    "Alamo": 250,
    "Walnut Creek": 250,
    "Pleasant Hill": 250,
    "Concord": 250,
    "Pittsburg": 250,
    "Antioch": 250,
    "Brentwood": 250,
    "Oakland": 250,

  },

  // What’s included
  features: [
    "✔️ 45-minute warm-up practice before DMV test",
    "✔️ DMV road test included",
    "✔️ Certified instructor guidance",
    "✔️ DMV-approved vehicle provided",
    "✔️ Pick-up and drop-off included",
  ],
},

];

  // Gather all city names from all packages into one Set (unique)
  const allCitiesSet = new Set(
    packages.flatMap((pkg) => Object.keys(pkg.cities))
  );
  // Convert the Set back into an array
  const allCities = Array.from(allCitiesSet);

  // State for ZIP that user types
  const [zip, setZip] = useState("");
  // State for selected city (either from ZIP or dropdown)
  const [selectedCity, setSelectedCity] = useState("");
  // State for error message when ZIP not found
  const [zipError, setZipError] = useState("");

  /// Navigate to booking page with selected package info
  const navigate = useNavigate();

  // Handle changes in ZIP input
  const handleZipChange = (e) => {
    const value = e.target.value.trim(); /// remove spaces
    setZip(value);                       // update ZIP state

    // Look up city from mapping
    const city = zipToCity[value];

    if (city) {
      // If ZIP is known, set that city and clear error
      setSelectedCity(city);
      setZipError("");
    } else {
      // If ZIP not recognized, clear city and show message (optional)
      setSelectedCity("");
      if (value.length >= 5) {
        setZipError("We currently don’t serve this ZIP code.");
      } else {
        setZipError("");
      }
    }
  };

  // Handle manual city selection from dropdown
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  // When user clicks "Book Now" for a package
  const handleBookingNow = (selectedPackage) => {
    // If no city is selected, do not continue
    if (!selectedCity) {
      alert("Please select your city or enter a valid ZIP before booking.");
      return;
    }

    // Get the price for this package in the chosen city
    const cityPrice = selectedPackage.cities[selectedCity];

    // If there is no price for that city, show a message
    if (cityPrice == null) {
      alert("This package is not available in the selected city.");
      return;
    }

    // Navigate to booking page and send package + selected city + price
    navigate("/booking", {
      state: {
        selectedPackage,
        selectedCity,
        price: cityPrice,
      },
    });
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Our Packages</h2>
      <h1 className={styles.mainHeading}>
        Select a Plan According to Your Requirements
      </h1>


      <div className={styles.locationBar}>
        <label className={styles.fieldLabel}>
          ZIP Code:
          <input
            className={styles.zipInput}
            value={zip}
            onChange={handleZipChange}
            placeholder="e.g. 94523"
          />
        </label>

        {/* OR city dropdown */}
        <label className={styles.fieldLabel}>
          Choose City:
          <select
            className={styles.citySelect}
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="">-- Select City --</option>
            {allCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Show ZIP error if needed */}
      {zipError && <p className={styles.warning}>{zipError}</p>}

      {/* If no city is selected, ask user to choose city first */}
      {!selectedCity && (
        <p className={styles.helperText}>
          Please enter your ZIP or choose your city to see package prices.
        </p>
      )}

      {/* Only show packages when a city is selected */}
      {selectedCity && (
        <div className={styles.grid}>
          {packages.map((pkg, index) => {
            // For each package, get price for selected city
            const cityPrice = pkg.cities[selectedCity];

            // If there's no price for that city, skip showing this card
            if (cityPrice == null) return null;

            return (
              <div key={index} className={styles.card}>
                {/* Package title */}
                <h2 className={styles.title}>{pkg.title}</h2>

                {/* Price for this city */}
                <p className={styles.price}>${cityPrice}</p>

                {/* Features list */}
                <ul className={styles.features}>
                  {pkg.features.map((feature, i) => (
                    <li key={i} className={styles.featureItem}>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Book button */}
                <button
                  onClick={() => handleBookingNow(pkg)}
                  className={styles.buyBtn}
                >
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
