import React, { useState } from 'react';
import { X, Sparkles, ChevronRight, MessageCircle } from 'lucide-react';

export default function ChefLakshmiAvatar({ onSelectPlanType, onOpenWhatsApp }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating 3D Lady Avatar Widget */}
      <div className="lady-avatar-float" id="ladyAvatarWidget">
        
        {/* 3D Avatar Image with white cooking wear */}
        <div 
          className="lady-avatar-img-box" 
          onClick={() => setIsModalOpen(true)} 
          title="Click to chat with Chef Lakshmi"
        >
          <img 
            src="/assets/lady-avatar-3d.svg" 
            alt="Chef Lakshmi 3D Avatar in white chef wear" 
            className="w-full h-full object-contain" 
          />
        </div>

        {/* Speech bubble with live greeting */}
        <div 
          className="lady-speech-bubble" 
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center gap-1.5 font-bold text-brand-800 text-xs mb-0.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Chef Lakshmi Akka</span>
          </div>
          <p className="text-slate-700 text-xs">
            வணக்கம்! Looking for daily lunch or a 10–30 members feast? <strong>Click me for suggestions!</strong>
          </p>
        </div>

      </div>

      {/* 3D Lady Assistant Trust & Recommendation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-brand-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-brand-800 to-brand-700 text-white p-6 relative">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-5 right-5 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md border-2 border-green-300">
                  <img src="/assets/lady-avatar-3d.svg" alt="Chef Lakshmi" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 bg-green-900/60 text-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                    <Sparkles className="w-3 h-3" /> Head Homestyle Chef &amp; Co-Founder
                  </div>
                  <h3 className="text-xl font-bold">Chef Lakshmi (அன்னபூரணி)</h3>
                  <p className="text-xs text-green-100">"Motherly cooking with pure ingredients &amp; sincere hygiene."</p>
                </div>
              </div>
            </div>

            {/* Modal Body: Recommendations */}
            <div className="p-6 space-y-5">
              
              <div className="bg-brand-50 p-4 rounded-2xl border border-brand-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-brand-900">How can I assist you today?</span>
                <p className="mt-1">Tell me what you are looking for, and I will recommend the best homestyle plan for you.</p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    onSelectPlanType('daily-lunch');
                  }}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 text-brand-800 flex items-center justify-center font-bold">🍲</div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-brand-700">Need Daily Fresh Office/Home Lunch</div>
                      <div className="text-xs text-slate-500">Monthly subscription at ₹134/day with free delivery</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                </button>

                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    onSelectPlanType('event-catering');
                  }}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">🌿</div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-brand-700">Event Catering for 10 to 30 Guests</div>
                      <div className="text-xs text-slate-500">Pooja, Housewarming, Birthday banana leaf feasts</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                </button>

                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    onOpenWhatsApp('Hello Chef Lakshmi, I would like to order a 1-day taste trial box before subscribing.');
                  }}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">📦</div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-brand-700">Order 1-Day Trial Box (Taste Test)</div>
                      <div className="text-xs text-slate-500">Taste our homestyle cooking before committing</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                </button>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    onOpenWhatsApp('Hello Chef Lakshmi, I would like to consult with you directly.');
                  }}
                  className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" /> Chat on WhatsApp with Lakshmi Akka
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
