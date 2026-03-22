import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'font-mono font-semibold uppercase tracking-wider transition-all duration-150 border-3 focus-brutal disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-accent text-bg-primary border-bg-primary shadow-brutal hover:shadow-brutal-hover hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-brutal-active active:translate-x-[2px] active:translate-y-[2px]',
    secondary: 'bg-bg-elevated text-text-primary border-border shadow-brutal hover:border-accent hover:shadow-brutal-hover hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-brutal-active active:translate-x-[2px] active:translate-y-[2px]',
    ghost: 'bg-transparent text-text-secondary border-transparent hover:text-accent hover:border-accent',
    danger: 'bg-bg-elevated text-warning border-warning shadow-brutal hover:bg-warning hover:text-bg-primary hover:shadow-brutal-hover hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-brutal-active active:translate-x-[2px] active:translate-y-[2px]'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </span>
    </button>
  );
}
