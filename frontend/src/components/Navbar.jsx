import React, { useState } from 'react';
import { MessageCircle, Menu, X, PhoneCall } from 'lucide-react';

const RESTAURANT_WHATSAPP = '917200451980';

export default function Navbar({ currentView, onChangeView }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    onChangeView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner Notice (Clean, trustworthy) */}
      <div className="bg-brand-900 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="font-medium text-green-100">
            Sri Lakshmi HomeFood • Authentic Homestyle Food in Guduvancheri, Urapakkam &amp; SRM Surroundings
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-green-300">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support Available
            </span>
          </div>
        </div>
      </div>

      {/* Main Clean Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo: Sri Lakshmi HomeFood */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
              className="flex items-center gap-2 group"
            >
              <img 
                src="/assets/logo-leaf.svg" 
                alt="Sri Lakshmi HomeFood Logo" 
                className="h-14 sm:h-16 w-auto transition-transform duration-300 group-hover:scale-105" 
              />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-base font-bold text-slate-700">
              <button 
                onClick={() => handleNavClick('home')} 
                className={`transition-colors py-2 ${currentView === 'home' ? 'text-brand-700 font-black border-b-2 border-brand-700' : 'text-slate-700 hover:text-brand-700'}`}
              >
                Home
              </button>

              <button 
                onClick={() => {
                  if (currentView !== 'home') handleNavClick('home');
                  setTimeout(() => {
                    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className="transition-colors py-2 text-slate-700 hover:text-brand-700"
              >
                Menu &amp; Combos
              </button>

              <button 
                onClick={() => {
                  if (currentView !== 'home') handleNavClick('home');
                  setTimeout(() => {
                    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className="transition-colors py-2 text-slate-700 hover:text-brand-700"
              >
                Book Order
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-brand-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-brand-100 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm ${currentView === 'home' ? 'bg-brand-50 text-brand-800' : 'text-slate-700'}`}
            >
              Home
            </button>
            <button
              onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-700"
            >
              Menu &amp; Combos
            </button>
            <button
              onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-700"
            >
              Book Order
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
