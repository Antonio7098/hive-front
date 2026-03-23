import { ReactNode } from 'react';

interface PageFooterProps {
  className?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export function PageFooter({ className = '', leftContent, rightContent }: PageFooterProps) {
  return (
    <footer className={`mt-16 bg-surface-container-highest border-t-3 border-outline px-6 py-2 flex justify-between items-center text-[10px] font-mono tracking-widest text-on-surface-variant ${className}`}>
      <div className="flex gap-6">
        {leftContent || (
          <>
            <span>SYSTEM_STATUS: <span className="text-primary-container">OPTIMAL</span></span>
            <span>LATENCY: 14MS</span>
            <span>DATABASE: SYNCED</span>
          </>
        )}
      </div>
      <div>
        {rightContent || <span>© 2024 HIVEMIND COMMAND</span>}
      </div>
    </footer>
  );
}
