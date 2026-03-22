import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { Project, Workflow, Task } from '../../types';

interface EntityCardProps {
  entity: Project | Workflow | Task;
  variant?: 'default' | 'compact' | 'expanded';
  showActions?: boolean;
  onClick?: () => void;
  onToggleActive?: (id: string, active: boolean) => void;
}

export function EntityCard({
  entity,
  variant = 'default',
  showActions = true,
  onClick,
  onToggleActive
}: EntityCardProps) {
  const navigate = useNavigate();

  const isProject = 'workflowCount' in entity;
  const isWorkflow = 'projectId' in entity && 'trigger' in entity;
  const isTask = 'workflowId' in entity && 'priority' in entity;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (isProject) {
      navigate(`/projects/${entity.id}`);
    } else if (isWorkflow) {
      navigate(`/workflows/${entity.id}`);
    } else if (isTask) {
      navigate(`/tasks/${entity.id}`);
    }
  };

  const getStatus = () => {
    if (isTask) return entity.status;
    if (isWorkflow) return entity.status;
    return entity.status;
  };

  const getSubtitle = () => {
    if (isProject) {
      return `${entity.workflowCount} workflows · ${entity.taskCount} tasks`;
    }
    if (isWorkflow) {
      return `${entity.taskCount} tasks · ${entity.trigger}`;
    }
    if (isTask) {
      return `Priority: ${entity.priority}${entity.assignee ? ` · ${entity.assignee}` : ''}`;
    }
    return '';
  };

  if (variant === 'compact') {
    return (
      <Card
        variant="hover"
        padding="sm"
        onClick={handleClick}
        className="cursor-pointer"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h4 className="font-mono font-semibold text-sm text-text-primary truncate">
              {entity.name}
            </h4>
            <p className="text-xs text-text-secondary truncate">
              {getSubtitle()}
            </p>
          </div>
          <Badge status={getStatus() as any} />
        </div>
      </Card>
    );
  }

  if (variant === 'expanded') {
    return (
      <Card
        variant="hover"
        padding="lg"
        onClick={handleClick}
        className="cursor-pointer"
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-wide">
                {entity.name}
              </h3>
              <p className="mt-1 text-sm text-text-secondary font-mono">
                {getSubtitle()}
              </p>
            </div>
            <Badge status={getStatus() as any} />
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {entity.description}
          </p>
          {isProject && 'tags' in entity && entity.tags && (
            <div className="flex flex-wrap gap-2">
              {entity.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-mono bg-bg-elevated border border-border text-text-secondary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  }

  // default variant
  return (
    <Card
      variant="hover"
      padding="md"
      onClick={handleClick}
      className="cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-base text-text-primary uppercase tracking-wide">
            {entity.name}
          </h3>
          <p className="mt-1 text-xs text-text-secondary font-mono">
            {getSubtitle()}
          </p>
        </div>
        <Badge status={getStatus() as any} />
      </div>
    </Card>
  );
}
