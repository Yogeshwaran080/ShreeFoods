import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare, ThumbsUp, Award, ExternalLink, Filter } from 'lucide-react';

export default function ReviewsPage({ onNavigateToBooking, onOpenWhatsAppWithTopic }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'subscription' | 'event'

  const reviews = [
    {
      id: 1,
      name: 'Karthik & Deepa Narayanan',
      location: 'Urappakam',
      type: 'event',
      plan: 'Kalyana Elai Saapadu Mini (15 Pax)',
      rating: 5,
      date: '2 days ago',
      source: 'Google Reviews',
      comment: 'Ordered for our Gruhapravesam (housewarming) pooja for 15 family members. The food was delivered piping hot in thermal boxes with fresh cut banana leaves. Every single guest praised the Arachuvitta Sambar, Medu Vada, and Mysore Rasam. Truly homestyle without heavy soda or restaurant oiliness!',
      verified: true
    },
    {
      id: 2,
      name: 'Suresh Raghavan',
      location: 'Guduvancherry',
      type: 'subscription',
      plan: 'Amma Veg Lunch Feast (Monthly)',
      rating: 5,
      date: '1 week ago',
      source: 'Swiggy',
      comment: 'I have been taking their monthly lunch subscription for the past 3 months. Prompt delivery exactly at 12:45 PM. The Poriyal and Kootu change daily, and it feels exactly like food cooked by my own mother. Best decision for working bachelors and elderly parents.',
      verified: true
    },
    {
      id: 3,
      name: 'Dr. Meenakshi Sundaram',
      location: 'SRM Nagar, Potheri',
      type: 'event',
      plan: 'Maharaja Virundhu Package (25 Pax)',
      rating: 5,
      date: '2 weeks ago',
      source: 'Zomato',
      comment: 'Booked their 25 members Maharaja package for our Sashtiabdapoorthi family get-together. The 50% advance booking gave us complete peace of mind. Everything from the Bisibelebath to the hot Gulab Jamun and Semiya Payasam was top-notch quality.',
      verified: true
    },
    {
      id: 4,
      name: 'Venkatesh Prasad',
      location: 'Kattankulathur',
      type: 'subscription',
      plan: 'Executive Twin Feast (Lunch + Dinner)',
      rating: 5,
      date: '3 weeks ago',
      source: 'Swiggy',
      comment: 'Taking both lunch and dinner. The phulkas and soft idlis for dinner with fresh chutney are wonderful. Clean packaging, no plastic odor, and they accommodated my request for less spice easily.',
      verified: true
    },
    {
      id: 5,
      name: 'Anand & Revathi',
      location: 'Guduvancherry',
      type: 'event',
      plan: 'Utsavam Grand Celebration (30 Pax)',
      rating: 5,
      date: '1 month ago',
      source: 'Google Reviews',
      comment: 'We needed authentic food for 30 people on my son’s first birthday. Guests were blown away by the taste and the promptness. Appalams were crunchy, and the veg biryani aroma was divine. Highly recommended!',
      verified: true
    },
    {
      id: 6,
      name: 'Preethi S.',
      location: 'Urappakam',
      type: 'subscription',
      plan: 'Traditional Tiffin Club',
      rating: 5,
      date: '1 month ago',
      source: 'Zomato',
      comment: 'The morning Pongal, Medu Vada, and millet idlis remind me of traditional temple prasadam flavors. Zero acidity after eating. Amazing team!',
      verified: true
    }
  ];

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.type === filter);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Customer Love &amp; Platform Ratings
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mt-3">
          See what our daily subscribers and family event hosts across Guduvancheri, Urapakkam, and SRM Surroundings say about our cooking.
        </p>
      </div>

      {/* SWIGGY, ZOMATO & GOOGLE OFFICIAL RATING SCORECARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        
        {/* Swiggy Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-orange-200 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-orange-50 rounded-full blur-2xl -z-10"></div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/* Swiggy Brand Icon Style */}
                <div className="w-10 h-10 rounded-xl bg-[#fc8019] flex items-center justify-center text-white font-black text-xl shadow-md">
                  S
                </div>
                <div>
                  <div className="font-black text-slate-900 text-lg leading-tight">Swiggy</div>
                  <div className="text-xs text-slate-500 font-medium">Verified Delivery Partner</div>
                </div>
              </div>
              <span className="bg-orange-100 text-[#fc8019] text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> TOP RATED
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-3">
              <span className="text-4xl sm:text-5xl font-black text-slate-900">4.8</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-600 font-medium mb-4">
              Based on <strong>1,450+ verified customer orders</strong>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
              Consistently rated &quot;Best South Indian Homestyle Kitchen&quot; for piping hot thermal packing and zero-preservative food.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#fc8019]">
            <span>Fast 30-min Delivery Area</span>
            <span>Guduvancherry Zone</span>
          </div>
        </div>

        {/* Zomato Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-rose-200 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-rose-50 rounded-full blur-2xl -z-10"></div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/* Zomato Brand Icon Style */}
                <div className="w-10 h-10 rounded-xl bg-[#e23744] flex items-center justify-center text-white font-black text-xl shadow-md">
                  Z
                </div>
                <div>
                  <div className="font-black text-slate-900 text-lg leading-tight">Zomato</div>
                  <div className="text-xs text-slate-500 font-medium">Dining &amp; Catering</div>
                </div>
              </div>
              <span className="bg-rose-100 text-[#e23744] text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> POPULAR CHOICE
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-3">
              <span className="text-4xl sm:text-5xl font-black text-slate-900">4.7</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-600 font-medium mb-4">
              Based on <strong>980+ authentic food lover reviews</strong>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
              Awarded high praise for genuine South Indian temple-style sambar, crispy medu vadas, and authentic wedding leaf banquet boxes.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#e23744]">
            <span>Pure Vegetarian Quality</span>
            <span>FSSAI Certified</span>
          </div>
        </div>

        {/* Google Reviews Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-200 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-blue-50 rounded-full blur-2xl -z-10"></div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#4285f4] flex items-center justify-center text-white font-black text-xl shadow-md">
                  G
                </div>
                <div>
                  <div className="font-black text-slate-900 text-lg leading-tight">Google Reviews</div>
                  <div className="text-xs text-slate-500 font-medium">Local Business Profile</div>
                </div>
              </div>
              <span className="bg-blue-100 text-[#4285f4] text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 100% VERIFIED
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-3">
              <span className="text-4xl sm:text-5xl font-black text-slate-900">4.9</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-600 font-medium mb-4">
              From <strong>420+ local family reviews</strong>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
              Loved by families for housewarmings, poojas, birthday gatherings, and daily office lunch boxes across Guduvancheri, Urapakkam &amp; SRM Surroundings.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#4285f4]">
            <span>Local Community Favorite</span>
            <span>50% Advance Guarantee</span>
          </div>
        </div>

      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Filter By Category:</span>
        </div>

        <div className="inline-flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-brand-700 text-white shadow' : 'text-slate-600 hover:text-brand-700'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilter('subscription')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'subscription' ? 'bg-brand-700 text-white shadow' : 'text-slate-600 hover:text-brand-700'
            }`}
          >
            Monthly Subscriptions
          </button>
          <button
            onClick={() => setFilter('event')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'event' ? 'bg-brand-700 text-white shadow' : 'text-slate-600 hover:text-brand-700'
            }`}
          >
            Event Feasts (10-30 Members)
          </button>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredReviews.map((rev) => (
          <div key={rev.id} className="bg-white rounded-3xl p-6 border border-brand-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-400">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                &quot;{rev.comment}&quot;
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-brand-600" title="Verified Customer" />
                    )}
                  </div>
                  <div className="text-xs text-slate-500">📍 {rev.location} • <span className="text-brand-700 font-semibold">{rev.plan}</span></div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  via {rev.source}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM CTA: BOOK OR INQUIRE */}
      <div className="bg-gradient-to-r from-brand-800 to-brand-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-black">Experience the Homestyle Taste Yourself</h3>
          <p className="text-green-100 text-sm max-w-xl">
            Join hundreds of happy families in Guduvancheri, Urapakkam, and SRM Surroundings. Book a meal plan or catering for your upcoming function.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onNavigateToBooking}
            className="w-full sm:w-auto bg-white hover:bg-green-50 text-brand-900 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-sm whitespace-nowrap"
          >
            Book Your Meal Plan
          </button>
          <button
            onClick={() => onOpenWhatsAppWithTopic('Vanakkam! I saw your high Swiggy & Zomato ratings and want to order.')}
            className="w-full sm:w-auto bg-brand-900/50 hover:bg-brand-900 text-white border border-green-300 font-bold px-6 py-3.5 rounded-2xl transition-all text-sm whitespace-nowrap flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-green-300" />
            WhatsApp Us
          </button>
        </div>
      </div>

    </div>
  );
}
