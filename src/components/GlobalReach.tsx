import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe2,
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  Cpu,
  CheckCircle2,
  Activity,
  Zap,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { FadeInSection } from './FadeInSection';
import { SectionId } from '../types';

interface HubInfo {
  id: 'dubai' | 'sialkot';
  city: string;
  country: string;
  flag: string;
  role: string;
  established: string;
  coordinates: [number, number]; // [longitude, latitude]
  coordsLabel: string;
  badge: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
}

const HUBS: Record<'dubai' | 'sialkot', HubInfo> = {
  dubai: {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    role: 'Enterprise Legacy & Cloud Infrastructure Origin',
    established: '2004 – 20+ Years Enterprise Service',
    coordinates: [55.2708, 25.2048],
    coordsLabel: '25.2048° N, 55.2708° E',
    badge: '20+ Years UAE Proven',
    description:
      'Where EVONIX TECHNOLOGIES laid its foundational engineering DNA. Over two decades of delivering high-concurrency cloud ERPs, fintech portals, and hospitality management systems across Dubai Internet City, Business Bay, and Abu Dhabi.',
    highlights: [
      'UAE Banking & Commercial grade cybersecurity auditing',
      'Over 100+ mission-critical portals & ERP deployments',
      'International ISO & Gulf data privacy protocols',
      'Continuous 24/7 global cloud infrastructure management',
    ],
    metrics: [
      { label: 'GCC Experience', value: '20+ Years' },
      { label: 'Uptime Standard', value: '99.99%' },
      { label: 'Client Retention', value: '96%' },
    ],
    accentColor: '#38bdf8', // Cyan
  },
  sialkot: {
    id: 'sialkot',
    city: 'Sialkot',
    country: 'Punjab, Pakistan',
    flag: '🇵🇰',
    role: 'Corporate Tech Center, Doorstep IT & Export Systems',
    established: '2024 Expansion – SECP Registered SMC',
    coordinates: [74.5229, 32.4945],
    coordsLabel: '32.4945° N, 74.5229° E',
    badge: 'Direct Sialkot Expansion',
    description:
      'Bringing authentic Dubai enterprise engineering directly to Pakistan. Custom export web platforms for sports & surgical manufacturers, offline-first retail POS setups, and certified doorstep hardware & chip-level repair lab.',
    highlights: [
      'SECP Registered Single Member Company (IT Sector)',
      'Doorstep technician dispatch across Sialkot in 2-4 hours',
      'Turnkey POS & barcode systems for retail shops & supermarkets',
      'Zero-Charge-If-Unresolved transparent hardware guarantee',
    ],
    metrics: [
      { label: 'Doorstep Response', value: '2-4 Hours' },
      { label: 'Service Guarantee', value: 'PKR 0 Risk' },
      { label: 'Local Sialkot Lab', value: 'Fully Equipped' },
    ],
    accentColor: '#34d399', // Emerald
  },
};

// Regional partner/client nodes connected along the corridor
const SATELLITE_NODES = [
  { id: 'abudhabi', name: 'Abu Dhabi', country: 'UAE', coords: [54.3773, 24.4539] as [number, number], type: 'GCC Enterprise Node' },
  { id: 'sharjah', name: 'Sharjah', country: 'UAE', coords: [55.4209, 25.3463] as [number, number], type: 'Commercial Retail Node' },
  { id: 'lahore', name: 'Lahore', country: 'Pakistan', coords: [74.3587, 31.5204] as [number, number], type: 'Regional Tech Exchange' },
  { id: 'karachi', name: 'Karachi', country: 'Pakistan', coords: [67.0011, 24.8607] as [number, number], type: 'Maritime & Logistics Hub' },
  { id: 'islamabad', name: 'Islamabad', country: 'Pakistan', coords: [73.0479, 33.6844] as [number, number], type: 'Corporate Affairs Desk' },
];

const MILESTONES = [
  {
    year: '2004',
    title: 'Dubai IT Operations Founded',
    location: 'Dubai, UAE',
    description: 'Began delivering corporate networking, server setups, and custom desktop enterprise software for businesses in Dubai & Deira trading hubs.',
  },
  {
    year: '2012',
    title: 'Enterprise Cloud & POS Systems',
    location: 'Dubai & Sharjah',
    description: 'Expanded into high-speed cloud portals, hotel inventory software, and barcode retail billing systems across the UAE.',
  },
  {
    year: '2019',
    title: 'Next-Gen Web & Mobile Platforms',
    location: 'Dubai Internet City & Remote Desk',
    description: 'Engineered secure full-stack web applications, e-commerce architectures, and automated data pipelines for international export trade.',
  },
  {
    year: '2024+',
    title: 'Sialkot Tech Center Expansion',
    location: 'Sialkot, Pakistan',
    description: 'Officially launched EVONIX TECHNOLOGIES in Sialkot with SECP incorporation, transferring 20+ years of Dubai expertise to local businesses and exporters.',
  },
];

interface GlobalReachProps {
  onOpenQuote?: (service?: string) => void;
  onNavigateSection?: (sectionId: SectionId) => void;
}

export const GlobalReach: React.FC<GlobalReachProps> = ({ onOpenQuote, onNavigateSection }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedHub, setSelectedHub] = useState<'dubai' | 'sialkot'>('sialkot');
  const [activeTab, setActiveTab] = useState<'map' | 'timeline' | 'standards'>('map');
  const [showSatellites, setShowSatellites] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [latencySim, setLatencySim] = useState(38);

  // Periodic latency simulation for the high-speed data bridge
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencySim(36 + Math.floor(Math.random() * 8));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // D3 Projection and SVG Rendering
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Map Dimensions
    const width = 960;
    const height = 520;

    // Geographic Projection calibrated for Middle East & South Asia
    // Lon range ~ 45°E to 85°E, Lat range ~ 18°N to 40°N
    const projection = d3
      .geoMercator()
      .center([64, 28.5]) // Centered midway between UAE (55°E) and Pakistan (74°E)
      .scale(980)
      .translate([width / 2, height / 2]);

    const defs = svg.append('defs');

    // Gradient for the primary Dubai-Sialkot Bridge Arc
    const bridgeGradient = defs
      .append('linearGradient')
      .attr('id', 'bridge-arc-gradient')
      .attr('gradientUnits', 'userSpaceOnUse');

    const [dLon, dLat] = HUBS.dubai.coordinates;
    const [sLon, sLat] = HUBS.sialkot.coordinates;
    const pDubai = projection([dLon, dLat]) || [0, 0];
    const pSialkot = projection([sLon, sLat]) || [0, 0];

    bridgeGradient
      .attr('x1', pDubai[0])
      .attr('y1', pDubai[1])
      .attr('x2', pSialkot[0])
      .attr('y2', pSialkot[1]);

    bridgeGradient.append('stop').attr('offset', '0%').attr('stop-color', '#38bdf8').attr('stop-opacity', 1);
    bridgeGradient.append('stop').attr('offset', '50%').attr('stop-color', '#60a5fa').attr('stop-opacity', 0.9);
    bridgeGradient.append('stop').attr('offset', '100%').attr('stop-color', '#34d399').attr('stop-opacity', 1);

    // Glow filter
    const filter = defs.append('filter').attr('id', 'glow').attr('x', '-30%').attr('y', '-30%').attr('width', '160%').attr('height', '160%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Main map container
    const g = svg.append('g').attr('class', 'map-stage');

    // 1. Stylized Coordinate Grid / Graticules
    const graticule = d3.geoGraticule().step([10, 10]);
    const pathGenerator = d3.geoPath().projection(projection);

    g.append('path')
      .datum(graticule)
      .attr('class', 'graticule')
      .attr('d', pathGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 0.6)
      .attr('stroke-dasharray', '2,4')
      .attr('opacity', 0.5);

    // 2. Simplified Regional Land Geometry (Outlines representing Arabian Peninsula, Iran, Pakistan, Western India)
    // Custom GeoJSON feature set covering regional landmass polygon
    const landPolygon: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        // Arabian Peninsula (UAE, Oman, Saudi Arabia)
        {
          type: 'Feature',
          properties: { name: 'Arabia' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [45, 13],
                [53, 16],
                [59, 22],
                [56, 26],
                [55, 25], // UAE coast
                [50, 26],
                [48, 30],
                [43, 31],
                [40, 28],
                [42, 20],
                [45, 13],
              ],
            ],
          },
        },
        // Iran & Persian Gulf north coast
        {
          type: 'Feature',
          properties: { name: 'Iran' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [48, 30],
                [52, 28],
                [57, 26],
                [62, 25],
                [63, 31],
                [60, 36],
                [52, 38],
                [46, 37],
                [48, 30],
              ],
            ],
          },
        },
        // Pakistan, Afghanistan & North-West India Corridor
        {
          type: 'Feature',
          properties: { name: 'Pakistan & Surrounds' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [62, 25], // Gwadar/Makran coast
                [67, 24.5], // Karachi
                [70, 23.5], // Rann of Kutch
                [73, 26], // Rajasthan
                [76, 30], // Punjab/Haryana
                [77, 34], // Kashmir
                [74.5, 37], // Northern Areas
                [71, 36], // Hindu Kush
                [66, 32], // Baluchistan north
                [62, 28],
                [62, 25],
              ],
            ],
          },
        },
      ],
    };

    // Draw Landmasses
    g.selectAll('path.land')
      .data(landPolygon.features)
      .enter()
      .append('path')
      .attr('class', 'land')
      .attr('d', pathGenerator)
      .attr('fill', '#091322')
      .attr('stroke', '#1e3a5f')
      .attr('stroke-width', 1.2)
      .attr('stroke-linejoin', 'round')
      .attr('opacity', 0.85);

    // 3. Persian Gulf & Arabian Sea Water Body Labeling
    const waterLabels = [
      { text: 'ARABIAN SEA', coords: [63, 20.5] as [number, number] },
      { text: 'GULF OF OMAN', coords: [58.5, 24.2] as [number, number] },
    ];

    g.selectAll('text.water-label')
      .data(waterLabels)
      .enter()
      .append('text')
      .attr('class', 'water-label')
      .attr('x', (d) => (projection(d.coords) || [0, 0])[0])
      .attr('y', (d) => (projection(d.coords) || [0, 0])[1])
      .attr('text-anchor', 'middle')
      .attr('fill', '#1e293b')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace')
      .attr('letter-spacing', '3px')
      .text((d) => d.text);

    // 4. Compute Curved Bridge Path between Dubai and Sialkot
    // Quadratic Bézier with control point pulled upward across the Iranian/Makran arc
    const dx = pSialkot[0] - pDubai[0];
    const dy = pSialkot[1] - pDubai[1];
    // Control point pulled slightly upward for an aesthetic ballistic curve
    const ctrlX = pDubai[0] + dx * 0.48;
    const ctrlY = pDubai[1] + dy * 0.5 - 65;

    const bridgeArcPath = `M ${pDubai[0]} ${pDubai[1]} Q ${ctrlX} ${ctrlY} ${pSialkot[0]} ${pSialkot[1]}`;

    // Under-glow path
    g.append('path')
      .attr('d', bridgeArcPath)
      .attr('fill', 'none')
      .attr('stroke', '#0284c7')
      .attr('stroke-width', 6)
      .attr('opacity', 0.25)
      .attr('filter', 'url(#glow)');

    // Main bridge path
    const mainArc = g
      .append('path')
      .attr('id', 'main-bridge-arc')
      .attr('d', bridgeArcPath)
      .attr('fill', 'none')
      .attr('stroke', 'url(#bridge-arc-gradient)')
      .attr('stroke-width', 2.8)
      .attr('stroke-linecap', 'round')
      .attr('stroke-dasharray', '8,4')
      .attr('opacity', 0.95);

    // Animated dashed stroke
    let offset = 0;
    const timer = d3.timer(() => {
      offset = (offset - 0.7) % 24;
      mainArc.attr('stroke-dashoffset', offset);
    });

    // 5. Flowing Data Packet Particles along the Curve
    const particleCount = 4;
    const arcNode = mainArc.node();
    const pathLength = arcNode ? arcNode.getTotalLength() : 0;

    const particles = g
      .selectAll('circle.particle')
      .data(d3.range(particleCount))
      .enter()
      .append('circle')
      .attr('class', 'particle')
      .attr('r', 3.5)
      .attr('fill', '#38bdf8')
      .attr('filter', 'url(#glow)')
      .attr('opacity', 0.9);

    let progress = 0;
    const particleTimer = d3.timer(() => {
      if (!arcNode) return;
      progress = (progress + 0.0016) % 1;

      particles.each(function (_, i) {
        const pFrac = (progress + i / particleCount) % 1;
        const pt = arcNode.getPointAtLength(pFrac * pathLength);
        d3.select(this)
          .attr('cx', pt.x)
          .attr('cy', pt.y)
          .attr('r', 3 + Math.sin(pFrac * Math.PI) * 2)
          .attr('fill', pFrac > 0.5 ? '#34d399' : '#38bdf8');
      });
    });

    // 6. Draw Satellite Nodes if enabled
    if (showSatellites) {
      SATELLITE_NODES.forEach((node) => {
        const pt = projection(node.coords);
        if (!pt) return;

        // Subtle link to closest primary hub
        const isGulf = node.coords[0] < 60;
        const targetPt = isGulf ? pDubai : pSialkot;

        g.append('line')
          .attr('x1', pt[0])
          .attr('y1', pt[1])
          .attr('x2', targetPt[0])
          .attr('y2', targetPt[1])
          .attr('stroke', '#334155')
          .attr('stroke-width', 0.8)
          .attr('stroke-dasharray', '3,3')
          .attr('opacity', 0.6);

        // Satellite circle
        const satG = g
          .append('g')
          .attr('transform', `translate(${pt[0]}, ${pt[1]})`)
          .attr('class', 'cursor-pointer')
          .on('mouseenter', () => setHoveredPoint(node.name))
          .on('mouseleave', () => setHoveredPoint(null));

        satG
          .append('circle')
          .attr('r', 4)
          .attr('fill', '#1e293b')
          .attr('stroke', '#64748b')
          .attr('stroke-width', 1.5);

        satG
          .append('text')
          .attr('y', 14)
          .attr('text-anchor', 'middle')
          .attr('fill', '#94a3b8')
          .attr('font-size', '9px')
          .attr('font-family', 'sans-serif')
          .attr('font-weight', '500')
          .text(node.name);
      });
    }

    // 7. Render Primary Hubs: Dubai & Sialkot
    const hubsData = [HUBS.dubai, HUBS.sialkot];

    hubsData.forEach((hub) => {
      const pt = projection(hub.coordinates);
      if (!pt) return;

      const isDubai = hub.id === 'dubai';
      const color = isDubai ? '#38bdf8' : '#34d399';
      const isSelected = selectedHub === hub.id;

      const hubG = g
        .append('g')
        .attr('transform', `translate(${pt[0]}, ${pt[1]})`)
        .attr('class', 'cursor-pointer')
        .on('click', () => setSelectedHub(hub.id))
        .on('mouseenter', () => setHoveredPoint(hub.city))
        .on('mouseleave', () => setHoveredPoint(null));

      // Radar Ripple Pulse (CSS animated via HTML or SVG circles)
      hubG
        .append('circle')
        .attr('r', 16)
        .attr('fill', color)
        .attr('opacity', 0.15)
        .attr('class', 'animate-ping')
        .style('animation-duration', isDubai ? '2.5s' : '2s');

      hubG
        .append('circle')
        .attr('r', isSelected ? 13 : 10)
        .attr('fill', `${color}25`)
        .attr('stroke', color)
        .attr('stroke-width', 1.5)
        .attr('filter', 'url(#glow)');

      // Inner solid core
      hubG
        .append('circle')
        .attr('r', isSelected ? 6 : 4.5)
        .attr('fill', color);

      // City Label Box
      const labelY = isDubai ? -22 : -24;
      const labelG = hubG.append('g').attr('transform', `translate(0, ${labelY})`);

      const labelText = isDubai ? 'DUBAI HUB (20+ Yrs)' : 'SIALKOT TECH CENTER';
      const labelWidth = isDubai ? 130 : 142;

      labelG
        .append('rect')
        .attr('x', -labelWidth / 2)
        .attr('y', -12)
        .attr('width', labelWidth)
        .attr('height', 22)
        .attr('rx', 6)
        .attr('fill', '#020617')
        .attr('stroke', isSelected ? color : '#334155')
        .attr('stroke-width', isSelected ? 1.5 : 1)
        .attr('filter', isSelected ? 'url(#glow)' : null);

      labelG
        .append('text')
        .attr('y', 2)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected ? '#ffffff' : '#cbd5e1')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('letter-spacing', '0.5px')
        .text(labelText);
    });

    // Clean up timers on unmount
    return () => {
      timer.stop();
      particleTimer.stop();
    };
  }, [selectedHub, showSatellites]);

  const activeHubInfo = HUBS[selectedHub];

  return (
    <section id="reach" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background radial spotlights */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-cyan-950/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-emerald-950/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300 shadow-inner">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>International Technology Corridor</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Global Reach: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">Dubai to Sialkot</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Bridging 20+ years of high-concurrency enterprise IT experience in the United Arab Emirates with our modern tech center in Sialkot, Pakistan.
            </p>

            {/* View Mode Switcher */}
            <div className="pt-3 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveTab('map')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'map'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Interactive Geo-Bridge</span>
              </button>

              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'timeline'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>20-Year Evolution (2004–2026)</span>
              </button>

              <button
                onClick={() => setActiveTab('standards')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'standards'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Dubai Standard Parity</span>
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* Tab 1: Interactive D3 Geo-Bridge Map & Hub Inspection Panel */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: D3 Interactive SVG Canvas */}
            <div className="lg:col-span-8 rounded-3xl bg-slate-900/70 border border-slate-800/90 shadow-2xl p-4 sm:p-6 backdrop-blur-xl relative overflow-hidden">
              {/* Map Canvas Header Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/70 text-emerald-300 border border-emerald-800/50 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live Sync Active</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Latency: <strong className="text-cyan-300">~{latencySim} ms</strong>
                  </span>
                </div>

                {/* Hub Selection Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedHub('dubai')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedHub === 'dubai'
                        ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>🇦🇪 Dubai Hub</span>
                  </button>

                  <button
                    onClick={() => setSelectedHub('sialkot')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedHub === 'sialkot'
                        ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>🇵🇰 Sialkot Center</span>
                  </button>

                  <button
                    onClick={() => setShowSatellites((prev) => !prev)}
                    className={`p-1.5 rounded-lg text-[11px] border transition-colors cursor-pointer ${
                      showSatellites
                        ? 'bg-slate-800 border-cyan-800/80 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                    title="Toggle Regional Satellite Nodes"
                  >
                    <Layers className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Responsive SVG Map Viewport */}
              <div ref={containerRef} className="w-full relative aspect-[16/9] min-h-[340px] sm:min-h-[420px] rounded-2xl bg-[#030914] border border-slate-800/80 overflow-hidden flex items-center justify-center">
                <svg
                  ref={svgRef}
                  viewBox="0 0 960 520"
                  className="w-full h-full select-none"
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* Floating legend overlay on the map */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 p-2.5 sm:p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md text-[10px] sm:text-xs text-slate-300 space-y-1.5 shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50"></span>
                    <span className="font-semibold text-white">Dubai Hub:</span>
                    <span className="text-slate-400">20+ Years UAE Operations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"></span>
                    <span className="font-semibold text-white">Sialkot Center:</span>
                    <span className="text-slate-400">Direct Pakistan Expansion</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-4 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400"></span>
                    <span>High-Speed Bi-Directional Engineering Bridge</span>
                  </div>
                </div>

                {/* Hover indicator banner */}
                {hoveredPoint && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-xs text-cyan-300 font-mono shadow-lg">
                    Inspecting: <strong className="text-white">{hoveredPoint}</strong>
                  </div>
                )}
              </div>

              {/* Sub-banner details */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Distance Bridged</div>
                  <div className="text-sm font-bold text-white mt-0.5">~1,980 km</div>
                  <div className="text-[10px] text-cyan-400">Dubai ⇄ Sialkot</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Timezone Coverage</div>
                  <div className="text-sm font-bold text-white mt-0.5">Dual Zone</div>
                  <div className="text-[10px] text-cyan-400">GMT+4 & GMT+5</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Code Standards</div>
                  <div className="text-sm font-bold text-white mt-0.5">Enterprise Parity</div>
                  <div className="text-[10px] text-emerald-400">100% Identical</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Sialkot Doorstep</div>
                  <div className="text-sm font-bold text-white mt-0.5">2 - 4 Hours</div>
                  <div className="text-[10px] text-emerald-400">On-Site Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Active Hub Deep-Dive Card */}
            <div className="lg:col-span-4 space-y-5">
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden ring-1 ring-cyan-500/20">
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none"
                  style={{ backgroundColor: activeHubInfo.accentColor, opacity: 0.15 }}
                ></div>

                {/* Hub Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase mb-2 border"
                      style={{
                        backgroundColor: `${activeHubInfo.accentColor}15`,
                        color: activeHubInfo.accentColor,
                        borderColor: `${activeHubInfo.accentColor}40`,
                      }}
                    >
                      {activeHubInfo.badge}
                    </div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-2">
                      <span>{activeHubInfo.flag}</span>
                      <span>{activeHubInfo.city}</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{activeHubInfo.country}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>

                {/* Coordinates & Role */}
                <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/80 space-y-1 mb-4 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Coordinates:</span>
                    <span className="text-slate-200">{activeHubInfo.coordsLabel}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Timeline:</span>
                    <span className="text-cyan-300 font-semibold">{activeHubInfo.established}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  {activeHubInfo.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 mb-6">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Key Capabilities & Protocols
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {activeHubInfo.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 mb-6">
                  {activeHubInfo.metrics.map((m, i) => (
                    <div key={i} className="text-center p-2 rounded-xl bg-slate-950/60 border border-slate-800/50">
                      <div className="text-sm font-extrabold text-white">{m.value}</div>
                      <div className="text-[10px] text-slate-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <button
                  onClick={() => onOpenQuote && onOpenQuote(`${activeHubInfo.city} Operations Inquiry`)}
                  className="w-full py-3 px-4 rounded-xl text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  style={{
                    backgroundColor: activeHubInfo.accentColor,
                    boxShadow: `0 10px 25px -5px ${activeHubInfo.accentColor}40`,
                  }}
                >
                  <span>Connect with {activeHubInfo.city} Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Fast Switcher Card */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Switch focus:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedHub(selectedHub === 'dubai' ? 'sialkot' : 'dubai')}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View {selectedHub === 'dubai' ? 'Sialkot Center 🇵🇰' : 'Dubai Hub 🇦🇪'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 20-Year Evolution Timeline (2004 - 2026) */}
        {activeTab === 'timeline' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
              <h3 className="text-2xl font-bold text-white">Two Decades of Continuous Innovation</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                From pioneering Gulf corporate infrastructure in 2004 to establishing Sialkot's benchmark tech center in 2024.
              </p>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-8">
              {MILESTONES.map((m, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Badge */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform shadow-md shadow-cyan-500/30">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  </div>

                  {/* Year Tag on Desktop */}
                  <div className="hidden sm:block absolute -left-36 top-1 text-right w-24">
                    <span className="text-sm font-black text-cyan-400 font-mono">{m.year}</span>
                    <div className="text-[10px] text-slate-500">{m.location}</div>
                  </div>

                  {/* Content card */}
                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 group-hover:border-cyan-500/40 transition-colors shadow-lg">
                    <div className="sm:hidden flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-cyan-400 font-mono">{m.year}</span>
                      <span className="text-[10px] text-slate-400">{m.location}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-1.5">{m.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800 text-center">
              <button
                onClick={() => onNavigateSection && onNavigateSection('about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Read Full Corporate Story in About Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Dubai Standard Parity Comparison */}
        {activeTab === 'standards' && (
          <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <h3 className="text-2xl font-bold text-white">100% Quality Parity: No Dilution</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Comparing what was built for corporate UAE clients with what EVONIX delivers to Sialkot businesses today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dubai Corporate Benchmark */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-cyan-800/40 space-y-4">
                <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-sm">
                  <span>🇦🇪</span>
                  <span>DUBAI & UAE BENCHMARK</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span><strong>High Concurrency Cloud:</strong> Built for multi-branch hotels and banking portals handling tens of thousands of active sessions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Original Component Sourcing:</strong> Direct enterprise distributor supply chains across Dubai computer plazas (Al Ain Centre).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Rigorous Data Privacy:</strong> Zero unauthorized access to client databases or company documents.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Fixed Transparent Contracts:</strong> Itemized invoices with zero unexpected technician surcharges.</span>
                  </li>
                </ul>
              </div>

              {/* Sialkot Pakistan Delivery */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-800/40 space-y-4">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                  <span>🇵🇰</span>
                  <span>SIALKOT EXPANSION EXECUTION</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Same Architecture, Local Rates:</strong> Export manufacturers and retail shops receive the exact same modern cloud code in PKR.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Authentic Hardware Only:</strong> Direct import components with transparent lab testing and anti-counterfeit checks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Doorstep Tech Visits:</strong> Technicians arrive at your home or factory in Sialkot within 2-4 hours.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Zero Charge If Unresolved:</strong> If your hardware issue cannot be fixed, your fee is PKR 0.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-emerald-950/50 border border-slate-800 text-center">
              <p className="text-xs text-slate-300">
                Experience the Dubai difference in Sialkot today. Book an on-site technician or request a tailored software consultation.
              </p>
              <div className="mt-3 flex justify-center gap-3">
                <button
                  onClick={() => onOpenQuote && onOpenQuote('On-Site Home & Office Service')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
                >
                  Book Sialkot Doorstep Visit
                </button>
                <button
                  onClick={() => onOpenQuote && onOpenQuote('Dubai Standard Web / Software Project')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold transition-all cursor-pointer"
                >
                  Request Web / ERP Proposal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
