import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Settings as SettingsIcon, History, LogOut, 
  Users, Laptop, FileBarChart, ShieldCheck, Globe, Star, 
  Hotel, Zap, UserCheck 
} from 'lucide-react';

const SuperadminSidebar = ({ isDarkMode }) => {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  const menuSections = [
    {
      title: "Overview",
      items: [
        { name: 'Dashboard', path: '/superadmin', icon: <LayoutDashboard /> },
        { name: 'Reports & Analytics', path: '/superadmin/reports', icon: <FileBarChart /> },
        { name: 'Guest Reviews', path: '/superadmin/reviews', icon: <Star />, badge: "NEW" }
      ]
    },
    {
      title: "Management",
      items: [
        { name: 'Hotel Owners', path: '/superadmin/owners', icon: <Hotel /> },
        { name: 'Customers', path: '/superadmin/customers', icon: <UserCheck /> },
        { name: 'Member Packages', path: '/superadmin/mempackage', icon: <ShieldCheck /> },
      ]
    },
    {
      title: "Connectivity",
      items: [
        { name: 'AI & API Config', path: '/superadmin/aiconfig', icon: <Laptop /> },

        { name: 'Map Services', path: '/superadmin/mapservices', icon: <Globe /> }
      ]
    },
    {
      title: "Administration",
      items: [
        { name: 'System Logs', path: '/superadmin/systemlogs', icon: <History /> }
      ]
    }
  ];

  const bgColor = isDarkMode ? 'bg-[#09090b]' : 'bg-gray-50';
  const borderColor = isDarkMode ? 'border-[#c9a84c]/20' : 'border-gray-200';
  const sectionTitleColor = isDarkMode ? 'text-gray-600' : 'text-gray-400';

  return (
    <aside className={`w-[260px] ${borderColor} border-r h-screen sticky top-0 font-sans transition-all duration-300 ${bgColor}`}>
      {/* Ginamit ang overflow-y-auto dito para pati Logo at Profile sasama sa scroll */}
      <div className="h-full overflow-y-auto custom-sidebar-scroll flex flex-col">
        
        {/* 1. BRAND LOGO & NETWORK STATUS */}
        <div className="px-7 py-6 flex items-center justify-between shrink-0">
          <Link to="/superadmin" className="transition-transform hover:scale-105">
            <img src="/images/logo.png" alt="Innova HMS" className="h-8 w-auto object-contain" />
          </Link>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border transition-colors ${isOnline ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className={`text-[8px] font-black uppercase ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* 2. NAVIGATION LINKS */}
        <div className="flex-1 px-3 space-y-6 pb-6 text-left">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <p className={`text-[9px] font-black tracking-[0.25em] uppercase px-4 mb-2 ${sectionTitleColor}`}>
                {section.title}
              </p>
              {section.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 relative ${
                      active 
                        ? (isDarkMode ? "bg-[#c9a84c]/10 text-[#c9a84c]" : "bg-[#c9a84c]/10 text-[#c9a84c]") 
                        : (isDarkMode ? "text-gray-500 hover:text-gray-200 hover:bg-white/5" : "text-gray-500 hover:text-[#c9a84c] hover:bg-white")
                    }`}
                  >
                    <span className={`${active ? "text-[#c9a84c]" : "text-gray-500 group-hover:text-[#c9a84c]"} transition-colors`}>
                      {React.cloneElement(item.icon, { size: 18, strokeWidth: active ? 2.5 : 2 })}
                    </span>
                    <span className={`text-[11px] uppercase tracking-wide flex-1 ${active ? 'font-black' : 'font-bold'}`}>
                      {item.name}
                    </span>
                    {active && (
                      <div className="absolute left-0 w-1 h-4 bg-[#c9a84c] rounded-r-full shadow-[0_0_12px_#c9a84c]" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* 3. FOOTER ACTIONS */}
        <div className={`p-4 border-t space-y-2 shrink-0 ${isDarkMode ? 'border-white/5' : 'border-gray-200'}`}>
          <Link 
            to="/superadmin/settings" 
            className={`flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg transition-all font-black text-[10px] uppercase tracking-[0.1em] border ${
              location.pathname === '/superadmin/settings' 
                ? "bg-[#c9a84c] text-black border-[#c9a84c] shadow-lg shadow-[#c9a84c]/20" 
                : (isDarkMode ? "bg-white/5 text-[#c9a84c] border-[#c9a84c]/10 hover:bg-[#c9a84c] hover:text-black" : "bg-gray-100 text-[#c9a84c] border-gray-200 hover:bg-[#c9a84c] hover:text-white")
            }`}
          >
            <SettingsIcon size={14} /> Settings
          </Link>
        </div>
      </div>

      <style>{`
        .custom-sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .custom-sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb { 
          background: ${isDarkMode ? '#27272a' : '#e4e4e7'}; 
          border-radius: 10px; 
        }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
      `}</style>
    </aside>
  );
};

export default SuperadminSidebar;