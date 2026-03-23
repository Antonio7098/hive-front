import { useWorkflows } from '../hooks';
import { EntityCard, PageHeader, SectionHeader, PageFooter } from '../components/common';
import { useViewMode } from '../hooks/useViewMode';

export function Workflows() {
  const { workflows, isLoading } = useWorkflows();
  const { viewMode, setViewMode } = useViewMode();

  const activeWorkflows = workflows.filter((w) => w.status === 'active');
  const otherWorkflows = workflows.filter((w) => w.status !== 'active');

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-center h-64">
          <span className="font-mono text-primary-container">LOADING...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader
        breadcrumb="Directory / Root / Workflows"
        title="WORKFLOWS"
        actionLabel="+ NEW_WORKFLOW"
      />

      <section className="mb-16">
        <SectionHeader label="Section_01 // Active_Runs" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeWorkflows.map((workflow) => (
            <EntityCard key={workflow.id} entity={workflow} type="workflow" variant="default" />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          label="Section_02 // Workflow_Manifest"
          dividerWidth="short"
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherWorkflows.map((workflow) => (
            <EntityCard key={workflow.id} entity={workflow} type="workflow" variant="compact" />
          ))}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
