export interface TacticalVisualizerProps {
  className?: string;
}

export function TacticalVisualizer({ className = '' }: TacticalVisualizerProps) {
  return (
    <section className={`bg-surface-container-lowest border-2 border-outline p-4 h-48 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-20 flex items-center justify-center">
        <svg className="stroke-primary-container fill-none" height="100%" width="100%">
          <path d="M0,50 Q100,20 200,50 T400,50 T600,50 T800,50" strokeWidth="2"></path>
          <path d="M0,70 Q150,40 300,70 T600,70 T900,70" strokeDasharray="4,4" strokeWidth="1"></path>
        </svg>
      </div>
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-mono text-primary-container font-bold uppercase tracking-widest">LIVE_CORE_THROUGHPUT</span>
          <span className="text-[10px] font-mono text-outline">v9.2.1-STABLE</span>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-xs font-mono">
            <div className="flex items-center"><span className="w-2 h-2 bg-primary-container mr-2"></span> DATA_FLOW: 1.4 GB/s</div>
            <div className="flex items-center"><span className="w-2 h-2 bg-error mr-2"></span> LATENCY: 12ms</div>
          </div>
          <div className="text-2xl font-black font-headline tracking-tighter uppercase italic text-on-surface-variant">HVM_SYS_OK</div>
        </div>
      </div>
    </section>
  );
}