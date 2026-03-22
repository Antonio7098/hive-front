const StatusToggle = ({ active, onChange, loading }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(!active)}
        disabled={loading}
        className={`
          relative w-12 h-6
          rounded-full
          transition-all duration-300
          ${active 
            ? 'bg-[var(--color-accent)]' 
            : 'bg-[var(--color-surface-container-high)]'
          }
          ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div 
          className={`
            absolute top-1 w-4 h-4
            rounded-full
            bg-white
            shadow-md
            transition-all duration-300
            ${active ? 'left-7' : 'left-1'}
          `}
        />
      </button>
      <span className={`
        text-xs font-medium
        ${active ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}
      `}>
        {active ? 'Active' : 'Inactive'}
      </span>
    </div>
  )
}

export default StatusToggle