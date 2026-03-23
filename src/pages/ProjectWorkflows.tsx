import { useParams, Link } from 'react-router-dom';
import { useProject, useWorkflowsByProject } from '../hooks';
import { PageHeader, PageFooter, SectionHeader, EntityCard } from '../components/common';
import { Icon } from '../components/ui';
import { BrutalSpinner } from '../components/ui/Loading';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

export function ProjectWorkflows() {
  const { id } = useParams<{ id: string }>();
  const { project, isLoading: projectLoading, error: projectError } = useProject(id);
  const { workflows, isLoading: workflowsLoading, error: workflowsError } = useWorkflowsByProject(id);

  if (projectLoading || workflowsLoading) {
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

  if (projectError || workflowsError) {
    const error = projectError || workflowsError;
    structuredLogger.error(
      'Failed to load project workflows',
      {
        code: ErrorTaxonomy.API_REQUEST_FAILED.code,
        category: ErrorCategory.API,
        severity: ErrorSeverity.MEDIUM,
        message: error?.message || 'Unknown error',
      },
      { projectId: id }
    );
  }

  if (!project) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <PageHeader breadcrumb="ERROR" title="PROJECT_NOT_FOUND" />
        <div className="bg-surface-container border-2 border-error p-6">
          <p className="font-mono text-sm text-error">PROJECT_NOT_FOUND: {id}</p>
        </div>
        <PageFooter />
      </div>
    );
  }

  const activeWorkflows = workflows.filter((w) => w.status === 'active');
  const otherWorkflows = workflows.filter((w) => w.status !== 'active');

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader
        breadcrumb={`PROJECTS / ${project.name} / WORKFLOWS`}
        title="WORKFLOWS"
      />

      <div className="mb-8 flex items-center gap-4">
        <Link
          to={`/projects/${id}`}
          className="flex items-center gap-2 text-sm font-mono text-primary-container hover:underline"
        >
          <Icon name="arrow_back" size={16} />
          BACK_TO_PROJECT
        </Link>
      </div>

      <section className="mb-16">
        <SectionHeader label="ACTIVE_WORKFLOWS" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeWorkflows.length > 0 ? (
            activeWorkflows.map((workflow) => (
              <EntityCard key={workflow.id} entity={workflow} type="workflow" variant="default" />
            ))
          ) : (
            <div className="col-span-3 bg-surface-container border-2 border-dashed border-outline p-8 text-center">
              <Icon name="inbox" size={32} className="text-outline mx-auto mb-4" />
              <p className="font-mono text-sm text-outline">NO_ACTIVE_WORKFLOWS</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <SectionHeader label="ALL_WORKFLOWS" dividerWidth="short" />
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
