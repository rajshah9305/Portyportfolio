import React, { memo } from 'react';
import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectCard = memo(({ project, index }) => {
  const Icon = project.icon;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: (index % 2) * 0.1
          }
        }
      }}
      whileHover={{ y: -8 }}
      className="group relative border border-black bg-white overflow-hidden flex flex-col hover:border-orange-600 hover:shadow-[24px_24px_0px_0px_rgba(255,107,0,0.1)] transition-all duration-500"
    >
      {/* Glint effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-30 transition-opacity duration-700">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Image strip — native lazy load, no layout shift via fixed height */}
      <div className="relative h-36 xs:h-40 sm:h-44 md:h-48 overflow-hidden bg-black/5 shrink-0">
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ filter: 'grayscale(75%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-white pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 xs:top-4 xs:left-4">
          <span className="label-mono bg-white/92 text-black px-2 py-1 border border-black/10 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Index number */}
        <div className="absolute top-3 right-3 xs:top-4 xs:right-4">
          <span className="label-mono text-white/80 bg-black/55 px-2 py-1 backdrop-blur-sm">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-grow p-4 xs:p-5 sm:p-5 md:p-6">
        {/* Title row */}
        <div className="flex items-center gap-2.5 xs:gap-3 mb-3 xs:mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 md:w-10 md:h-10 rounded-full bg-white text-black border border-black group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all duration-300 shrink-0"
          >
            <Icon size={14} className="xs:w-4 xs:h-4 md:w-[18px] md:h-[18px]" />
          </motion.div>
          <h3 className="heading-3 text-sm xs:text-base sm:text-lg leading-tight">
            {project.title}
          </h3>
        </div>

        <p className="body-base mb-4 xs:mb-5 flex-grow">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5 flex-grow-0">
          {project.tech.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-black/4 border border-black/10 label-mono text-[9px] text-black/60 group-hover:border-orange-600/25 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-auto border-t border-black/8 flex items-center justify-between gap-2">
          <span className="label-mono text-orange-600 shrink-0">
            {project.stat}
          </span>
          <motion.a
            whileHover={{ x: 3 }}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors shrink-0"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${project.title} on GitHub`}
          >
            View Repo
            <MoveRight size={11} />
          </motion.a>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-600 group-hover:w-full transition-all duration-500 ease-out" />
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';
