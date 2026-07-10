import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const ServiceModal = ({ service, isOpen, onClose }) => {
  const Icon = service?.icon;
  const modalRef = useRef(null);

  useLockBodyScroll(isOpen);

  // Auto-focus first element
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const el = modalRef.current.querySelector('button,[href]');
      el?.focus();
    }
  }, [isOpen]);

  // Escape + focus trap
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) { onClose(); return; }
      if (e.key === 'Tab' && isOpen && modalRef.current) {
        const els = Array.from(modalRef.current.querySelectorAll(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.disabled && el.offsetParent !== null);
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-white w-full sm:max-w-2xl md:max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl rounded-t-xl sm:rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black/10 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-start justify-between z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-600 text-white shrink-0">
              <Icon size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-orange-600 uppercase tracking-widest block">
                Service {service.id}
              </span>
              <h3 id="modal-title" className="font-sans text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-black leading-tight">
                {service.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-black/5 rounded transition-colors shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X size={20} className="text-black sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Body */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 space-y-6 sm:space-y-8"
        >
          {/* Overview */}
          <motion.div variants={itemVariants}>
            <h4 className="font-mono text-[9px] sm:text-xs font-bold text-black uppercase tracking-widest mb-2 sm:mb-3">Overview</h4>
            <p className="font-sans text-sm sm:text-base md:text-lg font-medium text-black/80 leading-relaxed whitespace-pre-line">
              {service.details.fullDescription}
            </p>
          </motion.div>

          {/* Capabilities */}
          <motion.div variants={itemVariants}>
            <h4 className="font-mono text-[9px] sm:text-xs font-bold text-black uppercase tracking-widest mb-3 sm:mb-4">Core Capabilities</h4>
            <div className="grid gap-2 sm:gap-3">
              {service.details.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 border border-black/10 hover:border-orange-600/50 transition-colors">
                  <CheckCircle2 size={15} className="text-orange-600 shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]" />
                  <span className="font-sans text-xs sm:text-sm font-medium text-black/80">{cap}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div variants={itemVariants}>
            <h4 className="font-mono text-[9px] sm:text-xs font-bold text-black uppercase tracking-widest mb-3 sm:mb-4">Technology Stack</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {service.details.technologies.map((tech, i) => (
                <span key={i} className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-black text-white font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Deliverables */}
          <motion.div variants={itemVariants}>
            <h4 className="font-mono text-[9px] sm:text-xs font-bold text-black uppercase tracking-widest mb-3 sm:mb-4">Deliverables</h4>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
              {service.details.deliverables.map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 sm:p-3 border border-black/10">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full shrink-0" />
                  <span className="font-sans text-xs sm:text-sm font-medium text-black/80">{d}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="pt-4 sm:pt-6 border-t border-black/10">
            <a
              href={`mailto:${PORTFOLIO_DATA.profile.socials.email}?subject=Inquiry about ${service.title}`}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden px-6 sm:px-8 py-3 sm:py-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-black bg-black text-white hover:border-orange-600 transition-colors duration-300 cursor-pointer"
            >
              <span className="z-10 flex items-center gap-2 relative">
                <Mail size={13} className="transition-transform duration-300 group-hover:rotate-12 shrink-0" />
                Request Quote
              </span>
              <div className="absolute inset-0 -translate-x-full bg-orange-600 transition-transform duration-300 ease-out group-hover:translate-x-0" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};
