import React, { memo } from 'react';
import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceCard = memo(({ service, onDetailsClick }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: parseInt(service.id) * 0.08 }}
      className="group relative border border-black bg-white overflow-hidden flex flex-col hover:border-orange-600 transition-colors duration-300 cursor-default"
    >
      {/* Top accent */}
      <div className="h-0.5 w-0 bg-orange-600 group-hover:w-full transition-all duration-500 ease-out" />

      <div className="p-8 flex flex-col flex-grow">
        {/* Service number */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-black border border-black group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all duration-300"
          >
            <Icon size={22} />
          </motion.div>
          <span className="font-mono text-[10px] font-bold text-black/20 group-hover:text-orange-600/50 transition-colors">
            {service.id}
          </span>
        </div>

        <h3 className="font-sans text-xl font-black uppercase tracking-tight text-black mb-3">
          {service.title}
        </h3>

        <p className="font-sans text-sm font-medium leading-relaxed text-black/60 flex-grow mb-6">
          {service.desc}
        </p>

        {/* Tech preview */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {service.details.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="font-mono text-[9px] font-bold uppercase tracking-wider text-black/40 border border-black/10 px-2 py-0.5 group-hover:border-orange-600/20 transition-colors">
              {tech}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => onDetailsClick(service)}
          className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-black/50 group-hover:text-orange-600 transition-colors cursor-pointer mt-auto"
          aria-label={`View details for ${service.title}`}
        >
          <span>View Details</span>
          <MoveRight size={12} />
        </motion.button>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';
