import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import { Icon } from '../components/ui';

interface SidebarProps {
  children?: ReactNode;
}

const navItems = [
  { to: '/', icon: 'grid_view', label: 'DASHBOARD' },
  { to: '/projects', icon: 'account_tree', label: 'PROJECTS' },
  { to: '/workflows', icon: 'reorder', label: 'WORKFLOWS' },
  { to: '/tasks', icon: 'task_alt', label: 'TASKS' },
  { to: '/analytics', icon: 'bar_chart', label: 'ANALYTICS' },
  { to: '/settings', icon: 'settings', label: 'SETTINGS' },
];

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-64 h-screen border-r-3 border-outline flex flex-col sticky top-0 left-0 bg-surface-dim shadow-[4px_4px_0px_0px_#0e0e0e] z-[60]">
      <div className="p-6 flex flex-col gap-1 border-b-3 border-outline">
        <div className="text-2xl font-black tracking-tighter text-primary-container font-headline">HIVEMIND</div>
        <div className="text-[10px] font-headline uppercase tracking-widest font-bold text-on-surface-variant">OPERATOR_01</div>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center px-6 py-4 gap-4
              font-headline uppercase tracking-widest font-bold
              transition-all duration-75
              ${isActive
                ? 'bg-primary-container text-on-primary-container border-y-2 border-black'
                : 'text-on-surface hover:bg-surface-container-high hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#fbbf24]'
              }
            `}
          >
            <Icon name={item.icon as any} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6">
        <button className="w-full bg-primary-container text-on-primary-fixed font-headline font-bold uppercase tracking-widest py-3 border-2 border-black shadow-[4px_4px_0px_0px_#0e0e0e] hover:shadow-[6px_6px_0px_0px_#0e0e0e] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
          NEW_PROJECT
        </button>
      </div>

      {children}
    </aside>
  );
}
