const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '' 
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium uppercase tracking-wider
    rounded-full
  `

  const variants = {
    default: `
      bg-[var(--color-surface-container-high)]
      text-[var(--color-text-secondary)]
    `,
    primary: `
      bg-[var(--color-accent)]/10
      text-[var(--color-accent)]
      border border-[var(--color-accent)]/20
    `,
    secondary: `
      bg-[var(--color-secondary)]/10
      text-[var(--color-secondary)]
    `,
    success: `
      bg-green-500/10
      text-green-400
    `,
    warning: `
      bg-[var(--color-warning)]/10
      text-[var(--color-warning)]
    `,
    danger: `
      bg-[var(--color-danger)]/10
      text-[var(--color-danger)]
    `,
    realtime: `
      bg-[var(--color-primary)]/10
      text-[var(--color-primary)]
      border border-[var(--color-primary)]/20
    `
  }

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[8px]',
    md: 'px-2 py-1 text-[10px]',
    lg: 'px-3 py-1.5 text-xs'
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge