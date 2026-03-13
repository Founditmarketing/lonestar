import React from 'react';
import { ShieldCheck, Ruler, Anchor, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck size={32} />,
      title: "50-Year Siding Warranty",
      desc: "We exclusively use LP SmartSide® treated engineered wood, tested to resist fungal decay and termites."
    },
    {
      icon: <Anchor size={32} />,
      title: "Hurricane Rated Structure",
      desc: "Every unit includes hurricane ties and pressure-treated notched runners for maximum stability."
    },
    {
      icon: <Ruler size={32} />,
      title: "Built to Your Spec",
      desc: "Need a specific door placement or window height? We build to order based on your site requirements."
    },
    {
      icon: <Clock size={32} />,
      title: "Professional Installation",
      desc: "Our experienced crews handle delivery and leveling, ensuring your building sits right from day one."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="craftsmanship" className="py-32 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Premium Background Textures */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-wood-800/20 via-slate-900 to-slate-900 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-8">
                <div className="bg-gold-500 w-12 h-1 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase">Uncompromising Quality</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight">
              Built to Weather<br />
              <span className="text-wood-400 italic">The Storm.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light">
              Our reputation is built on structural integrity. Unlike big-box store competitors, we utilize residential-grade construction standards. Your investment is engineered to last for decades, not seasons.
            </p>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10"
            >
              {features.map((f, i) => (
                <motion.div variants={itemVariants} key={i} className="flex gap-5 group">
                  <div className="text-gold-500 shrink-0 bg-white/5 p-4 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:bg-gold-500/10 transition-all duration-300">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-lg tracking-wide">{f.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:ml-10 mt-12 lg:mt-0"
          >
            <div className="absolute -inset-6 border border-white/10 rounded-[2.5rem] translate-x-4 translate-y-6 -z-10 bg-slate-800/50 backdrop-blur-3xl hidden md:block"></div>
            <img 
              src="/images/real/scraped-30.jpeg" 
              alt="Structural framing" 
              className="rounded-[2rem] shadow-2xl shadow-black/50 w-full relative z-10 border border-white/5"
            />
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-8 -left-8 glass-dark p-8 rounded-3xl shadow-2xl max-w-sm border-l-[6px] border-l-gold-500 z-20"
             >
                <p className="font-serif text-xl text-white italic leading-snug">"We don't cut corners.<br/>We build it right the first time."</p>
                <div className="mt-4 flex items-center gap-3">
                    <div className="h-px bg-gold-500/50 w-8"></div>
                    <span className="text-xs uppercase tracking-widest text-gold-500 font-bold">Lyndon, Owner</span>
                </div>
             </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;