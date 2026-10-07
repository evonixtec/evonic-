import React, { useState } from 'react';
import { TechStackCanvas } from './3d/TechStackCanvas';
import { Layers, Cpu, Server, Cloud, Shield, Database, Sparkles, Terminal } from 'lucide-react';

interface TechCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  technologies: {
    name: string;
    level: string;
    role: string;
    highlight: string;
  }[];
}

const CATEGORIES: TechCategory[] = [
  {
    id: 'frontend',
    name: '3D & Frontend',
    icon: <Layers className="w-4 h-4 text-[#00D4FF]" />,
    technologies: [
      { name: 'Three.js / WebGL', level: 'Expert', role: '3D Spatial Visuals', highlight: 'Custom shaders, buffer geometries, 60fps optimizations' },
      { name: 'React 19 & Next.js 15', level: 'Production', role: 'Core Framework', highlight: 'Server Actions, streaming SSR, App Router' },
      { name: 'TypeScript', level: 'Strict', role: 'Type Safety', highlight: 'Strict null checks, generic schemas, zero runtime bugs' },
      { name: 'Tailwind CSS', level: 'Advanced', role: 'Design Systems', highlight: 'Custom utility design systems, CSS variables' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    icon: <Server className="w-4 h-4 text-[#A855F7]" />,
    technologies: [
      { name: 'Node.js & Express / Fastify', level: 'High-Concurrency', role: 'Service Runtime', highlight: 'Event-driven non-blocking I/O microservices' },
      { name: 'Go (Golang)', level: 'Ultra-Fast', role: 'System Services', highlight: 'Low memory footprint, high-frequency worker pools' },
      { name: 'PostgreSQL & Drizzle', level: 'Enterprise', role: 'Relational DB', highlight: 'ACID transactions, indexed spatial & vector search' },
      { name: 'Redis', level: 'Sub-Millisecond', role: 'Cache & Pub/Sub', highlight: 'Session state, rate limiting, distributed locking' },
    ],
  },
  {
    id: 'ai',
    name: 'AI & Neural Systems',
    icon: <Cpu className="w-4 h-4 text-[#38bdf8]" />,
    technologies: [
      { name: 'Gemini 2.5 API', level: 'Cutting-Edge', role: 'Multimodal AI', highlight: 'Tool-calling, long context reasoning, JSON output' },
      { name: 'PyTorch & HuggingFace', level: 'Deep Learning', role: 'Model Training', highlight: 'Fine-tuning, LoRA adapters, custom tokenizers' },
      { name: 'LangChain & LlamaIndex', level: 'Production RAG', role: 'Orchestration', highlight: 'Semantic routing, hybrid search, document embeddings' },
      { name: 'pgvector / Pinecone', level: 'Scalable', role: 'Vector Storage', highlight: 'High-dimensional similarity indexing for enterprise data' },
    ],
  },
  {
    id: 'devops',
    name: 'Cloud & Infrastructure',
    icon: <Cloud className="w-4 h-4 text-[#34d399]" />,
    technologies: [
      { name: 'Docker & Kubernetes', level: 'Cloud-Native', role: 'Containerization', highlight: 'Automated pod autoscaling, zero-downtime rolling deploys' },
      { name: 'AWS & Google Cloud', level: 'Multi-Region', role: 'Infrastructure', highlight: 'Serverless Lambdas, Cloud Run, S3, CloudFront' },
      { name: 'GitHub Actions CI/CD', level: 'Automated', role: 'Pipeline', highlight: 'Automated linting, unit testing, immutable container tagging' },
      { name: 'Cloudflare Edge', level: 'Global CDN', role: 'Security & DNS', highlight: 'WAF rules, DDoS mitigation, Workers edge computation' },
    ],
  },
];

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const selectedCat = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono text-slate-400">
            <span>02. Technologies</span>
            <span aria-hidden="true"> · </span>
            <span className="text-[#00D4FF]">Modern Full-Stack Constellation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
            Powered by Modern <br />
            <span className="text-gradient-cyan-purple">Next-Gen Architecture</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We avoid outdated monoliths and brittle dependencies. Our stack is hardened for 60fps graphics performance, elastic cloud scaling, and sub-second edge computing.
          </p>
        </div>

        {/* 3D Tech Orbit Interactive Canvas */}
        <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 overflow-hidden relative">
          <div className="text-center space-y-1 mb-2">
            <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase">
              Interactive 3D Technology Solar Orbit · Drag to Rotate
            </span>
          </div>

          <TechStackCanvas />
        </div>

        {/* Categorized Tech Matrix */}
        <div className="space-y-8">
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 border border-[#00D4FF]/50 text-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                    : 'glass-panel text-slate-400 hover:text-white border-white/5'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Cards for Active Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedCat.technologies.map((tech) => (
              <div
                key={tech.name}
                className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#00D4FF]/40 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#00D4FF]">
                    {tech.role}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    {tech.level}
                  </span>
                </div>

                <h4 className="text-base font-bold font-display text-white group-hover:text-[#00D4FF] transition-colors">
                  {tech.name}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  {tech.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
