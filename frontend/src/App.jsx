import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Rooms from "./pages/admin/Rooms";
import Reservations from "./pages/admin/Reservations";
import Customers from "./pages/admin/Customers";
import Housekeeping from "./pages/admin/Housekeeping";
import Inventory from "./pages/admin/Inventory";
import Staff from "./pages/admin/Staff";
import Reports from "./pages/admin/Reports";
import Reviews from "./pages/admin/Reviews";
import AdminLogin from "./pages/admin/AdminLogin";

// Customer Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- CUSTOMER ROUTES --- */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Placeholders */}
          <Route path="/features" element={<div className="p-20 text-center text-[#bf9b30]">Features Coming Soon</div>} />
          <Route path="/contact" element={<div className="p-20 text-center">Contact Coming Soon</div>} />
          <Route path="/about" element={<div className="p-20 text-center">About Us Coming Soon</div>} />
        </Route>

        {/* --- ADMIN LOGIN (No Sidebar) --- */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* --- ADMIN PROTECTED ROUTES (With Sidebar) --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="customers" element={<Customers />} />
          <Route path="housekeeping" element={<Housekeeping />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="staff" element={<Staff />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;