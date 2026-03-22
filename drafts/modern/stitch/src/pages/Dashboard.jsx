import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import { DashboardWidgets } from '../components/features'
import { activeTasks, todoTasks, recentProjects, workflows, metrics } from '../data/mock'
import { Button, Icon } from '../components/ui'

const Dashboard = () => {
  const enrichedActiveTasks = useMemo(() => {
    return activeTasks.map(task => {
      const workflow = workflows.find(w => w.id === task.workflowId)
      return {
        ...task,
        workflowName: workflow?.name || 'Unknown'
      }
    })
  }, [])

  const enrichedTodoTasks = useMemo(() => {
    return todoTasks.map(task => {
      const workflow = workflows.find(w => w.id === task.workflowId)
      return {
        ...task,
        workflowName: workflow?.name || 'Unknown'
      }
    })
  }, [])

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false 
  })

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between mb-2">
        <div>
          <h2 className="text-4xl font-light tracking-tight">
            Welcome back, <span className="text-[var(--color-primary)]">Architect</span>.
          </h2>
          <p className="text-[var(--color-text-primary)]/40 text-sm mt-1">
            Hive status: Optimized | {metrics.activeTasks} active synapses firing.
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/30">System Time</p>
          <p className="text-xl font-light tabular-nums">{currentTime}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <DashboardWidgets.Active tasks={enrichedActiveTasks} />
        </div>

        <div className="w-full lg:w-5/12 space-y-8">
          <DashboardWidgets.Todo tasks={enrichedTodoTasks} />
          <DashboardWidgets.Recent projects={recentProjects} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <DashboardWidgets.Metric label="Compute Load" value={metrics.computeLoad} unit="%" />
        <DashboardWidgets.Metric label="Uptime" value={metrics.uptime} unit="%" />
        <DashboardWidgets.Metric label="Synapses" value={metrics.synapses} unit="k" />
        <DashboardWidgets.Metric 
          label="New Sync" 
          value="" 
          unit="" 
          highlight={true}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-bg-primary)]/60 mb-1">New Sync</p>
              <p className="text-xl font-bold text-[var(--color-bg-primary)]">Initialize</p>
            </div>
            <Icon name="PlusCircle" size={32} className="text-[var(--color-bg-primary)]" />
          </div>
        </DashboardWidgets.Metric>
      </div>
    </div>
  )
}

export default Dashboard