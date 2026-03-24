import { useState } from 'react'
import { Plus, GitBranch, Play, Clock, Zap } from 'lucide-react'
import { Card, Badge } from '../components/ui'

const workflows = [
  { id: 'wf-1', name: 'Core-Latency-B', project: 'Aether Protocol', status: 'active', lastRun: '2 hours ago', avgDuration: '45m', trigger: 'scheduled' },
  { id: 'wf-2', name: 'Neural-Sync-A', project: 'Neural Mesh', status: 'active', lastRun: '12m ago', avgDuration: '12m', trigger: 'event' },
  { id: 'wf-3', name: 'Security-Heuristic', project: 'Sentinel Shield', status: 'active', lastRun: '5h ago', avgDuration: '30m', trigger: 'manual' },
  { id: 'wf-4', name: 'Data-Pipeline-X', project: 'Solaris Engine', status: 'paused', lastRun: '2 days ago', avgDuration: '2h', trigger: 'scheduled' },
  { id: 'wf-5', name: 'Cache-Invalidation', project: 'Void Bridge', status: 'todo', lastRun: null, avgDuration: 'N/A', trigger: 'manual' },
  { id: 'wf-6', name: 'Mesh-Replication', project: 'Nebula Core', status: 'active', lastRun: '1h ago', avgDuration: '15m', trigger: 'event' },
]

const Workflows = () => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-primary-fixed-dim)] font-medium mb-2 block">Execution Engine</span>
          <h2 className="text-4xl font-light tracking-tight text-[var(--color-on-surface)]">Workflows</h2>
        </div>
        <button className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-[var(--color-bg-primary)] px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:scale-[1.02] active:scale-95 transition-all">
          <Plus size={18} style={{ fontVariationSettings: "'wght' 600" }} />
          New Workflow
        </button>
      </div>

      <section>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-on-surface)]/60 font-semibold">All Workflows</h3>
          <div className="h-[1px] flex-1 bg-[var(--color-outline-variant)]/15"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map(workflow => (
            <Card key={workflow.id} hoverable className="p-5 group">
              <div className="flex justify-between items-start mb-4">
                <Badge variant={workflow.status === 'active' ? 'primary' : workflow.status === 'paused' ? 'default' : 'warning'}>
                  {workflow.status}
                </Badge>
                <button className="text-[var(--color-outline)]/40 hover:text-[var(--color-primary)]">
                  <Zap size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <GitBranch size={18} className="text-[var(--color-primary)]" />
                <h5 className="font-medium text-[var(--color-on-surface)] group-hover:text-[var(--color-primary-fixed-dim)] transition-colors">{workflow.name}</h5>
              </div>
              <p className="text-xs text-[var(--color-outline)] mb-4">{workflow.project}</p>
              <div className="flex items-center justify-between text-xs text-[var(--color-outline)]">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{workflow.lastRun || 'Never'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Play size={12} />
                  <span>{workflow.avgDuration}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Workflows