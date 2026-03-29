import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Users, CreditCard, Hotel, MapPin, User, Mail, Phone, Image as ImageIcon } from 'lucide-react';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { room, searchParams } = location.state || {};

  // Get logged in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || {};

  const [formData, setFormData] = useState({
    fullName: `${loggedInUser.firstName || ''} ${loggedInUser.lastName || ''}`.trim(),
    email: loggedInUser.email || '',
    phone: loggedInUser.contactNumber || '',
    paymentOption: 'pay_at_hotel'
  });

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate Nights
  const checkIn = new Date(searchParams?.checkIn);
  const checkOut = new Date(searchParams?.checkOut);
  const diffTime = Math.abs(checkOut - checkIn);
  const nightCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalCost = (nightCount * (room?.price || 0)).toFixed(2);

  if (!room || !searchParams) {
    return <div className="pt-32 text-center">No booking data found. Please search again.</div>;
  }

  const [notification, setNotification] = useState({
    show: false,
    message: ""
  });

  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    const bookingPayload = {
      customerId: loggedInUser.id,
      roomId: room.id,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      totalAmount: totalCost,
      adults: searchParams.adults,
      children: searchParams.children,
      paymentType: formData.paymentOption
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });

      if (response.ok) {
        setNotification({ show: true, message: "" }); 
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-12 pb-12 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-[#bf9b30] transition-colors"
        >
          <ChevronLeft size={18} /> Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: FORMS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Customer Information */}
            <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-[#bf9b30]/10 p-2 text-[#bf9b30]">
                  <User size={20} />
                </div>
                <h2 className="text-xl font-bold dark:text-white">Customer Information</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                  <input 
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#bf9b30] dark:border-white/5 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#bf9b30] dark:border-white/5 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Phone Number</label>
                  <input 
                    type="tel"
                    placeholder="e.g. +63 912 345 6789"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#bf9b30] dark:border-white/5 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>
            </section>

            {/* Payment Options */}
            <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-[#bf9b30]/10 p-2 text-[#bf9b30]">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-xl font-bold dark:text-white">Payment Option</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className={`relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${formData.paymentOption === 'pay_at_hotel' ? 'border-[#bf9b30] bg-[#bf9b30]/5' : 'border-zinc-100 dark:border-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="accent-[#bf9b30]" 
                      checked={formData.paymentOption === 'pay_at_hotel'}
                      onChange={() => setFormData({...formData, paymentOption: 'pay_at_hotel'})}
                    />
                    <span className="text-sm font-bold dark:text-white">Pay at Hotel</span>
                  </div>
                  <Hotel size={16} className="text-zinc-400" />
                </label>

                <label className={`relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${formData.paymentOption === 'online' ? 'border-[#bf9b30] bg-[#bf9b30]/5' : 'border-zinc-100 dark:border-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="accent-[#bf9b30]"
                      checked={formData.paymentOption === 'online'}
                      onChange={() => setFormData({...formData, paymentOption: 'online'})}
                    />
                    <span className="text-sm font-bold dark:text-white">Online Payment</span>
                  </div>
                  <CreditCard size={16} className="text-zinc-400" />
                </label>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <aside className="space-y-6">
            <div className="sticky top-20 rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-zinc-900">
              <h3 className="mb-4 text-lg font-bold dark:text-white">Booking Summary</h3>
              
              {/* Room Small Card */}
              <div className="mb-6 overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
                <div className="relative h-32 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  {room.images?.[0] ? (
                    <img 
                      src={`http://localhost:5000${room.images[0]}`} 
                      alt="Room" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'; 
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {(!room.images || !room.images[0]) && (
                    <div className="flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-600">
                      <ImageIcon size={32} strokeWidth={1.5} />
                    </div>
                  )}
                  
                  {room.roomType && (
                    <div className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                      {room.roomType}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase text-[#bf9b30]">{room.hotelName}</p>
                  <h4 className="font-bold dark:text-white">{room.roomName || `Room ${room.roomNumber}`}</h4>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-zinc-500">
                    <MapPin size={10} /> {room.location}
                  </div>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-4 border-t border-zinc-100 pt-4 dark:border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Schedule</span>
                  <span className="font-medium dark:text-white text-right">
                    {formatDate(searchParams.checkIn)} — {formatDate(searchParams.checkOut)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Guests</span>
                  <span className="font-medium dark:text-white">{searchParams.adults} Adults, {searchParams.children} Children</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Duration</span>
                  <span className="font-medium dark:text-white">{nightCount} Nights</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-6 space-y-2 border-t border-zinc-100 pt-4 dark:border-white/5">
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Price per night</span>
                  <span>${room.price}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-[#bf9b30]">
                  <span>Total</span>
                  <span>${totalCost}</span>
                </div>
              </div>

              <button 
                onClick={handleConfirmBooking}
                className="mt-8 w-full rounded-2xl bg-[#bf9b30] py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#bf9b30]/20 transition-all hover:bg-[#a68a3e] active:scale-95"
              >
                Confirm Booking
              </button>
            </div>
          </aside>

        </div>
      </div>

      {/* Confirmed Notification */}
      {notification.show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md">
          <div 
            className="absolute inset-0 transition-opacity animate-in fade-in duration-300" 
            onClick={() => setNotification({ show: false, message: "" })}
          />
          <div className="relative my-auto w-full max-w-md transform overflow-hidden rounded-[2.5rem] border border-white/10 bg-white p-8 shadow-2xl transition-all animate-in zoom-in-95 duration-300 dark:bg-zinc-900">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#bf9b30]/10 text-[#bf9b30]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#bf9b30] text-white shadow-lg shadow-[#bf9b30]/30">
                <Calendar size={32} strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                Booking Confirmed!
              </h2>
              <p className="mt-2 text-sm font-medium text-zinc-500">
                Your booking at <span className="text-[#bf9b30]">{room.hotelName}</span> is secured.
              </p>
            </div>
            <div className="mt-8 space-y-4 rounded-3xl bg-zinc-50 p-6 dark:bg-zinc-800/50">
              <div className="flex justify-between text-xs">
                <span className="font-bold uppercase tracking-widest text-zinc-400">Total Amount</span>
                <span className="font-black text-zinc-900 dark:text-white">${totalCost}</span>
              </div>
              <div className="h-px w-full bg-zinc-200 dark:bg-white/5" />
              <div className="space-y-2">
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {formData.paymentOption === "pay_at_hotel" 
                    ? "Please complete your payment at the front desk upon arrival." 
                    : "To keep your booking, please settle the payment via our online portal."} 
                </p>
                <div className="flex items-start gap-2 rounded-xl bg-amber-500/10 p-3 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  <span className="mt-0.5">⚠️</span>
                  <span>
                    {formData.paymentOption === "pay_at_hotel"
                      ? "Automatic cancellation applies if not paid on check-in date."
                      : "Payment must be completed by your check-in date to avoid automatic cancellation."}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setNotification({ show: false, message: "" });
                navigate('/customer/MyBookings');
              }}
              className="mt-8 w-full rounded-2xl bg-[#bf9b30] py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#bf9b30]/20 transition-all hover:bg-[#a68a3e] active:scale-95"
            >
              View My Bookings
            </button>
            
            <button 
              onClick={() => setNotification({ show: false, message: "" })}
              className="mt-4 w-full text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}