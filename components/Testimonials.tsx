import React, { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { fetchTestimonials } from '../services/geminiService';
import { Review } from '../types';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchTestimonials();
      setReviews(data);
      setLoading(false);
    };
    loadReviews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -left-40 top-40 w-96 h-96 bg-wood-200/50 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none"></div>
      <div className="absolute -right-40 bottom-20 w-96 h-96 bg-gold-200/30 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-slate-100 shadow-sm rounded-full px-5 py-2 mb-8">
             <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
             <span className="text-sm font-bold text-slate-800 tracking-wide">4.9 Star Rating</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 drop-shadow-sm">Trusted by Texans</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xl font-light">
            We don't just build sheds; we build relationships. See what your neighbors in Central Texas are saying about their Lone Star experience.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm border border-slate-100 p-10 rounded-[2rem] h-72 flex flex-col justify-center items-center animate-pulse shadow-sm">
                <Loader2 className="animate-spin text-wood-300" size={40} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             className="grid lg:grid-cols-3 gap-8"
          >
            {reviews.map((review, i) => (
              <motion.div 
                 variants={itemVariants}
                 key={i} 
                 className="bg-white p-10 rounded-[2rem] relative group hover:shadow-2xl hover:shadow-wood-900/5 transition-all duration-500 border border-slate-100 hover:border-gold-500/30 hover:-translate-y-2 flex flex-col h-full"
              >
                
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-slate-900 text-gold-500 flex items-center justify-center font-serif font-bold text-xl shadow-inner group-hover:scale-110 transition-transform">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg leading-tight">{review.author}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{review.location || 'Verified Buyer'}</p>
                      </div>
                   </div>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5 opacity-40 grayscale group-hover:grayscale-0 transition-all" />
                </div>

                <div className="flex gap-1 mb-6 text-gold-500">
                  {[...Array(5)].map((_, idx) => (
                     <Star key={idx} size={18} fill={idx < review.rating ? "currentColor" : "none"} className={idx >= review.rating ? "text-slate-200" : "drop-shadow-[0_0_2px_rgba(245,158,11,0.5)]"} />
                  ))}
                </div>
                
                <p className="text-slate-600 text-lg leading-relaxed mb-8 flex-1 font-light italic">
                  "{review.text}"
                </p>
                
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center mt-auto">
                   <span className="text-xs font-semibold text-slate-400">{review.date}</span>
                   <span className="text-[10px] font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-green-100">
                     <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span> Verified
                   </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.6 }}
           className="mt-16 text-center"
        >
            <a 
              href="https://www.google.com/maps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors border-b-2 border-transparent hover:border-wood-500 pb-1 uppercase tracking-widest text-xs"
            >
                Read more reviews on Google Maps
            </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;