import { useParams, Link } from 'react-router-dom';
import { useWorkflowRun, useWorkflow } from '../hooks';
import { PageHeader, PageFooter, SectionHeader, StatsBar } from '../components/common';
import { Card, Icon, Badge } from '../components/ui';
import { EventTimelineItem } from '../components/features/EventTimelineItem';
import { BrutalSpinner } from '../components/ui/Loading';
import { formatDate, duration } from '../components/features/WorkflowRunListItem';

const stepStateVariant = {
  pending: 'neutral' as const,
  ready: 'neutral' as const,
  running: 'warning' as const,
  verifying: 'secondary' as const,
  retry: 'error' as const,
  waiting: 'secondary' as const,
  succeeded: 'success' as const,
  failed: 'error' as const,
  skipped: 'neutral' as const,
  aborted: 'error' as const,
};

const stepStateIcon = {
  pending: 'schedule',
  ready: 'schedule',
  running: 'bolt',
  verifying: 'visibility',
  retry: 'settings_backup_restore',
  waiting: 'timer',
  succeeded: 'check',
  failed: 'warning',
  skipped: 'chevron_right',
  aborted: 'warning',
};

export function WorkflowRunDetail() {
  const { workflowId, runId } = useParams<{ workflowId: string; runId: string }>();
  const { run, events, isLoading: runLoading } = useWorkflowRun(runId);
  const { workflow, isLoading: workflowLoading } = useWorkflow(workflowId);

  if (runLoading || workflowLoading) {
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

  if (!run) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <PageHeader breadcrumb="ERROR" title="RUN_NOT_FOUND" />
        <div className="bg-surface-container border-2 border-error p-6">
          <p className="font-mono text-sm text-error">RUN_NOT_FOUND: {runId}</p>
        </div>
        <PageFooter />
      </div>
    );
  }

  const succeeded = run.stepRuns.filter(s => s.state === 'succeeded').length;
  const failed = run.stepRuns.filter(s => s.state === 'failed' || s.state === 'aborted').length;
  const total = run.stepRuns.length;

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader
        breadcrumb={`WORKFLOWS / ${workflow?.name ?? run.workflowId} / RUNS / ${run.id.slice(0, 8).toUpperCase()}`}
        title="RUN_DETAIL"
      />

      <div className="mb-8 flex items-center justify-between">
        <Link
          to={`/workflows/${workflowId}/runs`}
          className="flex items-center gap-2 text-sm font-mono text-primary-container hover:underline"
        >
          <Icon name="arrow_back" size={16} />
          BACK_TO_RUNS
        </Link>
        <Badge variant={run.state === 'completed' ? 'success' : run.state === 'aborted' ? 'error' : run.state === 'running' ? 'warning' : 'neutral'} size="lg">
          {run.state}
        </Badge>
      </div>

      <StatsBar
        cells={[
          { label: 'Duration', value: duration(run.startedAt, run.completedAt) },
          { label: 'Steps_Done', value: `${succeeded}/${total}` },
          { label: 'Failed', value: failed || '—' },
        ]}
      />

      <div className="mt-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <SectionHeader label="STEPS" dividerWidth="full" />
          <div className="mt-4 space-y-2">
            {run.stepRuns.length === 0 ? (
              <Card variant="outlined" padding="lg" className="text-center">
                <p className="font-mono text-sm text-outline">NO_STEP_DATA</p>
              </Card>
            ) : (
              run.stepRuns.map((step) => (
                <div
                  key={step.id}
                  className="bg-surface-container border-2 border-outline p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      name={stepStateIcon[step.state]}
                      className="text-on-surface-variant shrink-0"
                      size={16}
                    />
                    <div className="min-w-0">
                      <span className="font-mono text-xs text-on-surface truncate block">
                        {step.stepId}
                      </span>
                      {step.reason && (
                        <span className="text-[10px] font-mono text-error truncate block">
                          {step.reason}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={stepStateVariant[step.state]} size="sm">
                      {step.state}
                    </Badge>
                    <span className="text-[10px] font-mono text-outline hidden md:inline">
                      {formatDate(step.updatedAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <SectionHeader label="EVENT_STREAM" dividerWidth="short" />
          <div className="mt-4">
            {events.length === 0 ? (
              <Card variant="outlined" padding="lg" className="text-center">
                <p className="font-mono text-sm text-outline">NO_EVENTS_FOR_THIS_RUN</p>
              </Card>
            ) : (
              events.map((event) => (
                <EventTimelineItem key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
