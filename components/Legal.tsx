import React from 'react';
import { Shield, FileText } from 'lucide-react';

interface LegalProps {
  type: 'privacy' | 'terms';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  const icon = isPrivacy ? <Shield size={32} className="text-wood-600" /> : <FileText size={32} className="text-wood-600" />;
  const lastUpdated = "November 12, 2024";

  return (
    <div className="bg-wood-50 min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <div className="bg-white rounded-t-2xl p-8 border-b border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-wood-50 rounded-full">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">{title}</h1>
            <p className="text-sm text-slate-500">Last Updated: {lastUpdated}</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-2xl p-8 md:p-12 shadow-sm text-slate-700 leading-relaxed space-y-8">
          
          {isPrivacy ? (
            <>
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h3>
                <p>
                  We collect information you provide directly to us when you request a quote, configure a building, or contact our dealerships. This includes your name, email address, phone number, and delivery address. We do not sell your personal data to third-party marketing agencies.
                </p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Generate accurate quotes and Rent-to-Own estimates.</li>
                    <li>Coordinate site checks and delivery logistics.</li>
                    <li>Communicate with you about your order status.</li>
                  </ul>
                </p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. AI & Automated Processing</h3>
                <p>
                  Our website uses Artificial Intelligence (Gemini API) to assist in building recommendations. Data entered into the "Design Studio" is processed to generate suggestions but is not permanently stored or used to train public models.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Quotes & Estimates</h3>
                <p>
                  All quotes generated via this website, including "Cash Price" and "Rent-to-Own" estimates, are subject to final verification by an authorized Lone Star Sheds dealer. Prices for materials (lumber, steel) fluctuate; we reserve the right to adjust pricing before a contract is signed.
                </p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Delivery & Site Preparation</h3>
                <p>
                  Free delivery covers up to 50 miles from the nearest dealership. The customer is responsible for ensuring the site is accessible (fences removed, clear path for the Mule delivery system) and level within 6 inches. Excessive leveling blocks may incur additional fees.
                </p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Rent-to-Own (RTO)</h3>
                <p>
                  RTO is a rental agreement, not a loan. No credit check is required. Ownership is transferred only after all contract payments are made. Failure to pay may result in repossession of the building.
                </p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">4. Warranty</h3>
                <p>
                  We provide a 5-year craftsmanship warranty and pass through the 50-year manufacturer warranty on LP SmartSide® products. Damage caused by "Acts of God" (floods, tornadoes) is not covered under warranty.
                </p>
              </section>
            </>
          )}

          <div className="pt-8 border-t border-slate-100 text-sm text-slate-500">
            <p>Questions? Contact us at <a href="mailto:legal@lonestarsheds.com" className="text-wood-600 underline">legal@lonestarsheds.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;