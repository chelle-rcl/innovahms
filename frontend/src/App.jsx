import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-innova-light text-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<div className="p-20 text-center">Features Coming Soon</div>} />
          <Route path="/contact" element={<div className="p-20 text-center">Contact Coming Soon</div>} />
          <Route path="/about" element={<div className="p-20 text-center">About Us Coming Soon</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
