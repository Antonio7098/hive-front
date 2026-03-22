const Card = ({ 
  children, 
  variant = 'default',
  hoverable = false,
  className = '',
  ...props 
}) => {
  const baseStyles = `
    rounded-xl
    transition-all duration-200
  `

  const variants = {
    default: `
      bg-[var(--color-surface-container-low)]
      border border-white/5
    `,
    elevated: `
      bg-[var(--color-surface-container)]
      border border-white/5
      shadow-lg
    `,
    glass: `
      glass-surface
      border border-white/5
    `
  }

  const hover = hoverable ? `
    hover:border-[var(--color-accent)]/20
    hover:shadow-[0_0_20px_var(--color-accent-glow)]
    cursor-pointer
  ` : ''

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hover} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card