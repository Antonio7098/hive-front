import { ReactNode } from 'react';

interface DetailSectionProps {
  title?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DetailSection({ title, icon, actions, children, className = '' }: DetailSectionProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          {icon ? (
            <h3 className="font-headline font-black text-xl tracking-tight flex items-center gap-3">
              {icon}
              {title}
            </h3>
          ) : (
            <h3 className="font-headline font-black text-xl tracking-tight">{title}</h3>
          )}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}
