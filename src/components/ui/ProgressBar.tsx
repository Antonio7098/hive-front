interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full bg-surface-container-lowest h-6 border-2 border-outline p-1 relative ${className}`}>
      <div
        className="bg-primary-container h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
      {showLabel && (
        <span className="absolute right-2 top-0.5 mono-utility text-[10px] text-on-surface">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
