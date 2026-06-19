import React from 'react';
import { Mail, Terminal, Cpu, CheckCircle2, Copy, Check, ArrowDown } from 'lucide-react';
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingScreen onComplete={completeLoading} />;
  }

  return (
    <div className={`group/body min-h-screen bg-white text-black font-sans overflow-x-hidden relative ${blueprintMode ? 'blueprint-mode' : ''}`}>
      <Cursor />
      <ParallaxGrid />

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[900px] h-[700px] bg-orange-500/8 rounded-full blur-[140px] pointer-events-none translate-x-1/3 -translate-y-1/4 z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 z-0"
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
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 md:px-12 pt-32 md:pt-44 pb-24 md:pb-32">
          <div className="space-y-10">
            {/* Status badge */}
            <div className="flex items-center gap-3 animate-fadeIn">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600"></span>
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-black/50">
                {PORTFOLIO_DATA.profile.availability} — {PORTFOLIO_DATA.profile.location}
              </span>
            </div>

            <h1 className="font-sans text-[clamp(4rem,14vw,11rem)] font-black uppercase tracking-tighter leading-[0.82] text-black">
              <span className="block overflow-hidden">
                <span className="block animate-slideUp">RAJ</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block animate-slideUp [animation-delay:150ms] text-outline-black">SHAH</span>
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between">
              <div className="max-w-xl">
                <h2 className="heading-2 mb-5">
                  <DecryptText text="Digital Architect & Engineer" />
                </h2>
                <p className="max-w-xl body-large text-black/70">
                  Fusing <span className="text-black font-bold underline decoration-orange-600 underline-offset-4">Algorithmic Complexity</span> with <span className="text-black font-bold underline decoration-orange-600 underline-offset-4">Structural Minimalism</span>. I architect high-performance digital ecosystems where form follows function—delivering software that is fault-tolerant, scalable, and aesthetically absolute.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.socials.email}`}
                  className="group relative flex items-center justify-center gap-3 overflow-hidden px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest border border-black bg-black text-white hover:border-orange-600 transition-all duration-300 cursor-pointer"
                >
                  <span className="z-10 flex items-center gap-2 relative">
                    <Mail size={14} className="transition-transform duration-300 group-hover:rotate-12" />
                    Initialize Contact
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-orange-600 transition-transform duration-300 ease-out group-hover:translate-x-0" />
                </a>
                <a
                  href="#work"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group relative flex items-center justify-center gap-3 overflow-hidden px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest border border-black bg-white text-black hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <span className="z-10 flex items-center gap-2 relative">
                    <Terminal size={14} className="transition-transform duration-300 group-hover:rotate-12" />
                    View Database
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-black transition-transform duration-300 ease-out group-hover:translate-x-0" />
                </a>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="flex items-center gap-3 pt-2 opacity-30">
              <ArrowDown size={14} className="animate-bounce" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Scroll to explore</span>
            </div>
          </div>
        </section>

        {/* METRICS & STATS */}
        <section className="mb-32 border-y border-black">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-black">
            {PORTFOLIO_DATA.stats.map((stat, i) => (
              <div key={i} className="p-8 md:p-12 group hover:bg-black transition-colors duration-300 cursor-default">
                <span className="block label-mono text-black/50 group-hover:text-white/50 mb-2 transition-colors">{stat.label}</span>
                <span className="block font-sans text-3xl md:text-5xl font-black tracking-tighter text-black group-hover:text-white transition-colors">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES MODULE */}
        <section id="services" className="container mx-auto px-6 md:px-12 mb-32 scroll-mt-32">
          <div className="flex items-end justify-between mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                <span className="label-mono text-black/50">Service_Modules</span>
              </div>
              <h2 className="heading-1 mb-6">Technical Services</h2>
              <p className="body-large text-black/70">
                Specialized engineering modules designed to accelerate digital transformation and product velocity.
              </p>
            </div>
            <div className="hidden md:block">
              <Cpu size={48} className="text-black/15" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
        </section>

        {/* SELECTED WORKS */}
        <section id="work" className="mb-32 scroll-mt-32">
          <div className="container mx-auto px-6 md:px-12 mb-12 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                <h2 className="label-mono text-black/50">Project_Index_2026</h2>
              </div>
              <h3 className="heading-1">
                <DecryptText text="Selected Works" />
              </h3>
            </div>
            <div className="hidden md:block text-right label-mono text-black/40">
              <span>Sort: Chronological</span><br />
              <span className="text-orange-600">● All Systems Go</span>
            </div>
          </div>

          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-6">
              {PORTFOLIO_DATA.projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="container mx-auto px-6 md:px-12 mb-32 scroll-mt-32">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                <span className="label-mono text-black/50">Career_Log</span>
              </div>
              <h2 className="heading-1 mb-6 sticky top-32">
                Career<br />Trajectory
              </h2>
              <p className="body-base text-black/60 mb-8">
                A timeline of increasing responsibility and technical complexity.
              </p>
            </div>
            <div className="md:col-span-8 border-l border-black pl-0 md:pl-8">
              {PORTFOLIO_DATA.experience.map((item, index) => (
                <ExperienceItem
                  key={index}
                  item={item}
                  last={index === PORTFOLIO_DATA.experience.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY / ABOUT */}
        <section className="bg-black text-white py-24 mb-32 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
            aria-hidden="true"
          ></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <span className="label-mono text-orange-500 mb-4 block">Core Philosophy</span>
              <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-white">
                Code as<br />Craftsmanship.
              </h2>
              <p className="font-sans text-lg font-medium leading-relaxed text-white/70 mb-8">
                I believe that software should be as beautiful internally as it is externally.
                Every function, every component, and every API endpoint is crafted with the same attention to detail as the visual interface.
                <br /><br />
                In an era of AI-generated code, human intent and architectural precision are the true differentiators.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <span className="block font-sans text-4xl font-black text-orange-500 mb-2">0.1s</span>
                  <span className="label-mono text-white/40">Avg. Load Time</span>
                </div>
                <div>
                  <span className="block font-sans text-4xl font-black text-orange-500 mb-2">100%</span>
                  <span className="label-mono text-white/40">Craft Precision</span>
                </div>
              </div>
            </div>
            <div className="h-full min-h-[400px] relative overflow-hidden flex items-center justify-center border border-white/10 bg-white/5 group">
              <img
                src={architectureDiagram}
                alt="System Architecture Diagram"
                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 label-mono text-white/30 text-[10px]">ARCH_DIAGRAM_v2.0</div>
            </div>
          </div>
        </section>

        {/* SKILLS TICKER */}
        <div className="w-full overflow-hidden border-y border-black py-10 mb-32 relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {PORTFOLIO_DATA.skills.flatMap(s => s.items).map((skill, idx) => (
                  <div key={`${i}-${idx}`} className="flex items-center gap-4 mx-8 group cursor-default">
                    <CheckCircle2 size={14} className="text-orange-600/50 group-hover:text-orange-600 transition-colors shrink-0" />
                    <span className="font-mono text-sm md:text-base font-bold uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER / CONTACT */}
        <footer className="bg-black text-white py-24 border-t border-white/10">
          <div className="container mx-auto px-6 md:px-12">
            {/* Big CTA */}
            <div className="mb-16 pb-16 border-b border-white/10">
              <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white mb-8">
                Let&apos;s Build<br />
                <span className="text-outline-white">Something.</span>
              </h2>
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.socials.email}`}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest border border-white bg-transparent text-white hover:border-orange-600 transition-all duration-300 cursor-pointer"
              >
                <span className="z-10 flex items-center gap-2 relative">
                  <Mail size={14} className="transition-transform duration-300 group-hover:rotate-12" />
                  Start Conversation
                </span>
                <div className="absolute inset-0 -translate-x-full bg-orange-600 transition-transform duration-300 ease-out group-hover:translate-x-0" />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div>
                <div className="flex h-10 w-10 items-center justify-center bg-orange-600 text-white font-black text-sm tracking-tighter mb-4">
                  RS
                </div>
                <p className="font-mono text-sm text-white/50 leading-relaxed max-w-xs">
                  Full Stack Architect building high-performance digital ecosystems.
                </p>
              </div>

              <div>
                <h3 className="label-mono text-white/30 mb-5">Contact</h3>
                <div className="flex items-center gap-2 mb-2">
                  <a
                    href={`mailto:${PORTFOLIO_DATA.profile.socials.email}`}
                    className="font-mono text-sm text-white/70 hover:text-orange-500 transition-colors"
                  >
                    {PORTFOLIO_DATA.profile.socials.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-orange-500 transition-colors"
                    title="Copy Email"
                    aria-label={emailCopied ? "Email copied" : "Copy email address"}
                  >
                    {emailCopied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="label-mono text-white/30 mb-5">Connect</h3>
                <div className="flex flex-col gap-3">
                  <a
                    href={PORTFOLIO_DATA.profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm text-white/70 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-[1px] bg-white/20 group-hover:bg-orange-500 transition-colors"></span>
                    GitHub
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm text-white/70 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-[1px] bg-white/20 group-hover:bg-orange-500 transition-colors"></span>
                    LinkedIn
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm text-white/70 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-[1px] bg-white/20 group-hover:bg-orange-500 transition-colors"></span>
                    Twitter
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="label-mono text-white/30">
                © 2026 Raj Shah. All rights reserved.
              </p>
              <p className="label-mono text-white/30">
                Designed &amp; Engineered with Precision
              </p>
            </div>
          </div>
        </footer>
      </main>

      <style>{`
        .text-outline-black {
          -webkit-text-stroke: 3px #000000;
          -webkit-text-fill-color: transparent;
        }

        .text-outline-white {
          -webkit-text-stroke: 2px rgba(255,255,255,0.3);
          -webkit-text-fill-color: transparent;
        }

        .blueprint-mode .text-outline-black {
          -webkit-text-stroke: 3px #FF6B00;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 50s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <Analytics />
    </div>
  );
}
