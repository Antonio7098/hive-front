import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface-variant mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-surface-container-lowest border-2 border-outline
            px-4 py-2 text-sm font-headline uppercase tracking-widest
            focus:outline-none focus:border-primary-container focus:ring-0
            placeholder:text-on-surface-variant/50
            ${error ? 'border-error' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-error font-mono">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
