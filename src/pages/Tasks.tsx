import { useState } from 'react';
import { useTasks, useWorkflows } from '../hooks';
import { PageHeader, PageFooter, SectionHeader, ViewSwitcher } from '../components/common';
import { Card } from '../components/ui/Card';
import { TaskListItem } from '../components/features/TaskListItem';
import { KanbanColumn } from '../components/features/KanbanColumn';
import { WorkflowGraph } from '../components/features/WorkflowGraph';
import { BrutalSpinner } from '../components/ui/Loading';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';
import type { ViewMode } from '../components/common/types';

type TaskStatus = 'in_progress' | 'backlog' | 'done';

const KANBAN_COLUMNS: { id: TaskStatus; label: string; icon: string; color: string }[] = [
  { id: 'in_progress', label: 'IN_PROGRESS', icon: 'play_circle', color: 'border-primary-container' },
  { id: 'backlog', label: 'BACKLOG', icon: 'inbox', color: 'border-warning' },
  { id: 'done', label: 'COMPLETED', icon: 'check_circle', color: 'border-success' },
];

function ListView({ tasks }: { tasks: ReturnType<typeof useTasks>['tasks'] }) {
  return (
    <div className="space-y-2">
      {tasks.length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center">
          <p className="font-mono text-sm text-outline">NO_TASKS_FOUND</p>
        </Card>
      ) : (
        tasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
}

function KanbanView({ tasks }: { tasks: ReturnType<typeof useTasks>['tasks'] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {KANBAN_COLUMNS.map((column) => (
        <KanbanColumn
          key={column.id}
          title={column.label}
          icon={column.icon}
          accentColor={column.color}
          tasks={tasks.filter((t) => t.status === column.id)}
        />
      ))}
    </div>
  );
}

function GraphView({ tasks, workflows }: { 
  tasks: ReturnType<typeof useTasks>['tasks'];
  workflows: ReturnType<typeof useWorkflows>['workflows'];
}) {
  if (workflows.length === 0) {
    return (
      <Card variant="outlined" padding="lg" className="text-center">
        <p className="font-mono text-sm text-outline">NO_WORKFLOWS_DEFINED</p>
        <p className="font-mono text-xs text-outline mt-2">CREATE A WORKFLOW TO SEE GRAPH</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {workflows.slice(0, 3).map((workflow) => (
        <WorkflowGraph
          key={workflow.id}
          workflow={workflow}
          tasks={tasks.filter((t) => t.workflowId === workflow.id)}
        />
      ))}
    </div>
  );
}

export function Tasks() {
  const { tasks, isLoading, error } = useTasks();
  const { workflows } = useWorkflows();
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <BrutalSpinner size="lg" thickness="thick" />
          <span className="font-headline font-bold uppercase tracking-widest text-primary-container">
            LOADING_TASKS
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    structuredLogger.error(
      'Failed to load tasks page',
      {
        code: ErrorTaxonomy.API_REQUEST_FAILED.code,
        category: ErrorCategory.API,
        severity: ErrorSeverity.MEDIUM,
        message: error.message,
      }
    );
  }

  const taskCountByStatus = {
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    backlog: tasks.filter((t) => t.status === 'backlog').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader
        breadcrumb="DIRECTORY / ROOT / TASKS"
        title="TASKS"
        actionLabel="+ NEW_TASK"
      />

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-outline">IN_PROGRESS:</span>
            <span className="font-headline font-black text-lg text-primary-container">
              {taskCountByStatus.in_progress}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-outline">BACKLOG:</span>
            <span className="font-headline font-black text-lg text-warning">
              {taskCountByStatus.backlog}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-outline">DONE:</span>
            <span className="font-headline font-black text-lg text-success">
              {taskCountByStatus.done}
            </span>
          </div>
        </div>

        <ViewSwitcher
          activeView={viewMode}
          onViewChange={setViewMode}
        />
      </div>

      <SectionHeader
        label="TASK_MANIFEST"
        dividerWidth="full"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {error && (
        <Card variant="outlined" padding="md" className="mb-6 border-error">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-error">ERROR_LOADING_TASKS</span>
            <span className="text-xs text-on-surface-variant">{error.message}</span>
          </div>
        </Card>
      )}

      <div className="mt-6">
        {viewMode === 'list' && <ListView tasks={tasks} />}
        {viewMode === 'kanban' && <KanbanView tasks={tasks} />}
        {viewMode === 'graph' && <GraphView tasks={tasks} workflows={workflows} />}
      </div>

      <PageFooter />
    </div>
  );
}
