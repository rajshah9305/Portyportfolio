import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds = []) => {
  const [activeSection, setActiveSection] = useState('');
  // Stringify to create a stable dep value — avoids infinite re-renders from inline arrays
  const idsKey = sectionIds.join(',');

  useEffect(() => {
    // Re-parse from the stable key so the closure always has the latest ids
    const ids = idsKey ? idsKey.split(',') : [];

    const handleScroll = () => {
      for (const sectionId of ids) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.3) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [idsKey]);

  return activeSection;
};
