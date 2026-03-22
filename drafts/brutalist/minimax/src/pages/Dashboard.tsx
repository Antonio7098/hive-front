import React from 'react';
import { Clock, ListTodo, LayoutDashboard } from 'lucide-react';
import { Card, Badge } from '../components/ui';
import { EntityCard, HoneycombBackground } from '../components/common';
import { getActiveWorkflows, getActiveTasks, getTodoTasks, getRecentProjects } from '../data/mock';

export const Dashboard: React.FC = () => {
  const activeWorkflows = getActiveWorkflows();
  const activeTasks = getActiveTasks();
  const todoTasks = getTodoTasks();
  const recentProjects = getRecentProjects(3);

  const runningEntities = [
    ...activeWorkflows.map(w => ({ type: 'workflow' as const, entity: w })),
    ...activeTasks.map(t => ({ type: 'task' as const, entity: t })),
  ];

  return (
    <div className="p-6 lg:p-8 relative">
      <HoneycombBackground />
      
      <div className="relative">
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text-primary uppercase tracking-wider flex items-center gap-3">
            <LayoutDashboard size={32} className="text-accent" />
            Dashboard
          </h1>
          <p className="text-text-secondary font-mono text-sm mt-2">
            Mission Control Center
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 animate-slide-left">
            <Card variant="default" className="border-accent/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full bg-success"
                    style={{ animation: 'pulse-glow 2s infinite' }}
                  />
                  <h2 className="font-display font-bold text-lg uppercase tracking-wider text-accent">
                    Active
                  </h2>
                </div>
                <Badge variant="active" pulse>
                  {runningEntities.length}
                </Badge>
              </div>

              {runningEntities.length > 0 ? (
                <div className="space-y-3">
                  {runningEntities.slice(0, 5).map(({ entity }, index) => (
                    <div
                      key={entity.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <EntityCard
                        entity={entity}
                        variant="compact"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-text-secondary font-mono text-sm">
                  No active workflows or tasks
                </div>
              )}
            </Card>

            <Card variant="default" className="border-warning/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ListTodo size={20} className="text-warning" />
                  <h2 className="font-display font-bold text-lg uppercase tracking-wider text-warning">
                    Todo
                  </h2>
                </div>
                <Badge variant="todo">
                  {todoTasks.length}
                </Badge>
              </div>

              {todoTasks.length > 0 ? (
                <div className="space-y-3">
                  {todoTasks.slice(0, 5).map((task, index) => (
                    <div
                      key={task.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <EntityCard
                        entity={task}
                        variant="compact"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-text-secondary font-mono text-sm">
                  All tasks completed
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-4 animate-slide-right">
            <Card variant="default" className="border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-text-secondary" />
                  <h2 className="font-display font-bold text-lg uppercase tracking-wider text-text-secondary">
                    Recent
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {recentProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <EntityCard
                      entity={project}
                      variant="expanded"
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="default" className="border-border bg-bg-secondary">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg uppercase tracking-wider text-text-primary">
                  Quick Stats
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-bg-elevated border-2 border-black">
                  <div className="text-2xl font-display font-bold text-accent">
                    {getRecentProjects(99).length}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                    Projects
                  </div>
                </div>
                <div className="p-3 bg-bg-elevated border-2 border-black">
                  <div className="text-2xl font-display font-bold text-success">
                    {activeWorkflows.length}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                    Active Flows
                  </div>
                </div>
                <div className="p-3 bg-bg-elevated border-2 border-black">
                  <div className="text-2xl font-display font-bold text-warning">
                    {todoTasks.length}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                    Pending
                  </div>
                </div>
                <div className="p-3 bg-bg-elevated border-2 border-black">
                  <div className="text-2xl font-display font-bold text-accent-light">
                    {activeTasks.length}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                    In Progress
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
