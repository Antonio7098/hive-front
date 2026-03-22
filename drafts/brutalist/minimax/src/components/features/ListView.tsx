import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Badge } from '../ui';
import type { Task, Workflow, Project } from '../../data/mock';

type Entity = Task | Workflow | Project;

interface ListViewProps {
  items: Entity[];
  type: 'task' | 'workflow' | 'project';
}

interface ListItemProps {
  item: Entity;
  type: 'task' | 'workflow' | 'project';
  defaultExpanded?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ item, type, defaultExpanded = false }) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const navigate = useNavigate();

  const handleClick = () => {
    const paths: Record<string, string> = {
      project: `/projects/${item.id}`,
      workflow: `/workflows/${item.id}`,
      task: `/tasks/${item.id}`,
    };
    navigate(paths[type]);
  };

  const getStatusBadge = () => {
    if ('status' in item) {
      const status = item.status;
      switch (status) {
        case 'active':
        case 'in_progress':
          return <Badge variant="active">{status.replace('_', ' ')}</Badge>;
        case 'completed':
        case 'done':
          return <Badge variant="completed">{status}</Badge>;
        case 'archived':
          return <Badge variant="archived">{status}</Badge>;
        case 'draft':
          return <Badge variant="draft">{status}</Badge>;
        case 'todo':
        case 'backlog':
          return <Badge variant="todo">{status}</Badge>;
      }
    }
    return null;
  };

  const getPriorityBadge = () => {
    if ('priority' in item && item.priority) {
      return <Badge variant={item.priority as 'low' | 'medium' | 'high'}>{item.priority}</Badge>;
    }
    return null;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getMeta = () => {
    if (type === 'task') {
      const task = item as Task;
      return (
        <>
          <span className="text-text-secondary">{task.assignee || 'Unassigned'}</span>
          <span className="text-accent">{formatDate(task.dueDate || new Date())}</span>
        </>
      );
    }
    if (type === 'workflow') {
      const workflow = item as Workflow;
      return (
        <>
          <span className="text-accent">{workflow.taskCount} tasks</span>
          <span className="text-text-secondary">{formatDate(workflow.lastRun)}</span>
        </>
      );
    }
    if (type === 'project') {
      const project = item as Project;
      return (
        <>
          <span className="text-accent">{project.taskCount} tasks</span>
          <span className="text-text-secondary">{formatDate(project.recentActivity)}</span>
        </>
      );
    }
    return null;
  };

  return (
    <div className="border-2 border-black bg-bg-elevated">
      <div
        className="flex items-center gap-4 p-3 hover:bg-bg-secondary cursor-pointer transition-colors"
        onClick={handleClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="p-1 text-text-secondary hover:text-accent transition-colors"
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-mono font-semibold text-sm text-text-primary truncate">
              {'name' in item ? item.name : 'Unknown'}
            </h3>
            {getStatusBadge()}
            {getPriorityBadge()}
          </div>
          {'description' in item && (
            <p className="text-xs text-text-secondary mt-1 truncate">
              {item.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-xs font-mono">
          {getMeta()}
        </div>
      </div>
      
      {expanded && (
        <div className="p-3 pt-0 border-t border-border">
          {'tags' in item && item.tags && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono bg-bg-secondary border border-border text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="text-xs font-mono text-text-secondary">
            Created: {formatDate('createdAt' in item ? item.createdAt : new Date())}
          </div>
        </div>
      )}
    </div>
  );
};

export const ListView: React.FC<ListViewProps> = ({ items, type }) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.03}s` }}
        >
          <ListItem item={item} type={type} />
        </div>
      ))}
      
      {items.length === 0 && (
        <div className="text-center py-12 text-text-secondary font-mono text-sm">
          No items to display
        </div>
      )}
    </div>
  );
};
