const ProgressBar = ({ 
  value, 
  showIndicator = true,
  className = '' 
}) => {
  return (
    <div className={`h-1 w-full bg-[var(--color-outline-variant)]/20 rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full relative transition-all duration-500"
        style={{ width: `${value}%` }}
      >
        {showIndicator && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_var(--color-accent)]" />
        )}
      </div>
    </div>
  )
}

export default ProgressBar