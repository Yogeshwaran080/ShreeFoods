import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, User, Phone, MapPin, Clock, Calendar, ShoppingBag, ShieldCheck, LocateFixed } from 'lucide-react';

const RESTAURANT_WHATSAPP = '917200451980';

export default function BookingForm({ preselectedPlan, onOrderSubmitted }) {
  const [formData, setFormData] = useState({
    custName: '',
    custWhatsApp: '',
    packageName: preselectedPlan || 'Only Lunch',
    deliveryArea: 'Guduvancherry',
    deliveryTimeSlot: 'Afternoon Lunch (12:00 PM - 1:00 PM)',
    fullAddress: '',
    deliveryDate: '',
    specialNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapLink = `https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        let addressText = `Current Location (${latitude.toFixed(5)}, ${longitude.toFixed(5)}) - ${mapLink}`;
        try {
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (resp.ok) {
            const data = await resp.json();
            if (data.display_name) {
              addressText = `${data.display_name} (${mapLink})`;
            }
          }
        } catch (e) {
          // Fallback to coordinates + map link
        }
        setFormData((prev) => ({
          ...prev,
          deliveryArea: 'Current Location (GPS)',
          fullAddress: addressText
        }));
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        alert('Unable to retrieve your location. Please allow location access or enter your address manually.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormData(prev => ({
      ...prev,
      deliveryDate: tomorrow.toISOString().split('T')[0]
    }));
  }, []);

  useEffect(() => {
    if (preselectedPlan) {
      setFormData(prev => ({ ...prev, packageName: preselectedPlan }));
    }
  }, [preselectedPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.custName.trim() || !formData.custWhatsApp.trim()) {
      alert('Please enter your Name and WhatsApp phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Settle in the database via backend API
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setIsSubmitting(false);

      const cleanMessage =
`*NEW ORDER - Sri Lakshmi Home Food*
--------------------------------
Name: ${formData.custName}
Phone: ${formData.custWhatsApp}
Plan: ${formData.packageName}
Date: ${formData.deliveryDate}
Time Slot: ${formData.deliveryTimeSlot}
Delivery Area: ${formData.deliveryArea}
Address: ${formData.fullAddress}${formData.specialNotes ? `\nNotes: ${formData.specialNotes}` : ''}
--------------------------------
Please confirm my homestyle delivery schedule.`;

      const targetUrl = data.whatsappUrl || `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(cleanMessage)}`;

      setSubmittedOrder(data.order || formData);
      if (onOrderSubmitted) onOrderSubmitted(data.order);

      window.open(targetUrl, '_blank');

    } catch (err) {
      setIsSubmitting(false);
      const cleanMessage =
`*NEW ORDER - Sri Lakshmi Home Food*
--------------------------------
Name: ${formData.custName}
Phone: ${formData.custWhatsApp}
Plan: ${formData.packageName}
Date: ${formData.deliveryDate}
Time Slot: ${formData.deliveryTimeSlot}
Delivery Area: ${formData.deliveryArea}
Address: ${formData.fullAddress}${formData.specialNotes ? `\nNotes: ${formData.specialNotes}` : ''}
--------------------------------
Please confirm my homestyle delivery schedule.`;

      const directUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(cleanMessage)}`;

      setSubmittedOrder(formData);
      window.open(directUrl, '_blank');
    }
  };

  return (
    <section id="order-form" className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif italic">
            Order or Inquire with Sri Lakshmi HomeFood
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Fill your details below. Your request will settle directly in our database and notify our kitchen on WhatsApp. We will review your details and message you back immediately.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {submittedOrder && (
          <div className="mb-8 p-6 bg-green-50 border-2 border-green-400 rounded-3xl text-center space-y-2 animate-in fade-in duration-300">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-green-900">Order Settled in Database &amp; Sent to WhatsApp!</h3>
            <p className="text-xs text-green-800">
              Thank you, <strong>{submittedOrder.custName}</strong>. Our kitchen bot received your phone number (<strong>{submittedOrder.custWhatsApp}</strong>) and details. We will message you back on WhatsApp shortly.
            </p>
            <button
              onClick={() => setSubmittedOrder(null)}
              className="text-xs text-green-700 underline font-bold pt-2"
            >
              Submit another request
            </button>
          </div>
        )}

        {/* Clean Form Card */}
        <div className="bg-brand-50/40 rounded-3xl border-2 border-brand-200 p-6 sm:p-10 shadow-lg">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand-700" />
                  <span>Full Name *</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.custName}
                  onChange={(e) => setFormData({ ...formData, custName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar / Anitha S." 
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-brand-700" />
                  <span>WhatsApp Phone Number *</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-2xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-sm font-bold">
                    +91
                  </span>
                  <input 
                    type="tel" 
                    required
                    pattern="[0-9]{10}"
                    value={formData.custWhatsApp}
                    onChange={(e) => setFormData({ ...formData, custWhatsApp: e.target.value })}
                    placeholder="9876543210" 
                    className="w-full px-4 py-3 rounded-r-2xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none bg-white font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-brand-700" />
                <span>Choose Food Plan or Combo *</span>
              </label>
              <select 
                value={formData.packageName}
                onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none bg-white font-medium"
              >
                <option value="Only Lunch">Only Lunch</option>
                <option value="Only Dinner">Only Dinner</option>
                <option value="Only Tiffen">Only Tiffen</option>
                <option value="Weekend Saturday Sunday Combo">Weekend Saturday Sunday Combo</option>
                <option value="Daily & Monthly Combo - Pure Veg">Daily &amp; Monthly Combo - Pure Veg</option>
                <option value="Daily & Monthly Combo - Non-Veg">Daily &amp; Monthly Combo - Non-Veg</option>
              </select>
            </div>

            {/* Location & Time Needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-700" />
                  <span>Delivery Location *</span>
                </label>
                <select 
                  value={formData.deliveryArea}
                  onChange={(e) => setFormData({ ...formData, deliveryArea: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none bg-white font-medium"
                >
                  <option value="Guduvancheri">Guduvancheri</option>
                  <option value="Urapakkam">Urapakkam</option>
                  <option value="SRM Surroundings">SRM Surroundings (Potheri &amp; Kattankulathur)</option>
                  <option value="Current Location (GPS)">Use My Current Location (GPS)</option>
                  <option value="Nearby Area">Nearby Area (Specify in address)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-700" />
                  <span>Delivery Time Needed *</span>
                </label>
                <select 
                  value={formData.deliveryTimeSlot}
                  onChange={(e) => setFormData({ ...formData, deliveryTimeSlot: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none bg-white font-medium"
                >
                  <option value="Morning Breakfast (7:30 AM - 8:30 AM)">Morning Breakfast (7:30 AM - 8:30 AM)</option>
                  <option value="Afternoon Lunch (12:00 PM - 1:00 PM)">Afternoon Lunch (12:00 PM - 1:00 PM)</option>
                  <option value="Night Dinner (7:30 PM - 8:30 PM)">Night Dinner (7:30 PM - 8:30 PM)</option>
                  <option value="Event Lunch Feast (11:30 AM - Pooja)">Event Lunch Feast (11:30 AM - Pooja)</option>
                  <option value="Event Dinner Feast (7:00 PM)">Event Dinner Feast (7:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Address & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase">
                    Complete Address &amp; Door/Flat No *
                  </label>
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isLocating}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 hover:bg-brand-700 text-white text-[11px] font-bold transition-all shadow-sm"
                  >
                    <LocateFixed className="w-3.5 h-3.5 text-white" />
                    <span>{isLocating ? 'Detecting...' : 'Use Current Location'}</span>
                  </button>
                </div>
                <input 
                  type="text" 
                  required
                  value={formData.fullAddress}
                  onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                  placeholder="Flat 2B, Sri Apartments, Street Name, Landmark or click Use Current Location" 
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-700" />
                  <span>Start Date *</span>
                </label>
                <input 
                  type="date" 
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none bg-white font-medium"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5">
                Special Requests / Dietary Notes (Optional)
              </label>
              <input 
                type="text" 
                value={formData.specialNotes}
                onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                placeholder="e.g. Jain (no onion/garlic), less spice for elders, extra appalam..." 
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 focus:border-brand-600 text-sm outline-none bg-white"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-base py-4 px-6 rounded-2xl shadow-xl shadow-green-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-60"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Recording in Database...' : 'Submit & Send Order to Kitchen WhatsApp'}</span>
              </button>
              
              <p className="text-center text-xs text-slate-500 mt-2.5 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-brand-700" />
                <span>Your phone number will settle in our kitchen database. We will message you back directly!</span>
              </p>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
