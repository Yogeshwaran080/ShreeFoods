import React, { useState } from 'react';
import { Camera, Eye, ArrowRight, Sparkles, Filter, MessageCircle } from 'lucide-react';

export default function GalleryPage({ onNavigateToBooking, onOpenWhatsAppWithTopic }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const galleryItems = [
    {
      id: 1,
      title: 'Traditional Banana Leaf Virundhu Feast',
      category: 'feasts',
      caption: 'Full 14-item traditional South Indian wedding style spread served on tender cut banana leaves.',
      tag: 'Banana Leaf Meal',
      imgSrc: '/assets/logo-leaf.svg',
      isSvgPlaceholder: true
    },
    {
      id: 2,
      title: 'Homestyle Kitchen Ammas Cooking with Love',
      category: 'kitchen',
      caption: 'Our experienced women home-chefs preparing steaming hot meals with hygienic white aprons and hairnets.',
      tag: '100% Hygienic',
      imgSrc: '/assets/hero-ladies.svg',
      isSvgPlaceholder: false
    },
    {
      id: 3,
      title: 'Pooja & Housewarming Mini Catering (10-30 Pax)',
      category: 'catering',
      caption: 'Complete mini-event banquet packed in thermal warmers with fresh banana leaves, cups, and spoons.',
      tag: '10-30 Members',
      imgSrc: '/assets/hero-ladies.svg',
      isSvgPlaceholder: false
    },
    {
      id: 4,
      title: 'Crispy Medu Vadas & Fresh Coconut Chutney',
      category: 'delicacies',
      caption: 'Golden crispy crust, fluffy inside, fried in fresh groundnut oil without artificial soda.',
      tag: 'Delicacy',
      imgSrc: '/assets/vada.svg',
      isSvgPlaceholder: true
    },
    {
      id: 5,
      title: 'Glistening Hot Gulab Jamun with Saffron & Elaichi',
      category: 'delicacies',
      caption: 'Traditional khoya sweet simmered in aromatic green cardamom syrup with pistachio slivers.',
      tag: 'Fresh Sweet',
      imgSrc: '/assets/gulab-jamun.svg',
      isSvgPlaceholder: true
    },
    {
      id: 6,
      title: 'Crisp Blistered Appalam (Papad)',
      category: 'delicacies',
      caption: 'Sun-dried lentil wafer fried to golden perfection, essential for every leaf feast.',
      tag: 'Traditional Crunch',
      imgSrc: '/assets/appalam.svg',
      isSvgPlaceholder: true
    },
    {
      id: 7,
      title: 'Daily Lunch Box Thermal Packaging',
      category: 'boxes',
      caption: 'Leakproof insulated thermal containers that keep Ponni rice, Sambar, Rasam, and Kootu steaming hot until 1:00 PM.',
      tag: 'Monthly Subscription',
      imgSrc: '/assets/logo-leaf.svg',
      isSvgPlaceholder: true
    },
    {
      id: 8,
      title: 'Stone-Ground Masala Roasting & Spices',
      category: 'kitchen',
      caption: 'Freshly roasted whole coriander, cumin, red chilies, and black pepper ground weekly in our kitchen.',
      tag: 'Zero Preservatives',
      imgSrc: '/assets/hero-ladies.svg',
      isSvgPlaceholder: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'feasts', label: 'Banana Leaf Feasts' },
    { id: 'catering', label: 'Event Food (10-30 Pax)' },
    { id: 'boxes', label: 'Daily Meal Boxes' },
    { id: 'delicacies', label: 'Sweets & Savories' },
    { id: 'kitchen', label: 'Kitchen & Hygiene' }
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Our Food &amp; Kitchen Photo Gallery
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mt-3">
          Explore our authentic banana leaf feasts, daily subscription packing, pooja party spreads, and traditional Amma kitchen hygiene.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-brand-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:text-brand-700 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-brand-100 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            {/* Image Container with Hover Zoom */}
            <div className="relative h-56 bg-brand-50/50 overflow-hidden flex items-center justify-center p-6 border-b border-slate-100">
              <img 
                src={item.imgSrc} 
                alt={item.title}
                className={`max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 ${
                  item.isSvgPlaceholder ? 'p-2' : 'w-full h-full object-cover rounded-2xl'
                }`}
              />

              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-900 font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                {item.tag}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-brand-700 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenWhatsAppWithTopic(`Hello! I saw ${item.title} in your photo gallery and want to order this.`)}
                  className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Order This Dish
                </button>
                <span className="text-[10px] font-semibold text-slate-400">
                  📍 Fresh Daily
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Easy Custom Photo Slot Instruction for the Owner */}
      <div className="bg-brand-50 border-2 border-dashed border-brand-300 rounded-3xl p-6 sm:p-8 text-center max-w-3xl mx-auto mb-16">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-700 mx-auto mb-3 shadow-sm">
          <Camera className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-brand-900">Have Your Own Kitchen &amp; Event Photos?</h4>
        <p className="text-xs text-slate-600 mt-1 max-w-lg mx-auto">
          You can easily add all your high-resolution food and function photos into the <code className="bg-white px-2 py-0.5 rounded text-brand-800 font-mono">frontend/public/assets/</code> folder to showcase them on this gallery page anytime.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-white border border-brand-200 rounded-3xl p-8 sm:p-10 shadow-lg">
        <h3 className="text-2xl font-black text-slate-900">Planning a Function or Daily Meal Plan?</h3>
        <p className="text-slate-600 text-sm mt-1 max-w-xl mx-auto">
          We cater for 10 to 30 guests with fresh banana leaves and supply monthly meal subscriptions across Guduvancheri, Urapakkam, and SRM Surroundings.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={onNavigateToBooking}
            className="bg-brand-700 hover:bg-brand-800 text-white font-bold px-7 py-3.5 rounded-2xl shadow-md transition-all text-sm flex items-center gap-2"
          >
            <span>Book Your Food Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenWhatsAppWithTopic('Vanakkam! I want to discuss catering for our upcoming family event.')}
            className="bg-white hover:bg-brand-50 text-brand-800 border-2 border-brand-600 font-bold px-6 py-3 rounded-2xl transition-all text-sm flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-brand-600" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>

    </div>
  );
}
