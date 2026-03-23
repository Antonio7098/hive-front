import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { StatusDot } from '../ui/StatusDot';
import { Icon } from '../ui';
import type { Project, Workflow, Task } from '../../types/entities';

interface EntityCardProps {
  entity: Project | Workflow | Task;
  type: 'project' | 'workflow' | 'task';
  variant?: 'default' | 'compact' | 'expanded';
  onClick?: () => void;
  onToggleActive?: (id: string, active: boolean) => void;
}

const priorityBadgeVariant = {
  low: 'neutral' as const,
  medium: 'warning' as const,
  high: 'error' as const,
};

export function EntityCard({
  entity,
  type,
  variant = 'default',
  onClick,
}: EntityCardProps) {
  const isProject = type === 'project';
  const isWorkflow = type === 'workflow';
  const isTask = type === 'task';

  const project = entity as Project;
  const workflow = entity as Workflow;
  const task = entity as Task;

  if (variant === 'compact') {
    return (
      <Link
        to={`/${type === 'workflow' ? 'workflows' : type === 'task' ? 'tasks' : 'projects'}/${entity.id}`}
        className="bg-surface-container-low border-2 border-outline-variant p-4 flex flex-col justify-between hover:bg-surface-container-high transition-colors group cursor-pointer"
        onClick={onClick}
      >
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-mono text-[10px] text-outline">{entity.id.toUpperCase()}</span>
            <StatusDot status={entity.status === 'active' || entity.status === 'in_progress' ? 'online' : 'offline'} />
          </div>
          <h5 className="font-headline font-bold text-on-surface uppercase group-hover:text-primary-container transition-colors">
            {entity.name}
          </h5>
        </div>
        <div className="mt-8 flex justify-between items-end">
          <span className="font-mono text-xs text-on-surface-variant">
            TASKS: {isProject ? project.taskCount : isWorkflow ? workflow.taskCount : task.subtasks?.length || 0}
          </span>
          <Icon name="arrow_forward" className="text-outline" size={18} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/${type === 'workflow' ? 'workflows' : type === 'task' ? 'tasks' : 'projects'}/${entity.id}`}
      className="bg-surface-container border-3 border-outline p-6 shadow-[var(--shadow-hard-lg)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[var(--shadow-accent-lg)] transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        {isProject && project.priority && (
          <Badge variant={project.priority === 'high' ? 'error' : project.priority === 'medium' ? 'warning' : 'neutral'}>
            {project.priority}
          </Badge>
        )}
        {isWorkflow && workflow.status && (
          <Badge
            variant={
              workflow.status === 'active' ? 'success' :
              workflow.status === 'todo' ? 'warning' : 'neutral'
            }
          >
            {workflow.status}
          </Badge>
        )}
        {isTask && task.priority && (
          <Badge variant={priorityBadgeVariant[task.priority]}>{task.priority}</Badge>
        )}
        <span className="font-mono text-xs text-outline">{entity.id.toUpperCase()}</span>
      </div>

      <h4 className="text-2xl font-black font-headline mb-3 text-primary-container group-hover:underline">
        {entity.name}
      </h4>

      {entity.description && (
        <p className="text-on-surface-variant font-body text-sm mb-6 leading-relaxed line-clamp-2">
          {entity.description}
        </p>
      )}

      <div className="flex justify-between items-center pt-6 border-t-2 border-outline-variant">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase text-outline">Task_Count</span>
          <span className="font-headline font-bold text-lg">
            {isProject ? project.taskCount : isWorkflow ? workflow.taskCount : task.subtasks?.length || 0}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono uppercase text-outline">
            {isProject ? 'Last_Update' : isWorkflow ? 'Last_Run' : 'Due_Date'}
          </span>
          <span className="font-headline font-bold text-sm">
            {isProject ? project.lastActivity : isWorkflow ? workflow.lastRun : task.dueDate}
          </span>
        </div>
      </div>
    </Link>
  );
}
