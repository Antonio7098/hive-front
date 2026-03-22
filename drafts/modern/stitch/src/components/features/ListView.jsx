import { ExpandableItem } from '../common'
import { Badge } from '../ui'

const ListView = ({ items, type = 'task' }) => {
  const headers = {
    task: ['Name', 'Status', 'Priority', 'Assignee', ''],
    workflow: ['Name', 'Status', 'Tasks', 'Last Run', ''],
    project: ['Name', 'Status', 'Tasks', 'Updated', '']
  }

  const getStatusVariant = (status) => {
    const variants = {
      active: 'primary',
      archived: 'default',
      draft: 'secondary',
      todo: 'warning',
      in_progress: 'primary',
      completed: 'success',
      backlog: 'default'
    }
    return variants[status] || 'default'
  }

  return (
    <div className="border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
      <div className="grid gap-4 px-4 py-3 bg-[var(--color-surface-container-low)] border-b border-[var(--color-border-subtle)]">
        {headers[type].map(header => (
          <div key={header} className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
            {header}
          </div>
        ))}
      </div>

      <div>
        {items.map(item => (
          <ExpandableItem
            key={item.id}
            title={item.name}
            subtitle={item.description}
          >
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Status</span>
                <Badge variant={getStatusVariant(item.status)} className="mt-1">{item.status}</Badge>
              </div>
              {type === 'task' && (
                <>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Priority</span>
                    <p className="mt-1 text-[var(--color-text-primary)]">{item.priority}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Assignee</span>
                    <p className="mt-1 text-[var(--color-text-primary)]">{item.assignee || 'Unassigned'}</p>
                  </div>
                </>
              )}
              {type === 'workflow' && (
                <>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Tasks</span>
                    <p className="mt-1 text-[var(--color-text-primary)]">{item.taskCount}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Last Run</span>
                    <p className="mt-1 text-[var(--color-text-primary)]">
                      {item.lastRun ? new Date(item.lastRun).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </>
              )}
              {type === 'project' && (
                <>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Tasks</span>
                    <p className="mt-1 text-[var(--color-text-primary)]">{item.taskCount}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Updated</span>
                    <p className="mt-1 text-[var(--color-text-primary)]">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </>
              )}
            </div>
          </ExpandableItem>
        ))}
      </div>
    </div>
  )
}

export default ListView