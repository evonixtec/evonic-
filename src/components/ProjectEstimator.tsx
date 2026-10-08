import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowRight, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

interface ProjectEstimatorProps {
  onApplyEstimate?: (summary: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onApplyEstimate }) => {
  const [platform, setPlatform] = useState<'web' | 'mobile' | 'ai' | 'fullstack'>('web');
  const [spatial3d, setSpatial3d] = useState<boolean>(true);
  const [aiIntegration, setAiIntegration] = useState<boolean>(true);
  const [scale, setScale] = useState<'mvp' | 'growth' | 'enterprise'>('growth');

  const calculateEstimate = () => {
    let weeks = 4;
    let basePriceUsd = 2500;

    if (platform === 'mobile') {
      weeks = 6;
      basePriceUsd = 3800;
    } else if (platform === 'ai') {
      weeks = 5;
      basePriceUsd = 3400;
    } else if (platform === 'fullstack') {
      weeks = 8;
      basePriceUsd = 5500;
    }

    if (spatial3d) {
      weeks += 1.5;
      basePriceUsd += 1200;
    }

    if (aiIntegration) {
      weeks += 1.5;
      basePriceUsd += 1400;
    }

    if (scale === 'mvp') {
      weeks = Math.round(weeks * 0.75);
      basePriceUsd = Math.round(basePriceUsd * 0.7);
    } else if (scale === 'enterprise') {
      weeks = Math.round(weeks * 1.5);
      basePriceUsd = Math.round(basePriceUsd * 1.8);
    }

    return { weeks, basePriceUsd };
  };

  const { weeks, basePriceUsd } = calculateEstimate();

  const handleTransferToContact = () => {
    const summary = `Platform: ${platform.toUpperCase()}, Scale: ${scale.toUpperCase()}, 3D Spatial: ${spatial3d ? 'Yes' : 'No'}, AI Agents: ${aiIntegration ? 'Yes' : 'No'}, Estimated Duration: ~${weeks} weeks`;
    if (onApplyEstimate) {
      onApplyEstimate(summary);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="relative py-24 sm:py-32 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-xs font-mono text-[#A855F7]">
            <Calculator className="w-3.5 h-3.5" />
            <span>04. Instant Scope & Timeline Planner</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            Transparent <br />
            <span className="text-gradient">Project Architecture</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Select your technology requirements to generate an instant estimate of timeline and delivery cadence.
          </p>
        </div>

        {/* Configuration Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 rounded-3xl glass-panel border border-white/10 p-8 space-y-8">
            {/* 1. Core Platform */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-slate-300 block">1. Target Architecture</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'web', label: '3D Web Platform' },
                  { id: 'mobile', label: 'Mobile App' },
                  { id: 'ai', label: 'AI Agent System' },
                  { id: 'fullstack', label: 'Full Enterprise Suite' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPlatform(item.id as any)}
                    className={`p-3 rounded-xl text-xs font-medium text-center transition-all ${
                      platform === item.id
                        ? 'bg-gradient-to-tr from-[#00D4FF] to-[#A855F7] text-black font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scale Level */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-slate-300 block">2. Deployment Scale</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'mvp', label: 'Fast MVP', desc: 'Rapid market launch' },
                  { id: 'growth', label: 'Growth Scale', desc: 'Standard production' },
                  { id: 'enterprise', label: 'Enterprise Grade', desc: 'HA multi-region & SLA' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScale(item.id as any)}
                    className={`p-3.5 rounded-xl text-left transition-all ${
                      scale === item.id
                        ? 'border-2 border-[#00D4FF] bg-cyan-950/40 shadow-[0_0_20px_rgba(0,212,255,0.2)]'
                        : 'bg-white/5 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Specialized Add-ons */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-slate-300 block">3. Specialized Add-ons</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setSpatial3d(!spatial3d)}
                  className={`p-3.5 rounded-xl flex items-center justify-between text-left transition-all ${
                    spatial3d
                      ? 'border border-[#00D4FF] bg-cyan-950/30'
                      : 'border border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">Three.js 3D Viewport</div>
                    <div className="text-[10px] text-slate-400">Interactive WebGL spatial graphics</div>
                  </div>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${spatial3d ? 'bg-[#00D4FF] text-black' : 'border border-white/20'}`}>
                    {spatial3d && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                <button
                  onClick={() => setAiIntegration(!aiIntegration)}
                  className={`p-3.5 rounded-xl flex items-center justify-between text-left transition-all ${
                    aiIntegration
                      ? 'border border-[#A855F7] bg-purple-950/30'
                      : 'border border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">AI Agents / Gemini API</div>
                    <div className="text-[10px] text-slate-400">Autonomous workflow & RAG integration</div>
                  </div>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${aiIntegration ? 'bg-[#A855F7] text-black' : 'border border-white/20'}`}>
                    {aiIntegration && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="rounded-3xl glass-panel-glow border border-cyan-500/40 p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF]">
              <Clock className="w-4 h-4" />
              <span>Project Trajectory</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs font-mono text-slate-400">Estimated Timeline</div>
                <div className="text-4xl font-black font-display text-white tracking-tight mt-1">
                  ~{weeks} <span className="text-lg font-normal text-slate-400">Weeks</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400">Indicative Budget Bracket</div>
                <div className="text-3xl font-black font-display text-[#00D4FF] tracking-tight mt-1">
                  ${basePriceUsd.toLocaleString()} <span className="text-xs font-mono text-slate-400">USD</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Fixed-scope milestones with zero hidden fees.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full Source Code IP Transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day Post-Launch QA Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CI/CD Deployment & Cloud Setup</span>
              </div>
            </div>

            <button
              onClick={handleTransferToContact}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#A855F7] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <span>Lock This Scope In Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
