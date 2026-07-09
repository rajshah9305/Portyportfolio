import React, { useEffect, useRef } from 'react';
import { X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { ContactForm } from './ContactForm';

export const ContactModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useLockBodyScroll(isOpen);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm blueprint-modal-overlay"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg shadow-2xl overflow-hidden border border-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal size={18} className="text-orange-600" />
                <h3 id="contact-title" className="font-mono text-xs font-bold uppercase tracking-widest">
                  Secure_Channel_Init
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="heading-3 mb-3">
                  Let&apos;s Build<br />Something.
                </h2>
                <p className="body-base text-black/50">
                  Initialize a secure communication channel for your next project or architectural inquiry.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Footer decoration */}
            <div className="h-1 bg-gradient-to-r from-orange-600 via-black to-orange-600" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
