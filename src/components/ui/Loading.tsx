import { ReactNode } from 'react';

interface BaseLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const hexagonClipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

interface BrutalSpinnerProps extends BaseLoaderProps {
  thickness?: 'thin' | 'medium' | 'thick';
}

const thicknessMap = {
  thin: 'border-[2px]',
  medium: 'border-[3px]',
  thick: 'border-[4px]',
};

export function BrutalSpinner({ size = 'md', thickness = 'medium', className = '' }: BrutalSpinnerProps) {
  return (
    <div
      className={`
        ${sizeMap[size]} border-outline border-primary-container
        ${thicknessMap[thickness]}
        animate-brutal-spin-fast
        ${className}
      `}
      style={{ clipPath: hexagonClipPath }}
    />
  );
}

export function PulseLoader({ size = 'md', className = '' }: BaseLoaderProps) {
  const hexSizes = {
    sm: 'w-2 h-2',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`
            ${hexSizes[size]} bg-primary-container
            animate-brutal-pulse
          `}
          style={{ clipPath: hexagonClipPath, animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

export function WaveLoader({ size = 'md', className = '' }: BaseLoaderProps) {
  const barHeights = {
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-12',
  };

  return (
    <div className={`flex items-end gap-1 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`
            w-2 ${barHeights[size]} bg-primary-container
          `}
          style={{
            clipPath: hexagonClipPath,
            animation: `brutal-pulse 0.8s ease-in-out infinite`,
            animationDelay: `${i * 100}ms`,
            height: '20%',
          }}
        />
      ))}
    </div>
  );
}

export function TypingLoader({ size = 'md', className = '' }: BaseLoaderProps) {
  const hexSizes = {
    sm: { w: 'w-1', h: 'h-3' },
    md: { w: 'w-2', h: 'h-4' },
    lg: { w: 'w-3', h: 'h-6' },
  };

  const { w: width, h: height } = hexSizes[size];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`
            ${width} ${height} bg-primary-container
          `}
          style={{
            clipPath: hexagonClipPath,
            animation: `brutal-fade-in-out 1s ease-in-out infinite`,
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function OrbitLoader({ size = 'md', className = '' }: BaseLoaderProps) {
  const sizes = {
    sm: { outer: 'w-8 h-8 border-[2px]', inner: 'w-4 h-4 border-[2px]' },
    md: { outer: 'w-16 h-16 border-[3px]', inner: 'w-8 h-8 border-[3px]' },
    lg: { outer: 'w-24 h-24 border-[4px]', inner: 'w-12 h-12 border-[4px]' },
  };

  const { outer, inner } = sizes[size];

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      <div className={`absolute inset-0 ${outer} border-primary-container border-t-transparent animate-brutal-spin-fast`} style={{ clipPath: hexagonClipPath }} />
      <div className={`absolute inset-2 ${inner} border-primary-container border-b-transparent animate-brutal-spin-slow`} style={{ clipPath: hexagonClipPath }} />
    </div>
  );
}

export function StackLoader({ size = 'md', className = '' }: BaseLoaderProps) {
  const hexSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`
            ${hexSizes[size]} bg-primary-container animate-brutal-stagger
          `}
          style={{ clipPath: hexagonClipPath, animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

export function DotsLoader({ size = 'md', className = '' }: BaseLoaderProps) {
  const hexSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`
            ${hexSizes[size]} bg-primary-container
          `}
          style={{
            clipPath: hexagonClipPath,
            animation: `brutal-bounce 0.6s ease-in-out infinite`,
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function ShimmerLoader({ width = 'w-full', height = 'h-4', className = '' }: BaseLoaderProps & { width?: string; height?: string }) {
  return (
    <div
      className={`
        ${width} ${height} bg-surface-container-high overflow-hidden relative
        ${className}
      `}
      style={{ clipPath: hexagonClipPath }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-container/30 to-transparent"
        style={{
          animation: 'brutal-wipe 1.5s ease-in-out infinite',
        }}
      />
    </div>
  );
}

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ width = '100%', height = '1rem', className = '' }: SkeletonProps) {
  return (
    <div
      className={`bg-surface-container-high animate-pulse ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        clipPath: hexagonClipPath,
      }}
    />
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-surface-container border-[3px] border-outline p-6 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <Skeleton width={60} height={20} />
        <Skeleton width={40} height={16} />
      </div>
      <Skeleton width="80%" height={24} className="mb-3" />
      <Skeleton width="100%" height={48} className="mb-6" />
      <div className="flex justify-between items-center pt-6 border-t-2 border-outline-variant">
        <Skeleton width={80} height={20} />
        <Skeleton width={60} height={16} />
      </div>
    </div>
  );
}

interface LoadingOverlayProps {
  message?: string;
  variant?: 'spinner' | 'dots' | 'typing' | 'orbit';
  children?: ReactNode;
}

export function LoadingOverlay({ message, variant = 'spinner', children }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 bg-surface-dim/95 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        {variant === 'spinner' && <BrutalSpinner size="lg" thickness="thick" />}
        {variant === 'dots' && <DotsLoader size="lg" />}
        {variant === 'typing' && <TypingLoader size="lg" />}
        {variant === 'orbit' && <OrbitLoader size="lg" />}
        {message && (
          <p className="font-headline font-black uppercase tracking-[0.3em] text-primary-container animate-brutal-fade-in-out">
            {message}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = 'LOADING...' }: PageLoaderProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-10">
      <div className="relative">
        <div
          className="absolute inset-0 bg-primary-container/30 animate-ping"
          style={{ clipPath: hexagonClipPath, animationDuration: '1.5s' }}
        />
        <OrbitLoader size="lg" />
      </div>
      <div className="text-center space-y-4">
        <p className="font-headline font-black text-3xl uppercase tracking-[0.4em] text-primary-container">
          {message}
        </p>
        <div className="flex justify-center">
          <TypingLoader size="md" />
        </div>
      </div>
    </div>
  );
}

export function InlineLoader({ size = 'sm', className = '' }: BaseLoaderProps) {
  const sizes = {
    sm: 'w-3 h-3 border-[2px]',
    md: 'w-4 h-4 border-[3px]',
    lg: 'w-6 h-6 border-[4px]',
  };

  return (
    <div
      className={`
        ${sizes[size]} border-primary-container border-t-transparent
        animate-brutal-spin-fast
        ${className}
      `}
      style={{ clipPath: hexagonClipPath }}
    />
  );
}

interface ButtonLoaderProps {
  className?: string;
}

export function ButtonLoader({ className = '' }: ButtonLoaderProps) {
  return (
    <div
      className={`
        w-4 h-4 border-2 border-current border-t-transparent
        animate-brutal-spin-fast
        ${className}
      `}
      style={{ clipPath: hexagonClipPath }}
    />
  );
}

export function HoneycombLoader({ size = 'md', className = '' }: BaseLoaderProps) {
  const hexSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`grid grid-cols-3 gap-1 ${className}`}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className={`
            ${hexSizes[size]} bg-primary-container animate-brutal-pulse
          `}
          style={{
            clipPath: hexagonClipPath,
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}
