import type { Task } from '../../types/entities';
import { EntityCard } from '../common/EntityCard';
import { Icon } from '../ui/Icon';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  icon?: string;
  accentColor?: string;
  className?: string;
}

export function KanbanColumn({ 
  title, 
  tasks, 
  icon = 'radio_button_unchecked',
  accentColor = 'border-outline',
  className = '' 
}: KanbanColumnProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className={`border-b-3 ${accentColor} pb-3 mb-4`}>
        <div className="flex items-center gap-2">
          <Icon name={icon} size={18} className={accentColor.replace('border-', 'text-')} />
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            {title}
          </h3>
          <span className="text-xs font-mono text-outline ml-auto">
            {tasks.length}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 flex-1">
        {tasks.map((task) => (
          <EntityCard 
            key={task.id} 
            entity={task} 
            type="task" 
            variant="compact" 
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="border-2 border-dashed border-outline-variant p-6 text-center">
            <Icon name="inbox" size={24} className="text-outline mx-auto mb-2" />
            <p className="text-xs font-mono text-outline">NO_TASKS</p>
          </div>
        )}
      </div>
    </div>
  );
}
