import React, { useState } from 'react';

const Booking = () => {
  // State to handle multiple rooms as requested
  const [rooms, setRooms] = useState([{ id: 1, type: 'Standard Suite', guests: 1 }]);

  const addRoom = () => {
    setRooms([...rooms, { id: rooms.length + 1, type: 'Standard Suite', guests: 1 }]);
  };

  const removeRoom = (id) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

const [selectedPriorities, setSelectedPriorities] = useState([]);

const togglePriority = (pref) => {
  if (selectedPriorities.includes(pref)) {
    setSelectedPriorities(selectedPriorities.filter(p => p !== pref));
  } else {
    setSelectedPriorities([...selectedPriorities, pref]);
  }
};

  return (
    <div className="flex-grow bg-innova-white font-sans text-slate-800">
        {/*Hero Heading*/}
        <div className="bg-innova-gold py-16 px-6 text-center shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-innova-white uppercase tracking-[0.2em] mb-3">
            Reservations
            </h1>
            <p className="text-innova-white/90 italic text-lg font-light">
            Smart Room Assignment for a Personalized Experience
            </p>
        </div>

      <div className="max-w-4xl mx-auto p-6 -mt-10">
        <div className="bg-innova-white shadow-2xl rounded-xl border border-slate-100 overflow-hidden">
          <div className="p-8">
            
            {/* 1. Dates Section */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <span className="bg-innova-gold text-innova-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</span>
                <h2 className="text-xl font-bold uppercase tracking-wider text-innova-gold">Stay Duration</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2">Check-In</label>
                  <input type="date" className="w-full border-b-2 border-slate-200 focus:border-innova-gold outline-none py-2 transition-colors bg-transparent" />
                </div>
                <div className="relative">
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2">Check-Out</label>
                  <input type="date" className="w-full border-b-2 border-slate-200 focus:border-innova-gold outline-none py-2 transition-colors bg-transparent" />
                </div>
              </div>
            </section>

            {/* 2. Rooms & Guests Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <span className="bg-innova-gold text-innova-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</span>
                  <h2 className="text-xl font-bold uppercase tracking-wider text-innova-gold">Accommodations</h2>
                </div>
                <button 
                  onClick={addRoom}
                  className="text-xs font-bold px-4 py-2 border border-innova-gold text-innova-gold hover:bg-innova-gold hover:text-innova-white transition-all rounded-full uppercase"
                >
                  + Add Room
                </button>
              </div>

              <div className="space-y-4">
                {rooms.map((room, index) => (
                  <div key={room.id} className="flex flex-wrap md:flex-nowrap gap-4 p-5 bg-slate-50 rounded-lg items-end border-l-4 border-innova-gold">
                    <div className="flex-grow">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Room {index + 1} Type</label>
                      <select className="w-full bg-transparent border-none font-medium focus:ring-0 cursor-pointer">
                        <option>Standard Suite</option>
                        <option>Deluxe Gold Room</option>
                        <option>Executive Penthouse</option>
                        <option>Smart Family Suite</option>
                      </select>
                    </div>
                    <div className="w-32">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Total People</label>
                      <input type="number" min="1" defaultValue={room.guests} className="w-full bg-transparent border-none font-medium focus:ring-0" />
                    </div>
                    {rooms.length > 1 && (
                      <button onClick={() => removeRoom(room.id)} className="text-red-400 hover:text-red-600 p-2 text-sm uppercase font-bold">Remove</button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Intelligent Preferences Section */}
            <section className="mb-12">
            <div className="flex items-center mb-6">
                <span className="bg-innova-gold text-innova-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 font-sans">3</span>
                <h2 className="text-xl font-bold uppercase tracking-wider text-innova-gold">Smart Preferences</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">What are your priorities for this stay?</label>
                <div className="flex flex-wrap gap-3">
                    {[
                    'High Floor', 'Quiet Zone', 'Near Elevator', 'Away from Stairs',
                    'Sun-facing', 'Work-friendly', 'City View'
                    ].map((pref) => {
                    const isActive = selectedPriorities.includes(pref);
                    return (
                        <label 
                        key={pref} 
                        onClick={() => togglePriority(pref)}
                        className={`group flex items-center px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border ${
                            isActive 
                            ? 'bg-innova-gold border-innova-gold text-innova-white shadow-md transform scale-105' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-innova-gold hover:bg-innova-gold/5'
                        }`}
                        >
                        <input 
                            type="checkbox" 
                            checked={isActive}
                            readOnly
                            className={`rounded mr-2 w-4 h-4 accent-white ${isActive ? 'opacity-100' : 'opacity-50'}`} 
                        />
                        <span className="text-sm font-medium">{pref}</span>
                        </label>
                    );
                    })}
                </div>
                </div>
                <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans">Special Requests (Smart Assignment Notes)</label>
                <textarea 
                    placeholder="e.g., traveling with seniors, need extra desk space for meetings..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-innova-gold focus:border-innova-gold outline-none h-24 text-sm font-sans"
                />
                </div>
            </div>
            </section>

            {/* Submit Button Section */}
            <div className="flex flex-col items-center pt-8 border-t border-slate-100">
            <button className="px-12 py-3 bg-innova-gold text-innova-white font-bold rounded-full shadow-lg hover:bg-[#a38428] transition-all transform hover:scale-105 uppercase tracking-widest text-sm mb-6">
                Find My Perfect Room
            </button>
            
            <div className="flex items-center gap-2 opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bf9b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.25em] font-medium">
                Powered by InnovaHMS Intelligent Room Assignment Engine
                </p>
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;