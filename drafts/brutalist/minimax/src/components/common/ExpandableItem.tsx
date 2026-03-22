import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface ExpandableItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export const ExpandableItem: React.FC<ExpandableItemProps> = ({
  title,
  children,
  defaultExpanded = false,
  className = '',
}) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <div
      className={`
        border-2 border-black
        bg-bg-elevated
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={`
          w-full
          flex items-center gap-3
          p-3
          font-mono text-sm uppercase tracking-wider
          hover:bg-bg-secondary
          transition-colors
          text-left
          ${expanded ? 'text-accent' : 'text-text-primary'}
        `.trim().replace(/\s+/g, ' ')}
      >
        {expanded ? (
          <ChevronDown size={16} className="text-accent" />
        ) : (
          <ChevronRight size={16} />
        )}
        {title}
      </button>
      
      <div
        className={`
          overflow-hidden
          transition-all duration-200
          ${expanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `.trim().replace(/\s+/g, ' ')}
      >
        <div className="p-3 pt-0 border-t border-border">
          {children}
        </div>
      </div>
    </div>
  );
};
