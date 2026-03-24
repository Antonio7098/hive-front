import { useParams } from 'react-router-dom';
import { Toolbar, ViewSwitcher, StatsBar, InfoGrid, DetailFooter, CodeViewer } from '../components/common';
import { Button, Badge, Toggle, Card, Icon } from '../components/ui';
import { useWorkflow, useTasksByWorkflow, useViewMode, useToggle } from '../hooks';

const YAML_CODE = `version: "3.4"
pipeline:
  name: ingestion_main
  steps:
    - id: parse_json`;

export function WorkflowDetail() {
  const { id } = useParams();
  const { workflow, isLoading: workflowLoading } = useWorkflow(id);
  const { tasks, isLoading: tasksLoading } = useTasksByWorkflow(id);
  const { viewMode, setViewMode } = useViewMode();
  const { checked: isActive, onChange: setIsActive, label: activeLabel } = useToggle(true, { onLabel: 'Enabled', offLabel: 'Disabled' });

  if (workflowLoading || tasksLoading || !workflow) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center h-64">
          <span className="font-mono text-primary-container">LOADING...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Toolbar
        tabs={[
          { label: 'Overview', path: `/workflows/${id}`, icon: 'visibility' },
          { label: 'Tasks', path: `/workflows/${id}/tasks`, icon: 'checklist' },
          { label: 'Runs', path: `/workflows/${id}/runs`, icon: 'bolt' },
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
              <InfoGrid cells={[
                { label: 'Linked_Project', value: 'Project Orion' },
                { label: 'Runtime_Env', value: 'Edge_Node_04' },
              ]} />
            </div>
          </Card>

          <Card variant="default" padding="none" className="flex flex-col h-[400px]">
            <CodeViewer filename="workflow_spec.yaml" code={YAML_CODE} />
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-8">
          <StatsBar
            cells={[
              { label: 'Total_Tasks', value: workflow.taskCount },
              { label: 'Avg_Duration', value: '14.2s' },
              { label: 'Last_Run', value: workflow.lastRun },
            ]}
            actions={
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-[10px] font-bold text-outline uppercase tracking-tighter text-center">Workflow_Status</div>
                <Toggle checked={isActive} onChange={setIsActive} label={activeLabel} />
              </div>
            }
          />

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

      <DetailFooter
        leftContent={
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
        }
        rightContent={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-container"></div>
              <span className="font-mono text-[10px] text-primary-container font-bold">HEALTH: OPTIMAL</span>
            </div>
            <div className="font-mono text-[10px] text-outline">UTC: 14:32:01</div>
          </div>
        }
      />
    </div>
  );
}
