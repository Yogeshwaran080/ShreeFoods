import React from 'react';
import { MapPin, Clock, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';

export default function DeliveryAreas({ onOpenWhatsAppWithTopic }) {
  const areas = [
    {
      name: 'Guduvancheri',
      status: 'Primary Hub (Zero Delivery Fee)',
      timing: 'Lunch: 12:15 - 1:00 PM | Dinner: 7:30 - 8:30 PM',
      popular: 'SRM Nagar, Thiruporur Road, Mahindra World City, Nandivaram'
    },
    {
      name: 'Urapakkam',
      status: 'Fast Delivery Zone',
      timing: 'Lunch: 12:30 - 1:15 PM | Dinner: 7:45 - 8:30 PM',
      popular: 'Karanai Puducherry, Revathipuram, Railway Station surroundings'
    },
    {
      name: 'SRM Surroundings',
      status: 'Student & Resident Priority Hub',
      timing: 'Lunch: 12:15 - 1:15 PM | Dinner: 7:30 - 8:30 PM',
      popular: 'Potheri, Kattankulathur, SRM University Gate surroundings, Abode Valley'
    },
    {
      name: 'Surrounding Hubs',
      status: 'Daily Delivery Route',
      timing: 'Lunch: 12:30 - 1:30 PM | Dinner: 7:30 - 8:30 PM',
      popular: 'Maraimalai Nagar, Vallanchery, Thailavaram, and nearby residential apartments'
    }
  ];

  return (
    <section id="delivery-areas" className="py-16 sm:py-20 bg-white border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-brand-700 text-xs font-bold uppercase tracking-widest mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Delivery Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Delivery Areas &amp; Schedules
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Fresh homemade meals delivered steaming hot daily from our home kitchens to your doorstep.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {areas.map((area, idx) => (
            <div 
              key={idx}
              className="bg-brand-50/40 rounded-3xl p-6 border-2 border-brand-100 hover:border-brand-500 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-200 flex items-center justify-center text-brand-700 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-brand-800 bg-brand-100/90 px-2.5 py-0.5 rounded-full">
                    {area.status}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2">
                  {area.name}
                </h3>

                <div className="space-y-2 text-xs text-slate-600 mb-4">
                  <div className="flex items-start gap-1.5 font-medium text-slate-700">
                    <Clock className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>{area.timing}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <strong>Popular Areas:</strong> {area.popular}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80">
                <button
                  onClick={() => onOpenWhatsAppWithTopic(`Hi, can you check delivery availability for my location in ${area.name}?`)}
                  className="w-full bg-white hover:bg-brand-50 text-brand-800 border border-brand-300 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-brand-600" />
                  <span>Check Delivery on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-brand-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-800 flex items-center justify-center text-green-300 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-base">Not in these exact areas?</div>
              <div className="text-xs text-green-200">Contact us on WhatsApp. We accommodate nearby routes and event catering bookings easily!</div>
            </div>
          </div>

          <button
            onClick={() => onOpenWhatsAppWithTopic('Hi! I want to check delivery for a nearby area.')}
            className="bg-white hover:bg-green-50 text-brand-950 font-bold px-6 py-3 rounded-xl text-xs whitespace-nowrap shadow-md transition-all"
          >
            Check Other Locations
          </button>
        </div>

      </div>
    </section>
  );
}
