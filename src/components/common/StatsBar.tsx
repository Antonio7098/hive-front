import { ReactNode } from 'react';

interface StatCellProps {
  label: string;
  value: string | number | ReactNode;
  className?: string;
}

export function StatCell({ label, value, className = '' }: StatCellProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-[10px] font-bold text-outline uppercase tracking-tighter">{label}</div>
      <div className="text-2xl font-black font-headline text-primary-container">{value}</div>
    </div>
  );
}

interface StatsBarProps {
  cells: { label: string; value: string | number | ReactNode }[];
  actions?: ReactNode;
  className?: string;
}

export function StatsBar({ cells, actions, className = '' }: StatsBarProps) {
  return (
    <div className={`card-brutal p-4 flex justify-between items-center ${className}`}>
      <div className="grid grid-cols-3 gap-8 divide-x-2 divide-outline/30">
        {cells.map((cell, i) => (
          <StatCell key={i} label={cell.label} value={cell.value} className="px-2" />
        ))}
      </div>
      {actions && <div className="pl-4">{actions}</div>}
    </div>
  );
}
