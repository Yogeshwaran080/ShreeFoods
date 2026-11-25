import React from 'react';
import { X, CheckCircle, Receipt, Check } from 'lucide-react';

export default function PaymentModal({ order, whatsappUrl, onClose }) {
  if (!order) return null;

  const handleSendToWhatsApp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    } else {
      const confirmationMsg = 
`*🎉 BOOKING & 50% ADVANCE CONFIRMATION*
*Order Reference:* ${order.orderId}

👤 *Customer:* ${order.custName} (+91 ${order.custWhatsApp})
🍛 *Package:* ${order.packageName}
📅 *Delivery Date:* ${order.deliveryDate}
⏰ *Time Slot:* ${order.deliveryTimeSlot}
📍 *Delivery Address:* ${order.fullAddress}, ${order.deliveryArea}
${order.specialNotes ? `📝 *Notes:* ${order.specialNotes}\n` : ''}
💰 *Total Bill:* ₹${order.totalPrice.toLocaleString('en-IN')}
✅ *50% Advance Paid:* ₹${order.advancePayable.toLocaleString('en-IN')}
💵 *Balance on Delivery:* ₹${order.balanceOnDelivery.toLocaleString('en-IN')}

_Thank you for choosing ஸ்ரீ Foods! Our kitchen team is preparing your authentic homestyle meal._`;

      const fallbackUrl = `https://wa.me/917200451980?text=${encodeURIComponent(confirmationMsg)}`;
      window.open(fallbackUrl, '_blank');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-brand-300 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-brand-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-300" />
            <span className="font-bold text-base">50% Advance Payment Desk</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-5">
          
          <div className="text-center">
            <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full mx-auto flex items-center justify-center mb-2">
              <Receipt className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Advance Receipt Generated</h3>
            <p className="text-xs text-slate-500">Order ID: {order.orderId}</p>
          </div>

          {/* Bill Summary */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Customer Name:</span>
              <span className="font-bold text-slate-800">{order.custName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Food Package:</span>
              <span className="font-bold text-slate-800">{order.packageName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery Time:</span>
              <span className="font-bold text-brand-700">{order.deliveryDate} • {order.deliveryTimeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Order Amount:</span>
              <span className="font-bold text-slate-800">₹{order.totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-sm text-brand-900">
              <span>50% Advance Payable Now:</span>
              <span>₹{order.advancePayable.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Balance on Delivery (50%):</span>
              <span>₹{order.balanceOnDelivery.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Simulated UPI QR Code */}
          <div className="text-center p-4 bg-brand-50 rounded-2xl border-2 border-dashed border-brand-300">
            <div className="text-xs font-bold text-brand-900 mb-2">Scan &amp; Pay via GPay / PhonePe / Paytm</div>
            <div className="w-40 h-40 mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="#ffffff"/>
                {/* Corner markers */}
                <rect x="10" y="10" width="25" height="25" fill="#15803d"/>
                <rect x="15" y="15" width="15" height="15" fill="#ffffff"/>
                <rect x="18" y="18" width="9" height="9" fill="#15803d"/>

                <rect x="65" y="10" width="25" height="25" fill="#15803d"/>
                <rect x="70" y="15" width="15" height="15" fill="#ffffff"/>
                <rect x="73" y="18" width="9" height="9" fill="#15803d"/>

                <rect x="10" y="65" width="25" height="25" fill="#15803d"/>
                <rect x="15" y="70" width="15" height="15" fill="#ffffff"/>
                <rect x="18" y="73" width="9" height="9" fill="#15803d"/>

                {/* Pattern Pixels */}
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
            <div className="text-[11px] text-slate-500 mt-2 font-mono">UPI ID: shreefoods@okaxis</div>
          </div>

          {/* Confirm Button */}
          <button 
            onClick={handleSendToWhatsApp}
            className="w-full bg-brand-700 hover:bg-brand-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 text-sm"
          >
            <Check className="w-4 h-4" />
            <span>I Have Paid 50% Advance (Notify Kitchen on WhatsApp)</span>
          </button>

        </div>

      </div>
    </div>
  );
}
