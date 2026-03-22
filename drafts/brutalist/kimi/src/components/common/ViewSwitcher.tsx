import { LayoutGrid, List, Share2 } from 'lucide-react';

type ViewMode = 'kanban' | 'list' | 'graph';

interface ViewSwitcherProps {
  current: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function ViewSwitcher({ current, onChange }: ViewSwitcherProps) {
  const views: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
    { id: 'kanban', icon: <LayoutGrid className="w-4 h-4" />, label: 'Kanban' },
    { id: 'list', icon: <List className="w-4 h-4" />, label: 'List' },
    { id: 'graph', icon: <Share2 className="w-4 h-4" />, label: 'Graph' },
  ];

  return (
    <div className="inline-flex border-3 border-border bg-bg-secondary">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => onChange(view.id)}
          className={`flex items-center gap-2 px-3 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
            current === view.id
              ? 'bg-accent text-bg-primary'
              : 'text-text-secondary hover:text-accent'
          }`}
          title={view.label}
        >
          {view.icon}
          <span className="hidden sm:inline">{view.label}</span>
        </button>
      ))}
    </div>
  );
}
