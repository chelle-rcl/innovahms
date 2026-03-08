import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Rooms', path: '/admin/rooms' },
    { name: 'Reservations', path: '/admin/reservations' },
    { name: 'Customers', path: '/admin/customers' },
    { name: 'Housekeeping', path: '/admin/housekeeping' },
    { name: 'Inventory', path: '/admin/inventory' },
    { name: 'Staff', path: '/admin/staff' },
    { name: 'Reports', path: '/admin/reports' },
    { name: 'Reviews', path: '/admin/reviews' },
  ];

  const currentItem = navItems.find(item => item.path === location.pathname);
  const pageTitle = currentItem ? currentItem.name : "Management Portal";

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-10 sticky top-0 z-40">
      {/* Left Side: Page Title */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#bf9b30] opacity-70 uppercase">
            Innova
          </span>
          <div className="w-1 h-1 rounded-full bg-black/30" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-black/50 uppercase">
            Portal
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight mt-0.5">
          {pageTitle}
        </h2>
      </div>

      {/* Right Side: Profile Group */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-5 pl-8 border-l border-black/20">
          <span className="text-xs font-semibold text-slate-700 tracking-tight">
            Administrator
          </span>
          
          <div className="w-10 h-10 rounded-full border border-[#bf9b30]/20 p-0.5 bg-gradient-to-tr from-[#bf9b30]/10 to-transparent">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#bf9b30] shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>

          <button className="ml-2 group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#1a1208] text-white hover:bg-[#bf9b30] transition-all duration-300 shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Logout</span>
            <svg 
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 opacity-70" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H8.25" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;