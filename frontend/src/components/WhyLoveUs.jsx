import React from 'react';
import { ChefHat, Leaf, CalendarClock, ShieldAlert, Sparkles, Heart } from 'lucide-react';

export default function WhyLoveUs() {
  const features = [
    {
      icon: <ChefHat className="w-8 h-8 text-brand-700" />,
      title: 'Our Home Kitchen',
      description: 'Cooked in authentic home kitchens by loving mothers, not in mass-produced commercial cloud kitchens. Pure homestyle taste and hygiene in every meal.'
    },
    {
      icon: <Leaf className="w-8 h-8 text-brand-700" />,
      title: 'Fresh Ingredients',
      description: '100% cold-pressed wood chekku oils (gingelly & groundnut), fresh handpicked vegetables, RO purified water, and zero artificial preservatives or colors.'
    },
    {
      icon: <CalendarClock className="w-8 h-8 text-brand-700" />,
      title: 'Flexible Day Adjustment',
      description: 'Traveling or away for work? Simply notify us on WhatsApp to pause or adjust your meal schedule without losing your subscription days.'
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-brand-700" />,
      title: 'Limited Meals Per Batch',
      description: 'We strictly cook in small, limited family batches to ensure that every single tiffin and lunch box maintains fresh authentic flavor and care.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-brand-700 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Homestyle Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why People Love Us
          </h2>
          <p className="text-slate-500 text-base sm:text-lg mt-2 font-medium">
            Real home cooking. Real flexibility. Real value.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => (
            <div 
              key={idx}
              className="bg-brand-50/40 rounded-3xl p-6 sm:p-7 border border-brand-100/80 hover:border-brand-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 border border-brand-100">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-100/60 flex items-center gap-1.5 text-brand-700 text-xs font-bold">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Cooked with Motherly Care</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
