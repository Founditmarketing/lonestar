import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

const RentToOwn: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-wood-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full text-green-700 text-xs font-bold uppercase tracking-widest mb-6 border border-green-200">
              <CreditCard size={14} /> Flexible Ownership
           </div>
           <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">
             Rent-to-Own.<br/>
             <span className="text-wood-600 italic font-light">No Credit Check.</span>
           </h1>
           <p className="text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
             Get the storage you need today with our guaranteed approval rent-to-own programs. Stop paying for off-site mini storage and start investing in property you will eventually own.
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-wood-900/5">
                <h3 className="text-4xl font-serif font-bold text-gold-500 mb-4">36</h3>
                <h4 className="font-bold text-slate-900 mb-2">Month Term</h4>
                <p className="text-sm font-light text-slate-500">The standard path to ownership with competitive monthly rates.</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl shadow-wood-900/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-4xl font-serif font-bold text-gold-500 mb-4 relative z-10">48</h3>
                <h4 className="font-bold text-white mb-2 relative z-10">Month Term</h4>
                <p className="text-sm font-light text-slate-400 relative z-10">Lower your monthly payment while still building equity.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-wood-900/5">
                <h3 className="text-4xl font-serif font-bold text-gold-500 mb-4">60</h3>
                <h4 className="font-bold text-slate-900 mb-2">Month Term</h4>
                <p className="text-sm font-light text-slate-500">Our lowest possible monthly payment for maximum affordability.</p>
            </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-wood-900/5">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">How It Works</h2>
            <div className="space-y-6">
                {[
                    "Choose your building and select a 36, 48, or 60-month term.",
                    "Pay a small security deposit plus your first month's rent upfront.",
                    "We deliver and set up your building for free (within 50 miles).",
                    "Make your monthly payments. You can pay off the balance early at any time with NO penalty.",
                    "Complete your payments and the building is 100% yours."
                ].map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                        <div className="shrink-0 mt-1">
                           <CheckCircle2 size={24} className="text-green-500" />
                        </div>
                        <p className="text-slate-600 font-light text-lg">{step}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default RentToOwn;
