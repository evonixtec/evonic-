import React, { useState, useRef, useEffect } from 'react';
import { Laptop, Printer, Monitor, HardDrive, Cpu, Package } from 'lucide-react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  webpSrc?: string;
  fallbackSrc?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-[16/10]", "aspect-square"
  containerClassName?: string;
  priority?: boolean;
  zoomOnHover?: boolean;
  badge?: string;
  badgeColor?: 'red' | 'blue' | 'emerald' | 'amber' | 'slate';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  webpSrc,
  fallbackSrc,
  aspectRatio = 'aspect-[16/10]',
  containerClassName = '',
  className = '',
  priority = false,
  zoomOnHover = true,
  badge,
  badgeColor = 'red',
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine smart fallback based on product keywords
  const getSmartFallback = (): string => {
    if (fallbackSrc) return fallbackSrc;
    const lower = (alt + ' ' + src).toLowerCase();
    if (lower.includes('printer') || lower.includes('receipt') || lower.includes('tsc')) {
      return '/images/shop/shop_laser_printer.jpg';
    }
    if (lower.includes('desktop') || lower.includes('tower') || lower.includes('pc') || lower.includes('optiplex')) {
      return '/images/shop/shop_desktop_pc.jpg';
    }
    if (lower.includes('pos') || lower.includes('touch') || lower.includes('scanner') || lower.includes('barcode')) {
      return '/images/shop/shop_pos_touchscreen.jpg';
    }
    if (lower.includes('ram') || lower.includes('ssd') || lower.includes('hdd') || lower.includes('drive')) {
      return '/images/shop/shop_nvme_ssd.jpg';
    }
    return '/images/shop/shop_business_laptop.jpg';
  };

  useEffect(() => {
    setCurrentSrc(src);
    setErrorCount(0);
    setIsLoaded(true);
  }, [src]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleImageError = () => {
    if (errorCount === 0) {
      // First attempt: try smart local photographic fallback
      setErrorCount(1);
      setCurrentSrc(getSmartFallback());
    } else if (errorCount === 1) {
      // Second attempt: try universal laptop hero photo
      setErrorCount(2);
      setCurrentSrc('/images/shop/shop_business_laptop.jpg');
    } else {
      // Final fallback reached
      setErrorCount(3);
    }
  };

  const badgeColorClasses = {
    red: 'bg-red-600 text-white',
    blue: 'bg-blue-600 text-white',
    emerald: 'bg-emerald-600 text-white',
    amber: 'bg-amber-600 text-white',
    slate: 'bg-slate-900 text-white',
  }[badgeColor];

  // Helper icon for category if all image loads fail
  const renderCategoryIcon = () => {
    const lower = alt.toLowerCase();
    if (lower.includes('printer')) return <Printer className="w-10 h-10 text-red-600" />;
    if (lower.includes('desktop')) return <Monitor className="w-10 h-10 text-red-600" />;
    if (lower.includes('ram') || lower.includes('ssd')) return <HardDrive className="w-10 h-10 text-red-600" />;
    if (lower.includes('processor') || lower.includes('chip')) return <Cpu className="w-10 h-10 text-red-600" />;
    if (lower.includes('laptop')) return <Laptop className="w-10 h-10 text-red-600" />;
    return <Package className="w-10 h-10 text-red-600" />;
  };

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${aspectRatio} ${containerClassName} ${
        zoomOnHover ? 'group' : ''
      }`}
    >
      {errorCount >= 3 ? (
        /* Clean Apple Crystal White fallback card if image totally unavailable */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-6 text-center border border-slate-200">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center mb-3">
            {renderCategoryIcon()}
          </div>
          <p className="text-xs font-bold text-[#1E1E1E] line-clamp-1 max-w-xs mb-1">{alt}</p>
          <span className="text-[10px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
            Dubai Certified Stock • Tested in Lab
          </span>
        </div>
      ) : (
        /* Image Element - always opacity-100 and clearly visible */
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
            zoomOnHover ? 'group-hover:scale-105' : ''
          } opacity-100 ${className}`}
          {...rest}
        />
      )}

      {/* Optional Badge Overlay */}
      {badge && (
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs ${badgeColorClasses}`}
          >
            {badge}
          </span>
        </div>
      )}
    </div>
  );
};

