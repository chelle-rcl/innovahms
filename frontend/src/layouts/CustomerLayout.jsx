import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import CustomerHeader from "../components/CustomerHeader";
import CustomerFooter from "../components/CustomerFooter";

const CustomerLayout = () => {
  const location = useLocation();
  
  // 1. Get user data
  const savedCustomer = localStorage.getItem("user");
  const isAuthenticated = !!savedCustomer;

  // 2. Define public vs private pages
  // Pages anyone can see:
  const isPublicPage = 
    location.pathname === "/customer" || 
    location.pathname === "/customer/" ||
    location.pathname === "/customer/login" || 
    location.pathname === "/customer/signup" ||
    location.pathname === "/customer/features" ||
    location.pathname === "/customer/aboutus";

  // 3. Security Gate
  if (!isAuthenticated && !isPublicPage) {
    return <Navigate to="/customer/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-slate-900 transition-colors duration-300 dark:bg-zinc-950">
      <CustomerHeader />
      <main className="flex-grow"> 
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  );
};

export default CustomerLayout;