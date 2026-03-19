import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, Users, DollarSign, 
  ArrowUpRight, ArrowDownRight, Download, 
  Building2, Zap, Star
} from 'lucide-react';

const Analytics = () => {
  const { isDarkMode } = useOutletContext();

  // THEME LOGIC - Consistent with Dashboard & HotelOwners
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
            Reports & <span className="text-[#c9a84c]">Analytics</span>
          </h1>
          <p className={`text-[9px] font-bold ${theme.textSub} uppercase tracking-widest mt-1`}>
            Real-time platform performance and financial trajectory
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#c9a84c] text-black font-black text-[10px] uppercase shadow-lg shadow-[#c9a84c]/20 hover:scale-105 transition-all">
          <Download size={16} strokeWidth={3} /> Export System Audit
        </button>
      </div>

      {/* 2. KPI CARDS - High Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Hotel Partners", value: "4", change: "+33%", up: true, icon: <Building2 size={20}/> },
          { label: "Platform Revenue", value: "₱128k", change: "+18%", up: true, icon: <DollarSign size={20}/> },
          { label: "API Calls (Today)", value: "84k", change: "+6%", up: true, icon: <Zap size={20}/> },
          { label: "Avg Hotel Rating", value: "4.7", change: "STABLE", up: true, icon: <Star size={20}/> },
        ].map((kpi, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} group transition-all`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-2.5 rounded-xl border ${theme.border} ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} text-[#c9a84c]`}>
                {kpi.icon}
              </div>
              <div className={`text-[9px] font-black px-2 py-1 rounded-md tracking-widest ${kpi.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {kpi.change}
              </div>
            </div>
            <p className={`text-[9px] font-black uppercase tracking-widest ${theme.textSub} mb-1`}>{kpi.label}</p>
            <h2 className={`text-3xl font-black tracking-tighter ${theme.textMain}`}>{kpi.value}</h2>
          </div>
        ))}
      </div>

      {/* 3. ANALYTICS CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* REVENUE TRAJECTORY CHART */}
        <div className={`lg:col-span-2 p-7 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow}`}>
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>Revenue Trajectory</h3>
            </div>
            <span className={`text-[9px] font-bold ${theme.textSub} uppercase`}>Oct 2025 - Mar 2026</span>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[40, 50, 55, 62, 65, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer">
                <div 
                  className={`w-full max-w-[45px] rounded-t-lg transition-all relative ${isDarkMode ? 'bg-[#c9a84c]/60 group-hover:bg-[#c9a84c]' : 'bg-[#c9a84c]'}`} 
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-black">
                    {h}%
                  </div>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${theme.textSub}`}>
                  {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* INFRASTRUCTURE MONITORING */}
        <div className="space-y-6">
          <div className={`p-7 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow}`}>
            <div className="flex items-center gap-3 mb-8">
              <Zap size={18} className="text-[#c9a84c]" />
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>API Infrastructure</h3>
            </div>
            <div className="space-y-6">
              {[
                { name: "PayMongo Gateway", calls: "24k", w: "95%" },
                { name: "SendGrid Mailing", calls: "18k", w: "70%" },
                { name: "Twilio Service", calls: "8k", w: "35%" },
              ].map((api, i) => (
                <div key={i} className="space-y-2.5">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                    <span className={theme.textSub}>{api.name}</span>
                    <span className="text-[#c9a84c]">{api.calls}</span>
                  </div>
                  <div className={`h-1.5 w-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-[#c9a84c] rounded-full shadow-[0_0_10px_rgba(201,168,76,0.3)]" style={{ width: api.w }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INSIGHT CARD */}
          <div className={`p-6 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} border-l-4 border-l-[#c9a84c]`}>
             <h3 className={`text-[9px] font-black uppercase tracking-widest mb-3 ${theme.textSub}`}>Partner Insights</h3>
             <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-[#c9a84c] tracking-tighter">75%</div>
                <div className={`text-[10px] font-bold leading-tight uppercase tracking-tight ${theme.textMain}`}>
                  Enterprise Tier adoption among active partners.
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;