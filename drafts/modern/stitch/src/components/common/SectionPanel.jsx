const SectionPanel = ({ 
  leftPanel, 
  rightPanel,
  leftWidth = '40%',
  className = '' 
}) => {
  return (
    <div className={`grid gap-8 ${className}`} style={{ gridTemplateColumns: `${leftWidth} 1fr` }}>
      <div className="space-y-6">
        {leftPanel}
      </div>
      <div className="space-y-6">
        {rightPanel}
      </div>
    </div>
  )
}

export default SectionPanel