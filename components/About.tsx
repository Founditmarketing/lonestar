import React from 'react';
import { Heart, ShieldCheck, Truck, Users, Hammer, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-wood-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2070&auto=format&fit=crop" 
            alt="Lone Star Sheds Workshop" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-wood-100 text-xs font-bold uppercase tracking-widest mb-6 border border-white/20 animate-fade-in">
            <Star size={14} className="text-gold-500" />
            Est. 2005
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-fade-in-up">
            Built in Texas. <span className="text-gold-500">For Texas.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            We are a family-owned business dedicated to providing high-quality, handcrafted storage buildings. We believe in honest pricing, superior materials, and treating every customer like a neighbor.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 border-2 border-wood-100 rounded-3xl -translate-x-4 -translate-y-4 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop" 
                alt="Carpenters working" 
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-wood-500 text-white p-6 rounded-xl shadow-lg hidden md:block">
                <p className="font-serif font-bold text-3xl mb-1">15k+</p>
                <p className="text-xs uppercase tracking-wider opacity-90">Buildings Delivered</p>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-sm font-bold text-wood-600 uppercase tracking-widest mb-2">Our Story</h2>
              <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6">More Than Just Storage</h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Lone Star Sheds was founded with a simple mission: to build a better shed. We saw too many flimsy, mass-produced structures that couldn't handle the Texas heat or high winds. We knew there was a better way.
                </p>
                <p>
                  Headquartered in Commerce, Texas, we have grown from a small workshop to a premier manufacturer serving the entire region. Despite our growth, we haven't lost sight of our roots. Every building is still constructed with the same attention to detail as our very first one.
                </p>
                <p>
                  We operate on Christian values of integrity and stewardship. When you buy from us, you aren't just a number; you're part of the Lone Star family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-wood-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">The Lone Star Difference</h2>
            <p className="text-slate-600">
              We don't cut corners. From the pressure-treated runners to the final coat of paint, quality is non-negotiable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-wood-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-wood-100 rounded-xl flex items-center justify-center text-wood-600 mb-6">
                <ShieldCheck size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Unmatched Warranty</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We use LP SmartSide® siding that comes with a 50-year warranty against fungal decay and termites. Our metal roofs typically carry a 40-year warranty. We stand behind what we build.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-wood-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-wood-100 rounded-xl flex items-center justify-center text-wood-600 mb-6">
                <Truck size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Free Delivery & Setup</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We offer free delivery within 50 miles of our dealerships. Our professional drivers use the "Mule" delivery system to place your shed exactly where you want it with minimal impact to your yard.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-wood-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-wood-100 rounded-xl flex items-center justify-center text-wood-600 mb-6">
                <Heart size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Rent-to-Own Flexibility</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                No credit check required. Our flexible Rent-to-Own program allows you to get the storage you need now with a low monthly payment. Pay off early with no penalty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-4 rounded-full bg-wood-50 mb-6 text-wood-600">
            <Users size={32} />
          </div>
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Ready to join the family?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Whether you visit one of our dealer locations or design online, we are here to help you solve your storage problems.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/locations')}
              className="px-8 py-3 bg-wood-600 hover:bg-wood-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Find a Dealer
            </button>
            <button 
              onClick={() => navigate('/configure')}
              className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Start Designing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;