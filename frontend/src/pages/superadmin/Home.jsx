import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowUpRight, 
  TrendingUp, 
  MapPin, 
  ChevronRight, 
  TrendingDown 
} from "lucide-react";

  const collaboratingHotels = [
  {
    id: "quantum-suite", // Ito ang papasok sa :id ng URL
    name: "Quantum Executive Suite",
    location: "Metro Manila, PH",
    image: "/images/room1.jpg",
    forecast: "95% Occupancy",
  },
  // ... iba pang hotels
];

// 1. Siguraduhin na ang images array ay tama ang path
const images = ["/images/herobg1.jpg", "/images/suite-luxury.jpg"];

export default function LandingPage() {
  const [currentImg, setCurrentImg] = useState(0);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    setIsBooted(true);
    // In-update sa 8000ms (8 seconds)
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 8000); 
    return () => clearInterval(interval);
  }, []); // Tinanggal ang images.length dependency para mas stable

  return (
    <main className="relative min-h-screen w-full bg-[#0d0c0a] font-sans selection:bg-[#bf9b30]/30 overflow-x-hidden text-[#e5e1d8]">
      
      <section className="relative h-screen w-full overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: 1, 
              scale: 1.2, // Cinematic zoom-in
              x: "1%", 
              y: "0%" 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 8, // Dapat kapareho ng interval para seamless
              ease: "linear" 
            }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentImg]})` }}
          >
            {/* Gradient Overlay: Deep Amber to Obsidian */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1812]/40 via-[#0d0c0a]/60 to-[#0d0c0a]" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isBooted ? { opacity: 1, y: 0 } : {}}
            className="mb-6"
          >
            <h2 className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#bf9b30]/80">
              The Evolution of Travel
            </h2>
            <h1 className="mt-4 text-7xl md:text-[10rem] font-black tracking-tighter leading-none bg-gradient-to-b from-[#f5f1da] to-[#bf9b30] bg-clip-text text-transparent drop-shadow-2xl">
              INNOVA<span className="text-[#bf9b30]">.</span>HMS
            </h1>
          </motion.div>

          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isBooted ? { opacity: 0.8 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-2 text-[12px] md:text-sm leading-relaxed tracking-[0.1em] text-[#e5e1d8] font-light"
            >
              INNOVA-HMS is designed to provide guests with a smarter, faster, and more convenient hotel experience. 
              Through our intelligent management platform, explore rooms, make reservations, and manage 
              your sanctuary anywhere in the world.
            </motion.p>
          </div>

          {/* FUTURISTIC GLASS CONSOLE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isBooted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-16 w-full max-w-4xl overflow-hidden rounded-2xl border border-[#bf9b30]/20 bg-[#1a1812]/40 p-1 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1 px-10 py-6 text-left border-r border-[#bf9b30]/10 hover:bg-[#bf9b30]/5 transition-colors cursor-pointer">
                <span className="block text-[8px] uppercase tracking-[0.3em] text-[#bf9b30] font-bold mb-1">Check Availability</span>
                <p className="text-xs font-bold text-white tracking-widest uppercase">Oct 12 — Oct 18</p>
              </div>
              <div className="flex-1 px-10 py-6 text-left hover:bg-[#bf9b30]/5 transition-colors cursor-pointer">
                <span className="block text-[8px] uppercase tracking-[0.3em] text-[#bf9b30] font-bold mb-1">Guest Occupancy</span>
                <p className="text-xs font-bold text-white tracking-widest uppercase">02 Adults, 01 Child</p>
              </div>
              <button className="m-2 h-14 px-12 rounded-xl bg-gradient-to-r from-[#bf9b30] to-[#8a6d1d] text-[10px] font-black uppercase tracking-[0.3em] text-[#0d0c0a] hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                Initiate Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

 {/* --- FACILITIES / AMENITIES SECTION --- */}
<section id="suites" className="relative pt-8 pb-16 px-6 bg-[#0d0c0a] max-w-7xl mx-auto overflow-hidden scroll-mt-24">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="max-w-xl text-left"
    >
      <p className="font-serif italic text-[#bf9b30] text-xl md:text-2xl mb-1 tracking-wide">
        Facilities
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase mb-2">
        Our <span className="text-[#bf9b30]">Amenities</span>
      </h2>
      <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed max-w-md">
        Premium facilities designed to enhance every aspect of your journey.
      </p>
    </motion.div>

    {/* Optional: "View All" button sa tabi ng title */}
    <Link to="/facilities" className="text-[#bf9b30] text-[10px] font-black uppercase tracking-widest hover:underline">
      Explore All Facilities →
    </Link>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
    
    {/* HIGHLIGHT BOX (Now Clickable) */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="lg:col-span-8 relative group overflow-hidden rounded-xl border border-white/5 bg-[#14130f] h-[580px]"
    >
      <Link to="/facilities" className="flex flex-col h-full w-full">
        <div className="relative h-[65%] overflow-hidden">
          <img 
            src="/images/signup-img.png" 
            alt="Main Facility" 
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14130f] via-transparent to-transparent" />
          <div className="absolute top-4 left-4 bg-[#bf9b30]/10 backdrop-blur-md border border-[#bf9b30]/30 px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#bf9b30] animate-pulse" />
            <span className="text-[9px] font-bold text-[#bf9b30] uppercase tracking-widest">Presidential Suite</span>
          </div>
        </div>

        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-[#bf9b30] transition-colors">
              The Imperial <span className="text-[#bf9b30]">Sanctum</span>
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 font-light leading-relaxed max-w-xl line-clamp-2">
              A masterpiece of luxury living spanning 180 sqm. Complete with a private terrace, jacuzzi, personal butler, and panoramic city views.
            </p>
          </div>

          <div className="flex items-center gap-8 mt-4 pt-4 border-t border-white/5">
            {[
              { label: "SQM", val: "180" },
              { label: "GUESTS", val: "4" },
              { label: "PER NIGHT", val: "₱18k" },
              { label: "RATING", val: "4.9★" }
            ].map((spec, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-lg font-black text-[#bf9b30] leading-none">{spec.val}</span>
                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter mt-1">{spec.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>

    {/* SIDE CARDS (Now Clickable) */}
    <div className="lg:col-span-4 flex flex-col gap-4">
      {[
        { 
          title: "Wellness Gym", 
          desc: "AI-integrated health equipment.", 
          img: "/images/hero-bg-img.png", 
          label: "Fitness" 
        },
        { 
          title: "Dining Hall", 
          desc: "Futuristic culinary experience.", 
          img: "/images/signup-img.png", 
          label: "Culinary" 
        }
      ].map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative group flex-1 overflow-hidden rounded-lg h-[102px] border border-white/5"
        >
          <Link to="/facilities" className="block w-full h-full">
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-600"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span className="text-[8px] text-[#bf9b30] font-black uppercase tracking-[0.3em] mb-1">{item.label}</span>
              <h4 className="text-md font-bold text-[#e5e1d8] uppercase tracking-wide group-hover:text-[#bf9b30] transition-colors">
                {item.title}
              </h4>
              <p className="text-[9px] text-gray-500 font-light mt-0.5 leading-tight line-clamp-2">
                {item.desc}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* --- ACCOMMODATIONS SECTION --- */}
<section id="hotels" className="relative pt-20 pb-10 px-6 max-w-7xl mx-auto scroll-mt-20">
  {/* ... (Header part ng section) ... */}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {collaboratingHotels.map((hotel, idx) => (
      <motion.div 
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        viewport={{ once: true }}
      >
        {/* DAPAT TUGMA ITO SA ROUTE MO SA App.js */}
        <Link 
          to={`/hoteldetail/${hotel.id}`} 
          className="group relative block bg-[#14130f] rounded-xl border border-[#bf9b30]/10 overflow-hidden shadow-lg hover:border-[#bf9b30]/30 transition-all duration-500 h-full"
        >
          <div className="relative h-52 overflow-hidden">
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-transparent opacity-90" />
            
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-[#bf9b30]/20">
              <span className="text-[8px] font-black text-[#bf9b30] uppercase tracking-tighter flex items-center gap-1">
                <TrendingUp size={10}/> {hotel.forecast}
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-1 text-[#bf9b30]/60">
              <MapPin size={10} />
              <span className="text-[9px] uppercase tracking-widest font-bold">{hotel.location}</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-4 group-hover:text-[#bf9b30] transition-colors uppercase tracking-wide leading-tight">
              {hotel.name}
            </h3>
            
            <div className="flex items-center justify-between pt-3 border-t border-[#bf9b30]/10">
              <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest group-hover:text-white transition-colors">Details</span>
              <div className="flex items-center gap-1">
                 <span className="text-[8px] font-black text-[#bf9b30] opacity-0 group-hover:opacity-100 transition-opacity uppercase">Enter 360°</span>
                 <ChevronRight size={14} className="text-[#bf9b30] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    ))}
  </div>
</section>

{/* --- PROMOTIONS SECTION --- */}
<section id="promotions" className="relative pt-10 pb-20 px-6 max-w-7xl mx-auto scroll-mt-24">
  <div className="mb-12">
    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#bf9b30] mb-2"></p>
    <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
      Current <span className="font-serif italic font-light text-[#bf9b30] normal-case tracking-normal">Promotions</span>
    </h2>
    <p className="text-gray-400 text-xs mt-4 max-w-md font-light leading-relaxed">
      Personalized deals crafted by our AI system based on your preferences and stay history.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        badge: "Early Bird",
        title: "Early Sanctuary Deal",
        desc: "Book 30 days in advance and unlock premium savings on all room categories. Includes complimentary breakfast.",
        promo: "30%",
        sub: "off any room",
        expiry: "Expires Apr 30, 2026",
        icon: "🌅"
      },
      {
        badge: "VIP Exclusive",
        title: "Suki Member Weekend",
        desc: "Exclusive weekend rate for our loyalty program members. Includes spa access, late checkout, and room upgrade.",
        promo: "40%",
        sub: "off weekends",
        expiry: "Expires Mar 31, 2026",
        icon: "👑"
      },
      {
        badge: "Long Stay",
        title: "Extended Sanctuary",
        desc: "Stay 5 nights or more and receive the 6th night completely free. Applies to Deluxe and above categories.",
        promo: "6th Night",
        sub: "FREE",
        expiry: "Ongoing promotion",
        icon: "🌙"
      }
    ].map((offer, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        viewport={{ once: true }}
        className="relative group bg-[#14130f] border border-[#bf9b30]/10 rounded-2xl p-8 flex flex-col h-full hover:border-[#bf9b30]/40 transition-all duration-500 overflow-hidden"
      >
        {/* Subtle Glow Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#bf9b30]/5 blur-[80px] group-hover:bg-[#bf9b30]/10 transition-all" />

        {/* Icon & Badge */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#22211c] flex items-center justify-center text-lg border border-white/5 shadow-inner">
            {offer.icon}
          </div>
          <span className="w-fit px-3 py-1 rounded-full border border-[#bf9b30]/30 bg-[#bf9b30]/5 text-[9px] font-black text-[#bf9b30] uppercase tracking-widest">
            {offer.badge}
          </span>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-[#bf9b30] transition-colors">
            {offer.title}
          </h3>
          <p className="text-[11px] text-gray-500 font-light leading-relaxed mb-8">
            {offer.desc}
          </p>
        </div>

        {/* Promo Value */}
        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#bf9b30] tracking-tighter">{offer.promo}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{offer.sub}</span>
          </div>
          <p className="text-[9px] text-gray-600 mt-2 flex items-center gap-1">
             🕒 {offer.expiry}
          </p>
        </div>

        {/* Action Button */}
        <button className="w-full py-3 bg-[#bf9b30] text-[#0d0c0a] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-[#d4ac37] active:scale-[0.98] transition-all shadow-lg shadow-[#bf9b30]/10">
          Claim Offer
        </button>
      </motion.div>
    ))}
  </div>
</section>

{/* --- AI CONCIERGE SECTION --- */}
<section id="ai-concierge" className="relative pt-10 pb-20 px-6 max-w-7xl mx-auto scroll-mt-24">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
    {/* LEFT SIDE: Heading & Features */}
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#bf9b30] mb-2">Powered by Rasa AI</p>
      <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
        AI <span className="font-serif italic font-light text-[#bf9b30] normal-case tracking-normal">Concierge</span>
      </h2>
      <p className="text-gray-400 text-sm font-light leading-relaxed max-w-md mb-10">
        Our intelligent assistant is available 24/7 to help with bookings, recommendations, and any inquiry you may have.
      </p>

      {/* Features List */}
      <div className="space-y-4">
        {[
          { title: "Smart Room Recommendations", desc: "AI analyzes your preferences and history to suggest the perfect room.", icon: "🤖" },
          { title: "Interactive Hotel Map", desc: "Explore hotel grounds and nearby attractions via OpenStreetMap.", icon: "🗺️" },
          { title: "Virtual 360° Room Tours", desc: "Experience any room before booking with immersive virtual tours.", icon: "🎭" },
          { title: "Personalized Notifications", desc: "Receive alerts for booking confirmations, promos, and stay updates.", icon: "🔔" }
        ].map((feat, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-[#14130f] hover:border-[#bf9b30]/30 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-[#1a1915] flex items-center justify-center text-lg border border-white/5 shadow-inner group-hover:bg-[#bf9b30]/10 transition-colors">
              {feat.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">{feat.title}</h4>
              <p className="text-[11px] text-gray-500 font-light mt-0.5">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* RIGHT SIDE: Mock Chat Interface */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative bg-[#14130f] rounded-3xl border border-[#bf9b30]/20 shadow-2xl overflow-hidden"
    >
      {/* Chat Header */}
      <div className="bg-[#1a1915] p-5 border-b border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#bf9b30]/20 flex items-center justify-center border border-[#bf9b30]/30">
          <span className="text-xl">🤖</span>
        </div>
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest">INNOVA Assistant</h3>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Online — AI Powered</span>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="p-6 h-[350px] overflow-y-auto space-y-6 flex flex-col scrollbar-hide">
        <div className="bg-[#1a1915] p-4 rounded-2xl rounded-tl-none border border-white/5 max-w-[85%] self-start">
          <p className="text-[11px] text-gray-300 leading-relaxed">Welcome to INNOVA-HMS! 👋 I'm your AI concierge. How can I assist you today?</p>
        </div>
        
        <div className="bg-[#bf9b30] p-4 rounded-2xl rounded-tr-none max-w-[80%] self-end shadow-lg shadow-[#bf9b30]/10">
          <p className="text-[11px] text-[#0d0c0a] font-bold">What rooms are available this weekend?</p>
        </div>

        <div className="bg-[#1a1915] p-4 rounded-2xl rounded-tl-none border border-white/5 max-w-[85%] self-start">
          <p className="text-[11px] text-gray-300 leading-relaxed">
            Based on your profile, I recommend the <span className="text-[#bf9b30] font-bold italic">Aurum Deluxe</span> (₱4,500/night) or the <span className="text-[#bf9b30] font-bold italic">Obsidian Superior</span> (₱3,200/night). Both are available!
          </p>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-white/5 bg-[#1a1915]">
        <div className="flex items-center gap-3 bg-[#0d0c0a] rounded-xl px-4 py-3 border border-white/10">
          <span className="text-xs text-gray-600 font-light flex-grow">Ask me anything...</span>
          <div className="w-8 h-8 rounded-lg bg-[#bf9b30] flex items-center justify-center text-[#0d0c0a]">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>

  </div>
</section>

{/* --- SUKI LOYALTY PROGRAM SECTION --- */}
<section id="suki-loyalty" className="relative pt-10 pb-20 px-6 max-w-7xl mx-auto">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#bf9b30] mb-2">Rewards Program</p>
      <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
        Suki <span className="font-serif italic font-light text-[#bf9b30] normal-case tracking-normal">Loyalty Program</span>
      </h2>
      <p className="text-gray-400 text-xs mt-4 max-w-md font-light leading-relaxed">
        Earn points every stay, unlock exclusive perks, and ascend through our tier system.
      </p>
    </motion.div>
    
    <button className="px-6 py-2.5 border border-[#bf9b30]/40 text-[#bf9b30] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#bf9b30] hover:text-[#0d0c0a] transition-all duration-500">
      View My Points
    </button>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
    
    {/* LEFT CARD: Current Status (The "Fat" Card turned Compact) */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="lg:col-span-7 bg-[#14130f] border border-[#bf9b30]/20 rounded-2xl p-8 relative overflow-hidden h-full"
    >
      <div className="flex items-center gap-5 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#bf9b30]/10 flex items-center justify-center text-2xl border border-[#bf9b30]/20">
          👑
        </div>
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Gold Member</h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Member since Jan 2024</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-3">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Your Points</span>
          <span className="text-sm font-black text-[#bf9b30]">6,500 / 10,000 <span className="text-gray-600 text-[10px]">pts</span></span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "65%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#bf9b30] to-[#d4ac37]" 
          />
        </div>
        <p className="text-[9px] text-gray-600 mt-3 italic">3,500 pts more to reach Platinum status</p>
      </div>

      {/* Perks Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: "🏷️", label: "10% discount" },
          { icon: "🍳", label: "Free breakfast" },
          { icon: "🕒", label: "Late checkout" },
          { icon: "💆", label: "Spa access" },
          { icon: "🚗", label: "Free parking" },
          { icon: "🎂", label: "Birthday bonus" }
        ].map((perk, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <span className="text-sm">{perk.icon}</span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tight">{perk.label}</span>
          </div>
        ))}
      </div>
    </motion.div>

    {/* RIGHT COLUMN: Tiers (The "Slim" Column) */}
    <div className="lg:col-span-5 flex flex-col gap-3">
      {[
        { tier: "Silver", pts: "0-2,999", perk: "5% discount, priority check-in", icon: "🥈", active: false },
        { tier: "Gold", pts: "3,000-9,999", perk: "10% discount, free breakfast, spa", icon: "👑", active: true },
        { tier: "Platinum", pts: "10,000-24,999", perk: "20% discount, butler service, upgrade", icon: "💎", active: false },
        { tier: "Diamond VIP", pts: "25,000+", perk: "30% discount, presidential privileges", icon: "🔥", active: false }
      ].map((item, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ x: 5 }}
          className={`p-5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
            item.active 
            ? "bg-[#bf9b30]/5 border-[#bf9b30] shadow-[0_0_20px_rgba(191,155,48,0.05)]" 
            : "bg-[#14130f] border-white/5 hover:border-white/10"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${item.active ? "bg-[#bf9b30] text-[#0d0c0a]" : "bg-white/5 text-gray-500"}`}>
              {item.icon}
            </div>
            <div>
              <h4 className={`text-sm font-black uppercase tracking-widest ${item.active ? "text-[#bf9b30]" : "text-white"}`}>{item.tier}</h4>
              <p className="text-[9px] text-gray-500 font-medium leading-tight mt-0.5">{item.perk}</p>
            </div>
          </div>
          <span className={`text-[10px] font-black tracking-tighter ${item.active ? "text-[#bf9b30]" : "text-gray-600"}`}>
            {item.pts} <span className="text-[8px] opacity-50">pts</span>
          </span>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* --- COLLABORATING SANCTUARIES SECTION --- */}
<section id="sanctuaries" className="relative pt-10 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#bf9b30] mb-2">Global Network Node</p>
      <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
        Collaborating <span className="font-serif italic font-light text-[#bf9b30] normal-case tracking-normal">Sanctuaries</span>
      </h2>
    </motion.div>
    
    <button className="px-6 py-2 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-500">
      View Map
    </button>
  </div>

  {/* Grid Layout for Sanctuaries */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { 
        location: "Metropolis Hub", 
        name: "Obsidian Sanctuary", 
        tech: "Neural-Link Integrated", 
        status: "Optimal", 
        img: "/images/signup-img.png",
        color: "#bf9b30"
      },
      { 
        location: "Skyline District", 
        name: "Horizon Vista", 
        tech: "Prophet AI Analytics", 
        status: "Stable", 
        img: "/images/signup-img.png",
        color: "#4a90e2"
      },
      { 
        location: "Coastal Sector", 
        name: "Kinetic Royal", 
        tech: "Biometric V.2", 
        status: "Peak", 
        img: "/images/signup-img.png",
        color: "#ff4b2b"
      },
      { 
        location: "Central Node", 
        name: "Radiant Plaza", 
        tech: "Predictive Comfort", 
        status: "Optimal", 
        img: "/images/signup-img.png",
        color: "#bf9b30"
      }
    ].map((node, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        viewport={{ once: true }}
        className="group relative bg-[#14130f] rounded-xl border border-white/5 overflow-hidden hover:border-[#bf9b30]/30 transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative h-40 overflow-hidden">
          <img 
            src={node.img} 
            alt={node.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
          />
          {/* Status Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-[#0d0c0a]/80 backdrop-blur-sm border border-white/10">
            <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: node.color }} />
            <span className="text-[8px] font-black uppercase tracking-widest text-white">{node.status}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#bf9b30] text-[10px]">📍</span>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{node.location}</p>
          </div>
          <h4 className="text-md font-black text-white uppercase tracking-tight mb-4 group-hover:text-[#bf9b30] transition-colors">
            {node.name}
          </h4>
          
          <div className="pt-4 border-t border-white/5 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[7px] text-gray-600 font-bold uppercase tracking-widest mb-1">System Node</span>
              <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">{node.tech}</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-[8px] ${i < 4 ? 'text-[#bf9b30]' : 'text-gray-700'}`}>★</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* --- GUEST PORTAL: MY ACCOUNT SECTION --- */}
<section id="guest-account" className="relative pt-10 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
  <div className="mb-10">
    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#bf9b30] mb-2">Guest Portal</p>
    <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
      My <span className="font-serif italic font-light text-[#bf9b30] normal-case tracking-normal">Account</span>
    </h2>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    
    {/* SIDEBAR (LEFT - COMPACT) */}
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="lg:col-span-3 bg-[#14130f] border border-white/5 rounded-2xl p-6 flex flex-col items-center"
    >
      {/* Profile Info */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#bf9b30] to-[#7a631d] p-1">
          <div className="w-full h-full rounded-full bg-[#14130f] flex items-center justify-center overflow-hidden">
             <span className="text-4xl">👤</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-black text-white uppercase tracking-tight text-center">Collyn Fernandez</h3>
      <p className="text-[10px] text-gray-500 font-medium mb-8">c.fernandez@email.com</p>

      {/* Menu Links */}
      <div className="w-full space-y-2">
        {[
          { label: "My Bookings", icon: "📅", active: true },
          { label: "Profile Settings", icon: "👤", active: false },
          { label: "Loyalty Points", icon: "👑", active: false },
          { label: "My Reviews", icon: "⭐", active: false },
          { label: "Logout", icon: "↪️", active: false },
        ].map((item, idx) => (
          <button 
            key={idx}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest ${
              item.active 
              ? "bg-[#bf9b30]/10 text-[#bf9b30] border border-[#bf9b30]/20" 
              : "text-gray-500 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </motion.div>

    {/* MAIN CONTENT: RESERVATIONS (RIGHT - SLIM LIST) */}
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="lg:col-span-9 space-y-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#bf9b30]">📂</span>
        <h3 className="text-sm font-black text-white uppercase tracking-widest">My Reservations</h3>
      </div>

      {[
        { 
          room: "Aurum Deluxe — Room 412", 
          date: "Oct 12 – Oct 18, 2025", 
          nights: "6 nights", 
          status: "CONFIRMED", 
          total: "₱27,000",
          statusColor: "text-green-500 bg-green-500/10 border-green-500/20",
          img: "/images/aurum.png"
        },
        { 
          room: "Obsidian Superior — Room 205", 
          date: "Nov 5 – Nov 7, 2025", 
          nights: "2 nights", 
          status: "UPCOMING", 
          total: "₱6,400",
          statusColor: "text-[#bf9b30] bg-[#bf9b30]/10 border-[#bf9b30]/20",
          img: "/images/obsidian.png",
          highlight: true
        },
        { 
          room: "Luminary Standard — Room 108", 
          date: "Aug 20 – Aug 22, 2025", 
          nights: "2 nights", 
          status: "COMPLETED", 
          total: "₱4,200",
          statusColor: "text-gray-500 bg-gray-500/10 border-gray-500/20",
          img: "/images/luminary.png"
        }
      ].map((res, i) => (
        <div 
          key={i} 
          className={`group flex items-center justify-between p-4 rounded-2xl bg-[#14130f] border transition-all duration-300 ${
            res.highlight ? "border-[#bf9b30]/40 shadow-lg shadow-[#bf9b30]/5" : "border-white/5"
          }`}
        >
          <div className="flex items-center gap-5">
            <div className="w-20 h-14 rounded-lg overflow-hidden border border-white/5">
              <img src={res.img} alt="" className="w-full h-full object-cover opacity-80" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">{res.room}</h4>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-[9px] text-gray-500">📅 {res.date}</p>
                <p className="text-[9px] text-[#bf9b30] font-bold">• {res.nights}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <span className={`px-3 py-1 rounded-full border text-[8px] font-black tracking-widest ${res.statusColor}`}>
              {res.status}
            </span>
            <div className="text-right min-w-[80px]">
              <p className="text-[8px] text-gray-600 font-bold uppercase leading-none">Total</p>
              <p className="text-md font-black text-[#bf9b30] tracking-tighter">{res.total}</p>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
</section>

{/* --- GUEST REVIEWS SECTION --- */}
<section id="guest-reviews" className="relative pt-10 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
  <div className="mb-10">
    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#bf9b30] mb-2">Guest Voices</p>
    <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
      Guest <span className="font-serif italic font-light text-[#bf9b30] normal-case tracking-normal">Reviews</span>
    </h2>
    <p className="text-gray-400 text-xs mt-4 max-w-md font-light leading-relaxed">
      Real experiences from our valued sanctuary guests.
    </p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
    
    {/* LEFT SIDE: Review Submission Form */}
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="lg:col-span-5 bg-[#14130f] border border-white/5 rounded-2xl p-8"
    >
      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8">Share Your Experience</h3>
      
      <form className="space-y-6">
        {/* Stay Selection */}
        <div>
          <label className="text-[9px] font-bold text-[#bf9b30] uppercase tracking-widest block mb-2">Stay</label>
          <select className="w-full bg-[#0d0c0a] border border-white/10 rounded-lg px-4 py-3 text-[11px] text-gray-400 outline-none focus:border-[#bf9b30]/50 transition-all appearance-none">
            <option>Select your stay...</option>
            <option>Aurum Deluxe</option>
            <option>Obsidian Superior</option>
            <option>The Imperial Sanctum</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="text-[9px] font-bold text-[#bf9b30] uppercase tracking-widest block mb-2">Overall Rating</label>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <button key={i} type="button" className="text-xl text-gray-700 hover:text-[#bf9b30] transition-colors">★</button>
            ))}
          </div>
        </div>

        {/* Review Title */}
        <div>
          <label className="text-[9px] font-bold text-[#bf9b30] uppercase tracking-widest block mb-2">Review Title</label>
          <input 
            type="text" 
            placeholder="Summarize your experience..." 
            className="w-full bg-[#0d0c0a] border border-white/10 rounded-lg px-4 py-3 text-[11px] text-gray-400 outline-none focus:border-[#bf9b30]/50 transition-all"
          />
        </div>

        {/* Your Review */}
        <div>
          <label className="text-[9px] font-bold text-[#bf9b30] uppercase tracking-widest block mb-2">Your Review</label>
          <textarea 
            rows="4"
            placeholder="Tell future guests about your stay..." 
            className="w-full bg-[#0d0c0a] border border-white/10 rounded-lg px-4 py-3 text-[11px] text-gray-400 outline-none focus:border-[#bf9b30]/50 transition-all resize-none"
          ></textarea>
        </div>

        <button className="w-full py-4 bg-[#bf9b30] text-[#0d0c0a] text-[11px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-[#d4ac37] transition-all shadow-lg shadow-[#bf9b30]/10">
          Submit Review
        </button>
      </form>
    </motion.div>

    {/* RIGHT SIDE: Review List */}
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="lg:col-span-7 space-y-4"
    >
      {[
        {
          name: "Ana Reyes",
          stay: "Imperial Sanctum",
          date: "Feb 2026",
          comment: "The AI concierge anticipated our every need. From restaurant recommendations to room temperature preferences — it felt like having a personal butler who already knew us.",
          rating: 5
        },
        {
          name: "Maria Santos",
          stay: "Aurum Deluxe",
          date: "Jan 2026",
          comment: "Seamless check-in via the app, absolutely gorgeous room, and the virtual room tour before arrival made us so excited. INNOVA-HMS has redefined what hospitality means.",
          rating: 5
        },
        {
          name: "Jose Dela Cruz",
          stay: "Zenith Penthouse",
          date: "Dec 2025",
          comment: "The loyalty points system is incredibly rewarding. After just three stays I was already at Gold tier with spa access and breakfast included. Worth every peso.",
          rating: 4
        }
      ].map((rev, i) => (
        <div key={i} className="bg-[#14130f] border border-white/5 p-6 rounded-2xl hover:border-[#bf9b30]/20 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#bf9b30]/10 flex items-center justify-center text-lg">👤</div>
              <div>
                <h4 className="text-[13px] font-black text-white uppercase tracking-tight">{rev.name}</h4>
                <p className="text-[9px] text-gray-500 font-bold uppercase">{rev.stay} • {rev.date}</p>
              </div>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, starIdx) => (
                <span key={starIdx} className={`text-[10px] ${starIdx < rev.rating ? 'text-[#bf9b30]' : 'text-gray-700'}`}>★</span>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-gray-400 font-light leading-relaxed italic">
            "{rev.comment}"
          </p>
        </div>
      ))}
    </motion.div>

  </div>
</section>



      {/* FOOTER: Minimal space consumption */}
      <footer className="py-8 text-center border-t border-[#bf9b30]/5 bg-[#0a0a08]">
         <p className="text-[8px] uppercase tracking-[0.6em] text-[#bf9b30]/20 font-bold">
           Innova-HMS • Redefining Hospitality
         </p>
      </footer>
    </main>
  );
}