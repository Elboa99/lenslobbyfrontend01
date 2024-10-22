import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <BrowserRouter>
    <>

    <NavigationBar></NavigationBar>
    <Routes>

    </Routes>
    </>
    </BrowserRouter>

  );
}

export default App;
