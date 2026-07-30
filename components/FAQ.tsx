import React from 'react';
import { MessageSquare } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export const FAQ_SECTIONS: FAQSection[] = [
  {
    title: 'Purchasing & Financing',
    subtitle: 'Payment options and ownership programs',
    items: [
      {
        question: 'How does the Rent-to-Own program work?',
        answer:
          "Our Rent-to-Own program requires NO credit check. You simply pay a small security deposit and your first month's rent, and we deliver the building. All contracts are month-to-month—you can return the building at any time with no penalty, or pay it off early with no penalty. We offer 36, 48, and 60-month terms.",
      },
      {
        question: 'What forms of payment do you accept?',
        answer:
          'We accept all major credit cards, personal checks, cashier’s checks, and cash. For cash purchases, we require a percentage of the total price down at the time of order, with the remaining balance due upon delivery and exact set-up.',
      },
    ],
  },
  {
    title: 'Delivery & Setup',
    subtitle: 'Site preparation and logistics',
    items: [
      {
        question: 'Do I need a concrete foundation?',
        answer:
          'No. Our sheds are built on pressure-treated 4x6 runners. As long as your site is no more than 12 inches out of level, our delivery drivers will block and level the building using solid concrete patio blocks. We do not require a poured slab or gravel pad, though a gravel pad is the absolute best foundation you can provide.',
      },
      {
        question: 'How much space is needed for delivery?',
        answer:
          'We need a clear path that is at least 2 feet wider than the building being delivered, and 14 feet of overhead clearance to avoid branches and power lines. We use specialized delivery trailers and a highly maneuverable "Mule" machine to gently place your shed exactly where you want it.',
      },
    ],
  },
];

const FAQ: React.FC = () => {
  const formatSectionHeader = (title: string, subtitle: string) => (
    <div className="mb-12">
      <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 font-light">{subtitle}</p>
    </div>
  );

  return (
    <div className="pt-32 pb-24 bg-wood-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">

        <div className="mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-200/50 rounded-full text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
              <MessageSquare size={14} /> Knowledge Base
           </div>
           <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">
             Frequently Asked.
           </h1>
           <p className="text-xl text-slate-500 font-light max-w-xl">
             Everything you need to know about purchasing, preparing for, and maintaining your Lone Star Shed.
           </p>
        </div>

        {FAQ_SECTIONS.map((section, sIdx) => (
          <React.Fragment key={section.title}>
            {formatSectionHeader(section.title, section.subtitle)}
            <div className={`space-y-6 ${sIdx < FAQ_SECTIONS.length - 1 ? 'mb-20' : ''}`}>
              {section.items.map((item) => (
                <div key={item.question} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-wood-900/5">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{item.question}</h4>
                  <p className="text-slate-600 font-light leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}

      </div>
    </div>
  );
};

export default FAQ;
