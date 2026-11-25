import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import RatingsBar from './components/RatingsBar';
import PackageSwitcher from './components/PackageSwitcher';
import EventPackages from './components/EventPackages';
import BookingForm from './components/BookingForm';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import PolicyModal from './components/PolicyModal';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

const RESTAURANT_WHATSAPP = '917200451980';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'plans' | 'events'
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState('');
  const [activePolicy, setActivePolicy] = useState(null); // 'privacy' | 'terms' | 'hygiene' | null

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'plans', 'events'].includes(hash)) {
        setCurrentView(hash);
      }
    };
    handleHash();
    window.addEventListener('popstate', handleHash);
    return () => window.removeEventListener('popstate', handleHash);
  }, []);

  const changeView = (view) => {
    setCurrentView(view);
    window.location.hash = `#${view}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (planName) => {
    setSelectedPlanForBooking(planName);
    const formEl = document.getElementById('order-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      changeView('home');
      setTimeout(() => {
        const el = document.getElementById('order-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased selection:bg-brand-500 selection:text-white flex flex-col justify-between">
      <div>
        {/* Clean Navbar: Only Home, Plans, and Event Packages */}
        <Navbar
          currentView={currentView}
          onChangeView={changeView}
        />

        {/* View 1: Home View */}
        {currentView === 'home' && (
          <main className="animate-in fade-in duration-300">
            <HeroSection
              onShowPlans={() => {
                const el = document.getElementById('plans');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else changeView('plans');
              }}
            />

            {/* Verified Ratings Bar: Swiggy 4.3 ★ and Zomato 4.2+ ★ */}
            <RatingsBar />

            {/* Menu Section (Only Lunch, Only Dinner, Only Tiffen, Weekend Combo, Monthly Combo with Veg 189 & Non-Veg 200) */}
            <PackageSwitcher
              onProceedToPayment={(orderData) => handleSelectPlan(orderData.packageName)}
              onOpenWhatsAppWithTopic={(topic) => {
                const url = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(topic)}`;
                window.open(url, '_blank');
              }}
            />

            {/* 3D Swipable Customer Reviews (Dark Orange & Black) */}
            <ReviewsSection />

            {/* FAQ Section (Know Your Answers Here!) */}
            <FaqSection />

            {/* Booking Form */}
            <BookingForm
              preselectedPlan={selectedPlanForBooking}
            />
          </main>
        )}

        {/* View 2: Plans View */}
        {currentView === 'plans' && (
          <main className="animate-in fade-in duration-300">
            <PackageSwitcher
              onProceedToPayment={(orderData) => handleSelectPlan(orderData.packageName)}
              onOpenWhatsAppWithTopic={(topic) => {
                const url = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(topic)}`;
                window.open(url, '_blank');
              }}
            />
            <BookingForm
              preselectedPlan={selectedPlanForBooking}
            />
          </main>
        )}

        {/* View 3: Event Packages (10-30 Members) */}
        {currentView === 'events' && (
          <main className="animate-in fade-in duration-300">
            <EventPackages
              onSelectEventPlan={handleSelectPlan}
            />
            <BookingForm
              preselectedPlan={selectedPlanForBooking}
            />
          </main>
        )}
      </div>

      {/* Monochrome Production Level Footer */}
      <footer className="bg-[#0b0f17] text-slate-400 pt-16 pb-12 border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 96 84" className="w-11 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="footerLeafGrad" x1="0%" y1="20%" x2="100%" y2="80%">
                      <stop offset="0%" stopColor="#15803d" />
                      <stop offset="50%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#166534" />
                    </linearGradient>
                  </defs>
                  <path d="M 8 42 C 12 14, 46 4, 82 10 C 95 28, 96 58, 78 72 C 42 80, 12 70, 8 42 Z" fill="url(#footerLeafGrad)" stroke="#fef08a" strokeWidth="1.2" strokeOpacity="0.45" />
                  <path d="M 8 42 Q 46 41 86 41" stroke="#86efac" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.65" />
                  <text x="48" y="53" textAnchor="middle" fill="#ffffff" fontSize="30" fontWeight="700" fontFamily="'Noto Sans Tamil', 'Latha', 'Vijaya', serif">ஸ்ரீ</text>
                </svg>
                <div>
                  <div className="text-xl font-black tracking-wide text-white font-serif italic leading-none">
                    Sri Lakshmi
                  </div>
                  <div className="text-[11px] font-bold tracking-[0.25em] text-emerald-400 uppercase mt-1">
                    HOME FOOD
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Authentic South Indian homestyle food catering and monthly meal subscriptions. Cooked fresh by loving home-chefs with unadulterated cold-pressed oils.
              </p>
              <div className="text-[11px] text-slate-500 font-mono tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>FSSAI LIC: 22423567000189</span>
              </div>
            </div>

            {/* Col 2: Menu */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Our Menu</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li><button onClick={() => changeView('home')} className="hover:text-white transition-colors">Only Lunch</button></li>
                <li><button onClick={() => changeView('home')} className="hover:text-white transition-colors">Only Dinner</button></li>
                <li><button onClick={() => changeView('home')} className="hover:text-white transition-colors">Only Tiffen</button></li>
                <li><button onClick={() => changeView('home')} className="hover:text-white transition-colors">Weekend Saturday Sunday Combo</button></li>
                <li><button onClick={() => changeView('home')} className="hover:text-white transition-colors">Monthly Combo (Veg &amp; Non-Veg)</button></li>
              </ul>
            </div>

            {/* Col 3: Delivery Hubs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Delivery Hubs</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>• Guduvancheri</li>
                <li>• Urapakkam</li>
                <li>• SRM Surroundings (Potheri &amp; Kattankulathur)</li>
                <li>• Surrounding Areas</li>
              </ul>
            </div>

            {/* Col 4: Kitchen Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Kitchen Contact</h4>
              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>Guduvancheri &amp; Urapakkam Hubs</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>WhatsApp Direct Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <a href="mailto:srilakshmihomefoods@gmail.com" className="hover:text-white">srilakshmihomefoods@gmail.com</a>
                </div>
                <div className="text-[11px] text-slate-500 pt-1">Kitchen Hours: 7:00 AM – 9:00 PM</div>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>&copy; 2026 Sri Lakshmi Foods. All Rights Reserved. Traditional Homestyle Kitchen.</div>
            <div className="flex gap-6 text-xs">
              <button type="button" onClick={() => setActivePolicy('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <button type="button" onClick={() => setActivePolicy('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
              <button type="button" onClick={() => setActivePolicy('hygiene')} className="hover:text-white transition-colors cursor-pointer">Food Safety &amp; Hygiene</button>
            </div>
          </div>
        </div>
      </footer>

      <PolicyModal activePolicy={activePolicy} onClose={() => setActivePolicy(null)} />

      {/* Floating Ringing WhatsApp Button at bottom-right */}
      <a
        href={`https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent('Vanakkam Sri Lakshmi HomeFood! I want to inquire about daily meal plans / catering.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-floating-btn wa-ringing"
        title="Chat with Sri Lakshmi HomeFood on WhatsApp"
      >
        <div className="wa-pulse-ring"></div>
        <div className="wa-pulse-ring"></div>
        <svg className="w-9 h-9 fill-white relative z-10" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.17 8.17 0 0 1-5.83 2.41c-1.47 0-2.91-.39-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.174 8.174 0 0 1-1.25-4.4c0-4.54 3.7-8.24 8.24-8.24zm-3.53 4.49c-.2-.44-.41-.45-.6-.46-.16-.01-.34-.01-.52-.01s-.48.07-.73.34c-.25.28-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.19 1.93 2.95 4.67 4.14.65.28 1.16.45 1.56.57.66.21 1.25.18 1.73.11.53-.08 1.63-.66 1.86-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32s-1.63-.8-1.88-.9-.44-.14-.62.14-.71.9-.87 1.08c-.16.18-.32.21-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.64-1.53-1.92-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.28.27-.46.09-.18.05-.35-.02-.48-.08-.14-.59-1.46-.82-1.98z" />
        </svg>
      </a>

    </div>
  );
}
