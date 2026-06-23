import React from 'react';
import { Layout } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlueprintToggle = ({ isBlueprintMode, onToggle }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[9px] sm:text-[10px] font-bold tracking-widest transition-all duration-500 border ${
      isBlueprintMode
        ? 'bg-orange-600 text-white border-orange-600 shadow-[0_0_16px_rgba(255,107,0,0.35)]'
        : 'bg-white text-black border-black/20 hover:bg-black hover:text-white hover:border-black'
    }`}
    aria-label="Toggle Blueprint Mode"
    aria-pressed={isBlueprintMode}
  >
    <Layout size={12} className={`shrink-0 sm:w-3.5 sm:h-3.5 ${isBlueprintMode ? 'animate-pulse' : ''}`} />
    <span className="hidden sm:inline">{isBlueprintMode ? 'BLUEPRINT_ON' : 'BLUEPRINT'}</span>
  </motion.button>
);
