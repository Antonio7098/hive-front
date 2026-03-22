import { useParams, useNavigate } from 'react-router-dom'
import { LayoutGrid, CheckSquare, FileText, Settings } from 'lucide-react'
import { tasks, workflows, projects } from '../data/mock'
import { 
  Toolbar, 
  SectionPanel, 
  StatusToggle, 
  MetadataRow
} from '../components/common'
import { Button, Badge, ProgressBar } from '../components/ui'
import { useState } from 'react'
import { Check } from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'spec', label: 'Spec', icon: FileText },
  { id: 'subtasks', label: 'Subtasks', icon: CheckSquare },
  { id: 'config', label: 'Config', icon: Settings }
]

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isActive, setIsActive] = useState(true)

  const task = tasks.find(t => t.id === id)
  const workflow = workflows.find(w => w.id === task?.workflowId)
  const project = projects.find(p => p.id === task?.projectId)

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-text-muted)]">Task not found</p>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    )
  }

  const getPriorityVariant = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'default'
    }
    return variants[priority] || 'default'
  }

  return (
    <div className="space-y-6">
      <Toolbar 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />

      <SectionPanel
        leftPanel={
          <>
            <div>
              <h2 className="text-2xl font-light">{task.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={task.status === 'in_progress' ? 'primary' : task.status === 'done' ? 'success' : 'default'}>
                  {task.status.replace('_', ' ')}
                </Badge>
                <Badge variant={getPriorityVariant(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Objective</h4>
              <p className="text-sm text-[var(--color-text-primary)]/70 leading-relaxed">
                {task.description}
              </p>
            </div>

            <div className="space-y-2">
              <MetadataRow icon="User" label="Assigned to" value={task.assignee || 'Unassigned'} />
              <MetadataRow icon="Calendar" label="Due Date" value={task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'} />
            </div>
          </>
        }
        rightPanel={
          <>
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Metadata</h4>
              <MetadataRow icon="Activity" label="Status" value={task.status.replace('_', ' ')} />
              <MetadataRow icon="Flag" label="Priority" value={task.priority} variant="highlight" />
              <MetadataRow icon="Clock" label="Time Estimate" value="2h" />
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Progress</h4>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-light text-[var(--color-primary)]">{task.progress}%</span>
              </div>
              <ProgressBar value={task.progress} />
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Active State</h4>
              <StatusToggle active={isActive} onChange={setIsActive} />
            </div>

            {activeTab === 'subtasks' && (
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Subtasks</h4>
                {task.subtasks.length > 0 ? (
                  <div className="space-y-2">
                    {task.subtasks.map(subtask => (
                      <div 
                        key={subtask.id}
                        className="flex items-center gap-3 p-3 bg-[var(--color-surface-container-low)] rounded-lg"
                      >
                        <div className={`
                          w-4 h-4 rounded border flex items-center justify-center
                          ${subtask.completed 
                            ? 'bg-[var(--color-accent)] border-[var(--color-accent)]' 
                            : 'border-[var(--color-outline-variant)]'
                          }
                        `}>
                          {subtask.completed && <Check size={12} className="text-[var(--color-bg-primary)]" />}
                        </div>
                        <span className={`text-sm ${subtask.completed ? 'line-through text-[var(--color-text-muted)]' : ''}`}>
                          {subtask.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">No subtasks</p>
                )}
              </div>
            )}

            {activeTab === 'spec' && (
              <div className="bg-[var(--color-surface-container-low)] rounded-lg p-4">
                <pre className="text-xs text-[var(--color-text-muted)] overflow-x-auto">
{`{
  "id": "${task.id}",
  "name": "${task.name}",
  "status": "${task.status}",
  "priority": "${task.priority}",
  "progress": ${task.progress},
  "workflow": "${workflow?.name}",
  "project": "${project?.name}"
}`}
                </pre>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="primary" size="sm">Edit Task</Button>
              <Button variant="secondary" size="sm">Mark Complete</Button>
            </div>
          </>
        }
      />
    </div>
  )
}

export default TaskDetail