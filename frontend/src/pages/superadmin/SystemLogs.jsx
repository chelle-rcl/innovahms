import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  FileText, AlertTriangle, XCircle, ShieldCheck, 
  Download, Trash2, X, ChevronDown 
} from 'lucide-react';

const SystemLogs = () => {
  const { isDarkMode } = useOutletContext();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const triggerNotification = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Subtle Contrast Logic (Back to Thin Borders)
  const theme = {
    bg: isDarkMode ? "bg-[#0c0c0e]" : "bg-[#f4f4f7]", 
    card: isDarkMode ? "bg-[#111111]/80 backdrop-blur-md" : "bg-white/90 backdrop-blur-md",
    textMain: isDarkMode ? "text-white" : "text-gray-900",
    textSub: isDarkMode ? "text-gray-500" : "text-gray-400",
    border: isDarkMode ? "border-white/10" : "border-gray-200",
    // Ito yung sikreto para hindi mag-blend: subtle shadow
    shadow: isDarkMode ? "shadow-2xl shadow-black/50" : "shadow-xl shadow-gray-200/50"
  };

  const logs = [
    { id: 1, time: "2026-03-15 15:42:10", event: "Hotel Radiant Plaza account activated", actor: "Alex Mendoza", type: "success" },
    { id: 2, time: "2026-03-15 15:38:22", event: "API key rotated — PayMongo integration", actor: "System", type: "info" },
    { id: 3, time: "2026-03-15 15:22:05", event: "Invoice INV-DEV-0044 paid", actor: "Payment Gateway", type: "success" },
    { id: 4, time: "2026-03-15 14:55:30", event: "SendGrid daily limit at 80%", actor: "System Monitor", type: "warning" },
    { id: 5, time: "2026-03-15 13:55:44", event: "RASA AI service timeout", actor: "RASA Integration", type: "error" }
  ];

  return (
    <div className={`p-6 space-y-6 text-left relative min-h-screen transition-colors duration-500 ${theme.bg}`}>
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right duration-300">
          <div className={`${isDarkMode ? 'bg-[#161618]' : 'bg-white'} border ${theme.border} rounded-xl px-5 py-4 flex items-center gap-4 ${theme.shadow}`}>
            <div className="bg-[#c9a84c]/10 p-2 rounded-lg">
              <FileText size={18} className="text-[#c9a84c]" />
            </div>
            <p className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} pr-8`}>{toastMsg}</p>
            <button onClick={() => setShowToast(false)} className="text-gray-500 hover:text-[#c9a84c]">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* HEADER SECTION (Matched with MapServices) */}
      <div className={`flex justify-between items-end border-b pb-5 ${theme.border}`}>
        <div>
          <h1 className={`text-2xl font-black uppercase tracking-tighter ${theme.textMain}`}>
            System <span className="text-[#c9a84c]">Logs</span>
          </h1>
          <p className={`text-[9px] font-bold ${theme.textSub} uppercase tracking-widest mt-1`}>
            All platform events, security activity, and errors
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => triggerNotification("Logs exported.")}
            className={`flex items-center gap-2 px-4 py-2 bg-transparent border ${theme.border} rounded-lg text-[10px] font-black uppercase ${theme.textSub} hover:text-[#c9a84c] transition-all`}
          >
            <Download size={14} /> Export
          </button>
          <button 
            onClick={() => triggerNotification("Logs cleared.")}
            className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] rounded-lg text-[10px] font-black uppercase text-black hover:scale-105 transition-all shadow-lg shadow-[#c9a84c]/20"
          >
            <Trash2 size={14} /> Clear Old
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Today", val: "2,841" },
          { label: "Warnings", val: "18" },
          { label: "Errors", val: "3" },
          { label: "Auth Events", val: "512" }
        ].map((s, i) => (
          <div key={i} className={`p-6 rounded-2xl ${theme.card} border ${theme.border} ${theme.shadow} group hover:border-[#c9a84c]/30 transition-all`}>
            <p className={`text-[9px] font-black uppercase ${theme.textSub} tracking-widest`}>{s.label}</p>
            <h2 className={`text-3xl font-black mt-2 ${theme.textMain} tabular-nums`}>{s.val}</h2>
          </div>
        ))}
      </div>

      {/* LOGS TABLE */}
      <div className={`${theme.card} rounded-2xl border ${theme.border} ${theme.shadow} overflow-hidden`}>
        <div className={`p-4 border-b ${theme.border} flex justify-between items-center ${isDarkMode ? 'bg-white/[0.01]' : 'bg-gray-50/50'}`}>
          <div className="flex items-center gap-2 px-2">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>Activity Log</span>
          </div>
          <div className="flex gap-2">
            <select className={`${isDarkMode ? 'bg-[#0c0c0e]' : 'bg-white'} border ${theme.border} rounded-lg px-4 py-1.5 text-[10px] font-bold ${theme.textSub} outline-none focus:border-[#c9a84c]`}>
              <option>All Types</option>
            </select>
            <select className={`${isDarkMode ? 'bg-[#0c0c0e]' : 'bg-white'} border ${theme.border} rounded-lg px-4 py-1.5 text-[10px] font-bold ${theme.textSub} outline-none focus:border-[#c9a84c]`}>
              <option>All Hotels</option>
            </select>
          </div>
        </div>

        <div className={`divide-y ${isDarkMode ? 'divide-white/[0.03]' : 'divide-gray-100'}`}>
          {logs.map((log) => (
            <div key={log.id} className="flex items-center gap-6 px-6 py-4 hover:bg-[#c9a84c]/5 transition-colors group">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                log.type === 'success' ? 'bg-green-500' : 
                log.type === 'warning' ? 'bg-orange-500' : 'bg-red-500'
              }`} />
              <span className={`text-[10px] font-bold ${theme.textSub} w-32 tabular-nums`}>{log.time}</span>
              <p className={`flex-1 text-[11px] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} group-hover:text-[#c9a84c] transition-colors`}>
                {log.event} — <span className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'} text-[9px] uppercase`}>{log.actor}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;