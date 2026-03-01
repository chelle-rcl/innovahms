import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-innova-sky/70 bg-innova-light/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Left: Logo */}
        <Link to="/" className="relative flex items-center group">
          <img 
            src="/images/logo.png" 
            alt="INNOVA-HMS Logo" 
            className="h-10 w-auto scale-125 origin-left object-contain 
                      filter drop-shadow-[0_0_2px_#fff_0_0_10px_rgba(191,155,48,0.5)]
                      transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(191,155,48,0.8)]" 
          />
          <div className="h-8 w-32 sm:w-40 pointer-events-none"></div>
        </Link>

        {/* Center: Main Links */}
        <nav className="hidden absolute left-1/2 -translate-x-1/2 lg:flex items-center gap-6 text-sm font-medium text-[#bf9b30]">
          {[
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: "About Us", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-2 py-1 rounded-full transition-all duration-200 hover:bg-black hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link 
            to="/login" 
            className="hidden sm:block text-sm font-medium text-[#bf9b30] border border-[#bf9b30] 
                      rounded-[50px] px-3 py-1.5 transition-all duration-300 
                      hover:-translate-y-[2px] hover:shadow-md"
          >
            Login
          </Link>
          
          <Link 
            to="/signup" 
            className="rounded-[50px] bg-innova-blue px-4 py-1.5 text-sm font-semibold text-white 
                      transition-all duration-300 shadow-sm 
                      hover:-translate-y-[2px] hover:shadow-md"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
}