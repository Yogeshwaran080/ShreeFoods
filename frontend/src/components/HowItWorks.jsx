import React from 'react';
import { Utensils, Sliders, Truck, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onExplorePlans }) {
  const steps = [
    {
      step: '01',
      icon: <Utensils className="w-7 h-7 text-white" />,
      title: 'Choose What Fits Your Routine',
      desc: 'Select from daily South Indian breakfast tiffins, authentic Ponni rice lunch Saapadu, light hand-rolled dinner chappathis, or mini catering for 10-30 guests.'
    },
    {
      step: '02',
      icon: <Sliders className="w-7 h-7 text-white" />,
      title: 'Customise Details & Location',
      desc: 'Pick your preferred start date, plan duration (Trial, Weekly, or Monthly), dietary notes, and choose your delivery hub across Guduvancheri, Urapakkam, or SRM Surroundings.'
    },
    {
      step: '03',
      icon: <Truck className="w-7 h-7 text-white" />,
      title: 'Enjoy Fresh Homestyle Meals',
      desc: 'Relax while our delivery team brings piping hot, unadulterated homestyle food packed in insulated thermal containers right to your doorstep daily.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-50/40 to-white border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Simple 3-Step Process</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            How to Get Your Daily Food
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Delicious home-cooked meals sorted without morning cooking rush or grocery runs.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-8 border-2 border-brand-100 shadow-md hover:border-brand-500 hover:shadow-xl transition-all relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-700 group-hover:bg-brand-800 transition-colors flex items-center justify-center shadow-lg shadow-brand-700/20">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-brand-200 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-brand-700 text-xs font-bold">
                <span>Step {idx + 1} of 3</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onExplorePlans}
            className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-brand-700/20 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            <span>Explore Our Daily Plans</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
