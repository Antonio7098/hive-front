const Input = ({ 
  label,
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
          {label}
        </label>
      )}
      <input
        className={`
          w-full
          bg-[var(--color-surface-container-low)]
          border border-[var(--color-border)]
          rounded-full
          py-2 px-4
          text-sm
          text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-primary)]/20
          focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30
          transition-all
          ${error ? 'border-[var(--color-danger)]' : ''}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-[var(--color-danger)]">{error}</span>
      )}
    </div>
  )
}

export default Input