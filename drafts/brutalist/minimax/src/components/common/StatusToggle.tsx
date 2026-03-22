import React from 'react';
import { Toggle } from '../ui';

interface StatusToggleProps {
  active: boolean;
  onChange: (active: boolean) => void;
  label?: string;
  loading?: boolean;
}

export const StatusToggle: React.FC<StatusToggleProps> = ({
  active,
  onChange,
  label,
  loading = false,
}) => {
  return (
    <div
      className={`
        flex items-center justify-between
        p-3
        bg-bg-secondary
        border-2 border-black
      `.trim().replace(/\s+/g, ' ')}
    >
      <div className="flex items-center gap-3">
        <span
          className={`
            w-2 h-2 rounded-full
            ${active ? 'bg-success' : 'bg-border'}
          `.trim().replace(/\s+/g, ' ')}
          style={active ? { animation: 'pulse-glow 2s infinite' } : undefined}
        />
        <span className="font-mono text-sm uppercase tracking-wider">
          {label || (active ? 'Active' : 'Inactive')}
        </span>
      </div>
      <Toggle
        checked={active}
        onChange={onChange}
        loading={loading}
      />
    </div>
  );
};
