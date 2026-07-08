import React from 'react';
import { Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlueprintToggle = ({ isBlueprintMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
        isBlueprintMode
          ? 'bg-orange-600 border-orange-600 text-white'
          : 'bg-white border-black/10 text-black hover:border-black'
      }`}
      aria-label="Toggle blueprint mode"
    >
      <motion.div
        animate={{ rotate: isBlueprintMode ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        <Layers size={14} />
      </motion.div>
      <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
        {isBlueprintMode ? 'Blueprint: ON' : 'Blueprint: OFF'}
      </span>
      {isBlueprintMode && (
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      )}
    </button>
  );
};
