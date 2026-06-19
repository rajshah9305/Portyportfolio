import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const ExperienceItem = memo(({ item, last }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4 }}
    className="relative pl-8 md:pl-12 py-2 group"
  >
    {!last && (
      <div className="absolute left-[11px] md:left-[15px] top-4 h-full w-[1px] bg-black/10 group-hover:bg-orange-600/30 transition-colors duration-500"></div>
    )}

    <div className="absolute left-0 top-2 h-6 w-6 md:h-8 md:w-8 rounded-full border border-black bg-white flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 group-hover:border-orange-600 group-hover:shadow-[0_0_0_4px_rgba(234,88,12,0.1)]">
      <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-orange-600 group-hover:scale-125 transition-transform duration-300"></div>
    </div>

    <div className="mb-10">
      <span className="inline-block mb-2 font-mono text-[10px] font-bold tracking-widest text-orange-600 uppercase bg-orange-50 border border-orange-100 px-2 py-1">
        {item.period}
      </span>
      <h4 className="font-sans text-2xl md:text-3xl font-black uppercase tracking-tight text-black mt-2 mb-1">
        {item.role}
      </h4>
      <div className="font-mono text-xs font-bold uppercase tracking-widest text-black/40 mb-4">
        {item.company}
      </div>
      <p className="font-sans text-base font-medium leading-relaxed text-black/60 max-w-2xl">
        {item.desc}
      </p>
    </div>
  </motion.div>
));

ExperienceItem.displayName = 'ExperienceItem';
