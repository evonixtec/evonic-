import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TechItem {
  name: string;
  category: string;
  color: number;
  textColor: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'Three.js / WebGL', category: '3D & Graphics', color: 0x00d4ff, textColor: '#00D4FF' },
  { name: 'React 19 / Next.js', category: 'Frontend', color: 0x38bdf8, textColor: '#38BDF8' },
  { name: 'TypeScript', category: 'Language', color: 0x60a5fa, textColor: '#60A5FA' },
  { name: 'PyTorch / AI', category: 'Neural Models', color: 0xa855f7, textColor: '#A855F7' },
  { name: 'Node.js & Go', category: 'Backend Systems', color: 0x34d399, textColor: '#34D399' },
  { name: 'Docker / K8s', category: 'Cloud Infrastructure', color: 0x0ea5e9, textColor: '#0EA5E9' },
  { name: 'PostgreSQL / SQL', category: 'Databases', color: 0x818cf8, textColor: '#818CF8' },
  { name: 'Tailwind CSS', category: 'Design Systems', color: 0x06b6d4, textColor: '#06B6D4' },
];

export const TechStackCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTechIndex, setActiveTechIndex] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 16);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Center Core Crystal (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x004466,
      emissiveIntensity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Create 8 orbital tech prisms
    const ORBIT_RADIUS = 6.4;
    const meshNodes: THREE.Mesh[] = [];

    TECH_ITEMS.forEach((tech, i) => {
      const angle = (i / TECH_ITEMS.length) * Math.PI * 2;
      const x = Math.cos(angle) * ORBIT_RADIUS;
      const z = Math.sin(angle) * ORBIT_RADIUS;
      const y = Math.sin(i * 1.5) * 1.2;

      // Polyhedron for tech node
      const nodeGeo = new THREE.OctahedronGeometry(0.85, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: tech.color,
        roughness: 0.2,
        metalness: 0.85,
        wireframe: false,
        emissive: tech.color,
        emissiveIntensity: 0.35,
      });

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.userData = { index: i, originalColor: tech.color };

      // Wireframe overlay
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const wireOverlay = new THREE.Mesh(nodeGeo, wireMat);
      nodeMesh.add(wireOverlay);

      orbitGroup.add(nodeMesh);
      meshNodes.push(nodeMesh);
    });

    // Connecting ring
    const ringGeo = new THREE.RingGeometry(ORBIT_RADIUS - 0.05, ORBIT_RADIUS + 0.05, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    orbitGroup.add(ringMesh);

    // Lights
    const pointLight1 = new THREE.PointLight(0x00d4ff, 4, 30);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 3, 30);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Orbit rotation
      orbitGroup.rotation.y = elapsed * 0.25 + mouseX * 0.5;
      orbitGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15 + mouseY * 0.3;

      // Core rotation
      coreMesh.rotation.x = elapsed * 0.4;
      coreMesh.rotation.y = elapsed * 0.3;

      // Node self-rotations
      meshNodes.forEach((node, idx) => {
        node.rotation.x = elapsed * (1 + idx * 0.1);
        node.rotation.y = elapsed * (1.2 + idx * 0.1);
      });

      // Find node closest to camera in view
      let closestIdx = 0;
      let minDistance = 999;
      const tempVec = new THREE.Vector3();

      meshNodes.forEach((node, idx) => {
        node.getWorldPosition(tempVec);
        const dist = tempVec.distanceTo(camera.position);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveTechIndex(closestIdx);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  const activeTech = TECH_ITEMS[activeTechIndex] || TECH_ITEMS[0];

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] flex items-center justify-center">
      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Target Info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-2xl glass-panel-glow border border-white/10 flex items-center gap-3 backdrop-blur-xl pointer-events-none transition-all duration-300">
        <span
          className="w-3 h-3 rounded-full animate-ping"
          style={{ backgroundColor: activeTech.textColor }}
        />
        <div className="text-left">
          <div className="text-xs font-mono text-slate-400 leading-none">
            {activeTech.category}
          </div>
          <div
            className="text-sm sm:text-base font-bold font-display tracking-tight"
            style={{ color: activeTech.textColor }}
          >
            {activeTech.name}
          </div>
        </div>
      </div>
    </div>
  );
};
