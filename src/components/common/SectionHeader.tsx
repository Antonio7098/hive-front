import { ReactNode } from 'react';
import { ViewSwitcher } from './ViewSwitcher';
import type { ViewMode } from './types';

interface SectionHeaderProps {
  label: string;
  dividerWidth?: 'full' | 'short';
  action?: ReactNode;
  viewMode?: ViewMode;
  onViewModeChange?: (view: ViewMode) => void;
  className?: string;
}

export function SectionHeader({
  label,
  dividerWidth = 'full',
  action,
  viewMode,
  onViewModeChange,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center ${action || viewMode ? 'justify-between' : ''} mb-6 ${className}`}>
      <div className="flex items-center gap-4">
        <h3 className="font-headline font-bold text-xl uppercase tracking-widest text-on-surface-variant">
          {label}
        </h3>
        <div className={`h-[2px] bg-outline opacity-30 ${dividerWidth === 'short' ? 'w-32' : 'flex-1'}`} />
      </div>
      {action}
      {viewMode && onViewModeChange && (
        <ViewSwitcher activeView={viewMode} onViewChange={onViewModeChange} />
      )}
    </div>
  );
}
