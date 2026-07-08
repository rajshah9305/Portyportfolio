import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const StatItem = ({ stat }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(stat.value);
  const isNumeric = !isNaN(target);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isNumeric || !isInView) return;

    let startTimestamp = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing: out-expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, isNumeric, isInView]);

  return (
    <div
      ref={ref}
      className="p-6 sm:p-8 md:p-10 lg:p-12 group hover:bg-black transition-colors duration-300 cursor-default"
    >
      <span className="block label-mono text-black/40 group-hover:text-white/40 mb-1.5 sm:mb-2 transition-colors text-[9px] sm:text-[10px] md:text-xs">
        {stat.label}
      </span>
      <span className="block font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-black group-hover:text-white transition-colors">
        {isNumeric ? `${count.toString().padStart(2, '0')}${stat.value.replace(/[0-9]/g, '')}` : stat.value}
      </span>
    </div>
  );
};
