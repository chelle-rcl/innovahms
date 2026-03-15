import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-slate-900">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;