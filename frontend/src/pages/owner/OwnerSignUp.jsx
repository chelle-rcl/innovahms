import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Building2, ArrowRight } from 'lucide-react';

export default function OwnerSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', contactNumber: '', password: '', hotelName: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/owner/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (res.ok) {
        // Create the session immediately
        const sessionPayload = {
          id: data.owner.id,
          firstName: data.owner.firstName,
          lastName: data.owner.lastName,
          email: data.owner.email,
          hotelName: data.owner.hotelName,
          lastLogin: new Date().toISOString()
        };

        localStorage.setItem('ownerSession', JSON.stringify(sessionPayload));
        
        // Redirect directly to the dashboard index
        navigate('/owner'); 
      } else {
        alert(data.error || "Signup failed.");
      }
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-innova-gold/10 overflow-hidden flex flex-col md:flex-row">
        
        {/* Branding Side */}
        <div className="md:w-1/3 bg-innova-gold p-8 text-white flex flex-col justify-center">
          <Building2 size={40} className="mb-4" />
          <h2 className="text-2xl font-serif font-bold">Partner with Innova</h2>
          <p className="text-sm opacity-80 mt-2">Scale your hospitality business with our smart management tools.</p>
        </div>

        {/* Form Side */}
        <form onSubmit={handleSubmit} className="md:w-2/3 p-8 space-y-4">
          <h3 className="text-xl font-serif text-slate-800 mb-6">Create Owner Account</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" required className="signup-input" 
              onChange={e => setFormData({...formData, firstName: e.target.value})} />
            <input type="text" placeholder="Last Name" required className="signup-input" 
              onChange={e => setFormData({...formData, lastName: e.target.value})} />
          </div>

          <input type="text" placeholder="Hotel Name" required className="signup-input w-full" 
            onChange={e => setFormData({...formData, hotelName: e.target.value})} />

          <input type="email" placeholder="Business Email" required className="signup-input w-full" 
            onChange={e => setFormData({...formData, email: e.target.value})} />

          <input type="text" placeholder="Contact Number" required className="signup-input w-full" 
            onChange={e => setFormData({...formData, contactNumber: e.target.value})} />

          <input type="password" placeholder="Password" required className="signup-input w-full" 
            onChange={e => setFormData({...formData, password: e.target.value})} />

          <button type="submit" className="w-full py-3 bg-innova-gold text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all">
            Register Property <ArrowRight size={18} />
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            Already have an account? <Link to="/owner/login" className="text-innova-gold font-bold">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}