import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Search, User, Mail, MessageSquare, Map as MapIcon, Image as ImageIcon } from 'lucide-react';
import { DEALERSHIPS } from '../data/dealerships';

const DealershipLocator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleMaps, setVisibleMaps] = useState<Set<string>>(new Set());

  const toggleMap = (id: string) => {
    setVisibleMaps(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredDealers = DEALERSHIPS.filter(d => 
    d.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.zip.includes(searchTerm) ||
    (d.contactName && d.contactName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-wood-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Search */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="bg-wood-500 w-8 h-1 rounded-full"></div>
             <span className="text-wood-800 text-sm font-bold tracking-widest uppercase">Our Network</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Find Your Local Expert
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Our dealers are more than just sales centers—they are local experts ready to help you design the perfect building.
          </p>
          
          <div className="relative max-w-lg mx-auto">
            <input 
              type="text"
              placeholder="Search by City, Zip, or Agent Name..."
              className="w-full p-4 pl-12 rounded-full border border-slate-200 shadow-lg focus:ring-2 focus:ring-wood-500 outline-none text-lg transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          </div>
        </div>

        {/* Results Info */}
        <div className="text-center mb-8 text-slate-500 text-sm">
           Showing {filteredDealers.length} location{filteredDealers.length !== 1 && 's'}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDealers.map((dealer) => {
            const isMapVisible = visibleMaps.has(dealer.id);
            
            return (
              <div key={dealer.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-wood-100 flex flex-col group h-full">
                {/* Image/Map Header */}
                <div className="h-56 relative bg-slate-100 group-hover:shadow-inner transition-all">
                   {isMapVisible ? (
                     <iframe 
                       title={`Map of ${dealer.name}`}
                       width="100%" 
                       height="100%" 
                       frameBorder="0" 
                       scrolling="no" 
                       loading="lazy"
                       src={`https://maps.google.com/maps?q=${encodeURIComponent(dealer.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                       className="absolute inset-0 w-full h-full animate-fade-in"
                     />
                   ) : (
                     <>
                        <img 
                          src={dealer.image} 
                          alt={dealer.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-4 left-4 text-white pointer-events-none z-10">
                          <h3 className="font-bold text-xl">{dealer.city}, TX</h3>
                          {dealer.contactName && (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-wood-200 mt-1">
                                <User size={12} />
                                Ask for {dealer.contactName.split(' ')[0]}
                            </div>
                          )}
                        </div>
                     </>
                   )}
                   
                   {/* Toggle Button */}
                   <button 
                     onClick={() => toggleMap(dealer.id)}
                     className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-white text-slate-900 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm transition-all flex items-center gap-2 text-xs font-bold border border-white/50 hover:shadow-xl hover:text-wood-600"
                   >
                      {isMapVisible ? (
                        <>
                          <ImageIcon size={14} />
                          <span>Show Photo</span>
                        </>
                      ) : (
                        <>
                          <MapIcon size={14} />
                          <span>View Map</span>
                        </>
                      )}
                   </button>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-start justify-between gap-2">
                      {dealer.name}
                  </h2>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-start gap-3 text-slate-600">
                      <MapPin size={18} className="text-wood-500 mt-1 shrink-0" />
                      <p className="text-sm">
                        {dealer.address}
                      </p>
                    </div>
                    
                    {/* Phone Section */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-slate-600">
                          <Phone size={18} className="text-wood-500 shrink-0" />
                          <a href={`tel:${dealer.phone.replace(/\D/g,'')}`} className="text-sm hover:text-wood-800 font-medium transition-colors">
                          {dealer.phone} <span className="text-xs text-slate-400 font-normal">(Office)</span>
                          </a>
                        </div>
                        
                        {dealer.cell && (
                           <div className="flex items-center gap-3 text-slate-600">
                              <MessageSquare size={18} className="text-green-600 shrink-0" />
                              <div className="flex gap-2 text-sm">
                                  <a href={`tel:${dealer.cell.replace(/\D/g,'')}`} className="hover:text-wood-800 font-medium">
                                      {dealer.cell}
                                  </a>
                                  <span className="text-xs text-slate-400 mt-0.5">(Cell)</span>
                              </div>
                           </div>
                        )}
                    </div>
                    
                    {dealer.email && (
                      <div className="flex items-center gap-3 text-slate-600">
                          <Mail size={18} className="text-wood-500 shrink-0" />
                          <a href={`mailto:${dealer.email}`} className="text-sm hover:text-wood-800 transition-colors truncate">
                          {dealer.email}
                          </a>
                      </div>
                    )}

                    {dealer.hours && (
                      <div className="flex items-center gap-3 text-slate-600 bg-wood-50 p-2 rounded-lg">
                          <Clock size={18} className="text-wood-500 shrink-0" />
                          <p className="text-xs font-medium">{dealer.hours}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                      <a 
                      href={dealer.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-white border border-slate-200 hover:border-wood-500 text-slate-700 hover:text-wood-600 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                      >
                      <Navigation size={16} />
                      Directions
                      </a>
                      
                      {dealer.cell ? (
                           <a 
                           href={`sms:${dealer.cell.replace(/\D/g,'')}`}
                           className="py-2.5 px-4 bg-wood-500 hover:bg-wood-600 text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                           >
                           <MessageSquare size={16} />
                           Text Agent
                           </a>
                      ) : (
                          <a 
                          href={`tel:${dealer.phone.replace(/\D/g,'')}`}
                          className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                          >
                          <Phone size={16} />
                          Call Now
                          </a>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Empty State */}
        {filteredDealers.length === 0 && (
            <div className="text-center py-20 opacity-50">
                <Search size={48} className="mx-auto mb-4" />
                <p>No dealerships found matching "{searchTerm}". Try a different city.</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default DealershipLocator;