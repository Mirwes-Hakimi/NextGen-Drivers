import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// ─────────────────────────────────────────────────────────────
// ADMIN EMAILS
// Add any email address that should have admin access.
// Anyone not in this list will be redirected to /dashboard.
// ─────────────────────────────────────────────────────────────
const ADMIN_EMAILS = [
  "mirwes215@gmail.com", // owner — replace or add emails here
];

export default function AdminRoute({ children }) {
  const { user } = useAuth(); // get the currently logged-in user

  // If not logged in at all, send to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not an admin, send to their dashboard
  if (!ADMIN_EMAILS.includes(user.email)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin confirmed — render the protected page
  return children;
}
