import { Search } from 'lucide-react'

const SearchBar = ({ 
  placeholder = 'Search...',
  className = ''
}) => {
  return (
    <div className={`relative w-full group ${className}`}>
      <Search 
        size={16} 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]/40" 
      />
      <input
        type="text"
        placeholder={placeholder}
        className={`
          w-full
          bg-[var(--color-surface-container-low)]
          border-none
          rounded-full
          py-2 pl-10 pr-4
          text-sm
          text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-primary)]/20
          focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30
          transition-all
        `}
      />
    </div>
  )
}

export default SearchBar