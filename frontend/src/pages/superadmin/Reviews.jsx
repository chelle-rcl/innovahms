import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Star, User, Building, ShieldCheck, 
  ChevronDown, ChevronUp, MessageSquare, 
  Calendar, Award, HardHat, TrendingUp
} from 'lucide-react';

const Reviews = () => {
  const { isDarkMode } = useOutletContext();
  const [activeTab, setActiveTab] = useState('guest');
  const [expandedId, setExpandedId] = useState(null);

  // THEME LOGIC - Consistent High-Contrast UI
  const theme = {
    bg: isDarkMode ? "bg-[#0c0c0e]" : "bg-[#f0f0f3]",
    card: isDarkMode ? "bg-[#111111]/80 backdrop-blur-md" : "bg-white",
    textMain: isDarkMode ? "text-white" : "text-gray-900",
    textSub: isDarkMode ? "text-gray-500" : "text-gray-400",
    border: isDarkMode ? "border-white/10" : "border-gray-300",
    shadow: isDarkMode ? "shadow-2xl shadow-black/40" : "shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
  };

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className={`p-6 space-y-8 min-h-screen transition-all duration-500 ${theme.bg}`}>
      
      {/* 1. HEADER & TAB SWITCHER */}
      <div className={`flex flex-col md:flex-row justify-between items-end border-b pb-5 ${theme.border}`}>
        <div className="text-left">
          <h1 className={`text-2xl font-black uppercase tracking-tighter ${theme.textMain}`}>
            System <span className="text-[#c9a84c]">Reviews</span>
          </h1>
          <p className={`text-[9px] font-bold ${theme.textSub} uppercase tracking-widest mt-1`}>
            Comprehensive Feedback & Performance Logs
          </p>
        </div>

        <div className={`flex p-1 rounded-xl border ${theme.border} ${isDarkMode ? 'bg-white/5' : 'bg-gray-200/50'} mt-4 md:mt-0`}>
          {['guest', 'owner', 'staff'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all duration-300 ${activeTab === tab ? 'bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/20' : `text-gray-500 hover:${theme.textMain}`}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2. CONTENT AREA */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* GUEST REVIEWS */}
        {activeTab === 'guest' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, user: "Juan Dela Cruz", rating: 5, date: "Mar 14, 2026", comment: "Excellent service! Check-in was very smooth and the AI assistant was helpful.", hotel: "Innova Grand" },
              { id: 2, user: "Maria Santos", rating: 4, date: "Mar 12, 2026", comment: "The UI looks premium and futuristic. Very intuitive for guests.", hotel: "Innova Boutique" },
              { id: 3, user: "Alex Mendoza", rating: 5, date: "Mar 10, 2026", comment: "Seamless experience. Best hotel management system in the city.", hotel: "Innova Plaza" }
            ].map((rev) => (
              <div key={rev.id} className={`p-6 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} hover:border-[#c9a84c]/50 transition-all group`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl border ${theme.border} ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} flex items-center justify-center text-[#c9a84c]`}>
                      <User size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className={`text-[12px] font-black uppercase ${theme.textMain}`}>{rev.user}</h4>
                      <p className="text-[9px] text-[#c9a84c] font-black uppercase tracking-widest">{rev.hotel}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < rev.rating ? "#c9a84c" : "transparent"} className={i < rev.rating ? "text-[#c9a84c]" : "text-gray-300"} />)}
                    </div>
                    <span className={`text-[8px] font-black ${theme.textSub} uppercase`}>{rev.date}</span>
                  </div>
                </div>
                <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium italic`}>"{rev.comment}"</p>
              </div>
            ))}
          </div>
        )}

        {/* OWNER REVIEWS */}
        {activeTab === 'owner' && (
          <div className="grid grid-cols-1 gap-6">
            {[
              { id: 'o1', name: "Rochelle Morales", property: "Ocean View Resort", rating: 5, review: "Prophet forecasting is accurate. Our revenue increased by 20%.", details: "Integration with OpenStreetMap was flawless. Staff training time was reduced by 40% due to the easy UI." },
              { id: 'o2', name: "Vicente Tabacolde", property: "Metropark Hotel", rating: 5, review: "The CRM integration helps us retain loyal 'Suki' customers effectively.", details: "Real-time analytics allow us to monitor staff efficiency and room turn-around time instantly." }
            ].map((owner) => (
              <div key={owner.id} className={`rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} overflow-hidden transition-all`}>
                <button 
                  onClick={() => toggleExpand(owner.id)}
                  className="w-full p-6 flex justify-between items-center hover:bg-[#c9a84c]/5 transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-xl border ${theme.border} ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} text-[#c9a84c]`}>
                      <Building size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className={`text-sm font-black uppercase tracking-tight ${theme.textMain}`}>{owner.name}</h4>
                      <p className="text-[10px] text-[#c9a84c] font-black tracking-[0.2em] uppercase">{owner.property}</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                    {expandedId === owner.id ? <ChevronUp size={20} className="text-[#c9a84c]" /> : <ChevronDown size={20} className="text-gray-500" />}
                  </div>
                </button>
                {expandedId === owner.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      <div className="md:col-span-2">
                         <h5 className="text-[9px] font-black uppercase text-[#c9a84c] mb-3 tracking-widest">Executive Summary</h5>
                         <p className={`text-[12px] italic ${theme.textMain} mb-4 leading-relaxed`}>"{owner.review}"</p>
                         <p className={`text-[11px] ${theme.textSub} leading-relaxed`}>{owner.details}</p>
                      </div>
                      <div className={`p-5 rounded-2xl border ${theme.border} ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'} flex flex-col justify-center items-center text-center`}>
                        <span className={`text-[9px] font-black uppercase ${theme.textSub} mb-2`}>Partner Satisfaction</span>
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#c9a84c" className="text-[#c9a84c]" />)}
                        </div>
                        <div className="text-[10px] font-black text-green-500 uppercase px-3 py-1 bg-green-500/10 rounded-full">Elite Partner</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* STAFF PERFORMANCE */}
        {activeTab === 'staff' && (
          <div className="space-y-4">
            {[
              { name: "Abby Conda", role: "Manager", metric: "98%", status: "Excellent", tasks: "542 Completed" },
              { name: "Justine Dayang", role: "Front Desk", metric: "92%", status: "Good", tasks: "312 Completed" },
              { name: "Collyn Fernandez", role: "Technical", metric: "100%", status: "Elite", tasks: "128 Resolved" }
            ].map((staff, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${theme.border} ${theme.card} ${theme.shadow} flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-[#c9a84c]/50 transition-all`}>
                <div className="flex items-center gap-5 w-full">
                  <div className={`p-3.5 rounded-2xl border ${theme.border} ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} text-[#c9a84c] group-hover:scale-110 transition-transform`}>
                    <ShieldCheck size={24} />
                  </div>
                  <div className="text-left">
                    <h4 className={`text-[14px] font-black uppercase tracking-tight ${theme.textMain}`}>{staff.name}</h4>
                    <p className={`text-[10px] font-black ${theme.textSub} uppercase tracking-[0.15em]`}>{staff.role}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-8 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                  <div className="text-center md:text-left">
                    <p className={`text-[8px] font-black ${theme.textSub} uppercase tracking-widest mb-1`}>Efficiency</p>
                    <p className="text-[14px] font-black text-[#c9a84c]">{staff.metric}</p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className={`text-[8px] font-black ${theme.textSub} uppercase tracking-widest mb-1`}>Ops Log</p>
                    <p className={`text-[12px] font-black ${theme.textMain} uppercase`}>{staff.tasks}</p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className={`text-[8px] font-black ${theme.textSub} uppercase tracking-widest mb-1`}>Status</p>
                    <span className="text-[10px] font-black text-green-500 uppercase px-2 py-1 bg-green-500/10 rounded-md border border-green-500/20">{staff.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;