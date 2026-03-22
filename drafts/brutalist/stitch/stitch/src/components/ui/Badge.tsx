import { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary-container text-on-primary-container',
  secondary: 'bg-secondary-container text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-warning text-black',
  error: 'bg-error-container text-on-error-container',
  neutral: 'bg-surface-container-highest text-on-surface border-2 border-outline',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-2 text-sm',
};

export function Badge({ variant = 'neutral', size = 'md', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        font-headline font-bold uppercase
        border-2 border-black
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
