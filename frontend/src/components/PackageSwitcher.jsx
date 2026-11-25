import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function PackageSwitcher({ onOpenWhatsAppWithTopic }) {
  const [monthlyDiet, setMonthlyDiet] = useState('veg'); // 'veg' | 'non-veg'

  const packages = [
    {
      id: 'only-lunch',
      name: 'Only Lunch',
      image: '/assets/menu-lunch.jpg',
      imageAlt: 'Authentic Chettinad Lunch Meals',
      description:
        'Traditional Chettinad afternoon feast served hot with steaming Ponni rice, wood-pressed oil tadka, aromatic arachuvitta sambar, and authentic pepper rasam. Complemented with fresh seasonal poriyal, kootu, homestyle curd, and crunchy appalam prepared fresh daily.',
      type: 'regular'
    },
    {
      id: 'only-dinner',
      name: 'Only Dinner',
      image: '/assets/menu-dinner.jpg',
      imageAlt: 'Nutritious Tamil Nadu Dinner',
      description:
        'Light and wholesome Tamil Nadu night dinner featuring soft hand-rolled whole wheat phulkas and steaming mallipoo idlis. Served with slow-simmered Chettinad vegetable kurma, yellow dal tadka, and freshly ground coconut-coriander chutney crafted with zero soda and minimal oil.',
      type: 'regular'
    },
    {
      id: 'only-tiffen',
      name: 'Only Tiffen',
      image: '/assets/menu-tiffen.jpg',
      imageAlt: 'South Indian Breakfast & Tiffin',
      description:
        'Authentic South Indian morning tiffin made with naturally fermented batter, offering fluffy mallipoo idlis, golden crispy cone ghee roast dosas, and fragrant ven pongal. Paired with slow-brewed drumstick sambar, spicy Chettinad kara chutney, and coconut chutney.',
      type: 'regular'
    },
    {
      id: 'weekend-combo',
      name: 'Weekend Saturday Sunday Combo',
      image: '/assets/menu-weekend.jpg',
      imageAlt: 'Weekend Chettinad Feast',
      description:
        'A lavish Tamil Nadu weekend celebration feast headlined by aromatic Seeraga Samba biryani, crispy medu vadai, and golden potato roast varuval. Finished with rich Kalyana feast sambar, pachadi, crispy appalam, and hot traditional payasam.',
      type: 'weekend'
    }
  ];

  return (
    <section id="plans" className="py-16 sm:py-24 bg-white border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif italic">
            Our Homestyle Menu
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Fresh traditional cooking with cold-pressed oils and pure ingredients. Order daily single meals or our signature monthly subscription.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Regular Menu Cards (1. Only Lunch, 2. Only Dinner, 3. Only Tiffen, 4. Weekend Combo) */}
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-6 border-2 border-brand-100 hover:border-brand-500 shadow-lg hover:shadow-xl transition-all relative flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 shadow-sm bg-slate-100">
                  <img
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                <h4 className="text-2xl font-black text-slate-900 font-serif italic">{pkg.name}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mt-2.5 mb-6">{pkg.description}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenWhatsAppWithTopic(`Inquiry about ${pkg.name} homestyle delivery`)}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 text-sm sm:text-base group"
                >
                  <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          ))}

          {/* 5. Daily / Monthly Combo (Professional Black Hotel Theme with Original Veg / Non-Veg Toggle) */}
          <div className="bg-[#09090b] text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl transition-all relative flex flex-col justify-between md:col-span-2 lg:col-span-2 group">

            <div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                <div className="md:col-span-5 relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg bg-zinc-900 border border-zinc-800">
                  <img
                    src="/assets/menu-monthly.jpg"
                    alt="Chettinad Monthly Home Feast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
                <div className="md:col-span-7">
                  <h4 className="text-2xl sm:text-3xl font-black text-white font-serif italic">Daily &amp; Monthly Combo</h4>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mt-2">
                    Our signature 30-day homestyle dining subscription prepared in authentic earthen clay pots using cold-pressed oils. Enjoy daily rotating Chettinad and Tamil home delicacies delivered hot in insulated containers, with complete freedom to pause or resume anytime via WhatsApp.
                  </p>
                </div>
              </div>

              {/* Professional Hotel-Style Original Veg & Non-Veg Symbol Toggle Only */}
              <div className="bg-[#121216] p-4 sm:p-5 rounded-2xl border border-zinc-800 mb-6 shadow-inner flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider">
                  Select Meal Preference
                </div>

                {/* Interactive Toggle Switch with Authentic Veg & Non-Veg Symbols */}
                <div className="inline-flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setMonthlyDiet('veg')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                      monthlyDiet === 'veg'
                        ? 'bg-zinc-800 text-white shadow'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {/* Authentic Indian Veg Symbol (Green Square + Green Circle) */}
                    <span className="w-4 h-4 border-2 border-green-500 flex items-center justify-center rounded-[3px] shrink-0">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </span>
                    <span>Pure Veg</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMonthlyDiet('non-veg')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                      monthlyDiet === 'non-veg'
                        ? 'bg-zinc-800 text-white shadow'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {/* Authentic Indian Non-Veg Symbol (Red Square + Red Dot) */}
                    <span className="w-4 h-4 border-2 border-red-500 flex items-center justify-center rounded-[3px] shrink-0">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    </span>
                    <span>Non-Veg</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() =>
                  onOpenWhatsAppWithTopic(
                    `Inquiry about Daily & Monthly Combo (${monthlyDiet === 'veg' ? 'Pure Veg' : 'Non-Veg'}) homestyle delivery`
                  )
                }
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 text-sm sm:text-base group"
              >
                <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>Send Message for {monthlyDiet === 'veg' ? 'Pure Veg' : 'Non-Veg'} Combo</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
