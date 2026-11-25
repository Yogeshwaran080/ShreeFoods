/**
 * Sri Lakshmi HomeFood - Homestyle Food Catering & Monthly Subscription
 * Clean Client Script
 */

const RESTAURANT_WHATSAPP = '917200451980';

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set default delivery date to tomorrow
  const dateInput = document.getElementById('deliveryDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }
});

/* 1. Package Switcher */
function switchPackageTab(tab) {
  const monthlyBtn = document.getElementById('tabMonthlyBtn');
  const eventBtn = document.getElementById('tabEventBtn');
  const monthlySection = document.getElementById('monthlySection');
  const eventSection = document.getElementById('eventSection');

  if (tab === 'monthly') {
    monthlyBtn?.classList.add('active');
    monthlyBtn?.classList.remove('text-slate-600');
    eventBtn?.classList.remove('active');
    eventBtn?.classList.add('text-slate-600');

    monthlySection?.classList.remove('hidden');
    eventSection?.classList.add('hidden');
  } else {
    eventBtn?.classList.add('active');
    eventBtn?.classList.remove('text-slate-600');
    monthlyBtn?.classList.remove('active');
    monthlyBtn?.classList.add('text-slate-600');

    eventSection?.classList.remove('hidden');
    monthlySection?.classList.add('hidden');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function selectPackage(packageName) {
  const select = document.getElementById('packageSelect');
  if (select) {
    const target = packageName.toLowerCase();
    let found = false;
    for (let i = 0; i < select.options.length; i++) {
      const optVal = select.options[i].value.toLowerCase();
      const optText = select.options[i].text.toLowerCase();
      if (optVal.includes(target) || target.includes(optVal) || optText.includes(target)) {
        select.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      if (target.includes('veg') && !target.includes('non')) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.includes('Veg') && !select.options[i].value.includes('Non')) {
            select.selectedIndex = i;
            break;
          }
        }
      } else if (target.includes('non')) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.includes('Non-Veg')) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  const bookingSection = document.getElementById('booking-form');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const custName = document.getElementById('custName');
    if (custName) custName.focus();
  }, 600);
}

/* 2. In-Screen WhatsApp Chat */
function toggleChatWindow() {
  const chatWin = document.getElementById('waChatWindow');
  const waBtn = document.getElementById('waFloatingBtn');

  if (!chatWin) return;

  const isHidden = chatWin.classList.contains('hidden');
  if (isHidden) {
    chatWin.classList.remove('hidden');
    waBtn?.classList.remove('wa-ringing');
    document.getElementById('waInputMessage')?.focus();
  } else {
    chatWin.classList.add('hidden');
    waBtn?.classList.add('wa-ringing');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function openChatWindow(presetMessage) {
  const chatWin = document.getElementById('waChatWindow');
  if (chatWin && chatWin.classList.contains('hidden')) {
    toggleChatWindow();
  }

  if (presetMessage) {
    fillWaQuickMsg(presetMessage);
  }
}

function fillWaQuickMsg(msg) {
  const input = document.getElementById('waInputMessage');
  if (input) {
    input.value = msg;
    input.focus();
  }
}

function sendToWhatsAppNow() {
  const input = document.getElementById('waInputMessage');
  const locationSelect = document.getElementById('waLocationSelect');
  const customAddress = document.getElementById('waCustomAddress');

  let chosenLocation = locationSelect ? locationSelect.value : 'Guduvancherry';
  if (chosenLocation === 'Custom Location' && customAddress && customAddress.value.trim() !== '') {
    chosenLocation = customAddress.value.trim();
  } else if (customAddress && customAddress.value.trim() !== '') {
    chosenLocation += ` (${customAddress.value.trim()})`;
  }

  const userText = input && input.value.trim() !== '' ? input.value.trim() : 'Hello, I want to inquire about your homestyle food service.';

  const fullMessage = 
`*Vanakkam Sri Lakshmi Home Food*
--------------------------------
Delivery Location: ${chosenLocation}
Inquiry: ${userText}
--------------------------------
Kindly share menu details and availability.`;

  const encodedUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(fullMessage)}`;
  window.open(encodedUrl, '_blank');
}

function triggerWhatsAppFromForm() {
  const custName = document.getElementById('custName')?.value.trim() || 'Guest';
  const pkg = document.getElementById('packageSelect')?.value || 'Food Package';
  const area = document.getElementById('deliveryArea')?.value || '';
  const time = document.getElementById('deliveryTimeSlot')?.value || '';
  const date = document.getElementById('deliveryDate')?.value || '';

  const msg = `Vanakkam Sri Lakshmi HomeFood! I want to order/enquire: ${pkg} for ${area} on ${date} at ${time}. My name is ${custName}.`;
  const url = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

/* 3. Order Submission: Settle in Backend Database & Send Alert to WhatsApp (7200451980) */
async function handleOrderSubmission(event) {
  event.preventDefault();

  const custName = document.getElementById('custName')?.value.trim();
  const custWhatsApp = document.getElementById('custWhatsApp')?.value.trim();
  const packageName = document.getElementById('packageSelect')?.value;
  const deliveryArea = document.getElementById('deliveryArea')?.value;
  const deliveryTimeSlot = document.getElementById('deliveryTimeSlot')?.value;
  const fullAddress = document.getElementById('fullAddress')?.value.trim();
  const deliveryDate = document.getElementById('deliveryDate')?.value;
  const specialNotes = document.getElementById('specialNotes')?.value.trim();

  if (!custName || !custWhatsApp || !fullAddress || !deliveryDate) {
    alert('Please fill in all required fields (Name, WhatsApp, Address, Delivery Date).');
    return;
  }

  const payload = {
    custName,
    custWhatsApp,
    packageName,
    deliveryArea,
    deliveryTimeSlot,
    fullAddress,
    deliveryDate,
    specialNotes
  };

  const directAlertUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(
`*NEW ORDER - Sri Lakshmi Home Food*
--------------------------------
Name: ${custName}
Phone: ${custWhatsApp}
Plan: ${packageName}
Date: ${deliveryDate}
Time Slot: ${deliveryTimeSlot}
Delivery Area: ${deliveryArea}
Address: ${fullAddress}${specialNotes ? `\nNotes: ${specialNotes}` : ''}
--------------------------------
Please confirm my homestyle delivery schedule.`
  )}`;

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    const finalUrl = data.whatsappUrl || directAlertUrl;
    alert(`Thank you, ${custName}!\n\nYour order has been recorded in our database.\nOpening WhatsApp to notify our kitchen directly.`);
    window.open(finalUrl, '_blank');
  } catch (err) {
    alert(`Thank you, ${custName}!\n\nOpening WhatsApp to notify our kitchen directly.`);
    window.open(directAlertUrl, '_blank');
  }
}

/* 5. 3D Swipable Reviews Carousel */
document.addEventListener('DOMContentLoaded', () => {
  const stage = document.getElementById('review3dStage');
  const cards = Array.from(document.querySelectorAll('.review-3d-card'));
  const dots = Array.from(document.querySelectorAll('.review-dot'));
  const prevBtn = document.getElementById('reviewPrevBtn');
  const nextBtn = document.getElementById('reviewNextBtn');

  if (!stage || cards.length === 0) return;

  let activeIndex = 0;
  let dragStartX = null;

  const update3DCarousel = () => {
    const total = cards.length;
    cards.forEach((card, idx) => {
      let diff = idx - activeIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      card.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease';

      if (diff === 0) {
        card.style.transform = 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)';
        card.style.zIndex = '30';
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.background = 'linear-gradient(135deg, #18181b 0%, #0f0f12 100%)';
        card.style.borderColor = 'rgba(234, 88, 12, 0.7)';
        card.style.boxShadow = '0 20px 50px rgba(234, 88, 12, 0.22)';
      } else if (diff === -1) {
        card.style.transform = 'translateX(-62%) translateZ(-140px) rotateY(24deg) scale(0.85)';
        card.style.zIndex = '20';
        card.style.opacity = '0.45';
        card.style.pointerEvents = 'auto';
        card.style.background = '#121215';
        card.style.borderColor = '#27272a';
        card.style.boxShadow = 'none';
      } else if (diff === 1) {
        card.style.transform = 'translateX(62%) translateZ(-140px) rotateY(-24deg) scale(0.85)';
        card.style.zIndex = '20';
        card.style.opacity = '0.45';
        card.style.pointerEvents = 'auto';
        card.style.background = '#121215';
        card.style.borderColor = '#27272a';
        card.style.boxShadow = 'none';
      } else {
        card.style.transform = `translateX(${diff * 80}%) translateZ(-260px) scale(0.7)`;
        card.style.zIndex = '10';
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.remove('w-2', 'bg-zinc-700');
        dot.classList.add('w-7', 'bg-[#ea580c]');
      } else {
        dot.classList.remove('w-7', 'bg-[#ea580c]');
        dot.classList.add('w-2', 'bg-zinc-700');
      }
    });
  };

  const goPrev = () => {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    update3DCarousel();
  };

  const goNext = () => {
    activeIndex = (activeIndex + 1) % cards.length;
    update3DCarousel();
  };

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (idx !== activeIndex) {
        activeIndex = idx;
        update3DCarousel();
      }
    });
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      activeIndex = idx;
      update3DCarousel();
    });
  });

  prevBtn?.addEventListener('click', goPrev);
  nextBtn?.addEventListener('click', goNext);

  // Touch & Mouse Swipe
  const onStart = (e) => {
    dragStartX = e.clientX ?? e.touches?.[0]?.clientX ?? null;
  };
  const onEnd = (e) => {
    if (dragStartX === null) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX;
    const diff = endX - dragStartX;
    if (diff > 45) goPrev();
    else if (diff < -45) goNext();
    dragStartX = null;
  };

  stage.addEventListener('mousedown', onStart);
  stage.addEventListener('mouseup', onEnd);
  stage.addEventListener('touchstart', onStart, { passive: true });
  stage.addEventListener('touchend', onEnd, { passive: true });

  update3DCarousel();
});

/* 6. Current GPS Location Detection & Monthly Combo Veg/Non-Veg Toggle */
function useCurrentLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }
  const btn = document.getElementById('useLocationBtn');
  const addressInput = document.getElementById('fullAddress');
  const areaSelect = document.getElementById('deliveryArea');

  if (btn) btn.textContent = 'Detecting...';

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
      } catch (e) {}

      if (addressInput) addressInput.value = addressText;
      if (areaSelect) areaSelect.value = 'Current Location (GPS)';
      if (btn) btn.textContent = 'Use Current Location';
    },
    () => {
      if (btn) btn.textContent = 'Use Current Location';
      alert('Unable to retrieve your location. Please allow location access or enter your address manually.');
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

let selectedMonthlyDiet = 'veg';
function selectMonthlyDiet(diet) {
  selectedMonthlyDiet = diet;
  const vegBtn = document.getElementById('toggleVegBtn');
  const nonVegBtn = document.getElementById('toggleNonVegBtn');
  const actionBtnText = document.getElementById('monthlyComboBtnText');

  if (diet === 'veg') {
    vegBtn?.classList.add('bg-zinc-800', 'text-white', 'shadow');
    vegBtn?.classList.remove('text-zinc-400');
    nonVegBtn?.classList.remove('bg-zinc-800', 'text-white', 'shadow');
    nonVegBtn?.classList.add('text-zinc-400');

    if (actionBtnText) actionBtnText.textContent = 'Send Message for Pure Veg Combo';
  } else {
    nonVegBtn?.classList.add('bg-zinc-800', 'text-white', 'shadow');
    nonVegBtn?.classList.remove('text-zinc-400');
    vegBtn?.classList.remove('bg-zinc-800', 'text-white', 'shadow');
    vegBtn?.classList.add('text-zinc-400');

    if (actionBtnText) actionBtnText.textContent = 'Send Message for Non-Veg Combo';
  }
}

function sendMonthlyComboMessage() {
  const label = selectedMonthlyDiet === 'veg' ? 'Pure Veg' : 'Non-Veg';
  openChatWindow(`Inquiry about Daily & Monthly Combo (${label}) homestyle delivery`);
}

/* 7. Policy Modal (Privacy Policy, Terms of Service, Food Safety & Hygiene) */
const POLICY_DATA = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Last updated: November 2026',
    sections: [
      { h: '1. Information We Collect', b: 'When you subscribe to daily meals or submit a catering inquiry, we collect only your name, WhatsApp contact number, delivery address (or optional GPS pin), and meal preferences.' },
      { h: '2. How We Use Your Details', b: 'Your information is used strictly to prepare your preferred meals, coordinate timely doorstep delivery across Guduvancheri, Urapakkam & SRM Surroundings, and send order/pause confirmations via WhatsApp.' },
      { h: '3. Data Confidentiality', b: 'We never sell, rent, or share your phone number or home address with third-party marketers. Your contact details remain strictly confidential within the Sri Lakshmi Home Food kitchen team.' },
      { h: '4. Data Removal Requests', b: 'You may request deletion of your order history or contact details anytime by messaging us on WhatsApp or emailing srilakshmihomefoods@gmail.com.' }
    ]
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Last updated: November 2026',
    sections: [
      { h: '1. Service Coverage & Timings', b: 'Daily meal deliveries operate across Guduvancheri, Urapakkam, and SRM Surroundings (Potheri & Kattankulathur). Standard delivery windows are Breakfast (7:30–8:30 AM), Lunch (12:15–1:15 PM), and Dinner (7:30–8:30 PM).' },
      { h: '2. Flexible Subscription Pause & Carry-Forward', b: 'Monthly subscribers can pause meals anytime when traveling or away. Simply message us on WhatsApp at least a day prior (or before 8:00 AM for same-day lunch/dinner updates), and unused days will be carried forward seamlessly.' },
      { h: '3. Event Catering Orders (10–30 Members)', b: 'Event feast bookings require a 50% advance confirmation to secure fresh ingredient procurement and your preferred delivery slot, with the remaining 50% payable upon delivery.' },
      { h: '4. Delivery Access', b: 'Please provide clear landmark/apartment gate details or use Current Location GPS so our delivery partner can hand over your hot food containers without delay.' }
    ]
  },
  hygiene: {
    title: 'Food Safety & Hygiene',
    subtitle: 'FSSAI LIC: 22423567000189',
    sections: [
      { h: '1. FSSAI Certified Homestyle Kitchen', b: 'Sri Lakshmi Home Food operates under active FSSAI registration (LIC: 22423567000189). Every batch is cooked in clean, inspected residential kitchens by experienced mothers.' },
      { h: '2. Pure Ingredients & Wood-Pressed Oils', b: 'We cook exclusively with traditional cold-pressed (chekku) oils, freshly ground Chettinad spices, and RO-purified water. We strictly use zero cooking soda, zero artificial colors, zero MSG, and zero preservatives.' },
      { h: '3. Kitchen Sanitation Protocols', b: 'Vegetables and grains are thoroughly washed and soaked prior to cooking. Our kitchen maintains daily surface sanitization, clean utensils, hairnets, and strict separation between Pure Veg and Non-Veg preparation.' },
      { h: '4. Hot Insulated Packaging', b: 'All meals are packed piping hot in food-grade leakproof thermal containers or reusable stainless-steel tiffins to preserve warmth, nutrition, and freshness until they reach your table.' }
    ]
  }
};

function openPolicyModal(key) {
  const modal = document.getElementById('policyModal');
  const titleEl = document.getElementById('policyModalTitle');
  const subEl = document.getElementById('policyModalSubtitle');
  const bodyEl = document.getElementById('policyModalBody');
  const data = POLICY_DATA[key];
  if (!modal || !data) return;

  if (titleEl) titleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.subtitle;
  if (bodyEl) {
    bodyEl.innerHTML = data.sections.map(s => `
      <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
        <h4 class="font-extrabold text-slate-900 text-sm sm:text-base mb-1.5">${s.h}</h4>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${s.b}</p>
      </div>
    `).join('');
  }
  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closePolicyModal() {
  document.getElementById('policyModal')?.classList.add('hidden');
}
