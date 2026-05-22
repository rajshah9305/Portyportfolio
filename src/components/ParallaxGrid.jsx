import React, { useState, useEffect } from 'react';

export const ParallaxGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let requestRef;

    const handleMouseMove = (e) => {
      if (requestRef) return;

      requestRef = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        requestRef = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, []);

  const moveX = (mousePos.x / window.innerWidth) * 40;
  const moveY = (mousePos.y / window.innerHeight) * 40;

  return (
    <div
      className="fixed inset-0 z-0 h-full w-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-[-100px] transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: `translate(${-moveX}px, ${-moveY}px)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '25px 25px'
          }}
        />

        {/* Blueprint Mode Grid Enhancement */}
        <div className="absolute inset-0 opacity-0 group-[.blueprint-mode]/body:opacity-20 transition-opacity duration-1000"
             style={{
               backgroundImage: 'linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }}
        />
      </div>

      {/* Blueprint Mode Watermark */}
      <div className="absolute bottom-12 right-12 font-mono text-[100px] font-black text-primary opacity-0 group-[.blueprint-mode]/body:opacity-5 transition-opacity duration-1000 select-none pointer-events-none">
        BLUEPRINT_v2.0
      </div>
    </div>
  );
};
