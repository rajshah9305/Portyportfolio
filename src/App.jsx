import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  Cpu, 
  Layers, 
  Code,
  MoveRight,
  Database,
  Search,
  CheckCircle2,
  Copy,
  ArrowUp,
  LayoutTemplate,
  Server,
  Zap,
  Menu,
  X,
  Eye,
  Lock,
  Network,
  Shield,
  Cloud,
  BarChart3,
  Smartphone
} from 'lucide-react';

/* --- SYSTEM ARCHITECTURE: "SWISS-CYBERNETIC V10.2 (EXPANDED DATABASE)" ---
   Core Principles:
   1. "System Consistency": All major content modules (Services, Projects) use identical card physics and layout.
   2. "Typographic Excellence": Strict adherence to weight, tracking, and leading scales.
   3. "Optical Balance": High-contrast text (Zinc-950/600).
*/

// --- DATA LAYER ---
const PORTFOLIO_DATA = {
  profile: {
    name: "RAJ SHAH",
    title: "FULL STACK ARCHITECT",
    tagline: "SYSTEMS_OVER_TEMPLATES",
    location: "GUJARAT, IN",
    availability: "AVAILABLE FOR WORK",
    socials: {
      github: "https://github.com/rajshah9305",
      linkedin: "https://linkedin.com/in/rajshah9305",
      twitter: "https://twitter.com/rajshah9305",
      email: "rajshah9305@gmail.com"
    }
  },
  stats: [
    { label: "EXPERIENCE", value: "04Y+" },
    { label: "PROJECTS", value: "30+" },
    { label: "STACK", value: "MERN/PY" },
    { label: "COMMIT_RATE", value: "DAILY" }
  ],
  services: [
    {
      id: "01",
      title: "System Architecture",
      desc: "Designing scalable, fault-tolerant backend infrastructures using microservices or monoliths depending on scale.",
      icon: Server
    },
    {
      id: "02",
      title: "MVP Engineering",
      desc: "Rapid prototyping and development of Minimum Viable Products for startups, focusing on speed-to-market and code quality.",
      icon: Zap
    },
    {
      id: "03",
      title: "UI/UX Engineering",
      desc: "Translating complex Figma designs into pixel-perfect, responsive, and accessible frontend code.",
      icon: LayoutTemplate
    }
  ],
  experience: [
    {
      period: "2024 - PRESENT",
      role: "Senior Full Stack Engineer",
      company: "FREELANCE / CONTRACT",
      desc: "Architecting enterprise-grade solutions for international clients. Specializing in AI-agent integration and high-performance web apps."
    },
    {
      period: "2022 - 2024",
      role: "Lead Developer",
      company: "TECH INNOVATIONS INC.",
      desc: "Led a team of 5 engineers. Migrated legacy monolithic architecture to AWS microservices, reducing latency by 40%."
    },
    {
      period: "2020 - 2022",
      role: "Frontend Specialist",
      company: "CREATIVE STUDIO",
      desc: "Developed award-winning immersive websites using WebGL and Three.js. Focus on animation performance and mobile optimization."
    }
  ],
  skills: [
    { category: "ENGINEERING", items: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"] },
    { category: "INTERFACE", items: ["Tailwind", "WebGL", "Framer Motion", "GSAP"] },
    { category: "INTELLIGENCE", items: ["LangChain", "Python", "OpenAI", "TensorFlow"] },
    { category: "INFRASTRUCTURE", items: ["Docker", "AWS", "Vercel", "Supabase"] }
  ],
  projects: [
    {
      id: "01",
      title: "AGENT_GPT",
      category: "ARTIFICIAL INTELLIGENCE",
      tech: ["Next.js 14", "TypeScript", "Cerebras"],
      description: "Autonomous recursive agent orchestrator. Capable of self-prompting, task decomposition, and multi-agent coordination.",
      link: "https://github.com/rajshah9305",
      stat: "99.9% ACCURACY",
      icon: Cpu,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "02",
      title: "AURA_WEAVE",
      category: "IMMERSIVE WEB",
      tech: ["WebGL", "Three.js", "GSAP"],
      description: "Non-linear digital experience for creative agencies. Features complex shader transitions, scroll-linked physics, and a custom rendering pipeline.",
      link: "https://rajshah9305.github.io/PortfolioRAJ/",
      stat: "60FPS LOCKED",
      icon: Layers,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "03",
      title: "ELITE_SCRAPER",
      category: "DATA WARFARE",
      tech: ["Python", "Selenium", "Proxies"],
      description: "Enterprise-grade extraction engine. Bypasses modern fingerprinting and anti-bot measures. Features rotating proxy pools and headless browser clustering.",
      link: "https://github.com/rajshah9305",
      stat: "10K+ RPS",
      icon: Search,
      image: "https://images.unsplash.com/photo-1558494949-efdeb6bf80d1?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "04",
      title: "PROMPT_CRAFT",
      category: "SAAS INFRASTRUCTURE",
      tech: ["React", "Redux", "Supabase"],
      description: "Version control system for LLM prompts. Allows engineering teams to test, iterate, and deploy prompts like code. Includes A/B testing suite.",
      link: "https://github.com/rajshah9305",
      stat: "V 2.1.0",
      icon: Database,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "05",
      title: "ECHO_PROTOCOL",
      category: "REAL-TIME SYSTEMS",
      tech: ["Socket.io", "Redis", "Node.js"],
      description: "End-to-end encrypted messaging infrastructure designed for zero-latency communication. Features ephemeral message storage.",
      link: "https://github.com/rajshah9305",
      stat: "< 50ms LATENCY",
      icon: Terminal,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "06",
      title: "NEURAL_VISION",
      category: "MACHINE LEARNING",
      tech: ["PyTorch", "OpenCV", "FastAPI"],
      description: "High-performance object detection pipeline optimized for edge deployment. Processes video streams in real-time with custom trained YOLOv8 models.",
      link: "https://github.com/rajshah9305",
      stat: "95% MAP",
      icon: Eye,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "07",
      title: "QUANTUM_GRID",
      category: "DISTRIBUTED COMPUTING",
      tech: ["Rust", "WASM", "libp2p"],
      description: "Decentralized compute sharing protocol allowing browsers to contribute idle processing power to scientific simulations.",
      link: "https://github.com/rajshah9305",
      stat: "1M+ OPS/SEC",
      icon: Network,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "08",
      title: "CIPHER_VAULT",
      category: "CRYPTOGRAPHY",
      tech: ["Go", "gRPC", "AES-256"],
      description: "Zero-knowledge proof storage solution for enterprise secrets. Ensures mathematical privacy without trusting the storage provider.",
      link: "https://github.com/rajshah9305",
      stat: "MIL-SPEC SEC",
      icon: Lock,
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "09",
      title: "VELOCITY_TRADE",
      category: "FINTECH ENGINE",
      tech: ["C++", "Python", "FPGA"],
      description: "High-frequency trading execution engine designed for microsecond latency arbitrage. Optimized for kernel bypass networking.",
      link: "https://github.com/rajshah9305",
      stat: "10μs LATENCY",
      icon: BarChart3,
      image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "10",
      title: "AERO_STREAM",
      category: "MEDIA INFRASTRUCTURE",
      tech: ["Elixir", "Phoenix", "WebRTC"],
      description: "Adaptive bitrate video streaming server capable of handling millions of concurrent connections with minimal resource footprint.",
      link: "https://github.com/rajshah9305",
      stat: "4K HDR LIVE",
      icon: Cloud,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "11",
      title: "NANO_FACTORY",
      category: "IOT ORCHESTRATION",
      tech: ["Node.js", "MQTT", "Docker"],
      description: "Lightweight container orchestration system specifically built for low-power edge devices and industrial IoT sensors.",
      link: "https://github.com/rajshah9305",
      stat: "5MB FOOTPRINT",
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000"
    },
    {
      id: "12",
      title: "SENTINEL_CORE",
      category: "CYBERSECURITY",
      tech: ["Python", "TensorFlow", "eBPF"],
      description: "Kernel-level intrusion detection system using anomaly detection to identify zero-day exploits in real-time.",
      link: "https://github.com/rajshah9305",
      stat: "99.8% DETECTION",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2000"
    }
  ]
};

// --- UTILITIES ---

const useDecrypt = (text, trigger = true) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
  const hasRun = useRef(false);
  
  useEffect(() => {
    if (!trigger || hasRun.current) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return letter;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
        hasRun.current = true;
      }
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text, trigger]);
  return display;
};

// --- VISUAL COMPONENTS ---

const Scanline = () => (
  <div className="pointer-events-none fixed inset-0 z-[60] h-full w-full overflow-hidden opacity-[0.04] mix-blend-multiply">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
  </div>
);

// Parallax Grid Component
const ParallaxGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const moveX = (mousePos.x / window.innerWidth) * 20;
  const moveY = (mousePos.y / window.innerHeight) * 20;

  return (
    <div className="fixed inset-0 z-0 h-full w-full pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-[-50px] transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translate(${-moveX}px, ${-moveY}px)` }}
      >
        <div 
          className="absolute inset-0 opacity-[0.3]"
          style={{ 
            backgroundImage: 'linear-gradient(#e4e4e7 1px, transparent 1px), linear-gradient(90deg, #e4e4e7 1px, transparent 1px)', 
            backgroundSize: '80px 80px' 
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: 'linear-gradient(#e4e4e7 1px, transparent 1px), linear-gradient(90deg, #e4e4e7 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }}
        />
      </div>
    </div>
  );
};

const DecryptText = ({ text, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const decrypted = useDecrypt(text, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} className={className}>{decrypted}</span>;
};

// Refined Button Component - Typography Optimized
const Button = ({ children, onClick, variant = 'primary', icon: Icon, href }) => {
  const baseClasses = "group relative flex items-center justify-center gap-3 overflow-hidden px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 border shadow-sm hover:shadow-md cursor-pointer z-20";
  const variants = {
    primary: "border-zinc-900 bg-zinc-900 text-white hover:bg-orange-600 hover:border-orange-600",
    outline: "border-zinc-300 bg-white text-zinc-900 hover:border-orange-600 hover:text-orange-600"
  };

  const content = (
    <>
      <span className="z-10 flex items-center gap-2">
        {Icon && <Icon size={14} className="transition-transform duration-300 group-hover:rotate-12" />}
        {children}
      </span>
      <div className="absolute inset-0 -translate-x-full bg-orange-600 transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    const isAnchor = href.startsWith('#');
    
    const handleClick = (e) => {
      if (isAnchor) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    
    return (
      <a 
        href={href} 
        onClick={handleClick}
        target={isExternal && !href.startsWith('mailto:') ? "_blank" : undefined} 
        rel={isExternal && !href.startsWith('mailto:') ? "noopener noreferrer" : undefined} 
        className={`${baseClasses} ${variants[variant]}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {content}
    </button>
  );
};

// Service Card - Typography Optimized
const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  return (
    <div className="group border border-zinc-200 bg-white p-8 transition-all duration-300 hover:border-orange-600 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 text-zinc-900 group-hover:bg-orange-600 group-hover:text-white transition-colors">
          <Icon size={24} />
        </div>
        <h3 className="mb-3 font-sans text-xl font-bold uppercase tracking-tight text-zinc-900">{service.title}</h3>
        <p className="font-sans text-sm font-medium leading-relaxed text-zinc-600 flex-grow">{service.desc}</p>
        <div className="mt-6 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-orange-600">
          <span>Details</span> <MoveRight size={12} />
        </div>
      </div>
    </div>
  );
};

// Experience Item - Typography Optimized
const ExperienceItem = ({ item, last }) => (
  <div className="relative pl-8 md:pl-12 py-2 group">
    {!last && <div className="absolute left-[11px] md:left-[15px] top-4 h-full w-[1px] bg-zinc-200 group-hover:bg-zinc-300 transition-colors"></div>}
    
    <div className="absolute left-0 top-2 h-6 w-6 md:h-8 md:w-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-orange-600">
      <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-orange-600"></div>
    </div>

    <div className="mb-10">
      <span className="inline-block mb-2 font-mono text-[10px] font-bold tracking-widest text-orange-600 uppercase bg-orange-50 px-2 py-1 rounded-sm">
        {item.period}
      </span>
      <h4 className="font-sans text-2xl font-black uppercase tracking-tight text-zinc-900 mt-1">{item.role}</h4>
      <div className="font-mono text-xs font-bold tracking-wider text-zinc-500 mb-4 uppercase">{item.company}</div>
      <p className="font-sans text-base font-medium text-zinc-600 leading-relaxed max-w-2xl">
        {item.desc}
      </p>
    </div>
  </div>
);

// Project Card - UNIFIED DESIGN STYLE (Matching ServiceCard)
const ProjectCard = ({ project, index }) => {
  const Icon = project.icon;

  return (
    <div 
      className="group border border-zinc-200 bg-white p-8 transition-all duration-300 hover:border-orange-600 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden h-full flex flex-col"
    >
      {/* Background Image - Subtle Reveal matching the Service Card's gradient logic */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-10"
        style={{
           backgroundImage: `url(${project.image})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           filter: 'grayscale(100%)'
        }}
      />
      
      {/* Gradient Overlay for Consistency */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Icon & Number */}
        <div className="flex justify-between items-start mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 text-zinc-900 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <Icon size={24} />
          </div>
          <span className="font-mono text-xs font-bold text-zinc-300 group-hover:text-orange-600 transition-colors">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
        </div>

        {/* Content */}
        <h3 className="mb-3 font-sans text-xl font-bold uppercase tracking-tight text-zinc-900">{project.title}</h3>
        <p className="font-sans text-sm font-medium leading-relaxed text-zinc-600 mb-6 flex-grow">
          {project.description}
        </p>

        {/* Footer: Tech & Link */}
        <div className="flex flex-col gap-4 mt-auto">
           <div className="flex flex-wrap gap-2">
             {project.tech.slice(0, 3).map((t, i) => (
               <span key={i} className="px-2 py-1 bg-zinc-50 border border-zinc-100 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                 {t}
               </span>
             ))}
           </div>
           
           <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{project.stat}</span>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-900 hover:text-orange-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                View Repo <MoveRight size={12} />
              </a>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ---

const ScrollProgress = () => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrolled((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-0 top-0 z-50 h-full w-1.5 hidden md:block bg-zinc-200/30 backdrop-blur-sm">
      <div className="w-full bg-orange-600 transition-all duration-150 ease-out" style={{ height: `${scrolled}%` }} />
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [bootLog, setBootLog] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "RAJ SHAH // ARCHITECT";
    const logs = ["IDENTITY_VERIFIED...", "INITIALIZING_RS_CORE...", "LOADING_ASSETS...", "SYSTEM_READY"];
    let delay = 0;
    logs.forEach((log) => {
      delay += 300;
      setTimeout(() => setBootLog(prev => [...prev, log]), delay);
    });
    const finishTimer = setTimeout(() => setLoading(false), delay + 500);
    return () => clearTimeout(finishTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'work', 'experience'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 font-mono text-xs text-zinc-900">
        <div className="w-64 space-y-4">
          <div className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="font-bold">BOOT_LOADER</span>
            <span className="text-orange-600 animate-pulse">RS.SYS</span>
          </div>
          <div className="h-32 font-mono font-medium text-zinc-500 space-y-1">
            {bootLog.map((log, i) => (
              <div key={i}>&gt; {log}</div>
            ))}
          </div>
          <div className="h-1 w-full bg-zinc-200">
             <div className="h-full bg-orange-600 transition-all duration-300 ease-out" style={{ width: `${(bootLog.length / 5) * 100}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-orange-600 selection:text-white font-sans overflow-x-hidden relative"
    >
      <Scanline />
      <ParallaxGrid />
      <ScrollProgress />

      {/* Floating Command Bar (Bottom Right) */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-2">
         <button 
           onClick={handleCopyEmail}
           className="h-10 w-10 bg-zinc-900 text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors relative group rounded-sm"
           title="Copy Email"
           aria-label={copied ? "Email copied" : "Copy email address"}
         >
           {copied ? <CheckCircle2 size={18} /> : <Mail size={18} />}
           <span className="absolute right-full mr-2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono pointer-events-none">
             {copied ? "COPIED" : "COPY EMAIL"}
           </span>
         </button>
         <button 
           onClick={scrollToTop}
           className="h-10 w-10 bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center shadow-lg hover:border-orange-600 hover:text-orange-600 transition-colors rounded-sm"
           title="Back to Top"
           aria-label="Back to top"
         >
           <ArrowUp size={18} />
         </button>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-md">
        <div className="flex h-16 md:h-20 items-center justify-between px-6 md:px-12 max-w-[1920px] mx-auto">
          {/* Logo */}
          <button 
            className="flex items-center gap-4 group cursor-pointer" 
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <div className="flex h-8 w-8 items-center justify-center bg-orange-600 text-white font-black text-sm tracking-tighter shadow-md hover:scale-105 transition-transform">RS</div>
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-sm text-zinc-900">{PORTFOLIO_DATA.profile.name}</span>
            </div>
          </button>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center p-1.5 bg-zinc-100/80 backdrop-blur-md border border-zinc-200/50 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
             {[
               { name: 'SERVICES', href: '#services', id: 'services' },
               { name: 'WORK', href: '#work', id: 'work' },
               { name: 'EXPERIENCE', href: '#experience', id: 'experience' }
             ].map((item) => {
               const isActive = activeSection === item.id;
               return (
                 <a 
                   key={item.name}
                   href={item.href}
                   onClick={(e) => {
                     e.preventDefault();
                     const element = document.querySelector(item.href);
                     if (element) {
                       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     }
                   }}
                   className={`relative px-6 py-2.5 rounded-full font-mono text-[11px] font-bold tracking-widest transition-all duration-300 flex items-center gap-2 group ${isActive ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 hover:bg-white/50'}`}
                 >
                   <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-orange-600 scale-125' : 'bg-zinc-300 group-hover:bg-orange-400'}`} />
                   {item.name}
                 </a>
               );
             })}
          </div>

          {/* Socials & Status */}
          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col items-end text-[10px] font-mono font-medium leading-tight text-zinc-400">
                <span>STATUS: <span className="text-orange-600 font-bold">ONLINE</span></span>
                <span>UTC {currentTime}</span>
             </div>
             <div className="h-8 w-[1px] bg-zinc-200 hidden md:block"></div>
             <a href={PORTFOLIO_DATA.profile.socials.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block"><Github size={20} /></a>
             <a href={PORTFOLIO_DATA.profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-700 transition-colors hidden sm:block"><Linkedin size={20} /></a>
             
             {/* Mobile Menu Button */}
             <button 
               onClick={toggleMobileMenu} 
               className="lg:hidden p-2 text-zinc-900 hover:bg-zinc-100 rounded-md z-50"
               aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
               aria-expanded={isMobileMenuOpen}
             >
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </nav>

      {/* Refined Mobile Command Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-zinc-50/90 backdrop-blur-xl transition-transform duration-500 ease-cubic-bezier lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsMobileMenuOpen(false);
          }
        }}
      >
        <div className="flex flex-col h-full justify-between p-8 pt-32">
           <div className="flex flex-col gap-6">
             {[
               { name: 'SERVICES', href: '#services', num: '01' },
               { name: 'WORK', href: '#work', num: '02' },
               { name: 'EXPERIENCE', href: '#experience', num: '03' }
             ].map((item) => (
               <a 
                 key={item.name}
                 href={item.href}
                 onClick={(e) => {
                   e.preventDefault();
                   setIsMobileMenuOpen(false);
                   setTimeout(() => {
                     const element = document.querySelector(item.href);
                     if (element) {
                       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     }
                   }, 300);
                 }}
                 className="group flex items-baseline gap-4 font-sans text-6xl font-black text-zinc-900 hover:text-orange-600 transition-colors tracking-tighter"
               >
                 <span className="text-sm font-mono font-bold text-orange-600 group-hover:text-orange-400 -translate-y-4">{item.num}</span>
                 {item.name}
               </a>
             ))}
           </div>

           <div className="border-t border-zinc-200 pt-8">
              <span className="font-mono text-xs font-bold text-zinc-400 mb-6 block tracking-widest">CONNECT_MODULES</span>
              <div className="grid grid-cols-3 gap-4">
                 <a href={PORTFOLIO_DATA.profile.socials.github} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center aspect-square bg-white border border-zinc-200 rounded-lg hover:border-orange-600 hover:text-orange-600 transition-all">
                    <Github size={28} />
                    <span className="mt-2 font-mono text-[10px] font-bold">GIT</span>
                 </a>
                 <a href={PORTFOLIO_DATA.profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center aspect-square bg-white border border-zinc-200 rounded-lg hover:border-orange-600 hover:text-orange-600 transition-all">
                    <Linkedin size={28} />
                    <span className="mt-2 font-mono text-[10px] font-bold">LINK</span>
                 </a>
                 <a href={`mailto:${PORTFOLIO_DATA.profile.socials.email}`} className="flex flex-col items-center justify-center aspect-square bg-white border border-zinc-200 rounded-lg hover:border-orange-600 hover:text-orange-600 transition-all">
                    <Mail size={28} />
                    <span className="mt-2 font-mono text-[10px] font-bold">MAIL</span>
                 </a>
              </div>
           </div>
        </div>
      </div>

      <main className="relative pt-32 pb-24 max-w-[1920px] mx-auto">
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 md:px-12 mb-32 md:mb-48">
          <div className="relative pl-6 md:pl-12 border-l-2 border-orange-600">
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-orange-600 tracking-widest uppercase bg-orange-50 px-2 py-1">
                {PORTFOLIO_DATA.profile.availability}
              </span>
            </div>
            
            <h1 className="font-sans text-7xl md:text-9xl lg:text-[11rem] font-black uppercase leading-[0.85] tracking-tighter text-zinc-900 mb-8 break-all md:break-normal">
              <DecryptText text="RAJ" /><br />
              <span className="text-outline-zinc"><DecryptText text="SHAH" /></span>
            </h1>

            <div className="flex flex-col md:flex-row gap-16 md:items-end justify-between">
               <div>
                  <h2 className="font-sans text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-6">Digital Architect & Engineer</h2>
                  <p className="max-w-xl font-sans text-lg font-medium text-zinc-600 leading-relaxed">
                    Fusing <span className="text-zinc-900 font-bold underline decoration-orange-600 underline-offset-4">Algorithmic Complexity</span> with <span className="text-zinc-900 font-bold underline decoration-orange-600 underline-offset-4">Structural Minimalism</span>. I architect high-performance digital ecosystems where form follows function—delivering software that is fault-tolerant, scalable, and aesthetically absolute.
                  </p>
               </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button href={`mailto:${PORTFOLIO_DATA.profile.socials.email}`} icon={Mail}>Initialize Contact</Button>
                <Button variant="outline" href="#work" icon={Terminal}>View Database</Button>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS & STATS */}
        <section className="mb-32 bg-white border-y border-zinc-200">
           <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-200">
              {PORTFOLIO_DATA.stats.map((stat, i) => (
                <div key={i} className="p-8 md:p-12 hover:bg-zinc-50 transition-colors duration-300">
                  <span className="block font-mono text-[10px] font-bold text-zinc-400 mb-2 tracking-widest uppercase">{stat.label}</span>
                  <span className="block font-sans text-3xl md:text-5xl font-black tracking-tighter text-zinc-900">
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
                 <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 mb-6">Technical Services</h2>
                 <p className="font-sans font-medium text-zinc-600 text-lg">Specialized engineering modules designed to accelerate digital transformation and product velocity.</p>
              </div>
              <div className="hidden md:block">
                 <Cpu size={48} className="text-zinc-200" />
              </div>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {PORTFOLIO_DATA.services.map((service) => (
                 <ServiceCard key={service.id} service={service} />
              ))}
           </div>
        </section>

        {/* SELECTED WORKS */}
        <section id="work" className="mb-32 scroll-mt-32">
          <div className="container mx-auto px-6 md:px-12 mb-12 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                 <h2 className="text-xs font-mono font-bold text-zinc-500 tracking-widest uppercase">Project_Index_2024</h2>
              </div>
              <h3 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900">Selected Works</h3>
            </div>
            <div className="hidden md:block text-right font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <span>Sort: Chronological</span><br/>
              <span>Status: All Systems Go</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="container mx-auto px-6 md:px-12 mb-32 scroll-mt-32">
           <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                 <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 mb-6 sticky top-32">Career<br/>Trajectory</h2>
                 <p className="text-zinc-500 font-sans font-medium mb-8">A timeline of increasing responsibility and technical complexity.</p>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-0 md:pl-8">
                 {PORTFOLIO_DATA.experience.map((item, index) => (
                    <ExperienceItem key={index} item={item} last={index === PORTFOLIO_DATA.experience.length - 1} />
                 ))}
              </div>
           </div>
        </section>

        {/* PHILOSOPHY / ABOUT */}
        <section className="bg-zinc-900 text-zinc-50 py-24 mb-32 relative overflow-hidden">
           {/* Dark Grid Background for this section */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           
           <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                 <span className="font-mono text-orange-500 text-xs font-bold tracking-widest uppercase mb-4 block">Core Philosophy</span>
                 <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">Code as<br/>Craftsmanship.</h2>
                 <p className="font-sans font-medium text-zinc-400 text-lg leading-relaxed mb-8">
                    I believe that software should be as beautiful internally as it is externally. 
                    Every function, every component, and every API endpoint is crafted with the same attention to detail as the visual interface.
                    <br/><br/>
                    In an era of AI-generated code, human intent and architectural precision are the true differentiators.
                 </p>
                 <div className="grid grid-cols-2 gap-8 border-t border-zinc-800 pt-8">
                    <div>
                       <span className="block font-sans text-4xl font-black text-white mb-2">0.1s</span>
                       <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">Avg. Load Time</span>
                    </div>
                    <div>
                       <span className="block font-sans text-4xl font-black text-white mb-2">100%</span>
                       <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">Type Safety</span>
                    </div>
                 </div>
              </div>
              <div className="h-full min-h-[400px] bg-zinc-800/50 backdrop-blur-sm relative overflow-hidden flex items-center justify-center border border-zinc-700">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  <Code size={120} className="text-zinc-700" />
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-500">
                     // SYSTEM_ARCHITECTURE_DIAGRAM
                  </div>
              </div>
           </div>
        </section>

        {/* SKILLS TICKER */}
        <div className="w-full overflow-hidden border-y border-zinc-200 bg-white py-12 mb-32 relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10"></div>
          
          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {PORTFOLIO_DATA.skills.flatMap(s => s.items).map((skill, idx) => (
                   <div key={`${i}-${idx}`} className="flex items-center gap-4 mx-8 group cursor-default">
                     <CheckCircle2 size={16} className="text-zinc-300 group-hover:text-orange-600 transition-colors" />
                     <span className="font-mono text-sm md:text-lg font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 transition-colors">
                       {skill}
                     </span>
                   </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="container mx-auto px-6 md:px-12">
           <div className="bg-zinc-100 p-8 md:p-24 relative overflow-hidden border border-zinc-200">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
                <div className="max-w-2xl">
                  <span className="inline-block font-mono text-xs font-bold tracking-widest text-orange-600 mb-6 uppercase">
                    Transmission_End
                  </span>
                  <h2 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 mb-8 leading-[0.9]">
                    Ready to<br/>Deploy?
                  </h2>
                  <div className="flex flex-col gap-6">
                     <p className="font-sans text-lg font-medium text-zinc-600 max-w-md">
                        Open for select freelance contracts and technical consulting. Let's discuss your next milestone.
                     </p>
                     <button onClick={handleCopyEmail} className="group flex items-center gap-4 text-2xl md:text-3xl font-bold text-zinc-900 hover:text-orange-600 transition-colors text-left">
                        {copied ? "EMAIL COPIED TO CLIPBOARD" : "rajshah9305@gmail.com"} <Copy size={24} className={`transition-transform ${copied ? 'scale-125 text-green-600' : 'group-hover:scale-110'}`} />
                     </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-12 text-right">
                   <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Socials</span>
                      <a href={PORTFOLIO_DATA.profile.socials.github} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold text-zinc-900 hover:text-orange-600 tracking-wider">GITHUB</a>
                      <a href={PORTFOLIO_DATA.profile.socials.linkedin} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold text-zinc-900 hover:text-orange-600 tracking-wider">LINKEDIN</a>
                      <a href={PORTFOLIO_DATA.profile.socials.twitter} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold text-zinc-900 hover:text-orange-600 tracking-wider">TWITTER</a>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Legal</span>
                      <button 
                        onClick={() => alert('Privacy Policy: This portfolio is for demonstration purposes. No personal data is collected or stored.')} 
                        className="font-mono text-sm font-bold text-zinc-900 hover:text-orange-600 tracking-wider text-right"
                      >
                        PRIVACY
                      </button>
                      <button 
                        onClick={() => alert('Imprint: RAJ SHAH\nGujarat, India\nEmail: rajshah9305@gmail.com')} 
                        className="font-mono text-sm font-bold text-zinc-900 hover:text-orange-600 tracking-wider text-right"
                      >
                        IMPRINT
                      </button>
                   </div>
                </div>
              </div>
              
              <div className="mt-24 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                <span>RAJ SHAH SYSTEMS INC. © 2024</span>
                <span className="hidden md:block">System Status: Nominal</span>
              </div>
           </div>
        </footer>

      </main>
      
      {/* GLOBAL STYLES */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .ease-cubic-bezier {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        .text-outline-zinc {
          -webkit-text-stroke: 2px #52525b; 
          color: transparent;
        }
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px;
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #fafafa;
        }
        ::-webkit-scrollbar-thumb {
          background: #ea580c; /* Orange-600 */
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #c2410c; /* Orange-700 */
        }
        ::selection {
          background-color: #ea580c;
          color: white;
        }
      `}</style>
    </div>
  );
}


