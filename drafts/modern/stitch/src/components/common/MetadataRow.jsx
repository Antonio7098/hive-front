import { Icon } from '../ui'

const MetadataRow = ({ icon, label, value, variant = 'default' }) => {
  return (
    <div className={`
      flex items-center justify-between
      py-2 px-3
      rounded-lg
      ${variant === 'highlight' 
        ? 'bg-[var(--color-accent)]/5' 
        : 'bg-[var(--color-surface-container-low)]'
      }
    `}>
      <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
        {icon && <Icon name={icon} size={14} />}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <span className={`
        text-sm font-medium
        ${variant === 'highlight' 
          ? 'text-[var(--color-accent)]' 
          : 'text-[var(--color-text-primary)]'
        }
      `}>
        {value}
      </span>
    </div>
  )
}

export default MetadataRow