import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, FileText, ChevronRight, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navItems = [
    { label: 'Models', id: 'models', path: '/models' },
    { label: 'Design Studio', id: 'design-studio', path: '/configure' },
    { label: 'About Us', id: 'about', path: '/about' },
    { label: 'Locations', id: 'locations', path: '/locations' },
  ];

  const isTransparent = !isScrolled && location.pathname === '/';
  const textColorClass = isTransparent ? 'text-white' : 'text-slate-800';

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'top-4 px-4 sm:px-6' : 'top-0 px-0'
        }`}
      >
        <div className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-500 ${
          isScrolled 
            ? 'glass rounded-3xl py-3 px-6 sm:px-8 shadow-2xl shadow-wood-900/5 border-white/40' 
            : 'bg-transparent py-6 px-6 sm:px-8'
        }`}>
          <Link to="/" className="flex items-center gap-2.5 group relative z-50">
            <div className="bg-white/90 p-1.5 rounded-xl transition-all duration-300">
              <img 
                src="https://lonestarshedsllc.com/wp-content/uploads/2022/08/LONE-STARSHEDS-LLC-3.png" 
                alt="Lone Star Sheds Logo" 
                className="h-10 sm:h-12 w-auto object-contain transition-all duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.id, item.path)}
                className={`group relative text-sm font-semibold tracking-wide transition-colors py-2 ${
                   !isTransparent ? 'text-wood-600 hover:text-wood-900' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-0 left-0 w-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full ${!isTransparent ? 'bg-gold-500' : 'bg-white'}`}></span>
              </button>
            ))}
            
            <div className={`h-4 w-px ${!isTransparent ? 'bg-wood-200' : 'bg-white/20'}`}></div>

            <a 
              href="https://lonestarshedsllc.com/wp-content/uploads/2024/11/lonestar-sheds-brochure-nov-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 hover:opacity-75 transition-opacity ${textColorClass}`}
            >
              <FileText size={16} />
              Brochure
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:2545550198" className={`font-serif font-bold text-lg hover:opacity-75 transition-opacity tracking-wide ${textColorClass}`}>
              (254) 555-SHED
            </a>
            <button 
              onClick={() => navigate('/configure')} 
              className={`px-7 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group ${
                  !isTransparent 
                  ? 'bg-slate-900 text-white hover:bg-wood-800' 
                  : 'glass text-white hover:bg-white/20'
              }`}
            >
              Get a Quote
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden relative z-50 p-2 transition-colors ${textColorClass} ${isMobileMenuOpen ? '!text-slate-900' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 lg:hidden flex flex-col pt-24"
          >
            <div className="flex-1 flex flex-col justify-center px-8 gap-8 pb-12">
               <div className="space-y-4">
                 {navItems.map((item, idx) => (
                  <motion.button 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.label} 
                    onClick={() => handleNavClick(item.id, item.path)}
                    className="group flex items-center justify-between w-full text-4xl font-serif font-bold text-slate-900 hover:text-wood-600 transition-colors border-b border-wood-100 pb-4"
                  >
                    {item.label}
                    <ChevronRight size={28} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold-500" />
                  </motion.button>
                ))}
               </div>
               
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 pt-8"
               >
                  <a 
                    href="https://lonestarshedsllc.com/wp-content/uploads/2024/11/lonestar-sheds-brochure-nov-2024.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-wood-700 font-semibold"
                  >
                    <div className="bg-wood-50 p-4 rounded-2xl text-wood-600">
                        <FileText size={20} />
                    </div>
                    View Digital Brochure
                  </a>
                  <a 
                    href="tel:2545550198"
                    className="flex items-center gap-4 text-wood-700 font-semibold"
                  >
                    <div className="bg-wood-50 p-4 rounded-2xl text-wood-600">
                        <Phone size={20} />
                    </div>
                    (254) 555-SHED
                  </a>
               </motion.div>

               <motion.button 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 onClick={() => { navigate('/configure'); setIsMobileMenuOpen(false); }} 
                 className="bg-slate-900 text-white w-full py-5 rounded-2xl font-bold text-xl shadow-xl shadow-slate-900/20 mt-4 flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-wood-800"
               >
                 Start Your Build <ArrowRight />
               </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;