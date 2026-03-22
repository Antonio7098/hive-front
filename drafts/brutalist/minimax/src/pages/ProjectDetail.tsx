import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { EntityCard, SectionPanel, MetadataRow, StatusToggle, ViewSwitcher } from '../components/common';
import type { ViewMode } from '../components/common/ViewSwitcher';
import { getProjectById, getWorkflowsByProjectId } from '../data/mock';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [isActive, setIsActive] = useState(true);

  const project = getProjectById(id || '');
  const workflows = getWorkflowsByProjectId(id || '');

  if (!project) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-20">
          <h1 className="text-2xl font-display font-bold text-text-primary mb-4">
            Project Not Found
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
    });
  };

  const leftPanel = (
    <div className="space-y-6">
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-mono text-sm mb-4"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
        
        <h1 className="text-2xl font-display font-bold text-text-primary uppercase tracking-wider">
          {project.name}
        </h1>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
          Description
        </h3>
        <p className="text-text-primary font-mono text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="space-y-1">
        <MetadataRow label="Created" value={formatDate(project.createdAt)} />
        <MetadataRow label="Owner" value={project.owner} />
        <MetadataRow label="Status" value={project.status} />
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono bg-bg-secondary border border-border text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
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
          <MetadataRow label="Tasks" value={project.taskCount} />
          <MetadataRow label="Workflows" value={project.workflowCount} />
          <MetadataRow label="Last Activity" value={formatDate(project.recentActivity)} />
        </div>
      </Card>

      <StatusToggle
        active={isActive}
        onChange={setIsActive}
      />

      <Card variant="default">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-display font-bold uppercase tracking-wider text-text-secondary">
            Workflows
          </h2>
          <ViewSwitcher
            activeView={viewMode}
            onViewChange={setViewMode}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {workflows.map((workflow) => (
            <EntityCard
              key={workflow.id}
              entity={workflow}
              variant="compact"
            />
          ))}
        </div>
      </Card>

      <Card variant="default" className="bg-bg-secondary">
        <h2 className="text-sm font-display font-bold uppercase tracking-wider text-text-secondary mb-3">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm">
            Add Workflow
          </Button>
          <Button variant="secondary" size="sm">
            Add Task
          </Button>
          <Button variant="ghost" size="sm">
            <Settings size={14} />
          </Button>
        </div>
      </Card>
    </>
  );

  return (
    <div className="p-6 lg:p-8">
      <SectionPanel
        left={leftPanel}
        right={rightPanel}
        leftWidth="35%"
      />
    </div>
  );
};
