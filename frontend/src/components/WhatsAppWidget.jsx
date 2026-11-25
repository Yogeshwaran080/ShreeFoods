import React, { useState } from 'react';
import { X, Send, MapPin, BadgeCheck } from 'lucide-react';

const RESTAURANT_WHATSAPP = '917200451980';

export default function WhatsAppWidget({ isOpen, onToggle, initialTopic = '' }) {
  const [selectedLocation, setSelectedLocation] = useState('Guduvancherry');
  const [customAddress, setCustomAddress] = useState('');
  const [message, setMessage] = useState(initialTopic);

  // Quick inquiry buttons
  const quickChips = [
    '🍱 Monthly Lunch Box',
    '🌿 Event Food (10-30 Pax)',
    '📍 Delivery at Guduvancheri',
    '📍 Delivery at Urapakkam',
    '📍 Delivery at SRM Surroundings'
  ];

  const handleSend = () => {
    let finalLoc = selectedLocation;
    if (selectedLocation === 'Custom Location' && customAddress.trim()) {
      finalLoc = customAddress.trim();
    } else if (customAddress.trim()) {
      finalLoc += ` (${customAddress.trim()})`;
    }

    const textToSend = message.trim() || 'Hello, I want to inquire about your homestyle food service.';

    // Send inquiry to backend API
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: finalLoc,
        message: textToSend
      })
    }).catch(() => {
      // Non-blocking fallback
    });

    // Formatted WhatsApp message
    const fullMessage = 
`*Vanakkam ஸ்ரீ Foods Kitchen!* 🌿
I am contacting from the website.

📍 *Delivery Location:* ${finalLoc}
💬 *Inquiry / Request:* ${textToSend}
💳 *Advance Note:* Interested in 50% advance booking.

Kindly share menu details and availability!`;

    const encodedUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(fullMessage)}`;
    window.open(encodedUrl, '_blank');
  };

  return (
    <>
      {/* Floating Ringing WhatsApp Button */}
      <div 
        className={`wa-floating-btn ${!isOpen ? 'wa-ringing' : ''}`} 
        onClick={onToggle}
        title="Click to chat with ஸ்ரீ Foods on WhatsApp"
      >
        {/* Radar pulses when closed */}
        {!isOpen && (
          <>
            <div className="wa-pulse-ring"></div>
            <div className="wa-pulse-ring"></div>
          </>
        )}

        {/* WhatsApp Icon */}
        <svg className="w-9 h-9 fill-white relative z-10" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.17 8.17 0 0 1-5.83 2.41c-1.47 0-2.91-.39-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.174 8.174 0 0 1-1.25-4.4c0-4.54 3.7-8.24 8.24-8.24zm-3.53 4.49c-.2-.44-.41-.45-.6-.46-.16-.01-.34-.01-.52-.01s-.48.07-.73.34c-.25.28-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.19 1.93 2.95 4.67 4.14.65.28 1.16.45 1.56.57.66.21 1.25.18 1.73.11.53-.08 1.63-.66 1.86-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32s-1.63-.8-1.88-.9-.44-.14-.62.14-.71.9-.87 1.08c-.16.18-.32.21-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.64-1.53-1.92-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.28.27-.46.09-.18.05-.35-.02-.48-.08-.14-.59-1.46-.82-1.98z"/>
        </svg>
      </div>

      {/* In-Screen WhatsApp Chat Window */}
      {isOpen && (
        <div className="wa-chat-window animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="bg-[#075e54] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white p-0.5 overflow-hidden">
                  <img src="/assets/lady-avatar-3d.svg" alt="Chef Lakshmi" className="w-full h-full object-contain" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075e54] rounded-full"></span>
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>ஸ்ரீ Foods Kitchen Desk</span>
                  <BadgeCheck className="w-4 h-4 text-green-300" />
                </div>
                <div className="text-[11px] text-green-100">Online • Typically replies in 2 mins</div>
              </div>
            </div>

            <button 
              onClick={onToggle}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="wa-chat-body flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            <div className="text-center">
              <span className="bg-white/80 text-slate-500 text-[10px] px-2.5 py-1 rounded-full shadow-sm font-semibold">TODAY</span>
            </div>

            {/* Welcome message */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] space-y-1.5 text-slate-800">
              <div className="font-bold text-brand-800 text-[11px]">Chef Lakshmi (ஸ்ரீ Foods)</div>
              <p>வணக்கம்! Welcome to ஸ்ரீ Foods Kitchen. We make fresh homestyle monthly meals and event food for 10-30 guests.</p>
              <p className="text-slate-500 text-[10px]">Select your delivery location below or type your inquiry:</p>
            </div>

            {/* Delivery Location Selector right inside WhatsApp screen */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-brand-200 space-y-2">
              <label className="block text-[11px] font-bold text-brand-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span>Choose Delivery Location:</span>
              </label>
              
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 font-medium outline-none focus:border-brand-600"
              >
                <option value="Guduvancheri">📍 Guduvancheri</option>
                <option value="Urapakkam">📍 Urapakkam</option>
                <option value="SRM Surroundings">📍 SRM Surroundings (Potheri &amp; Kattankulathur)</option>
                <option value="Custom Location">📍 Other / Custom Delivery Address</option>
              </select>

              <input 
                type="text" 
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                placeholder="Enter landmark or flat/street name..." 
                className="w-full text-xs p-2 rounded-lg border border-slate-200 outline-none focus:border-brand-600"
              />
            </div>

            {/* Quick Chips */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quick Inquiries:</div>
              <div className="flex flex-wrap gap-1.5">
                {quickChips.map((chip, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setMessage(chip)}
                    className="bg-white hover:bg-brand-50 text-brand-800 border border-brand-200 text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input & Send */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type message to kitchen..." 
              className="flex-1 text-xs px-3.5 py-2.5 rounded-full border border-slate-300 focus:border-green-600 focus:ring-1 focus:ring-green-500 outline-none"
            />
            
            <button 
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-[#128c7e] hover:bg-[#075e54] text-white flex items-center justify-center transition-colors shadow flex-shrink-0" 
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
