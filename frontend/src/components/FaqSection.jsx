import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const faqs = [
    {
      q: 'Which areas do you deliver to?',
      a: 'We deliver daily hot homestyle meals across Guduvancheri, Urapakkam, and SRM Surroundings (Potheri & Kattankulathur), including all major apartment complexes and student residences.'
    },
    {
      q: 'Can I pause or adjust my Monthly Subscription days?',
      a: 'Yes, completely flexible! If you are traveling, going on holiday, or dining out, simply drop a quick WhatsApp message a day prior. We will pause your delivery and carry forward your days seamlessly.'
    },
    {
      q: 'Is the food really 100% home-cooked?',
      a: 'Yes, strictly homestyle cooking by experienced mothers! We use traditional wood-pressed oils, pure ingredients, freshly ground spices, zero cooking soda, and no artificial coloring or preservatives.'
    },
    {
      q: 'What are the daily delivery time slots?',
      a: 'Morning Breakfast: 7:30 AM – 8:30 AM | Afternoon Lunch: 12:15 PM – 1:15 PM | Night Dinner: 7:30 PM – 8:30 PM. All food is delivered hot in insulated thermal food containers.'
    },
    {
      q: 'How do I order or start a trial meal?',
      a: 'Simply click the Send Message button on your preferred menu package above to message our kitchen directly on WhatsApp, or complete the booking form below. We will confirm your timing and address immediately.'
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header - No pill tags, curved cravings title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-serif italic text-black">
            Know Your Answers Here!
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Everything you crave to know about our hot, freshly prepared daily homestyle food.
          </p>
        </div>

        {/* FAQ Accordions */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-slate-50 rounded-2xl border border-slate-200 p-5 open:bg-amber-50/40 hover:border-amber-300 transition-all cursor-pointer shadow-sm"
                >
                  <summary className="flex justify-between items-center font-extrabold text-slate-900 text-base sm:text-lg list-none">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-amber-600 transition-transform duration-300 group-open:rotate-180 shrink-0 ml-2" />
                  </summary>
                  <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed border-t border-slate-200/80 pt-3">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

        </div>
    </section>
  );
}
