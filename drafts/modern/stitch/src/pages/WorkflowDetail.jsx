import { useParams, useNavigate } from 'react-router-dom'
import { LayoutGrid, CheckSquare, FileText, Settings } from 'lucide-react'
import { workflows, tasks, projects } from '../data/mock'
import { 
  Toolbar, 
  SectionPanel, 
  StatusToggle, 
  MetadataRow, 
  EntityCard,
  ViewSwitcher 
} from '../components/common'
import { Button, Badge } from '../components/ui'
import { useState } from 'react'

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'spec', label: 'Spec', icon: FileText },
  { id: 'config', label: 'Config', icon: Settings }
]

const WorkflowDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [view, setView] = useState('kanban')
  const [isActive, setIsActive] = useState(true)

  const workflow = workflows.find(w => w.id === id)
  const workflowTasks = tasks.filter(t => t.workflowId === id)
  const project = projects.find(p => p.id === workflow?.projectId)

  if (!workflow) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-text-muted)]">Workflow not found</p>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    )
  }

  const counts = {
    tasks: workflowTasks.length
  }

  return (
    <div className="space-y-6">
      <Toolbar 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        counts={counts}
      />

      <SectionPanel
        leftPanel={
          <>
            <div>
              <h2 className="text-2xl font-light">{workflow.name}</h2>
              <Badge variant={workflow.status === 'active' ? 'primary' : 'default'} className="mt-2">
                {workflow.status}
              </Badge>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Purpose</h4>
              <p className="text-sm text-[var(--color-text-primary)]/70 leading-relaxed">
                {workflow.description}
              </p>
            </div>

            <div className="space-y-2">
              <MetadataRow icon="Folder" label="Linked Project" value={project?.name || 'None'} />
              <MetadataRow icon="Zap" label="Trigger" value={workflow.trigger} />
            </div>
          </>
        }
        rightPanel={
          <>
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Metadata</h4>
              <MetadataRow icon="CheckSquare" label="Tasks" value={workflow.taskCount} />
              <MetadataRow icon="Clock" label="Avg Duration" value={workflow.avgDuration} />
              <MetadataRow icon="Play" label="Last Run" value={workflow.lastRun ? new Date(workflow.lastRun).toLocaleString() : 'Never'} />
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Active State</h4>
              <StatusToggle active={isActive} onChange={setIsActive} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Tasks ({workflowTasks.length})
                </h4>
                <ViewSwitcher view={view} onViewChange={setView} />
              </div>

              {view === 'kanban' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workflowTasks.slice(0, 4).map(task => (
                    <EntityCard key={task.id} entity={task} variant="compact" />
                  ))}
                </div>
              )}

              {view === 'list' && (
                <div className="space-y-2">
                  {workflowTasks.map(task => (
                    <EntityCard key={task.id} entity={task} variant="compact" />
                  ))}
                </div>
              )}
            </div>

            {activeTab === 'spec' && (
              <div className="bg-[var(--color-surface-container-low)] rounded-lg p-4">
                <pre className="text-xs text-[var(--color-text-muted)] overflow-x-auto">
{`{
  "id": "${workflow.id}",
  "name": "${workflow.name}",
  "trigger": "${workflow.trigger}",
  "tasks": ${workflow.taskCount}
}`}
                </pre>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="primary" size="sm">Run Workflow</Button>
              <Button variant="secondary" size="sm">Edit</Button>
            </div>
          </>
        }
      />
    </div>
  )
}

export default WorkflowDetail