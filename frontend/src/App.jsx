import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Layouts
import OwnerLayout from "./layouts/OwnerLayout"; 
import CustomerLayout from "./layouts/CustomerLayout";
import SuperadminLayout from "./layouts/SuperadminLayout";

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

// Superadmin Pages
import SuperadminLogin from "./pages/superadmin/SuperadminLogin";
import SuperadminDashboard from "./pages/superadmin/Dashboard";
import SuperadminCustomers from "./pages/superadmin/Customers";
import SuperadminHotelOwner from "./pages/superadmin/HotelOwner";
import SuperadminStaff from "./pages/superadmin/Staff";
import SuperadminReports from "./pages/superadmin/Reports";
import SuperadminSettings from "./pages/superadmin/Settings";
import SuperadminAiConfig from "./pages/superadmin/AiConfig";
import SuperadminHome from "./pages/superadmin/Home";
import SuperadminMapServices from "./pages/superadmin/MapServices";
import SuperadminMemPackage from "./pages/superadmin/MemPackage";
import SuperadminReviews from "./pages/superadmin/Reviews";
import SuperadminSystemLogs from "./pages/superadmin/SystemLogs";

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

          {/* --- SUPERADMIN AUTH --- */}
          <Route path="/superadmin/login" element={<SuperadminLogin />} />

          {/* --- SUPERADMIN PROTECTED ROUTES --- */}
          <Route path="/superadmin" element={<SuperadminLayout />}>
            <Route index element={<SuperadminDashboard />} /> 
            <Route path="customers" element={<SuperadminCustomers />} />
            <Route path="owners" element={<SuperadminHotelOwner />} />
            <Route path="staff" element={<SuperadminStaff />} />
            <Route path="reports" element={<SuperadminReports />} />
            <Route path="settings" element={<SuperadminSettings />} />
            <Route path="aiconfig" element={<SuperadminAiConfig />} />
            <Route path="home" element={<SuperadminHome />} />
            <Route path="mapservices" element={<SuperadminMapServices />} />
            <Route path="mempackage" element={<SuperadminMemPackage />} />
            <Route path="reviews" element={<SuperadminReviews />} />
            <Route path="systemlogs" element={<SuperadminSystemLogs />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;