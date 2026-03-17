import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
  const googleClientId = "780199678192-krqs4tdu62ltsnb4nnq6td6mhed5mchr.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <Routes>
          {/* --- CUSTOMER ROUTES --- */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* --- OWNER AUTH --- */}
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/owner/signup" element={<OwnerSignUp />} />

          {/* --- OWNER PROTECTED ROUTES --- */}
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
    </GoogleOAuthProvider>
  );
}

export default App;