import type { Workflow, Task } from '../../types/entities';
import { Icon } from '../ui/Icon';

interface WorkflowGraphNode {
  id: string;
  label: string;
  type: 'task' | 'workflow' | 'join' | 'conditional';
  status?: 'pending' | 'running' | 'success' | 'failed';
}

interface WorkflowGraphEdge {
  from: string;
  to: string;
}

interface WorkflowGraphProps {
  workflow: Workflow;
  tasks: Task[];
  className?: string;
}

export function WorkflowGraph({ workflow, tasks, className = '' }: WorkflowGraphProps) {
  const nodes: WorkflowGraphNode[] = tasks.map((task) => ({
    id: task.id,
    label: task.name,
    type: 'task' as const,
    status: task.status === 'in_progress' ? 'running' : 
            task.status === 'done' ? 'success' : 
            task.status === 'backlog' ? 'pending' : 'pending',
  }));

  const nodeWidth = 180;
  const nodeHeight = 60;
  const gapX = 80;
  const gapY = 40;
  const cols = 3;
  const padding = 40;

  const getNodePosition = (index: number) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    return {
      x: padding + col * (nodeWidth + gapX),
      y: padding + row * (nodeHeight + gapY),
    };
  };

  const edges: WorkflowGraphEdge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({ from: nodes[i].id, to: nodes[i + 1].id });
  }

  const statusColors = {
    pending: 'fill-surface-container-high stroke-outline',
    running: 'fill-primary-container/20 stroke-primary-container animate-pulse',
    success: 'fill-success/20 stroke-success',
    failed: 'fill-error/20 stroke-error',
  };

  const width = cols * (nodeWidth + gapX) + padding * 2;
  const height = Math.ceil(nodes.length / cols) * (nodeHeight + gapY) + padding * 2;

  return (
    <div className={`bg-surface-container-lowest border-2 border-outline overflow-auto ${className}`}>
      <div className="p-4 border-b-2 border-outline bg-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="account_tree" size={20} className="text-primary-container" />
            <div>
              <h4 className="font-headline font-black text-sm uppercase tracking-wide">
                {workflow.name}
              </h4>
              <p className="text-xs font-mono text-outline">
                WF: {workflow.id.slice(0, 8)} // {tasks.length} STEPS
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-primary-container" /> RUNNING
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-success" /> SUCCESS
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-error" /> FAILED
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 min-h-[300px]">
        {nodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Icon name="inbox" size={48} className="text-outline mb-4" />
            <p className="font-mono text-sm text-outline">NO_WORKFLOW_STEPS_DEFINED</p>
            <p className="font-mono text-xs text-outline mt-2">ADD TASKS TO VISUALIZE FLOW</p>
          </div>
        ) : (
          <svg width={width} height={height} className="overflow-visible">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" className="fill-outline" />
              </marker>
            </defs>
            
            {edges.map((edge, i) => {
              const fromIndex = nodes.findIndex(n => n.id === edge.from);
              const toIndex = nodes.findIndex(n => n.id === edge.to);
              const from = getNodePosition(fromIndex);
              const to = getNodePosition(toIndex);
              
              const startX = from.x + nodeWidth;
              const startY = from.y + nodeHeight / 2;
              const endX = to.x;
              const endY = to.y + nodeHeight / 2;
              
              const midX = (startX + endX) / 2;
              
              return (
                <g key={`edge-${i}`}>
                  <path
                    d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                    className="stroke-outline fill-none stroke-2"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              );
            })}
            
            {nodes.map((node, index) => {
              const pos = getNodePosition(index);
              const statusClass = statusColors[node.status || 'pending'];
              
              return (
                <g 
                  key={node.id} 
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer"
                >
                  <rect
                    width={nodeWidth}
                    height={nodeHeight}
                    rx={0}
                    className={`stroke-[3px] ${statusClass}`}
                  />
                  <text
                    x={nodeWidth / 2}
                    y={nodeHeight / 2 - 6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-on-surface font-headline font-bold text-xs uppercase"
                  >
                    {node.label.length > 20 ? node.label.slice(0, 20) + '...' : node.label}
                  </text>
                  <text
                    x={nodeWidth / 2}
                    y={nodeHeight / 2 + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-outline font-mono text-[10px]"
                  >
                    {node.id.slice(0, 12)}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
