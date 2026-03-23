import { useParams } from 'react-router-dom';
import { Toolbar, ViewSwitcher, EntityCard, MetadataGrid, MetadataCell } from '../components/common';
import { Button, Badge, Toggle, Icon } from '../components/ui';
import { TacticalVisualizer } from '../components/features/TacticalVisualizer';
import { mockProjects, mockWorkflows } from '../data/mock';
import { useViewMode } from '../hooks/useViewMode';
import { useToggle } from '../hooks/useToggle';

export function ProjectDetail() {
  const { id } = useParams();
  const { viewMode, setViewMode } = useViewMode();
  const { checked: isActive, onChange: setIsActive, label: activeLabel } = useToggle(true, { onLabel: 'Active', offLabel: 'Inactive' });

  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];
  const workflows = mockWorkflows.filter((w) => w.projectId === project.id);

  return (
    <div className="flex-1 flex flex-col">
      <Toolbar
        tabs={[
          { label: 'OVERVIEW', path: `/projects/${id}` },
          { label: 'WORKFLOWS', path: `/projects/${id}/workflows` },
          { label: 'DOCS', path: `/projects/${id}/docs` },
          { label: 'SETTINGS', path: `/projects/${id}/settings` },
        ]}
        activeTab="OVERVIEW"
        actions={
          <div className="flex items-center gap-3">
            <span className="font-headline text-xs font-bold uppercase text-on-surface-variant tracking-tighter">PROJECT STATE:</span>
            <Toggle checked={isActive} onChange={setIsActive} label={activeLabel} />
          </div>
        }
      />

      <div className="p-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <section className="space-y-4">
            <Badge variant="secondary">{project.priority || 'ALPHA_CLASS'}</Badge>
            <h1 className="text-6xl font-black font-headline tracking-tighter text-on-surface">{project.name}</h1>
            <div className="bg-surface-container-lowest border-2 border-outline p-6 font-mono text-sm leading-relaxed text-on-surface-variant relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 bg-outline/20 text-[10px] uppercase font-bold text-outline">SPEC_v4.02</div>
              <p className="mb-4">// PROJECT_INITIALIZATION_STRING: "{project.id.toUpperCase()}-X9-GLOBAL"</p>
              <p>{project.description}</p>
              <div className="mt-6 pt-6 border-t border-outline/30 space-y-2">
                <div className="flex justify-between">
                  <span className="text-outline uppercase">CREATED_BY:</span>
                  <span className="text-primary-container">OPERATOR_01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline uppercase">TIMESTAMP:</span>
                  <span className="text-on-surface">2023-11-24:09:44:02</span>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4">
            <Button variant="secondary" size="md">EDIT_PROJECT</Button>
            <Button variant="danger" size="md">ARCHIVE</Button>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-8">
          <MetadataGrid>
            <MetadataCell label="TASKS" value={project.taskCount} />
            <MetadataCell label="FLOWS" value={project.workflowCount} />
            <MetadataCell label="STATUS" value="NOMINAL" />
            <MetadataCell label="HEALTH" value={
              <div className="flex items-end space-x-1 h-8">
                <div className="w-2 h-full bg-primary-container"></div>
                <div className="w-2 h-5/6 bg-primary-container"></div>
                <div className="w-2 h-full bg-primary-container"></div>
                <div className="w-2 h-4/6 bg-primary-container"></div>
                <div className="w-2 h-3/6 bg-primary-container"></div>
              </div>
            } />
          </MetadataGrid>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black font-headline uppercase tracking-tighter">ACTIVE_WORKFLOWS</h2>
              <ViewSwitcher activeView={viewMode} onViewChange={setViewMode} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflows.map((workflow) => (
                <EntityCard key={workflow.id} entity={workflow} type="workflow" />
              ))}
              <div className="border-2 border-dashed border-outline p-6 flex flex-col items-center justify-center text-outline hover:border-primary-container hover:text-primary-container transition-colors cursor-pointer group">
                <Icon name="add_box" className="mb-2" size={40} />
                <span className="font-headline font-black uppercase tracking-widest text-sm">ADD_WORKFLOW</span>
              </div>
            </div>
          </section>

          <TacticalVisualizer />
        </div>
      </div>

      <footer className="mt-auto bg-surface-container-highest border-t-3 border-outline px-6 py-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><span className="w-2 h-2 bg-primary-container rounded-full mr-2"></span> SYSTEM: ONLINE</span>
          <span className="flex items-center"><span className="w-2 h-2 bg-primary-container rounded-full mr-2"></span> SYNC: 99.8%</span>
          <span>PATH: /PROJECTS/{project.id.toUpperCase()}/OVERVIEW</span>
        </div>
        <div>OPERATOR: ALTAIR_99 // NODE: DC_NORTH_04</div>
      </footer>
    </div>
  );
}
