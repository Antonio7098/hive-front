import { Icon } from '../components/ui';

interface TopBarProps {
  title?: string;
  version?: string;
}

export function TopBar({ title = 'HIVEMIND // COMMAND_CENTER', version = 'V4.2.0_STABLE' }: TopBarProps) {
  return (
    <header className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 bg-surface-dim border-b-3 border-outline font-headline font-bold uppercase tracking-[0.1em]">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-black text-primary-container">{title}</h1>
        <span className="bg-surface-container px-2 py-0.5 border border-outline text-[10px] mono-utility text-on-surface-variant">
          {version}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-surface-container-lowest border-2 border-outline px-3 py-1.5 w-64">
          <Icon name="search" className="text-on-surface-variant mr-2" size={18} />
          <input
            className="bg-transparent border-none focus:ring-0 text-sm font-headline uppercase w-full placeholder:text-on-surface-variant/50"
            placeholder="QUERY_SYSTEM..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-4 text-on-surface-variant">
          <button className="hover:text-primary-container transition-colors active:bg-primary-container active:text-on-primary-container p-1">
            <Icon name="notifications" />
          </button>
          <button className="hover:text-primary-container transition-colors active:bg-primary-container active:text-on-primary-container p-1">
            <Icon name="terminal" />
          </button>
          <button className="hover:text-primary-container transition-colors active:bg-primary-container active:text-on-primary-container p-1 border-2 border-primary-container">
            <Icon name="account_circle" />
          </button>
        </div>
      </div>
    </header>
  );
}
