import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check LocalStorage when the component loads
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-innova-gold/70 bg-innova-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Left: Logo */}
        <Link to="/" className="relative flex items-center group">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-auto scale-125 origin-left" />
          <div className="h-8 w-32 sm:w-40"></div>
        </Link>

        {/* Center: Main Links */}
        <nav className="hidden absolute left-1/2 -translate-x-1/2 lg:flex items-center gap-6 text-sm font-medium text-[#bf9b30]">
          {[{ name: "Home", path: "/" }, { name: "Features", path: "/features" }, { name: "About", path: "/about" }, { name: "Contact", path: "/contact" }].map((link) => (
            <Link key={link.name} to={link.path} className="px-2 py-1 rounded-full hover:bg-black hover:text-white transition-all">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Auth Buttons OR User Dropdown */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              {/* User Toggle Button */}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-innova-gold/50 bg-white px-4 py-2 text-sm font-semibold text-[#bf9b30] shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-innova-gold text-white">
                  <User size={14} />
                </div>
                <span>{user.firstName}</span>
                <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-2 shadow-xl ring-1 ring-black/5">
                  <Link 
                    to="/profile" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#bf9b30]"
                  >
                    <Settings size={16} /> Profile Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block text-sm font-medium text-[#bf9b30] border border-[#bf9b30] rounded-[50px] px-3 py-1.5 transition-all hover:-translate-y-[2px]">
                Login
              </Link>
              <Link to="/signup" className="rounded-[50px] bg-innova-gold px-4 py-1.5 text-sm font-semibold text-white transition-all hover:-translate-y-[2px]">
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}