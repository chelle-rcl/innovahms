import React from 'react';

const AdminHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800 uppercase tracking-wide">Management Portal</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500 italic">Administrator</span>
        <button className="px-4 py-2 border border-[#bf9b30] text-[#bf9b30] rounded hover:bg-[#bf9b30] hover:text-white transition-all text-sm font-medium">
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;