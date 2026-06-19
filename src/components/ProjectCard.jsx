import React, { memo } from 'react';
import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectCard = memo(({ project, index }) => {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className="group relative border border-black bg-white overflow-hidden flex flex-col hover:border-orange-600 transition-colors duration-300"
    >
      {/* Image strip — reveals on hover */}
      <div className="relative h-48 overflow-hidden bg-black/5">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(80%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-white/90 text-black px-2 py-1 border border-black/10">
            {project.category}
          </span>
        </div>
        {/* Index number */}
        <div className="absolute top-4 right-4">
          <span className="font-mono text-[10px] font-bold text-white/70 bg-black/60 px-2 py-1">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-grow p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black border border-black group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all duration-300 shrink-0"
            >
              <Icon size={18} />
            </motion.div>
            <h3 className="font-sans text-lg font-black uppercase tracking-tight text-black">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="font-sans text-sm font-medium leading-relaxed text-black/60 mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-black/5 border border-black/10 text-[10px] font-mono font-bold text-black/70 uppercase tracking-wider group-hover:border-orange-600/30 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-black/10 flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-orange-600">
            {project.stat}
          </span>
          <motion.a
            whileHover={{ x: 4 }}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${project.title} repository on GitHub`}
          >
            View Repo
            <MoveRight size={12} />
          </motion.a>
        </div>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-600 group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';
