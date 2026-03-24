import { ReactNode, useEffect, useState } from 'react';
import { Icon, Button } from '../ui';

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  defaultVariant?: 'sidebar' | 'modal';
}

export function DetailPanel({
  isOpen,
  onClose,
  title,
  subtitle,
  actions,
  children,
  className = '',
  defaultVariant = 'sidebar',
}: DetailPanelProps) {
  const [variant, setVariant] = useState<'sidebar' | 'modal'>(defaultVariant);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isSidebar = variant === 'sidebar';

  return (
    <div className={`fixed inset-0 z-50 flex ${className}`}>
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
        <div
          className={`
            ${isSidebar ? 'absolute right-0 top-0 bottom-0 w-full max-w-2xl border-l-2 animate-slide-in' : 'relative m-auto max-w-4xl w-full rounded-lg border-2'}
            bg-surface-container-lowest border-outline shadow-2xl flex flex-col
            ${isSidebar ? '' : 'max-h-[90vh]'}
          `}
        >
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-outline bg-surface-container">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary-container/10 border border-primary-container">
              <Icon name="visibility" className="text-primary-container" size={20} />
            </div>
            <div>
              <h2 className="font-headline font-black text-lg uppercase tracking-wider text-on-surface">
                {title}
              </h2>
              {subtitle && (
                <p className="font-mono text-xs text-outline mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVariant(isSidebar ? 'modal' : 'sidebar')}
              title={isSidebar ? 'Switch to Modal' : 'Switch to Sidebar'}
            >
              <Icon name={isSidebar ? 'expand_more' : 'expand_less'} size={16} />
            </Button>
            {actions}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="close" size={20} />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

interface PanelSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PanelSection({ title, children, className = '' }: PanelSectionProps) {
  return (
    <div className={`p-6 border-b border-outline-variant ${className}`}>
      <h3 className="font-headline font-black text-xs uppercase tracking-widest text-outline mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: string | null | undefined;
  className?: string;
}

export function DetailRow({ label, value, className = '' }: DetailRowProps) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-widest text-outline w-32 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="font-mono text-sm text-on-surface-variant flex-1 break-all">
        {value ?? <span className="text-outline italic">null</span>}
      </span>
    </div>
  );
}
