import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge } from '../ui';
import type { Task } from '../../data/mock';

interface TaskBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

const statusColumns: { id: Task['status']; title: string; color: string }[] = [
  { id: 'backlog', title: 'Backlog', color: 'border-warning' },
  { id: 'in_progress', title: 'In Progress', color: 'border-accent' },
  { id: 'done', title: 'Done', color: 'border-success' },
];

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
  const navigate = useNavigate();

  const columns = statusColumns.map(col => ({
    ...col,
    tasks: tasks.filter(t => t.status === col.id),
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
              {column.tasks.length}
            </span>
          </div>
          
          <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[500px]">
            {column.tasks.map((task, index) => (
              <Card
                key={task.id}
                variant="compact"
                hoverable
                onClick={() => navigate(`/tasks/${task.id}`)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-mono font-semibold text-sm text-text-primary truncate">
                    {task.name}
                  </h4>
                  {task.priority && (
                    <Badge variant={task.priority} className="text-xs">
                      {task.priority}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                  {task.description}
                </p>
                {task.assignee && (
                  <div className="text-xs font-mono text-text-secondary">
                    {task.assignee.split(' ')[0]}
                  </div>
                )}
              </Card>
            ))}
            
            {column.tasks.length === 0 && (
              <div className="text-center py-8 text-text-secondary font-mono text-xs">
                No tasks
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
