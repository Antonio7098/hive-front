import { Card, Badge, Icon } from '../ui'
import { useNavigate } from 'react-router-dom'

const EntityCard = ({ 
  entity, 
  variant = 'default',
  showActions = false,
  onClick,
  onToggleActive 
}) => {
  const navigate = useNavigate()
  
  const getType = () => {
    if (entity.taskCount !== undefined) return 'project'
    if (entity.lastRun !== undefined) return 'workflow'
    return 'task'
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      const type = getType()
      navigate(`/${type}s/${entity.id}`)
    }
  }

  const getStatusBadge = () => {
    const status = entity.status
    const variants = {
      active: 'primary',
      archived: 'default',
      draft: 'secondary',
      todo: 'warning',
      in_progress: 'primary',
      completed: 'success',
      backlog: 'default'
    }
    return <Badge variant={variants[status] || 'default'}>{status.replace('_', ' ')}</Badge>
  }

  return (
    <Card 
      hoverable 
      className={`p-4 ${variant === 'compact' ? 'p-3' : ''} ${variant === 'expanded' ? 'p-6' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-sm font-medium text-[var(--color-text-primary)] truncate">
              {entity.name}
            </h4>
            {getStatusBadge()}
          </div>
          
          {variant !== 'compact' && entity.description && (
            <p className="text-xs text-[var(--color-text-primary)]/40 line-clamp-2 mb-3">
              {entity.description}
            </p>
          )}

          {variant === 'expanded' && (
            <div className="flex flex-wrap gap-4 text-[10px] text-[var(--color-text-muted)]">
              {entity.taskCount !== undefined && (
                <span>{entity.taskCount} tasks</span>
              )}
              {entity.workflowCount !== undefined && (
                <span>{entity.workflowCount} workflows</span>
              )}
              {entity.progress !== undefined && (
                <span>{entity.progress}% complete</span>
              )}
            </div>
          )}
        </div>

        {showActions && (
          <div className="flex items-center gap-2">
            <button 
              className="p-1.5 rounded hover:bg-[var(--color-bg-hover)] transition-colors"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Icon name="MoreVertical" size={16} />
            </button>
          </div>
        )}
      </div>

      {variant !== 'compact' && (
        <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)]">
          <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)]">
            <span>{entity.owner || 'Unassigned'}</span>
            {entity.recentActivity && (
              <span>
                {new Date(entity.recentActivity).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}

export default EntityCard