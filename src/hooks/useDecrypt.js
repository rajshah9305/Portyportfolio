import { useState, useEffect, useRef } from 'react';

// Defined outside component to avoid stale closure in dep array
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&';

export const useDecrypt = (text, trigger = true) => {
  const [display, setDisplay] = useState(text);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return letter;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        hasRun.current = true;
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return display;
};
