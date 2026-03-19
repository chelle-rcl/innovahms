import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Users, Laptop, CheckSquare, 
  Search, Plus, Edit2, Trash2, 
  ChevronDown, Filter, MoreHorizontal
} from 'lucide-react';

const Staff = () => {
  const { isDarkMode } = useOutletContext();

  // THEME LOGIC - Matched with Innova-HMS aesthetic
  const cardBg = isDarkMode ? "bg-[#111111]" : "bg-white";
  const borderStyle = isDarkMode ? "border-white/5" : "border-gray-200";
  const textMain = isDarkMode ? "text-white" : "text-gray-900";
  const textSub = isDarkMode ? "text-gray-400" : "text-gray-600";
  const inputBg = isDarkMode ? "bg-white/5" : "bg-gray-100";

  return (
    <div className={`p-6 space-y-8 transition-colors duration-300 font-futuristic ${isDarkMode ? 'bg-[#09090b]' : 'bg-[#f8f9fa]'}`}>
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-6">
        <div className="text-left">
          <h1 className={`text-2xl font-black uppercase tracking-tighter ${textMain}`}>
            Staff <span className="italic font-light">Management</span>
          </h1>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Manage developer team and hotel-side staff assignments.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 rounded-md bg-[#c9a84c] text-black font-black text-[10px] uppercase shadow-[0_4px_15px_rgba(201,168,76,0.2)] hover:brightness-110 transition-all">
          <Plus size={16} strokeWidth={3} /> Add Staff
        </button>
      </div>

      {/* 2. KPI CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Staff (All Hotels)", value: "186", change: "+8 this month", icon: <Users size={20}/> },
          { label: "Dev Team", value: "12", change: "Innova-HMS team", icon: <Laptop size={20}/> },
          { label: "Active Right Now", value: "94", change: "Across all properties", icon: <CheckSquare size={20}/>, color: "text-green-500" },
        ].map((kpi, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${cardBg} ${borderStyle} relative overflow-hidden group shadow-sm`}>
            <div className="flex justify-between items-start mb-6">
              <div className="p-2.5 rounded-xl bg-white/5 text-[#c9a84c] border border-white/5 shadow-inner">
                {kpi.icon}
              </div>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">{kpi.label}</p>
            <h2 className={`text-3xl font-black tracking-tighter ${textMain} mb-2`}>{kpi.value}</h2>
            <p className={`text-[10px] font-bold uppercase ${kpi.color || 'text-green-500/80'}`}>
              {kpi.change}
            </p>
            {/* Soft Glow decoration */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#c9a84c]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* 3. STAFF REGISTRY TABLE */}
      <div className={`rounded-2xl border ${cardBg} ${borderStyle} shadow-xl overflow-hidden`}>
        {/* Table Header Controls */}
        <div className="p-5 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Users className="text-[#c9a84c]" size={18} />
            <h3 className={`text-xs font-black uppercase tracking-widest ${textMain}`}>Staff Registry</h3>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${borderStyle} ${inputBg} flex-1 md:w-64`}>
              <Search size={14} className="text-gray-500" />
              <input type="text" placeholder="Search staff..." className="bg-transparent border-none outline-none text-[10px] font-bold uppercase w-full text-white placeholder:text-gray-600" />
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${borderStyle} ${inputBg} text-[9px] font-black uppercase text-gray-400 cursor-pointer hover:text-white transition-all`}>
              All Departments <ChevronDown size={14} />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                {["Name", "Department", "Hotel", "Role", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "Alex Mendoza", initial: "AM", dept: "Dev Team", hotel: "Innova Dev", role: "Lead Developer", deptCol: "bg-blue-500/10 text-blue-400" },
                { name: "Dana Torres", initial: "DT", dept: "Dev Team", hotel: "Innova Dev", role: "Backend Dev", deptCol: "bg-blue-500/10 text-blue-400" },
                { name: "Ben Reyes", initial: "BR", dept: "Dev Team", hotel: "Innova Dev", role: "Frontend Dev", deptCol: "bg-blue-500/10 text-blue-400" },
                { name: "Maria Villanueva", initial: "MV", dept: "Housekeeping", hotel: "Obsidian Sanctuary", role: "Team Lead", deptCol: "bg-cyan-500/10 text-cyan-400" },
                { name: "Collyn Fernandez", initial: "CF", dept: "Front Desk", hotel: "Obsidian Sanctuary", role: "Supervisor", deptCol: "bg-blue-600/10 text-blue-500" },
              ].map((staff, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] font-black text-[9px] border border-[#c9a84c]/30">
                        {staff.initial}
                      </div>
                      <span className={`text-[11px] font-black uppercase ${textMain}`}>{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${staff.deptCol} border border-white/5`}>
                      {staff.dept}
                    </span>
                  </td>
                  <td className={`px-8 py-5 text-[10px] font-bold ${textSub} uppercase tracking-tight`}>{staff.hotel}</td>
                  <td className={`px-8 py-5 text-[10px] font-bold ${textSub}`}>{staff.role}</td>
                  <td className="px-8 py-5">
                    <span className="text-[8px] font-black text-green-500 uppercase bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">Active</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className={`p-1.5 rounded-lg border ${borderStyle} text-gray-500 hover:text-[#c9a84c] transition-all`}><Edit2 size={13}/></button>
                      <button className={`p-1.5 rounded-lg border ${borderStyle} text-gray-500 hover:text-red-500 transition-all`}><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Staff;