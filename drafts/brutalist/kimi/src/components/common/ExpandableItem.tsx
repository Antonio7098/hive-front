import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ExpandableItemProps {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function ExpandableItem({
  header,
  children,
  defaultExpanded = false
}: ExpandableItemProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-3 border-border bg-bg-secondary">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-bg-elevated transition-colors"
      >
        <div className="flex-1">{header}</div>
        <div className="ml-4 text-text-secondary">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="border-t-3 border-border p-4 animate-expand">
          {children}
        </div>
      )}
    </div>
  );
}
