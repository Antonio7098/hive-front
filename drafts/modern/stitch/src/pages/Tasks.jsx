import { useState } from 'react'
import { Plus, CheckSquare, Clock, Flag, User } from 'lucide-react'
import { Card, Badge } from '../components/ui'

const tasks = [
  { id: 'task-1', name: 'Initialize Node Handshake', project: 'Aether Protocol', workflow: 'Core-Latency-B', status: 'in_progress', priority: 'high', assignee: 'Elena Vance' },
  { id: 'task-2', name: 'Protocol Buffer Analysis', project: 'Aether Protocol', workflow: 'Core-Latency-B', status: 'todo', priority: 'medium', assignee: 'Alex Mercer' },
  { id: 'task-3', name: 'Luminescence Gradient Mapping', project: 'Neural Mesh', workflow: 'Neural-Sync-A', status: 'in_progress', priority: 'high', assignee: 'Alex Mercer' },
  { id: 'task-4', name: 'Heuristic Pattern Scrub', project: 'Sentinel Shield', workflow: 'Security-Heuristic', status: 'in_progress', priority: 'medium', assignee: 'Jordan Lee' },
  { id: 'task-5', name: 'Database Index Optimization', project: 'Void Bridge', workflow: 'Data-Pipeline-X', status: 'done', priority: 'low', assignee: 'Sam Kim' },
  { id: 'task-6', name: 'Cache Invalidation Logic', project: 'Nebula Core', workflow: 'Cache-Invalidation', status: 'backlog', priority: 'medium', assignee: null },
]

const Tasks = () => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-primary-fixed-dim)] font-medium mb-2 block">Task Queue</span>
          <h2 className="text-4xl font-light tracking-tight text-[var(--color-on-surface)]">Tasks</h2>
        </div>
        <button className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-[var(--color-bg-primary)] px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:scale-[1.02] active:scale-95 transition-all">
          <Plus size={18} style={{ fontVariationSettings: "'wght' 600" }} />
          New Task
        </button>
      </div>

      <section>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-on-surface)]/60 font-semibold">All Tasks</h3>
          <div className="h-[1px] flex-1 bg-[var(--color-outline-variant)]/15"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => (
            <Card key={task.id} hoverable className="p-5 group">
              <div className="flex justify-between items-start mb-4">
                <Badge variant={task.status === 'in_progress' ? 'primary' : task.status === 'done' ? 'success' : task.status === 'backlog' ? 'default' : 'warning'}>
                  {task.status.replace('_', ' ')}
                </Badge>
                <div className="flex items-center gap-1">
                  <Flag size={12} className={task.priority === 'high' ? 'text-[var(--color-danger)]' : task.priority === 'medium' ? 'text-[var(--color-warning)]' : 'text-[var(--color-outline)]'} />
                  <span className="text-[10px] text-[var(--color-outline)]">{task.priority}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <CheckSquare size={18} className="text-[var(--color-primary)]" />
                <h5 className="font-medium text-[var(--color-on-surface)] group-hover:text-[var(--color-primary-fixed-dim)] transition-colors">{task.name}</h5>
              </div>
              <p className="text-xs text-[var(--color-outline)] mb-4">{task.project} / {task.workflow}</p>
              <div className="flex items-center justify-between text-xs text-[var(--color-outline)]">
                <div className="flex items-center gap-1.5">
                  <User size={12} />
                  <span>{task.assignee || 'Unassigned'}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Tasks