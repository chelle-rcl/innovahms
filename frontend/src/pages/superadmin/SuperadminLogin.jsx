import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuperadminLogin = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback('');
    
    try {
      const response = await fetch('/api/superadmin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store the session
        localStorage.setItem('userRole', 'superadmin');
        localStorage.setItem('adminName', data.user.name);
        
        // Brief delay for the "Establishing Bridge" animation feel
        setTimeout(() => {
          navigate('/superadmin');
        }, 1500);
      } else {
        setFeedback(data.error || "Invalid credentials.");
        setIsSubmitting(false);
      }
    } catch (err) {
      setFeedback("Connection failed. Check if backend is running.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans selection:bg-[#bf9b30]/30 bg-[#fcfcfc]">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-[#bf9b30]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      {/* Left Side: Semi-Transparent Executive Panel */}
      <div className={`hidden md:flex w-[35%] lg:w-[30%] bg-[#1a1c1e]/95 backdrop-blur-xl p-10 lg:p-14 flex-col justify-between relative border-r border-white/5 transition-transform duration-1000 z-20 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        
        <div className="relative z-10">
          <div className="mb-16">
            <img 
              src="/images/logo.png" 
              alt="Innova-HMS Logo" 
              className="h-14 w-auto object-contain drop-shadow-[0_4px_10px_rgba(191,155,48,0.3)]"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
               <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Executive Insight</h3>
               <div className="h-[1px] w-12 bg-[#bf9b30]/50" />
            </div>
            
            <div className="space-y-4">
              {[
                { label: "Global Occupancy", status: "78%", color: "bg-green-400" },
                { label: "Active Properties", status: "12 Hotels", color: "bg-[#bf9b30]" },
                { label: "Revenue Growth", status: "+12% YoY", color: "bg-blue-400" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex items-center justify-between group transition-all hover:bg-white/5">
                  <span className="text-xs font-medium text-gray-300">{item.label}</span>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.color} animate-pulse`} />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-[10px] text-gray-500 leading-relaxed font-medium uppercase tracking-wide">
              Node: <span className="text-gray-300">Caloocan HQ</span><br/>
              Environment: <span className="text-[#bf9b30]">Stable Production</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className={`flex-1 flex flex-col justify-center relative transition-opacity duration-1000 z-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-md mx-auto w-full px-10 md:px-0">
          <div className="mb-10 text-center md:text-left">
            <span className="text-[10px] font-black text-[#bf9b30] uppercase tracking-[0.4em] mb-4 block">Access Portal</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Superadmin Login</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Secure gateway for Innova Global Administrators.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focused === 'email' ? 'text-[#bf9b30]' : 'text-gray-500'}`}>
                Superadmin Email
              </label>
              <div className={`flex items-center gap-4 px-5 bg-white border-2 rounded-2xl transition-all duration-300 ${focused === 'email' ? 'border-[#bf9b30] shadow-2xl shadow-[#bf9b30]/10' : 'border-gray-200'}`}>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <input 
                  type="email" 
                  required
                  placeholder="superadmin@innova-hms.com"
                  className="w-full py-5 bg-transparent outline-none text-sm font-semibold text-gray-700 placeholder:text-gray-300"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focused === 'pass' ? 'text-[#bf9b30]' : 'text-gray-500'}`}>
                Security Key
              </label>
              <div className={`flex items-center gap-4 px-5 bg-white border-2 rounded-2xl transition-all duration-300 ${focused === 'pass' ? 'border-[#bf9b30] shadow-2xl shadow-[#bf9b30]/10' : 'border-gray-200'}`}>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full py-5 bg-transparent outline-none text-sm font-semibold text-gray-700 placeholder:text-gray-300"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  onFocus={() => setFocused('pass')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            {feedback && (
              <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-wider animate-shake pt-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {feedback}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-[#1a1c1e] hover:bg-[#bf9b30] text-white font-bold rounded-2xl transition-all duration-500 shadow-xl shadow-gray-200 active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-3 group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span className="uppercase text-xs tracking-widest">Establishing Bridge...</span>
                </>
              ) : (
                <span className="uppercase text-xs tracking-[0.25em]">Authorize Access</span>
              )}
            </button>
          </form>

          <div className="mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
             <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
               Innova Tech Solutions
             </p>
             <div className="flex gap-4">
                <span className="w-2 h-2 rounded-full bg-gray-100" />
                <span className="w-2 h-2 rounded-full bg-gray-100" />
                <span className="w-2 h-2 rounded-full bg-[#bf9b30] animate-pulse" />
             </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 2; }
      `}} />
    </div>
  );
};

export default SuperadminLogin;