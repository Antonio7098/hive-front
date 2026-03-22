import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-mono text-xs uppercase tracking-wider text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
            {icon}
          </span>
        )}
        <input
          className={`
            w-full
            bg-bg-secondary
            border-2 ${error ? 'border-error' : 'border-border'}
            text-text-primary
            font-mono text-sm
            px-4 py-2
            placeholder:text-text-secondary/50
            focus:outline-none focus:border-accent
            transition-colors duration-150
            ${icon ? 'pl-10' : ''}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
      </div>
      {error && (
        <span className="font-mono text-xs text-error">{error}</span>
      )}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-mono text-xs uppercase tracking-wider text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full
          bg-bg-secondary
          border-2 ${error ? 'border-error' : 'border-border'}
          text-text-primary
          font-mono text-sm
          px-4 py-2
          placeholder:text-text-secondary/50
          focus:outline-none focus:border-accent
          transition-colors duration-150
          resize-none
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
      {error && (
        <span className="font-mono text-xs text-error">{error}</span>
      )}
    </div>
  );
};
