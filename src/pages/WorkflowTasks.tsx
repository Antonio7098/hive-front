import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWorkflow, useTasksByWorkflow } from '../hooks';
import { PageHeader, PageFooter, SectionHeader, ViewSwitcher } from '../components/common';
import { Card } from '../components/ui/Card';
import { TaskListItem } from '../components/features/TaskListItem';
import { KanbanColumn } from '../components/features/KanbanColumn';
import { WorkflowGraph } from '../components/features/WorkflowGraph';
import { Icon } from '../components/ui';
import { BrutalSpinner } from '../components/ui/Loading';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';
import type { ViewMode } from '../components/common/types';

const KANBAN_COLUMNS = [
  { id: 'in_progress' as const, label: 'IN_PROGRESS', icon: 'play_circle', color: 'border-primary-container' },
  { id: 'backlog' as const, label: 'BACKLOG', icon: 'inbox', color: 'border-warning' },
  { id: 'done' as const, label: 'COMPLETED', icon: 'check_circle', color: 'border-success' },
];

export function WorkflowTasks() {
  const { id } = useParams<{ id: string }>();
  const { workflow, isLoading: workflowLoading, error: workflowError } = useWorkflow(id);
  const { tasks, isLoading: tasksLoading, error: tasksError } = useTasksByWorkflow(id);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');

  if (workflowLoading || tasksLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <BrutalSpinner size="lg" thickness="thick" />
          <span className="font-headline font-bold uppercase tracking-widest text-primary-container">
            LOADING
          </span>
        </div>
      </div>
    );
  }

  if (workflowError || tasksError) {
    const error = workflowError || tasksError;
    structuredLogger.error(
      'Failed to load workflow tasks',
      {
        code: ErrorTaxonomy.API_REQUEST_FAILED.code,
        category: ErrorCategory.API,
        severity: ErrorSeverity.MEDIUM,
        message: error?.message || 'Unknown error',
      },
      { workflowId: id }
    );
  }

  if (!workflow) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <PageHeader breadcrumb="ERROR" title="WORKFLOW_NOT_FOUND" />
        <div className="bg-surface-container border-2 border-error p-6">
          <p className="font-mono text-sm text-error">WORKFLOW_NOT_FOUND: {id}</p>
        </div>
        <PageFooter />
      </div>
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
        breadcrumb={`WORKFLOWS / ${workflow.name} / TASKS`}
        title="TASKS"
      />

      <div className="mb-8 flex items-center justify-between">
        <Link
          to={`/workflows/${id}`}
          className="flex items-center gap-2 text-sm font-mono text-primary-container hover:underline"
        >
          <Icon name="arrow_back" size={16} />
          BACK_TO_WORKFLOW
        </Link>

        <ViewSwitcher activeView={viewMode} onViewChange={setViewMode} />
      </div>

      <div className="mb-8 flex items-center gap-8">
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

      <SectionHeader label="TASK_MANIFEST" dividerWidth="full" />

      {(workflowError || tasksError) && (
        <Card variant="outlined" padding="md" className="mb-6 border-error">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-error">ERROR_LOADING</span>
            <span className="text-xs text-on-surface-variant">
              {(workflowError || tasksError)?.message}
            </span>
          </div>
        </Card>
      )}

      <div className="mt-6">
        {viewMode === 'list' && (
          <div className="space-y-2">
            {tasks.length > 0 ? (
              tasks.map((task) => <TaskListItem key={task.id} task={task} />)
            ) : (
              <Card variant="outlined" padding="lg" className="text-center">
                <p className="font-mono text-sm text-outline">NO_TASKS_IN_WORKFLOW</p>
              </Card>
            )}
          </div>
        )}

        {viewMode === 'kanban' && (
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
        )}

        {viewMode === 'graph' && (
          <WorkflowGraph workflow={workflow} tasks={tasks} />
        )}
      </div>

      <PageFooter />
    </div>
  );
}
