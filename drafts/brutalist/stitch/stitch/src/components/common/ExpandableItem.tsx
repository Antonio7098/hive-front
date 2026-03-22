import { ReactNode, useState } from 'react';
import { Icon } from '../ui';

interface ExpandableItemProps {
  title: string;
  subtitle?: string;
  status?: 'completed' | 'active' | 'pending';
  children?: ReactNode;
  className?: string;
}

const statusDotColors = {
  completed: 'bg-primary-container',
  active: 'bg-secondary-container',
  pending: 'bg-outline',
};

export function ExpandableItem({ title, subtitle, status, children, className = '' }: ExpandableItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`border-2 border-outline ${className}`}>
      <div
        className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container-high cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          {status && <span className={`w-2 h-2 ${statusDotColors[status]}`} />}
          <div>
            <h4 className="font-headline font-bold uppercase">{title}</h4>
            {subtitle && <p className="text-[10px] mono-utility text-on-surface-variant">{subtitle}</p>}
          </div>
        </div>
        <Icon name={isExpanded ? 'expand_less' : 'expand_more'} className="text-outline group-hover:text-primary-container" />
      </div>
      {isExpanded && children && (
        <div className="p-4 border-t-2 border-outline bg-surface-container">
          {children}
        </div>
      )}
    </div>
  );
}
