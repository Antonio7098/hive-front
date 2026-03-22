interface ToolbarProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Toolbar({ tabs, activeTab, onTabChange }: ToolbarProps) {
  return (
    <div className="flex border-b-3 border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-4 py-3 text-sm font-mono font-semibold uppercase tracking-wider transition-colors ${
            activeTab === tab.id
              ? 'text-accent'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.5 text-xs ${
                activeTab === tab.id
                  ? 'bg-accent text-bg-primary'
                  : 'bg-bg-elevated text-text-secondary'
              }`}>
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
          )}
        </button>
      ))}
    </div>
  );
}
