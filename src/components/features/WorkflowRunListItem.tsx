import type { WorkflowRun } from '../../types/entities';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';
import { Link } from 'react-router-dom';

interface WorkflowRunListItemProps {
  run: WorkflowRun;
  className?: string;
}

const stateVariant = {
  created: 'neutral' as const,
  running: 'warning' as const,
  paused: 'secondary' as const,
  completed: 'success' as const,
  aborted: 'error' as const,
};

const stateIcon = {
  created: 'schedule',
  running: 'bolt',
  paused: 'timer',
  completed: 'check',
  aborted: 'warning',
};

export function formatDate(date: Date | null): string {
  if (!date) return '\u2014';
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function duration(startedAt: Date | null, completedAt: Date | null): string {
  if (!startedAt) return '\u2014';
  const end = completedAt ?? new Date();
  const ms = end.getTime() - startedAt.getTime();
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export function WorkflowRunListItem({ run, className = '' }: WorkflowRunListItemProps) {
  return (
    <Link
      to={`/workflows/${run.workflowId}/runs/${run.id}`}
      className={`
        bg-surface-container border-2 border-outline p-4
        flex items-center justify-between
        hover:bg-surface-container-high hover:border-primary-container
        transition-all group
        ${className}
      `}
    >
      <div className="flex items-center gap-4 min-w-0">
        <Icon
          name={stateIcon[run.state]}
          className="text-outline group-hover:text-primary-container shrink-0"
          size={18}
        />
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-outline truncate">
              {run.id.slice(0, 8).toUpperCase()}
            </span>
            <Badge variant={stateVariant[run.state]} size="sm">
              {run.state}
            </Badge>
          </div>
          {run.parentWorkflowRunId && (
            <span className="text-[10px] font-mono text-outline mt-0.5 block">
              PARENT: {run.parentWorkflowRunId.slice(0, 8).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-8 shrink-0">
        <div className="hidden md:block text-right">
          <div className="text-[10px] font-mono uppercase text-outline">Started</div>
          <div className="text-xs font-mono text-on-surface-variant">{formatDate(run.startedAt)}</div>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-[10px] font-mono uppercase text-outline">Duration</div>
          <div className="text-xs font-mono text-on-surface-variant">{duration(run.startedAt, run.completedAt)}</div>
        </div>
        <div className="hidden lg:block text-right">
          <div className="text-[10px] font-mono uppercase text-outline">Completed</div>
          <div className="text-xs font-mono text-on-surface-variant">{formatDate(run.completedAt)}</div>
        </div>
        <Icon name="arrow_forward" className="text-outline group-hover:text-primary-container" size={16} />
      </div>
    </Link>
  );
}
