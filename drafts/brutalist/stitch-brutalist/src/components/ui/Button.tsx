import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-container text-on-primary-container hover:bg-primary-fixed',
  secondary: 'bg-surface-container-high text-on-surface border-2 border-outline hover:bg-outline hover:text-black',
  ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-high',
  danger: 'bg-error-container/20 border-2 border-error text-error hover:bg-error hover:text-on-error',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-1 px-3 text-xs',
  md: 'py-3 px-6 text-sm',
  lg: 'py-4 px-8 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        font-headline font-bold uppercase tracking-widest
        border-2 border-black
        transition-all duration-75
        disabled:opacity-50 disabled:cursor-not-allowed
        active:translate-x-1 active:translate-y-1 active:shadow-none
        shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hard-hover)]
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
