import React from 'react';
import { ShieldCheck, Ruler, Anchor, Clock } from 'lucide-react';

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

  return (
    <section id="craftsmanship" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">
              Built to Weather The Storm.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our reputation is built on structural integrity. Unlike big-box store competitors, we utilize residential-grade construction standards, including 16" on-center studs, double top plates, and reinforced flooring systems. Your investment is engineered to last for decades, not seasons.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-wood-500 shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{f.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-wood-100 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="/images/real/scraped-30.jpeg" 
              alt="Structural framing" 
              className="rounded-2xl shadow-2xl w-full"
            />
             <div className="absolute bottom-8 left-8 bg-slate-900 p-6 rounded-xl shadow-lg max-w-xs border-l-4 border-wood-500">
              <p className="font-medium text-white">"We don't cut corners. We build it right the first time."</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;