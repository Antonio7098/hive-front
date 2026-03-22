import React from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  loading = false,
}) => {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled || loading}
        onClick={() => onChange(!checked)}
        className={`
          relative
          w-12 h-6
          border-2 border-black
          transition-all duration-200 ease-out
          ${checked ? 'bg-accent' : 'bg-bg-secondary'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${loading ? 'opacity-70' : ''}
        `.trim().replace(/\s+/g, ' ')}
      >
        <span
          className={`
            absolute
            top-0.5
            w-4 h-4
            bg-text-primary
            border-2 border-black
            transition-all duration-200 ease-out
            ${checked ? 'left-6' : 'left-0.5'}
          `.trim().replace(/\s+/g, ' ')}
        />
      </button>
      {label && (
        <span className="font-mono text-sm uppercase tracking-wider text-text-primary">
          {label}
        </span>
      )}
    </label>
  );
};
