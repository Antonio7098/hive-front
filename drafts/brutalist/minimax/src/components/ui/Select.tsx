import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  onChange,
  className = '',
  value,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-mono text-xs uppercase tracking-wider text-text-secondary">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full
          bg-bg-secondary
          border-2 border-border
          text-text-primary
          font-mono text-sm
          px-4 py-2
          focus:outline-none focus:border-accent
          transition-colors duration-150
          cursor-pointer
          appearance-none
          bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23d97706%22%20d%3D%22M6%208L2%204h8z%22%2F%3E%3C%2Fsvg%3E')]
          bg-no-repeat bg-[position:right_12px_center]
          pr-10
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
