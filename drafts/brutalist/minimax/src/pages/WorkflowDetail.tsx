import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui';
import { EntityCard, MetadataRow, StatusToggle, ViewSwitcher } from '../components/common';
import type { ViewMode } from '../components/common/ViewSwitcher';
import { workflows, getProjectById, getTasksByWorkflowId } from '../data/mock';

export const WorkflowDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isActive, setIsActive] = useState(true);

  const workflow = workflows.find(w => w.id === id);
  const project = workflow ? getProjectById(workflow.projectId) : undefined;
  const tasks = getTasksByWorkflowId(id || '');

  if (!workflow) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-20">
          <h1 className="text-2xl font-display font-bold text-text-primary mb-4">
            Workflow Not Found
          </h1>
          <Link to="/projects" className="text-accent hover:text-accent-hover">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const leftPanel = (
    <div className="space-y-6">
      <div>
        <Link
          to={`/projects/${workflow.projectId}`}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-mono text-sm mb-4"
        >
          <ArrowLeft size={16} />
          Back to Project
        </Link>
        
        <h1 className="text-2xl font-display font-bold text-text-primary uppercase tracking-wider">
          {workflow.name}
        </h1>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
          Purpose
        </h3>
        <p className="text-text-primary font-mono text-sm leading-relaxed">
          {workflow.description}
        </p>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
          Linked Project
        </h3>
        {project && (
          <Link
            to={`/projects/${project.id}`}
            className="text-accent hover:text-accent-light font-mono text-sm transition-colors"
          >
            {project.name}
          </Link>
        )}
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
          Trigger Conditions
        </h3>
        <p className="text-text-primary font-mono text-sm">
          {workflow.trigger}
        </p>
      </div>
    </div>
  );

  const rightPanel = (
    <>
      <Card variant="default">
        <h2 className="text-sm font-display font-bold uppercase tracking-wider text-text-secondary mb-3">
          Metadata
        </h2>
        <div className="space-y-1">
          <MetadataRow label="Tasks" value={workflow.taskCount} />
          <MetadataRow label="Avg Duration" value={workflow.avgDuration || 'N/A'} />
          <MetadataRow label="Last Run" value={formatDate(workflow.lastRun)} />
        </div>
      </Card>

      <StatusToggle
        active={isActive}
        onChange={setIsActive}
      />

      <Card variant="default">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-display font-bold uppercase tracking-wider text-text-secondary">
            Tasks
          </h2>
          <ViewSwitcher
            activeView={viewMode}
            onViewChange={setViewMode}
          />
        </div>
        
        <div className="space-y-3">
          {tasks.map((task) => (
            <EntityCard
              key={task.id}
              entity={task}
              variant="compact"
            />
          ))}
        </div>
      </Card>

      <Card variant="default" className="bg-bg-secondary">
        <h2 className="text-sm font-display font-bold uppercase tracking-wider text-text-secondary mb-3">
          Spec
        </h2>
        <pre className="font-mono text-xs text-text-secondary overflow-x-auto">
{`{
  "workflow_id": "${workflow.id}",
  "trigger": "${workflow.trigger}",
  "tasks": ${workflow.taskCount},
  "status": "${workflow.status}"
}`}
        </pre>
      </Card>
    </>
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-elevated border-2 border-border p-4 animate-fade-in">
          {leftPanel}
        </div>
        <div className="space-y-4">
          {rightPanel}
        </div>
      </div>
    </div>
  );
};
