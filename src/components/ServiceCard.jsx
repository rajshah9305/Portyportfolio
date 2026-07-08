import React, { memo } from 'react';
import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceCard = memo(({ service, onDetailsClick }) => {
  const Icon = service.icon;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: parseInt(service.id) * 0.1
          }
        }
      }}
      className="group relative border border-black bg-white overflow-hidden flex flex-col hover:border-orange-600 shadow-premium hover:shadow-premium-hover transition-all duration-500 ease-out-quint"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-600/10 transition-colors duration-700" />

      {/* Glint effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-30 transition-opacity duration-700">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Top accent bar */}
      <div className="h-1 w-0 bg-orange-600 group-hover:w-full transition-all duration-700 ease-out-quint shrink-0" />

      <div className="p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col flex-grow relative z-10">
        {/* Icon + number */}
        <div className="flex items-start justify-between mb-5 sm:mb-6">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white text-black border border-black group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all duration-300 shrink-0"
          >
            <Icon size={18} className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" />
          </motion.div>
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-black/18 group-hover:text-orange-600/45 transition-colors">
            {service.id}
          </span>
        </div>

        <h3 className="font-sans text-lg sm:text-xl font-black uppercase tracking-tight text-black mb-2.5 sm:mb-3">
          {service.title}
        </h3>

        <p className="font-sans text-xs sm:text-sm font-medium leading-relaxed text-black/55 flex-grow mb-5 sm:mb-6 whitespace-pre-line">
          {service.desc}
        </p>

        {/* Tech preview */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-5 sm:mb-6">
          {service.details.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-black/35 border border-black/10 px-1.5 sm:px-2 py-0.5 group-hover:border-orange-600/20 transition-colors">
              {tech}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ x: 3 }}
          onClick={() => onDetailsClick(service)}
          className="flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-black/40 group-hover:text-orange-600 transition-colors cursor-pointer mt-auto"
          aria-label={`View details for ${service.title}`}
        >
          View Details
          <MoveRight size={11} />
        </motion.button>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';
