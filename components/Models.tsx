import React, { useState } from 'react';
import { ArrowUpRight, X, Check, ArrowRight, Ruler, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShedModel } from '../types';
import { MODELS } from '../data/models';

const Models: React.FC = () => {
  const navigate = useNavigate();
  const [activeModel, setActiveModel] = useState<ShedModel | null>(null);

  const handleCustomize = (model: ShedModel) => {
    navigate(`/configure?style=${model.configKey}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-wood-50 min-h-screen">
      {/* Hero Header for Models Page */}
      <div className="bg-wood-800 pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Catalog</h1>
        <p className="text-wood-200 max-w-2xl mx-auto text-lg">
          From basic storage to habitable cabins, explore our range of handcrafted buildings. 
          All models are customizable and available for Rent-to-Own.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {MODELS.map((model, index) => (
            <div key={model.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-wood-100 relative">
              
              {/* Popular Badge */}
              {(index === 1 || index === 3) && (
                <div className="absolute top-0 right-0 z-20 bg-gold-500 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> POPULAR CHOICE
                </div>
              )}

              <div className="h-64 overflow-hidden relative cursor-pointer" onClick={() => setActiveModel(model)}>
                <img 
                  src={model.imageUrl} 
                  alt={model.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm border border-white/20">
                  From ${model.startPrice.toLocaleString()}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-wood-600 transition-colors cursor-pointer" onClick={() => setActiveModel(model)}>{model.name}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed line-clamp-3">{model.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {model.features.map(f => (
                    <li key={f} className="text-xs font-bold text-wood-600 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div>
                      {f}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setActiveModel(model)}
                  className="w-full py-4 border-2 border-slate-100 rounded-xl font-bold text-slate-900 hover:border-gold-500 hover:text-wood-700 transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  View Specs
                  <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications Modal */}
      {activeModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveModel(null)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in-up">
            <button 
              onClick={() => setActiveModel(null)}
              className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-20 text-slate-500 hover:text-slate-900"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto relative">
                <img 
                  src={activeModel.imageUrl} 
                  alt={activeModel.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                  <h3 className="text-white font-serif font-bold text-2xl">{activeModel.name}</h3>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2 hidden md:block">{activeModel.name}</h3>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
                  <Check size={12} strokeWidth={3} />
                  In Stock & Ready to Build
                </div>

                <p className="text-slate-600 mb-8 leading-relaxed">
                  {activeModel.description} Engineered to meet Texas windstorm requirements and backed by our industry-leading warranty.
                </p>

                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Ruler size={18} className="text-gold-500" />
                  Technical Specifications
                </h4>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                  {activeModel.specs?.map((spec, i) => (
                    <div key={i} className="border-b border-slate-100 pb-2">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{spec.label}</span>
                      <span className="text-sm font-semibold text-slate-800">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => handleCustomize(activeModel)}
                    className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Customize This Build
                    <ArrowRight size={20} />
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Base price: ${activeModel.startPrice.toLocaleString()} | Financing available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Models;