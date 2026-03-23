import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantClasses = {
  default: 'card-brutal',
  elevated: 'bg-surface-container-high border-2 border-outline-variant shadow-[4px_4px_0px_0px_#0e0e0e]',
  outlined: 'bg-surface-container-lowest border-2 border-dashed border-outline',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className = '' }: CardHeaderProps) {
  return (
    <div className={`border-b-3 border-outline p-5 flex justify-between items-center bg-surface-container-high ${className}`}>
      <div>
        <h3 className="font-headline font-black text-xl tracking-widest uppercase">{title}</h3>
        {subtitle && <p className="text-sm text-on-surface-variant font-medium mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
