import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MODELS } from '../data/models';

const FeaturedModels: React.FC = () => {
  const navigate = useNavigate();
  // Select top 3 models: Side Utility (1), Lofted Cabin (3), Lofted Barn (0)
  const featured = [MODELS[1], MODELS[3], MODELS[0]]; 

  return (
    <section id="models" className="py-24 bg-wood-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-wood-500 w-8 h-1 rounded-full"></div>
                    <span className="text-wood-800 text-sm font-bold tracking-widest uppercase">Best Sellers</span>
                </div>
                <h2 className="text-4xl font-serif font-bold text-slate-900">
                  Popular Configurations
                </h2>
            </div>
            
            <button 
                onClick={() => navigate('/models')}
                className="hidden md:flex items-center gap-2 text-wood-600 font-bold hover:text-wood-800 transition-colors group"
            >
                View Full Catalog <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featured.map((model) => (
                <div key={model.id} onClick={() => navigate(`/configure?style=${model.configKey}`)} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-wood-100 flex flex-col">
                    <div className="h-56 relative overflow-hidden">
                        <img 
                            src={model.imageUrl} 
                            alt={model.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm border border-white/20">
                            From ${model.startPrice.toLocaleString()}
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-wood-600 transition-colors">{model.name}</h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">{model.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                            <span className="text-xs font-bold text-wood-500 uppercase tracking-wider">Customize</span>
                            <div className="bg-wood-50 p-2 rounded-full text-wood-600 group-hover:bg-gold-500 group-hover:text-slate-900 transition-colors">
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center md:hidden">
            <button 
                onClick={() => navigate('/models')}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-full font-bold text-slate-700 shadow-sm active:scale-95 transition-all"
            >
                View All Models <ArrowRight size={16} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedModels;