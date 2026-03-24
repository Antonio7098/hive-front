import { useParams } from 'react-router-dom';
import { Toolbar, ViewSwitcher, KanbanBoard } from '../components/common';
import { Button, Badge, Card, Icon } from '../components/ui';
import { useWorkflow, useTasksByWorkflow, useViewMode } from '../hooks';

export function WorkflowTasks() {
  const { id } = useParams();
  const { workflow, isLoading: workflowLoading } = useWorkflow(id);
  const { tasks, isLoading: tasksLoading } = useTasksByWorkflow(id);
  const { viewMode, setViewMode } = useViewMode();

  if (workflowLoading || tasksLoading || !workflow) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center h-64">
          <span className="font-mono text-primary-container">LOADING...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Toolbar
        tabs={[
          { label: 'Overview', path: `/workflows/${id}`, icon: 'visibility' },
          { label: 'Tasks', path: `/workflows/${id}/tasks`, icon: 'checklist' },
          { label: 'Spec', path: `/workflows/${id}/spec`, icon: 'code' },
          { label: 'Config', path: `/workflows/${id}/config`, icon: 'tune' },
        ]}
        activeTab="Tasks"
        actions={
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-secondary-container animate-pulse">● LIVE_STREAM_ACTIVE</span>
            <Button variant="secondary" size="sm">Execute Now</Button>
          </div>
        }
      />

      <div className="p-8">
        <Card variant="default" padding="none" className="flex flex-col min-h-[600px]">
          <div className="p-4 border-b-2 border-outline bg-surface-container-high flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="font-headline font-black uppercase tracking-widest text-lg">Active_Tasks</h2>
              <ViewSwitcher activeView={viewMode} onViewChange={setViewMode} />
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="filter_list" className="mr-1" size={18} /> Filter_Tasks
            </Button>
          </div>
          <div className="p-6">
            {viewMode === 'kanban' && (
              <KanbanBoard
                columns={[
                  {
                    id: 'backlog',
                    title: 'Backlog',
                    color: 'bg-outline',
                    items: tasks
                      .filter((t) => t.status === 'backlog')
                      .map((task) => ({
                        id: task.id,
                        content: (
                          <Card variant="elevated" padding="md" className="hover:border-primary-container transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                              <div className="p-2 bg-primary-container/10 border border-primary-container">
                                <Icon name="data_object" className="text-primary-container" size={18} />
                              </div>
                              <Badge variant="neutral">Backlog</Badge>
                            </div>
                            <h4 className="font-headline font-bold text-lg uppercase">{task.name}</h4>
                            <p className="text-on-surface-variant text-sm mt-2 font-mono">{task.description}</p>
                          </Card>
                        ),
                      })),
                  },
                  {
                    id: 'active',
                    title: 'Active',
                    color: 'bg-warning',
                    items: tasks
                      .filter((t) => t.status === 'in_progress')
                      .map((task) => ({
                        id: task.id,
                        content: (
                          <Card variant="elevated" padding="md" className="hover:border-primary-container transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                              <div className="p-2 bg-primary-container/10 border border-primary-container">
                                <Icon name="data_object" className="text-primary-container" size={18} />
                              </div>
                              <Badge variant="warning">Active</Badge>
                            </div>
                            <h4 className="font-headline font-bold text-lg uppercase">{task.name}</h4>
                            <p className="text-on-surface-variant text-sm mt-2 font-mono">{task.description}</p>
                          </Card>
                        ),
                      })),
                  },
                  {
                    id: 'done',
                    title: 'Done',
                    color: 'bg-success',
                    items: tasks
                      .filter((t) => t.status === 'done')
                      .map((task) => ({
                        id: task.id,
                        content: (
                          <Card variant="elevated" padding="md" className="hover:border-primary-container transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                              <div className="p-2 bg-primary-container/10 border border-primary-container">
                                <Icon name="data_object" className="text-primary-container" size={18} />
                              </div>
                              <Badge variant="success">Done</Badge>
                            </div>
                            <h4 className="font-headline font-bold text-lg uppercase">{task.name}</h4>
                            <p className="text-on-surface-variant text-sm mt-2 font-mono">{task.description}</p>
                          </Card>
                        ),
                      })),
                  },
                ]}
              />
            )}
            {viewMode === 'list' && (
              <div className="flex flex-col">
                {tasks.map((task) => (
                  <Card key={task.id} variant="elevated" padding="md" className="mb-2 hover:border-primary-container transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary-container/10 border border-primary-container">
                          <Icon name="data_object" className="text-primary-container" size={18} />
                        </div>
                        <div>
                          <h4 className="font-headline font-bold uppercase">{task.name}</h4>
                          <p className="text-on-surface-variant text-sm font-mono">{task.description}</p>
                        </div>
                      </div>
                      <Badge variant={task.status === 'done' ? 'success' : task.status === 'in_progress' ? 'warning' : 'neutral'}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            {viewMode === 'graph' && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Icon name="account_tree" size={48} className="text-outline mb-4" />
                  <p className="font-mono text-outline uppercase tracking-widest">Graph_View: Under_Construction</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}