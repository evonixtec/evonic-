import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, Code2, Sparkles } from 'lucide-react';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneExportModal: React.FC<StandaloneExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      const res = await fetch('/evonixtec-standalone.html');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = '/evonixtec-standalone.html';
    a.download = 'evonixtec-agency-3d.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-3xl w-full rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl glass-panel text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF]">
            <Sparkles className="w-4 h-4" />
            <span>Single HTML File · Complete CDN Architecture</span>
          </div>
          <h3 className="text-2xl font-black font-display text-white">
            EVONIXTEC Standalone Single HTML Code
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Zero build tools needed. Contains full CDN imports for <strong>Three.js r128</strong>, <strong>GSAP 3.12</strong>, <strong>Lenis Smooth Scroll</strong>, <strong>Tailwind CSS</strong>, and <strong>Google Fonts (Sora &amp; Space Grotesk)</strong> running at 60fps.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#A855F7] text-black font-bold text-xs font-mono flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Code Copied to Clipboard!' : 'Copy Full HTML Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-xl glass-panel text-white hover:border-[#00D4FF] font-bold text-xs font-mono flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#00D4FF]" />
            <span>Download .html File</span>
          </button>

          <a
            href="/evonixtec-standalone.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Standalone Preview</span>
          </a>
        </div>

        {/* Code Preview Box */}
        <div className="rounded-2xl bg-[#06060a] border border-white/10 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-white/5 pb-2">
            <span>evonixtec-standalone.html (Production Ready)</span>
            <span>&lt;!DOCTYPE html&gt;</span>
          </div>

          <pre className="text-xs font-mono text-slate-300 overflow-x-auto max-h-60 p-2 scrollbar-thin">
{`<!DOCTYPE html>
<html lang="en" class="scroll-smooth bg-[#0a0a0f] text-slate-100">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EVONIXTEC – We Build Digital Future | 3D Tech Agency</title>
  
  <!-- CDNs: Tailwind, Three.js, GSAP, Lenis, Lucide, Google Fonts (Sora & Space Grotesk) -->
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-[#0a0a0f] text-slate-100">
  <!-- 1. Loading Screen with Logo Animation -->
  <!-- 2. Hero with 3D Three.js Rotating Globe & Parallax -->
  <!-- 3. Services with 3D Floating Glassmorphism Tilt Cards -->
  <!-- 4. Interactive 3D Spinning Tech Stack Constellation -->
  <!-- 5. Portfolio with 3D Mockup Tilt Effect -->
  <!-- 6. Contact Section with 3D Quantum Core Shape -->
</body>
</html>`}
          </pre>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-sora cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
