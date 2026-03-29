import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Filter, Plus, Minus, ChevronDown, Image as ImageIcon, X, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

export default function BookingSearch() {

  const today = new Date().toISOString().split('T')[0];

  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const guestPickerRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
      if (!searchParams.checkIn || !searchParams.checkOut) {
        alert("Please select both check-in and check-out dates.");
        return;
      }

      if (new Date(searchParams.checkOut) <= new Date(searchParams.checkIn)) {
        alert("Check-out date must be after check-in date.");
        return;
      }

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

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const filteredRooms = rooms.filter(room => {
    const matchesPrice = room.price <= maxPrice;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(room.roomType);
    return matchesPrice && matchesType;
  });

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-12 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-zinc-900">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 items-end">
            
            {/* Location Input */}
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
                <Calendar size={18} className="text-[#bf9b30] shrink-0" />
                
                {/* CHECK-IN INPUT */}
                <div className="relative flex flex-1 items-center justify-between group">
                  <div className="flex w-full items-center justify-between pr-2">
                    <span className={`text-sm ${searchParams.checkIn ? 'font-bold dark:text-white' : 'text-zinc-400'}`}>
                      {formatDate(searchParams.checkIn)}
                    </span>
                    <ChevronDown size={14} className="text-[#bf9b30]/40 group-hover:text-[#bf9b30] transition-colors" />
                  </div>
                  <input 
                    type="date" 
                    min={today} 
                    value={searchParams.checkIn}
                    onChange={(e) => {
                      const newCheckIn = e.target.value;
                      setSearchParams(prev => ({ 
                        ...prev, 
                        checkIn: newCheckIn,
                        checkOut: (prev.checkOut && newCheckIn > prev.checkOut) ? '' : prev.checkOut 
                      }));
                    }}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" 
                  />
                </div>

                <span className="text-zinc-300 dark:text-zinc-600">|</span>

                {/* CHECK-OUT INPUT */}
                <div className="relative flex flex-1 items-center justify-between group">
                  <div className="flex w-full items-center justify-between pr-2">
                    <span className={`text-sm ${searchParams.checkOut ? 'font-bold dark:text-white' : 'text-zinc-400'}`}>
                      {formatDate(searchParams.checkOut)}
                    </span>
                    <ChevronDown size={14} className="text-[#bf9b30]/40 group-hover:text-[#bf9b30] transition-colors" />
                  </div>
                  <input 
                    type="date" 
                    min={searchParams.checkIn || today} 
                    value={searchParams.checkOut}
                    onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" 
                  />
                </div>
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
                  disabled={!searchParams.checkIn || !searchParams.checkOut}
                  className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95
                    ${(!searchParams.checkIn || !searchParams.checkOut) 
                      ? 'bg-zinc-300 cursor-not-allowed' 
                      : 'bg-[#bf9b30] hover:bg-[#a68a3e] shadow-[#bf9b30]/20'
                    }`}
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
                      <input 
                        type="checkbox" 
                        className="accent-[#bf9b30] rounded"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                      /> {type}
                    </label>
                  ))}
                </div>
                
                <div className="h-[1px] bg-zinc-100 dark:bg-white/5"></div>

                {/* MODIFIED PRICE RANGE UI */}
                <div className="relative pt-6">
                  <h4 className="mb-8 text-sm font-semibold text-zinc-500">Price Range</h4>
                  
                  <div className="relative px-2">
                    {/* Dynamic Label - Tooltip */}
                    <div 
                      className="absolute -top-7 px-2 py-1 bg-[#bf9b30] text-white text-[10px] font-bold rounded-md shadow-md transition-all duration-75 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-[#bf9b30]"
                      style={{ 
                        // Updated divisor from 5000 to 20000 to match the new 'max'
                        left: `${(maxPrice / 20000) * 100}%`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      ₱{maxPrice.toLocaleString()}
                    </div>

                    <input 
                      type="range" 
                      className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#bf9b30] dark:bg-zinc-800" 
                      min="0" 
                      max="20000" 
                      step="100"   
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    />
                    
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 mt-4 uppercase tracking-tighter">
                      <span>Min: ₱0</span>
                      <span>Max: ₱20,000+</span>
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
                Under ₱{maxPrice.toLocaleString()}
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
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
                            ₱{room.price} per night
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
                        <button 
                          onClick={() => setSelectedRoom(room)} 
                          className="text-sm font-bold text-[#bf9b30] hover:underline"
                        >
                          View Details
                        </button>
                    </div>
                    </div>
                </div>
                ))
            ) : (
              <div className="col-span-full py-20 text-center text-zinc-400">
                {loading ? "Finding the best rooms for you..." : "No rooms found matching your filters."}
              </div>
            )}
          </div>
          </main>
        </div>
      </div>
      {/* Modal Overlay */}
      {selectedRoom && (
        <RoomDetailsModal 
          room={selectedRoom} 
          searchParams={searchParams} 
          onClose={() => setSelectedRoom(null)} 
        />
      )}
    </div> 
  );
}

const RoomDetailsModal = ({ room, searchParams, onClose }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/customer/booking', {
      state: {
        room,
        searchParams
      }
    });
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!room) return null;

  const images = room.images || [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl bg-white shadow-2xl dark:bg-zinc-900 dark:border dark:border-white/10 flex flex-col overflow-hidden">
        
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-[100] p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors shadow-sm"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            
            {/* Image Gallery Side */}
            <div className="relative lg:col-span-2 h-80 lg:h-auto bg-zinc-100 dark:bg-zinc-800 group flex items-center justify-center">
              {hasImages ? (
                <img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]?.startsWith('http') ? images[currentImageIndex] : `${API_BASE_URL}${images[currentImageIndex]}`} 
                  alt={`${room.roomName} - view ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover animate-in fade-in zoom-in-95 duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}

              {/* Placeholder Icon (Matches Search Results Style) */}
              {(!hasImages || !images[currentImageIndex]) && (
                <div className="flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-600">
                  <ImageIcon size={64} strokeWidth={1.5} />
                </div>
              )}

              {hasMultipleImages && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex ? 'w-6 bg-[#bf9b30]' : 'w-1.5 bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="absolute top-6 left-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-black/40 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20">
                  {room.roomType}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-3 p-8 md:p-10 flex flex-col">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bf9b30]">{room.hotelName}</span>
                <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mt-1">{room.roomName || `Room ${room.roomNumber}`}</h2>
                <div className="flex items-start gap-1 text-sm text-zinc-500 mt-2">
                  <MapPin size={16} className="text-[#bf9b30] mt-0.5 shrink-0" />
                  <span>{room.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-white/5">
                    <p className="text-[10px] uppercase font-bold text-zinc-400">Max Adults</p>
                    <p className="text-lg font-bold dark:text-white">{room.capacity?.adults || 0} Adults</p>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-white/5">
                    <p className="text-[10px] uppercase font-bold text-zinc-400">Max Children</p>
                    <p className="text-lg font-bold dark:text-white">{room.capacity?.children || 0} Children</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Description</h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 italic">
                    {room.description || "A minimalist sanctuary designed for comfort and tranquility."}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Amenities</h4>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {room.amenities?.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                          <CheckCircle2 size={14} className="text-[#bf9b30]" />
                          {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-400 font-medium tracking-tight">Price per night</p>
                  <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-zinc-800 dark:text-white">₱{room.price}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleBookNow}
                  className="px-10 py-4 bg-[#bf9b30] text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-[#bf9b30]/30 hover:bg-[#a68a3e] hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};