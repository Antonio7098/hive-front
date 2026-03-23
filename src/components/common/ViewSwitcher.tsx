import { Icon } from '../ui';
import type { ViewMode } from './types';

interface ViewSwitcherProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  className?: string;
}

export function ViewSwitcher({ activeView, onViewChange, className = '' }: ViewSwitcherProps) {
  const views: { mode: ViewMode; icon: string }[] = [
    { mode: 'kanban', icon: 'grid_view' },
    { mode: 'list', icon: 'reorder' },
    { mode: 'graph', icon: 'account_tree' },
  ];

  return (
    <div className={`flex border-2 border-outline ${className}`}>
      {views.map(({ mode, icon }) => (
        <button
          key={mode}
          onClick={() => onViewChange(mode)}
          className={`
            p-2 transition-colors
            ${activeView === mode
              ? 'bg-primary-container text-on-primary-container'
              : 'bg-surface-container hover:bg-surface-container-high'
            }
          `}
        >
          <Icon name={icon as any} size={18} />
        </button>
      ))}
    </div>
  );
}
