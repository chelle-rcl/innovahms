import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Building2, CheckSquare, CreditCard, 
  Banknote, Search, Download, Plus,
  Eye, Edit2, Ban, ChevronDown
} from 'lucide-react';

const HotelOwners = () => {
  const { isDarkMode } = useOutletContext();

  // THEME LOGIC - Consistent with MapServices & Customers
  const theme = {
    bg: isDarkMode ? "bg-[#0c0c0e]" : "bg-[#f0f0f3]",
    card: isDarkMode ? "bg-[#111111]/80 backdrop-blur-md" : "bg-white",
    textMain: isDarkMode ? "text-white" : "text-gray-900",
    textSub: isDarkMode ? "text-gray-500" : "text-gray-400",
    border: isDarkMode ? "border-white/10" : "border-gray-300",
    inputBg: isDarkMode ? "bg-white/5" : "bg-gray-50",
    shadow: isDarkMode ? "shadow-2xl shadow-black/40" : "shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
  };

  return (
    <div className={`p-6 space-y-8 min-h-screen transition-all duration-500 ${theme.bg}`}>
      
      {/* 1. HEADER SECTION - Matched UI */}
      <div className={`flex flex-col md:flex-row justify-between items-end border-b pb-5 ${theme.border}`}>
        <div>
          <h1 className={`text-2xl font-black uppercase tracking-tighter ${theme.textMain}`}>
            Hotel <span className="text-[#c9a84c]">Owners</span>
          </h1>
          <p className={`text-[9px] font-bold ${theme.textSub} uppercase tracking-widest mt-1`}>
            Manage all partner hotel accounts and memberships
          </p>
        </div>
        <div className="flex gap-3">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${theme.border} ${theme.card} text-[10px] font-bold uppercase ${theme.textMain} hover:border-[#c9a84c] transition-all`}>
            <Download size={14} /> Export
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#c9a84c] text-black font-black text-[10px] uppercase shadow-lg shadow-[#c9a84c]/20 hover:scale-105 transition-all">
            <Plus size={16} strokeWidth={3} /> Add Owner
          </button>
        </div>
      </div>

      {/* 2. KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Partners", value: "4", change: "+1 New", icon: <Building2 size={20}/> },
          { label: "Active Nodes", value: "4", change: "100% Online", icon: <CheckSquare size={20}/>, color: "text-green-500" },
          { label: "Revenue Plan", value: "Pro", change: "Enterprise Base", icon: <CreditCard size={20}/> },
          { label: "Monthly MRR", value: "₱128k", change: "+18% Growth", icon: <Banknote size={20}/>, color: "text-[#c9a84c]" },
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

      {/* 3. PARTNERS TABLE */}
      <div className={`rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} overflow-hidden`}>
        <div className={`p-5 border-b ${theme.border} flex flex-col md:flex-row justify-between items-center gap-4 ${isDarkMode ? 'bg-white/[0.01]' : 'bg-gray-50/50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>Partner Registry</h3>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${theme.border} ${theme.inputBg} flex-1 md:w-64`}>
              <Search size={14} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search hotel..." 
                className={`bg-transparent border-none outline-none text-[10px] font-bold uppercase w-full ${theme.textMain} placeholder:text-gray-500`} 
              />
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-[9px] font-black uppercase ${theme.textSub} cursor-pointer hover:border-[#c9a84c] transition-all`}>
              All Plans <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'} border-b ${theme.border}`}>
              <tr>
                {["Hotel Info", "Owner", "Plan", "Rev", "API Usage", "Status", ""].map((h) => (
                  <th key={h} className={`px-8 py-4 text-[9px] font-black uppercase tracking-widest ${theme.textSub}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${theme.border}`}>
              {[
                { name: "Obsidian Sanctuary", loc: "Metropolis Hub, Manila", owner: "Ricardo Santos", plan: "Enterprise", planCol: "text-purple-400 bg-purple-400/10", rev: "₱50,000", api: "84.2%" },
                { name: "Horizon Vista Hotel", loc: "Skyline District, BGC", owner: "Karen dela Peña", plan: "Pro", planCol: "text-[#c9a84c] bg-[#c9a84c]/10", rev: "₱25,000", api: "71.8%" },
                { name: "Kinetic Royal Resort", loc: "Coastal Sector, Pasay", owner: "Bong Navarro", plan: "Enterprise", planCol: "text-purple-400 bg-purple-400/10", rev: "₱50,000", api: "91.4%" },
                { name: "Radiant Plaza", loc: "Central Node, Makati", owner: "Maricar Lim", plan: "Starter", planCol: "text-blue-400 bg-blue-400/10", rev: "₱8,000", api: "42.0%" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#c9a84c]/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} flex items-center justify-center text-[#c9a84c] font-black text-[10px] border ${theme.border}`}>
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className={`text-[11px] font-black uppercase ${theme.textMain}`}>{row.name}</h4>
                        <p className={`text-[9px] ${theme.textSub} font-medium uppercase tracking-tighter`}>{row.loc}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-8 py-5 text-[10px] font-bold ${theme.textMain}`}>{row.owner}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${row.planCol} border ${isDarkMode ? 'border-white/5' : 'border-current/20'}`}>
                      {row.plan}
                    </span>
                  </td>
                  <td className={`px-8 py-5 text-[11px] font-black ${theme.textMain}`}>{row.rev}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3 w-24">
                      <div className={`h-1 w-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                        <div className="h-full bg-[#c9a84c]" style={{ width: row.api }}></div>
                      </div>
                      <span className="text-[9px] font-black text-gray-500">{row.api}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[9px] font-black text-green-500 uppercase bg-green-500/10 px-2 py-1 rounded border border-green-500/20">Active</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex gap-2">
                      <button className={`p-2 rounded-lg border ${theme.border} ${theme.textSub} hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all`}>
                        <Eye size={14} />
                      </button>
                      <button className={`p-2 rounded-lg border ${theme.border} ${theme.textSub} hover:text-red-500 hover:border-red-500 transition-all`}>
                        <Ban size={14} />
                      </button>
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

export default HotelOwners;