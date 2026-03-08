import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "bg-[#bf9b30] text-white" : "hover:bg-gray-100 text-slate-700";

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

  return (
    <aside className="w-64 bg-white border-r border-[#bf9b30] flex flex-col shadow-sm">
      <div className="p-6 font-bold text-2xl text-[#bf9b30] border-b border-gray-100">INNOVA</div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`block p-3 rounded-lg transition-colors ${isActive(item.path)}`}>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;