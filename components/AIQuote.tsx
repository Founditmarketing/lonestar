import React, { useState } from 'react';
import { Sparkles, Send, Loader2, CheckCircle2, Lightbulb, ArrowRight, Hammer, Warehouse, Home, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeShedRequest } from '../services/geminiService';
import { AIAnalysisResult } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

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
    <section id="design-studio" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-900 -skew-x-12 translate-x-32 z-0"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-stretch">
          
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 w-fit shadow-lg shadow-slate-900/20"
            >
              <Sparkles size={14} className="text-gold-500" />
              Build Recommender
            </motion.div>
            
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight"
            >
              Find the Right Fit.<br />
              <span className="text-wood-600 italic">Instantly.</span>
            </motion.h2>

            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="text-slate-500 text-xl mb-10 leading-relaxed font-light"
            >
              Unsure which model fits your needs? Simply describe your storage requirements or intended use, and our AI consultant will recommend the most practical configuration.
            </motion.p>

            <motion.form 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.3 }}
               onSubmit={handleSubmit} 
               className="relative group"
            >
              {/* Glowing background effect for the input area */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/30 to-wood-500/30 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision here... (e.g. 'I need a 12x20 workshop with electricity')"
                className="relative w-full p-8 pr-20 bg-white border-2 border-slate-200/80 rounded-[2rem] focus:ring-4 focus:ring-gold-500/20 focus:border-gold-500 outline-none resize-none h-48 text-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all placeholder:text-slate-400 font-medium text-slate-800"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute bottom-6 right-6 bg-slate-900 hover:bg-wood-800 text-gold-500 hover:text-gold-400 p-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:-translate-y-1 hover:shadow-xl z-10"
              >
                {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
              </button>
            </motion.form>
          </div>

          {/* Right: Result Card (Compact Mode) or Selection Hub */}
          <div className="relative h-full min-h-[600px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl h-full flex flex-col justify-center relative overflow-hidden"
                >
                   {/* Decorative glow inside card */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="bg-green-100 p-2 rounded-full shadow-inner border border-green-200">
                      <CheckCircle2 className="text-green-600" size={24} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">Recommended Build</h3>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Style</label>
                          <p className="text-3xl font-serif font-bold text-wood-900 leading-none">{result.recommendedStyle}</p>
                      </div>
                      <div className="text-right">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Size</label>
                          <p className="text-xl font-bold text-slate-700 leading-none">{result.suggestedSize}</p>
                      </div>
                    </div>

                    <div className="bg-wood-50 p-6 rounded-2xl border border-wood-100">
                      <label className="text-[10px] font-bold text-wood-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                           <Sparkles size={12} className="text-gold-500" /> AI Insight
                      </label>
                      <p className="text-base font-light text-slate-700 leading-relaxed italic border-l-2 border-gold-500 pl-4">"{result.reasoning}"</p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4 mt-auto border-t border-slate-100">
                      <div className="w-full sm:w-auto">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Est. Built Price</label>
                        <p className="text-2xl font-bold text-slate-900">{result.estimatedPriceRange}</p>
                      </div>
                      <button 
                        onClick={handleConfigureClick}
                        className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group text-base"
                      >
                        Customize & Review
                        <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                    
                     <button 
                        onClick={() => setResult(null)}
                        className="w-full text-center text-sm font-semibold text-slate-400 hover:text-slate-600 mt-4 transition-colors"
                      >
                        Start Over
                      </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="hub"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-900 rounded-[2.5rem] p-1 relative h-full flex flex-col items-center justify-center overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/50"
                >
                   {/* Blueprint Background Effect */}
                   <div className="absolute inset-0 opacity-10" style={{ 
                      backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, 
                      backgroundSize: '40px 40px' 
                   }}></div>
                   <img src="/images/real/scraped-24.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay grayscale hover:scale-105 transition-transform duration-[10s]" alt="Blueprint" />
                   
                   <div className="relative z-10 w-full p-10 flex flex-col h-full">
                      {/* Top: AI Prompts */}
                      <div className="mb-auto">
                          <div className="flex items-center gap-3 mb-6 text-white/90">
                              <Sparkles size={18} className="text-gold-500 animate-pulse" />
                              <span className="text-xs font-bold uppercase tracking-[0.2em] text-glow">AI Shortcuts</span>
                          </div>
                           <div className="grid grid-cols-1 gap-4">
                              {quickPrompts.map((p, i) => (
                                  <motion.button 
                                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  key={i}
                                  onClick={() => setPrompt(p)}
                                  className="bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-sm font-light py-4 px-5 rounded-2xl text-left transition-all flex items-center gap-3 group/btn"
                                  >
                                    <div className="bg-slate-700 p-2 rounded-full border border-slate-600">
                                        <Lightbulb size={16} className="text-gold-500 group-hover/btn:text-gold-400 shrink-0" />
                                    </div>
                                    {p}
                                  </motion.button>
                              ))}
                          </div>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-4 my-8">
                          <div className="h-px bg-slate-800 flex-1"></div>
                          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">OR BROWSE</span>
                          <div className="h-px bg-slate-800 flex-1"></div>
                      </div>

                      {/* Bottom: Manual Select */}
                      <div>
                           <div className="flex items-center gap-3 mb-6 text-white/90">
                              <Hammer size={18} className="text-gold-500" />
                              <span className="text-xs font-bold uppercase tracking-[0.2em]">Manual Selection</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                               <button onClick={() => { navigate('/configure?style=lofted_barn'); window.scrollTo(0,0); }} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-gold-500/50 p-5 rounded-2xl text-center transition-all duration-300 group/card shadow-inner">
                                  <Warehouse size={28} className="mx-auto text-slate-400 group-hover/card:text-gold-400 mb-3 group-hover/card:scale-110 transition-transform" strokeWidth={1.5} />
                                  <span className="text-xs font-bold text-white tracking-wider uppercase block">Barns</span>
                               </button>
                               <button onClick={() => { navigate('/configure?style=utility_standard'); window.scrollTo(0,0); }} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-gold-500/50 p-5 rounded-2xl text-center transition-all duration-300 group/card shadow-inner">
                                  <Hammer size={28} className="mx-auto text-slate-400 group-hover/card:text-gold-400 mb-3 group-hover/card:scale-110 transition-transform" strokeWidth={1.5} />
                                  <span className="text-xs font-bold text-white tracking-wider uppercase block">Utility</span>
                               </button>
                               <button onClick={() => { navigate('/configure?style=cabin_lofted'); window.scrollTo(0,0); }} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-gold-500/50 p-5 rounded-2xl text-center transition-all duration-300 group/card shadow-inner">
                                  <Home size={28} className="mx-auto text-slate-400 group-hover/card:text-gold-400 mb-3 group-hover/card:scale-110 transition-transform" strokeWidth={1.5} />
                                  <span className="text-xs font-bold text-white tracking-wider uppercase block">Cabins</span>
                               </button>
                               <button onClick={() => { navigate('/configure?style=garage_utility'); window.scrollTo(0,0); }} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-gold-500/50 p-5 rounded-2xl text-center transition-all duration-300 group/card shadow-inner">
                                  <Car size={28} className="mx-auto text-slate-400 group-hover/card:text-gold-400 mb-3 group-hover/card:scale-110 transition-transform" strokeWidth={1.5} />
                                  <span className="text-xs font-bold text-white tracking-wider uppercase block">Garages</span>
                               </button>
                          </div>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIQuote;