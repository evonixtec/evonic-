import React, { useState, useEffect, useRef } from 'react';

export type VideoTheme = 
  | 'tech-network' 
  | 'cyber-data' 
  | 'hardware-circuit' 
  | 'corporate-blue' 
  | 'minimal';

export interface VideoBackgroundProps {
  children: React.ReactNode;
  videoSrc?: string;
  posterSrc?: string;
  theme?: VideoTheme;
  overlayOpacity?: 'light' | 'medium' | 'dark' | 'heavy';
  className?: string;
  containerClassName?: string;
}

const THEME_VIDEOS: Record<VideoTheme, { src: string; backupSrc: string; poster: string; glowColor: string }> = {
  'tech-network': {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-network-connection-background-31912-large.mp4',
    backupSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/images/hero_dubai_tech_1790044690065.webp',
    glowColor: 'rgba(6, 182, 212, 0.22)', // Cyan
  },
  'cyber-data': {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4',
    backupSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/images/pos_thermal_setup_1791024110070.webp',
    glowColor: 'rgba(16, 185, 129, 0.22)', // Emerald
  },
  'hardware-circuit': {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-computer-animation-31911-large.mp4',
    backupSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/images/service_hardware_repair_1790044752878.webp',
    glowColor: 'rgba(239, 68, 68, 0.22)', // Red
  },
  'corporate-blue': {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-digital-network-connection-lines-41551-large.mp4',
    backupSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/images/hero_dubai_tech_1790044690065.webp',
    glowColor: 'rgba(59, 130, 246, 0.22)', // Royal Blue
  },
  'minimal': {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-network-connection-background-31912-large.mp4',
    backupSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/images/hero_dubai_tech_1790044690065.webp',
    glowColor: 'rgba(148, 163, 184, 0.15)', // Slate
  },
};

const OVERLAY_CLASSES = {
  light: 'bg-slate-950/60',
  medium: 'bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/85',
  dark: 'bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95',
  heavy: 'bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-slate-950/98',
};

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  children,
  videoSrc,
  posterSrc,
  theme = 'cyber-data',
  overlayOpacity = 'medium',
  className = '',
  containerClassName = '',
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const themeConfig = THEME_VIDEOS[theme] || THEME_VIDEOS['cyber-data'];
  const activeVideoSrc = videoSrc || themeConfig.src;
  const activePoster = posterSrc || themeConfig.poster;

  // Attempt autoplay safely handling browser security policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsVideoLoaded(true);
        })
        .catch(() => {
          // Autoplay was prevented by browser policy (e.g. low battery mode)
          // Fall back gracefully to the dynamic canvas animation
          setIsVideoLoaded(false);
        });
    }
  }, [activeVideoSrc]);

  // IntersectionObserver to pause video off-screen and save device battery/bandwidth
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 60fps Lightweight Dynamic Canvas Simulation (Active when video is loading or fallback)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1,
        a: Math.random() * 0.4 + 0.2,
      });
    }

    let scanY = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle tech grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const size = 48;
      for (let x = 0; x < width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Smooth laser scan beam
      scanY = (scanY + 1.2) % height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 35, 0, scanY + 35);
      scanGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      scanGrad.addColorStop(0.5, themeConfig.glowColor);
      scanGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 35, width, 70);

      // Floating dust particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.a * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [themeConfig.glowColor]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-slate-950 ${containerClassName}`}
    >
      {/* 1. Hardware Accelerated Canvas Visual Ambient Layer (Zero Buffering) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 2. Native HTML5 Video Element with autoPlay, muted, loop, playsInline */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={activePoster}
          onLoadedData={() => setIsVideoLoaded(true)}
          onPlaying={() => setIsVideoLoaded(true)}
          onError={() => {
            setHasVideoError(true);
            setIsVideoLoaded(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transform scale-105 transition-opacity duration-1000 ease-in-out z-1 ${
            isVideoLoaded ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <source src={activeVideoSrc} type="video/mp4" />
          {themeConfig.backupSrc && (
            <source src={themeConfig.backupSrc} type="video/mp4" />
          )}
        </video>
      )}

      {/* 3. Cinematic 4K/2K Glassmorphism Overlay (Preserves WCAG AAA Contrast) */}
      <div 
        className={`absolute inset-0 pointer-events-none z-2 ${OVERLAY_CLASSES[overlayOpacity]} ${className}`} 
      />

      {/* 4. Fine Radial Vignette & Micro Dot Grid for 4K Depth */}
      <div className="absolute inset-0 pointer-events-none z-2 bg-[radial-gradient(circle_at_50%_40%,rgba(15,23,42,0.1),rgba(2,6,23,0.85))] [background-size:100%_100%]" />
      <div className="absolute inset-0 pointer-events-none z-2 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

      {/* 5. Forefront Children Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
