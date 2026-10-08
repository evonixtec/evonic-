import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowRight, Terminal, Globe, Shield, Sparkles } from 'lucide-react';

export const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Generate Fibonacci Sphere Points
    const count = 160;
    const radius = 8.8;
    const points: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      points.push(
        new THREE.Vector3(
          Math.cos(theta) * rY * radius,
          y * radius,
          Math.sin(theta) * rY * radius
        )
      );
    }

    // Outer Particle Nodes
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.35,
      transparent: true,
      opacity: 0.85,
    });
    const pointsMesh = new THREE.Points(geo, mat);
    globeGroup.add(pointsMesh);

    // Connecting Network Lines
    const linePositions: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (points[i].distanceTo(points[j]) < 3.4) {
          linePositions.push(
            points[i].x,
            points[i].y,
            points[i].z,
            points[j].x,
            points[j].y,
            points[j].z
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.28,
    });
    globeGroup.add(new THREE.LineSegments(lineGeo, lineMat));

    // Inner Glowing Wireframe Core
    const innerGeo = new THREE.IcosahedronGeometry(radius * 0.94, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
    });
    globeGroup.add(new THREE.Mesh(innerGeo, innerMat));

    // Outer Orbital Ring
    const ringGeo = new THREE.RingGeometry(radius * 1.25, radius * 1.28, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    globeGroup.add(ringMesh);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.0028;
      globeGroup.rotation.x += 0.0008;
      ringMesh.rotation.z -= 0.002;

      camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 1.8 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* 3D Three.js Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
        style={{ minHeight: '600px' }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-slate-300 shadow-[0_0_20px_rgba(0,212,255,0.15)]">
          <span className="text-[#00D4FF] font-bold">EVONIXTEC.COM</span>
          <span className="text-slate-600">|</span>
          <span>We Build Digital Future</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            Active Sialkot & Dubai
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase leading-[1.02]">
          We Build <br className="hidden sm:inline" />
          <span className="text-gradient glow-cyan">Digital Future</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-light leading-relaxed">
          Web Development, Native Mobile Apps, Enterprise AI Solutions, and Custom Cloud Platforms
          engineered with immersive 3D spatial experiences.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-cyan-300 to-[#A855F7] text-black font-bold text-sm sm:text-base hover:opacity-95 shadow-[0_0_35px_rgba(0,212,255,0.45)] hover:shadow-[0_0_50px_rgba(0,212,255,0.7)] transition-all flex items-center gap-2"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#services"
            className="px-7 py-3.5 rounded-xl glass-panel hover:glass-panel-glow text-slate-200 hover:text-white text-sm sm:text-base font-medium transition-all flex items-center gap-2"
          >
            <span>View Services</span>
          </a>

          <a
            href="#estimator"
            className="px-6 py-3.5 rounded-xl border border-purple-500/30 bg-purple-950/20 text-purple-300 hover:text-white hover:bg-purple-900/30 text-sm sm:text-base font-mono transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#A855F7]" />
            <span>Scope Estimator</span>
          </a>
        </div>

        {/* Proof Metrics */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10">
          <div className="p-4 rounded-2xl glass-panel text-left hover:border-cyan-500/40 transition-all">
            <div className="text-2xl sm:text-3xl font-black font-display text-white">20+</div>
            <div className="text-xs text-slate-400 mt-1">Years Global Heritage</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-left hover:border-purple-500/40 transition-all">
            <div className="text-2xl sm:text-3xl font-black font-display text-[#00D4FF]">150+</div>
            <div className="text-xs text-slate-400 mt-1">Production Deploys</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-left hover:border-cyan-500/40 transition-all">
            <div className="text-2xl sm:text-3xl font-black font-display text-emerald-400">&lt;15ms</div>
            <div className="text-xs text-slate-400 mt-1">Edge Response Speed</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-left hover:border-purple-500/40 transition-all">
            <div className="text-2xl sm:text-3xl font-black font-display text-[#A855F7]">99.99%</div>
            <div className="text-xs text-slate-400 mt-1">Cloud Reliability</div>
          </div>
        </div>
      </div>
    </section>
  );
};
