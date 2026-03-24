import { useParams } from 'react-router-dom';
import { Toolbar, ViewSwitcher, EntityCard, MetadataGrid, MetadataCell, HealthBar, AddCard, DetailFooter, SpecBlock } from '../components/common';
import { Button, Badge, Toggle } from '../components/ui';
import { TacticalVisualizer } from '../components/features/TacticalVisualizer';
import { useProject, useWorkflowsByProject, useViewMode, useToggle } from '../hooks';

export function ProjectDetail() {
  const { id } = useParams();
  const { project, isLoading: projectLoading } = useProject(id);
  const { workflows, isLoading: workflowsLoading } = useWorkflowsByProject(id);
  const { viewMode, setViewMode } = useViewMode();
  const { checked: isActive, onChange: setIsActive, label: activeLabel } = useToggle(true, { onLabel: 'Active', offLabel: 'Inactive' });

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
        activeTab="DOCS"
        actions={
          <div className="flex items-center gap-3">
            <span className="font-headline text-xs font-bold uppercase text-on-surface-variant tracking-tighter">PROJECT STATE:</span>
            <Toggle checked={isActive} onChange={setIsActive} label={activeLabel} />
          </div>
        }
      />

      <div className="p-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary">{project.priority || 'ALPHA_CLASS'}</Badge>
            <h1 className="text-6xl font-black font-headline tracking-tighter text-on-surface">{project.name}</h1>
            <SpecBlock
              title={`// PROJECT_INITIALIZATION_STRING: "${project.id.toUpperCase()}-X9-GLOBAL"`}
              rows={[
                { label: 'CREATED_BY', value: 'OPERATOR_01', highlight: true },
                { label: 'TIMESTAMP', value: '2023-11-24:09:44:02' },
              ]}
              version="SPEC_v4.02"
              className="font-mono text-sm"
            >
              <p>{project.description}</p>
            </SpecBlock>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" size="md">EDIT_PROJECT</Button>
            <Button variant="danger" size="md">ARCHIVE</Button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-8">
          <MetadataGrid>
            <MetadataCell label="TASKS" value={project.taskCount} />
            <MetadataCell label="FLOWS" value={project.workflowCount} />
            <MetadataCell label="STATUS" value="NOMINAL" />
            <MetadataCell label="HEALTH" value={<HealthBar />} />
            <MetadataCell label="RUNTIME" value={project.runtime ? project.runtime.adapterName.toUpperCase() : 'NONE'} />
            <MetadataCell label="CONSTITUTION" value={project.constitutionVersion !== null ? `v${project.constitutionVersion}` : '—'} />
          </MetadataGrid>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black font-headline uppercase tracking-tighter">ACTIVE_WORKFLOWS</h2>
              <ViewSwitcher activeView={viewMode} onViewChange={setViewMode} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflows.map((workflow) => (
                <EntityCard key={workflow.id} entity={workflow} type="workflow" />
              ))}
              <AddCard label="ADD_WORKFLOW" />
            </div>
          </div>

          <TacticalVisualizer />
        </div>
      </div>

      <DetailFooter
        className="h-auto py-2"
        leftContent={
          <div className="flex items-center space-x-6">
            <span className="flex items-center"><span className="w-2 h-2 bg-primary-container rounded-full mr-2"></span> SYSTEM: ONLINE</span>
            <span className="flex items-center"><span className="w-2 h-2 bg-primary-container rounded-full mr-2"></span> SYNC: 99.8%</span>
            <span>PATH: /PROJECTS/{project.id.toUpperCase()}/OVERVIEW</span>
          </div>
        }
        rightContent={<div>OPERATOR: ALTAIR_99 // NODE: DC_NORTH_04</div>}
      />
    </div>
  );
}
