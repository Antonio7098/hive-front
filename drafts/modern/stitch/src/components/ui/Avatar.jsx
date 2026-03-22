const Avatar = ({ 
  src, 
  alt, 
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const fallbackStyles = `
    bg-[var(--color-surface-container-highest)]
    flex items-center justify-center
    text-[var(--color-accent)]
    font-medium
  `

  if (!src) {
    return (
      <div className={`${sizes[size]} ${fallbackStyles} rounded-full border border-[var(--color-accent)]/20 ${className}`}>
        <span className="text-sm">AM</span>
      </div>
    )
  }

  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden border border-[var(--color-accent)]/20 ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default Avatar