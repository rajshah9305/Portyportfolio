import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { BlueprintToggle } from './BlueprintToggle';
import { useActiveSection } from '../hooks/useActiveSection';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

const NAV_ITEMS = [
  { name: 'SERVICES', href: '#services', id: 'services', num: '01' },
  { name: 'WORK',     href: '#work',     id: 'work',     num: '02' },
  { name: 'EXPERIENCE', href: '#experience', id: 'experience', num: '03' },
];

export const Navigation = ({ onScrollToTop, blueprintMode, onToggleBlueprintMode }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const activeSection = useActiveSection(['services', 'work', 'experience']);

  useLockBodyScroll(isMobileMenuOpen);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll-aware nav bg
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard: Escape + focus trap
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key === 'Tab' && isMobileMenuOpen && mobileMenuRef.current) {
        const els = Array.from(mobileMenuRef.current.querySelectorAll(
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
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const wasOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, wasOpen ? 300 : 0);
  };

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'border-b border-black/10 bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="flex h-14 sm:h-16 md:h-20 items-center justify-between px-4 sm:px-6 md:px-12 max-w-[1920px] mx-auto">

          {/* Logo */}
          <button
            className="flex items-center gap-2.5 sm:gap-3 md:gap-4 group cursor-pointer shrink-0"
            onClick={onScrollToTop}
            aria-label="Scroll to top"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center bg-orange-600 text-white font-black text-[11px] sm:text-sm tracking-tighter shadow-md group-hover:scale-105 transition-transform shrink-0">
              RS
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold tracking-wider text-xs sm:text-sm text-black">{PORTFOLIO_DATA.profile.name}</span>
              <span className="font-mono text-[8px] sm:text-[9px] text-black/35 uppercase tracking-widest hidden xs:block">{PORTFOLIO_DATA.profile.tagline}</span>
            </div>
          </button>

          {/* Desktop pill nav */}
          <div className="hidden lg:flex items-center p-1 sm:p-1.5 bg-white/80 backdrop-blur-md border border-black/10 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 xl:px-6 py-2 sm:py-2.5 rounded-full font-mono text-[10px] sm:text-[11px] font-bold tracking-widest transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group ${
                    isActive ? 'text-white' : 'text-black hover:bg-black/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-black rounded-full shadow-sm"
                      transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                    />
                  )}
                  <span className={`relative z-10 w-1.5 h-1.5 rounded-full transition-all duration-300 shrink-0 ${
                    isActive ? 'bg-orange-500 scale-125' : 'bg-black/25 group-hover:bg-orange-400'
                  }`} />
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            <BlueprintToggle isBlueprintMode={blueprintMode} onToggle={onToggleBlueprintMode} />

            <div className="hidden xl:flex flex-col items-end text-[9px] sm:text-[10px] font-mono font-medium leading-tight text-black/45">
              <span>STATUS: <span className="text-orange-600 font-bold">ONLINE</span></span>
              <span>UTC {currentTime}</span>
            </div>

            <div className="h-6 sm:h-8 w-[1px] bg-black/10 hidden md:block" />

            <a href={PORTFOLIO_DATA.profile.socials.github} target="_blank" rel="noreferrer"
              className="text-black/50 hover:text-black transition-colors hidden sm:block" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={PORTFOLIO_DATA.profile.socials.linkedin} target="_blank" rel="noreferrer"
              className="text-black/50 hover:text-blue-700 transition-colors hidden sm:block" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-1.5 sm:p-2 text-black hover:bg-black/5 rounded-md border border-transparent hover:border-black/10 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white backdrop-blur-xl lg:hidden flex flex-col"
          >
            {/* Close button top-right */}
            <div className="flex justify-end px-4 sm:px-6 pt-4 sm:pt-5">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-black hover:bg-black/5 rounded-md"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col justify-center flex-grow px-6 sm:px-10 gap-4 sm:gap-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group flex items-baseline gap-3 sm:gap-4 font-sans text-4xl xs:text-5xl sm:text-6xl font-black text-black hover:text-orange-600 transition-colors tracking-tighter leading-none"
                >
                  <span className="text-xs sm:text-sm font-mono font-bold text-black/25 group-hover:text-orange-600 transition-colors shrink-0">
                    {item.num}
                  </span>
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Bottom socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-5 sm:gap-6 px-6 sm:px-10 pb-8 sm:pb-10 border-t border-black/10 pt-6"
            >
              <a href={PORTFOLIO_DATA.profile.socials.github} target="_blank" rel="noreferrer"
                className="text-black/50 hover:text-black transition-colors" aria-label="GitHub">
                <Github size={28} />
              </a>
              <a href={PORTFOLIO_DATA.profile.socials.linkedin} target="_blank" rel="noreferrer"
                className="text-black/50 hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                <Linkedin size={28} />
              </a>
              <span className="ml-auto font-mono text-[10px] text-black/30 uppercase tracking-widest">
                {PORTFOLIO_DATA.profile.location}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
