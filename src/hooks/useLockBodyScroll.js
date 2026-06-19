import { useEffect } from 'react';

// Tracks lock count to handle multiple simultaneous callers (modal + mobile menu)
let lockCount = 0;

export const useLockBodyScroll = (lock = false) => {
  useEffect(() => {
    if (lock) {
      lockCount++;
      if (lockCount === 1) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      if (lock) {
        lockCount = Math.max(0, lockCount - 1);
        if (lockCount === 0) {
          document.body.style.overflow = '';
        }
      }
    };
  }, [lock]);
};
