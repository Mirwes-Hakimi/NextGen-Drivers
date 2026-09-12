import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { captureAttributionFromUrl } from "./lib/attribution";

// ── Core pages ──
import LandingPage    from "./pages/LandingPage";
import Login          from "./pages/Login";
import Signup         from "./pages/Signup";
import Packages       from "./pages/Packages";
import BookingPage    from "./pages/BookingPage";
import BookingSuccess from "./pages/BookingSuccess"; // /booking-success — after Stripe "Pay Now" checkout
import Home           from "./pages/Home";           // user dashboard
import AdminPage      from "./pages/AdminPage";      // admin dashboard

// ── Info / content pages (navbar links) ──
import TeenCourse     from "./pages/TeenCourse";     // /teen-course
import AdultCourse    from "./pages/AdultCourse";    // /adult-course
import DmvInfo        from "./pages/DmvInfo";        // /dmv
import PermitPractice from "./pages/PermitPractice"; // /practice
import NewDrivers     from "./pages/NewDrivers";     // /new-drivers
import DriverEd       from "./pages/DriverEd";       // /education
import ContactPage    from "./pages/ContactPage";    // /contact
import PrivacyPolicy  from "./pages/PrivacyPolicy";  // /privacy-policy

// ── Utility pages ──
import NotFound       from "./pages/NotFound";       // 404

// ── Route guards ──
import PrivateRoute   from "./components/PrivateRoute"; // requires login
import AdminRoute     from "./components/AdminRoute";   // requires admin email

// ── Shared layout ──
import Navbar         from "./pages/Navbar";

function App() {
  // Captures utm_source/medium/campaign/oppref from the landing URL, if
  // present, so it can be attached to a booking later even if the visitor
  // browses several pages first. See src/lib/attribution.js.
  useEffect(() => {
    captureAttributionFromUrl();
  }, []);

  return (
    <Router>
      {/* Navbar is always visible on every page */}
      <Navbar />

      <Routes>
        {/* ── Public routes — anyone can visit ── */}
        <Route path="/"             element={<LandingPage />} />
        <Route path="/login"        element={<Login />} />
        <Route path="/signup"       element={<Signup />} />
        <Route path="/packages"     element={<Packages />} />

        {/* ── Info pages (linked from navbar More dropdown) ── */}
        <Route path="/teen-course"  element={<TeenCourse />} />
        <Route path="/adult-course" element={<AdultCourse />} />
        <Route path="/dmv"          element={<DmvInfo />} />
        <Route path="/practice"     element={<PermitPractice />} />
        <Route path="/new-drivers"  element={<NewDrivers />} />
        <Route path="/education"    element={<DriverEd />} />
        <Route path="/contact"      element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Booking is open to guests too — signing up is optional */}
        <Route path="/booking"         element={<BookingPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />

        {/* ── Protected routes — must be logged in ── */}
        <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />

        {/* ── Admin-only route — redirects non-admins to /dashboard ── */}
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

        {/* ── 404 fallback — catches any unknown URL ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
