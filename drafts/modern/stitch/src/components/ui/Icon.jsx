import * as LucideIcons from 'lucide-react'

const Icon = ({ 
  name, 
  size = 24, 
  className = '',
  ...props 
}) => {
  const LucideIcon = LucideIcons[name] || LucideIcons.HelpCircle
  
  return (
    <LucideIcon 
      size={size} 
      className={className}
      {...props}
    />
  )
}

export default Icon