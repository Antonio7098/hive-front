import { ReactNode } from 'react';
import { Button } from '../ui';

interface PageHeaderProps {
  breadcrumb: string;
  title: string;
  action?: ReactNode;
  actionLabel?: string;
  className?: string;
}

export function PageHeader({ breadcrumb, title, action, actionLabel, className = '' }: PageHeaderProps) {
  return (
    <div className={`flex justify-between items-end mb-12 ${className}`}>
      <div>
        <div className="font-mono text-primary-container text-xs mb-2 tracking-[0.4em] uppercase">
          {breadcrumb}
        </div>
        <h2 className="text-6xl font-black font-headline tracking-tighter text-on-surface">{title}</h2>
      </div>
      {action || (actionLabel && <Button variant="primary" size="lg">{actionLabel}</Button>)}
    </div>
  );
}
