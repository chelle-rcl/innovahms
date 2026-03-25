import { Calendar, Users, Star, MapPin, Cpu, ArrowUpRight, TrendingUp, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import Marzipano from 'marzipano'; 

export default function Home() {
  const [currentImg, setCurrentImg] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  
  // Virtual Tour State & Ref
  const panoRef = useRef(null);
  const [isTourActive, setIsTourActive] = useState(false);

  const images = ["/images/hero-bg-img.png", "/images/suite-luxury.jpg"];

  const collaboratingHotels = [
    { name: "Obsidian Sanctuary", location: "Metropolis Hub", image: "/images/signup-img.png", spec: "Neural-Link Integrated", forecast: "Optimal" },
    { name: "Horizon Vista", location: "Skyline District", image: "/images/signup-img.png", spec: "Prophet AI Analytics", forecast: "Stable" },
    { name: "Kinetic Royal", location: "Coastal Sector", image: "/images/signup-img.png", spec: "Biometric v.2", forecast: "Peak" },
    { name: "Radiant Plaza", location: "Central Node", image: "/images/signup-img.png", spec: "Predictive Comfort", forecast: "Optimal" }
  ];

  const benefits = [
    "True-to-scale spatial rendering",
    "Interactive smart amenity testing",
    "Live view from actual room window"
  ];

  useEffect(() => {
    setIsBooted(true);
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (isTourActive && panoRef.current) {
      const viewerOpts = { controls: { mouseViewMode: 'drag' } };
      const viewer = new Marzipano.Viewer(panoRef.current, viewerOpts);
      const source = Marzipano.ImageUrlSource.fromString("/images/my-room-360.jpg");
      const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
      const limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
      const view = new Marzipano.RectilinearView(null, limiter);

      const scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
      });

      scene.switchTo();
    }
  }, [isTourActive]);

  return (
    <main className="relative min-h-screen w-full bg-[#0d0c0a] font-sans selection:bg-[#bf9b30]/30 overflow-x-hidden text-[#e5e1d8]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.25, x: "2%", y: "-1%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, ease: "linear" }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentImg]})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1812]/40 via-[#0d0c0a]/60 to-[#0d0c0a]" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={isBooted ? { opacity: 1, y: 0 } : {}} className="mb-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#bf9b30]/80">The Evolution of Travel</h2>
            <h1 className="mt-4 text-7xl md:text-[10rem] font-black tracking-tighter leading-none bg-gradient-to-b from-[#f5f1da] to-[#bf9b30] bg-clip-text text-transparent drop-shadow-2xl">
              INNOVA<span className="text-[#bf9b30]">.</span>HMS
            </h1>
          </motion.div>

          <div className="max-w-2xl">
            <motion.p initial={{ opacity: 0 }} animate={isBooted ? { opacity: 0.8 } : {}} transition={{ delay: 0.4 }} className="mt-2 text-[12px] md:text-sm leading-relaxed tracking-[0.1em] text-[#e5e1d8] font-light italic">
              INNOVA-HMS is designed to provide guests with a smarter, faster, and more convenient hotel experience.
            </motion.p>
          </div>
        </div>
      </section>
  
      {/* --- ACCOMMODATIONS SECTION --- */}
      <section id="hotels" className="relative pt-20 pb-10 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="font-serif italic text-[#bf9b30] text-2xl md:text-3xl mb-1 tracking-wide">
              Accommodations
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase mb-4">
              Our <span className="text-[#bf9b30]">HOTELS</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-lg">
              Each room is a sanctuary of comfort and innovation, crafted for the modern traveler.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:flex items-center gap-2 text-[#bf9b30] text-[10px] font-black uppercase tracking-[0.3em] cursor-pointer hover:gap-4 transition-all"
          >
            View All Hotels <ArrowUpRight size={18} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collaboratingHotels.map((hotel, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#14130f] rounded-xl border border-[#bf9b30]/10 overflow-hidden shadow-lg hover:border-[#bf9b30]/30 transition-all duration-500"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-transparent opacity-90" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1 text-[#bf9b30]/60">
                  <MapPin size={10} />
                  <span className="text-[9px] uppercase tracking-widest font-bold">{hotel.location}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-4 group-hover:text-[#bf9b30] transition-colors uppercase tracking-wide leading-tight">
                  {hotel.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- VIRTUAL TOUR SECTION --- */}
      <section className="py-20 bg-[#0d0c0a] text-[#e5e1d8] overflow-hidden text-left border-t border-[#bf9b30]/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Viewer Side */}
          <div className="relative group h-[500px] w-full">
            <div 
              ref={panoRef}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            />

            {!isTourActive && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl overflow-hidden">
                <img 
                  src="/images/my-room-360.jpg" 
                  alt="Virtual Tour Preview" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                <button 
                  onClick={() => setIsTourActive(true)}
                  className="relative z-30 w-20 h-20 bg-[#bf9b30] rounded-full flex items-center justify-center border border-white/30 animate-pulse hover:scale-110 transition-transform shadow-2xl"
                >
                  <span className="text-3xl text-white">🔄</span>
                </button>
              </div>
            )}

            <div className="absolute -bottom-6 -right-6 bg-[#14130f] p-6 rounded-xl border border-[#bf9b30]/20 hidden md:flex gap-8 shadow-2xl z-40">
              <div>
                <p className="text-2xl font-black text-[#bf9b30]">98%</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Accuracy</p>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="text-2xl font-black text-[#bf9b30]">4K</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Resolution</p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-6">
            <p className="text-[#bf9b30] font-black tracking-widest text-sm uppercase">
              Immersive Exploration
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Explore before <br className="hidden md:block" /> you arrive.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Step inside our world from the comfort of your home. Our AI-driven 360° virtual tours 
              allow you to inspect every corner.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-[#bf9b30] text-xl font-black">✔</span>
                  <span className="text-gray-200 font-bold">{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => setIsTourActive(true)}
              className="mt-8 bg-[#bf9b30] hover:bg-[#a68628] text-white px-10 py-4 rounded-xl font-black transition-all duration-300 transform hover:scale-105 shadow-xl shadow-yellow-900/20 uppercase tracking-widest text-sm"
            >
              {isTourActive ? "Viewing 360° Mode" : "Start Virtual Tour"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}