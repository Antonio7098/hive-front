import { Card, Badge, ProgressBar, Icon } from '../ui'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ActiveWidget = ({ tasks }) => {
  return (
    <Card className="p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Icon name="Zap" size={144} />
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[var(--color-primary-container)] rounded-full amber-pulse" />
          <h3 className="text-lg font-light tracking-wide">Active Now</h3>
        </div>
        <Badge variant="realtime">REAL-TIME</Badge>
      </div>

      <div className="space-y-8">
        {tasks.map(task => (
          <div key={task.id} className="space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                  Workflow: {task.workflowName}
                </p>
                <h4 className="text-lg font-normal">{task.name}</h4>
              </div>
              <div className="text-right">
                <p className="text-2xl font-light text-[var(--color-primary)] tracking-tighter">
                  {task.progress}%
                </p>
              </div>
            </div>
            <ProgressBar value={task.progress} />
            <div className="flex justify-between items-center text-[10px] text-[var(--color-text-muted)]">
              <span>{task.activityText}</span>
              <span>{task.statusText}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

const TodoWidget = ({ tasks }) => {
  const navigate = useNavigate()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="CheckSquare" size={20} className="text-[var(--color-primary)]" />
          <h3 className="text-lg font-light tracking-wide">To Do</h3>
        </div>
        <Badge variant="primary" size="md">{tasks.length}</Badge>
      </div>

      <div className="space-y-4">
        {tasks.slice(0, 3).map(task => (
          <div 
            key={task.id}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-[var(--color-surface-container-high)] transition-colors cursor-pointer group"
            onClick={() => navigate(`/tasks/${task.id}`)}
          >
            <div className="mt-1 w-4 h-4 rounded border border-[var(--color-outline-variant)] flex items-center justify-center group-hover:border-[var(--color-accent)] transition-colors" />
            <div className="flex-1">
              <h5 className="text-sm font-medium group-hover:text-[var(--color-accent)] transition-colors">
                {task.name}
              </h5>
              <p className="text-[10px] text-[var(--color-text-muted)]">
                Workflow: {task.workflowName}
              </p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] shadow-[0_0_8px_rgba(255,182,144,0.5)]" />
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2 text-[10px] uppercase tracking-widest text-[var(--color-primary-fixed-dim)] hover:text-[var(--color-accent)] transition-colors border-t border-[var(--color-outline-variant)]/10 pt-4">
        View All Tasks
      </button>
    </Card>
  )
}

const RecentWidget = ({ projects }) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Icon name="Clock" size={16} className="text-[var(--color-text-muted)]/40" />
        <h3 className="text-sm font-light tracking-widest uppercase text-[var(--color-text-muted)]/40">
          Recent Projects
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {projects.map(project => (
          <div 
            key={project.id}
            className="glass-surface p-4 rounded-lg border border-white/5 hover:border-[var(--color-accent)]/20 transition-all cursor-pointer group"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-light tracking-wide group-hover:text-[var(--color-accent)] transition-colors">
                Project: {project.name}
              </span>
              <ArrowRight 
                size={12} 
                className="text-[var(--color-text-muted)]/20 group-hover:translate-x-1 transition-transform" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MetricCard = ({ label, value, unit, highlight = false }) => {
  return (
    <Card className={`p-6 ${highlight ? 'bg-[var(--color-accent)]' : ''}`}>
      <p className={`text-[10px] uppercase tracking-widest mb-1 ${highlight ? 'text-[var(--color-bg-primary)]/60' : 'text-[var(--color-text-muted)]'}`}>
        {label}
      </p>
      <p className={`text-2xl font-light ${highlight ? 'text-[var(--color-bg-primary)]' : ''}`}>
        {value} <span className={`text-xs ${highlight ? 'text-[var(--color-bg-primary)]/60' : 'text-[var(--color-accent)]'}`}>{unit}</span>
      </p>
    </Card>
  )
}

const DashboardWidgets = {
  Active: ActiveWidget,
  Todo: TodoWidget,
  Recent: RecentWidget,
  Metric: MetricCard
}

export default DashboardWidgets