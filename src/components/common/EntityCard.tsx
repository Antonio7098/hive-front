import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { StatusDot } from '../ui/StatusDot';
import { Icon } from '../ui';
import type { Project, Workflow, Task } from '../../types/entities';

type EntityType = 'project' | 'workflow' | 'task';

interface BaseEntityCardProps {
  variant?: 'default' | 'compact' | 'expanded';
  onClick?: () => void;
}

interface ProjectCardProps extends BaseEntityCardProps {
  type: 'project';
  entity: Project;
}

interface WorkflowCardProps extends BaseEntityCardProps {
  type: 'workflow';
  entity: Workflow;
}

interface TaskCardProps extends BaseEntityCardProps {
  type: 'task';
  entity: Task;
}

type EntityCardProps = ProjectCardProps | WorkflowCardProps | TaskCardProps;

const priorityBadgeVariant = {
  low: 'neutral' as const,
  medium: 'warning' as const,
  high: 'error' as const,
};

function isProjectEntity(props: EntityCardProps): props is ProjectCardProps {
  return props.type === 'project';
}

function isWorkflowEntity(props: EntityCardProps): props is WorkflowCardProps {
  return props.type === 'workflow';
}

function isTaskEntity(props: EntityCardProps): props is TaskCardProps {
  return props.type === 'task';
}

function getEntityLink(entity: Project | Workflow | Task, type: EntityType): string {
  const base = type === 'workflow' ? 'workflows' : type === 'task' ? 'tasks' : 'projects';
  return `/${base}/${entity.id}`;
}

function getTaskCount(props: EntityCardProps): number {
  if (isProjectEntity(props)) return props.entity.taskCount;
  if (isWorkflowEntity(props)) return props.entity.taskCount;
  if (isTaskEntity(props)) return props.entity.subtasks?.length || 0;
  return 0;
}

function getSecondaryValue(props: EntityCardProps): string {
  if (isProjectEntity(props)) return props.entity.lastActivity || 'N/A';
  if (isWorkflowEntity(props)) return props.entity.lastRun || 'N/A';
  if (isTaskEntity(props)) return props.entity.dueDate || 'N/A';
  return 'N/A';
}

function getSecondaryLabel(props: EntityCardProps): string {
  if (isProjectEntity(props)) return 'Last_Update';
  if (isWorkflowEntity(props)) return 'Last_Run';
  if (isTaskEntity(props)) return 'Due_Date';
  return '';
}

function isEntityActive(entity: Project | Workflow | Task): boolean {
  return entity.status === 'active' || entity.status === 'in_progress';
}

export function EntityCard(props: EntityCardProps) {
  const { entity, variant = 'default', onClick } = props;

  if (variant === 'compact') {
    return (
      <Link
        to={getEntityLink(entity, props.type)}
        className="bg-surface-container-low border-2 border-outline-variant p-4 flex flex-col justify-between hover:bg-surface-container-high transition-colors group cursor-pointer"
        onClick={onClick}
      >
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-mono text-[10px] text-outline">{entity.id.toUpperCase()}</span>
            <StatusDot status={isEntityActive(entity) ? 'online' : 'offline'} />
          </div>
          <h5 className="font-headline font-bold text-on-surface uppercase group-hover:text-primary-container transition-colors">
            {entity.name}
          </h5>
        </div>
        <div className="mt-8 flex justify-between items-end">
          <span className="font-mono text-xs text-on-surface-variant">
            TASKS: {getTaskCount(props)}
          </span>
          <Icon name="arrow_forward" className="text-outline" size={18} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={getEntityLink(entity, props.type)}
      className="bg-surface-container border-3 border-outline p-6 shadow-[var(--shadow-hard-lg)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[var(--shadow-accent-lg)] transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        {isProjectEntity(props) && props.entity.priority && (
          <Badge variant={props.entity.priority === 'high' ? 'error' : props.entity.priority === 'medium' ? 'warning' : 'neutral'}>
            {props.entity.priority}
          </Badge>
        )}
        {isWorkflowEntity(props) && props.entity.status && (
          <Badge
            variant={
              props.entity.status === 'active' ? 'success' :
              props.entity.status === 'todo' ? 'warning' : 'neutral'
            }
          >
            {props.entity.status}
          </Badge>
        )}
        {isTaskEntity(props) && props.entity.priority && (
          <Badge variant={priorityBadgeVariant[props.entity.priority]}>{props.entity.priority}</Badge>
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
            {getTaskCount(props)}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono uppercase text-outline">
            {getSecondaryLabel(props)}
          </span>
          <span className="font-headline font-bold text-sm">
            {getSecondaryValue(props)}
          </span>
        </div>
      </div>
    </Link>
  );
}
