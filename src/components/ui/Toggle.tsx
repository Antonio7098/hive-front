import { useState } from 'react';

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !checked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <span className="text-[10px] font-black uppercase text-primary-container">{label}</span>
      <div
        onClick={handleToggle}
        className={`
          w-12 h-6 bg-surface-container-lowest border-2 border-outline
          flex items-center px-1 cursor-pointer
          transition-colors duration-150
          ${checked ? 'bg-primary-container' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <div
          className={`
            w-4 h-4 bg-black
            transition-transform duration-150
            ${checked ? 'translate-x-6' : 'translate-x-0'}
          `}
        />
      </div>
    </label>
  );
}
