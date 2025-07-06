import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";/// access auth state

export default function PrivateRoute({ children }){
    const { user } = useAuth(); /// get current user

    if(!user){
        return <Navigate to="/login" />
    }
    return children; /// otherwise show the requested page
}