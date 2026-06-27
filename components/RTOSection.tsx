import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const FINANCING_URL = 'https://express-fin.com/application-form/?recordId=001UR00000g3tcTYAQ';

const steps = [
  "Choose your building and select a 36, 48, or 60-month term.",
  "Pay a small security deposit plus your first month's rent upfront.",
  "We deliver and set up your building for free (within 50 miles).",
  "Make your monthly payments — pay off early at any time with NO penalty.",
  "Complete your payments and the building is 100% yours.",
];

const terms = [
  { months: '36', desc: 'The standard path to ownership with competitive monthly rates.' },
  { months: '48', desc: 'Lower your monthly payment while still building equity.', featured: true },
  { months: '60', desc: 'Our lowest possible monthly payment for maximum affordability.' },
];

const RTOSection: React.FC = () => {
  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden border-t border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-wood-800/20 via-slate-900 to-slate-900 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full text-green-400 text-xs font-bold uppercase tracking-widest mb-6 border border-green-500/20">
              <CreditCard size={14} /> No Credit Check
            </div>

            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Rent-to-Own.<br />
              <span className="text-wood-400 italic font-light">Guaranteed Approval.</span>
            </h2>

            <p className="text-xl text-slate-400 font-light leading-relaxed mb-10">
              Get the storage you need today with our guaranteed approval rent-to-own programs. Stop paying for off-site mini storage and start investing in property you will eventually own.
            </p>

            {/* Term Cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {terms.map(({ months, desc, featured }) => (
                <div
                  key={months}
                  className={`p-5 rounded-2xl border ${
                    featured
                      ? 'bg-wood-700/30 border-wood-500/40'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="text-3xl font-serif font-bold text-gold-500 mb-1">{months}</div>
                  <div className="text-xs font-bold text-white mb-2">Month Term</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={FINANCING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold px-8 py-4 rounded-full shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 hover:-translate-y-0.5 transition-all group"
              >
                Apply Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/rto"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold px-6 py-4 rounded-full border border-white/10 hover:border-white/30 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right: How It Works */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="bg-gold-500 w-8 h-1 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase">How It Works</span>
            </div>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle2 size={22} className="text-green-400" />
                  </div>
                  <p className="text-slate-300 font-light leading-relaxed">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default RTOSection;
