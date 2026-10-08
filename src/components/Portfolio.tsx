import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, CheckCircle2, Sparkles, Layers, ShieldCheck, X } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  impactMetric: string;
  impactLabel: string;
  description: string;
  imageSrc: string;
  tags: string[];
  specs: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'fintech-apex',
    title: 'Aura Capital Terminal',
    client: 'Global FinTech & Trading Desk',
    category: 'Web & 3D Spatial Platform',
    impactMetric: '$42M+',
    impactLabel: 'Daily Processed Volume',
    description: 'High-frequency institutional analytics terminal with WebGL candlestick visualizers, sub-millisecond WebSocket market order books, and biometric hardware multi-sig security.',
    imageSrc: '/src/assets/images/portfolio_fintech_platform_1791375370830.jpg',
    tags: ['Next.js 15', 'Three.js', 'WebSocket', 'Go Microservices'],
    specs: [
      'Sub-50ms latency WebSocket telemetry feeds',
      'Custom Three.js depth-chart shader visualizations',
      'Zero-downtime rolling multi-region database replication',
    ],
  },
  {
    id: 'ai-nexus',
    title: 'Cognitive Engine RAG Suite',
    client: 'Enterprise Legal & Compliance Firm',
    category: 'Enterprise AI & Agent Orchestration',
    impactMetric: '99.4%',
    impactLabel: 'Citation Accuracy Rate',
    description: 'Private multi-tenant generative AI platform parsing 500,000+ complex contracts with zero data leakage. Multi-agent debate consensus architecture with pgvector indexing.',
    imageSrc: '/src/assets/images/portfolio_ai_copilot_suite_1791375382774.jpg',
    tags: ['Python', 'Gemini API', 'pgvector', 'FastAPI', 'React'],
    specs: [
      'Hybrid semantic vector search with BM25 reranking',
      'Zero-retention private cloud security sandbox',
      'Automated multi-turn reasoning and agent tool execution',
    ],
  },
  {
    id: 'logistics-global',
    title: 'Horizon Cargo & Port Operating System',
    client: 'Sialkot & Dubai Export Freight Consortia',
    category: 'Custom Software & Logistics SaaS',
    impactMetric: '140k+',
    impactLabel: 'Containers Tracked Annually',
    description: 'End-to-end customs clearing, automated WeBOC export documentation, CBM 3D container stuffing simulator, and real-time maritime vessel telemetry tracking.',
    imageSrc: '/src/assets/images/portfolio_logistics_cloud_1791375396392.jpg',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Barcode Engine'],
    specs: [
      'Instant Code128 and QR customs barcode engine',
      'Live 3D volumetric box packing optimization solver',
      'Integrated HMRC & EU VAT reverse-charge calculators',
    ],
  },
  {
    id: 'health-mesh',
    title: 'PulseLink Biometrics Hub',
    client: 'Medical Technology Laboratory',
    category: 'Mobile App Ecosystem (iOS & Android)',
    impactMetric: '120k+',
    impactLabel: 'Active Wearable Syncs',
    description: 'Ultra-responsive mobile healthcare companion connecting Bluetooth BLE wearable medical devices with clinical health records. Offline-first encrypted SQLite database.',
    imageSrc: '/src/assets/images/portfolio_mobile_app_mesh_1791375407563.jpg',
    tags: ['React Native', 'TypeScript', 'Bluetooth BLE', 'HIPAA SQLite'],
    specs: [
      '120fps hardware-accelerated cardiac ECG chart renderer',
      'Zero-latency local encrypted SQLite persistence',
      'Biometric TouchID/FaceID hardware enclave encryption',
    ],
  },
];

export interface PortfolioProps {
  onRequestPrivateMeeting?: () => void;
  onOpenQuote?: (title?: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onRequestPrivateMeeting }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [tiltStates, setTiltStates] = useState<Record<string, { x: number; y: number }>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltStates((prev) => ({
      ...prev,
      [id]: { x: rotateX, y: rotateY },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltStates((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0 },
    }));
  };

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono text-slate-400">
            <span>03. Selected Works</span>
            <span aria-hidden="true"> · </span>
            <span className="text-[#00D4FF]">Case Studies &amp; Outcomes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
            Proven Impact <br />
            <span className="text-gradient-cyan-purple">In Production Systems</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every deployment is engineered with tangible business metrics. Hover to inspect 3D tilt mockups and architectural specifications.
          </p>
        </div>

        {/* 3D Mockup Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000">
          {PROJECTS.map((project) => {
            const tilt = tiltStates[project.id] || { x: 0, y: 0 };

            return (
              <div
                key={project.id}
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                onMouseLeave={() => handleMouseLeave(project.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="rounded-3xl glass-panel border border-white/10 hover:border-[#00D4FF]/50 p-6 sm:p-8 flex flex-col justify-between group overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.18)]"
              >
                <div className="space-y-6">
                  {/* Visual 3D Mockup Container */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/10 group-hover:border-[#00D4FF]/30 transition-all">
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient Overlay Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />

                    {/* Floating Proof Metric Pill */}
                    <div className="absolute bottom-4 left-4 p-3 rounded-xl glass-panel-glow border border-white/10 backdrop-blur-md">
                      <div className="text-xl sm:text-2xl font-black font-display text-white tabular-nums">
                        {project.impactMetric}
                      </div>
                      <div className="text-[10px] font-mono text-slate-300 uppercase tracking-wider">
                        {project.impactLabel}
                      </div>
                    </div>
                  </div>

                  {/* Metadata & Title */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-[#00D4FF]">{project.category}</span>
                      <span>{project.client}</span>
                    </div>

                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#00D4FF] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {project.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4FF] flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-2.5 rounded-xl glass-panel hover:border-[#00D4FF] text-slate-300 hover:text-white transition-all cursor-pointer group-hover:bg-[#00D4FF]/10"
                    title="Inspect case study details"
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#00D4FF]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-2xl w-full rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl glass-panel text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#00D4FF]">
                {selectedProject.category} · {selectedProject.client}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                {selectedProject.title}
              </h3>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
              <img
                src={selectedProject.imageSrc}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-2xl glass-panel-glow border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-2xl font-black font-display text-white">
                  {selectedProject.impactMetric}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {selectedProject.impactLabel}
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Verified Production Impact
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
                System Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
                Key Technical Invariants
              </h4>
              <ul className="space-y-2">
                {selectedProject.specs.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00D4FF]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-sora cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
