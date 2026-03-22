import React from 'react';
import { Pencil, Check } from 'lucide-react';

interface MetadataRowProps {
  label: string;
  value: React.ReactNode;
  editable?: boolean;
  onEdit?: (value: string) => void;
  className?: string;
}

export const MetadataRow: React.FC<MetadataRowProps> = ({
  label,
  value,
  editable = false,
  onEdit,
  className = '',
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(String(value));

  React.useEffect(() => {
    setEditValue(String(value));
  }, [value]);

  const handleSave = () => {
    onEdit?.(editValue);
    setIsEditing(false);
  };

  return (
    <div
      className={`
        flex items-center justify-between
        py-2 border-b border-border
        last:border-b-0
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
        {label}
      </span>
      
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="
                bg-bg-secondary
                border border-border
                text-text-primary
                font-mono text-sm
                px-2 py-1
                w-32
                focus:outline-none focus:border-accent
              "
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') setIsEditing(false);
              }}
            />
            <button
              onClick={handleSave}
              className="p-1 text-accent hover:bg-accent hover:text-bg-primary transition-colors"
            >
              <Check size={14} />
            </button>
          </>
        ) : (
          <>
            <span className="font-mono text-sm text-text-primary">
              {value}
            </span>
            {editable && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-text-secondary hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
              >
                <Pencil size={14} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
