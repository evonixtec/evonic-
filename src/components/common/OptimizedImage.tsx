import React, { useState } from 'react';
import { getWebpSource, isWebPFormat } from '../../lib/imageOptimization';
import { ImageOff } from 'lucide-react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  webpSrc?: string;
  fallbackSrc?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-[16/9]", "aspect-[4/3]", "aspect-square"
  containerClassName?: string;
  priority?: boolean; // When true: eager loading & high fetch priority for LCP images
  zoomOnHover?: boolean;
  badge?: string;
  badgeColor?: 'red' | 'blue' | 'emerald' | 'amber' | 'slate';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  webpSrc,
  fallbackSrc,
  aspectRatio = 'aspect-video',
  containerClassName = '',
  className = '',
  priority = false,
  zoomOnHover = true,
  badge,
  badgeColor = 'red',
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  React.useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Derive WebP source if explicitly provided or CDN convertible
  const fallback = fallbackSrc || src;
  const resolvedWebp = webpSrc || (isWebPFormat(currentSrc) ? currentSrc : getWebpSource(currentSrc));

  const handleImageError = () => {
    if (currentSrc !== fallback && fallback) {
      setCurrentSrc(fallback);
    } else {
      setHasError(true);
    }
  };

  const badgeColorClasses = {
    red: 'bg-red-600 text-white',
    blue: 'bg-blue-600 text-white',
    emerald: 'bg-emerald-600 text-white',
    amber: 'bg-amber-600 text-white',
    slate: 'bg-slate-900 text-white',
  }[badgeColor];

  return (
    <div
      className={`relative overflow-hidden bg-slate-900 ${aspectRatio} ${containerClassName} ${
        zoomOnHover ? 'group' : ''
      }`}
    >
      {/* Loading Skeleton Shimmer */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-slate-600 border-t-red-600 animate-spin opacity-70" />
        </div>
      )}

      {/* Resilient Error Fallback State - High-Tech Blueprint Mockup */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 p-6 text-center border border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center mb-3">
            <ImageOff className="w-6 h-6 text-red-400 opacity-80" />
          </div>
          <p className="text-xs font-semibold text-slate-200 line-clamp-1 max-w-md mb-1">{alt}</p>
          <span className="text-[11px] font-mono text-slate-400">
            Interactive Diagnostic Engine • Ready In Browser Runtime
          </span>
        </div>
      ) : (
        /* Modern Picture Element with WebP Source & Fallback */
        <picture className="w-full h-full block">
          {resolvedWebp && resolvedWebp !== currentSrc && (
            <source type="image/webp" srcSet={resolvedWebp} />
          )}
          <img
            src={currentSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'low'}
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-all duration-500 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
            } ${zoomOnHover ? 'group-hover:scale-105' : ''} ${className}`}
            {...rest}
          />
        </picture>
      )}

      {/* Optional Badge Overlay */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs ${badgeColorClasses}`}
          >
            {badge}
          </span>
        </div>
      )}

      {/* WebP Indicator for Search & SEO */}
      <div className="absolute bottom-2 right-2 z-10 pointer-events-none opacity-0 group-hover:opacity-80 transition-opacity">
        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/60 text-emerald-400 backdrop-blur-xs">
          OPTIMIZED • ISO READY
        </span>
      </div>
    </div>
  );
};
