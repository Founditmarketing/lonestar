import React, { useState } from 'react';
import { ArrowUpRight, X, Check, ArrowRight, Ruler, Star, Sparkles, Phone } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShedModel } from '../types';
import { MODELS } from '../data/models';

const Models: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeModel, setActiveModel] = useState<ShedModel | null>(null);

  const categoryFilter = searchParams.get('category');

  const filteredModels = categoryFilter
    ? MODELS.filter(m => m.category === categoryFilter)
    : MODELS;

  const handleCustomize = (model: ShedModel) => {
    navigate(`/configure?style=${model.configKey}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-wood-50 min-h-screen">
      {/* Hero Header for Models Page */}
      <div className="relative pt-40 pb-24 px-6 text-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
           <img 
              src="/images/real/scraped-8.png" 
              alt="Lone Star Sheds Catalog" 
              className="w-full h-full object-cover opacity-20"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="inline-flex items-center gap-2 mb-6"
            >
                <div className="bg-gold-500 w-8 h-1 rounded-full"></div>
                <span className="text-wood-200 text-sm font-bold tracking-[0.2em] uppercase">The Collection</span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-xl"
            >
                {categoryFilter ? (
                  <>{categoryFilter} <span className="text-wood-300 italic">Collection</span></>
                ) : (
                  <>Masterfully <span className="text-wood-300 italic">Built</span></>
                )}
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-300 max-w-2xl mx-auto text-xl font-light leading-relaxed"
            >
            From basic storage to habitable cabins, explore our range of handcrafted buildings. 
            Fully customizable. Built for Texas.
            </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        {categoryFilter === 'Cottages' && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24 flex flex-col gap-16"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-serif font-bold text-slate-900 mb-8 relative inline-block tracking-wide">
                  C O T T A G E S
                  <div className="absolute -bottom-3 left-0 w-24 h-1 bg-gold-500 rounded-full"></div>
                </h2>
                <div className="space-y-6 text-lg text-slate-700 font-light leading-relaxed">
                  <p>
                    Do you remember the little dwelling where Grandma lived? That little cottage under the elm that smelled of pumpkin pie? Did you ever wish to visit there again or to live there? To enjoy the pleasures of less house to clean, less taxes to pay, and more time to absorb the joys of life?
                  </p>
                  <p>
                    At Lonestar we believe we can help you realize that dream with our cottages. We offer standard plans that give from <strong className="font-bold text-wood-700">350 to 900 sq ft</strong>. Larger cottages built in two units and joined on-site are also possible. The floor plan of your cottage is up to your imagination and our building specs.
                  </p>
                  <p>
                    Foam insulation on floor, walls and roof keep out summer's heat and winter's cold with minimal pain to your pocketbook. Our Samsung mini-split A/C with its 10 yr parts warranty is a key factor in helping to keep bills down. With pressure treated floor systems, optional hardie siding, and metal roofs, your honey-do list will go extinct.
                  </p>
                  <p>
                    All appliance hook-ups are full size and ready for you to move your appliances in place. The 40 gal water heater is wired in and ready to go. What's your preferred interior decor? Sheetrock? Metal galvalume ceilings? Knotty pine with dark walnut trim? We offer this and more. And remember; its all portable. We can haul the memories of Grandma's house home to you.
                  </p>
                  <p className="font-medium text-slate-900 border-l-4 border-gold-500 pl-6 my-8 py-2">
                    Stop by one of our dealers to learn more. Or swing by our family-run shops to see a cottage in production and visit with the ones who use their skills and time to make your dream cottage become real. We want to use the Golden Rule to build your cottage, and we want to share with you the joy of living.
                  </p>
                </div>
              </div>
              <div className="grid gap-6">
                 <img src="/cottage-brochure-4.jpg" alt="Cottage Interior" className="rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] w-full object-cover h-[28rem] hover:scale-[1.02] transition-transform duration-500" />
                 <img src="/cottage-brochure-1.jpg" alt="Dutchlap Painted Cottages" className="rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] w-full object-cover h-64 hover:scale-[1.02] transition-transform duration-500" />
              </div>
            </div>
            
            <div className="bg-wood-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 mt-8">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -mt-24 -mr-24 pointer-events-none"></div>
              
              <div className="relative group w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/cottage-brochure-3.jpg" alt="Cottage Exterior Layout" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl"></div>
              </div>
              
              <div className="text-left z-10 w-full lg:w-1/2">
                <div className="inline-flex items-center gap-2 mb-4 bg-wood-800/50 px-4 py-1.5 rounded-full border border-wood-700/50 text-gold-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                   <Star size={14} fill="currentColor" /> Premium Upgrades Available
                </div>
                <h3 className="text-4xl font-serif font-bold text-white mb-6 leading-tight">Turnkey Living <span className="text-wood-300 italic">Solutions</span></h3>
                <p className="text-wood-200 text-lg mb-10 leading-relaxed font-light">Custom interiors featuring spray foam insulation, pine trims, galvalume ceilings, and full kitchen setups ready for immediate move-in.</p>
                
                <div className="grid grid-cols-2 gap-5">
                   <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <p className="text-gold-400 font-bold mb-2 uppercase tracking-wide text-xs">Insulation</p>
                      <p className="text-white font-medium text-lg leading-snug">Full Spray<br/>Foam Option</p>
                   </div>
                   <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <p className="text-gold-400 font-bold mb-2 uppercase tracking-wide text-xs">Appliances</p>
                      <p className="text-white font-medium text-lg leading-snug">Full Size<br/>Hookups</p>
                   </div>
                   <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <p className="text-gold-400 font-bold mb-2 uppercase tracking-wide text-xs">Climate</p>
                      <p className="text-white font-medium text-lg leading-snug">Samsung<br/>Mini-Split AC</p>
                   </div>
                   <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <p className="text-gold-400 font-bold mb-2 uppercase tracking-wide text-xs">Plumbing</p>
                      <p className="text-white font-medium text-lg leading-snug">40 Gal<br/>Pre-Wired</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="w-full h-px bg-slate-200 mt-12 mb-4 relative flex items-center justify-center">
               <div className="bg-wood-50 px-6 text-slate-400 uppercase tracking-widest font-bold text-xs absolute">Choose Your Floor Plan</div>
            </div>
          </motion.div>
        )}

        {/* Staggered Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {filteredModels.map((model, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              key={model.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-wood-900/5 flex flex-col border border-white relative transition-all duration-500 hover:shadow-2xl hover:shadow-wood-900/10 hover:-translate-y-2"
            >
              
              {/* Popular Badge */}
              {(index === 1 || index === 3) && (
                <div className="absolute top-0 right-0 z-20 bg-gold-500 text-slate-900 text-[10px] font-bold px-4 py-2 rounded-bl-2xl shadow-md flex items-center gap-1.5 uppercase tracking-widest">
                  <Star size={12} fill="currentColor" /> Premium Choice
                </div>
              )}

              <div className="h-72 overflow-hidden relative cursor-pointer" onClick={() => setActiveModel(model)}>
                <img 
                  src={model.imageUrl} 
                  alt={model.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-5 left-5 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-xl">
                  {model.startPrice > 0 ? `Starting at $${model.startPrice.toLocaleString()}` : "Custom Quote"}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col relative bg-white">
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-wood-600 transition-colors cursor-pointer" onClick={() => setActiveModel(model)}>{model.name}</h3>
                <p className="text-slate-600 mb-8 flex-1 leading-relaxed font-light">{model.description}</p>
                
                <ul className="space-y-4 mb-10">
                  {model.features.map(f => (
                    <li key={f} className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setActiveModel(model)}
                  className="w-full py-4.5 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:border-gold-500 hover:bg-gold-50 hover:text-wood-800 transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                >
                  Explore Details
                  <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Recommender CTA */}
      <div className="bg-slate-900 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-wood-500/10 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
           <Sparkles className="mx-auto text-gold-500 mb-6" size={48} strokeWidth={1.5} />
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-md">
             Not sure which model is right for you?
           </h2>
           <p className="text-xl text-slate-400 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
             Try our AI Build Recommender. Tell us what you plan to do, and we'll instantly match you with the perfect building style, size, and estimate.
           </p>
           <button 
             onClick={() => {
               navigate('/');
               setTimeout(() => {
                 const element = document.getElementById('ai-quote');
                 if (element) element.scrollIntoView({ behavior: 'smooth' });
               }, 100);
             }}
             className="px-10 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-bold text-lg shadow-xl transition-all hover:-translate-y-1 inline-flex items-center gap-3 border border-slate-200"
           >
             Try AI Recommender <ArrowRight size={20} className="text-gold-500" />
           </button>
        </div>
      </div>

      {/* Specifications Modal */}
      <AnimatePresence>
        {activeModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" 
               onClick={() => setActiveModel(null)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 custom-scrollbar"
            >
              <button 
                onClick={() => setActiveModel(null)}
                className="absolute top-6 right-6 p-3 bg-white/50 hover:bg-slate-100 backdrop-blur-md rounded-full transition-colors z-20 text-slate-500 hover:text-slate-900 shadow-sm"
              >
                <X size={24} />
              </button>

              <div className="grid md:grid-cols-2 h-full">
                <div className="h-72 md:h-auto min-h-[400px] relative overflow-hidden">
                  <img 
                    src={activeModel.imageUrl} 
                    alt={activeModel.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-8 md:hidden">
                    <h3 className="text-white font-serif font-bold text-4xl">{activeModel.name}</h3>
                  </div>
                </div>
                
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <h3 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-4 hidden md:block leading-tight">{activeModel.name}</h3>
                  
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 w-fit border border-green-100">
                    <Check size={14} strokeWidth={3} />
                    In Stock & Ready to Build
                  </div>

                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light">
                    {activeModel.description} Engineered to meet Texas windstorm requirements and backed by our industry-leading 50-year warranty.
                  </p>

                  <div className="bg-wood-50 rounded-3xl p-8 mb-10 border border-wood-100">
                      <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-3 text-lg">
                        <div className="bg-gold-500 p-2 rounded-xl text-white">
                            <Ruler size={18} />
                        </div>
                        Technical Specifications
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                        {activeModel.specs?.map((spec, i) => (
                          <div key={i} className="border-b border-wood-200/50 pb-3">
                            <span className="block text-[10px] font-bold text-wood-400 uppercase tracking-widest mb-1.5">{spec.label}</span>
                            <span className="text-sm font-semibold text-slate-800">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                  </div>

                  {activeModel.pricingTable && activeModel.pricingTable.length > 0 && (
                    <div className="bg-white border border-wood-100 rounded-3xl overflow-hidden mb-10 shadow-sm flex flex-col">
                      <div className="bg-slate-50 border-b border-wood-100 px-8 py-5">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          Available Sizes & Pricing
                        </h4>
                      </div>
                      <div className="max-h-64 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-sm relative">
                          <thead className="bg-slate-50 sticky top-0 border-b border-wood-200 shadow-sm z-10 backdrop-blur-md bg-slate-50/90">
                            <tr>
                              <th className="px-8 py-3.5 text-slate-500 font-bold text-xs uppercase tracking-wider">Size</th>
                              <th className="px-4 py-3.5 text-slate-500 font-bold text-xs uppercase tracking-wider">Price</th>
                              <th className="px-4 py-3.5 text-slate-500 font-bold text-xs uppercase tracking-wider">36 Mo. RTO</th>
                              <th className="px-8 py-3.5 text-slate-500 font-bold text-xs uppercase tracking-wider">60 Mo. RTO</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {activeModel.pricingTable.map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-8 py-3.5 font-bold text-slate-800">{row.size}</td>
                                <td className="px-4 py-3.5 font-semibold text-slate-700">{row.price}</td>
                                <td className="px-4 py-3.5 text-slate-600">{row.rto36}</td>
                                <td className="px-8 py-3.5 text-slate-400 group-hover:text-slate-500">{row.rto60}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {(!activeModel.pricingTable || activeModel.pricingTable.length === 0) && (
                    <div className="bg-wood-50 border border-wood-100 rounded-3xl p-8 mb-10 text-center shadow-sm">
                      <h4 className="font-bold text-slate-900 mb-3 text-xl font-serif">Custom Build Pricing</h4>
                      <p className="text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed">This deluxe model is built to order with your specific requirements. Contact our design team for an exact quote.</p>
                      <a href="/contact" className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4.5 rounded-2xl font-bold text-2xl shadow-xl shadow-gold-500/20 transition-all hover:-translate-y-1 inline-flex items-center justify-center gap-3 w-full animate-pulse-light max-w-xs mx-auto">
                        <Phone size={24} fill="currentColor" />
                        Call for Pricing
                      </a>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 mt-auto">
                    <button 
                      onClick={() => handleCustomize(activeModel)}
                      className="w-full bg-slate-900 hover:bg-wood-800 text-white py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 text-lg group"
                    >
                      Customize This Build
                      <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform text-gold-500" />
                    </button>
                    {activeModel.startPrice > 0 && (
                      <p className="text-center text-sm text-slate-400 font-medium">
                        Base packages starting at <span className="text-slate-700 font-bold">${activeModel.startPrice.toLocaleString()}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Models;