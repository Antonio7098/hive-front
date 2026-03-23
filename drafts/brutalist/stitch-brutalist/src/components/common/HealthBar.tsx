interface HealthBarProps {
  className?: string;
}

export function HealthBar({ className = '' }: HealthBarProps) {
  return (
    <div className={`flex items-end space-x-1 h-8 ${className}`}>
      <div className="w-2 h-full bg-primary-container"></div>
      <div className="w-2 h-5/6 bg-primary-container"></div>
      <div className="w-2 h-full bg-primary-container"></div>
      <div className="w-2 h-4/6 bg-primary-container"></div>
      <div className="w-2 h-3/6 bg-primary-container"></div>
    </div>
  );
}
