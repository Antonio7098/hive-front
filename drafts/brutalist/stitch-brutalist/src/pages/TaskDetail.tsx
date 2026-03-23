import { useParams } from 'react-router-dom';
import { Toolbar, InfoGrid, DetailFooter, SubtaskList, QuickLinks, CodeViewer, SpecCard } from '../components/common';
import { Button, Toggle, Card, Icon } from '../components/ui';
import { mockTasks } from '../data/mock';
import { useToggle } from '../hooks/useToggle';

const SPEC_CODE = `{
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
}`;

const QUICK_LINKS = [
  { label: 'WIKI_DOCS_09', icon: 'open_in_new' },
  { label: 'GIT_REPOSITORY', icon: 'terminal' },
];

export function TaskDetail() {
  const { id } = useParams();
  const { checked: isActive, onChange: setIsActive, label: activeLabel } = useToggle(true, { onLabel: 'Live', offLabel: 'Offline' });

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
          <SpecCard
            specId={task.id.toUpperCase()}
            title={task.name}
            description={task.description}
            rows={[
              { label: 'CREATED_BY', value: 'OPERATOR_01', highlight: true },
              { label: 'TIMESTAMP', value: '2023-11-24:09:44:02' },
            ]}
          />

          <Card variant="default" padding="md" className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-outline-variant pb-4">
              <span className="font-headline font-bold text-xs tracking-widest text-on-surface-variant uppercase">Active State</span>
              <Toggle checked={isActive} onChange={setIsActive} label={activeLabel} />
            </div>
            <InfoGrid cells={[
              { label: 'Priority', value: (
                <div className="flex items-center gap-2">
                  <Icon name="warning" className="text-secondary-container" size={18} />
                  <span className="font-headline font-bold text-lg text-secondary-container tracking-widest uppercase">{task.priority}</span>
                </div>
              )},
              { label: 'Estimation', value: (
                <div className="flex items-center gap-2">
                  <Icon name="timer" className="text-primary-container" size={18} />
                  <span className="font-headline font-bold text-lg text-primary-container tracking-widest uppercase">18H</span>
                </div>
              )},
            ]} />
            <div className="p-4 bg-surface-container-highest border-2 border-outline-variant flex items-center justify-between">
              <span className="font-headline font-black text-xs tracking-widest uppercase">Current Status</span>
              <span className="font-headline font-bold text-lg text-warning uppercase tracking-wider">{task.status.replace('_', ' ')}</span>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          <Card variant="default" padding="lg">
            <h3 className="font-headline font-black text-xl tracking-tight mb-6 flex items-center gap-3">
              <Icon name="rule" size={24} />
              SUBTASKS_MANIFEST
            </h3>
            <SubtaskList subtasks={task.subtasks} />
            <Button variant="ghost" className="mt-6 w-full border-2 border-dashed">
              + ADD_SUBTASK_NODE
            </Button>
          </Card>

          <Card variant="default" padding="none">
            <CodeViewer filename="TECHNICAL_SPEC_V2.0" code={SPEC_CODE} />
          </Card>

          <QuickLinks links={QUICK_LINKS} />
        </div>
      </main>

      <DetailFooter
        className="h-10"
        leftContent={
          <div className="flex items-center gap-6 text-[10px] mono-text font-bold text-on-surface-variant uppercase tracking-widest">
            <span>PATH: PROJECTS / CORE_ENGINE / {task.id.toUpperCase()}</span>
            <span className="text-primary-container">UPLOADING_LOGS... 44%</span>
          </div>
        }
        rightContent={
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
        }
      />
    </div>
  );
}
