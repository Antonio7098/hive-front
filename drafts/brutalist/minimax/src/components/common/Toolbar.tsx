import React from 'react';

interface ToolbarProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div
      className={`
        flex items-center
        border-b-2 border-border
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative
            px-4 py-3
            font-mono text-sm uppercase tracking-wider
            transition-all duration-150
            flex items-center gap-2
            ${
              activeTab === tab.id
                ? 'text-accent'
                : 'text-text-secondary hover:text-text-primary'
            }
          `.trim().replace(/\s+/g, ' ')}
        >
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span
              className={`
                px-1.5 py-0.5
                text-xs font-bold
                border border-black
                ${
                  activeTab === tab.id
                    ? 'bg-accent text-bg-primary'
                    : 'bg-bg-elevated text-text-secondary'
                }
              `.trim().replace(/\s+/g, ' ')}
            >
              {tab.count}
            </span>
          )}
          {activeTab === tab.id && (
            <span
              className={`
                absolute
                bottom-0 left-0 right-0
                h-0.5
                bg-accent
              `.trim().replace(/\s+/g, ' ')}
            />
          )}
        </button>
      ))}
    </div>
  );
};
