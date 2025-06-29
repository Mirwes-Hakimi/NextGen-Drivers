import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../components/AuthContext";

function Profile(){
    const { user } = useAuth();/// get current user

    const handleLogout = async () => {
        try {
            await signOut(auth);/// Logs out the user
            console.log("Logged out successfully");
        } catch (err){
            alert ("Logout failed: " + err.message);
        }
    };

    return (
        <div>
          {user ? (
            <>
              <h2>Welcome, {user.email}</h2>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
          <p>Not logged in</p> 
          )}
        </div>
    )
}

export default Profile;