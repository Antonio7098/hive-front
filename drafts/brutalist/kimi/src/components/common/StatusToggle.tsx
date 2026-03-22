import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Toggle } from '../ui/Toggle';

interface StatusToggleProps {
  entityId: string;
  isActive: boolean;
  onToggle: (id: string, active: boolean) => Promise<void>;
  labels?: { on: string; off: string };
}

export function StatusToggle({
  entityId,
  isActive,
  onToggle,
  labels = { on: 'ACTIVE', off: 'INACTIVE' }
}: StatusToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    try {
      await onToggle(entityId, checked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Toggle
        checked={isActive}
        onChange={handleToggle}
        disabled={isLoading}
      />
      <span className={`text-sm font-mono font-semibold uppercase tracking-wider ${
        isActive ? 'text-accent' : 'text-text-secondary'
      }`}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-3 h-3 animate-spin" />
            Loading...
          </span>
        ) : (
          isActive ? labels.on : labels.off
        )}
      </span>
    </div>
  );
}
