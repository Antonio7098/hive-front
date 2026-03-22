interface StatusDotProps {
  status: 'online' | 'offline' | 'warning' | 'error';
  pulse?: boolean;
  className?: string;
}

const statusColors = {
  online: 'bg-primary-container',
  offline: 'bg-outline',
  warning: 'bg-secondary-container',
  error: 'bg-error',
};

export function StatusDot({ status, pulse = false, className = '' }: StatusDotProps) {
  return (
    <span
      className={`
        w-2 h-2 ${statusColors[status]}
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `}
    />
  );
}
