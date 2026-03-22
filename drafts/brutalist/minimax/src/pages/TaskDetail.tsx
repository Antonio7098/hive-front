import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Card, Badge, Avatar } from '../components/ui';
import { MetadataRow, StatusToggle } from '../components/common';
import { tasks, getProjectById, workflows } from '../data/mock';

export const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isActive, setIsActive] = useState(true);
  const [subtasks, setSubtasks] = useState(
    tasks.find(t => t.id === id)?.subtasks || []
  );

  const task = tasks.find(t => t.id === id);
  const project = task ? getProjectById(task.projectId) : undefined;
  const workflow = task ? workflows.find(w => w.id === task.workflowId) : undefined;

  if (!task) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-20">
          <h1 className="text-2xl font-display font-bold text-text-primary mb-4">
            Task Not Found
          </h1>
          <Link to="/projects" className="text-accent hover:text-accent-hover">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const toggleSubtask = (subtaskId: string) => {
    setSubtasks(prev =>
      prev.map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      )
    );
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Not set';
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
          to={`/projects/${task.projectId}`}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-mono text-sm mb-4"
        >
          <ArrowLeft size={16} />
          Back to Project
        </Link>
        
        <h1 className="text-2xl font-display font-bold text-text-primary uppercase tracking-wider">
          {task.name}
        </h1>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
          Objective
        </h3>
        <p className="text-text-primary font-mono text-sm leading-relaxed">
          {task.description}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {task.assignee && (
          <div className="flex items-center gap-2">
            <Avatar name={task.assignee} size="md" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                Assignee
              </div>
              <div className="text-sm font-mono text-text-primary">
                {task.assignee}
              </div>
            </div>
          </div>
        )}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-text-secondary">
            Due Date
          </div>
          <div className="text-sm font-mono text-text-primary">
            {formatDate(task.dueDate)}
          </div>
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
          <MetadataRow 
            label="Status" 
            value={
              <Badge variant={task.status === 'done' ? 'completed' : task.status === 'in_progress' ? 'active' : 'todo'}>
                {task.status.replace('_', ' ')}
              </Badge>
            } 
          />
          <MetadataRow 
            label="Priority" 
            value={
              <Badge variant={task.priority as 'low' | 'medium' | 'high'}>
                {task.priority}
              </Badge>
            } 
          />
          <MetadataRow label="Time Estimate" value={task.timeEstimate || 'N/A'} />
          {project && <MetadataRow label="Project" value={project.name} />}
          {workflow && <MetadataRow label="Workflow" value={workflow.name} />}
        </div>
      </Card>

      <StatusToggle
        active={isActive}
        onChange={setIsActive}
      />

      <Card variant="default">
        <h2 className="text-sm font-display font-bold uppercase tracking-wider text-text-secondary mb-3">
          Subtasks
        </h2>
        {subtasks.length > 0 ? (
          <div className="space-y-2">
            {subtasks.map((subtask) => (
              <button
                key={subtask.id}
                onClick={() => toggleSubtask(subtask.id)}
                className={`
                  w-full
                  flex items-center gap-3
                  p-2
                  font-mono text-sm
                  border-2 border-black
                  transition-all duration-150
                  ${subtask.completed 
                    ? 'bg-success/20 text-text-secondary' 
                    : 'bg-bg-secondary hover:bg-bg-elevated text-text-primary'}
                `}
              >
                <span
                  className={`
                    w-5 h-5
                    flex items-center justify-center
                    border-2 border-black
                    ${subtask.completed ? 'bg-success text-white' : 'bg-bg-elevated'}
                  `}
                >
                  {subtask.completed && <Check size={12} />}
                </span>
                <span className={subtask.completed ? 'line-through' : ''}>
                  {subtask.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary font-mono text-sm">
            No subtasks
          </p>
        )}
        
        <div className="mt-3 pt-3 border-t border-border text-xs font-mono text-text-secondary">
          {subtasks.filter(s => s.completed).length} / {subtasks.length} completed
        </div>
      </Card>

      <Card variant="default" className="bg-bg-secondary">
        <h2 className="text-sm font-display font-bold uppercase tracking-wider text-text-secondary mb-3">
          Spec
        </h2>
        <pre className="font-mono text-xs text-text-secondary overflow-x-auto">
{`{
  "task_id": "${task.id}",
  "status": "${task.status}",
  "priority": "${task.priority}",
  "assignee": "${task.assignee || 'unassigned'}",
  "subtasks": ${subtasks.length}
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
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {rightPanel}
        </div>
      </div>
    </div>
  );
};
