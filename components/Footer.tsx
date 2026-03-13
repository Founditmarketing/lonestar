import React from 'react';
import { Facebook, Instagram, Hammer, FileText, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-wood-900">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6 text-white group">
            <Hammer size={24} className="group-hover:text-wood-500 transition-colors" />
            <span className="text-xl font-serif font-bold">LONE STAR SHEDS</span>
          </Link>
          <p className="text-sm leading-relaxed mb-6 text-slate-400">
            Handcrafted outdoor structures built with integrity. Offering 50-year warranty LP SmartSide® siding and hurricane-rated framing.
          </p>
          <div className="flex gap-4">
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-wood-500 hover:text-white transition-all"><Facebook size={18} /></a>
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-wood-500 hover:text-white transition-all"><Instagram size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Inventory</h4>
          <ul className="space-y-4 text-sm text-slate-300">
            <li><Link to="/models" className="hover:text-wood-500 transition-colors block">Barns & Lofts</Link></li>
            <li><Link to="/models" className="hover:text-wood-500 transition-colors block">Utility Sheds</Link></li>
            <li><Link to="/models" className="hover:text-wood-500 transition-colors block">Cabins</Link></li>
            <li><Link to="/models" className="hover:text-wood-500 transition-colors block">Garages</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-slate-300">
            <li><Link to="/about" className="hover:text-wood-500 transition-colors block">About Us</Link></li>
            <li>
                <a href="https://lonestarshedsllc.com/wp-content/uploads/2024/11/lonestar-sheds-brochure-nov-2024.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-wood-500 transition-colors flex items-center gap-2">
                    <FileText size={14} /> Download Brochure
                </a>
            </li>
            <li><Link to="/configure" className="hover:text-wood-500 transition-colors block">Site Prep Guide</Link></li>
            <li><Link to="/configure" className="hover:text-wood-500 transition-colors block">Rent-to-Own Info</Link></li>
            <li><Link to="/locations" className="hover:text-wood-500 transition-colors block">Dealer Network</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <div className="flex items-start gap-3 mb-6">
             <MapPin size={18} className="text-wood-500 mt-1 shrink-0" />
             <div>
               <p className="text-sm text-slate-300 font-medium">Headquarters & Sales</p>
               <Link to="/locations" className="text-xs text-slate-400 hover:text-wood-400 underline decoration-slate-600 underline-offset-2">
                 Find a Location Near You
               </Link>
             </div>
          </div>
          <a href="tel:5551234567" className="text-white font-bold hover:text-wood-500 transition-colors block mb-2 text-lg">(555) 123-4567</a>
          <a href="mailto:sales@lonestarsheds.com" className="text-sm hover:text-white transition-colors text-slate-400">sales@lonestarsheds.com</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Lone Star Sheds LLC. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;