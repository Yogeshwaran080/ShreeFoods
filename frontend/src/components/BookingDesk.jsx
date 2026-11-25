import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, MapPin, ArrowRight, Shield, MessageCircle } from 'lucide-react';

export default function BookingDesk({ selectedPackage, onProceedToPayment, onOpenWhatsAppWithTopic }) {
  const [formData, setFormData] = useState({
    custName: '',
    custWhatsApp: '',
    packageId: selectedPackage ? selectedPackage.id : 'monthly-veg-lunch',
    packageName: selectedPackage ? selectedPackage.name : 'Amma Veg Lunch Feast',
    guestMultiplier: 1,
    deliveryArea: 'Guduvancherry',
    deliveryTimeSlot: 'Afternoon Lunch (12:00 PM - 1:00 PM)',
    fullAddress: '',
    deliveryDate: '',
    specialNotes: ''
  });

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormData(prev => ({
      ...prev,
      deliveryDate: tomorrow.toISOString().split('T')[0]
    }));
  }, []);

  // Update when selectedPackage prop changes
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name
      }));
    }
  }, [selectedPackage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.custName || !formData.custWhatsApp || !formData.fullAddress || !formData.deliveryDate) {
      alert('Please fill all required fields (Name, WhatsApp, Address, Delivery Date).');
      return;
    }

    const orderId = `SHREE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderData = {
      orderId,
      ...formData,
      status: 'Booking Initiated'
    };

    onProceedToPayment(orderData);
  };

  const handleWhatsAppBooking = () => {
    const text = `Vanakkam! I want to book: ${formData.packageName} for ${formData.deliveryArea} on ${formData.deliveryDate} at ${formData.deliveryTimeSlot}. My name is ${formData.custName || 'Guest'}.`;
    onOpenWhatsAppWithTopic(text);
  };

  return (
    <section id="booking-form" className="py-16 sm:py-20 relative bg-gradient-to-b from-white to-brand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Book Food or Request Delivery</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Enter your details and delivery time slot below. You can submit to review your booking or chat directly with our kitchen on WhatsApp.
          </p>
        </div>

        {/* Booking Card Form (Clean, no open payment calculations on homepage) */}
        <div className="bg-white rounded-3xl border-2 border-brand-200 shadow-xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-brand-800 text-white p-6 sm:p-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-tamil text-2xl font-black text-green-300">ஸ்ரீ</span>
                <span className="text-lg sm:text-xl font-black tracking-wide">FOODS KITCHEN BOOKING DESK</span>
              </div>
              <p className="text-xs text-green-200 mt-1">Direct Homestyle Catering &amp; Subscription Order</p>
            </div>
            <div className="hidden sm:block text-xs bg-white/10 px-3.5 py-1.5 rounded-xl text-green-100">
              Fresh Daily Cooking
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-7">
            
            {/* Step 1: Customer Contact Info */}
            <div>
              <div className="flex items-center gap-2 text-brand-800 font-extrabold text-base mb-4 border-b border-slate-100 pb-2">
                <User className="w-5 h-5 text-brand-600" />
                <span>1. Contact Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.custName}
                    onChange={(e) => setFormData({ ...formData, custName: e.target.value })}
                    placeholder="e.g. Ramesh Kumar / Priya Soundar" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">WhatsApp Number *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm font-semibold">+91</span>
                    <input 
                      type="tel" 
                      required 
                      pattern="[0-9]{10}"
                      value={formData.custWhatsApp}
                      onChange={(e) => setFormData({ ...formData, custWhatsApp: e.target.value })}
                      placeholder="98401 23456" 
                      className="w-full px-4 py-3 rounded-r-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Package & Sizing */}
            <div>
              <div className="flex items-center gap-2 text-brand-800 font-extrabold text-base mb-4 border-b border-slate-100 pb-2">
                <ShoppingBag className="w-5 h-5 text-brand-600" />
                <span>2. Package &amp; Member Sizing</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Selected Food Package *</label>
                  <select 
                    value={formData.packageName}
                    onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition-all bg-white font-medium"
                  >
                    <optgroup label="Monthly Subscription (Daily Meals)">
                      <option value="Amma Veg Lunch Feast">Amma Veg Lunch Feast (Monthly)</option>
                      <option value="Executive Twin Feast (Lunch + Dinner)">Executive Twin Feast (Lunch + Dinner)</option>
                      <option value="Traditional Tiffin Club">Traditional Tiffin Club (Monthly)</option>
                    </optgroup>
                    <optgroup label="Event Food (10 - 30 Members)">
                      <option value="Kalyana Elai Saapadu Mini (10-15 Pax)">Kalyana Elai Saapadu Mini (10-15 Pax)</option>
                      <option value="Maharaja Virundhu Package (20-25 Pax)">Maharaja Virundhu Package (20-25 Pax)</option>
                      <option value="Utsavam Grand Celebration (25-30 Pax)">Utsavam Grand Celebration (25-30 Pax)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Member Count / Quantity *</label>
                  <select 
                    value={formData.guestMultiplier}
                    onChange={(e) => setFormData({ ...formData, guestMultiplier: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition-all bg-white font-medium"
                  >
                    <option value={1}>1 Plan / 10-15 Guests</option>
                    <option value={1.5}>15-20 Guests</option>
                    <option value={2}>20-25 Guests</option>
                    <option value={2.5}>25-30 Guests</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Location & Exact Time Slot */}
            <div>
              <div className="flex items-center gap-2 text-brand-800 font-extrabold text-base mb-4 border-b border-slate-100 pb-2">
                <MapPin className="w-5 h-5 text-brand-600" />
                <span>3. Delivery Address &amp; Delivery Time Needed</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Delivery City / Area Hub *</label>
                  <select 
                    value={formData.deliveryArea}
                    onChange={(e) => setFormData({ ...formData, deliveryArea: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition-all bg-white font-medium"
                  >
                    <option value="Guduvancheri">Guduvancheri</option>
                    <option value="Urapakkam">Urapakkam</option>
                    <option value="SRM Surroundings">SRM Surroundings (Potheri &amp; Kattankulathur)</option>
                    <option value="Other Area (Mention in Address)">Other Area (Mention in Address)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Delivery Time Needed *</label>
                  <select 
                    value={formData.deliveryTimeSlot}
                    onChange={(e) => setFormData({ ...formData, deliveryTimeSlot: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition-all bg-white font-medium"
                  >
                    <option value="Morning Breakfast (7:30 AM - 8:30 AM)">Morning Breakfast (7:30 AM - 8:30 AM)</option>
                    <option value="Afternoon Lunch (12:00 PM - 1:00 PM)">Afternoon Lunch (12:00 PM - 1:00 PM)</option>
                    <option value="Night Dinner (7:30 PM - 8:30 PM)">Night Dinner (7:30 PM - 8:30 PM)</option>
                    <option value="Event Lunch Feast (11:30 AM - Before Pooja)">Event Lunch Feast (11:30 AM - Before Pooja)</option>
                    <option value="Event Dinner Feast (7:00 PM)">Event Dinner Feast (7:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Complete Street Address &amp; Door No *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.fullAddress}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    placeholder="Flat 3B, Sri Apartments, 4th Main Road, Landmark near temple" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Delivery Start Date *</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition-all bg-white"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Dietary Notes / Special Requests (Optional)</label>
                <input 
                  type="text" 
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="e.g. Jain (no onion/garlic), less spicy for elders, extra appalam..." 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 text-sm outline-none"
                />
              </div>
            </div>

            {/* Actions: Proceed to Payment Page OR Message on WhatsApp */}
            <div className="pt-3 space-y-3">
              <button 
                type="submit" 
                className="w-full bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-brand-700/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
              >
                <span>Submit Details &amp; Proceed to Payment Page</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button 
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full bg-white hover:bg-brand-50 text-brand-800 border-2 border-brand-600 font-bold text-sm py-3 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-brand-600" />
                <span>Or Enquire / Message on WhatsApp</span>
              </button>

              <p className="text-center text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
                <Shield className="w-3.5 h-3.5 text-brand-600" /> Instant confirmation via SMS &amp; WhatsApp
              </p>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
