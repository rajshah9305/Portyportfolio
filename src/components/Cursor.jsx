import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const INTERACTIVE = new Set(['A', 'BUTTON']);

export const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseOver = useCallback((e) => {
    const t = e.target;
    setIsHovering(
      INTERACTIVE.has(t.tagName) ||
      !!t.closest('button') ||
      !!t.closest('a') ||
      t.classList.contains('cursor-pointer')
    );
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [handleMouseMove, handleMouseOver]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      animate={{
        x: mousePos.x - 14,
        y: mousePos.y - 14,
        scale: isHovering ? 2.2 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 22,
        stiffness: 260,
        mass: 0.45,
        x: { duration: 0 },
        y: { duration: 0 },
      }}
      style={{ backgroundColor: '#fff' }}
    >
      <div className="absolute inset-0 rounded-full border border-white opacity-40" />
    </motion.div>
  );
};
