import { Badge } from '../ui';
import { Icon } from '../ui';

interface SubtaskItem {
  id: string;
  name: string;
  completed: boolean;
}

interface SubtaskListProps {
  subtasks: SubtaskItem[];
  onSubtaskClick?: (id: string) => void;
  className?: string;
}

export function SubtaskList({ subtasks, onSubtaskClick, className = '' }: SubtaskListProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {subtasks.map((subtask, index) => (
        <div
          key={subtask.id}
          onClick={() => onSubtaskClick?.(subtask.id)}
          className={`
            group flex items-center gap-4 bg-surface-container-low border-2 border-outline p-4 
            hover:border-primary-container transition-colors cursor-pointer
            ${subtask.completed ? 'opacity-50' : ''}
            ${index === 1 && !subtask.completed ? 'border-primary-container bg-surface-container-high' : ''}
          `}
        >
          <div className={`
            w-6 h-6 border-2 border-primary-container flex items-center justify-center
            ${subtask.completed ? 'bg-primary-container' : ''}
          `}>
            {subtask.completed && <Icon name="check" className="text-black" size={14} />}
          </div>
          <span className={`flex-1 font-headline font-bold text-sm tracking-wide ${subtask.completed ? 'line-through' : ''}`}>
            {subtask.name}
          </span>
          <Badge 
            variant={subtask.completed ? 'success' : index === 1 ? 'warning' : 'neutral'} 
            size="sm"
          >
            {subtask.completed ? 'Done' : index === 1 ? 'Active' : 'Pending'}
          </Badge>
        </div>
      ))}
    </div>
  );
}
