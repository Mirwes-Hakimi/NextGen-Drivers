import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; /// Firebase auth listener
import { auth } from "../firebase"; // auth instance from firebase config file

const AuthContext = createContext();

export const AuthProvider = ({ children}) => { ///provider component that wraps around the app
    const [user, setUser] = useState(null); /// state to store the currently logged-in user
    
    /// seting up listener to track auth state state changes login/logout
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         /// update the user state when auth state changes
         setUser(currentUser);
        });

        /// cleanup listener when component unmounts
        return () => unsubscribe();
    },[]);

    return (
        <AuthContext.Provider value={{ user }}>
          {children}
        </AuthContext.Provider>
    );
};
/// Custom hook to easily access the AuthContext
export function useAuth(){
    return useContext(AuthContext);
}