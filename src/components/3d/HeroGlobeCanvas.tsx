import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroGlobeCanvasProps {
  className?: string;
}

export const HeroGlobeCanvas: React.FC<HeroGlobeCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0f, 0);
    container.appendChild(renderer.domElement);

    // Group for the entire rotating network
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Generate Fibonacci sphere node coordinates
    const NODE_COUNT = 160;
    const RADIUS = 8.8;
    const nodePositions: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Add slight randomized jitter for organic tech lattice look
      const jitter = 1 + (Math.sin(i * 3.7) * 0.08);
      nodePositions.push(new THREE.Vector3(x * RADIUS * jitter, y * RADIUS * jitter, z * RADIUS * jitter));
    }

    // 2. Nodes (Points with glowing cyan / electric blue colors)
    const pointsGeometry = new THREE.BufferGeometry();
    const positionsFloat = new Float32Array(NODE_COUNT * 3);
    const colorsFloat = new Float32Array(NODE_COUNT * 3);

    const cyanColor = new THREE.Color(0x00d4ff);
    const purpleColor = new THREE.Color(0xa855f7);
    const whiteColor = new THREE.Color(0xffffff);

    nodePositions.forEach((pos, i) => {
      positionsFloat[i * 3] = pos.x;
      positionsFloat[i * 3 + 1] = pos.y;
      positionsFloat[i * 3 + 2] = pos.z;

      // Color distribution: mostly electric cyan, accent purple, key focal white nodes
      let col = cyanColor;
      if (i % 5 === 0) col = purpleColor;
      if (i % 17 === 0) col = whiteColor;

      colorsFloat[i * 3] = col.r;
      colorsFloat[i * 3 + 1] = col.g;
      colorsFloat[i * 3 + 2] = col.b;
    });

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positionsFloat, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colorsFloat, 3));

    // Create glowing circular particle texture programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(0, 212, 255, 0.85)');
      grad.addColorStop(0.7, 'rgba(168, 85, 247, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.85,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    globeGroup.add(pointsMesh);

    // 3. Interconnecting Glowing Lines between neighboring nodes
    const MAX_DISTANCE = 3.6;
    const lineIndices: number[] = [];
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < MAX_DISTANCE) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );

          // Line alpha/color based on distance
          const alphaFactor = 1 - dist / MAX_DISTANCE;
          const isPurpleArc = (i + j) % 7 === 0;
          const baseColor = isPurpleArc ? purpleColor : cyanColor;

          lineColors.push(
            baseColor.r * alphaFactor, baseColor.g * alphaFactor, baseColor.b * alphaFactor,
            baseColor.r * alphaFactor, baseColor.g * alphaFactor, baseColor.b * alphaFactor
          );
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    globeGroup.add(linesMesh);

    // 4. Inner Wireframe Core Globe (Subtle Icosahedron with low opacity)
    const innerGeometry = new THREE.IcosahedronGeometry(RADIUS * 0.96, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    globeGroup.add(innerMesh);

    // 5. Equatorial Orbital Glowing Ring
    const ringGeometry = new THREE.RingGeometry(RADIUS * 1.25, RADIUS * 1.27, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2.3;
    ringMesh.rotation.y = Math.PI / 6;
    globeGroup.add(ringMesh);

    // 6. Secondary Tilted Orbital Ring with Neon Purple
    const ring2Geometry = new THREE.RingGeometry(RADIUS * 1.45, RADIUS * 1.47, 64);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2Mesh.rotation.x = Math.PI / 3;
    ring2Mesh.rotation.y = -Math.PI / 4;
    globeGroup.add(ring2Mesh);

    // Subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (event.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Constant smooth rotation
      globeGroup.rotation.y = elapsedTime * 0.09;
      globeGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.12;

      // Rotate orbital rings independently
      ringMesh.rotation.z = elapsedTime * 0.06;
      ring2Mesh.rotation.z = -elapsedTime * 0.04;

      // Mouse Parallax with smooth lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX * 3.5;
      camera.position.y = -currentMouseY * 2.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};
