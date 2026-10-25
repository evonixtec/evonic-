import React, { useState } from 'react';
import { Globe, Smartphone, BrainCircuit, Cpu, ArrowUpRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  icon: React.ReactNode;
  accentColor: string;
  glowClass: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    num: '01',
    title: 'Web Development',
    subtitle: 'High-Performance 3D & Cloud Web Platforms',
    description: 'We engineer ultra-fast, responsive web applications leveraging Next.js, WebGL/Three.js 3D spatial viewports, and edge-rendered architectures built for maximum conversion and search dominance.',
    deliverables: [
      'Interactive 3D Three.js & WebGL spatial canvas experiences',
      'Next.js 15 App Router & Server Components for sub-second speeds',
      'Scalable micro-frontends and real-time WebSocket state management',
      'Enterprise SEO architecture, Core Web Vitals 100/100 tuning',
    ],
    techStack: ['Next.js', 'React', 'Three.js', 'TypeScript', 'Tailwind', 'Node.js'],
    icon: <Globe className="w-6 h-6 text-[#00D4FF]" />,
    accentColor: '#00D4FF',
    glowClass: 'hover:shadow-[0_0_35px_rgba(0,212,255,0.2)] hover:border-[#00D4FF]/50',
  },
  {
    id: 'app-dev',
    num: '02',
    title: 'App Development',
    subtitle: 'Native iOS & Android Ecosystems',
    description: 'Bespoke mobile applications crafted with React Native and Flutter. Flawless 120Hz smooth gesture navigation, offline-first SQLite synchronization, and hardware-accelerated device telemetry.',
    deliverables: [
      'Cross-platform single codebase parity for iOS and Android',
      'Offline-first data syncing with local encrypted databases',
      'Native camera, biometrics, Bluetooth BLE, and NFC integration',
      'App Store & Google Play automated CI/CD deployment pipelines',
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
    icon: <Smartphone className="w-6 h-6 text-[#A855F7]" />,
    accentColor: '#A855F7',
    glowClass: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.2)] hover:border-[#A855F7]/50',
  },
  {
    id: 'ai-solutions',
    num: '03',
    title: 'AI Solutions',
    subtitle: 'Enterprise LLMs, RAG & Autonomous Agents',
    description: 'Deploy real-world generative AI and computer vision models into your production software. We construct secure Retrieval-Augmented Generation (RAG) pipelines, proprietary model fine-tuning, and task-oriented agents.',
    deliverables: [
      'Private RAG pipelines with vector databases (Pinecone, pgvector)',
      'Custom LLM fine-tuning and domain-specific quantized inference',
      'Multi-agent task orchestration with tool-calling capabilities',
      'Zero-data-leakage enterprise governance and privacy boundaries',
    ],
    techStack: ['Python', 'PyTorch', 'Gemini API', 'LangChain', 'Llama 3', 'FastAPI'],
    icon: <BrainCircuit className="w-6 h-6 text-[#38bdf8]" />,
    accentColor: '#38bdf8',
    glowClass: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.2)] hover:border-[#38bdf8]/50',
  },
  {
    id: 'custom-software',
    num: '04',
    title: 'Custom Software & SaaS',
    subtitle: 'Mission-Critical Cloud Platforms & POS Systems',
    description: 'Tailored enterprise software built to replace legacy spreadsheets and brittle manual operations. Distributed microservices, high-throughput financial transaction engines, and industrial ERP/POS systems.',
    deliverables: [
      'Multi-tenant SaaS architectures with role-based RBAC access',
      'Industrial barcode scanning, warehouse inventory, and POS hardware',
      'High-throughput asynchronous event-driven worker pipelines',
      'AWS / GCP Kubernetes orchestration with automated zero-downtime failover',
    ],
    techStack: ['Go', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'],
    icon: <Cpu className="w-6 h-6 text-[#34d399]" />,
    accentColor: '#34d399',
    glowClass: 'hover:shadow-[0_0_35px_rgba(52,211,153,0.2)] hover:border-[#34d399]/50',
  },
];

interface TiltState {
  x: number;
  y: number;
  glareX: number;
  glareY: number;
}

export interface ServicesProps {
  onSelectService?: (id: string) => void;
  onSelectServiceForQuote?: (serviceType?: string) => void;
  onNavigatePage?: (page: any) => void;
}

export const Services: React.FC<ServicesProps> = ({
  onSelectService,
  onSelectServiceForQuote,
  onNavigatePage,
}) => {
  const [tiltStates, setTiltStates] = useState<Record<string, TiltState>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStates((prev) => ({
      ...prev,
      [id]: {
        x: rotateX,
        y: rotateY,
        glareX: (x / rect.width) * 100,
        glareY: (y / rect.height) * 100,
      },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltStates((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0, glareX: 50, glareY: 50 },
    }));
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#0a0a0f] border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#A855F7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00D4FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono text-slate-400">
            <span>01. Core Capabilities</span>
            <span aria-hidden="true"> · </span>
            <span className="text-[#00D4FF]">EVONIXTEC Production Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
            Engineering Precision <br />
            <span className="text-gradient-cyan-purple">Across Every Layer</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We deliver end-to-end digital mastery with zero compromises. From 3D web interfaces to neural AI integrations and cloud infrastructure, every solution is built for production reliability.
          </p>
        </div>

        {/* 3D Floating Glassmorphism Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
          {SERVICES.map((service) => {
            const tilt = tiltStates[service.id] || { x: 0, y: 0, glareX: 50, glareY: 50 };

            return (
              <div
                key={service.id}
                onMouseMove={(e) => handleMouseMove(e, service.id)}
                onMouseLeave={() => handleMouseLeave(service.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0px)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className={`relative rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 transition-all duration-300 group overflow-hidden ${service.glowClass}`}
              >
                {/* Dynamic Specular Glare following mouse */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.08), transparent 70%)`,
                  }}
                />

                <div className="relative z-10 space-y-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl glass-panel border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      {service.icon}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl sm:text-2xl font-black text-slate-600 group-hover:text-slate-400 transition-colors">
                        {service.num}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#00D4FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 tracking-wide">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed pt-1">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="pt-4 border-t border-white/10 space-y-2.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Standard Deliverables
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: service.accentColor }}
                          />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Badges */}
                  <div className="pt-4 flex flex-wrap items-center gap-1.5 border-t border-white/5">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
