import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'selected' | 'expanded';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const baseClasses = 'bg-bg-secondary border-3 transition-all duration-150';
  
  const variantClasses = {
    default: 'border-border',
    hover: 'border-border hover:border-accent hover:shadow-brutal cursor-pointer',
    selected: 'border-accent shadow-brutal',
    expanded: 'border-border shadow-brutal'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
