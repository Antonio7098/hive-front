import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Toolbar } from '../components/common';
import { Button, Badge, Toggle, Card, Icon } from '../components/ui';
import { mockTasks } from '../data/mock';

export function TaskDetail() {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);

  const task = mockTasks.find((t) => t.id === id) || mockTasks[0];

  return (
    <div className="flex-1 flex flex-col">
      <Toolbar
        tabs={[
          { label: 'OVERVIEW', path: `/tasks/${id}`, icon: 'visibility' },
          { label: 'SPEC', path: `/tasks/${id}/spec`, icon: 'code' },
          { label: 'SUBTASKS', path: `/tasks/${id}/subtasks`, icon: 'checklist' },
          { label: 'CONFIG', path: `/tasks/${id}/config`, icon: 'tune' },
        ]}
        activeTab="OVERVIEW"
        actions={
          <div className="flex items-center gap-4 text-xs font-headline font-bold tracking-widest text-on-surface-variant">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-container"></span>
              SYSTEM_STABLE
            </span>
          </div>
        }
      />

      <main className="p-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
          <Card variant="default" padding="lg" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-primary-container text-black font-headline font-black text-[10px] tracking-tighter uppercase rotate-90 origin-bottom-right translate-x-[-10px] translate-y-[20px]">
              CRITICAL_PATH
            </div>
            <label className="font-headline font-bold text-xs text-primary-container tracking-[0.2em] mb-4 block">
              TASK_ID // {task.id.toUpperCase()}
            </label>
            <h2 className="text-5xl font-headline font-black tracking-tight mb-6">{task.name}</h2>
            <div className="space-y-6">
              <div>
                <label className="font-headline font-bold text-[10px] text-on-surface-variant tracking-widest uppercase mb-1 block">Objective</label>
                <p className="text-on-surface leading-relaxed text-sm">{task.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-2 border-primary-container pl-4">
                  <label className="font-headline font-bold text-[10px] text-on-surface-variant tracking-widest uppercase block">Assigned To</label>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 bg-surface-container-highest border border-outline flex items-center justify-center">
                      <Icon name="person" size={14} />
                    </div>
                    <span className="text-sm font-bold mono-text uppercase">{task.assignee || 'UNASSIGNED'}</span>
                  </div>
                </div>
                <div className="border-l-2 border-secondary-container pl-4">
                  <label className="font-headline font-bold text-[10px] text-on-surface-variant tracking-widest uppercase block">Due Date</label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-bold mono-text text-secondary-container">{task.dueDate || 'NO_DEADLINE'}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card variant="default" padding="md" className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-outline-variant pb-4">
              <span className="font-headline font-bold text-xs tracking-widest text-on-surface-variant uppercase">Active State</span>
              <Toggle checked={isActive} onChange={setIsActive} label={isActive ? 'Live' : 'Offline'} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-high border-2 border-outline-variant">
                <label className="text-[10px] font-headline font-black text-on-surface-variant tracking-widest uppercase block mb-2">Priority</label>
                <div className="flex items-center gap-2">
                  <Icon name="warning" className="text-secondary-container" size={18} />
                  <span className="font-headline font-bold text-lg text-secondary-container tracking-widest uppercase">{task.priority}</span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-high border-2 border-outline-variant">
                <label className="text-[10px] font-headline font-black text-on-surface-variant tracking-widest uppercase block mb-2">Estimation</label>
                <div className="flex items-center gap-2">
                  <Icon name="timer" className="text-primary-container" size={18} />
                  <span className="font-headline font-bold text-lg text-primary-container tracking-widest uppercase">18H</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-surface-container-highest border-2 border-outline-variant flex items-center justify-between">
              <span className="font-headline font-black text-xs tracking-widest uppercase">Current Status</span>
              <Badge variant="warning">{task.status.replace('_', ' ')}</Badge>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          <Card variant="default" padding="lg">
            <h3 className="font-headline font-black text-xl tracking-tight mb-6 flex items-center gap-3">
              <Icon name="rule" size={24} />
              SUBTASKS_MANIFEST
            </h3>
            <div className="space-y-3">
              {task.subtasks.map((subtask, index) => (
                <div
                  key={subtask.id}
                  className={`group flex items-center gap-4 bg-surface-container-low border-2 border-outline p-4 hover:border-primary-container transition-colors cursor-pointer ${
                    subtask.completed ? 'opacity-50' : ''
                  } ${index === 1 ? 'border-primary-container bg-surface-container-high' : ''}`}
                >
                  <div className={`w-6 h-6 border-2 border-primary-container flex items-center justify-center ${
                    subtask.completed ? 'bg-primary-container' : ''
                  }`}>
                    {subtask.completed && <Icon name="check" className="text-black" size={14} />}
                  </div>
                  <span className={`flex-1 font-headline font-bold text-sm tracking-wide ${subtask.completed ? 'line-through' : ''}`}>
                    {subtask.name}
                  </span>
                  <Badge variant={subtask.completed ? 'success' : index === 1 ? 'warning' : 'neutral'} size="sm">
                    {subtask.completed ? 'Done' : index === 1 ? 'Active' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="mt-6 w-full border-2 border-dashed">
              + ADD_SUBTASK_NODE
            </Button>
          </Card>

          <Card variant="default" padding="none" className="flex flex-col">
            <div className="bg-outline text-black font-headline font-black px-4 py-2 text-xs tracking-widest uppercase flex justify-between">
              <span>TECHNICAL_SPEC_V2.0</span>
              <span>ENC: AES-256</span>
            </div>
            <div className="p-6">
              <div className="bg-black/50 p-4 border border-outline-variant mono-text text-xs leading-relaxed text-primary-container overflow-x-auto">
                <pre>{`{
  "parser_config": {
    "engine": "v8_optimized",
    "mode": "asynchronous",
    "buffer_limit": "256mb",
    "safety": {
      "max_depth": 12,
      "on_overflow": "truncate_and_warn"
    }
  },
  "deployment_target": "EDGE_NODE_OMEGA"
}`}</pre>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="secondary" size="sm" className="flex-1">
                  <Icon name="content_copy" className="align-middle mr-1" size={18} /> Copy
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  <Icon name="download" className="align-middle mr-1" size={18} /> Export
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card variant="elevated" padding="md" className="flex items-center justify-between hover:bg-primary-container hover:text-black cursor-pointer transition-all">
              <span className="font-headline font-black text-xs tracking-widest">WIKI_DOCS_09</span>
              <Icon name="open_in_new" size={18} />
            </Card>
            <Card variant="elevated" padding="md" className="flex items-center justify-between hover:bg-primary-container hover:text-black cursor-pointer transition-all">
              <span className="font-headline font-black text-xs tracking-widest">GIT_REPOSITORY</span>
              <Icon name="terminal" size={18} />
            </Card>
          </div>
        </div>
      </main>

      <footer className="mt-auto bg-surface-container-highest border-t-3 border-outline px-6 py-2 flex justify-between items-center h-10">
        <div className="flex items-center gap-6 text-[10px] mono-text font-bold text-on-surface-variant uppercase tracking-widest">
          <span>PATH: PROJECTS / CORE_ENGINE / {task.id.toUpperCase()}</span>
          <span className="text-primary-container">UPLOADING_LOGS... 44%</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-headline font-black uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <Icon name="schedule" size={16} />
            SYNCED: 12:44:02
          </span>
          <span className="flex items-center gap-1 text-secondary-container">
            <Icon name="bolt" size={16} />
            LATENCY: 12ms
          </span>
        </div>
      </footer>
    </div>
  );
}
