import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hexagon, LayoutDashboard, Folder } from 'lucide-react';
import { HoneycombBackground } from '../components/common';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/projects', icon: Folder, label: 'Projects' },
];

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg-primary relative">
      <HoneycombBackground />
      
      <div className="relative z-10 flex">
        <aside
          className="
            w-64 min-h-screen
            bg-bg-secondary
            border-r-2 border-border
            flex flex-col
          "
        >
          <div className="p-4 border-b-2 border-border">
            <Link
              to="/"
              className="
                flex items-center gap-3
                text-text-primary
                hover:text-accent
                transition-colors
              "
            >
              <Hexagon
                size={32}
                className="text-accent"
                strokeWidth={2.5}
              />
              <span className="font-display font-bold text-xl uppercase tracking-wider">
                HiveMind
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = location.pathname === path ||
                  (path !== '/' && location.pathname.startsWith(path));
                
                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`
                        flex items-center gap-3
                        px-3 py-2
                        font-mono text-sm uppercase tracking-wider
                        border-2 border-transparent
                        transition-all duration-150
                        ${
                          isActive
                            ? 'bg-accent text-bg-primary border-accent'
                            : 'text-text-secondary hover:text-text-primary hover:border-border'
                        }
                      `.trim().replace(/\s+/g, ' ')}
                    >
                      <Icon size={18} />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t-2 border-border">
            <div className="text-xs font-mono text-text-secondary">
              <span className="text-accent">v1.0.0</span>
              <br />
              System Online
            </div>
          </div>
        </aside>

        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};
