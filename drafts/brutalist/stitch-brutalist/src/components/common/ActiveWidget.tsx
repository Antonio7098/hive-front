interface ActiveWidgetProps {
  title: string;
  items: {
    id: string;
    name: string;
    target?: string;
    progress?: number;
  }[];
  className?: string;
}

export function ActiveWidget({ title, items, className = '' }: ActiveWidgetProps) {
  return (
    <div className={`bg-surface-container border-3 border-outline shadow-[8px_8px_0px_0px_#0e0e0e] ${className}`}>
      <div className="border-b-3 border-outline p-5 flex justify-between items-center bg-surface-container-high">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-primary-container animate-pulse"></span>
          <h2 className="font-headline font-black text-xl tracking-widest uppercase">{title}</h2>
        </div>
        <span className="mono-utility text-xs text-on-surface-variant">PROCESS_COUNT: {String(items.length).padStart(2, '0')}</span>
      </div>
      <div className="p-0">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`p-6 hover:bg-surface-container-low transition-colors ${index < items.length - 1 ? 'border-b-2 border-outline' : ''}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-headline font-bold text-lg text-primary-container uppercase">{item.name}</h3>
                {item.target && <p className="text-sm text-on-surface-variant font-medium">TARGET: {item.target}</p>}
              </div>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 ${
                      item.progress && item.progress > i * 33 ? 'bg-primary-container' : 'bg-outline'
                    }`}
                  />
                ))}
              </div>
            </div>
            {item.progress !== undefined && (
              <div className="w-full bg-surface-container-lowest h-6 border-2 border-outline p-1 relative">
                <div className="bg-primary-container h-full" style={{ width: `${item.progress}%` }} />
                <span className="absolute right-2 top-0.5 mono-utility text-[10px] text-on-surface">{item.progress}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
