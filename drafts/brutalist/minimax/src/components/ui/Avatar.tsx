import React from 'react';

export interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  className = '',
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeStyles = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const colors = [
    'bg-accent text-bg-primary',
    'bg-warning text-bg-primary',
    'bg-success text-bg-primary',
    'bg-error text-white',
  ];

  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-mono font-bold
        border-2 border-black
        ${sizeStyles[size]}
        ${colors[colorIndex]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      title={name}
    >
      {initials}
    </span>
  );
};
