import { useParams } from 'react-router-dom';
import { Toolbar, ViewSwitcher, EntityCard, AddCard, KanbanBoard } from '../components/common';
import { Icon } from '../components/ui';
import { useProject, useWorkflowsByProject, useViewMode } from '../hooks';

export function ProjectWorkflows() {
  const { id } = useParams();
  const { project, isLoading: projectLoading } = useProject(id);
  const { workflows, isLoading: workflowsLoading } = useWorkflowsByProject(id);
  const { viewMode, setViewMode } = useViewMode();

  if (projectLoading || workflowsLoading || !project) {
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
          { label: 'OVERVIEW', path: `/projects/${id}` },
          { label: 'WORKFLOWS', path: `/projects/${id}/workflows` },
          { label: 'DOCS', path: `/projects/${id}/docs` },
          { label: 'SETTINGS', path: `/projects/${id}/settings` },
        ]}
        activeTab="WORKFLOWS"
      />

      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black font-headline uppercase tracking-tighter">
            WORKFLOWS_FOR_{project.name.toUpperCase()}
          </h2>
          <ViewSwitcher activeView={viewMode} onViewChange={setViewMode} />
        </div>

        {viewMode === 'kanban' && (
          <KanbanBoard
            columns={[
              {
                id: 'todo',
                title: 'Todo',
                color: 'bg-outline',
                items: workflows
                  .filter((w) => w.status === 'todo')
                  .map((workflow) => ({
                    id: workflow.id,
                    content: <EntityCard entity={workflow} type="workflow" disableLink />,
                  })),
              },
              {
                id: 'active',
                title: 'Active',
                color: 'bg-primary-container',
                items: workflows
                  .filter((w) => w.status === 'active')
                  .map((workflow) => ({
                    id: workflow.id,
                    content: <EntityCard entity={workflow} type="workflow" disableLink />,
                  })),
              },
              {
                id: 'completed',
                title: 'Completed',
                color: 'bg-success',
                items: workflows
                  .filter((w) => w.status === 'completed')
                  .map((workflow) => ({
                    id: workflow.id,
                    content: <EntityCard entity={workflow} type="workflow" disableLink />,
                  })),
              },
            ]}
          />
        )}

        {viewMode === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflows.map((workflow) => (
              <EntityCard key={workflow.id} entity={workflow} type="workflow" />
            ))}
            <AddCard label="ADD_WORKFLOW" />
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
    </div>
  );
}