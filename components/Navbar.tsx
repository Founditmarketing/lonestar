import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Hammer, FileText, ChevronRight, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (id: string, path?: string) => {
    if (path) {
      navigate(path);
      window.scrollTo(0, 0);
      setIsMobileMenuOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Reordered Items for better flow: Product -> Tool -> Location -> Trust
  const navItems = [
    { label: 'Models', id: 'models', path: '/models' },
    { label: 'Design Studio', id: 'design-studio' },
    { label: 'About Us', id: 'about', path: '/about' },
    { label: 'Locations', id: 'locations', path: '/locations' },
  ];

  const isTransparent = !isScrolled && location.pathname === '/';
  const textColorClass = isTransparent ? 'text-white' : 'text-slate-900';
  const hoverColorClass = isTransparent ? 'text-white' : 'text-wood-600';

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        !isTransparent 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-wood-100 py-3' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2.5 group relative z-50">
          <div className={`p-2 rounded-xl transition-all duration-300 ${!isTransparent ? 'bg-wood-900 text-white shadow-lg' : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'}`}>
            <Hammer size={22} strokeWidth={2.5} />
          </div>
          <div>
             <span className={`text-xl md:text-2xl font-serif font-bold tracking-tight block leading-none transition-colors ${textColorClass}`}>
              LONE STAR
            </span>
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${!isTransparent ? 'text-wood-600' : 'text-wood-200'}`}>
              Premium Sheds
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              onClick={() => handleNavClick(item.id, item.path)}
              className={`group relative text-sm font-medium tracking-wide transition-colors py-2 ${
                 !isTransparent ? 'text-slate-600 hover:text-wood-900' : 'text-white/90 hover:text-white'
              }`}
            >
              {item.label}
              {/* Elegant underline animation */}
              <span className={`absolute -bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${!isTransparent ? 'bg-wood-500' : 'bg-white'}`}></span>
            </button>
          ))}
          
          {/* Vertical Divider */}
          <div className={`h-6 w-px ${!isTransparent ? 'bg-slate-200' : 'bg-white/20'}`}></div>

          {/* Brochure Link */}
          <a 
            href="https://lonestarshedsllc.com/wp-content/uploads/2024/11/lonestar-sheds-brochure-nov-2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-75 transition-opacity ${textColorClass}`}
          >
            <FileText size={16} />
            Brochure
          </a>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <a href="tel:+15555555555" className={`font-serif font-bold text-lg hover:opacity-75 transition-opacity ${textColorClass}`}>
            (555) 123-4567
          </a>
          <button 
            onClick={() => navigate('/configure')} 
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 ${
                !isTransparent 
                ? 'bg-gold-500 text-slate-900 hover:bg-gold-400' 
                : 'bg-white text-wood-900 hover:bg-wood-50'
            }`}
          >
            Get a Quote
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className={`md:hidden relative z-50 p-2 transition-colors ${textColorClass}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} className="text-slate-900" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 md:hidden flex flex-col ${
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex-1 flex flex-col justify-center px-8 gap-8">
           <div className="space-y-6">
             {navItems.map((item, idx) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.id, item.path)}
                className="group flex items-center justify-between w-full text-3xl font-serif font-bold text-slate-900 hover:text-wood-600 transition-colors border-b border-slate-100 pb-4"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {item.label}
                <ChevronRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-wood-500" />
              </button>
            ))}
           </div>
           
           <div className="space-y-4 pt-8">
              <a 
                href="https://lonestarshedsllc.com/wp-content/uploads/2024/11/lonestar-sheds-brochure-nov-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-600 font-medium"
              >
                <div className="bg-wood-50 p-3 rounded-full text-wood-600">
                    <FileText size={20} />
                </div>
                View Digital Brochure
              </a>
              <a 
                href="tel:5551234567"
                className="flex items-center gap-3 text-slate-600 font-medium"
              >
                <div className="bg-wood-50 p-3 rounded-full text-wood-600">
                    <Phone size={20} />
                </div>
                (555) 123-4567
              </a>
           </div>

           <button onClick={() => { navigate('/configure'); setIsMobileMenuOpen(false); }} className="bg-gold-500 text-slate-900 w-full py-5 rounded-2xl font-bold text-xl shadow-xl mt-4 flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-gold-400">
             Start Your Build <ArrowRight />
           </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;