import React, { useState } from "react";
import styles from "../styles/Packages.module.css";
import { useNavigate } from "react-router-dom";
import { zipToCity } from "../data/locations";

export default function Packages() {

  const packages = [
    {
      title: "Behind The Wheel Training Package: 2 Hours",
      type: "TRAINING",
      sessions: 1,
      popular: false,
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
      features: [
        "✔️ Pick-up and drop-off included",
        "✔️ Start driving from a parking lot or quiet residential area",
        "✔️ Comprehensive explanation of primary driving rules",
        '✔️ Free "Student Driver" sticker provided',
      ],
    },
    {
      title: "Behind The Wheel Training Package: 4 Hours",
      type: "TRAINING",
      sessions: 2,
      popular: true,
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
        '✔️ Free "Student Driver" sticker provided',
      ],
    },
    {
      title: "Behind The Wheel Training Package: 6 Hours",
      type: "TRAINING",
      sessions: 3,
      popular: false,
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
        '✔️ Free "Student Driver" sticker included',
      ],
    },
    {
      title: "DMV Behind-The-Wheel Road Test (2 Hours)",
      type: "DMV",
      sessions: 1,
      popular: false,
      cities: {
        "San Francisco": 300,
        "Daly City": 300,
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
  const allCities = Array.from(
    new Set(packages.flatMap((pkg) => Object.keys(pkg.cities)))
  );

  const [zip, setZip] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [zipError, setZipError] = useState("");
  const navigate = useNavigate();

  const handleZipChange = (e) => {
    const value = e.target.value.trim();
    setZip(value);
    const city = zipToCity[value];
    if (city) {
      setSelectedCity(city);
      setZipError("");
    } else {
      setSelectedCity("");
      if (value.length >= 5) {
        setZipError("We currently don't serve this ZIP code.");
      } else {
        setZipError("");
      }
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleBookingNow = (selectedPackage) => {
    if (!selectedCity) {
      alert("Please select your city or enter a valid ZIP before booking.");
      return;
    }
    const cityPrice = selectedPackage.cities[selectedCity];
    if (cityPrice == null) {
      alert("This package is not available in the selected city.");
      return;
    }
    navigate("/booking", {
      state: { selectedPackage, selectedCity, price: cityPrice },
    });
  };

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Bay Area Driving School</p>
        <h1 className={styles.heroHeading}>
          Choose the Package <span>Right for You</span>
        </h1>
        <p className={styles.heroSub}>
          All packages include pick-up &amp; drop-off. Select your city or enter
          your ZIP to see pricing in your area.
        </p>

        {/* Location selector */}
        <div className={styles.locationWrap}>
          <div className={styles.locationBar}>
            <label className={styles.fieldLabel}>
              ZIP Code
              <input
                className={styles.zipInput}
                value={zip}
                onChange={handleZipChange}
                placeholder="e.g. 94523"
                maxLength={5}
              />
            </label>

            <label className={styles.fieldLabel}>
              — or choose your city
              <select
                className={styles.citySelect}
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Select City</option>
                {allCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {zipError && <p className={styles.warning}>{zipError}</p>}
          {!selectedCity && !zipError && (
            <p className={styles.helperText}>
              Enter your ZIP or choose a city above to see prices.
            </p>
          )}
        </div>
      </section>

      {/* ── Cards ── */}
      {selectedCity && (
        <section className={styles.cardsSection}>
          <div className={styles.grid}>
            {packages.map((pkg, index) => {
              const cityPrice = pkg.cities[selectedCity];
              if (cityPrice == null) return null;

              return (
                <div
                  key={index}
                  className={`${styles.card} ${pkg.popular ? styles.cardPopular : ""}`}
                >
                  {pkg.popular && (
                    <span className={styles.popularBadge}>Most Popular</span>
                  )}

                  <span className={styles.typeChip}>{pkg.type}</span>

                  <h2 className={styles.title}>{pkg.title}</h2>

                  <div className={styles.priceRow}>
                    <span className={styles.priceDollar}>$</span>
                    <span className={styles.priceAmount}>{cityPrice}</span>
                    <span className={styles.priceSub}>/ package</span>
                  </div>

                  <div className={styles.divider} />

                  <ul className={styles.features}>
                    {pkg.features.map((feature, i) => (
                      <li key={i} className={styles.featureItem}>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleBookingNow(pkg)}
                    className={`${styles.buyBtn} ${pkg.popular ? styles.buyBtnPopular : ""}`}
                  >
                    Book Now
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
