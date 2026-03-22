import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
}

export function Input({
  label,
  error,
  leftIcon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-mono font-semibold text-text-secondary uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
            {leftIcon}
          </div>
        )}
        <input
          className={`w-full bg-bg-primary border-3 border-border text-text-primary font-mono focus-brutal focus:border-accent outline-none transition-colors placeholder:text-gray-600 ${
            leftIcon ? 'pl-10 pr-4 py-2' : 'px-4 py-2'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-sm font-mono text-warning">{error}</span>
      )}
    </div>
  );
}
