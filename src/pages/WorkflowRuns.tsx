import { useParams, Link } from 'react-router-dom';
import { useWorkflow, useWorkflowRuns } from '../hooks';
import { PageHeader, PageFooter, SectionHeader, StatsBar } from '../components/common';
import { Card, Icon } from '../components/ui';
import { WorkflowRunListItem } from '../components/features/WorkflowRunListItem';
import { BrutalSpinner } from '../components/ui/Loading';

export function WorkflowRuns() {
  const { id } = useParams<{ id: string }>();
  const { workflow, isLoading: workflowLoading } = useWorkflow(id);
  const { runs, isLoading: runsLoading } = useWorkflowRuns(id);

  if (workflowLoading || runsLoading) {
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

  const running = runs.filter(r => r.state === 'running').length;
  const completed = runs.filter(r => r.state === 'completed').length;

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader
        breadcrumb={`WORKFLOWS / ${workflow.name} / RUNS`}
        title="RUNS"
      />

      <div className="mb-8 flex items-center justify-between">
        <Link
          to={`/workflows/${id}`}
          className="flex items-center gap-2 text-sm font-mono text-primary-container hover:underline"
        >
          <Icon name="arrow_back" size={16} />
          BACK_TO_WORKFLOW
        </Link>
      </div>

      <StatsBar
        cells={[
          { label: 'Total_Runs', value: runs.length },
          { label: 'Running', value: running },
          { label: 'Completed', value: completed },
        ]}
      />

      <div className="mt-8">
        <SectionHeader label="RUN_HISTORY" dividerWidth="full" />

        {runs.length === 0 ? (
          <Card variant="outlined" padding="lg" className="text-center mt-6">
            <p className="font-mono text-sm text-outline">NO_RUNS_FOUND</p>
          </Card>
        ) : (
          <div className="mt-4 space-y-2">
            {runs.map((run) => (
              <WorkflowRunListItem key={run.id} run={run} />
            ))}
          </div>
        )}
      </div>

      <PageFooter />
    </div>
  );
}
