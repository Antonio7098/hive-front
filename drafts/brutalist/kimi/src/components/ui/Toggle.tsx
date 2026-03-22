interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`w-12 h-6 border-3 transition-colors duration-150 ${
            checked ? 'bg-accent border-accent' : 'bg-bg-primary border-border'
          }`}
        />
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 border-2 transition-transform duration-150 ${
            checked
              ? 'translate-x-6 bg-bg-primary border-bg-primary'
              : 'translate-x-0 bg-text-secondary border-text-secondary'
          }`}
        />
      </div>
      {label && (
        <span className="text-sm font-mono text-text-secondary uppercase tracking-wider">
          {label}
        </span>
      )}
    </label>
  );
}
