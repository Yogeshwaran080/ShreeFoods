import React, { useEffect, useRef } from 'react';

export default function ParallaxFood() {
  const vadaRef = useRef(null);
  const jamunRef = useRef(null);
  const appalamRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (vadaRef.current) {
            // Vada moves vertically faster, rotating as user scrolls fast
            const vadaY = (scrollY * 0.18) % 400 - 50;
            const vadaRot = (scrollY * 0.12) % 360;
            vadaRef.current.style.transform = `translate3d(0, ${vadaY}px, 0) rotate(${vadaRot}deg)`;
          }

          if (jamunRef.current) {
            // Jamun floats smoothly with gentle wobble
            const jamunY = (scrollY * -0.14) % 300 + 40;
            const jamunRot = (scrollY * -0.08) % 360;
            jamunRef.current.style.transform = `translate3d(0, ${jamunY}px, 0) rotate(${jamunRot}deg)`;
          }

          if (appalamRef.current) {
            // Appalam glides across with crisp drift
            const appalamY = (scrollY * 0.16) % 350 - 60;
            const appalamRot = (scrollY * 0.05) % 180;
            appalamRef.current.style.transform = `translate3d(0, ${appalamY}px, 0) rotate(${appalamRot}deg)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Crispy Medu Vada */}
      <div 
        ref={vadaRef} 
        className="floating-food food-vada" 
        title="Crispy Golden Medu Vada"
      >
        <img 
          src="/assets/vada.svg" 
          alt="Crispy Medu Vada" 
          className="w-full h-full object-contain filter drop-shadow-xl hover:rotate-12 transition-transform" 
        />
      </div>

      {/* Syrupy Hot Gulab Jamun */}
      <div 
        ref={jamunRef} 
        className="floating-food food-jamun" 
        title="Glistening Hot Gulab Jamun"
      >
        <img 
          src="/assets/gulab-jamun.svg" 
          alt="Hot Gulab Jamun" 
          className="w-full h-full object-contain filter drop-shadow-xl hover:rotate-12 transition-transform" 
        />
      </div>

      {/* Crispy Fried Appalam */}
      <div 
        ref={appalamRef} 
        className="floating-food food-appalam" 
        title="Crunchy Fried Appalam"
      >
        <img 
          src="/assets/appalam.svg" 
          alt="Crunchy Appalam" 
          className="w-full h-full object-contain filter drop-shadow-xl hover:rotate-12 transition-transform" 
        />
      </div>
    </>
  );
}
