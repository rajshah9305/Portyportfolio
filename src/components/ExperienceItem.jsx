import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const ExperienceItem = memo(({ item, last }) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4 }}
    className="relative pl-7 sm:pl-9 md:pl-12 py-1.5 sm:py-2 group"
  >
    {/* Connector line */}
    {!last && (
      <div className="absolute left-[10px] sm:left-[13px] md:left-[15px] top-5 h-full w-[1px] bg-black/10 group-hover:bg-orange-600/25 transition-colors duration-500" />
    )}

    {/* Timeline dot */}
    <div className="absolute left-0 top-2 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 rounded-full border border-black bg-white flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 group-hover:border-orange-600 group-hover:shadow-[0_0_0_3px_rgba(234,88,12,0.1)]">
      <div className="h-1.5 w-1.5 rounded-full bg-orange-600 group-hover:scale-125 transition-transform duration-300" />
    </div>

    <div className="mb-8 sm:mb-10">
      <span className="inline-block mb-1.5 sm:mb-2 font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-orange-600 uppercase bg-orange-50 border border-orange-100 px-1.5 sm:px-2 py-0.5 sm:py-1">
        {item.period}
      </span>
      <h4 className="heading-3 mt-1.5 sm:mt-2 mb-1">
        {item.role}
      </h4>
      <div className="label-mono text-black/35 mb-3 sm:mb-4">
        {item.company}
      </div>
      <p className="body-base max-w-2xl">
        {item.desc}
      </p>
    </div>
  </motion.div>
));

ExperienceItem.displayName = 'ExperienceItem';
