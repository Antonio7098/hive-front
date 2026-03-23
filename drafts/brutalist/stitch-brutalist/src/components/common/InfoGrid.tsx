import { ReactNode } from 'react';

interface InfoCellProps {
  label: string;
  value: string | ReactNode;
  className?: string;
}

export function InfoCell({ label, value, className = '' }: InfoCellProps) {
  return (
    <div className={`p-4 bg-surface-container-lowest border-2 border-outline ${className}`}>
      <div className="text-[10px] font-headline font-bold text-outline uppercase tracking-widest mb-1">{label}</div>
      <div className="font-headline font-bold text-on-surface">{value}</div>
    </div>
  );
}

interface InfoGridProps {
  cells: { label: string; value: string | ReactNode }[];
  cols?: 2 | 3 | 4;
  className?: string;
}

export function InfoGrid({ cells, cols = 2, className = '' }: InfoGridProps) {
  return (
    <div className={`grid grid-cols-${cols} gap-4 ${className}`}>
      {cells.map((cell, i) => (
        <InfoCell key={i} label={cell.label} value={cell.value} />
      ))}
    </div>
  );
}
