import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Filter, Plus, Minus, ChevronDown, Image as ImageIcon } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000';

export default function BookingSearch() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });

  // Price Range State
  const [maxPrice, setMaxPrice] = useState(5000);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const guestPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestPickerRef.current && !guestPickerRef.current.contains(event.target)) {
        setIsGuestPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateGuests = (field, operation) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: operation === 'add' 
        ? prev[field] + 1 
        : Math.max(field === 'adults' ? 1 : 0, prev[field] - 1)
    }));
  };

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
    setLoading(true);
    try {
        const queryParams = new URLSearchParams({
        location: searchParams.location,
        adults: searchParams.adults,
        children: searchParams.children,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut
        }).toString();

        const response = await fetch(`/api/search-rooms?${queryParams}`);
        const data = await response.json();
        setRooms(data);
    } catch (error) {
        console.error("Search failed:", error);
    } finally {
        setLoading(false);
    }
    };

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-12 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* SEARCH BAR CARD */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-zinc-900">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 items-end">
            
            <div className="relative">
              <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-zinc-400">Location</label>
              <div className="flex h-12 items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 px-3 dark:border-white/5 dark:bg-zinc-800/50 focus-within:ring-1 focus-within:ring-[#bf9b30]/50 transition-all">
                <MapPin size={18} className="text-[#bf9b30]" />
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="w-full bg-transparent text-sm outline-none dark:text-white placeholder:text-zinc-400"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-zinc-400">Stay Dates</label>
              <div className="flex h-12 items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 px-3 dark:border-white/5 dark:bg-zinc-800/50 focus-within:ring-1 focus-within:ring-[#bf9b30]/50 transition-all">
                <Calendar size={18} className="text-[#bf9b30]" />
                <input type="date" className="bg-transparent text-sm outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark]" />
                <span className="text-zinc-300 dark:text-zinc-600">|</span>
                <input type="date" className="bg-transparent text-sm outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark]" />
              </div>
            </div>

            <div className="relative" ref={guestPickerRef}>
              <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-zinc-400">Guests</label>
              <button 
                onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
                className="flex h-12 w-full items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-3 text-sm dark:border-white/5 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              >
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <Users size={18} className="text-[#bf9b30]" />
                  <span>{searchParams.adults} Adults, {searchParams.children} Children</span>
                </div>
                <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isGuestPickerOpen ? 'rotate-180' : ''}`} />
              </button>

              {isGuestPickerOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-zinc-900 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium dark:text-zinc-300">Adults</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateGuests('adults', 'sub')} className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white"><Minus size={14} /></button>
                        <span className="w-4 text-center font-bold dark:text-white">{searchParams.adults}</span>
                        <button onClick={() => updateGuests('adults', 'add')} className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white"><Plus size={14} /></button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium dark:text-zinc-300">Children</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateGuests('children', 'sub')} className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white"><Minus size={14} /></button>
                        <span className="w-4 text-center font-bold dark:text-white">{searchParams.children}</span>
                        <button onClick={() => updateGuests('children', 'add')} className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
                <button 
                    onClick={handleSearch}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#bf9b30] font-bold text-white shadow-lg shadow-[#bf9b30]/20 transition-all hover:bg-[#a68a3e] active:scale-95"
                >
                    <Search size={18} />
                    <span>{loading ? 'Searching...' : 'Search Rooms'}</span>
                </button>
            </div>
          </div>
        </div>

        {/* RESULTS AREA */}
        <div className="mt-12 flex flex-col md:flex-row gap-8">
          
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-900 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-bold text-zinc-800 dark:text-white">
                <Filter size={16} /> Filters
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-zinc-500">Room Type</h4>
                  {['Single', 'Double', 'Suite', 'Deluxe'].map(type => (
                    <label key={type} className="flex items-center gap-2 mb-2 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-[#bf9b30] transition-colors">
                      <input type="checkbox" className="accent-[#bf9b30] rounded" /> {type}
                    </label>
                  ))}
                </div>
                
                <div className="h-[1px] bg-zinc-100 dark:bg-white/5"></div>

                {/* MODIFIED PRICE RANGE UI */}
                <div className="relative pt-6">
                  <h4 className="mb-8 text-sm font-semibold text-zinc-500">Price Range</h4>
                  
                  <div className="relative px-2">
                    {/* Dynamic Label */}
                    <div 
                      className="absolute -top-7 px-2 py-1 bg-[#bf9b30] text-white text-[10px] font-bold rounded-md shadow-md transition-all duration-75 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-[#bf9b30]"
                      style={{ 
                        left: `${(maxPrice / 5000) * 100}%`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      ${maxPrice}
                    </div>

                    <input 
                      type="range" 
                      className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#bf9b30] dark:bg-zinc-800" 
                      min="0" 
                      max="5000" 
                      step="50"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    />
                    
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 mt-4 uppercase tracking-tighter">
                      <span>Min: $0</span>
                      <span>Max: $5000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold dark:text-white">Available Rooms</h2>
              <span className="text-sm text-zinc-400">
                Under ${maxPrice} for {searchParams.adults} adults
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {rooms.length > 0 ? (
                rooms.map((room) => (
                <div key={room.id} className="group flex flex-col rounded-3xl border border-zinc-200 bg-white overflow-hidden transition-all hover:shadow-xl dark:border-white/10 dark:bg-zinc-900">
                    <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        {room.images && room.images[0] ? (
                            <img 
                            src={
                                room.images[0].startsWith('http') 
                                ? room.images[0] 
                                : `${API_BASE_URL}${room.images[0].startsWith('/') ? '' : '/'}${room.images[0]}`
                            } 
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            alt={room.roomName} 
                            onError={(e) => { 
                                e.target.style.display = 'none'; // Hide the broken image
                                e.target.nextSibling.style.display = 'flex'; // Show placeholder sibling
                            }}
                            />
                        ) : null}

                        {/* Placeholder Icon (Visible if no image or if image fails) */}
                        {(!room.images || !room.images[0]) && (
                            <div className="flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-600">
                            <ImageIcon size={48} strokeWidth={1.5} />
                            </div>
                        )}

                        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#bf9b30] backdrop-blur-md dark:bg-zinc-900/90">
                            ${room.price} per night
                        </div>
                    </div>
                    
                    <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#bf9b30]">{room.hotelName}</p>
                    <h3 className="text-lg font-bold text-zinc-800 dark:text-white">{room.roomName || `Room ${room.roomNumber}`}</h3>
                    
                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                        <MapPin size={12} />
                        <span>{room.location}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-white/5">
                        <div className="flex gap-3 text-xs font-medium text-zinc-400">
                        <span>{room.roomType}</span>
                        <span>•</span>
                        <span>Max {room.capacity.adults} Adults, {room.capacity.children} Children</span>
                        </div>
                        <button className="text-sm font-bold text-[#bf9b30] hover:underline">View Details</button>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="col-span-full py-20 text-center text-zinc-400">
                {loading ? "Finding the best rooms for you..." : "No rooms found matching your criteria."}
                </div>
            )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}