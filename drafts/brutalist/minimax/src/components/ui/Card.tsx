import React from 'react';

export interface CardProps {
  variant?: 'default' | 'compact' | 'expanded';
  hoverable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverable = false,
  selected = false,
  onClick,
  children,
  className = '',
  style,
}) => {
  const baseStyles = `
    bg-bg-elevated 
    border-${selected ? 'accent' : 'border'} border-2
    transition-all duration-150 ease-out
  `;

  const variantStyles = {
    default: 'p-4',
    compact: 'p-3',
    expanded: 'p-6',
  };

  const hoverableStyles = hoverable || onClick
    ? `
        cursor-pointer
        hover:shadow-brutal hover:-translate-y-0.5 hover:border-accent
        active:translate-y-0 active:shadow-none
      `
    : '';

  const selectedStyles = selected
    ? 'border-accent shadow-brutal'
    : '';

  return (
    <div
      className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${hoverableStyles} 
        ${selectedStyles}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      style={style}
    >
      {children}
    </div>
  );
};
