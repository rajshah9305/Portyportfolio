import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const StatItem = ({ label, value }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      // Extract numeric part and suffix
      const numericMatch = value.match(/(\d+)/);
      const suffix = value.replace(/(\d+)/, '');
      const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;

      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out expo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const current = Math.floor(easeProgress * target);

        // Format with leading zero if original target was small and had leading zero (optional)
        const formatted = current < 10 && target >= 10 ? `0${current}` : `${current}`;
        setDisplayValue(`${formatted}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
          hasAnimated.current = true;
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="p-6 sm:p-8 md:p-10 lg:p-12 group hover:bg-black transition-colors duration-500 cursor-default border-black"
    >
      <span className="block label-mono text-black/40 group-hover:text-white/40 mb-1.5 sm:mb-2 transition-colors">
        {label}
      </span>
      <span className="block font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-black group-hover:text-white transition-colors">
        {displayValue}
      </span>
    </div>
  );
};
