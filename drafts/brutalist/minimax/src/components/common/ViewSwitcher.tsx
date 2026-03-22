import React from 'react';
import { LayoutGrid, List, Share2 } from 'lucide-react';

export type ViewMode = 'kanban' | 'list' | 'graph';

interface ViewSwitcherProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  className?: string;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  activeView,
  onViewChange,
  className = '',
}) => {
  const views: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'kanban', icon: <LayoutGrid size={16} />, label: 'Kanban' },
    { mode: 'list', icon: <List size={16} />, label: 'List' },
    { mode: 'graph', icon: <Share2 size={16} />, label: 'Graph' },
  ];

  return (
    <div
      className={`
        inline-flex
        bg-bg-secondary
        border-2 border-black
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {views.map(({ mode, icon, label }) => (
        <button
          key={mode}
          onClick={() => onViewChange(mode)}
          className={`
            px-3 py-2
            font-mono text-xs uppercase tracking-wider
            border-r-2 border-black last:border-r-0
            transition-all duration-150
            flex items-center gap-2
            ${
              activeView === mode
                ? 'bg-accent text-bg-primary'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
            }
          `.trim().replace(/\s+/g, ' ')}
          aria-pressed={activeView === mode}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};
