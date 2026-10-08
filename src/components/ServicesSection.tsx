import React, { useState } from 'react';
import { Globe, Smartphone, Cpu, Layers, CheckCircle2, ArrowUpRight, Zap } from 'lucide-react';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  colorScheme: 'cyan' | 'purple' | 'blue' | 'emerald';
  features: string[];
  techStack: string[];
  stats: string;
}

export const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: 'web',
      num: '01',
      title: 'Web Development',
      tagline: 'Interactive 3D & High-Speed Platforms',
      description:
        'Next.js 15, Three.js WebGL spatial viewports, edge rendering, and sub-second performance engineered for peak conversion and interactive visual storytelling.',
      icon: <Globe className="w-6 h-6 text-[#00D4FF]" />,
      colorScheme: 'cyan',
      features: [
        'WebGL / Three.js 3D spatial interactive product visualizers',
        'Next.js 15 App Router with full Server-Side Rendering (SSR)',
        'Ultra-fast global edge caching with <15ms response times',
        'PWA compliance, offline resilience, and dynamic animations',
      ],
      techStack: ['React 19', 'Next.js', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
      stats: '100/100 Lighthouse Performance Score',
    },
    {
      id: 'app',
      num: '02',
      title: 'App Development',
      tagline: 'Native iOS & Android Ecosystems',
      description:
        'React Native and Flutter mobile applications with 120Hz smooth fluid gestures, offline-first SQLite synchronization, and native biometrics designed for scale.',
      icon: <Smartphone className="w-6 h-6 text-[#A855F7]" />,
      colorScheme: 'purple',
      features: [
        'Cross-platform iOS and Android codebase parity',
        'Offline-first real-time synchronization with local SQLite',
        'Biometric authentication, push notifications, and background tasks',
        'Deep device sensor integrations and Bluetooth hardware linking',
      ],
      techStack: ['React Native', 'Flutter', 'iOS Swift', 'Android Kotlin', 'SQLite', 'Firebase'],
      stats: '4.9★ App Store & Play Store Average',
    },
    {
      id: 'ai',
      num: '03',
      title: 'AI Solutions & Agents',
      tagline: 'Enterprise LLMs & Autonomous Workflows',
      description:
        'Retrieval-Augmented Generation (RAG) pipelines, domain-specific model fine-tuning, Gemini API integrations, and task-oriented multi-agent autonomous systems.',
      icon: <Cpu className="w-6 h-6 text-sky-400" />,
      colorScheme: 'blue',
      features: [
        'Domain-specific RAG architectures with pgvector & vector DBs',
        'Autonomous multi-agent workflows executing complex reasoning',
        'Gemini API server-side integrations with structured output parsing',
        'Zero-leak enterprise privacy guarantees and strict latency SLA',
      ],
      techStack: ['Gemini API', 'PyTorch', 'pgvector', 'FastAPI', 'LangChain', 'Python'],
      stats: '4.2x Operational Efficiency Boost',
    },
    {
      id: 'software',
      num: '04',
      title: 'Custom Software & SaaS',
      tagline: 'Mission-Critical Cloud Architectures',
      description:
        'Multi-tenant SaaS architectures, industrial ERP/POS systems, distributed Go microservices, and automated Kubernetes failover for resilient enterprise operations.',
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      colorScheme: 'emerald',
      features: [
        'Multi-tenant cloud architecture with row-level tenant isolation',
        'Real-time WebSocket event buses for live synchronization',
        'Custom export ERP, inventory, invoicing, and customs compliance modules',
        'Zero-downtime blue/green CI/CD deployment pipelines',
      ],
      techStack: ['Go', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS / Cloud Run'],
      stats: '99.99% Guaranteed Cloud SLA',
    },
  ];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-(y / rect.height) * 8}deg) rotateY(${(x / rect.width) * 8}deg)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-xs font-mono text-[#00D4FF]">
            <Zap className="w-3.5 h-3.5" />
            <span>01. Core Capabilities · EVONIXTEC</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            Engineering Precision <br />
            <span className="text-gradient">Across Every Layer</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From spatial WebGL 3D graphics to high-throughput distributed microservices, we build software designed to dominate market categories.
          </p>
        </div>

        {/* 4 Core Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
          {services.map((service) => (
            <div
              key={service.id}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className={`group rounded-3xl glass-panel p-8 sm:p-10 border transition-all duration-300 space-y-6 cursor-pointer relative overflow-hidden ${
                service.colorScheme === 'cyan'
                  ? 'border-cyan-500/20 hover:border-cyan-400/60 shadow-[0_4px_30px_rgba(0,212,255,0.05)]'
                  : service.colorScheme === 'purple'
                  ? 'border-purple-500/20 hover:border-purple-400/60 shadow-[0_4px_30px_rgba(168,85,247,0.05)]'
                  : service.colorScheme === 'blue'
                  ? 'border-sky-500/20 hover:border-sky-400/60 shadow-[0_4px_30px_rgba(56,189,248,0.05)]'
                  : 'border-emerald-500/20 hover:border-emerald-400/60 shadow-[0_4px_30px_rgba(52,211,153,0.05)]'
              }`}
            >
              {/* Top Accent Glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none ${
                  service.colorScheme === 'cyan'
                    ? 'bg-[#00D4FF]'
                    : service.colorScheme === 'purple'
                    ? 'bg-[#A855F7]'
                    : service.colorScheme === 'blue'
                    ? 'bg-sky-400'
                    : 'bg-emerald-400'
                }`}
              />

              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                    service.colorScheme === 'cyan'
                      ? 'bg-cyan-950/60 border-cyan-800/80 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                      : service.colorScheme === 'purple'
                      ? 'bg-purple-950/60 border-purple-800/80 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : service.colorScheme === 'blue'
                      ? 'bg-sky-950/60 border-sky-800/80 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      : 'bg-emerald-950/60 border-emerald-800/80 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                  }`}
                >
                  {service.icon}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-500 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                    {service.stats}
                  </span>
                  <span className="font-mono text-xl text-slate-600 font-bold group-hover:text-white transition-colors">
                    {service.num}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#00D4FF] transition-colors flex items-center gap-2">
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1 font-semibold">{service.tagline}</p>
                <p className="text-sm text-slate-300 leading-relaxed mt-3">{service.description}</p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2 pt-2">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        service.colorScheme === 'cyan'
                          ? 'text-[#00D4FF]'
                          : service.colorScheme === 'purple'
                          ? 'text-[#A855F7]'
                          : service.colorScheme === 'blue'
                          ? 'text-sky-400'
                          : 'text-emerald-400'
                      }`}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300 hover:border-cyan-500/40 hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
