import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge } from '../ui';
import type { Workflow } from '../../data/mock';

interface WorkflowBoardProps {
  workflows: Workflow[];
}

const statusColumns: { id: Workflow['status']; title: string; color: string }[] = [
  { id: 'todo', title: 'Todo', color: 'border-warning' },
  { id: 'active', title: 'Active', color: 'border-accent' },
  { id: 'completed', title: 'Completed', color: 'border-success' },
];

export const WorkflowBoard: React.FC<WorkflowBoardProps> = ({ workflows }) => {
  const navigate = useNavigate();

  const columns = statusColumns.map(col => ({
    ...col,
    workflows: workflows.filter(w => w.status === col.id),
  }));

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => (
        <div
          key={column.id}
          className={`
            flex-1 min-w-[280px]
            bg-bg-secondary
            border-2 ${column.color}
            flex flex-col
          `}
        >
          <div className="p-3 border-b-2 border-black flex items-center justify-between">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              {column.title}
            </h3>
            <span className="px-2 py-0.5 text-xs font-mono bg-bg-elevated border border-black">
              {column.workflows.length}
            </span>
          </div>
          
          <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[500px]">
            {column.workflows.map((workflow, index) => (
              <Card
                key={workflow.id}
                variant="compact"
                hoverable
                onClick={() => navigate(`/workflows/${workflow.id}`)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-mono font-semibold text-sm text-text-primary truncate">
                    {workflow.name}
                  </h4>
                  <Badge variant={workflow.status === 'active' ? 'active' : workflow.status === 'completed' ? 'completed' : 'todo'}>
                    {workflow.status}
                  </Badge>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                  {workflow.description}
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-text-secondary">
                  <span>{workflow.taskCount} tasks</span>
                  {workflow.avgDuration && <span>{workflow.avgDuration}</span>}
                </div>
              </Card>
            ))}
            
            {column.workflows.length === 0 && (
              <div className="text-center py-8 text-text-secondary font-mono text-xs">
                No workflows
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
