import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Homepage from "./components/Homepage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import AboutUsPage from "./components/AboutUsPage";

function App() {
  return (
    <BrowserRouter>
      <>
        <NavigationBar />
        <Routes>
          
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/profilo" element={<ProfilePage/>}/>
          <Route path="/aboutus" element={<AboutUsPage />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
