import { Zap, Clock, Folder } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { EntityCard } from '../components/common/EntityCard';
import { getActiveTasks, getTodoTasks, getRecentProjects } from '../data/mock';

export default function Dashboard() {
  const activeTasks = getActiveTasks();
  const todoTasks = getTodoTasks();
  const recentProjects = getRecentProjects(3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="font-display font-bold text-3xl text-text-primary uppercase tracking-wide">
          Dashboard
        </h1>
        <p className="mt-2 font-mono text-text-secondary">
          Overview of your active work across all projects
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Widget */}
        <Card variant="expanded" padding="lg" className="lg:row-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-accent rounded-full animate-ping" />
            </div>
            <h2 className="font-display font-bold text-xl text-text-primary uppercase tracking-wider">
              Active
            </h2>
            <span className="ml-auto px-2 py-1 text-xs font-mono bg-accent text-bg-primary">
              {activeTasks.length}
            </span>
          </div>

          <div className="space-y-4">
            {activeTasks.length === 0 ? (
              <p className="text-text-secondary font-mono text-sm">No active tasks</p>
            ) : (
              activeTasks.map((task) => (
                <EntityCard key={task.id} entity={task} variant="compact" />
              ))
            )}
          </div>
        </Card>

        {/* Todo Widget */}
        <Card variant="expanded" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-warning" />
            <h2 className="font-display font-bold text-xl text-text-primary uppercase tracking-wider">
              Todo
            </h2>
            <span className="ml-auto px-2 py-1 text-xs font-mono bg-warning text-bg-primary">
              {todoTasks.length}
            </span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {todoTasks.length === 0 ? (
              <p className="text-text-secondary font-mono text-sm">No pending tasks</p>
            ) : (
              todoTasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 bg-bg-elevated border-3 border-border hover:border-accent transition-colors cursor-pointer"
                >
                  <div className="w-2 h-2 bg-warning" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-text-primary truncate">
                      {task.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {task.projectId} · {task.priority} priority
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Recent Projects Widget */}
        <Card variant="expanded" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-text-secondary" />
            <h2 className="font-display font-bold text-xl text-text-primary uppercase tracking-wider">
              Recent
            </h2>
            <Folder className="w-4 h-4 text-text-secondary ml-auto" />
          </div>

          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-3 p-3 bg-bg-elevated border-3 border-border hover:border-accent transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-bg-primary border-2 border-border">
                  <span className="font-display font-bold text-accent text-sm">
                    {project.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm text-text-primary truncate">
                    {project.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {project.recentActivity.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
