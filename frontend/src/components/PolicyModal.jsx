import React from 'react';
import { X, ShieldCheck, FileText, Sparkles } from 'lucide-react';

const POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    icon: ShieldCheck,
    updated: 'Last updated: November 2026',
    sections: [
      {
        heading: '1. Information We Collect',
        body: 'When you subscribe to daily meals or submit a catering inquiry, we collect only your name, WhatsApp contact number, delivery address (or optional GPS pin), and meal preferences.'
      },
      {
        heading: '2. How We Use Your Details',
        body: 'Your information is used strictly to prepare your preferred meals, coordinate timely doorstep delivery across Guduvancheri, Urapakkam & SRM Surroundings, and send order/pause confirmations via WhatsApp.'
      },
      {
        heading: '3. Data Confidentiality',
        body: 'We never sell, rent, or share your phone number or home address with third-party marketers. Your contact details remain strictly confidential within the Sri Lakshmi Home Food kitchen team.'
      },
      {
        heading: '4. Data Removal Requests',
        body: 'You may request deletion of your order history or contact details anytime by messaging us on WhatsApp or emailing srilakshmihomefoods@gmail.com.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    icon: FileText,
    updated: 'Last updated: November 2026',
    sections: [
      {
        heading: '1. Service Coverage & Timings',
        body: 'Daily meal deliveries operate across Guduvancheri, Urapakkam, and SRM Surroundings (Potheri & Kattankulathur). Standard delivery windows are Breakfast (7:30–8:30 AM), Lunch (12:15–1:15 PM), and Dinner (7:30–8:30 PM).'
      },
      {
        heading: '2. Flexible Subscription Pause & Carry-Forward',
        body: 'Monthly subscribers can pause meals anytime when traveling or away. Simply message us on WhatsApp at least a day prior (or before 8:00 AM for same-day lunch/dinner updates), and unused days will be carried forward seamlessly.'
      },
      {
        heading: '3. Event Catering Orders (10–30 Members)',
        body: 'Event feast bookings require a 50% advance confirmation to secure fresh ingredient procurement and your preferred delivery slot, with the remaining 50% payable upon delivery.'
      },
      {
        heading: '4. Delivery Access',
        body: 'Please provide clear landmark/apartment gate details or use Current Location GPS so our delivery partner can hand over your hot food containers without delay.'
      }
    ]
  },
  hygiene: {
    title: 'Food Safety & Hygiene',
    icon: Sparkles,
    updated: 'FSSAI LIC: 22423567000189',
    sections: [
      {
        heading: '1. FSSAI Certified Homestyle Kitchen',
        body: 'Sri Lakshmi Home Food operates under active FSSAI registration (LIC: 22423567000189). Every batch is cooked in clean, inspected residential kitchens by experienced mothers.'
      },
      {
        heading: '2. Pure Ingredients & Wood-Pressed Oils',
        body: 'We cook exclusively with traditional cold-pressed (chekku) oils, freshly ground Chettinad spices, and RO-purified water. We strictly use zero cooking soda, zero artificial colors, zero MSG, and zero preservatives.'
      },
      {
        heading: '3. Kitchen Sanitation Protocols',
        body: 'Vegetables and grains are thoroughly washed and soaked prior to cooking. Our kitchen maintains daily surface sanitization, clean utensils, hairnets, and strict separation between Pure Veg and Non-Veg preparation.'
      },
      {
        heading: '4. Hot Insulated Packaging',
        body: 'All meals are packed piping hot in food-grade leakproof thermal containers or reusable stainless-steel tiffins to preserve warmth, nutrition, and freshness until they reach your table.'
      }
    ]
  }
};

export default function PolicyModal({ activePolicy, onClose }) {
  if (!activePolicy || !POLICIES[activePolicy]) return null;

  const policy = POLICIES[activePolicy];
  const Icon = policy.icon;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#09090b] text-white px-6 py-5 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ea580c] flex items-center justify-center text-white shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black font-serif italic text-white leading-tight">
                {policy.title}
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">{policy.updated}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close policy modal"
            className="text-zinc-400 hover:text-white p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm text-slate-600 leading-relaxed">
          {policy.sections.map((sec, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mb-1.5">
                {sec.heading}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
