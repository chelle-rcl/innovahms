import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, XCircle, CreditCard, MapPin, Users, Loader2, AlertCircle, Receipt, Image as ImageIcon } from 'lucide-react';

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await fetch(`/api/user-bookings/${loggedInUser.id}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, { method: 'PATCH' });
      if (response.ok) fetchUserBookings(); 
    } catch (error) {
      alert("Failed to cancel booking.");
    }
  };

  const handlePayment = (booking) => {
    navigate('/payment', { state: { booking } });
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'upcoming') return b.status === 'booked';
    if (activeTab === 'active')   return b.status === 'occupied';
    if (activeTab === 'past')     return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const getNights = (checkIn, checkOut) => {
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.round(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Loader2 className="animate-spin text-[#bf9b30]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-12 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">My Bookings</h1>
          <p className="mt-2 text-zinc-500">View your stay details and billing information</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 p-1 bg-zinc-200/50 dark:bg-zinc-900/50 rounded-2xl w-fit mx-auto">
          {['upcoming', 'active', 'past', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                ? 'bg-[#bf9b30] text-white shadow-lg' 
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all dark:border-white/10 dark:bg-zinc-900">
                <div className="flex flex-col md:flex-row">
                  
                  {/* Left Section: Visuals & Main Info */}
                  <div className="flex flex-1 flex-col p-6 md:flex-row md:items-center gap-6">
                    <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-2xl bg-zinc-100 md:w-40 dark:bg-zinc-800">
                     {booking.roomImage && booking.roomImage !== '/static/default-room.jpg' ? (
                      <img 
                        src={`http://localhost:5000${booking.roomImage}`} 
                        alt="Room" 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      style={{ display: booking.roomImage && booking.roomImage !== '/static/default-room.jpg' ? 'none' : 'flex' }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-600"
                    >
                      <ImageIcon size={32} strokeWidth={1.5} />
                    </div>
                      
                      <div className="absolute left-2 top-2">
                        <span className="rounded-lg bg-black/70 px-3 py-1.5 text-[8px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                          {booking.roomType}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#bf9b30]">{booking.hotelName}</p>
                        <h3 className="text-xl font-bold dark:text-white">{booking.roomName}</h3>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
                          <MapPin size={12} className="shrink-0" />
                          <span>{booking.hotelAddress}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Check In</p>
                          <div className="flex items-center gap-2 text-sm font-bold dark:text-zinc-200">
                            <Calendar size={14} className="text-[#bf9b30]" />
                            {new Date(booking.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Check Out</p>
                          <div className="flex items-center gap-2 text-sm font-bold dark:text-zinc-200">
                            <Calendar size={14} className="text-[#bf9b30]" />
                            {new Date(booking.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Guests</p>
                          <div className="flex items-center gap-2 text-sm font-bold dark:text-zinc-200">
                            <Users size={14} className="text-[#bf9b30]" />
                            {booking.adults || 0} Adults, {booking.children || 0} Children
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Duration</p>
                          <div className="flex items-center gap-2 text-sm font-bold dark:text-zinc-200">
                            <Clock size={14} className="text-[#bf9b30]" />
                            {getNights(booking.checkIn, booking.checkOut)} Night{getNights(booking.checkIn, booking.checkOut) !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Summary Details (Pricing/Guests) */}
                  <div className="flex w-full flex-col border-t border-zinc-100 bg-zinc-50/50 p-6 md:w-72 md:border-t-0 md:border-l dark:border-white/5 dark:bg-white/[0.02]">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-zinc-500"><CreditCard size={14}/> Payment</span>
                        <span className="font-bold dark:text-white">
                          {booking.paymentType === 'pay_at_hotel' ? 'Pay at Hotel' : 'Online Payment'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-zinc-500"><Receipt size={14}/> Status</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          booking.paymentStatus === 'paid' 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {booking.paymentStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-zinc-500"><Receipt size={14}/> Price/night</span>
                        <span className="font-bold dark:text-white">${booking.pricePerNight?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-zinc-500"><Receipt size={14}/> Total Price</span>
                        <span className="text-lg font-black text-[#bf9b30]">${booking.totalAmount?.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Conditional Actions */}
                    <div className="mt-6 flex flex-col gap-2">
                      {activeTab === 'upcoming' && (
                        <>
                          {booking.paymentType === 'online' && booking.paymentStatus !== 'paid' && (
                            <button 
                              onClick={() => handlePayment(booking)}
                              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#bf9b30] py-3 text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-yellow-900/10"
                            >
                              <CreditCard size={14} /> Pay Now
                            </button>
                          )}
                          <button 
                            onClick={() => handleCancel(booking.id)}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 py-3 text-xs font-bold text-red-500 transition-all hover:bg-red-50 dark:border-white/5 dark:hover:bg-red-500/10"
                          >
                            <XCircle size={14} /> Cancel Booking
                          </button>
                        </>
                      )}
                      {(activeTab === 'past' || activeTab === 'active') && (
                        <div className="flex items-center justify-center py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                           {activeTab} Stay
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-zinc-200 py-20 text-center dark:border-white/5">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
                <AlertCircle size={32} />
              </div>
              <p className="font-bold text-zinc-500">No {activeTab} bookings found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}