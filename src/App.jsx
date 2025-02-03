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

  // Funzione per verificare l'autenticazione
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  // Verifica l'autenticazione al mount e al cambio di localStorage
  useEffect(() => {
    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <>
        <NavigationBar isAuthenticated={isAuthenticated} checkAuth={checkAuth} />
        <Routes>
          <Route path="/" element={<Homepage checkAuth={checkAuth} />} />
          <Route path="/register" element={<RegisterPage checkAuth={checkAuth} />} />
          <Route path="/login" element={<LoginPage checkAuth={checkAuth} />} />
          <Route path="/profilo" element={<ProfilePage checkAuth={checkAuth} />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route 
            path="/fotografo/:id" 
            element={<FotografoProfile checkAuth={checkAuth} isAuthenticated={isAuthenticated} />} 
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
