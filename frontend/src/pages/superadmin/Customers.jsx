import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Users, UserCheck, Star, 
  Search, Plus, Download, 
  MoreHorizontal, Mail, Phone,
  ChevronDown, Award
} from 'lucide-react';

const Customers = () => {
  const { isDarkMode } = useOutletContext();

  // THEME LOGIC - Consistent with MapServices & SystemLogs
  const theme = {
    bg: isDarkMode ? "bg-[#0c0c0e]" : "bg-[#f0f0f3]",
    card: isDarkMode ? "bg-[#111111]/80 backdrop-blur-md" : "bg-white",
    textMain: isDarkMode ? "text-white" : "text-gray-900",
    textSub: isDarkMode ? "text-gray-500" : "text-gray-400",
    border: isDarkMode ? "border-white/10" : "border-gray-300", // Visible thin border
    inputBg: isDarkMode ? "bg-white/5" : "bg-gray-50",
    shadow: isDarkMode ? "shadow-2xl shadow-black/40" : "shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
  };

  return (
    <div className={`p-6 space-y-8 min-h-screen transition-all duration-500 ${theme.bg}`}>
      
      {/* 1. HEADER SECTION - Matched UI */}
      <div className={`flex flex-col md:flex-row justify-between items-end border-b pb-5 ${theme.border}`}>
        <div>
          <h1 className={`text-2xl font-black uppercase tracking-tighter ${theme.textMain}`}>
            Customer <span className="text-[#c9a84c]">Management</span>
          </h1>
          <p className={`text-[9px] font-bold ${theme.textSub} uppercase tracking-widest mt-1`}>
            Manage guest profiles and loyalty program memberships
          </p>
        </div>
        <div className="flex gap-3">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${theme.border} ${theme.card} text-[10px] font-bold uppercase ${theme.textMain} hover:border-[#c9a84c] transition-all`}>
            <Download size={14} /> Export
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#c9a84c] text-black font-black text-[10px] uppercase shadow-lg shadow-[#c9a84c]/20 hover:scale-105 transition-all">
            <Plus size={16} strokeWidth={3} /> Add New Guest
          </button>
        </div>
      </div>

      {/* 2. KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Guests", value: "1,240", change: "+12% Growth", icon: <Users size={20}/> },
          { label: "Suki Members", value: "482", change: "Active loyalty", icon: <Award size={20}/>, color: "text-[#c9a84c]" },
          { label: "Retention", value: "65%", change: "Returning guests", icon: <UserCheck size={20}/>, color: "text-green-500" },
        ].map((kpi, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} relative overflow-hidden group transition-all`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} border ${theme.border} text-[#c9a84c]`}>
                {kpi.icon}
              </div>
            </div>
            <p className={`text-[9px] font-black uppercase tracking-widest ${theme.textSub} mb-1`}>{kpi.label}</p>
            <h2 className={`text-3xl font-black tracking-tighter ${theme.textMain}`}>{kpi.value}</h2>
            <p className={`text-[10px] font-bold uppercase mt-2 ${kpi.color || 'text-green-500'}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* 3. GUEST REGISTRY TABLE */}
      <div className={`rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} overflow-hidden`}>
        <div className={`p-5 border-b ${theme.border} flex flex-col md:flex-row justify-between items-center gap-4 ${isDarkMode ? 'bg-white/[0.01]' : 'bg-gray-50/50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>Guest Profiles</h3>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${theme.border} ${theme.inputBg} flex-1 md:w-64`}>
              <Search size={14} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className={`bg-transparent border-none outline-none text-[10px] font-bold uppercase w-full ${theme.textMain} placeholder:text-gray-500`} 
              />
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-[9px] font-black uppercase ${theme.textSub} cursor-pointer hover:border-[#c9a84c] transition-all`}>
              Sort By <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'} border-b ${theme.border}`}>
              <tr>
                {["Guest Name", "Contact", "Membership", "Visits", "Last Stay", ""].map((h) => (
                  <th key={h} className={`px-8 py-4 text-[9px] font-black uppercase tracking-widest ${theme.textSub}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${theme.border}`}>
              {[
                { name: "Juan Dela Cruz", email: "juan.dc@email.com", phone: "+63 912 345 6789", member: "Suki Elite", visits: "12", date: "Mar 14, 2026", memCol: "bg-[#c9a84c]/10 text-[#c9a84c]" },
                { name: "Maria Santos", email: "maria.s@email.com", phone: "+63 998 765 4321", member: "Suki Regular", visits: "5", date: "Mar 12, 2026", memCol: "bg-blue-500/10 text-blue-400" },
                { name: "Alex Mendoza", email: "alex.admin@innova.com", phone: "+63 915 000 1111", member: "Suki Platinum", visits: "28", date: "Mar 10, 2026", memCol: "bg-purple-500/10 text-purple-400" },
                { name: "Dana Torres", email: "dana.t@email.com", phone: "+63 922 333 4444", member: "Standard", visits: "1", date: "Feb 20, 2026", memCol: "bg-gray-500/10 text-gray-500" },
              ].map((guest, i) => (
                <tr key={i} className="hover:bg-[#c9a84c]/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} flex items-center justify-center text-[#c9a84c] font-black text-[10px] border ${theme.border}`}>
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className={`text-[11px] font-black uppercase ${theme.textMain}`}>{guest.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <div className={`flex items-center gap-2 text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-bold uppercase`}>
                        <Mail size={10} className="text-[#c9a84c]" /> {guest.email}
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] ${theme.textSub} font-bold`}>
                        <Phone size={10} /> {guest.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${guest.memCol} border ${isDarkMode ? 'border-white/5' : 'border-current/20'}`}>
                      {guest.member}
                    </span>
                  </td>
                  <td className={`px-8 py-5 text-[11px] font-black ${theme.textMain}`}>{guest.visits}</td>
                  <td className={`px-8 py-5 text-[10px] font-bold ${theme.textSub} uppercase`}>{guest.date}</td>
                  <td className="px-8 py-5">
                    <button className={`p-2 rounded-lg border ${theme.border} ${theme.textSub} hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all`}>
                      <MoreHorizontal size={16} />
                    </button>
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

export default Customers;