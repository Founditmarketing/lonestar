import React from 'react';
import { ArrowRight, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToDesign = () => {
    const element = document.getElementById('design-studio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1587582423116-ec07293f0395?q=80&w=2070&auto=format&fit=crop" 
          alt="Modern Backyard Studio" 
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
            <div className="bg-gold-500 w-8 h-1 rounded-full"></div>
            <span className="text-wood-100 text-sm font-bold tracking-widest uppercase">Serving Central Texas Since 2005</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-lg animate-fade-in-up delay-100">
            Solid Construction.<br />
            <span className="text-wood-200">Honest Pricing.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-xl drop-shadow-md font-light animate-fade-in-up delay-200">
            Handcrafted workspaces, storage, and studios built to withstand Texas weather. Delivered fully assembled to your backyard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <button 
              onClick={() => navigate('/models')}
              className="bg-gold-500 hover:bg-gold-400 text-slate-900 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/20"
            >
              View Inventory
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollToDesign}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Wrench size={18} className="text-gold-400"/>
              Design Your Shed
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-wood-50 to-transparent"></div>
    </section>
  );
};

export default Hero;