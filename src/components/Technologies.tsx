import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code2, Database, Server, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops';
  role: string;
  experience: string;
  color: string;
  bgGlow: string;
  svgIcon: React.ReactNode;
}

export const Technologies: React.FC<{ onExploreService?: (serviceName: string) => void }> = ({
  onExploreService,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'database' | 'devops'>('all');

  const techStack: TechItem[] = [
    // Frontend
    {
      id: 'react',
      name: 'React.js',
      category: 'frontend',
      role: 'Dynamic Web Apps & Dashboards',
      experience: '10+ Years',
      color: 'text-[#61DAFB]',
      bgGlow: 'from-[#61DAFB]/20 to-transparent',
      svgIcon: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 fill-none stroke-[#61DAFB] stroke-1">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" stroke="none" />
          <g>
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'frontend',
      role: 'High-Speed SSR & SEO Portals',
      experience: 'Production Ready',
      color: 'text-white',
      bgGlow: 'from-slate-700/30 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 180 180" className="w-8 h-8 fill-white">
          <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0">
            <circle cx="90" cy="90" fill="white" r="90" />
          </mask>
          <g mask="url(#mask0_next)">
            <circle cx="90" cy="90" fill="black" r="90" stroke="#333" strokeWidth="6" />
            <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.147 149.508 157.438Z" fill="white" />
            <rect fill="white" height="72" width="12" x="115" y="54" />
          </g>
        </svg>
      ),
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'frontend',
      role: 'Enterprise Type-Safe Architecture',
      experience: 'Standard',
      color: 'text-[#3178C6]',
      bgGlow: 'from-[#3178C6]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path d="M40 40h48v16H72v48H56V56H40V40z" fill="#FFF" />
          <path d="M96 66c-3-2-8-4-14-4-8 0-14 4-14 11 0 7 6 10 13 13 8 3 13 6 13 12 0 7-6 12-16 12-7 0-14-3-18-6l4-12c4 3 9 5 14 5 7 0 11-3 11-7 0-5-5-8-12-11-8-3-14-7-14-14 0-9 8-15 19-15 6 0 13 2 17 5l-4 12z" fill="#FFF" />
        </svg>
      ),
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'frontend',
      role: 'Pixel-Perfect Responsive UI',
      experience: 'Modern UI',
      color: 'text-[#38BDF8]',
      bgGlow: 'from-[#38BDF8]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#38BDF8]">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      ),
    },
    {
      id: 'flutter',
      name: 'Flutter / Dart',
      category: 'frontend',
      role: 'iOS & Android Native Mobile Apps',
      experience: 'Cross-Platform',
      color: 'text-[#02569B]',
      bgGlow: 'from-[#02569B]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#02569B]">
          <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM14.314 10.978L7.697 17.595 11.397 21.3l6.618-6.618-3.701-3.704zM21.7 13.987l-3.696-3.696-3.701 3.701 3.696 3.696 3.701-3.701z" />
        </svg>
      ),
    },

    // Backend
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'backend',
      role: 'High-Concurrency REST & WebSockets',
      experience: '12+ Years',
      color: 'text-[#5FA04E]',
      bgGlow: 'from-[#5FA04E]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-[#5FA04E]">
          <path d="M16 2.5l12 6.928v13.856L16 30.212 4 23.284V9.428L16 2.5zm0 2.31L6 10.584v11.548l10 5.774 10-5.774V10.584L16 4.81z" />
          <path d="M16 9l6 3.5v7l-6 3.5-6-3.5v-7l6-3.5z" />
        </svg>
      ),
    },
    {
      id: 'python',
      name: 'Python',
      category: 'backend',
      role: 'Data Pipelines & Automation',
      experience: 'Versatile',
      color: 'text-[#3776AB]',
      bgGlow: 'from-[#FFD43B]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <path d="M63.3 0c-15.8 0-26.6 6.8-26.6 19.9v14.7h27.1v3.7H27.5C12.3 38.3 0 50.1 0 66.5c0 16.7 10.9 26.6 26.1 26.6h8.8V80.5c0-12.7 10.9-23.7 23.6-23.7h36.3c1.7 0 3.1-1.4 3.1-3.1V20c0-13.2-11.4-20-34.6-20zm-14 8.7c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6z" fill="#3776AB" />
          <path d="M64.7 128c15.8 0 26.6-6.8 26.6-19.9V93.4H64.2v-3.7h36.3c15.2 0 27.5-11.8 27.5-28.2 0-16.7-10.9-26.6-26.1-26.6h-8.8v12.6c0 12.7-10.9 23.7-23.6 23.7H33.2c-1.7 0-3.1 1.4-3.1 3.1V108c0 13.2 11.4 20 34.6 20zm14-8.7c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6z" fill="#FFD43B" />
        </svg>
      ),
    },
    {
      id: 'laravel',
      name: 'Laravel / PHP',
      category: 'backend',
      role: 'Enterprise ERP & Back-Office Portals',
      experience: '15+ Years',
      color: 'text-[#FF2D20]',
      bgGlow: 'from-[#FF2D20]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FF2D20]">
          <path d="M21.57 6.43l-4.14-2.4a1.8 1.8 0 00-1.8 0L2.43 11.6a1.8 1.8 0 00-.9 1.56v7.24a1.8 1.8 0 00.9 1.56l4.14 2.4a1.8 1.8 0 001.8 0l13.2-7.57a1.8 1.8 0 00.9-1.56V8a1.8 1.8 0 00-.9-1.57zM8.28 21.65l-4.14-2.4V13.8l4.14 2.37v5.48zm5.72-3.28l-4.14 2.38v-5.48l4.14-2.38v5.48zm0-7.3l-4.14 2.38-4.14-2.38 4.14-2.37 4.14 2.37zm7.42 2.38l-4.14 2.38v-5.48l4.14-2.38v5.48z" />
        </svg>
      ),
    },
    {
      id: 'csharp',
      name: 'C# / .NET',
      category: 'backend',
      role: 'Desktop POS & Retail Cash Drawer APIs',
      experience: 'Industrial Grade',
      color: 'text-[#512BD4]',
      bgGlow: 'from-[#512BD4]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <circle cx="64" cy="64" r="60" fill="#512BD4" />
          <path d="M44 42c-12 0-22 10-22 22s10 22 22 22c8 0 15-4 19-11l-9-5c-2 4-6 6-10 6-7 0-12-5-12-12s5-12 12-12c4 0 8 2 10 6l9-5c-4-7-11-11-19-11z" fill="#FFF" />
          <path d="M72 48h6v12h12v-12h6v12h8v6h-8v12h8v6h-8v12h-6v-12h-12v12h-6v-12h-8v-6h8v-12h-8v-6h8v-12zm6 18v12h12v-12h-12z" fill="#FFF" />
        </svg>
      ),
    },

    // Database
    {
      id: 'postgresql',
      name: 'PostgreSQL / SQL',
      category: 'database',
      role: 'ACID Relational Enterprise Data',
      experience: 'High Reliability',
      color: 'text-[#4169E1]',
      bgGlow: 'from-[#4169E1]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <path d="M64 4c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4zm0 14c25.4 0 46 20.6 46 46s-20.6 46-46 46S18 89.4 18 64 38.6 18 64 18z" fill="#336791" />
          <path d="M63 32c-15 0-25 11-25 24 0 17 19 25 19 36 0 4-4 7-9 7-7 0-12-5-12-11l-9 1c1 11 9 18 21 18 13 0 23-8 23-21 0-18-20-25-20-37 0-5 5-8 12-8 6 0 10 3 11 8l9-2c-2-9-9-15-20-15z" fill="#FFF" />
        </svg>
      ),
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'database',
      role: 'Ultra-Fast Transactional Inventory',
      experience: 'Core Database',
      color: 'text-[#00758F]',
      bgGlow: 'from-[#00758F]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <rect width="128" height="128" rx="20" fill="#00758F" />
          <path d="M64 24C41.9 24 24 41.9 24 64s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm0 16c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24z" fill="#F29111" />
          <circle cx="64" cy="64" r="12" fill="#FFF" />
        </svg>
      ),
    },
    {
      id: 'redis',
      name: 'Redis',
      category: 'database',
      role: 'In-Memory Cache & Session State',
      experience: 'Sub-Millisecond',
      color: 'text-[#DC382D]',
      bgGlow: 'from-[#DC382D]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <path d="M123.6 42.6L67.1 14.3a6.8 6.8 0 00-6.1 0L4.4 42.6A6.8 6.8 0 000 48.7v30.6a6.8 6.8 0 004.4 6.2l56.5 28.3a6.8 6.8 0 006.1 0l56.5-28.3a6.8 6.8 0 004.5-6.2V48.7a6.8 6.8 0 00-4.4-6.1zM64 27.2l45.4 22.7L64 72.6 18.6 49.9 64 27.2zm0 85.3L13.6 87.2V58.9L64 84.1v28.4zm50.4-25.3L64 112.5V84.1l50.4-25.2v28.3z" fill="#DC382D" />
        </svg>
      ),
    },
    {
      id: 'firebase',
      name: 'Firebase Cloud',
      category: 'database',
      role: 'Real-Time Sync & Mobile Notification',
      experience: 'Serverless',
      color: 'text-[#FFCA28]',
      bgGlow: 'from-[#FFCA28]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <path d="M18.8 88.5L40.2 12.7c.6-2.1 3.5-2.5 4.7-.6l18.4 29.5L18.8 88.5z" fill="#FFA000" />
          <path d="M2.5 98.7l14.2-24.8 28.7 17.6-37.8 8.8c-2.4.6-4.5-1.1-4.7-3.4 0-.6.1-1.3.4-1.8" fill="#F57C00" />
          <path d="M64.7 122.9L18.8 88.5 63.3 41.6c1.1-1.2 3.1-1.2 4.2 0l42.6 46.9-45.4 34.4z" fill="#FFCA28" />
        </svg>
      ),
    },

    // DevOps & Hardware
    {
      id: 'docker',
      name: 'Docker',
      category: 'devops',
      role: 'Containerized Reliable Deployments',
      experience: 'Zero Drift',
      color: 'text-[#2496ED]',
      bgGlow: 'from-[#2496ED]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#2496ED]">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.185.185v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zM23.79 10.9a4.8 4.8 0 00-2.484-2.88 4.9 4.9 0 00-.518-.215c-.276-.093-.563-.153-.854-.18a6.3 6.3 0 00-.63-.03c-.394 0-.783.04-1.162.12-.225.048-.444.116-.656.204a3.9 3.9 0 00-.36.177 3.3 3.3 0 00-.324.21c-.135.105-.262.221-.38.347l-.147.164-.202.247c-.033.045-.067.09-.098.136-.086.126-.164.26-.233.4-.047.094-.09.19-.13.288-.04.099-.074.2-.104.303-.02.072-.037.145-.052.219-.013.064-.023.13-.03.195-.01.077-.016.155-.018.233v.032l.006.113c.012.152.037.303.076.45.02.074.045.148.073.22.03.076.065.15.104.223.08.146.174.286.28.416.035.043.072.085.11.126.136.147.288.278.452.392.052.036.106.07.161.102.146.084.3.153.46.208.132.045.268.077.406.096.11.015.22.022.33.022h.063c.277-.008.55-.046.814-.114.157-.04.31-.096.457-.166.073-.035.144-.075.213-.118.068-.044.134-.092.197-.144.124-.105.239-.224.341-.355.088-.112.164-.234.228-.363.023-.046.044-.093.063-.141.037-.094.067-.19.09-.289.043-.19.066-.386.068-.584v-.058c-.004-.265-.045-.526-.123-.775zM1.162 13.048c.08.76.297 1.5.64 2.18.347.68.814 1.28 1.38 1.77.568.49 1.23.87 1.95 1.13.722.25 1.49.38 2.26.37 1.2 0 2.37-.28 3.44-.82a13.3 13.3 0 002.94-2.07c.88-.83 1.83-1.6 2.84-2.31 1.01-.71 2.08-1.35 3.2-1.9 1.12-.56 2.3-1.01 3.51-1.35 1.22-.34 2.47-.53 3.73-.56.67-.01 1.33.04 1.98.15.65.11 1.28.3 1.87.56.59.26 1.13.6 1.6 1.02.47.41.85.91 1.13 1.47.28.56.45 1.17.49 1.8.04.64-.04 1.28-.24 1.89-.2.6-.52 1.16-.93 1.63-.42.48-.94.86-1.52 1.14-.58.28-1.22.44-1.87.48-.65.04-1.31-.04-1.94-.23-.63-.19-1.22-.49-1.74-.89-.52-.4-.95-.9-1.27-1.47a6.2 6.2 0 01-.6-1.75c-.11-.59-.1-1.19.04-1.77.14-.58.4-1.12.78-1.58.38-.46.86-.82 1.41-1.06z" />
        </svg>
      ),
    },
    {
      id: 'linux',
      name: 'Linux / Ubuntu',
      category: 'devops',
      role: 'Hardened Server & Network Security',
      experience: 'Server Grade',
      color: 'text-[#FCC624]',
      bgGlow: 'from-[#FCC624]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <circle cx="64" cy="64" r="60" fill="#222" stroke="#FCC624" strokeWidth="6" />
          <path d="M64 20c-15.5 0-22 13-22 26 0 10 3 16 3 24-2 3-8 8-8 14 0 12 12 18 27 18s27-6 27-18c0-6-6-11-8-14 0-8 3-14 3-24 0-13-6.5-26-22-26z" fill="#FFF" />
          <circle cx="54" cy="40" r="4" fill="#000" />
          <circle cx="74" cy="40" r="4" fill="#000" />
          <path d="M56 46c0 4 3 8 8 8s8-4 8-8z" fill="#FFA500" />
        </svg>
      ),
    },
    {
      id: 'cloud',
      name: 'Cloud & Networks',
      category: 'devops',
      role: 'AWS, Cloudflare, VPN & Wi-Fi LANs',
      experience: '24/7 Uptime',
      color: 'text-[#FF9900]',
      bgGlow: 'from-[#FF9900]/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FF9900]">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
        </svg>
      ),
    },
    {
      id: 'hardware-pos',
      name: 'ESC/POS & Thermal',
      category: 'devops',
      role: 'Direct Hardware & Receipt Protocol',
      experience: 'Lab Certified',
      color: 'text-amber-400',
      bgGlow: 'from-amber-500/20 to-transparent',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-amber-400 stroke-2">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M7 20h10" />
          <path d="M12 16v4" />
          <line x1="7" y1="8" x2="17" y2="8" strokeWidth="2" strokeLinecap="round" />
          <line x1="7" y1="11" x2="13" y2="11" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const categories = [
    { id: 'all', label: 'All Technologies', count: techStack.length },
    { id: 'frontend', label: 'Frontend & Mobile', count: techStack.filter(t => t.category === 'frontend').length },
    { id: 'backend', label: 'Backend & APIs', count: techStack.filter(t => t.category === 'backend').length },
    { id: 'database', label: 'Databases & Cloud', count: techStack.filter(t => t.category === 'database').length },
    { id: 'devops', label: 'DevOps & Hardware', count: techStack.filter(t => t.category === 'devops').length },
  ];

  const filteredTech = activeCategory === 'all'
    ? techStack
    : techStack.filter(t => t.category === activeCategory);

  return (
    <section id="technologies" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-cyan-900/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[300px] bg-blue-900/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Engineering Excellence & Modern Tech Stack
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Technologies We Use
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              We engineer enterprise-grade solutions using industry-standard languages, modern frameworks, robust databases, and reliable hardware protocols tested in Dubai's premier corporate market.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25 font-bold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      activeCategory === cat.id ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Animated Floating Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredTech.map((tech, idx) => {
            // Give each badge a distinct gentle floating animation timing
            const floatDuration = 4 + (idx % 4) * 0.8;
            const floatDelay = (idx % 3) * 0.4;

            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: idx * 0.05 },
                  y: {
                    duration: floatDuration,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                    delay: floatDelay,
                  },
                }}
                whileHover={{
                  scale: 1.04,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                id={`tech-badge-${tech.id}`}
                className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800/90 hover:border-cyan-500/50 p-5 sm:p-6 flex flex-col justify-between transition-colors shadow-xl group overflow-hidden"
              >
                {/* Ambient Card Background Glow on Hover */}
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${tech.bgGlow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                ></div>

                <div>
                  {/* Top Row: Icon + Experience Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 group-hover:border-slate-700 transition-colors shadow-inner flex items-center justify-center">
                      {tech.svgIcon}
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-slate-950 text-slate-400 border border-slate-800 group-hover:text-cyan-300 group-hover:border-cyan-800/60 transition-colors">
                      {tech.experience}
                    </span>
                  </div>

                  {/* Tech Name */}
                  <h3 className="text-lg font-bold text-white tracking-tight mb-1 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <span>{tech.name}</span>
                  </h3>

                  {/* Role / Description */}
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {tech.role}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 capitalize">{tech.category}</span>
                  <span className="text-cyan-400 font-medium flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Verified
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Seamless Marquee Ribbon Showcase */}
        <FadeInSection direction="up" delay={200} duration={650}>
          <div className="mt-14 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Need a Custom Stack or Migration in Sialkot?
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Whether upgrading an old desktop billing application to modern cloud POS or developing an e-commerce platform with automated receipt printing, we architect solutions with clean, future-proof code.
                </p>
              </div>
            </div>

            <button
              onClick={() => onExploreService && onExploreService('Website Development')}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/60 font-semibold text-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-md"
            >
              <span>Discuss Your Tech Stack</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
