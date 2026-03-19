import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import SuperadminSidebar from '../components/SuperadminSidebar'; 
import SuperadminHeader from '../components/SuperadminHeader';

const SuperadminLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b]' : 'bg-gray-50'}`}>
      <SuperadminSidebar isDarkMode={isDarkMode} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <SuperadminHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <main className="p-6 overflow-y-auto">
          <Outlet context={{ isDarkMode }} />
        </main>
      </div>
    </div>
  );
};

export default SuperadminLayout;