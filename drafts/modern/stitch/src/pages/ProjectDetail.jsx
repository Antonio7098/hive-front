import { useParams, useNavigate } from 'react-router-dom'
import { LayoutGrid, GitBranch, FileText, Settings } from 'lucide-react'
import { projects, workflows, tasks } from '../data/mock'
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
  { id: 'workflows', label: 'Workflows', icon: GitBranch },
  { id: 'docs', label: 'Docs', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings }
]

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [view, setView] = useState('kanban')
  const [isActive, setIsActive] = useState(true)

  const project = projects.find(p => p.id === id)
  const projectWorkflows = workflows.filter(w => w.projectId === id)
  const projectTasks = tasks.filter(t => t.projectId === id)

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-text-muted)]">Project not found</p>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    )
  }

  const counts = {
    workflows: projectWorkflows.length,
    tasks: projectTasks.length
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
              <input
                type="text"
                defaultValue={project.name}
                className="text-2xl font-light bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30 rounded px-1 -mx-1"
              />
              <Badge variant={project.status === 'active' ? 'primary' : 'default'} className="mt-2">
                {project.status}
              </Badge>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Description</h4>
              <p className="text-sm text-[var(--color-text-primary)]/70 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-2">
              <MetadataRow icon="Calendar" label="Created" value={new Date(project.createdAt).toLocaleDateString()} />
              <MetadataRow icon="User" label="Owner" value={project.owner} />
              <MetadataRow icon="Tag" label="Tags" value={project.tags.join(', ')} />
            </div>
          </>
        }
        rightPanel={
          <>
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Metadata</h4>
              <MetadataRow icon="CheckSquare" label="Tasks" value={project.taskCount} />
              <MetadataRow icon="GitBranch" label="Workflows" value={project.workflowCount} />
              <MetadataRow icon="Activity" label="Health" value="Good" variant="highlight" />
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Active State</h4>
              <StatusToggle active={isActive} onChange={setIsActive} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Workflows ({projectWorkflows.length})
                </h4>
                <ViewSwitcher view={view} onViewChange={setView} />
              </div>

              {view === 'kanban' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectWorkflows.slice(0, 4).map(workflow => (
                    <EntityCard key={workflow.id} entity={workflow} variant="compact" />
                  ))}
                </div>
              )}

              {view === 'list' && (
                <div className="space-y-2">
                  {projectWorkflows.map(workflow => (
                    <EntityCard key={workflow.id} entity={workflow} variant="compact" />
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="primary" size="sm">Edit Project</Button>
              <Button variant="secondary" size="sm">Archive</Button>
            </div>
          </>
        }
      />
    </div>
  )
}

export default ProjectDetail