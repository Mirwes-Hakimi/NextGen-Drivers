import { Children, createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; /// Firebase auth listener
import { auth } from "../firebase"; // auth instance from firebase config file

const AuthContext = createContext();

export const AuthProvider = ({ children}) => { ///provider component that wraps around the app
    const [user, setUser] = useState(null); /// state to store the currently logged-in user

}