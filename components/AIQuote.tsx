import React, { useState } from 'react';
import { Sparkles, Send, Loader2, CheckCircle2, Lightbulb, ArrowRight, Hammer, Warehouse, Home, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeShedRequest } from '../services/geminiService';
import { AIAnalysisResult } from '../types';

const AIQuote: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    const analysis = await analyzeShedRequest(prompt);
    setResult(analysis);
    setIsLoading(false);
  };

  const handleConfigureClick = () => {
    if (result) {
      navigate('/configure', { state: { result } });
      window.scrollTo(0, 0);
    }
  };

  const quickPrompts = [
    "I need a 12x20 workshop with electricity.",
    "Storage for a riding mower and garden tools.",
    "A modern backyard office for remote work."
  ];

  return (
    <section id="design-studio" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-wood-50/50 -skew-x-12 translate-x-32 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-stretch">
          
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 w-fit">
              <Sparkles size={14} className="text-gold-500" />
              Build Recommender
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Find the Right Fit.<br />
              <span className="text-wood-700">Instantly.</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Unsure which model fits your needs? Simply describe your storage requirements or intended use, and our AI consultant will recommend the most practical configuration.
            </p>

            <form onSubmit={handleSubmit} className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your needs here..."
                className="w-full p-6 pr-16 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none resize-none h-40 text-lg shadow-inner transition-all placeholder:text-slate-400"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute bottom-4 right-4 bg-gold-500 hover:bg-gold-400 text-slate-900 p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
              </button>
            </form>
          </div>

          {/* Right: Result Card (Compact Mode) or Selection Hub */}
          <div className="relative h-full">
            {result ? (
              <div className="bg-white border border-wood-100 rounded-2xl p-6 shadow-2xl animate-fade-in-up h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <CheckCircle2 className="text-green-600" size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Recommended Build</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Style</label>
                        <p className="text-xl font-serif font-bold text-wood-900 leading-none">{result.recommendedStyle}</p>
                    </div>
                    <div className="text-right">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Size</label>
                        <p className="text-lg font-medium text-slate-800 leading-none">{result.suggestedSize}</p>
                    </div>
                  </div>

                  <div className="bg-wood-50 p-3 rounded-lg border border-wood-100">
                    <label className="text-[10px] font-bold text-wood-600 uppercase tracking-wider mb-1 block flex items-center gap-1">
                         <Sparkles size={10} /> Insight
                    </label>
                    <p className="text-sm text-slate-700 leading-snug italic">"{result.reasoning}"</p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-100 gap-3 mt-auto">
                    <div className="w-full sm:w-auto">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Est. Price</label>
                      <p className="text-base font-bold text-slate-900">{result.estimatedPriceRange}</p>
                    </div>
                    <button 
                      onClick={handleConfigureClick}
                      className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-slate-900 px-5 py-2.5 rounded-lg font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-sm"
                    >
                      Customize
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                   <button 
                      onClick={() => setResult(null)}
                      className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-2"
                    >
                      Start Over
                    </button>
                </div>
              </div>
            ) : (
              <div className="bg-wood-800 rounded-3xl p-1 relative h-full min-h-[500px] flex flex-col items-center justify-center overflow-hidden shadow-2xl border border-wood-700 group">
                 {/* Blueprint Background Effect */}
                 <div className="absolute inset-0 opacity-10" style={{ 
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, 
                    backgroundSize: '30px 30px' 
                 }}></div>
                 <img src="https://images.unsplash.com/photo-1629350645731-50798155d045?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay grayscale group-hover:scale-105 transition-transform duration-1000" alt="Blueprint" />
                 
                 <div className="relative z-10 w-full px-8 py-10 flex flex-col h-full">
                    {/* Top: AI Prompts */}
                    <div className="mb-auto">
                        <div className="flex items-center gap-2 mb-4 text-white/90">
                            <Sparkles size={16} className="text-gold-500" />
                            <span className="text-sm font-bold uppercase tracking-wider">AI Shortcuts</span>
                        </div>
                         <div className="grid grid-cols-1 gap-3">
                            {quickPrompts.map((p, i) => (
                                <button 
                                key={i}
                                onClick={() => setPrompt(p)}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 text-wood-100 hover:text-white text-xs py-3 px-4 rounded-lg text-left transition-all flex items-center gap-2 group/btn"
                                >
                                <Lightbulb size={14} className="text-gold-500 group-hover/btn:text-gold-400 shrink-0" />
                                {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="text-white/40 text-xs font-bold uppercase">OR</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    {/* Bottom: Manual Select */}
                    <div>
                         <div className="flex items-center gap-2 mb-4 text-white/90">
                            <Hammer size={16} className="text-gold-500" />
                            <span className="text-sm font-bold uppercase tracking-wider">Manual Selection</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                             <button onClick={() => { navigate('/configure?style=lofted_barn'); window.scrollTo(0,0); }} className="bg-wood-700/50 hover:bg-wood-600 border border-white/10 hover:border-wood-500 p-3 rounded-xl text-center transition-all group/card">
                                <Warehouse size={24} className="mx-auto text-wood-300 group-hover/card:text-white mb-2" />
                                <span className="text-xs font-bold text-white block">Barns</span>
                             </button>
                             <button onClick={() => { navigate('/configure?style=utility_standard'); window.scrollTo(0,0); }} className="bg-wood-700/50 hover:bg-wood-600 border border-white/10 hover:border-wood-500 p-3 rounded-xl text-center transition-all group/card">
                                <Hammer size={24} className="mx-auto text-wood-300 group-hover/card:text-white mb-2" />
                                <span className="text-xs font-bold text-white block">Utility</span>
                             </button>
                             <button onClick={() => { navigate('/configure?style=cabin_lofted'); window.scrollTo(0,0); }} className="bg-wood-700/50 hover:bg-wood-600 border border-white/10 hover:border-wood-500 p-3 rounded-xl text-center transition-all group/card">
                                <Home size={24} className="mx-auto text-wood-300 group-hover/card:text-white mb-2" />
                                <span className="text-xs font-bold text-white block">Cabins</span>
                             </button>
                             <button onClick={() => { navigate('/configure?style=garage_utility'); window.scrollTo(0,0); }} className="bg-wood-700/50 hover:bg-wood-600 border border-white/10 hover:border-wood-500 p-3 rounded-xl text-center transition-all group/card">
                                <Car size={24} className="mx-auto text-wood-300 group-hover/card:text-white mb-2" />
                                <span className="text-xs font-bold text-white block">Garages</span>
                             </button>
                        </div>
                    </div>
                 </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIQuote;