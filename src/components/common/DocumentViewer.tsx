import { ReactNode } from 'react';
import { Icon } from '../ui';

interface DocumentViewerProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DocumentViewer({
  title,
  subtitle,
  actions,
  children,
  className = '',
}: DocumentViewerProps) {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b-2 border-outline bg-surface-container">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary-container/10 border border-primary-container">
            <Icon name="rule" className="text-primary-container" size={20} />
          </div>
          <div>
            <h2 className="font-headline font-black text-lg uppercase tracking-wider text-on-surface">
              {title}
            </h2>
            {subtitle && (
              <p className="font-mono text-xs text-outline mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function DocumentEmptyState({
  icon = 'rule',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center h-full py-16 ${className}`}>
      <div className="p-4 bg-surface-container border-2 border-outline mb-6">
        <Icon name={icon} className="text-outline" size={48} />
      </div>
      <h3 className="font-headline font-black text-xl uppercase tracking-wider text-on-surface mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-on-surface-variant text-sm text-center max-w-md mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

interface DocumentSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function DocumentSection({ title, children, className = '' }: DocumentSectionProps) {
  return (
    <div className={`mb-8 ${className}`}>
      {title && (
        <h3 className="font-headline font-black text-sm uppercase tracking-widest text-outline mb-4 pb-2 border-b border-outline-variant">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

interface DocumentMetadataProps {
  items: { label: string; value: string }[];
  className?: string;
}

export function DocumentMetadata({ items, className = '' }: DocumentMetadataProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 p-4 bg-surface-container-low border border-outline-variant ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-outline mb-1">
            {item.label}
          </span>
          <span className="font-headline font-bold text-sm text-on-surface">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
