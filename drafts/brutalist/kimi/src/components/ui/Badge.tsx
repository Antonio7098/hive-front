interface BadgeProps {
  status: 'todo' | 'active' | 'completed' | 'archived' | 'backlog' | 'in_progress' | 'done' | 'draft' | 'low' | 'medium' | 'high';
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ status, children, className = '' }: BadgeProps) {
  const statusConfig = {
    // Task/Workflow statuses
    todo: { bg: 'bg-gray-700', text: 'text-gray-300', border: 'border-gray-600', label: 'TODO' },
    active: { bg: 'bg-amber-900/50', text: 'text-amber-400', border: 'border-amber-600', label: 'ACTIVE' },
    completed: { bg: 'bg-emerald-900/50', text: 'text-emerald-400', border: 'border-emerald-600', label: 'COMPLETED' },
    archived: { bg: 'bg-gray-800', text: 'text-gray-500', border: 'border-gray-700', label: 'ARCHIVED' },
    backlog: { bg: 'bg-blue-900/50', text: 'text-blue-400', border: 'border-blue-600', label: 'BACKLOG' },
    in_progress: { bg: 'bg-amber-900/50', text: 'text-amber-400', border: 'border-amber-600', label: 'IN PROGRESS' },
    done: { bg: 'bg-emerald-900/50', text: 'text-emerald-400', border: 'border-emerald-600', label: 'DONE' },
    draft: { bg: 'bg-purple-900/50', text: 'text-purple-400', border: 'border-purple-600', label: 'DRAFT' },
    // Priorities
    low: { bg: 'bg-blue-900/50', text: 'text-blue-400', border: 'border-blue-600', label: 'LOW' },
    medium: { bg: 'bg-amber-900/50', text: 'text-amber-400', border: 'border-amber-600', label: 'MEDIUM' },
    high: { bg: 'bg-red-900/50', text: 'text-red-400', border: 'border-red-600', label: 'HIGH' }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider border ${config.bg} ${config.text} ${config.border} ${className}`}>
      {children || config.label}
    </span>
  );
}
