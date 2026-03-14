import React from 'react';
import { Hammer, Ruler, AlertTriangle } from 'lucide-react';

const SitePrep: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-wood-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full text-amber-800 text-xs font-bold uppercase tracking-widest mb-6 border border-amber-200">
              <Ruler size={14} /> Pre-Delivery Guide
           </div>
           <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">
             Site Preparation.
           </h1>
           <p className="text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
             Proper site preparation ensures your building is level, doors operate smoothly, and the 50-year warranty remains valid.
           </p>
        </div>

        <div className="space-y-12">
            <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <Hammer className="text-gold-500" /> 1. Leveling Requirements
                </h3>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg">
                    <p className="text-slate-600 font-light leading-relaxed mb-4">
                        Our installers will temporarily block and level your building using concrete patio blocks. However, the installation site <strong>must be no more than 12 inches out of level</strong> across the length or width of the building footprint.
                    </p>
                    <p className="text-slate-600 font-light leading-relaxed">
                        If the site is more than 12 inches out of level, the delivery team cannot safely install the building without structural risk. In these cases, you must prepare a leveled dirt or gravel pad prior to delivery.
                    </p>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <AlertTriangle className="text-gold-500" /> 2. Clearance & Access
                </h3>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg">
                    <ul className="space-y-4 text-slate-600 font-light list-disc pl-5 marker:text-gold-500">
                        <li><strong>Width:</strong> We require a clear path that is at least 2 feet wider than the building you ordered (e.g., a 12' wide building needs 14' of clearance).</li>
                        <li><strong>Height:</strong> We require 14 feet of overhead clearance. Please trim any low-hanging tree branches and inform us of any low power or utility lines.</li>
                        <li><strong>Ground Conditions:</strong> The path to the installation site must be dry and firm. Our heavy equipment cannot operate in deep mud or standing water.</li>
                    </ul>
                </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl mt-16 text-center">
                <h3 className="text-2xl font-serif font-bold text-white mb-4">Need a Gravel Pad?</h3>
                <p className="text-slate-400 font-light mb-8 max-w-xl mx-auto">
                    While not strictly required, a crushed limestone gravel pad with a 4x4 timber perimeter is the absolutely best foundation you can provide to ensure decades of stability. Contact us for local contractor recommendations.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SitePrep;
