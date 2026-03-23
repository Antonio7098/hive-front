import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../ui';

interface TabItem {
  label: string;
  path?: string;
  icon?: string;
  count?: number;
}

interface ToolbarProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  actions?: ReactNode;
  className?: string;
}

export function Toolbar({ tabs, activeTab, onTabChange, actions, className = '' }: ToolbarProps) {
  return (
    <nav className={`bg-surface-container px-6 py-0 border-b-3 border-outline flex items-center justify-between ${className}`}>
      <div className="flex h-14">
        {tabs.map((tab) => (
          <NavLink
            key={tab.label}
            to={tab.path || '#'}
            onClick={() => onTabChange?.(tab.label)}
            className={({ isActive }) => `
              px-6 h-full flex items-center
              font-headline font-bold uppercase tracking-widest
              transition-colors border-b-4
              ${activeTab === tab.label || isActive
                ? 'text-primary-container border-b-primary-container bg-surface-container-high'
                : 'text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high'
              }
            `}
          >
            {tab.icon && <Icon name={tab.icon as any} className="mr-2" size={18} />}
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 bg-secondary-container text-white px-2 py-0.5 text-xs font-bold border border-black">
                {tab.count}
              </span>
            )}
          </NavLink>
        ))}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </nav>
  );
}
