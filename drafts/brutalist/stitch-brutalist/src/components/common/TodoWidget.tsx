import { Link } from 'react-router-dom';
import { Icon } from '../ui';
import { CardHeader } from '../ui/Card';

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
    <div className={`card-brutal p-0 ${className}`}>
      <CardHeader
        title="TODO"
        action={count !== undefined ? (
          <span className="bg-secondary-container text-white px-3 py-1 text-sm font-bold border-2 border-black">{count}</span>
        ) : undefined}
      />
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
