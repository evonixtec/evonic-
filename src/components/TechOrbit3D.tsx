import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Orbit, Layers, Sparkles, Terminal } from 'lucide-react';

interface TechNode {
  name: string;
  category: 'Frontend & 3D' | 'Backend & Cloud' | 'AI & Data' | 'Mobile';
  detail: string;
  speed: number;
  radius: number;
  color: string;
}

export const TechOrbit3D: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<string>('Three.js');

  const techNodes: TechNode[] = [
    { name: 'Three.js', category: 'Frontend & 3D', detail: 'Spatial 3D Canvas, WebGL Shaders & 60FPS physics', speed: 0.008, radius: 5.5, color: '#00D4FF' },
    { name: 'React 19', category: 'Frontend & 3D', detail: 'Concurrent mode, Server Actions, ultra-lean render trees', speed: 0.012, radius: 7.5, color: '#61DAFB' },
    { name: 'Next.js 15', category: 'Frontend & 3D', detail: 'Edge compute, SSR, Turbopack, enterprise routing', speed: 0.009, radius: 9.5, color: '#ffffff' },
    { name: 'Gemini API', category: 'AI & Data', detail: 'Multimodal generative reasoning, code synthesis & streaming', speed: 0.007, radius: 6.2, color: '#A855F7' },
    { name: 'PyTorch', category: 'AI & Data', detail: 'Custom neural architectures, embeddings & fine-tuning', speed: 0.011, radius: 8.2, color: '#EE4C2C' },
    { name: 'Go / Golang', category: 'Backend & Cloud', detail: 'High-concurrency microservices, sub-millisecond gRPC channels', speed: 0.014, radius: 6.8, color: '#00ADD8' },
    { name: 'PostgreSQL', category: 'Backend & Cloud', detail: 'ACID compliance, pgvector spatial indexing, partitioned tables', speed: 0.006, radius: 8.8, color: '#336791' },
    { name: 'Docker / K8s', category: 'Backend & Cloud', detail: 'Automated container orchestration, zero-downtime rolling deploys', speed: 0.010, radius: 10.5, color: '#2496ED' },
    { name: 'React Native', category: 'Mobile', detail: 'Native thread execution, smooth iOS & Android mobile ecosystem', speed: 0.013, radius: 7.2, color: '#61DAFB' },
    { name: 'Flutter', category: 'Mobile', detail: 'Skia/Impeller hardware accelerated 120Hz canvas rendering', speed: 0.008, radius: 9.0, color: '#02569B' },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    const container = canvasRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Glowing Central Core
    const coreGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbitGroup.add(coreMesh);

    // Orbital Rings
    const ringRadii = [5.5, 6.5, 7.5, 8.8, 10.0];
    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.02, r + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x00d4ff : 0xa855f7,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + (idx * 0.08);
      ringMesh.rotation.y = idx * 0.1;
      orbitGroup.add(ringMesh);
    });

    // Tech Node Spheres
    const nodeMeshes: { mesh: THREE.Mesh; angle: number; speed: number; radius: number }[] = [];
    techNodes.forEach((node, idx) => {
      const nodeGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (idx / techNodes.length) * Math.PI * 2;
      mesh.position.set(
        Math.cos(angle) * node.radius,
        Math.sin(angle * 1.5) * 1.2,
        Math.sin(angle) * node.radius
      );
      orbitGroup.add(mesh);
      nodeMeshes.push({ mesh, angle, speed: node.speed, radius: node.radius });
    });

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      orbitGroup.rotation.y += deltaX * 0.005;
      orbitGroup.rotation.x += deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      coreMesh.rotation.y += 0.01;
      coreMesh.rotation.x += 0.005;

      nodeMeshes.forEach((item) => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.radius;
        item.mesh.position.y = Math.sin(item.angle * 2) * 1.2;
      });

      if (!isDragging) {
        orbitGroup.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
    };
  }, []);

  const activeNodeData = techNodes.find((t) => t.name === selectedTech) || techNodes[0];

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-xs font-mono text-[#A855F7]">
            <Orbit className="w-3.5 h-3.5" />
            <span>02. Architecture & Engine Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            Interactive <br />
            <span className="text-gradient">3D Tech Orbit</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Drag to rotate the 3D orbital constellation. Click any technology badge below to inspect architecture details.
          </p>
        </div>

        {/* 3D Orbit Display & Interactive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* 3D Canvas Visualizer */}
          <div className="lg:col-span-2 rounded-3xl glass-panel border border-white/10 p-4 relative h-[440px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
            <div ref={canvasRef} className="w-full h-full" />
            <div className="absolute bottom-4 left-6 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-400 pointer-events-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Click & Drag to rotate orbit</span>
            </div>
          </div>

          {/* Active Node Detail Card */}
          <div className="rounded-3xl glass-panel-glow border border-cyan-500/30 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-[#00D4FF]">
                {activeNodeData.category}
              </span>
              <span className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: activeNodeData.color }}></span>
            </div>

            <div>
              <h3 className="text-3xl font-black font-display text-white tracking-tight">{activeNodeData.name}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">{activeNodeData.detail}</p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="text-xs font-mono text-slate-400">Quick Select:</div>
              <div className="flex flex-wrap gap-2">
                {techNodes.map((tech) => (
                  <button
                    key={tech.name}
                    onClick={() => setSelectedTech(tech.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedTech === tech.name
                        ? 'bg-gradient-to-r from-[#00D4FF] to-[#A855F7] text-black font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                    }`}
                  >
                    {tech.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
