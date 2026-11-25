import React from 'react';
import { Users, Check, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

const RESTAURANT_WHATSAPP = '917200451980';

export default function EventPackages({ onSelectEventPlan }) {
  const eventPlans = [
    {
      id: 'event-15',
      name: 'Kalyana Elai Saapadu Mini (10 - 15 Members)',
      tagline: 'Traditional South Indian wedding-style leaf feast for intimate family poojas & rituals.',
      capacity: '10 - 15 Members Pack',
      items: [
        '15 Fresh Cut Banana Leaves + Serving Paper & Cups',
        'Steaming Ponni White Rice with Pure Cow Ghee',
        'Traditional Murungakkai Arachuvitta Sambar',
        'Pepper Mysore Rasam & Mor Kuzhambu',
        'Aviyal / Chow Chow Kootu & Urulai Roast',
        '15 Crispy Golden Medu Vadas & 15 Hot Gulab Jamuns',
        '15 Large Fried Crunchy Appalams & Mango Pickle'
      ]
    },
    {
      id: 'event-25',
      name: 'Maharaja Virundhu Package (20 - 25 Members)',
      tagline: 'Complete royal feast with sweets, savories, and hot insulated packaging for housewarmings.',
      capacity: '20 - 25 Members Pack',
      items: [
        '25 Full Cut Fresh Banana Leaves + Full Cutlery Set',
        'Steaming Ponni Rice + Bisibelebath / Puliyodharai',
        'Special Feast Drumstick Sambar & Garlic Rasam',
        'Senai Kizhangu Roast & Keerai Poriyal',
        '25 Special Medu Vadas + Coconut Chutney',
        '25 Hot Gulab Jamuns + Semiya Payasam',
        '25 Blistered Appalams, Mor Milagai & Pickles'
      ]
    },
    {
      id: 'event-30',
      name: 'Utsavam Grand Celebration (25 - 30 Members)',
      tagline: 'Elaborate 14-item traditional spread in insulated food warmer containers for birthdays & gatherings.',
      capacity: '25 - 30 Members Pack',
      items: [
        '30 Premium Banana Leaves + Complete Serving Spoons',
        'Fragrant Veg Biryani / Pulao with Onion Raitha',
        'Ponni Rice with Feast Arachuvitta Sambar & Mysore Rasam',
        'Urulai Roast, Vazhaikkai Varuval & Kootu',
        '30 Piping Hot Gulab Jamuns in Elaichi Syrup',
        '30 Crispy Medu Vadas + 30 Fried Crunchy Appalams',
        'Thick Homestyle Curd, Paruppu Podi & Ghee'
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif italic">
            Event Packages (10 - 30 Members)
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Cooked with motherly care on fresh banana leaves for Gruhapravesam (housewarmings), poojas, birthday gatherings, and intimate family functions.
          </p>
        </div>

        {/* 3 Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {eventPlans.map((plan) => (
            <div 
              key={plan.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-brand-100 hover:border-brand-500 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-700 transition-colors leading-tight mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* What is included */}
                <div className="text-xs font-bold text-brand-900 uppercase tracking-wider mb-3">
                  Feast Menu Items Included:
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3 mb-6">
                  {plan.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions: No price, only WhatsApp & Form order */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectEventPlan(plan.name)}
                  className="w-full bg-brand-700 hover:bg-brand-800 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Book This Event Feast</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(`Vanakkam Sri Lakshmi HomeFood! I want to book: ${plan.name} for our upcoming family function.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-brand-50 text-brand-800 border border-brand-300 font-bold py-2.5 px-4 rounded-2xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-brand-600" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
