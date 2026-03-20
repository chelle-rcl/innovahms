import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Facebook } from "lucide-react"; // Added Facebook icon
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from 'react-facebook-login'; // Standard import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("userUpdated")); // Better than a full reload
        navigate("/");
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("Cannot connect to server. Ensure Flask is running.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch("/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("userUpdated"));
        navigate("/");
      } else {
        setError(data.error || "Google login failed.");
      }
    } catch (err) {
      setError("Failed to connect to the server for Google login.");
    }
  };

  const responseFacebook = async (response) => {
    if (response.accessToken) {
      try {
        const res = await fetch("/api/facebook-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: response.accessToken }),
        });
        const result = await res.json();
        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(result.user));
          window.dispatchEvent(new Event("userUpdated"));
          navigate("/");
        } else {
          setError(result.error || "Facebook Login failed.");
        }
      } catch (err) {
        setError("Server connection error.");
      }
    }
  };

  return (
    <div 
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-12"
      style={{ backgroundImage: "url('/images/login-bg-img.png')" }}
    >
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
      <div className="relative z-10 w-full max-w-md mt-16 mb-8 rounded-2xl border border-white/20 bg-white/95 p-10 shadow-2xl backdrop-blur-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#bf9b30]">Welcome Back</h2>
          <p className="mt-3 text-sm font-medium text-slate-700">Login to Your Account</p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-800 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 transition-all focus:border-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-600/10"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-800 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500"><Lock size={18} /></div>
              <input type={showPassword ? "text" : "password"} required className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-12 text-sm text-slate-900 transition-all focus:border-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-600/10" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-800">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p className="mt-2 text-red-500 text-xs font-medium flex items-center gap-1"><span className="w-3 h-3 border border-red-500 rounded-full flex items-center justify-center text-[8px]">!</span> {error}</p>}
          </div>

          <button type="submit" className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-[#bc9a33] py-3.5 text-sm font-bold text-white shadow-lg shadow-yellow-700/20 transition-all hover:bg-[#a6882d] hover:shadow-yellow-700/30 active:scale-[0.98]">
            Log In <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 font-bold text-slate-400">Or continue with</span></div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <GoogleLogin 
            onSuccess={handleGoogleSuccess} 
            onError={() => setError("Google Login Failed")}
            theme="outline"
            shape="pill"
            width="250px"
          />

          <div style={{ display: 'none' }}>
            <FacebookLogin
              appId="760975413559116"
              callback={responseFacebook}
              fields="name,email,picture"
              tag={({ onClick }) => (
                <button id="hidden-fb-login" onClick={onClick} />
              )}
            />
          </div>

          <button 
            type="button"
            onClick={() => document.getElementById('hidden-fb-login').click()}
            className="flex items-center justify-center gap-3 w-[250px] px-4 py-2 border border-slate-300 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Facebook size={18} className="text-[#1877F2] fill-[#1877F2]" />
            <span>Continue with Facebook</span>
          </button>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
          <p className="text-sm font-medium text-slate-800">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#bc9a33] hover:text-[#a6882d] hover:underline decoration-2 underline-offset-4">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}