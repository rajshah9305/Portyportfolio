import React, { useState, useEffect } from 'react';

const BOOT_LOGS = [
  { text: 'CORE_KERNEL_LOADED [v4.2.0]...', delay: 150 },
  { text: 'INITIALIZING_ARCHITECTURAL_ENGINE...', delay: 400 },
  { text: 'SYNCING_SYSTEM_BLUEPRINTS...', delay: 700 },
  { text: 'CALIBRATING_PIXEL_PRECISION...', delay: 1000 },
  { text: 'ESTABLISHING_SECURE_PROTOCOLS...', delay: 1300 },
  { text: 'INTERFACE_READY', delay: 1600 },
];

export const LoadingScreen = ({ onComplete }) => {
  const [bootLog, setBootLog] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = BOOT_LOGS.map(({ text, delay }, i) =>
      setTimeout(() => {
        setBootLog(prev => [...prev, text]);
        setProgress(Math.round(((i + 1) / BOOT_LOGS.length) * 100));
      }, delay)
    );
    const finish = setTimeout(() => onComplete?.(), 2000);
    return () => { timers.forEach(clearTimeout); clearTimeout(finish); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white font-mono px-4">
      <div className="w-full max-w-[320px] sm:max-w-sm space-y-5 sm:space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-black pb-2.5 sm:pb-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-600 flex items-center justify-center text-white font-black text-[9px] sm:text-[10px]">RS</div>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">BOOT_LOADER</span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-orange-600 animate-pulse font-bold">v2.0.26</span>
        </div>

        {/* Log */}
        <div className="h-28 sm:h-36 text-[10px] sm:text-xs text-black/65 space-y-1 sm:space-y-1.5 overflow-hidden flex flex-col justify-end" role="status" aria-live="polite">
          {bootLog.map((log, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-orange-600 shrink-0">›</span>
              <span className={i === bootLog.length - 1 ? 'text-black font-bold' : ''}>{log}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 sm:gap-2 h-3.5 sm:h-4">
            <span className="text-orange-600 shrink-0">›</span>
            <span className="w-1.5 sm:w-2 h-3 sm:h-3.5 bg-black animate-pulse inline-block" />
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex justify-between text-[9px] sm:text-[10px] font-bold text-black/35">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
          <div className="h-0.5 w-full bg-black/10" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            <div className="h-full bg-orange-600 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
