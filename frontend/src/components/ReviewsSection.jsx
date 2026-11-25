import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: 'Praveen Kumar R.',
      role: 'Software Engineer at Zoho • Estancia, Guduvancheri',
      plan: 'Monthly Lunch Plan',
      avatar: '/assets/reviewer-zoho-it.jpg',
      rating: 5,
      review:
        "Wanted to drop a quick message to thank amma's kitchen! Working long sprints at Zoho, I used to skip lunch or order oily restaurant food. Their hot Ponni rice, arachuvitta sambar, and Chettinad poriyal delivered right to Estancia feels just like eating at home in Madurai."
    },
    {
      id: 2,
      name: 'Karthik Subramanian',
      role: 'B.Tech Student, SRM • Potheri',
      plan: 'Tiffin & Dinner Plan',
      avatar: '/assets/reviewer-student.jpg',
      rating: 5,
      review:
        "Honestly wanted to message you guys—hostel mess food was ruining my health, and hotel meals were too pricey. Switching to Sri Lakshmi HomeFood saved me! Soft mallipoo idlis, hand-rolled phulkas, and zero soda. Pausing on WhatsApp when going home is super easy."
    },
    {
      id: 3,
      name: 'Divya Dharshini S.',
      role: 'IT Professional • Urapakkam',
      plan: 'Monthly Combo',
      avatar: '/assets/reviewer-female-it.jpg',
      rating: 5,
      review:
        "Just wanted to share how much we love your food! My husband and I both work in IT and rarely find time to cook. Every meal arrives steaming hot in clean containers with authentic cold-pressed oil aroma. Feels 100% hygienic and lovingly made."
    },
    {
      id: 4,
      name: 'Venkatesan & Family',
      role: 'Residents • Guduvancheri',
      plan: 'Weekend Combo',
      avatar: '/assets/reviewer-family.jpg',
      rating: 5,
      review:
        "Wanted to send a heartfelt thank you for the Weekend Saturday-Sunday Combo! The fragrant Seeraga Samba biryani, crispy medu vadai, and rich payasam reminded us of traditional Kalyana virundhu. Generous portions for the whole family."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    isDragging.current = true;
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current;
    const diff = endX - dragStartX.current;
    if (diff > 45) {
      prevSlide();
    } else if (diff < -45) {
      nextSlide();
    }
    dragStartX.current = null;
    isDragging.current = false;
  };

  const getOffset = (index) => {
    const total = reviews.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 bg-[#09090b] text-white border-t border-zinc-800 relative overflow-hidden select-none"
    >
      {/* Ambient Dark Orange Cravings Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(234, 88, 12, 0.16), transparent 65%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-serif italic text-white">
            Loved by{' '}
            <span className="text-[#f97316]">Students, Techies &amp; Families</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Swipe through genuine messages from Zoho engineers, SRM students, and families across Guduvancheri, Urapakkam &amp; SRM Surroundings.
          </p>
        </div>

        {/* 3D Swipable Carousel Stage */}
        <div
          className="relative h-[380px] sm:h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: '1200px' }}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
        >
          {reviews.map((rev, idx) => {
            const offset = getOffset(idx);
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            let transform = 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)';
            let zIndex = 30;
            let opacity = 1;

            if (offset === -1) {
              transform = 'translateX(-62%) translateZ(-140px) rotateY(24deg) scale(0.85)';
              zIndex = 20;
              opacity = 0.45;
            } else if (offset === 1) {
              transform = 'translateX(62%) translateZ(-140px) rotateY(-24deg) scale(0.85)';
              zIndex = 20;
              opacity = 0.45;
            } else if (!isVisible) {
              transform = `translateX(${offset * 80}%) translateZ(-260px) scale(0.7)`;
              zIndex = 10;
              opacity = 0;
            }

            return (
              <div
                key={rev.id}
                onClick={() => !isActive && setActiveIndex(idx)}
                style={{
                  transform,
                  zIndex,
                  opacity,
                  transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease',
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
                className={`absolute w-full max-w-[340px] sm:max-w-[520px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border ${isActive
                  ? 'bg-gradient-to-br from-[#18181b] to-[#0f0f12] border-[#ea580c]/70 shadow-[0_20px_50px_rgba(234,88,12,0.22)]'
                  : 'bg-[#121215] border-zinc-800 cursor-pointer hover:border-[#ea580c]/40'
                  }`}
              >
                <div>
                  {/* Top Row: Dark Orange Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#ea580c]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#ea580c] text-[#ea580c]" />
                      ))}
                      <span className="text-xs font-black text-[#f97316] ml-2">5.0</span>
                    </div>
                    <MessageSquareQuote className="w-5 h-5 text-[#ea580c]/70" />
                  </div>

                  {/* Review Message */}
                  <p className="text-zinc-200 text-sm sm:text-base leading-relaxed mb-6 font-serif italic">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>

                {/* Bottom Row: Small Round Tamil Nadu Avatar + Details */}
                <div className="pt-4 border-t border-zinc-800/90 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      loading="lazy"
                      decoding="async"
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#ea580c] shadow-md shrink-0 pointer-events-none"
                    />
                    <div>
                      <div className="font-bold text-white text-sm sm:text-base leading-tight">
                        {rev.name}
                      </div>
                      <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
                        {rev.role}
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-[#ea580c]/15 text-[#fb923c] border border-[#ea580c]/30 shrink-0">
                    {rev.plan}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls & Dots */}
        <div className="flex items-center justify-center gap-5 mt-6">
          <button
            onClick={prevSlide}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-[#ea580c] border border-zinc-700 hover:border-[#ea580c] text-white flex items-center justify-center transition-all shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                  ? 'w-7 bg-[#ea580c]'
                  : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next review"
            className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-[#ea580c] border border-zinc-700 hover:border-[#ea580c] text-white flex items-center justify-center transition-all shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
