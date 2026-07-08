import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorType, setCursorType] = useState('default'); // default, pointer, text

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const computedStyle = window.getComputedStyle(target);

      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        computedStyle.cursor === 'pointer'
      ) {
        setIsHovering(true);
        setCursorType('pointer');
      } else if (computedStyle.cursor === 'text') {
        setCursorType('text');
      } else {
        setIsHovering(false);
        setCursorType('default');
      }
    };

    const handleMouseOut = () => {
      setIsHidden(true);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [cursorX, cursorY, isHidden]);

  return (
    <>
      {/* Main Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-orange-600 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2.5 : 1,
          opacity: isHidden ? 0 : 1,
          borderWidth: isHovering ? '1px' : '2px',
        }}
        animate={{
          rotate: isHovering ? 90 : 0,
          borderRadius: cursorType === 'text' ? '4px' : '50%',
          width: cursorType === 'text' ? 2 : isHovering ? 64 : 32,
          height: cursorType === 'text' ? 24 : isHovering ? 64 : 32,
        }}
      />

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-orange-600 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />

      {/* Trailing blur */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-orange-600/10 rounded-full blur-2xl pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 0.5,
        }}
      />
    </>
  );
};
