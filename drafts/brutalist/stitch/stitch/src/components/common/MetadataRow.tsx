import { ReactNode } from 'react';

interface MetadataRowProps {
  label: string;
  value: string | ReactNode;
  editable?: boolean;
  className?: string;
}

export function MetadataRow({ label, value, className = '' }: MetadataRowProps) {
  return (
    <div className={`flex justify-between items-center py-2 ${className}`}>
      <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-outline">
        {label}
      </span>
      <span className="font-headline font-bold text-on-surface">
        {value}
      </span>
    </div>
  );
}

interface MetadataGridProps {
  children: ReactNode;
  className?: string;
}

export function MetadataGrid({ children, className = '' }: MetadataGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-0 border-3 border-outline ${className}`}>
      {children}
    </div>
  );
}

interface MetadataCellProps {
  label: string;
  value: string | number | ReactNode;
  icon?: string;
  className?: string;
}

export function MetadataCell({ label, value, className = '' }: MetadataCellProps) {
  return (
    <div className={`p-6 bg-surface-container border-r-3 border-outline last:border-r-0 ${className}`}>
      <div className="text-[10px] font-bold uppercase text-outline mb-1">{label}</div>
      <div className="text-4xl font-black font-headline text-on-surface">{value}</div>
    </div>
  );
}
