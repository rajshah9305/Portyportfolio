import React from 'react';
import { MoveRight } from 'lucide-react';

export const ServiceCard = ({ service, onDetailsClick }) => {
  const Icon = service.icon;

  return (
    <div className="group card relative overflow-hidden h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-50 text-black border border-zinc-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
          <Icon size={24} />
        </div>

        <h3 className="heading-3 mb-3">
          {service.title}
        </h3>

        <p className="body-base flex-grow">
          {service.desc}
        </p>

        <button
          onClick={() => onDetailsClick(service)}
          className="mt-6 flex items-center gap-2 label-mono text-zinc-500 group-hover:text-primary transition-colors cursor-pointer"
          aria-label={`View details for ${service.title}`}
        >
          <span>Details</span>
          <MoveRight size={12} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
