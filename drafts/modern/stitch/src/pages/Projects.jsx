import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { EntityCard, ViewSwitcher } from '../components/common'
import { KanbanBoard, ListView } from '../components/features'
import { Button } from '../components/ui'
import { projects } from '../data/mock'

const Projects = () => {
  const [view, setView] = useState('grid')
  const [sortBy, setSortBy] = useState('recent')

  const sortedProjects = useMemo(() => {
    const sorted = [...projects]
    if (sortBy === 'recent') {
      sorted.sort((a, b) => b.recentActivity - a.recentActivity)
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    }
    return sorted
  }, [sortBy])

  const recentProjects = sortedProjects.slice(0, 3)
  const allProjects = sortedProjects.slice(3)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-light tracking-tight">Projects</h2>
        <Button variant="primary" size="md">
          <Plus size={16} />
          New Project
        </Button>
      </div>

      {recentProjects.length > 0 && (
        <section>
          <h3 className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
            Recent
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentProjects.map(project => (
              <EntityCard 
                key={project.id} 
                entity={project} 
                variant="expanded"
                showActions
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-widest">
            All Projects
          </h3>
          <ViewSwitcher view={view} onViewChange={setView} />
        </div>

        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allProjects.map(project => (
              <EntityCard 
                key={project.id} 
                entity={project} 
                variant="compact"
                showActions
              />
            ))}
          </div>
        ) : view === 'list' ? (
          <ListView items={allProjects} type="project" />
        ) : (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            Graph view coming soon
          </div>
        )}
      </section>
    </div>
  )
}

export default Projects