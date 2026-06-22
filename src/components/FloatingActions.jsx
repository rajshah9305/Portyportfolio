import React from 'react';
import { Mail, CheckCircle2, ArrowUp } from 'lucide-react';

export const FloatingActions = ({ onScrollToTop, onCopyEmail, isCopied }) => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 flex flex-col gap-2">
      <button
        onClick={onCopyEmail}
        className="h-9 w-9 sm:h-10 sm:w-10 bg-black text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors relative group rounded-sm"
        aria-label={isCopied ? 'Email copied' : 'Copy email address'}
      >
        {isCopied ? <CheckCircle2 size={16} /> : <Mail size={16} />}
        <span className="absolute right-full mr-2 bg-black text-white text-[9px] sm:text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono pointer-events-none">
          {isCopied ? 'COPIED' : 'COPY EMAIL'}
        </span>
      </button>

      <button
        onClick={onScrollToTop}
        className="h-9 w-9 sm:h-10 sm:w-10 bg-white border border-black text-black flex items-center justify-center shadow-lg hover:border-orange-600 hover:text-orange-600 transition-colors rounded-sm"
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
};
