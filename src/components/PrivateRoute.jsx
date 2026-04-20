import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext"; // get the currently logged-in user

// PrivateRoute — wraps any route that requires authentication.
// If the user is NOT logged in, it redirects them to /login.
// It saves the current location (including any navigation state like selected package)
// so the login page can send them back to exactly where they were after signing in.
export default function PrivateRoute({ children }) {
  const { user } = useAuth();         // null if not logged in, object if logged in
  const location = useLocation();     // current URL + any state (e.g. selected package)

  if (!user) {
    // Redirect to login and pass the full current location as { from }
    // The login page reads this and navigates back here after a successful login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is logged in — render the protected page normally
  return children;
}
