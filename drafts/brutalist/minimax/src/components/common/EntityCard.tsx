import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Avatar } from '../ui';
import type { Project, Workflow, Task } from '../../data/mock';
import type { BadgeVariant } from '../ui/Badge';

type Entity = Project | Workflow | Task;

interface EntityCardProps {
  entity: Entity;
  variant?: 'default' | 'compact' | 'expanded';
  onToggleActive?: (id: string, active: boolean) => void;
  className?: string;
}

const getEntityType = (entity: Entity): string => {
  if ('taskCount' in entity && 'workflowCount' in entity) return 'project';
  if ('trigger' in entity) return 'workflow';
  return 'task';
};

const getEntityStatus = (entity: Entity): BadgeVariant => {
  if ('status' in entity) {
    switch (entity.status) {
      case 'active': return 'active';
      case 'completed': return 'completed';
      case 'archived': return 'archived';
      case 'draft': return 'draft';
      case 'todo': return 'todo';
      case 'backlog': return 'todo';
      case 'in_progress': return 'active';
      default: return 'active';
    }
  }
  return 'active';
};

const getPriorityBadge = (entity: Entity): BadgeVariant | null => {
  if ('priority' in entity && entity.priority) {
    return entity.priority as BadgeVariant;
  }
  return null;
};

const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const EntityCard: React.FC<EntityCardProps> = ({
  entity,
  variant = 'default',
  className = '',
}) => {
  const navigate = useNavigate();
  const entityType = getEntityType(entity);
  
  const handleClick = () => {
    const paths: Record<string, string> = {
      project: `/projects/${entity.id}`,
      workflow: `/workflows/${entity.id}`,
      task: `/tasks/${entity.id}`,
    };
    navigate(paths[entityType]);
  };

  const CardContent = () => {
    if (entityType === 'project') {
      const project = entity as Project;
      return (
        <>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-text-primary uppercase tracking-wide truncate">
              {project.name}
            </h3>
            <Badge variant={getEntityStatus(entity)}>
              {project.status}
            </Badge>
          </div>
          
          {variant !== 'compact' && (
            <p className="text-text-secondary text-sm mt-2 line-clamp-2">
              {project.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-3 text-xs font-mono text-text-secondary">
            <span className="flex items-center gap-1">
              <span className="text-accent">T</span> {project.taskCount}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-accent">W</span> {project.workflowCount}
            </span>
            <span className="ml-auto">{formatDate(project.recentActivity)}</span>
          </div>
          
          {variant === 'expanded' && (
            <div className="flex flex-wrap gap-1 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono bg-bg-secondary border border-border text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </>
      );
    }
    
    if (entityType === 'workflow') {
      const workflow = entity as Workflow;
      return (
        <>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-text-primary uppercase tracking-wide truncate">
              {workflow.name}
            </h3>
            <Badge variant={getEntityStatus(entity)}>
              {workflow.status}
            </Badge>
          </div>
          
          {variant !== 'compact' && (
            <p className="text-text-secondary text-sm mt-2 line-clamp-2">
              {workflow.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-3 text-xs font-mono text-text-secondary">
            <span className="flex items-center gap-1">
              <span className="text-accent">T</span> {workflow.taskCount}
            </span>
            {workflow.avgDuration && (
              <span className="flex items-center gap-1">
                <span className="text-accent">&#x27F3;</span> {workflow.avgDuration}
              </span>
            )}
            <span className="ml-auto">{formatDate(workflow.lastRun)}</span>
          </div>
          
          {variant !== 'compact' && (
            <div className="mt-2 text-xs font-mono text-text-secondary">
              <span className="text-accent-light">Trigger:</span> {workflow.trigger}
            </div>
          )}
        </>
      );
    }
    
    const task = entity as Task;
    const priority = getPriorityBadge(task);
    
    return (
      <>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-text-primary uppercase tracking-wide truncate">
            {task.name}
          </h3>
          <div className="flex items-center gap-2">
            {priority && <Badge variant={priority}>{priority}</Badge>}
            <Badge variant={getEntityStatus(entity)}>
              {task.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        
        {variant !== 'compact' && (
          <p className="text-text-secondary text-sm mt-2 line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center gap-4 mt-3 text-xs font-mono text-text-secondary">
          {task.assignee && (
            <div className="flex items-center gap-1">
              <Avatar name={task.assignee} size="sm" />
              <span>{task.assignee.split(' ')[0]}</span>
            </div>
          )}
          {task.dueDate && (
            <span className="ml-auto">
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
        
        {task.subtasks.length > 0 && variant !== 'compact' && (
          <div className="mt-2 text-xs font-mono">
            <span className="text-accent">{task.subtasks.filter(s => s.completed).length}</span>
            <span className="text-text-secondary">/</span>
            <span className="text-text-secondary">{task.subtasks.length}</span>
            <span className="text-text-secondary ml-1">subtasks</span>
          </div>
        )}
      </>
    );
  };

  return (
    <Card
      variant={variant}
      hoverable
      onClick={handleClick}
      className={className}
    >
      <CardContent />
    </Card>
  );
};
