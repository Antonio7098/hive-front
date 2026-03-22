import React from 'react';

export type BadgeVariant = 'todo' | 'active' | 'completed' | 'archived' | 'draft' | 'high' | 'medium' | 'low';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'active',
  children,
  className = '',
  pulse = false,
}) => {
  const baseStyles = `
    font-mono font-semibold text-xs uppercase tracking-wider
    px-2 py-1
    border-2 border-black
  `;

  const variantStyles: Record<BadgeVariant, string> = {
    todo: 'bg-warning text-bg-primary',
    active: 'bg-accent text-bg-primary',
    completed: 'bg-success text-bg-primary',
    archived: 'bg-border text-text-secondary',
    draft: 'bg-bg-secondary text-text-secondary border-dashed',
    high: 'bg-error text-white',
    medium: 'bg-warning text-bg-primary',
    low: 'bg-success text-bg-primary',
  };

  return (
    <span
      className={`
        ${baseStyles} 
        ${variantStyles[variant]}
        inline-flex items-center gap-1
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={pulse ? { animation: 'pulse-glow 2s infinite' } : undefined}
    >
      {pulse && (
        <span
          className="w-2 h-2 rounded-full bg-current"
          style={pulse ? { animation: 'pulse-glow 2s infinite' } : undefined}
        />
      )}
      {children}
    </span>
  );
};
