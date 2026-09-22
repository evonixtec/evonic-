import React, { CSSProperties, ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  id?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  id,
  as: Component = 'div',
}) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const getTransformStyle = (): string => {
    if (isIntersecting) {
      return 'translate3d(0, 0, 0) scale(1)';
    }

    switch (direction) {
      case 'up':
        return 'translate3d(0, 32px, 0)';
      case 'down':
        return 'translate3d(0, -32px, 0)';
      case 'left':
        return 'translate3d(32px, 0, 0)';
      case 'right':
        return 'translate3d(-32px, 0, 0)';
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const style: CSSProperties = {
    opacity: isIntersecting ? 1 : 0,
    transform: getTransformStyle(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // smooth ease-out curve
    transitionDelay: `${delay}ms`,
    willChange: isIntersecting ? 'auto' : 'opacity, transform',
  };

  return (
    <Component
      id={id}
      ref={ref as any}
      style={style}
      className={className}
    >
      {children}
    </Component>
  );
};
