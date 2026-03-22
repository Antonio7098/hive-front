import { EntityCard } from '../common'

const columns = [
  { id: 'backlog', label: 'Backlog', color: 'var(--color-text-muted)' },
  { id: 'in_progress', label: 'In Progress', color: 'var(--color-accent)' },
  { id: 'done', label: 'Done', color: 'var(--color-secondary)' }
]

const KanbanBoard = ({ items, type = 'task' }) => {
  const groupedItems = columns.reduce((acc, col) => {
    acc[col.id] = items.filter(item => item.status === col.id)
    return acc
  }, {})

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map(column => (
        <div key={column.id} className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: column.color }}
            />
            <h4 className="text-sm font-medium text-[var(--color-text-secondary)]">
              {column.label}
            </h4>
            <span className="text-xs text-[var(--color-text-muted)]">
              ({groupedItems[column.id].length})
            </span>
          </div>

          <div className="space-y-3">
            {groupedItems[column.id].map(item => (
              <EntityCard 
                key={item.id} 
                entity={item} 
                variant="compact"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default KanbanBoard