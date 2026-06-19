import React, { useState, useEffect } from 'react';

// Lazy initializer reads window once at mount — avoids setState-in-effect
const getWindowDimensions = () => ({
  w: typeof window !== 'undefined' ? window.innerWidth : 1440,
  h: typeof window !== 'undefined' ? window.innerHeight : 900,
});

export const ParallaxGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions());

    let requestRef;
    const handleMouseMove = (e) => {
      if (requestRef) return;
      requestRef = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        requestRef = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, []);

  const moveX = (mousePos.x / dimensions.w) * 40;
  const moveY = (mousePos.y / dimensions.h) * 40;

  return (
    <div
      className="fixed inset-0 z-0 h-full w-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-[-100px] transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: `translate(${-moveX}px, ${-moveY}px)` }}
      >
        {/* Primary grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
        {/* Sub-grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '25px 25px'
          }}
        />
        {/* Blueprint Mode Grid Enhancement */}
        <div
          className="absolute inset-0 opacity-0 group-[.blueprint-mode]/body:opacity-20 transition-opacity duration-1000"
          style={{
            backgroundImage: 'linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Blueprint Mode Watermark */}
      <div className="absolute bottom-12 right-12 font-mono text-[100px] font-black text-orange-600 opacity-0 group-[.blueprint-mode]/body:opacity-5 transition-opacity duration-1000 select-none pointer-events-none">
        BLUEPRINT_v2.0
      </div>
    </div>
  );
};
