import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, Mail } from 'lucide-react';
import { Button } from './Button';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const ServiceModal = ({ service, isOpen, onClose }) => {
  const Icon = service?.icon;
  const modalRef = useRef(null);
  
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }

      if (e.key === 'Tab' && isOpen && modalRef.current) {
        const focusableElements = Array.from(modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black p-6 md:p-8 flex items-start justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-600 text-white">
              <Icon size={24} />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-orange-600 uppercase tracking-widest">
                Service {service.id}
              </span>
              <h3 
                id="modal-title"
                className="font-sans text-2xl md:text-3xl font-black uppercase tracking-tight text-black"
              >
                {service.title}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-sm transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Full Description */}
          <div>
            <h4 className="font-mono text-xs font-bold text-black uppercase tracking-widest mb-3">
              Overview
            </h4>
            <p className="font-sans text-lg font-medium text-black leading-relaxed">
              {service.details.fullDescription}
            </p>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-mono text-xs font-bold text-black uppercase tracking-widest mb-4">
              Core Capabilities
            </h4>
            <div className="grid gap-3">
              {service.details.capabilities.map((capability, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 bg-white border border-black hover:border-orange-600 transition-colors"
                >
                  <CheckCircle2 size={18} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm font-medium text-black">{capability}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-mono text-xs font-bold text-black uppercase tracking-widest mb-4">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.details.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-3 py-2 bg-black text-white font-mono text-xs font-bold uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="font-mono text-xs font-bold text-black uppercase tracking-widest mb-4">
              Deliverables
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {service.details.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border border-black">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                  <span className="font-sans text-sm font-medium text-black">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6 border-t border-black">
            <Button 
              href={`mailto:${PORTFOLIO_DATA.profile.socials.email}?subject=Inquiry about ${service.title}`}
              icon={Mail}
              ariaLabel={`Request quote for ${service.title}`}
            >
              Request Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
