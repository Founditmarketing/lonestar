import React from 'react';
import { ArrowRight, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToDesign = () => {
    const element = document.getElementById('design-studio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="/images/real/scraped-19.jpeg" 
          alt="Lone Star Sheds Backyard Studio" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-wood-50 via-transparent to-transparent opacity-90 h-1/3 bottom-0 top-auto"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <motion.div 
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="bg-gold-500 w-12 h-1 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            <span className="text-white/80 text-sm font-bold tracking-[0.2em] uppercase">Serving Northeast Texas Since 1989</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-white leading-[0.9] mb-8 drop-shadow-2xl">
            Solid Build.<br />
            <span className="text-wood-300 italic">Honest Price.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-light">
            Handcrafted workspaces, storage, and studios built to withstand Texas weather. Delivered fully assembled to your backyard.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => navigate('/models')}
              className="bg-gold-500 hover:bg-gold-400 text-slate-900 px-8 py-4.5 rounded-full font-bold transition-all flex items-center justify-center gap-3 group shadow-xl shadow-gold-500/20 text-lg"
            >
              View Inventory
              <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button 
              onClick={scrollToDesign}
              className="glass text-white px-8 py-4.5 rounded-full font-bold transition-all shadow-xl hover:bg-white/20 flex items-center justify-center gap-3 group text-lg"
            >
              <Wrench size={20} className="text-gold-400 group-hover:rotate-12 transition-transform" />
              Design Your Shed
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;