import React, { useState } from 'react';
import { CheckCircle2, ArrowLeft, Shield, Lock, Check } from 'lucide-react';

const RESTAURANT_WHATSAPP = '917200451980';

// Price lookup table for calculation on the payment page
const PACKAGE_PRICES = {
  'Amma Veg Lunch Feast': 3499,
  'Executive Twin Feast (Lunch + Dinner)': 5999,
  'Traditional Tiffin Club': 2899,
  'Kalyana Elai Saapadu Mini (10-15 Pax)': 3900,
  'Maharaja Virundhu Package (20-25 Pax)': 6500,
  'Utsavam Grand Celebration (25-30 Pax)': 7800
};

export default function PaymentPage({ order, onBackToHome, onOrderComplete }) {
  const [payMode, setPayMode] = useState('upi');

  // Fallback default order if user navigates directly to Payment Page from navbar
  const activeOrder = order || {
    orderId: 'SHREE-2026-SAMPLE',
    custName: 'Valued Customer',
    custWhatsApp: '9840123456',
    packageName: 'Amma Veg Lunch Feast',
    guestMultiplier: 1,
    deliveryArea: 'T. Nagar, Chennai',
    deliveryTimeSlot: 'Afternoon Lunch (12:00 PM - 1:00 PM)',
    fullAddress: 'Delivery Address on file',
    deliveryDate: 'Tomorrow',
    specialNotes: 'Fresh homestyle preparation'
  };

  const basePrice = PACKAGE_PRICES[activeOrder.packageName] || 3499;
  const totalPrice = Math.round(basePrice * (activeOrder.guestMultiplier || 1));
  const advancePayable = Math.round(totalPrice * 0.50);
  const balanceOnDelivery = totalPrice - advancePayable;

  const handleConfirmAdvance = async () => {
    // Notify backend
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...activeOrder,
          totalPrice,
          advancePayable,
          balanceOnDelivery,
          payMode
        })
      });
    } catch {
      // Non-blocking
    }

    // Format WhatsApp confirmation message
    const confirmationMsg = 
`*🎉 50% ADVANCE PAYMENT SLIP*
*Order Reference:* ${activeOrder.orderId}

👤 *Customer:* ${activeOrder.custName} (+91 ${activeOrder.custWhatsApp})
🍛 *Food Plan:* ${activeOrder.packageName}
📅 *Delivery Date:* ${activeOrder.deliveryDate}
⏰ *Time Slot Needed:* ${activeOrder.deliveryTimeSlot}
📍 *Address:* ${activeOrder.fullAddress}, ${activeOrder.deliveryArea}
${activeOrder.specialNotes ? `📝 *Notes:* ${activeOrder.specialNotes}\n` : ''}
💰 *Total Order Amount:* ₹${totalPrice.toLocaleString('en-IN')}
✅ *50% Advance Payable:* ₹${advancePayable.toLocaleString('en-IN')}
💵 *Balance on Delivery:* ₹${balanceOnDelivery.toLocaleString('en-IN')}
💳 *Payment Mode:* ${payMode.toUpperCase()}

_Please confirm receipt and lock our kitchen slot!_`;

    const waUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(confirmationMsg)}`;
    window.open(waUrl, '_blank');

    if (onOrderComplete) {
      onOrderComplete({
        ...activeOrder,
        totalPrice,
        advancePayable,
        balanceOnDelivery
      }, waUrl);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Back button */}
      <div className="mb-6">
        <button 
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-900 bg-white px-4 py-2 rounded-xl border border-brand-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border-2 border-brand-300 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-brand-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-tamil text-2xl font-black text-green-300">ஸ்ரீ</span>
              <span className="text-xl font-black tracking-wide">50% ADVANCE PAYMENT DESK</span>
            </div>
            <p className="text-xs text-green-200 mt-1">Official Food Catering &amp; Daily Subscription Checkout</p>
          </div>
          <div className="text-xs bg-white/10 px-3.5 py-1.5 rounded-xl text-green-100 font-mono">
            {activeOrder.orderId}
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Order Details Review */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs sm:text-sm space-y-3">
            <div className="text-xs font-bold text-brand-900 uppercase tracking-wider border-b border-slate-200 pb-2">
              Order Summary:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
              <div><strong className="text-slate-900">Customer:</strong> {activeOrder.custName} (+91 {activeOrder.custWhatsApp})</div>
              <div><strong className="text-slate-900">Food Plan:</strong> {activeOrder.packageName}</div>
              <div><strong className="text-slate-900">Delivery Date:</strong> {activeOrder.deliveryDate}</div>
              <div><strong className="text-slate-900">Time Slot:</strong> {activeOrder.deliveryTimeSlot}</div>
              <div className="sm:col-span-2"><strong className="text-slate-900">Address:</strong> {activeOrder.fullAddress}, {activeOrder.deliveryArea}</div>
            </div>
          </div>

          {/* 50% Advance Calculation Details */}
          <div className="bg-brand-50 border-2 border-brand-300 rounded-2xl p-6 sm:p-8 space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Total Package Value:</span>
              <span className="font-bold text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery &amp; Thermal Packaging:</span>
              <span className="font-bold text-brand-700">FREE</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Balance on Delivery (50%):</span>
              <span className="font-bold text-slate-700">₹{balanceOnDelivery.toLocaleString('en-IN')}</span>
            </div>

            {/* Highlighted 50% Advance */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border-2 border-brand-500 text-base mt-2 shadow-sm">
              <div>
                <div className="font-extrabold text-brand-900">50% Advance Payable NOW:</div>
                <div className="text-xs text-brand-600">To lock kitchen slot &amp; prepare fresh ingredients</div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-brand-700">
                ₹{advancePayable.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Simulated UPI QR Code */}
          <div className="text-center p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-brand-300">
            <div className="text-sm font-bold text-brand-900 mb-2">Scan &amp; Pay ₹{advancePayable.toLocaleString('en-IN')} via UPI</div>
            <div className="w-44 h-44 mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="#ffffff"/>
                {/* QR Markers */}
                <rect x="10" y="10" width="25" height="25" fill="#15803d"/>
                <rect x="15" y="15" width="15" height="15" fill="#ffffff"/>
                <rect x="18" y="18" width="9" height="9" fill="#15803d"/>

                <rect x="65" y="10" width="25" height="25" fill="#15803d"/>
                <rect x="70" y="15" width="15" height="15" fill="#ffffff"/>
                <rect x="73" y="18" width="9" height="9" fill="#15803d"/>

                <rect x="10" y="65" width="25" height="25" fill="#15803d"/>
                <rect x="15" y="70" width="15" height="15" fill="#ffffff"/>
                <rect x="18" y="73" width="9" height="9" fill="#15803d"/>

                {/* Pattern */}
                <rect x="42" y="12" width="6" height="6" fill="#15803d"/>
                <rect x="52" y="18" width="6" height="6" fill="#15803d"/>
                <rect x="42" y="28" width="6" height="6" fill="#15803d"/>
                <rect x="40" y="40" width="20" height="20" fill="#15803d"/>
                <rect x="44" y="44" width="12" height="12" fill="#ffffff"/>
                <rect x="65" y="45" width="8" height="8" fill="#15803d"/>
                <rect x="78" y="55" width="8" height="8" fill="#15803d"/>
                <rect x="45" y="68" width="8" height="8" fill="#15803d"/>
                <rect x="60" y="75" width="14" height="8" fill="#15803d"/>
                <rect x="78" y="75" width="10" height="14" fill="#15803d"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-brand-700 text-white font-tamil text-[10px] font-black px-1.5 py-0.5 rounded shadow">ஸ்ரீ</span>
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-2 font-mono">UPI ID: shreefoods@okaxis</div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select Payment Mode:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
              {['upi', 'qr', 'card', 'netbanking'].map((mode) => (
                <label key={mode} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-brand-500 transition-colors">
                  <input 
                    type="radio" 
                    name="payMode" 
                    value={mode} 
                    checked={payMode === mode} 
                    onChange={() => setPayMode(mode)}
                    className="text-brand-600 focus:ring-brand-500" 
                  />
                  <span className="capitalize">{mode === 'upi' ? 'GPay / PhonePe' : mode === 'qr' ? 'Instant QR' : mode === 'card' ? 'Debit/Credit Card' : 'Net Banking'}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <div className="pt-2">
            <button 
              onClick={handleConfirmAdvance}
              className="w-full bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-brand-700/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
            >
              <Check className="w-5 h-5 text-green-200" />
              <span>I Have Paid 50% Advance (Send Slip to Kitchen WhatsApp)</span>
            </button>
            <p className="text-center text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
              <Shield className="w-3.5 h-3.5 text-brand-600" /> Safe 256-bit Encrypted Checkout • Instant WhatsApp Confirmation
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
