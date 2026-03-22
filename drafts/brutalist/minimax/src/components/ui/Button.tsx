import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    font-mono font-semibold uppercase tracking-wider
    border-2 border-black
    transition-all duration-150 ease-out
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `;

  const variantStyles = {
    primary: `
      bg-accent text-bg-primary 
      hover:bg-accent-hover hover:shadow-brutal-hover hover:-translate-y-0.5
      active:translate-y-0 active:shadow-none
    `,
    secondary: `
      bg-bg-elevated text-text-primary border-border
      hover:bg-border hover:shadow-brutal-hover hover:-translate-y-0.5
      active:translate-y-0 active:shadow-none
    `,
    ghost: `
      bg-transparent text-text-primary border-transparent
      hover:bg-bg-elevated hover:border-border
      active:bg-bg-secondary
    `,
    danger: `
      bg-error text-white 
      hover:bg-red-600 hover:shadow-brutal-hover hover:-translate-y-0.5
      active:translate-y-0 active:shadow-none
    `,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
