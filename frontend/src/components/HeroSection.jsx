import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onShowPlans }) {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-950 text-white min-h-[460px] sm:min-h-[510px] lg:min-h-[550px] flex items-end">
      
      {/* High-Resolution 4K Kitchen Background with Low-Opacity Brand Tint */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/assets/kitchen-bg-4k.jpg')` }}
      />
      <div className="absolute inset-0 bg-brand-950/35 bg-gradient-to-r from-brand-950/60 via-brand-900/30 to-brand-950/45 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-4 sm:pt-6 pb-0">
        
        {/* Top Pill: Simple Plans. Easy Subscription (Slightly brought down) */}
        <div className="flex justify-end mt-2 sm:mt-4 mb-2 sm:mb-3">
          <div className="inline-flex flex-col bg-white text-slate-900 px-4 py-2 sm:px-5 sm:py-2 rounded-2xl shadow-xl text-left border border-white/20 transform translate-y-2 sm:translate-y-3">
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">Simple Plans.</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 leading-tight">Easy Subscription</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Side: Changed title fully (same genre), yellow animated strike-through on hotel, handwritten home cook, subtext, Explore Plans button */}
          <div className="lg:col-span-7 space-y-4 text-left pb-6 sm:pb-8">
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.16] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Tired of daily meals from a <br className="hidden sm:inline" />
              <span className="strike-yellow text-white">hotel</span> near you?
            </h1>

            {/* Handwritten yellow script font directly under hotel */}
            <div className="-mt-2 sm:-mt-3 pl-2 sm:pl-3">
              <span className="font-handwriting text-yellow-300 text-3xl sm:text-4xl lg:text-5xl font-bold -rotate-3 inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                home cook
              </span>
            </div>

            {/* Same Subtitle Text as Reference Image */}
            <p className="text-base sm:text-lg font-medium text-emerald-100 tracking-wide drop-shadow-sm pt-0.5">
              Your Daily Home-Cooked Food
            </p>

            {/* Explore Plans Pill Button */}
            <div className="pt-1.5 space-y-2">
              <button 
                onClick={onShowPlans}
                className="inline-flex items-center gap-2 bg-amber-50 hover:bg-white text-slate-900 font-extrabold px-7 py-3 rounded-full text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span>Explore Plans</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>
              <div className="text-xs text-emerald-200/90 font-medium pl-1">
                Freshly cooked daily. Limited slots available.
              </div>
            </div>

          </div>

          {/* Right Side: Big Sized Cutout Lady (Clean Defringed Body Shape with no background) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end relative self-end">
            <img 
              src="/assets/home-chef-mom.png" 
              alt="Sri Lakshmi Home Food - Loving Home Cook Mom" 
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="w-auto h-auto max-h-[420px] sm:max-h-[490px] lg:max-h-[540px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] pointer-events-none transition-transform duration-300 hover:scale-102"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
