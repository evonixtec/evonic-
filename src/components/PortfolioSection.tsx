import React, { useState } from 'react';
import { ExternalLink, TrendingUp, ShieldCheck, Zap, Layers } from 'lucide-react';

interface Project {
  id: string;
  category: 'Web 3D' | 'Mobile App' | 'Enterprise AI' | 'Cloud SaaS';
  title: string;
  tagline: string;
  metric: string;
  metricLabel: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  gradient: string;
}

export const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const projects: Project[] = [
    {
      id: 'fintech-apex',
      category: 'Web 3D',
      title: 'Apex Global High-Frequency Trading Terminal',
      tagline: 'Institutional Grade WebGL 3D Liquidity Visualizer',
      metric: '$42M+',
      metricLabel: 'Daily Trading Volume Streamed',
      description:
        'Engineered an ultra-low latency browser terminal with custom WebGL order book depth charts, WebSocket tick multiplexing, and biometric multi-signature authentication.',
      deliverables: ['Real-time 60FPS Order Depth Chart', 'Sub-12ms Tick Rendering', 'Hardware Key Security'],
      techStack: ['React 19', 'Three.js', 'Go Microservices', 'WebSockets', 'Tailwind'],
      gradient: 'from-cyan-950 via-slate-900 to-blue-950',
    },
    {
      id: 'aura-mobile',
      category: 'Mobile App',
      title: 'Aura Health & Biometric Mobile Platform',
      tagline: '120Hz Native iOS & Android Health Ecosystem',
      metric: '120,000+',
      metricLabel: 'Active Daily Synchronized Users',
      description:
        'Designed and deployed cross-platform biometric synchronization connecting wearable BLE monitors to offline-first SQLite caches with end-to-end encrypted telemetry.',
      deliverables: ['Offline-First Sync Engine', 'BLE Hardware Sensor Streaming', 'Zero-Latency Haptics'],
      techStack: ['React Native', 'Flutter', 'SQLite', 'Node.js', 'Firebase Auth'],
      gradient: 'from-purple-950 via-slate-900 to-pink-950',
    },
    {
      id: 'omnigen-ai',
      category: 'Enterprise AI',
      title: 'OmniGen Autonomous Intelligence Suite',
      tagline: 'Self-Orchestrating Multi-Agent Decision Engine',
      metric: '4.2x',
      metricLabel: 'Analyst Workflow Acceleration',
      description:
        'Implemented autonomous enterprise agents capable of processing multilingual corporate contracts, extracting risk clauses, and generating audit-ready PDF dossiers.',
      deliverables: ['Multi-Agent Task Orchestration', 'pgvector Semantic Search', 'Structured JSON Output Parser'],
      techStack: ['Gemini API', 'PyTorch', 'PostgreSQL pgvector', 'FastAPI', 'Docker'],
      gradient: 'from-blue-950 via-slate-900 to-indigo-950',
    },
    {
      id: 'customs-cloud',
      category: 'Cloud SaaS',
      title: 'Sialkot Export Logistics & WebOC Customs Cloud',
      tagline: 'Industrial SaaS & Global Trade Invoicing Engine',
      metric: '350+',
      metricLabel: 'Manufacturing Hubs Automated',
      description:
        'Consolidated export factory compliance workflows across Sialkot and Dubai with real-time tariff calculations, automated cargo manifests, and multi-tenant ledger security.',
      deliverables: ['Multi-Tenant Tenant Isolation', 'Direct WebOC Port Integration', 'Automated CBM Cargo Estimator'],
      techStack: ['Go', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
      gradient: 'from-emerald-950 via-slate-900 to-teal-950',
    },
  ];

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-xs font-mono text-[#00D4FF]">
            <Layers className="w-3.5 h-3.5" />
            <span>03. Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            Production Impact <br />
            <span className="text-gradient">At Enterprise Scale</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Real products engineered for demanding industries across Sialkot, Dubai, and global markets.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['All', 'Web 3D', 'Mobile App', 'Enterprise AI', 'Cloud SaaS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#A855F7] text-black font-bold shadow-[0_0_20px_rgba(0,212,255,0.35)]'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-10 space-y-6 hover:border-cyan-500/40 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Highlight Hero Banner Box */}
              <div
                className={`h-48 sm:h-56 rounded-2xl bg-gradient-to-tr ${project.gradient} border border-white/10 flex flex-col justify-end p-6 relative overflow-hidden`}
              >
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#00D4FF]">
                  {project.category}
                </div>
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                    {project.metric}
                  </div>
                  <div className="text-xs font-mono text-slate-300 mt-0.5">{project.metricLabel}</div>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#00D4FF] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1 font-semibold">{project.tagline}</p>
                <p className="text-sm text-slate-300 leading-relaxed mt-3">{project.description}</p>
              </div>

              {/* Deliverable Highlights */}
              <div className="space-y-1.5 pt-2">
                {project.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-400"
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
