import { ReactNode } from 'react';
import { Card } from '../ui';

interface SpecRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface SpecBlockProps {
  title?: string;
  rows: SpecRow[];
  version?: string;
  className?: string;
  children?: ReactNode;
}

export function SpecBlock({ title, rows, version, className = '', children }: SpecBlockProps) {
  return (
    <div className={`bg-surface-container-lowest border-2 border-outline p-6 font-mono text-sm leading-relaxed text-on-surface-variant relative overflow-hidden ${className}`}>
      {version && (
        <div className="absolute top-0 right-0 p-2 bg-outline/20 text-[10px] uppercase font-bold text-outline">{version}</div>
      )}
      {title && <p className="mb-4">{title}</p>}
      {children}
      {rows.map((row, i) => (
        <div key={i} className="flex justify-between">
          <span className="text-outline uppercase">{row.label}:</span>
          <span className={row.highlight ? 'text-primary-container' : 'text-on-surface'}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

interface SpecCardProps {
  specId: string;
  title: string;
  description: string;
  rows: SpecRow[];
  className?: string;
}

export function SpecCard({ specId, title, description, rows, className = '' }: SpecCardProps) {
  return (
    <Card variant="default" padding="lg" className={`relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 p-2 bg-primary-container text-black font-headline font-black text-[10px] tracking-tighter uppercase rotate-90 origin-bottom-right translate-x-[-10px] translate-y-[20px]">
        {specId}
      </div>
      <label className="font-headline font-bold text-xs text-primary-container tracking-[0.2em] mb-4 block">
        TASK_ID // {specId}
      </label>
      <h2 className="text-5xl font-headline font-black tracking-tight mb-6">{title}</h2>
      <div className="space-y-6">
        <div>
          <label className="font-headline font-bold text-[10px] text-on-surface-variant tracking-widest uppercase mb-1 block">Objective</label>
          <p className="text-on-surface leading-relaxed text-sm">{description}</p>
        </div>
        <SpecBlock rows={rows} className="mt-6 pt-6 border-t border-outline/30" />
      </div>
    </Card>
  );
}
