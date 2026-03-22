import { Outlet, NavLink } from 'react-router-dom';
import { Hexagon, LayoutDashboard, FolderKanban, Settings, Bell, User } from 'lucide-react';

export default function AppLayout() {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex honeycomb-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-secondary border-r-3 border-border flex flex-col sticky top-0 h-screen z-10">
        {/* Logo */}
        <div className="p-6 border-b-3 border-border">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Hexagon className="w-10 h-10 text-accent stroke-[2.5]" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-bg-primary">
                H
              </span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-text-primary uppercase tracking-wider group-hover:text-accent transition-colors">
                HiveMind
              </h1>
              <p className="text-xs font-mono text-text-secondary">v1.0.0</p>
            </div>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 font-mono text-sm font-semibold uppercase tracking-wider border-3 transition-all duration-150 ${
                  isActive
                    ? 'bg-accent text-bg-primary border-accent'
                    : 'text-text-secondary border-transparent hover:border-border hover:text-text-primary'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t-3 border-border space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 font-mono text-sm text-text-secondary hover:text-text-primary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="flex-1 text-left">Notifications</span>
            <span className="px-2 py-0.5 text-xs bg-warning text-bg-primary">3</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 font-mono text-sm text-text-secondary hover:text-text-primary transition-colors">
            <User className="w-5 h-5" />
            <span className="flex-1 text-left">Profile</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
