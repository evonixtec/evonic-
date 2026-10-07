import React from 'react';
import { Code2, ArrowUpRight, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenCodeModal: () => void;
  onOpenToolsHub: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenCodeModal,
  onOpenToolsHub,
}) => {
  return (
    <footer className="relative bg-[#06060a] border-t border-white/10 text-slate-400 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00D4FF] to-[#A855F7] p-px">
                <div className="w-full h-full bg-[#0a0a0f] rounded-[7px] flex items-center justify-center">
                  <span className="font-display font-black text-xs text-[#00D4FF]">E</span>
                </div>
              </div>
              <span className="text-xl font-black font-display tracking-tight text-white">
                EVONIXTEC
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Premium 3D technology agency delivering Web Development, Mobile Apps, Enterprise AI Solutions, and Custom Cloud Platforms. Backed by 20+ years Dubai &amp; global international engineering expertise.
            </p>

            <div className="pt-2 text-xs font-mono text-slate-500 space-y-1">
              <div>Lab: Kolti Behram, Sialkot, Pakistan</div>
              <div>Direct: +92 326 324 4002 · evonixtec@gmail.com</div>
            </div>
          </div>

          {/* Col 3: Capabilities */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Capabilities
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-[#00D4FF] transition-colors cursor-pointer"
                >
                  3D Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-[#00D4FF] transition-colors cursor-pointer"
                >
                  iOS &amp; Android Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-[#00D4FF] transition-colors cursor-pointer"
                >
                  Enterprise AI &amp; RAG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-[#00D4FF] transition-colors cursor-pointer"
                >
                  Custom Software &amp; ERP
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Ecosystem
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenToolsHub}
                  className="hover:text-[#00D4FF] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Online Tools Suite</span>
                  <span className="text-[10px] font-mono px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    12 Free
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('tech-stack')}
                  className="hover:text-[#00D4FF] transition-colors cursor-pointer"
                >
                  3D Tech Constellation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('portfolio')}
                  className="hover:text-[#00D4FF] transition-colors cursor-pointer"
                >
                  Case Studies &amp; Work
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCodeModal}
                  className="hover:text-[#00D4FF] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Code2 className="w-3 h-3 text-[#00D4FF]" />
                  <span>Single HTML CDN File</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Action */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Engineering Lab
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-database privacy guarantee. High-availability 99.99% multi-region deployments.
            </p>
            <button
              onClick={() => onNavigateSection('contact')}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#00D4FF]/20 text-white hover:text-[#00D4FF] border border-white/10 hover:border-[#00D4FF]/40 text-xs font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Initiate Discovery</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} EVONIXTEC. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCodeModal}
              className="hover:text-[#00D4FF] transition-colors cursor-pointer"
            >
              Standalone CDN HTML
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenToolsHub}
              className="hover:text-[#00D4FF] transition-colors cursor-pointer"
            >
              12 Web Workstations
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="mailto:evonixtec@gmail.com"
              className="hover:text-white transition-colors"
            >
              Security Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
