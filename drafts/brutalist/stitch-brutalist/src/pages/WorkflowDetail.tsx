import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Toolbar, ViewSwitcher } from '../components/common';
import { Button, Badge, Toggle, Card, Icon } from '../components/ui';
import { mockWorkflows, mockTasks } from '../data/mock';

export function WorkflowDetail() {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'graph'>('kanban');
  const [isActive, setIsActive] = useState(true);

  const workflow = mockWorkflows.find((w) => w.id === id) || mockWorkflows[0];
  const tasks = mockTasks.filter((t) => t.workflowId === workflow.id);

  return (
    <div className="flex-1 flex flex-col">
      <Toolbar
        tabs={[
          { label: 'Overview', path: `/workflows/${id}`, icon: 'visibility' },
          { label: 'Tasks', path: `/workflows/${id}/tasks`, icon: 'checklist' },
          { label: 'Spec', path: `/workflows/${id}/spec`, icon: 'code' },
          { label: 'Config', path: `/workflows/${id}/config`, icon: 'tune' },
        ]}
        activeTab="Overview"
        actions={
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-secondary-container animate-pulse">● LIVE_STREAM_ACTIVE</span>
            <Button variant="secondary" size="sm">Execute Now</Button>
          </div>
        }
      />

      <div className="p-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <Card variant="default" padding="md">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-headline font-black uppercase tracking-tighter text-primary-container">{workflow.name}</h1>
                <p className="text-on-surface-variant font-mono text-sm mt-1 uppercase tracking-widest">ID: {workflow.id.toUpperCase()}</p>
              </div>
              <Badge variant="primary">System Critical</Badge>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-headline text-xs font-bold text-outline uppercase tracking-widest mb-2">Purpose_Log</h3>
                <p className="text-on-surface leading-relaxed border-l-4 border-outline pl-4 italic">{workflow.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface-container-lowest border-2 border-outline">
                  <h3 className="font-headline text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Linked_Project</h3>
                  <p className="font-headline font-bold text-on-surface">Project Orion</p>
                </div>
                <div className="p-4 bg-surface-container-lowest border-2 border-outline">
                  <h3 className="font-headline text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Runtime_Env</h3>
                  <p className="font-headline font-bold text-on-surface">Edge_Node_04</p>
                </div>
              </div>
            </div>
          </Card>

          <Card variant="default" padding="none" className="flex flex-col h-[400px]">
            <div className="p-3 border-b-2 border-outline bg-surface-container flex justify-between items-center">
              <span className="font-headline font-bold text-xs uppercase tracking-widest text-outline">workflow_spec.yaml</span>
              <Icon name="content_copy" className="text-outline cursor-pointer hover:text-primary-container" size={18} />
            </div>
            <div className="p-6 font-mono text-xs overflow-auto text-on-surface-variant leading-6">
              <div className="flex gap-4"><span className="text-outline/40 select-none">01</span><span><span className="text-primary-container">version:</span> "3.4"</span></div>
              <div className="flex gap-4"><span className="text-outline/40 select-none">02</span><span><span className="text-primary-container">pipeline:</span></span></div>
              <div className="flex gap-4"><span className="text-outline/40 select-none">03</span><span className="pl-4"><span className="text-primary-container">name:</span> ingestion_main</span></div>
              <div className="flex gap-4"><span className="text-outline/40 select-none">04</span><span className="pl-4"><span className="text-primary-container">steps:</span></span></div>
              <div className="flex gap-4"><span className="text-outline/40 select-none">05</span><span className="pl-8">- <span className="text-secondary-container">id:</span> parse_json</span></div>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 bg-surface-container p-4 border-3 border-outline flex justify-between items-center">
              <div className="grid grid-cols-3 gap-8 divide-x-2 divide-outline/30">
                <div className="px-2 text-center">
                  <div className="text-[10px] font-bold text-outline uppercase tracking-tighter">Total_Tasks</div>
                  <div className="text-2xl font-black font-headline text-primary-container">{workflow.taskCount}</div>
                </div>
                <div className="px-6 text-center">
                  <div className="text-[10px] font-bold text-outline uppercase tracking-tighter">Avg_Duration</div>
                  <div className="text-2xl font-black font-headline text-on-surface">14.2s</div>
                </div>
                <div className="px-6 text-center">
                  <div className="text-[10px] font-bold text-outline uppercase tracking-tighter">Last_Run</div>
                  <div className="text-2xl font-black font-headline text-on-surface">{workflow.lastRun}</div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container p-4 border-3 border-outline flex flex-col items-center justify-center gap-2">
              <div className="text-[10px] font-bold text-outline uppercase tracking-tighter text-center">Workflow_Status</div>
              <Toggle checked={isActive} onChange={setIsActive} label={isActive ? 'Enabled' : 'Disabled'} />
            </div>
          </div>

          <Card variant="default" padding="none" className="flex flex-col min-h-[600px]">
            <div className="p-4 border-b-2 border-outline bg-surface-container-high flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="font-headline font-black uppercase tracking-widest text-lg">Active_Tasks</h2>
                <ViewSwitcher activeView={viewMode} onViewChange={setViewMode} />
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="filter_list" className="mr-1" size={18} /> Filter_Tasks
              </Button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              {tasks.map((task) => (
                <Card key={task.id} variant="elevated" padding="md" className="hover:border-primary-container transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-primary-container/10 border border-primary-container">
                      <Icon name="data_object" className="text-primary-container" size={18} />
                    </div>
                    <Badge variant={task.status === 'done' ? 'success' : task.status === 'in_progress' ? 'warning' : 'neutral'}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <h4 className="font-headline font-bold text-lg uppercase">{task.name}</h4>
                  <p className="text-on-surface-variant text-sm mt-2 font-mono">{task.description}</p>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <footer className="mt-auto bg-surface-container-highest px-6 py-2 flex justify-between items-center border-t-3 border-outline">
        <div className="flex items-center gap-6 divide-x divide-outline/30">
          <div className="flex items-center gap-2">
            <Icon name="terminal" className="text-xs text-outline" size={14} />
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-tighter">System_Log: 1045_Ready</span>
          </div>
          <div className="pl-6 flex items-center gap-2">
            <Icon name="database" className="text-xs text-secondary-container" size={14} />
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-tighter">Core: 0% Load</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-container"></div>
            <span className="font-mono text-[10px] text-primary-container font-bold">HEALTH: OPTIMAL</span>
          </div>
          <div className="font-mono text-[10px] text-outline">UTC: 14:32:01</div>
        </div>
      </footer>
    </div>
  );
}
