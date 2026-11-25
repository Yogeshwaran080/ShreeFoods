import React, { useState } from 'react';
import { X, Check, Send, ArrowRight, ShieldCheck, Calendar, MapPin, Clock, Utensils } from 'lucide-react';

const RESTAURANT_WHATSAPP = '917200451980';

export default function CustomizeModal({ plan, isOpen, onClose, onProceedToPayment }) {
  if (!isOpen || !plan) return null;

  const [diet, setDiet] = useState('veg'); // 'veg' | 'nonveg'
  const [duration, setDuration] = useState('monthly'); // 'trial' | 'weekly' | 'monthly'
  const [mealSlot, setMealSlot] = useState('lunch'); // 'lunch' | 'dinner' | 'both'
  const [container, setContainer] = useState('thermal'); // 'thermal' | 'steel'
  const [deliveryArea, setDeliveryArea] = useState('Guduvancherry');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [deliveryTime, setDeliveryTime] = useState('Afternoon Lunch (12:00 PM - 1:00 PM)');
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleSendOnWhatsApp = () => {
    const durationLabel = duration === 'trial' ? '3-Days Trial' : duration === 'weekly' ? 'Weekly (6 Days)' : 'Monthly (26 Days)';
    const dietLabel = diet === 'veg' ? 'Pure Veg' : 'Non-Veg';
    const containerLabel = container === 'thermal' ? 'Insulated Thermal Box' : 'Stainless Steel Carrier';

    const msg = 
`*Vanakkam ஸ்ரீ Foods Kitchen!* 🌿
I would like to customize and order:

🍛 *Plan:* ${plan.name}
🥗 *Preference:* ${dietLabel}
📅 *Duration:* ${durationLabel}
⏰ *Time Slot:* ${deliveryTime}
🍱 *Container:* ${containerLabel}
📍 *Delivery Hub:* ${deliveryArea}
🏠 *Address:* ${fullAddress || 'Will share location on chat'}
👤 *Name:* ${custName || 'Guest'} (${custPhone || 'WhatsApp'})
${notes ? `📝 *Notes:* ${notes}\n` : ''}
Please confirm plan availability and schedule!`;

    const encoded = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(encoded, '_blank');
    onClose();
  };

  const handleProceedPayment = () => {
    if (!custName || !custPhone || !fullAddress) {
      alert('Please enter your Name, Phone Number, and Delivery Address to proceed.');
      return;
    }

    const orderData = {
      orderId: `SHREE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      custName,
      custWhatsApp: custPhone,
      packageName: `${plan.name} (${duration === 'trial' ? 'Trial' : duration === 'weekly' ? 'Weekly' : 'Monthly'})`,
      deliveryArea,
      deliveryTimeSlot: deliveryTime,
      fullAddress,
      deliveryDate,
      specialNotes: `${diet.toUpperCase()} | ${container.toUpperCase()} | ${notes}`,
      guestMultiplier: 1
    };

    onProceedToPayment(orderData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-2 border-brand-200 animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[92vh] flex flex-col justify-between">
        
        {/* Modal Header */}
        <div className="bg-brand-800 text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="text-xs text-green-300 font-bold uppercase tracking-wider">Customize Your Plan</div>
            <h3 className="text-2xl font-black mt-0.5">{plan.name}</h3>
            <p className="text-xs text-green-100 mt-1">{plan.tagline}</p>
          </div>

          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* 1. Meal Preference (Veg / Non-veg) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              1. Meal Preference
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDiet('veg')}
                className={`p-3.5 rounded-2xl border-2 text-left font-bold flex items-center justify-between transition-all ${
                  diet === 'veg' 
                    ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-600"></span>
                  <span>Pure Vegetarian</span>
                </div>
                {diet === 'veg' && <Check className="w-4 h-4 text-brand-700" />}
              </button>

              <button
                type="button"
                onClick={() => setDiet('nonveg')}
                className={`p-3.5 rounded-2xl border-2 text-left font-bold flex items-center justify-between transition-all ${
                  diet === 'nonveg' 
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                  <span>Non-Veg (Saturdays Special)</span>
                </div>
                {diet === 'nonveg' && <Check className="w-4 h-4 text-amber-700" />}
              </button>
            </div>
          </div>

          {/* 2. Plan Duration */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              2. Plan Duration
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'trial', label: '3 Days Trial', desc: 'Taste homestyle flavors' },
                { id: 'weekly', label: 'Weekly (6 Days)', desc: 'Mon - Sat delivery' },
                { id: 'monthly', label: 'Monthly (26 Days)', desc: 'Full pause flexibility' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDuration(item.id)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    duration === item.id 
                      ? 'border-brand-600 bg-brand-50/80 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Container Preference */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              3. Packaging / Container Preference
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setContainer('thermal')}
                className={`p-3 rounded-2xl border-2 text-left font-bold flex items-center justify-between transition-all ${
                  container === 'thermal' 
                    ? 'border-brand-600 bg-brand-50 text-brand-900' 
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold">Insulated Thermal Box</div>
                  <div className="text-[11px] text-slate-500 font-normal">Hygienic leakproof disposal</div>
                </div>
                {container === 'thermal' && <Check className="w-4 h-4 text-brand-700" />}
              </button>

              <button
                type="button"
                onClick={() => setContainer('steel')}
                className={`p-3 rounded-2xl border-2 text-left font-bold flex items-center justify-between transition-all ${
                  container === 'steel' 
                    ? 'border-brand-600 bg-brand-50 text-brand-900' 
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold">Stainless Steel Tiffin</div>
                  <div className="text-[11px] text-slate-500 font-normal">Eco-friendly traditional exchange</div>
                </div>
                {container === 'steel' && <Check className="w-4 h-4 text-brand-700" />}
              </button>
            </div>
          </div>

          {/* 4. Delivery Hub & Details */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              4. Delivery Hub &amp; Address Details
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Delivery Hub Location *</label>
                <select
                  value={deliveryArea}
                  onChange={(e) => setDeliveryArea(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-brand-600 bg-white"
                >
                  <option value="Guduvancheri">Guduvancheri</option>
                  <option value="Urapakkam">Urapakkam</option>
                  <option value="SRM Surroundings">SRM Surroundings (Potheri &amp; Kattankulathur)</option>
                  <option value="Other Area">Other nearby location</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Delivery Time Needed *</label>
                <select
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-brand-600 bg-white"
                >
                  <option value="Morning Breakfast (7:30 AM - 8:30 AM)">Morning Breakfast (7:30 AM - 8:30 AM)</option>
                  <option value="Afternoon Lunch (12:00 PM - 1:00 PM)">Afternoon Lunch (12:00 PM - 1:00 PM)</option>
                  <option value="Night Dinner (7:30 PM - 8:30 PM)">Night Dinner (7:30 PM - 8:30 PM)</option>
                  <option value="Event Lunch Feast (11:30 AM)">Event Lunch Feast (11:30 AM)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">WhatsApp Mobile *</label>
                <input
                  type="tel"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Complete Street Address / Door No *</label>
              <input
                type="text"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Flat No, Apartment / Street name, Landmark"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-brand-600"
              />
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleSendOnWhatsApp}
            className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Send Customized Order on WhatsApp</span>
          </button>

          <button
            onClick={handleProceedPayment}
            className="w-full sm:flex-1 bg-brand-700 hover:bg-brand-800 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>Proceed to 50% Advance Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
