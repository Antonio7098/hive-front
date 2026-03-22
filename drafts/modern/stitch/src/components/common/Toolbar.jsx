import { Badge } from '../ui'

const Toolbar = ({ tabs, activeTab, onTabChange, counts }) => {
  return (
    <div className="flex items-center gap-1 border-b border-[var(--color-border-subtle)]">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative px-4 py-3
            text-sm font-medium
            transition-all duration-200
            hover:text-[var(--color-text-primary)]
            ${activeTab === tab.id 
              ? 'text-[var(--color-accent)]' 
              : 'text-[var(--color-text-muted)]'
            }
          `}
        >
          <span className="flex items-center gap-2">
            {tab.icon && <tab.icon size={16} />}
            {tab.label}
            {counts && counts[tab.id] !== undefined && (
              <Badge size="sm" variant={activeTab === tab.id ? 'primary' : 'default'}>
                {counts[tab.id]}
              </Badge>
            )}
          </span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]" />
          )}
        </button>
      ))}
    </div>
  )
}

export default Toolbar