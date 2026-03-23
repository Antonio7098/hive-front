import { ActiveWidget, TodoWidget, RecentProjectsWidget, PageFooter } from '../components/common';
import { useActiveItems, useTodoItems, useRecentProjects, useData } from '../hooks';

export function Dashboard() {
  const { items: activeItems } = useActiveItems();
  const { items: todoItems } = useTodoItems();
  const { projects: recentProjects } = useRecentProjects();
  const { isConnected } = useData();

  return (
    <div className="p-8 grid grid-cols-12 gap-8 max-w-7xl">
      <div className="col-span-12 bg-surface-container-highest border-2 border-outline px-4 py-2 flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 mono-utility text-xs">
          <span className="text-on-surface-variant">LOC:</span>
          <span className="text-primary-container">ROOT / DASHBOARD / ACTIVE_OPS</span>
          {!isConnected && (
            <span className="text-warning ml-4">[DEMO MODE]</span>
          )}
        </div>
        <div className="flex items-center gap-4 mono-utility text-xs">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-container animate-pulse"></span>
            SYSTEM_HEALTH: NOMINAL
          </span>
          <span className="text-on-surface-variant">SYNC: 12ms</span>
        </div>
      </div>

      <section className="col-span-12 lg:col-span-7 space-y-8">
        <ActiveWidget title="ACTIVE" items={activeItems} />
      </section>

      <aside className="col-span-12 lg:col-span-5 space-y-8">
        <TodoWidget items={todoItems} count={todoItems.length} />
        <RecentProjectsWidget projects={recentProjects} />
      </aside>

      <PageFooter
        className="col-span-12 mt-auto"
        leftContent={
          <div className="flex gap-8">
            <span>CPU_LOAD: 24%</span>
            <span>MEM_USAGE: 6.2GB / 32GB</span>
            <span>DISK_IO: 120MB/s</span>
          </div>
        }
        rightContent={
          <div className="flex gap-4 items-center">
            <span className="text-primary-container">● SECURE_LINK_ESTABLISHED</span>
            <span>2024-05-21 14:32:01 UTC</span>
          </div>
        }
      />
    </div>
  );
}
