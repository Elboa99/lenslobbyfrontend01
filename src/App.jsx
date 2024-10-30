import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Homepage from "./components/Homepage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import AboutUsPage from "./components/AboutUsPage";
import { useState, useEffect } from "react";
import FotografoProfile from "./components/FotografoProfile"; 


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []); 

  return (
    <BrowserRouter>
      <>
      <NavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/profilo" element={<ProfilePage/>}/>
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/fotografo/:id" element={<FotografoProfile />} />
        </Routes>
        

      </>
    </BrowserRouter>
  );
}

export default App;
