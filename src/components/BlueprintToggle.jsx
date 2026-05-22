import React from 'react';
import { Layout } from 'lucide-react';

export const BlueprintToggle = ({ isBlueprintMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] font-bold tracking-widest transition-all duration-500 border ${
        isBlueprintMode
          ? 'bg-primary text-white border-primary shadow-[0_0_20px_rgba(255,107,0,0.4)]'
          : 'bg-white text-black border-black hover:bg-black hover:text-white'
      }`}
      aria-label="Toggle Blueprint Mode"
    >
      <Layout size={14} className={isBlueprintMode ? 'animate-pulse' : ''} />
      <span>{isBlueprintMode ? 'BLUEPRINT_ACTIVE' : 'VIEW_BLUEPRINT'}</span>
    </button>
  );
};
