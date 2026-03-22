import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, Zap, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Toolbar } from '../components/common/Toolbar';
import { ViewSwitcher } from '../components/common/ViewSwitcher';
import { EntityCard } from '../components/common/EntityCard';
import { StatusToggle } from '../components/common/StatusToggle';
import { getWorkflowById, getProjectById, getTasksByWorkflowId } from '../data/mock';
import { useState } from 'react';

export default function WorkflowDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'graph'>('kanban');

  const workflow = id ? getWorkflowById(id) : undefined;
  const project = workflow ? getProjectById(workflow.projectId) : undefined;
  const tasks = workflow ? getTasksByWorkflowId(workflow.id) : [];

  if (!workflow) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-text-secondary">Workflow not found</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const handleToggleActive = async (id: string, active: boolean) => {
    console.log('Toggle workflow', id, active);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks', count: tasks.length },
    { id: 'spec', label: 'Spec' },
    { id: 'config', label: 'Config' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button
        variant="ghost"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate(`/projects/${workflow.projectId}`)}
      >
        Back to Project
      </Button>

      {/* Toolbar */}
      <Toolbar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel - 40% */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="lg">
            <h1 className="font-display font-bold text-2xl text-text-primary uppercase tracking-wide">
              {workflow.name}
            </h1>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              {workflow.description}
            </p>

            <div className="mt-6 pt-6 border-t-3 border-border space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Folder className="w-4 h-4 text-text-secondary" />
                <span className="font-mono text-text-secondary">Project:</span>
                <button
                  onClick={() => navigate(`/projects/${workflow.projectId}`)}
                  className="font-mono text-accent hover:underline"
                >
                  {project?.name || workflow.projectId}
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Zap className="w-4 h-4 text-text-secondary" />
                <span className="font-mono text-text-secondary">Trigger:</span>
                <span className="font-mono text-text-primary">{workflow.trigger}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - 60% */}
        <div className="lg:col-span-3 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Card padding="md" className="text-center">
              <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="font-display font-bold text-2xl text-text-primary">
                {workflow.taskCount}
              </p>
              <p className="text-xs font-mono text-text-secondary uppercase">Tasks</p>
            </Card>
            <Card padding="md" className="text-center">
              <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="font-display font-bold text-lg text-text-primary">
                {workflow.lastRun.toLocaleDateString()}
              </p>
              <p className="text-xs font-mono text-text-secondary uppercase">Last Run</p>
            </Card>
            <Card padding="md" className="text-center">
              <Badge status={workflow.status} />
              <p className="mt-2 text-xs font-mono text-text-secondary uppercase">Status</p>
            </Card>
          </div>

          {/* Active State Toggle */}
          <Card padding="md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-text-secondary uppercase">
                Workflow State
              </span>
              <StatusToggle
                entityId={workflow.id}
                isActive={workflow.status === 'active'}
                onToggle={handleToggleActive}
              />
            </div>
          </Card>

          {/* Tasks Section */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-text-primary uppercase tracking-wider">
                Tasks
              </h2>
              <ViewSwitcher current={viewMode} onChange={setViewMode} />
            </div>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-text-secondary font-mono text-sm">No tasks yet</p>
              ) : (
                tasks.map((task) => (
                  <EntityCard key={task.id} entity={task} variant="compact" />
                ))
              )}
            </div>
          </Card>

          {/* Spec Section */}
          <Card padding="lg">
            <h2 className="font-display font-bold text-lg text-text-primary uppercase tracking-wider mb-4">
              Specification
            </h2>
            <pre className="bg-bg-primary border-3 border-border p-4 overflow-x-auto">
              <code className="font-mono text-sm text-text-secondary">
{`workflow:
  name: ${workflow.name}
  trigger: ${workflow.trigger}
  status: ${workflow.status}
  
tasks:
${tasks.map(t => `  - id: ${t.id}
    name: ${t.name}
    status: ${t.status}
    priority: ${t.priority}`).join('\n')}`}
              </code>
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
