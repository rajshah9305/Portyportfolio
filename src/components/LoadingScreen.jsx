import React, { useState, useEffect } from 'react';

const BOOT_LOGS = [
  { text: "IDENTITY_VERIFIED...", delay: 200 },
  { text: "INITIALIZING_RS_CORE...", delay: 500 },
  { text: "LOADING_ASSETS...", delay: 800 },
  { text: "CALIBRATING_INTERFACE...", delay: 1100 },
  { text: "SYSTEM_READY", delay: 1400 },
];

export const LoadingScreen = ({ onComplete }) => {
  const [bootLog, setBootLog] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = BOOT_LOGS.map(({ text, delay }) =>
      setTimeout(() => {
        setBootLog(prev => [...prev, text]);
        setProgress(Math.round(((BOOT_LOGS.findIndex(l => l.text === text) + 1) / BOOT_LOGS.length) * 100));
      }, delay)
    );

    const finishTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1900);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white font-mono">
      <div className="w-80 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-black pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-600 flex items-center justify-center text-white font-black text-[10px]">RS</div>
            <span className="text-xs font-bold tracking-widest uppercase">BOOT_LOADER</span>
          </div>
          <span className="text-[10px] text-orange-600 animate-pulse font-bold">v2.0.26</span>
        </div>

        {/* Log output */}
        <div
          className="h-36 font-mono text-xs text-black/70 space-y-1.5 overflow-hidden flex flex-col justify-end"
          role="status"
          aria-live="polite"
        >
          {bootLog.map((log, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-orange-600 shrink-0">›</span>
              <span className={i === bootLog.length - 1 ? 'text-black font-bold' : ''}>{log}</span>
            </div>
          ))}
          {/* Blinking cursor */}
          <div className="flex items-center gap-2 h-4">
            <span className="text-orange-600 shrink-0">›</span>
            <span className="w-2 h-3.5 bg-black animate-pulse inline-block" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-black/40">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
          <div
            className="h-0.5 w-full bg-black/10"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="h-full bg-orange-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
