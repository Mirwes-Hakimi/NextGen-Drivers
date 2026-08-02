import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../components/AuthContext";
import styles from "../styles/Navbar.module.css";
import Logo from "../components/Logo";

// Links shown in the main nav row, before the "Services" dropdown
const NAV_LINKS = [
  { label: "Home",      to: "/"         },
  { label: "Packages",  to: "/packages" },
];

// Link shown after the "Services" dropdown
const CONTACT_LINK = { label: "Contact", to: "/contact" };

// Links inside the "Services ▾" dropdown
const SERVICES_LINKS = [
  { label: "Teen Course",       to: "/teen-course" },
  { label: "Adult Permit",      to: "/adult-course"},
  { label: "DMV Info",          to: "/dmv"          },
  { label: "Permit Practice",   to: "/practice"     },
  { label: "New Drivers",       to: "/new-drivers"  },
  { label: "Driver Ed Videos",  to: "/education"    },
];

export default function Navbar() {
  const { user } = useAuth();                         // logged-in user (or null)
  const location = useLocation();                     // current route
  const navigate  = useNavigate();

  const [menuOpen,  setMenuOpen]  = useState(false);  // mobile menu open/closed
  const [scrolled,  setScrolled]  = useState(false);  // has user scrolled down?

  // Add a CSS class when the page is scrolled so the navbar gets a solid bg + shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");                                    // send to landing page on logout
  };

  // Helper: returns true if this link is the active route
  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>

      {/* ── Brand ── */}
      <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
        <Logo size="sm" />
      </Link>

      {/* ── Desktop navigation links ── */}
      <div className={styles.desktopLinks}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`${styles.link} ${isActive(link.to) ? styles.activeLink : ""}`}
          >
            {link.label}
          </Link>
        ))}

        {/* "Services" dropdown */}
        <div className={styles.dropdown}>
          <button className={styles.dropdownBtn} type="button">
            Services <span className={styles.caret}>▾</span>
          </button>
          <div className={styles.dropdownPanel}>
            {SERVICES_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={styles.dropdownLink}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          to={CONTACT_LINK.to}
          className={`${styles.link} ${isActive(CONTACT_LINK.to) ? styles.activeLink : ""}`}
        >
          {CONTACT_LINK.label}
        </Link>
      </div>

      {/* ── Desktop right side: auth + Book Now ── */}
      <div className={styles.desktopRight}>
        {user ? (
          // Logged in: show email + logout button
          <>
            <Link to="/dashboard" className={styles.userChip}>
              <FaUser className={styles.userIcon} />
              <span className={styles.userEmail}>{user.email}</span>
            </Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          // Logged out: show Login link
          <Link to="/login" className={styles.loginBtn}>
            <FaUser /> Login
          </Link>
        )}

        {/* Book Now CTA — always visible */}
        <Link to="/packages" className={styles.bookBtn}>
          Book Now
        </Link>
      </div>

      {/* ── Mobile hamburger button ── */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* ── Mobile slide-down menu ── */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {/* All nav links */}
          {[...NAV_LINKS, ...SERVICES_LINKS, CONTACT_LINK].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles.mobileLink} ${isActive(link.to) ? styles.activeMobileLink : ""}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className={styles.mobileDivider} />

          {/* Auth section */}
          {user ? (
            <>
              <Link to="/dashboard" className={styles.mobileLink}>
                <FaUser /> {user.email}
              </Link>
              <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.mobileLink}>
              <FaUser /> Login
            </Link>
          )}

          {/* Book Now CTA */}
          <Link to="/packages" className={styles.mobileBookBtn}>
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
