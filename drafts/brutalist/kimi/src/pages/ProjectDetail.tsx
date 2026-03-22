import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Toolbar } from '../components/common/Toolbar';
import { ViewSwitcher } from '../components/common/ViewSwitcher';
import { EntityCard } from '../components/common/EntityCard';
import { StatusToggle } from '../components/common/StatusToggle';
import { getProjectById, getWorkflowsByProjectId, getTasksByProjectId } from '../data/mock';
import { useState } from 'react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'graph'>('kanban');

  const project = id ? getProjectById(id) : undefined;
  const workflows = id ? getWorkflowsByProjectId(id) : [];
  const tasks = id ? getTasksByProjectId(id) : [];

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-text-secondary">Project not found</p>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    );
  }

  const handleToggleActive = async (id: string, active: boolean) => {
    console.log('Toggle project', id, active);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'workflows', label: 'Workflows', count: workflows.length },
    { id: 'docs', label: 'Docs' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button
        variant="ghost"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/projects')}
      >
        Back to Projects
      </Button>

      {/* Toolbar */}
      <Toolbar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel - 40% */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="lg">
            <h1 className="font-display font-bold text-2xl text-text-primary uppercase tracking-wide">
              {project.name}
            </h1>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              {project.description}
            </p>

            <div className="mt-6 pt-6 border-t-3 border-border space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-text-secondary" />
                <span className="font-mono text-text-secondary">Created:</span>
                <span className="font-mono text-text-primary">
                  {project.createdAt.toLocaleDateString()}
                </span>
              </div>
              {project.owner && (
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-text-secondary" />
                  <span className="font-mono text-text-secondary">Owner:</span>
                  <span className="font-mono text-text-primary">{project.owner}</span>
                </div>
              )}
            </div>

            {project.tags && (
              <div className="mt-6 pt-6 border-t-3 border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-text-secondary" />
                  <span className="font-mono text-sm text-text-secondary uppercase">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-bg-elevated border-2 border-border text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Panel - 60% */}
        <div className="lg:col-span-3 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Card padding="md" className="text-center">
              <Activity className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="font-display font-bold text-2xl text-text-primary">
                {project.taskCount}
              </p>
              <p className="text-xs font-mono text-text-secondary uppercase">Tasks</p>
            </Card>
            <Card padding="md" className="text-center">
              <Activity className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="font-display font-bold text-2xl text-text-primary">
                {project.workflowCount}
              </p>
              <p className="text-xs font-mono text-text-secondary uppercase">Workflows</p>
            </Card>
            <Card padding="md" className="text-center">
              <Badge status={project.status} />
              <p className="mt-2 text-xs font-mono text-text-secondary uppercase">Status</p>
            </Card>
          </div>

          {/* Active State Toggle */}
          <Card padding="md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-text-secondary uppercase">
                Project State
              </span>
              <StatusToggle
                entityId={project.id}
                isActive={project.status === 'active'}
                onToggle={handleToggleActive}
              />
            </div>
          </Card>

          {/* Workflows Section */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-text-primary uppercase tracking-wider">
                Workflows
              </h2>
              <ViewSwitcher current={viewMode} onChange={setViewMode} />
            </div>

            <div className="space-y-3">
              {workflows.length === 0 ? (
                <p className="text-text-secondary font-mono text-sm">No workflows yet</p>
              ) : (
                workflows.map((workflow) => (
                  <EntityCard key={workflow.id} entity={workflow} variant="compact" />
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
