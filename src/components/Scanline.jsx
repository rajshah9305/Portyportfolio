import React from 'react';

export const Scanline = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-[60] h-full w-full overflow-hidden opacity-[0.04] mix-blend-multiply"
    aria-hidden="true"
  >
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
  </div>
);
