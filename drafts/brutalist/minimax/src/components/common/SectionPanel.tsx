import React from 'react';

interface SectionPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: string;
  className?: string;
}

export const SectionPanel: React.FC<SectionPanelProps> = ({
  left,
  right,
  leftWidth = '40%',
  className = '',
}) => {
  return (
    <div
      className={`
        grid gap-6
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{
        gridTemplateColumns: `${leftWidth} 1fr`,
      }}
    >
      <div className="bg-bg-elevated border-2 border-border p-4 animate-fade-in">
        {left}
      </div>
      <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {right}
      </div>
    </div>
  );
};
