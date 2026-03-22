import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const ExpandableItem = ({ 
  title, 
  subtitle,
  children,
  defaultExpanded = false,
  onClick 
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className="border-b border-[var(--color-border-subtle)] last:border-b-0">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors"
        onClick={() => {
          if (onClick) {
            onClick()
          } else {
            setExpanded(!expanded)
          }
        }}
      >
        <div className="flex items-center gap-3">
          <div className={`
            w-4 h-4 rounded border flex items-center justify-center
            transition-colors
            ${expanded 
              ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' 
              : 'border-[var(--color-outline-variant)]'
            }
          `}>
            {expanded && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-bg-primary)]" />
              </svg>
            )}
          </div>
          <div>
            <h5 className="text-sm font-medium text-[var(--color-text-primary)]">{title}</h5>
            {subtitle && (
              <p className="text-[10px] text-[var(--color-text-muted)]">{subtitle}</p>
            )}
          </div>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-[var(--color-text-muted)] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </div>
      {expanded && (
        <div className="px-4 pb-4 pl-11">
          {children}
        </div>
      )}
    </div>
  )
}

export default ExpandableItem