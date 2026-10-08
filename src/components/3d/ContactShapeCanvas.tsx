import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ContactShapeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Torus Knot Shape (Futuristic cyber knot)
    const geometry = new THREE.TorusKnotGeometry(2.4, 0.65, 120, 24, 2, 3);

    // Outer Glowing Wireframe
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    scene.add(wireMesh);

    // Inner Glossy Core
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a0933,
      emissive: 0xa855f7,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(geometry, coreMat);
    scene.add(coreMesh);

    // Lights
    const light1 = new THREE.PointLight(0x00d4ff, 5, 25);
    light1.position.set(6, 6, 6);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xa855f7, 4, 25);
    light2.position.set(-6, -6, -6);
    scene.add(light2);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // Mouse Tracking
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = x * 1.5;
      targetRotX = y * 1.5;
    };
    container.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      wireMesh.rotation.x = t * 0.35 + targetRotX;
      wireMesh.rotation.y = t * 0.45 + targetRotY;
      wireMesh.rotation.z = Math.sin(t * 0.2) * 0.2;

      coreMesh.rotation.copy(wireMesh.rotation);

      // Pulse emissive
      coreMat.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.2;

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
      geometry.dispose();
      wireMat.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-pointer" />
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-400 pointer-events-none backdrop-blur-md">
        3D Quantum Core · Interactive
      </div>
    </div>
  );
};
