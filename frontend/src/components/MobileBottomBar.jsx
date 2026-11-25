import React from 'react';
import { Home, Layers, MessageCircle } from 'lucide-react';

export default function MobileBottomBar({ currentView, onChangeView, onOpenWhatsApp }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-2xl">
      
      {/* Home button */}
      <button
        onClick={() => onChangeView('home')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          currentView === 'home' ? 'text-brand-700 font-extrabold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] tracking-wider uppercase font-bold">Home</span>
      </button>

      {/* Plans button */}
      <button
        onClick={() => onChangeView('packages')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          currentView === 'packages' ? 'text-brand-700 font-extrabold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Layers className="w-5 h-5" />
        <span className="text-[10px] tracking-wider uppercase font-bold">Plans</span>
      </button>

      {/* WhatsApp Action button */}
      <button
        onClick={onOpenWhatsApp}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-green-600 font-bold hover:text-green-700 transition-colors"
      >
        <MessageCircle className="w-5 h-5 text-green-600" />
        <span className="text-[10px] tracking-wider uppercase font-extrabold">Contact</span>
      </button>

    </div>
  );
}
