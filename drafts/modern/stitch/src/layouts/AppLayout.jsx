import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, FolderGit2, GitBranch, CheckSquare, Settings, Bell, HelpCircle } from 'lucide-react'
import { Avatar, Icon } from '../components/ui'
import { SearchBar } from '../components/common'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderGit2, label: 'Projects' },
  { to: '/workflows', icon: GitBranch, label: 'Workflows' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' }
]

const AppLayout = () => {
  return (
    <div className="flex min-h-screen honeycomb-pattern">
      <aside className="h-screen w-64 fixed left-0 top-0 border-r border-[var(--color-accent)]/10 bg-[var(--color-bg-surface)] flex flex-col py-8 px-4 z-50">
        <div className="mb-12 px-2">
          <h1 className="text-lg font-light tracking-[0.2em] uppercase text-[var(--color-accent)]">
            HiveMind
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/40 mt-1">
            Precision Luminescence
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(({ to, icon: NavIcon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-300
                ${isActive 
                  ? 'text-[var(--color-accent)] font-medium bg-[var(--color-accent)]/5 border-r-2 border-[var(--color-accent)]' 
                  : 'text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/5'
                }
              `}
            >
              <NavIcon size={20} />
              <span className="font-light tracking-tight">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-[var(--color-accent)]/5">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/5 transition-all duration-300"
          >
            <Settings size={20} />
            <span className="font-light tracking-tight">Settings</span>
          </NavLink>

          <div className="mt-6 flex items-center gap-3 px-2">
            <Avatar size="md" />
            <div>
              <p className="text-xs font-medium">Alex Mercer</p>
              <p className="text-[10px] text-[var(--color-text-primary)]/40">Lead Architect</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="ml-64 min-h-screen block">
        <header className="sticky top-0 z-40 w-full bg-[var(--color-bg-surface)]/80 backdrop-blur-xl border-b border-[var(--color-accent)]/10 flex justify-between items-center h-16 px-8">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <SearchBar placeholder="Search the Hive..." />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="text-[var(--color-text-primary)]/60 hover:text-[var(--color-accent)] transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-secondary)] rounded-full" />
              </button>
              <button className="text-[var(--color-text-primary)]/60 hover:text-[var(--color-accent)] transition-colors">
                <HelpCircle size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout