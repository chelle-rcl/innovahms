import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  User, LogOut, Settings, ChevronDown, 
  Sun, Moon, Search, Building2, Users 
} from "lucide-react";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Unified closer for all dropdowns
  const closeAllDropdowns = () => {
    setIsUserDropdownOpen(false);
    setIsLoginDropdownOpen(false);
    setIsSignupDropdownOpen(false);
  };

  // Handle Theme Change
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const loadUser = () => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser ? JSON.parse(savedUser) : null);
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("userUpdated", loadUser);
    return () => window.removeEventListener("userUpdated", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    closeAllDropdowns();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-500/20 bg-white/70 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        
        {/* Left: Logo Section */}
        <Link to="/" className="relative flex items-center group">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-auto scale-125 origin-left" />
          <div className="h-8 w-32 sm:w-40"></div>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100/50 p-1 dark:border-white/10 dark:bg-white/5">
          {[
            { name: "Suites", id: "suites" },
            { name: "Hotels", id: "hotels" },
            { name: "Promotions", id: "promotions" },
            { name: "AI Concierge", id: "ai-concierge" }
          ].map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-all hover:bg-white hover:text-[#bf9b30] hover:shadow-sm dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Actions Section */}
        <div className="flex items-center gap-4">
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 dark:border-white/10 dark:bg-zinc-900">
            <Search size={16} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Explore..." 
              className="bg-transparent text-sm outline-none dark:text-white w-24 focus:w-40 transition-all duration-300"
            />
          </div>

          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="h-8 w-[1px] bg-zinc-200 dark:bg-white/10 mx-1"></div>

          {user ? (
            /* USER LOGGED IN DROPDOWN */
            <div className="relative">
              <button 
                onClick={() => {
                  const currentState = isUserDropdownOpen;
                  closeAllDropdowns();
                  setIsUserDropdownOpen(!currentState);
                }}
                className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 dark:bg-[#bf9b30]"
              >
                <div className="h-6 w-6 overflow-hidden rounded-full border border-white/20 bg-zinc-700 flex items-center justify-center">
                   <User size={14} />
                </div>
                <span className="hidden sm:inline">{user.firstName}</span>
                <ChevronDown size={14} className={`transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-900">
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">Account</div>
                  <Link to="/profile" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5">
                    <Settings size={18} /> Profile Settings
                  </Link>
                  <div className="my-1 h-[1px] bg-zinc-100 dark:bg-white/5"></div>
                  <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                    <LogOut size={18} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* AUTH DROPDOWNS (LOGIN & SIGNUP) */
            <div className="flex items-center gap-2">
              
              {/* Login Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => {
                    const currentState = isLoginDropdownOpen;
                    closeAllDropdowns();
                    setIsLoginDropdownOpen(!currentState);
                  }}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-[#bf9b30] hover:text-[#a68628] dark:text-white"
                >
                  Login <ChevronDown size={14} className={`transition-transform ${isLoginDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLoginDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-900">
                    <Link to="/login" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5">
                      <Users size={18} className="text-[#bf9b30]" /> Login as Customer
                    </Link>
                    <Link to="/owner/login" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 border-t border-zinc-100 dark:border-white/5">
                      <Building2 size={18} className="text-[#bf9b30]" /> Login as Owner
                    </Link>
                  </div>
                )}
              </div>

              {/* Signup Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => {
                    const currentState = isSignupDropdownOpen;
                    closeAllDropdowns();
                    setIsSignupDropdownOpen(!currentState);
                  }}
                  className="flex items-center gap-1 rounded-full bg-[#bf9b30] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#bf9b30]/30 transition-all hover:scale-105 hover:bg-[#a68628]"
                >
                  REGISTER <ChevronDown size={14} className={`transition-transform ${isSignupDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSignupDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-900">
                    <Link to="/signup" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5">
                      <Users size={18} className="text-[#bf9b30]" /> Signup as Customer
                    </Link>
                    <Link to="/owner/signup" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 border-t border-zinc-100 dark:border-white/5">
                      <Building2 size={18} className="text-[#bf9b30]" /> Signup as Owner
                    </Link>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}