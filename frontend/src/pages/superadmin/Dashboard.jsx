import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Download, Plus, Hotel, Calendar, Banknote, Star, 
  ArrowUpRight, ChevronRight, BarChart3, PieChart 
} from 'lucide-react';

const Dashboard = () => {
  const { isDarkMode } = useOutletContext();

  const weeklyRevenue = [
    { day: "Mon", value: 100 }, { day: "Tue", value: 162 }, { day: "Wed", value: 120 },
    { day: "Thu", value: 140 }, { day: "Fri", value: 180 }, { day: "Sat", value: 210 },
    { day: "Sun", value: 150 },
  ];

  const roomStatus = [
    { label: "Available", count: 42, color: "bg-green-500", text: "text-green-500", total: 80 },
    { label: "Occupied", count: 31, color: "bg-red-500", text: "text-red-500", total: 80 },
    { label: "Cleaning", count: 5, color: "bg-orange-500", text: "text-orange-500", total: 80 },
    { label: "Maintenance", count: 2, color: "bg-purple-500", text: "text-purple-500", total: 80 },
  ];

  // THEME LOGIC - Consistent High-Contrast UI
  const theme = {
    bg: isDarkMode ? "bg-[#0c0c0e]" : "bg-[#f0f0f3]",
    card: isDarkMode ? "bg-[#111111]/80 backdrop-blur-md" : "bg-white",
    textMain: isDarkMode ? "text-white" : "text-gray-900",
    textSub: isDarkMode ? "text-gray-500" : "text-gray-400",
    border: isDarkMode ? "border-white/10" : "border-gray-300",
    shadow: isDarkMode ? "shadow-2xl shadow-black/40" : "shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
  };

  return (
    <div className={`p-6 space-y-8 min-h-screen transition-all duration-500 ${theme.bg}`}>
      
      {/* 1. HEADER SECTION */}
      <div className={`flex flex-col md:flex-row justify-between items-end border-b pb-5 ${theme.border}`}>
        <div className="text-left">
          <h1 className={`text-2xl font-black uppercase tracking-tighter ${theme.textMain}`}>
            System <span className="text-[#c9a84c]">Dashboard</span>
          </h1>
          <p className={`text-[9px] font-bold ${theme.textSub} uppercase tracking-widest mt-1`}>
            Monitoring performance across all hotel properties
          </p>
        </div>
        <div className="flex gap-3">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${theme.border} ${theme.card} text-[10px] font-bold uppercase ${theme.textMain} hover:border-[#c9a84c] transition-all`}>
            <Download size={14} /> Export
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#c9a84c] text-black font-black text-[10px] uppercase shadow-lg shadow-[#c9a84c]/20 hover:scale-105 transition-all">
            <Plus size={16} strokeWidth={3} /> New Booking
          </button>
        </div>
      </div>

      {/* 2. STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Occupancy Rate", value: "78%", change: "+4.2%", icon: <Hotel size={20}/>, color: "text-green-500" },
          { label: "Check-ins Today", value: "24", change: "8 Pending", icon: <Calendar size={20}/>, color: "text-[#c9a84c]" },
          { label: "Revenue Today", value: "₱186k", change: "+12% Growth", icon: <Banknote size={20}/>, color: "text-green-500" },
          { label: "Satisfaction", value: "4.8", change: "142 reviews", icon: <Star size={20}/>, color: "text-[#c9a84c]" },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} relative overflow-hidden group transition-all`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 border ${theme.border} ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} text-[#c9a84c]`}>
              {stat.icon}
            </div>
            <p className={`text-[9px] font-black uppercase tracking-widest ${theme.textSub} mb-1`}>{stat.label}</p>
            <h2 className={`text-3xl font-black tracking-tighter ${theme.textMain}`}>{stat.value}</h2>
            <p className={`text-[10px] font-bold uppercase mt-2 flex items-center gap-1 ${stat.color}`}>
              <ArrowUpRight size={12} strokeWidth={3} /> {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* 3. GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Revenue Bar Chart */}
        <div className={`lg:col-span-2 p-7 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow}`}>
          <div className="flex items-center gap-3 mb-10 text-left">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>Weekly Revenue Analysis</h3>
          </div>
          <div className="flex items-end justify-between h-56 gap-3 px-2">
            {weeklyRevenue.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer">
                <div 
                  style={{ height: `${(data.value / 210) * 100}%` }} 
                  className={`w-full max-w-[40px] rounded-t-md transition-all relative ${isDarkMode ? 'bg-[#c9a84c]/60 group-hover:bg-[#c9a84c]' : 'bg-[#c9a84c]'}`}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase">
                    ₱{data.value}k
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${theme.textSub}`}>{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Room Status Progress */}
        <div className={`p-7 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow}`}>
          <div className="flex items-center gap-3 mb-10 text-left">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>Inventory Status</h3>
          </div>
          <div className="space-y-6">
            {roomStatus.map((status, i) => (
              <div key={i} className="text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${theme.textSub}`}>{status.label}</span>
                  <span className={`text-[11px] font-black ${status.text}`}>{status.count}</span>
                </div>
                <div className={`w-full h-1.5 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <div style={{ width: `${(status.count / status.total) * 100}%` }} className={`h-full rounded-full ${status.color} shadow-sm transition-all duration-1000`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY & ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} overflow-hidden`}>
          <div className={`px-6 py-5 border-b ${theme.border} flex justify-between items-center ${isDarkMode ? 'bg-white/[0.01]' : 'bg-gray-50/50'}`}>
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>Recent Transactions</h3>
            <span className={`text-[9px] font-black uppercase text-[#c9a84c]`}>Live Stream</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={`text-[9px] font-black uppercase tracking-widest ${theme.textSub} border-b ${theme.border}`}>
                  <th className="px-8 py-4">Guest</th>
                  <th className="px-8 py-4">Property</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme.border}`}>
                {[
                  { name: "Ana Reyes", hotel: "Innova Grand", status: "Confirmed", color: "text-green-500 bg-green-500/10" },
                  { name: "Maria Santos", hotel: "Innova Boutique", status: "Pending", color: "text-[#c9a84c] bg-[#c9a84c]/10" },
                  { name: "Jose Dela Cruz", hotel: "Innova Grand", status: "Upcoming", color: "text-blue-500 bg-blue-500/10" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#c9a84c]/5 transition-colors group">
                    <td className={`px-8 py-5 text-[11px] font-black ${theme.textMain}`}>{row.name}</td>
                    <td className="px-8 py-5">
                       <span className={`text-[10px] font-black uppercase text-[#c9a84c]`}>{row.hotel}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${row.color} border border-current/10`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ALERTS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2 text-left">
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>System Logs</h3>
          </div>
          {[
            { text: "Grand: Room 308 AC repair", dot: "bg-red-500 shadow-red-500/50" },
            { text: "Boutique: Low Stock (Linen)", dot: "bg-orange-500 shadow-orange-500/50" },
            { text: "Plaza: 14 check-outs today", dot: "bg-green-500 shadow-green-500/50" },
          ].map((alert, i) => (
            <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} hover:translate-x-1 transition-all cursor-pointer group`}>
              <div className="flex items-center gap-4 text-left overflow-hidden">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${alert.dot} shadow-[0_0_8px_rgba(0,0,0,0.2)]`} />
                <p className={`text-[10px] font-black uppercase tracking-tight truncate ${theme.textMain}`}>{alert.text}</p>
              </div>
              <ChevronRight size={14} className={`${theme.textSub} group-hover:text-[#c9a84c]`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;