import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const ParallaxGrid = () => {
  const dimensions = useRef({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Setup smooth spring motion
  const springConfig = { damping: 40, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform normalized mouse cursor movement into translate pixel values
  const translateX = useTransform(smoothX, (val) => `${-val * 40}px`);
  const translateY = useTransform(smoothY, (val) => `${-val * 40}px`);

  useEffect(() => {
    const handleResize = () => {
      dimensions.current = {
        w: window.innerWidth,
        h: window.innerHeight,
      };
    };

    let requestRef;
    const handleMouseMove = (e) => {
      if (requestRef) return;
      requestRef = requestAnimationFrame(() => {
        // Normalize mouse positions to 0 - 1 values
        const normX = e.clientX / dimensions.current.w;
        const normY = e.clientY / dimensions.current.h;
        mouseX.set(normX);
        mouseY.set(normY);
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
  }, [mouseX, mouseY]);

  return (
    <div
      className="fixed inset-0 z-0 h-full w-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-[-100px] will-change-transform"
        style={{ x: translateX, y: translateY }}
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
      </motion.div>

      {/* Blueprint Mode Watermark */}
      <div className="absolute bottom-12 right-12 font-mono text-[100px] font-black text-orange-600 opacity-0 group-[.blueprint-mode]/body:opacity-5 transition-opacity duration-1000 select-none pointer-events-none">
        BLUEPRINT_v2.0
      </div>
    </div>
  );
};
