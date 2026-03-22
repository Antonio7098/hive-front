import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, Zap, User, Calendar, CheckCircle, Circle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Toolbar } from '../components/common/Toolbar';
import { StatusToggle } from '../components/common/StatusToggle';
import { ExpandableItem } from '../components/common/ExpandableItem';
import { getTaskById, getWorkflowById, getProjectById } from '../data/mock';
import { useState } from 'react';

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const task = id ? getTaskById(id) : undefined;
  const workflow = task ? getWorkflowById(task.workflowId) : undefined;
  const project = task ? getProjectById(task.projectId) : undefined;

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-text-secondary">Task not found</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const handleToggleActive = async (id: string, active: boolean) => {
    console.log('Toggle task', id, active);
  };

  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  const totalSubtasks = task.subtasks.length;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'spec', label: 'Spec' },
    { id: 'subtasks', label: 'Subtasks', count: totalSubtasks },
    { id: 'config', label: 'Config' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button
        variant="ghost"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate(`/workflows/${task.workflowId}`)}
      >
        Back to Workflow
      </Button>

      {/* Toolbar */}
      <Toolbar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel - 40% */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="lg">
            <h1 className="font-display font-bold text-2xl text-text-primary uppercase tracking-wide">
              {task.name}
            </h1>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              {task.description}
            </p>

            <div className="mt-6 pt-6 border-t-3 border-border space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Folder className="w-4 h-4 text-text-secondary" />
                <span className="font-mono text-text-secondary">Project:</span>
                <button
                  onClick={() => navigate(`/projects/${task.projectId}`)}
                  className="font-mono text-accent hover:underline"
                >
                  {project?.name || task.projectId}
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Zap className="w-4 h-4 text-text-secondary" />
                <span className="font-mono text-text-secondary">Workflow:</span>
                <button
                  onClick={() => navigate(`/workflows/${task.workflowId}`)}
                  className="font-mono text-accent hover:underline"
                >
                  {workflow?.name || task.workflowId}
                </button>
              </div>
              {task.assignee && (
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-text-secondary" />
                  <span className="font-mono text-text-secondary">Assignee:</span>
                  <span className="font-mono text-text-primary">{task.assignee}</span>
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-text-secondary" />
                  <span className="font-mono text-text-secondary">Due:</span>
                  <span className="font-mono text-text-primary">
                    {task.dueDate.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Panel - 60% */}
        <div className="lg:col-span-3 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Card padding="md" className="text-center">
              <Badge status={task.status} />
              <p className="mt-2 text-xs font-mono text-text-secondary uppercase">Status</p>
            </Card>
            <Card padding="md" className="text-center">
              <Badge status={task.priority} />
              <p className="mt-2 text-xs font-mono text-text-secondary uppercase">Priority</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="font-display font-bold text-2xl text-text-primary">
                {Math.round(progress)}%
              </p>
              <p className="text-xs font-mono text-text-secondary uppercase">Progress</p>
            </Card>
          </div>

          {/* Active State Toggle */}
          <Card padding="md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-text-secondary uppercase">
                Task State
              </span>
              <StatusToggle
                entityId={task.id}
                isActive={task.status === 'in_progress'}
                onToggle={handleToggleActive}
              />
            </div>
          </Card>

          {/* Subtasks Section */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-text-primary uppercase tracking-wider">
                Subtasks
              </h2>
              <span className="text-sm font-mono text-text-secondary">
                {completedSubtasks}/{totalSubtasks} completed
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-bg-primary border-3 border-border mb-6">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-2">
              {task.subtasks.length === 0 ? (
                <p className="text-text-secondary font-mono text-sm">No subtasks</p>
              ) : (
                task.subtasks.map((subtask) => (
                  <ExpandableItem
                    key={subtask.id}
                    header={
                      <div className="flex items-center gap-3">
                        {subtask.completed ? (
                          <CheckCircle className="w-5 h-5 text-accent" />
                        ) : (
                          <Circle className="w-5 h-5 text-text-secondary" />
                        )}
                        <span className={`font-mono text-sm ${
                          subtask.completed ? 'text-text-secondary line-through' : 'text-text-primary'
                        }`}>
                          {subtask.name}
                        </span>
                      </div>
                    }
                    defaultExpanded={false}
                  >
                    <p className="text-sm text-text-secondary">
                      Status: {subtask.completed ? 'Completed' : 'Pending'}
                    </p>
                  </ExpandableItem>
                ))
              )}
            </div>
          </Card>

          {/* Spec Section */}
          <Card padding="lg">
            <h2 className="font-display font-bold text-lg text-text-primary uppercase tracking-wider mb-4">
              Detailed Specification
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-mono text-sm font-semibold text-text-secondary uppercase mb-2">
                  Objective
                </h3>
                <p className="text-sm text-text-primary leading-relaxed">
                  {task.description}
                </p>
              </div>
              <div className="pt-4 border-t-3 border-border">
                <h3 className="font-mono text-sm font-semibold text-text-secondary uppercase mb-2">
                  Acceptance Criteria
                </h3>
                <ul className="space-y-2">
                  {task.subtasks.map((st) => (
                    <li key={st.id} className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 bg-accent" />
                      {st.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
