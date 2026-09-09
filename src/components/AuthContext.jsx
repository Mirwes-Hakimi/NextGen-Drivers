import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; /// Firebase auth listener
import { auth } from "../firebase"; // auth instance from firebase config file

const AuthContext = createContext();

export const AuthProvider = ({ children}) => { ///provider component that wraps around the app
    const [user, setUser] = useState(null); /// state to store the currently logged-in user
    // True until Firebase's first auth check resolves. Without this, a fresh
    // page load to a protected route (e.g. /admin) sees `user === null`
    // before Firebase has had a chance to restore the session, and the
    // route guard wrongly redirects to /login even though you're logged in.
    const [loading, setLoading] = useState(true);

    /// seting up listener to track auth state state changes login/logout
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         /// update the user state when auth state changes
         setUser(currentUser);
         setLoading(false);
        });

        /// cleanup listener when component unmounts
        return () => unsubscribe();
    },[]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
          {children}
        </AuthContext.Provider>
    );
};
/// Custom hook to easily access the AuthContext
export function useAuth(){
    return useContext(AuthContext);
}