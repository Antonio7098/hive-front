import { Link } from 'react-router-dom';
import { Icon } from '../ui';

interface TodoWidgetProps {
  items: {
    id: string;
    name: string;
    project: string;
    priority: 'low' | 'medium' | 'high';
  }[];
  count?: number;
  className?: string;
}

const priorityColors = {
  low: 'bg-outline',
  medium: 'bg-secondary-container',
  high: 'bg-primary-container',
};

export function TodoWidget({ items, count, className = '' }: TodoWidgetProps) {
  return (
    <div className={`bg-surface-container border-3 border-outline shadow-[8px_8px_0px_0px_#0e0e0e] ${className}`}>
      <div className="border-b-3 border-outline p-5 flex justify-between items-center bg-surface-container-high">
        <h2 className="font-headline font-black text-xl tracking-widest uppercase">TODO</h2>
        {count !== undefined && (
          <span className="bg-secondary-container text-white px-3 py-1 text-sm font-bold border-2 border-black">{count}</span>
        )}
      </div>
      <div className="divide-y-2 divide-outline">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/tasks/${item.id}`}
            className="p-4 flex items-center justify-between hover:bg-surface-container-low group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className={`w-2 h-2 ${priorityColors[item.priority]}`} />
              <div>
                <h4 className="font-bold text-sm uppercase">{item.name}</h4>
                <p className="text-[10px] mono-utility text-on-surface-variant">P: {item.project}</p>
              </div>
            </div>
            <Icon name="chevron_right" className="text-outline group-hover:text-primary-container" />
          </Link>
        ))}
      </div>
    </div>
  );
}
