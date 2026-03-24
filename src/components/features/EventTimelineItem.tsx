import type { Event } from '../../types/entities';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';

interface EventTimelineItemProps {
  event: Event;
  onSelect?: (event: Event) => void;
  className?: string;
}

const categoryVariant = {
  lifecycle: 'neutral' as const,
  execution: 'primary' as const,
  merge: 'secondary' as const,
  verification: 'warning' as const,
  governance: 'neutral' as const,
} as Record<string, 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'>;

const categoryIcon = {
  lifecycle: 'schema',
  execution: 'bolt',
  merge: 'account_tree',
  verification: 'task_alt',
  governance: 'rule',
} as Record<string, string>;

function formatTimestamp(date: Date): string {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function EventTimelineItem({ event, onSelect, className = '' }: EventTimelineItemProps) {
  const variant = categoryVariant[event.category] ?? 'neutral';
  const icon = categoryIcon[event.category] ?? 'bolt';

  const handleClick = () => {
    onSelect?.(event);
  };

  return (
    <div
      className={`flex gap-4 cursor-pointer hover:bg-surface-container-low transition-colors ${className}`}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 bg-surface-container border-2 border-outline flex items-center justify-center shrink-0">
          <Icon name={icon} size={14} className="text-on-surface-variant" />
        </div>
        <div className="w-0.5 flex-1 bg-outline-variant" />
      </div>
      <div className="flex-1 pb-6 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={variant} size="sm">{event.category}</Badge>
              <span className="font-mono text-xs text-on-surface-variant truncate">{event.type}</span>
            </div>
            <div className="text-xs font-mono text-outline">
              {formatTimestamp(event.timestamp)}
              {event.sequence !== null && ` // SEQ:${event.sequence}`}
            </div>
          </div>
          <span className="font-mono text-[10px] text-outline shrink-0">
            {event.id.toUpperCase()}
          </span>
        </div>
        {event.correlation.workflowRunId && (
          <div className="mt-1 text-[10px] font-mono text-outline">
            RUN: {event.correlation.workflowRunId.slice(0, 8).toUpperCase()}
            {event.correlation.taskId && ` // TASK: ${event.correlation.taskId}`}
          </div>
        )}
        {Object.keys(event.payload).length > 0 && (
          <pre className="mt-2 text-[10px] font-mono text-on-surface-variant bg-surface-container-low border border-outline-variant p-2 overflow-x-auto">
            {JSON.stringify(event.payload, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
