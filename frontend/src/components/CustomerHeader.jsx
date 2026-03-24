import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  User, LogOut, Settings, ChevronDown, 
  Sun, Moon, Search, Building2, Users, ShieldCheck,
  Briefcase 
} from "lucide-react";

export default function CustomerHeader() {
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeAllDropdowns = () => {
    setIsUserDropdownOpen(false);
    setIsLoginDropdownOpen(false);
    setIsSignupDropdownOpen(false);
  };

  // --- THEME LOGIC ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
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

  // --- USER LOADING LOGIC ---
  const loadUser = () => {
    const savedCustomer = localStorage.getItem("user");
    const savedStaff = localStorage.getItem("staffUser");

    if (savedStaff) {
      const parsedStaff = JSON.parse(savedStaff);
      setUser({
        ...parsedStaff,
        displayName: parsedStaff.firstName || parsedStaff.name || "Staff",
        isStaff: true,
        role: parsedStaff.role || "Staff"
      });
    } else if (savedCustomer) {
      const parsedCustomer = JSON.parse(savedCustomer);
      setUser({
        ...parsedCustomer,
        displayName: parsedCustomer.firstName || "User",
        isStaff: false
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("userUpdated", loadUser);
    window.addEventListener("storage", loadUser); 
    return () => {
      window.removeEventListener("userUpdated", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // --- LOGOUT LOGIC (REDIRECT TO HOME) ---
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("staffUser");
    localStorage.removeItem("staffSession");
    localStorage.removeItem("hrSession");
    localStorage.removeItem("adminSession");
    localStorage.removeItem("ownerSession");

    setUser(null);
    closeAllDropdowns();

    window.dispatchEvent(new Event("userUpdated"));

    navigate("/"); 
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    closeAllDropdowns();

    if (location.pathname !== "/") {
      navigate("/");
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
  };

  const scrollToHomeSection = (sectionId) => {
    closeAllDropdowns();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 180);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="top-0 left-0 right-0 z-[1000] w-full border-b border-[#c9a84c]/20 bg-white/80 backdrop-blur-md shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 relative">
        
        {/* LEFT: LOGO */}
        <div className="flex-shrink-0 w-48">
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="relative flex items-center group"
          >
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto scale-125 origin-left" />
            <div className="h-8 w-32 sm:w-40"></div>
          </Link>
        </div>

        {/* CENTER: NAVIGATION */}
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
                scrollToHomeSection(link.id);
              }}
              className="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-all hover:bg-white hover:text-[#c9a84c] dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-4 flex-shrink-0">
          
          <div className="hidden md:flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 dark:border-white/10 dark:bg-zinc-900 focus-within:ring-1 focus-within:ring-[#c9a84c]/30 transition-all">
            <Search size={16} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Explore..." 
              className="bg-transparent text-sm outline-none dark:text-white w-24 focus:w-40 transition-all duration-300"
            />
          </div>

          <button 
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="h-8 w-[1px] bg-zinc-200 dark:bg-white/10 mx-1"></div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => {
                  const currentState = isUserDropdownOpen;
                  closeAllDropdowns();
                  setIsUserDropdownOpen(!currentState);
                }}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-white transition-all shadow-md ${
                    user.isStaff 
                    ? 'bg-[#b3903c] hover:bg-[#96772f]' 
                    : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-[#c9a84c] dark:hover:bg-[#a68a3e]'
                }`}
              >
                <div className="h-6 w-6 overflow-hidden rounded-full border border-white/20 bg-zinc-700 flex items-center justify-center">
                   {user.isStaff ? <Briefcase size={12} /> : <User size={12} />}
                </div>
                <span className="hidden sm:inline">
                    {user.displayName} {user.isStaff && `(${user.role})`}
                </span>
                <ChevronDown size={14} className={`transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl z-50 dark:border-white/10 dark:bg-zinc-900">
                  <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    {user.isStaff ? "Staff Portal Access" : "Member Account"}
                  </div>
                  {user.isStaff ? (
                    <Link
                      to="/staff/profile"
                      onClick={closeAllDropdowns}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
                    >
                      <Settings size={18} /> Profile Settings
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/customer/profile"
                        onClick={closeAllDropdowns}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
                      >
                        <Settings size={18} /> Profile Settings
                      </Link>
                    </>
                  )}
                  <div className="my-1 h-[1px] bg-zinc-100 dark:bg-white/5"></div>
                  <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                    <LogOut size={18} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* LOGIN DROPDOWN */}
              <div className="relative">
                <button 
                  onClick={() => {
                    const currentState = isLoginDropdownOpen;
                    closeAllDropdowns();
                    setIsLoginDropdownOpen(!currentState);
                  }}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-[#c9a84c] hover:text-[#a68a3e] dark:text-white"
                >
                  Login <ChevronDown size={14} className={`transition-transform ${isLoginDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLoginDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl z-50 dark:border-white/10 dark:bg-zinc-900">
                    <Link to="/customer/login" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5">
                      <Users size={18} className="text-[#c9a84c]" /> Login as Customer
                    </Link>
                    <Link to="/owner/login" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 border-t border-zinc-50 dark:border-white/5">
                      <Building2 size={18} className="text-[#c9a84c]" /> Login as Hotel Owner
                    </Link>
                    <Link to="/staff/login" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 border-t border-zinc-50 dark:border-white/5">
                      <Briefcase size={18} className="text-[#c9a84c]" /> Login as Hotel Staff
                    </Link>
                    <Link to="/superadmin/login" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 border-t border-zinc-50 dark:border-white/5">
                      <ShieldCheck size={18} className="text-[#c9a84c]" /> Superadmin
                    </Link>
                  </div>
                )}
              </div>

              {/* SIGNUP DROPDOWN */}
              <div className="relative">
                <button 
                  onClick={() => {
                    const currentState = isSignupDropdownOpen;
                    closeAllDropdowns();
                    setIsSignupDropdownOpen(!currentState);
                  }}
                  className="flex items-center gap-1 rounded-full bg-[#c9a84c] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#c9a84c]/30 transition-all hover:scale-105 hover:bg-[#a68a3e]"
                >
                  Register <ChevronDown size={14} className={`transition-transform ${isSignupDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSignupDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl z-50 dark:border-white/10 dark:bg-zinc-900">
                    <Link to="/customer/signup" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5">
                      <Users size={18} className="text-[#c9a84c]" /> Signup as Customer
                    </Link>
                    <Link to="/owner/signup" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 border-t border-zinc-100 dark:border-white/5">
                      <Building2 size={18} className="text-[#c9a84c]" /> Signup as Owner
                    </Link>
                    <Link to="/staff/signup" onClick={closeAllDropdowns} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 border-t border-zinc-100 dark:border-white/5">
                      <Briefcase size={18} className="text-[#c9a84c]" /> Sign as Staff
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
