import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import OwnerLayout from "./layouts/OwnerLayout"; 

// Owner Pages 
import OwnerDashboard from "./pages/owner/Dashboard";
import OwnerRooms from "./pages/owner/Rooms";
import OwnerReservations from "./pages/owner/Reservations";
import OwnerCustomers from "./pages/owner/Customers";
import OwnerHousekeeping from "./pages/owner/Housekeeping";
import OwnerInventory from "./pages/owner/Inventory";
import OwnerStaff from "./pages/owner/Staff";
import OwnerReports from "./pages/owner/Reports";
import OwnerReviews from "./pages/owner/Reviews";
import OwnerLogin from "./pages/owner/OwnerLogin"; 
import OwnerSignUp from "./pages/owner/OwnerSignUp";

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

        {/* --- OWNER AUTH (No Sidebar) --- */}
        <Route path="/owner/login" element={<OwnerLogin />} />
        {/* Add this line here */}
        <Route path="/owner/signup" element={<OwnerSignUp />} />

        {/* --- OWNER PROTECTED ROUTES (With Sidebar) --- */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="rooms" element={<OwnerRooms />} />
          <Route path="reservations" element={<OwnerReservations />} />
          <Route path="customers" element={<OwnerCustomers />} />
          <Route path="housekeeping" element={<OwnerHousekeeping />} />
          <Route path="inventory" element={<OwnerInventory />} />
          <Route path="staff" element={<OwnerStaff />} />
          <Route path="reports" element={<OwnerReports />} />
          <Route path="reviews" element={<OwnerReviews />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;