import React, { useCallback } from 'react';
import { Mail, Terminal, Cpu, CheckCircle2, Copy, Check, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import {
  ParallaxGrid,
  ScrollProgress,
  DecryptText,
  ServiceModal,
  ServiceCard,
  ProjectCard,
  ExperienceItem,
  Navigation,
  Button,
  FloatingActions,
  LoadingScreen,
  Cursor
} from './components';
import { PORTFOLIO_DATA } from './data/portfolio';
import { usePortfolioState } from './hooks/usePortfolioState';
import architectureDiagram from './assets/architecture.jpg';

export default function App() {
  const {
    loading,
    blueprintMode,
    selectedService,
    emailCopied,
    toggleBlueprintMode,
    setSelectedService,
    handleCopyEmail,
    closeServiceModal,
    completeLoading
  } = usePortfolioState();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={completeLoading} />;
  }

  return (
    <div className={`group/body min-h-screen bg-white text-black font-sans overflow-x-hidden relative ${blueprintMode ? 'blueprint-mode' : ''}`}>
      <Cursor />
      <ParallaxGrid />

      {/* Ambient glow — hidden on small screens to save paint */}
      <div
        className="hidden md:block absolute top-0 right-0 w-[600px] lg:w-[900px] h-[500px] lg:h-[700px] bg-orange-500/8 rounded-full blur-[120px] lg:blur-[140px] pointer-events-none translate-x-1/3 -translate-y-1/4 z-0"
        aria-hidden="true"
      />

      <ScrollProgress />
      <Navigation
        onScrollToTop={scrollToTop}
        blueprintMode={blueprintMode}
        onToggleBlueprintMode={toggleBlueprintMode}
      />
      <FloatingActions onScrollToTop={scrollToTop} />

      <main className="relative z-10">

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-32 md:pt-40 lg:pt-44 pb-16 sm:pb-20 md:pb-28 lg:pb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.2 }
              }
            }}
            className="space-y-8 sm:space-y-10"
          >

            {/* Status badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex items-center gap-2.5"
            >
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-orange-600" />
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-black/50">
                {PORTFOLIO_DATA.profile.availability} — {PORTFOLIO_DATA.profile.location}
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="font-sans font-black uppercase tracking-tighter leading-[0.82] text-black text-[clamp(3.5rem,13vw,11rem)]">
              <span className="block overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="block"
                >
                  RAJ
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="block text-outline-black"
                >
                  SHAH
                </motion.span>
              </span>
            </h1>

            {/* Subtitle + CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-end justify-between"
            >
              <div className="max-w-xl">
                <h2 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black mb-4 sm:mb-5">
                  <DecryptText text="Digital Architect & Engineer" />
                </h2>
                <p className="font-sans text-base sm:text-lg font-medium leading-relaxed text-black/65 max-w-lg">
                  Fusing{' '}
                  <span className="text-black font-bold underline decoration-orange-600 underline-offset-4">Algorithmic Complexity</span>
                  {' '}with{' '}
                  <span className="text-black font-bold underline decoration-orange-600 underline-offset-4">Structural Minimalism</span>.
                  {' '}I architect high-performance digital ecosystems where form follows function.
                </p>
              </div>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full lg:w-auto shrink-0">
                <Button
                  href={`mailto:${PORTFOLIO_DATA.profile.socials.email}`}
                  icon={Mail}
                  variant="primary"
                >
                  Initialize Contact
                </Button>
                <Button
                  href="#work"
                  icon={Terminal}
                  variant="outline"
                >
                  View Database
                </Button>
              </div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 0.25, transition: { delay: 1 } }
              }}
              className="flex items-center gap-2.5 pt-1 select-none"
            >
              <ArrowDown size={13} className="animate-bounce" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── STATS ────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-20 md:mb-28 lg:mb-32 border-y border-black">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-black">
            {PORTFOLIO_DATA.stats.map((stat, i) => (
              <div key={i} className="p-6 sm:p-8 md:p-10 lg:p-12 group hover:bg-black transition-colors duration-300 cursor-default">
                <span className="block label-mono text-black/40 group-hover:text-white/40 mb-1.5 sm:mb-2 transition-colors text-[9px] sm:text-[10px] md:text-xs">
                  {stat.label}
                </span>
                <span className="block font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-black group-hover:text-white transition-colors">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SERVICES ─────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          id="services"
          className="container mx-auto px-4 sm:px-6 md:px-12 mb-16 sm:mb-20 md:mb-28 lg:mb-32 scroll-mt-20 sm:scroll-mt-24 md:scroll-mt-32"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12 md:mb-16"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full shrink-0" />
                <span className="label-mono text-black/40 text-[9px] sm:text-[10px] md:text-xs">Service_Modules</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black mb-4 sm:mb-6">
                Technical Services
              </h2>
              <p className="font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed text-black/65 max-w-lg">
                Specialized engineering modules designed to accelerate digital transformation and product velocity.
              </p>
            </div>
            <div className="hidden lg:block shrink-0">
              <Cpu size={44} className="text-black/12" />
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {PORTFOLIO_DATA.services.map((service) => (
              <ServiceCard key={service.id} service={service} onDetailsClick={setSelectedService} />
            ))}
          </div>

          {selectedService && (
            <ServiceModal
              service={selectedService}
              isOpen={!!selectedService}
              onClose={closeServiceModal}
            />
          )}
        </motion.section>

        {/* ─── PROJECTS ─────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          id="work"
          className="mb-16 sm:mb-20 md:mb-28 lg:mb-32 scroll-mt-20 sm:scroll-mt-24 md:scroll-mt-32"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="container mx-auto px-4 sm:px-6 md:px-12 mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full shrink-0" />
                <span className="label-mono text-black/40 text-[9px] sm:text-[10px] md:text-xs">Project_Index_2026</span>
              </div>
              <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black">
                <DecryptText text="Selected Works" />
              </h3>
            </div>
            <div className="hidden sm:block text-right label-mono text-black/35 text-[9px] sm:text-[10px] md:text-xs shrink-0">
              <span className="block">Sort: Chronological</span>
              <span className="text-orange-600">● All Systems Go</span>
            </div>
          </motion.div>

          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {PORTFOLIO_DATA.projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── EXPERIENCE ───────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          id="experience"
          className="container mx-auto px-4 sm:px-6 md:px-12 mb-16 sm:mb-20 md:mb-28 lg:mb-32 scroll-mt-20 sm:scroll-mt-24 md:scroll-mt-32"
        >
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="md:col-span-4"
            >
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full shrink-0" />
                <span className="label-mono text-black/40 text-[9px] sm:text-[10px] md:text-xs">Career_Log</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-4 md:sticky md:top-32">
                Career<br />Trajectory
              </h2>
              <p className="font-sans text-sm sm:text-base font-medium leading-relaxed text-black/55 max-w-sm">
                A timeline of increasing responsibility and technical complexity.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="md:col-span-8 border-l border-black/20 pl-0 md:pl-8"
            >
              {PORTFOLIO_DATA.experience.map((item, index) => (
                <ExperienceItem
                  key={index}
                  item={item}
                  last={index === PORTFOLIO_DATA.experience.length - 1}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ─── PHILOSOPHY ───────────────────────────────────────── */}
        <section className="bg-black text-white py-16 sm:py-20 md:py-24 mb-16 sm:mb-20 md:mb-28 lg:mb-32 relative overflow-hidden">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
            aria-hidden="true"
          />
          <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-orange-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" aria-hidden="true" />

          <div className="container mx-auto px-4 sm:px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
            <div>
              <span className="label-mono text-orange-500 mb-3 sm:mb-4 block text-[10px] sm:text-xs">Core Philosophy</span>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 sm:mb-8 text-white">
                Code as<br />Craftsmanship.
              </h2>
              <p className="font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed text-white/65 mb-6 sm:mb-8">
                I believe that software should be as beautiful internally as it is externally.
                Every function, every component, and every API endpoint is crafted with the same
                attention to detail as the visual interface.
                <br /><br />
                In an era of AI-generated code, human intent and architectural precision are the true differentiators.
              </p>
              <div className="grid grid-cols-2 gap-6 sm:gap-8 border-t border-white/10 pt-6 sm:pt-8">
                <div>
                  <span className="block font-sans text-3xl sm:text-4xl font-black text-orange-500 mb-1.5 sm:mb-2">0.1s</span>
                  <span className="label-mono text-white/35 text-[9px] sm:text-[10px] md:text-xs">Avg. Load Time</span>
                </div>
                <div>
                  <span className="block font-sans text-3xl sm:text-4xl font-black text-orange-500 mb-1.5 sm:mb-2">100%</span>
                  <span className="label-mono text-white/35 text-[9px] sm:text-[10px] md:text-xs">Craft Precision</span>
                </div>
              </div>
            </div>

            <div className="h-56 sm:h-72 md:h-full md:min-h-[380px] lg:min-h-[420px] relative overflow-hidden flex items-center justify-center border border-white/10 bg-white/5 group">
              <img
                src={architectureDiagram}
                alt="System Architecture Diagram"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 label-mono text-white/25 text-[9px] sm:text-[10px]">ARCH_DIAGRAM_v2.0</div>
            </div>
          </div>
        </section>

        {/* ─── SKILLS TICKER ────────────────────────────────────── */}
        <div className="w-full overflow-hidden border-y border-black py-7 sm:py-9 md:py-10 mb-16 sm:mb-20 md:mb-28 lg:mb-32 relative">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {PORTFOLIO_DATA.skills.flatMap(s => s.items).map((skill, idx) => (
                  <div key={`${i}-${idx}`} className="flex items-center gap-3 sm:gap-4 mx-6 sm:mx-8 group cursor-default">
                    <CheckCircle2 size={12} className="text-orange-600/50 group-hover:text-orange-600 transition-colors shrink-0 sm:w-3.5 sm:h-3.5" />
                    <span className="font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-black/55 group-hover:text-black transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ─── FOOTER ───────────────────────────────────────────── */}
        <footer className="bg-black text-white pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">

            {/* Big CTA */}
            <div className="mb-12 sm:mb-14 md:mb-16 pb-12 sm:pb-14 md:pb-16 border-b border-white/10">
              <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white mb-6 sm:mb-8">
                Let&apos;s Build<br />
                <span className="text-outline-white">Something.</span>
              </h2>
              <Button
                href={`mailto:${PORTFOLIO_DATA.profile.socials.email}`}
                icon={Mail}
                variant="outline"
                className="!text-white !border-white hover:!border-orange-600"
              >
                Start Conversation
              </Button>
            </div>

            {/* Three-column info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-14 md:mb-16">
              <div>
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center bg-orange-600 text-white font-black text-xs sm:text-sm tracking-tighter mb-3 sm:mb-4">
                  RS
                </div>
                <p className="font-mono text-xs sm:text-sm text-white/45 leading-relaxed max-w-xs">
                  Full Stack Architect building high-performance digital ecosystems.
                </p>
              </div>

              <div>
                <h3 className="label-mono text-white/25 mb-4 sm:mb-5 text-[9px] sm:text-[10px] md:text-xs">Contact</h3>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${PORTFOLIO_DATA.profile.socials.email}`}
                    className="font-mono text-xs sm:text-sm text-white/65 hover:text-orange-500 transition-colors break-all"
                  >
                    {PORTFOLIO_DATA.profile.socials.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded hover:bg-white/10 text-white/35 hover:text-orange-500 transition-colors shrink-0"
                    title="Copy Email"
                    aria-label={emailCopied ? 'Email copied' : 'Copy email address'}
                  >
                    {emailCopied ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="label-mono text-white/25 mb-4 sm:mb-5 text-[9px] sm:text-[10px] md:text-xs">Connect</h3>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {[
                    { label: 'GitHub', href: PORTFOLIO_DATA.profile.socials.github },
                    { label: 'LinkedIn', href: PORTFOLIO_DATA.profile.socials.linkedin },
                    { label: 'Twitter', href: PORTFOLIO_DATA.profile.socials.twitter },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs sm:text-sm text-white/65 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-3 sm:w-4 h-[1px] bg-white/15 group-hover:bg-orange-500 transition-colors shrink-0" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="label-mono text-white/25 text-[9px] sm:text-[10px] md:text-xs text-center sm:text-left">
                © 2026 Raj Shah. All rights reserved.
              </p>
              <p className="label-mono text-white/25 text-[9px] sm:text-[10px] md:text-xs text-center sm:text-right">
                Designed &amp; Engineered with Precision
              </p>
            </div>
          </div>
        </footer>
      </main>

      <style>{`
        .text-outline-black {
          -webkit-text-stroke: 2px #000;
          -webkit-text-fill-color: transparent;
        }
        .text-outline-white {
          -webkit-text-stroke: 2px rgba(255,255,255,0.25);
          -webkit-text-fill-color: transparent;
        }
        .blueprint-mode .text-outline-black {
          -webkit-text-stroke: 2px #FF6B00;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        /* Prevent horizontal overflow on very small screens */
        @media (max-width: 360px) {
          .text-outline-black { -webkit-text-stroke: 1.5px #000; }
        }
      `}</style>
      <Analytics />
    </div>
  );
}
