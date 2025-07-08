import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./components/AuthContext";
import Packages from "./pages/Packages";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";


function App(){
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/packages" element={ <Packages />
          
         }
          />
          <Route path="/dashboard" element={
            <PrivateRoute>
            <Home/>
            </PrivateRoute> }
            />
      </Routes>


    </Router>
  )
}

export default App;



