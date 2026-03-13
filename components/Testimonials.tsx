import React, { useEffect, useState } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { fetchTestimonials } from '../services/geminiService';
import { Review } from '../types';

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

  return (
    <section className="py-24 bg-white border-t border-wood-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-wood-200 to-transparent"></div>
      <div className="absolute -left-20 top-20 w-64 h-64 bg-wood-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute -right-20 bottom-20 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-100 shadow-sm rounded-full px-4 py-1.5 mb-6 animate-fade-in">
             <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
             <span className="text-sm font-bold text-slate-700">4.9 Star Rating</span>
          </div>
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Trusted by Texans</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We don't just build sheds; we build relationships. See what your neighbors in Central Texas are saying about their Lone Star experience.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-wood-50 p-8 rounded-2xl h-64 flex flex-col justify-center items-center animate-pulse">
                <Loader2 className="animate-spin text-wood-300" size={32} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl relative group hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-wood-200 flex flex-col h-full animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wood-100 to-wood-200 text-wood-700 flex items-center justify-center font-bold text-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-tight">{review.author}</h4>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{review.location || 'Verified Buyer'}</p>
                      </div>
                   </div>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4 opacity-50 grayscale group-hover:grayscale-0 transition-all" />
                </div>

                <div className="flex gap-0.5 mb-3 text-yellow-400">
                  {[...Array(5)].map((_, idx) => (
                     <Star key={idx} size={14} fill={idx < review.rating ? "currentColor" : "none"} className={idx >= review.rating ? "text-slate-200" : ""} />
                  ))}
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  "{review.text}"
                </p>
                
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center mt-auto">
                   <span className="text-xs text-slate-400">{review.date}</span>
                   <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified
                   </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
            <a 
              href="https://www.google.com/maps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-wood-600 font-bold hover:text-wood-800 transition-colors border-b-2 border-transparent hover:border-wood-500 pb-1"
            >
                Read more reviews on Google Maps
            </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;