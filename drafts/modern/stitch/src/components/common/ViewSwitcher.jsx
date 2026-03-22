import { LayoutGrid, List, Network } from 'lucide-react'

const ViewSwitcher = ({ view, onViewChange }) => {
  const views = [
    { id: 'kanban', icon: LayoutGrid, label: 'Kanban' },
    { id: 'list', icon: List, label: 'List' },
    { id: 'graph', icon: Network, label: 'Graph' }
  ]

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-[var(--color-surface-container-low)] rounded-lg">
      {views.map(({ id, icon: IconComponent, label }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`
            flex items-center gap-2 px-3 py-1.5
            text-xs font-medium
            rounded-md
            transition-all duration-200
            ${view === id 
              ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]' 
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]'
            }
          `}
        >
          <IconComponent size={14} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}

export default ViewSwitcher