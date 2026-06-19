import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      // Throttle via rAF to avoid excessive state updates
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setScrolled(height > 0 ? (winScroll / height) * 100 : 0);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return scrolled;
};
