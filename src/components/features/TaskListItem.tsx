import type { Task } from '../../types/entities';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';
import { Link } from 'react-router-dom';

interface TaskListItemProps {
  task: Task;
  className?: string;
}

const priorityVariant = {
  low: 'neutral' as const,
  medium: 'warning' as const,
  high: 'error' as const,
};

export function TaskListItem({ task, className = '' }: TaskListItemProps) {
  return (
    <Link
      to={`/tasks/${task.id}`}
      className={`
        bg-surface-container border-2 border-outline p-4
        flex items-center justify-between
        hover:bg-surface-container-high hover:border-primary-container
        transition-all group
        ${className}
      `}
    >
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 border-2 border-outline group-hover:border-primary-container transition-colors" />
        <div>
          <h4 className="font-headline font-bold text-sm uppercase tracking-wide group-hover:text-primary-container">
            {task.name}
          </h4>
          <p className="text-xs text-on-surface-variant font-mono mt-1 line-clamp-1">
            {task.description || 'No description'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {task.priority && (
          <Badge variant={priorityVariant[task.priority]} size="sm">
            {task.priority}
          </Badge>
        )}
        
        {task.assignee && (
          <span className="text-xs font-mono text-outline hidden md:inline">
            {task.assignee}
          </span>
        )}
        
        {task.subtasks.length > 0 && (
          <span className="flex items-center gap-1 text-xs font-mono text-outline">
            <Icon name="checklist" size={14} />
            {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}
          </span>
        )}
        
        <Icon name="arrow_forward" className="text-outline group-hover:text-primary-container" size={16} />
      </div>
    </Link>
  );
}
