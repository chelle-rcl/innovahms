import React, { useState } from 'react';

const Profile = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    contactNumber: "+63 912 345 6789"
  });

  const triggerUpdate = (message) => {
    setToastMsg(message);
    setShowToast(true);
    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex-grow bg-slate-50 font-sans pb-20 relative overflow-hidden">
      
      {/* Toast Notification */}
      <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${
        showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}>
        <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl border border-innova-gold/50 flex items-center gap-3">
          <div className="bg-innova-gold rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <span className="text-sm font-medium tracking-wide">{toastMsg}</span>
        </div>
      </div>

      <div className="bg-innova-gold h-48 w-full absolute top-0 z-0"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-10">
        
        {/* Top Hero Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-slate-100">
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-innova-gold/10 rounded-full flex items-center justify-center border-2 border-innova-gold">
              <span className="text-3xl font-bold text-innova-gold">
                {userInfo.firstName[0]}{userInfo.lastName[0]}
              </span>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-slate-800">
                {userInfo.firstName} {userInfo.lastName}
              </h1>
              <p className="text-slate-500 font-medium">{userInfo.email}</p>
              <div className="mt-2 inline-block px-3 py-1 bg-innova-gold/10 text-innova-gold text-xs font-bold rounded-full uppercase tracking-widest">
                Gold Member
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bf9b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
             </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Personal Info</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">First Name</label>
                <input type="text" defaultValue={userInfo.firstName} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-innova-gold focus:border-innova-gold outline-none transition-all text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Last Name</label>
                <input type="text" defaultValue={userInfo.lastName} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-innova-gold focus:border-innova-gold outline-none transition-all text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Contact Number</label>
                <input type="text" defaultValue={userInfo.contactNumber} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-innova-gold focus:border-innova-gold outline-none transition-all text-sm" />
              </div>
              <button 
                onClick={() => triggerUpdate("Profile information updated!")}
                className="w-full mt-4 bg-innova-gold text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all text-sm uppercase tracking-widest"
              >
                Update Info
              </button>
            </div>
          </div>

          {/* Change Password Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bf9b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Security</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-innova-gold focus:border-innova-gold outline-none transition-all text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-innova-gold focus:border-innova-gold outline-none transition-all text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-innova-gold focus:border-innova-gold outline-none transition-all text-sm" />
              </div>
              <button 
                onClick={() => triggerUpdate("Password changed successfully!")}
                className="w-full mt-4 border-2 border-innova-gold text-innova-gold font-bold py-3 rounded-lg hover:bg-innova-gold hover:text-white transition-all text-sm uppercase tracking-widest"
              >
                Change Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;