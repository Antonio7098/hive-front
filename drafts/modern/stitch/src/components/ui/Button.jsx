const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium tracking-tight
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg-surface)]
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variants = {
    primary: `
      bg-[var(--color-accent)] text-[var(--color-bg-primary)]
      hover:bg-[var(--color-accent-hover)]
      focus:ring-[var(--color-accent)]
    `,
    secondary: `
      bg-[var(--color-surface-container-high)] text-[var(--color-text-primary)]
      border border-[var(--color-border)]
      hover:bg-[var(--color-bg-hover)]
      focus:ring-[var(--color-border)]
    `,
    ghost: `
      bg-transparent text-[var(--color-text-secondary)]
      hover:bg-[var(--color-accent-glow)]
      focus:ring-[var(--color-accent)]
    `,
    danger: `
      bg-[var(--color-danger)] text-white
      hover:opacity-90
      focus:ring-[var(--color-danger)]
    `
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-[var(--radius-sm)]',
    md: 'px-4 py-2 text-sm rounded-[var(--radius-md)]',
    lg: 'px-6 py-3 text-base rounded-[var(--radius-lg)]'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button