import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hexagon, GitBranch, CheckCircle } from 'lucide-react';
import type { Task, Workflow, Project } from '../../data/mock';



interface GraphNodeProps {
  label: string;
  type: 'project' | 'workflow' | 'task';
  status?: string;
  x: number;
  y: number;
  onClick: () => void;
}

const GraphNode: React.FC<GraphNodeProps> = ({
  label,
  type,
  status,
  x,
  y,
  onClick,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
      case 'in_progress':
        return 'fill-accent/20 stroke-accent';
      case 'completed':
      case 'done':
        return 'fill-success/20 stroke-success';
      case 'archived':
        return 'fill-border stroke-text-secondary';
      default:
        return 'fill-bg-elevated stroke-border';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'project':
        return <Hexagon size={16} className="text-accent" />;
      case 'workflow':
        return <GitBranch size={16} className="text-warning" />;
      case 'task':
        return <CheckCircle size={16} className="text-success" />;
    }
  };

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer"
      onClick={onClick}
    >
      <rect
        x="-60"
        y="-20"
        width="120"
        height="40"
        rx="0"
        className={`fill-bg-elevated stroke-2 ${getStatusColor()}`}
      />
      <foreignObject x="-55" y="-15" width="110" height="30">
        <div className="flex items-center justify-center gap-2 h-full">
          {getIcon()}
          <span className="font-mono text-xs text-text-primary truncate">
            {label}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

interface GraphViewProps {
  projects: Project[];
  workflows: Workflow[];
  tasks: Task[];
  onNodeClick?: (type: string, id: string) => void;
}

export const GraphView: React.FC<GraphViewProps> = ({
  projects,
  workflows,
  tasks,
}) => {
  const navigate = useNavigate();

  const nodePositions: { id: string; type: string; x: number; y: number; label: string; status?: string }[] = [];
  
  const centerX = 400;
  const centerY = 300;
  const radius = 200;

  projects.forEach((project, i) => {
    const angle = (i / projects.length) * 2 * Math.PI - Math.PI / 2;
    nodePositions.push({
      id: project.id,
      type: 'project',
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      label: project.name,
      status: project.status,
    });
  });

  workflows.forEach((workflow, i) => {
    const projectIndex = projects.findIndex(p => p.id === workflow.projectId);
    const baseAngle = projectIndex >= 0 ? (projectIndex / projects.length) * 2 * Math.PI - Math.PI / 2 : 0;
    const angle = baseAngle + ((i + 0.5) / (workflows.length || 1)) * (Math.PI / 3);
    const r = radius * 0.6;
    nodePositions.push({
      id: workflow.id,
      type: 'workflow',
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      label: workflow.name,
      status: workflow.status,
    });
  });

  tasks.forEach((task, i) => {
    const workflowIndex = workflows.findIndex(w => w.id === task.workflowId);
    const baseAngle = workflowIndex >= 0 ? (workflowIndex / workflows.length) * 2 * Math.PI - Math.PI / 2 : 0;
    const angle = baseAngle + ((i + 0.5) / (tasks.length || 1)) * (Math.PI / 4);
    const r = radius * 0.35;
    nodePositions.push({
      id: task.id,
      type: 'task',
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      label: task.name,
      status: task.status,
    });
  });

  const handleNodeClick = (type: string, id: string) => {
    const paths: Record<string, string> = {
      project: `/projects/${id}`,
      workflow: `/workflows/${id}`,
      task: `/tasks/${id}`,
    };
    navigate(paths[type]);
  };

  return (
    <div className="w-full overflow-auto bg-bg-secondary border-2 border-black">
      <svg width="800" height="600" viewBox="0 0 800 600">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#2a2a2a"
            />
          </marker>
        </defs>

        {workflows.map(workflow => {
          const projectPos = nodePositions.find(p => p.id === workflow.projectId);
          const workflowPos = nodePositions.find(w => w.id === workflow.id);
          if (projectPos && workflowPos) {
            return (
              <line
                key={`${workflow.projectId}-${workflow.id}`}
                x1={projectPos.x}
                y1={projectPos.y}
                x2={workflowPos.x}
                y2={workflowPos.y}
                stroke="#2a2a2a"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          }
          return null;
        })}

        {tasks.map(task => {
          const workflowPos = nodePositions.find(w => w.id === task.workflowId);
          const taskPos = nodePositions.find(t => t.id === task.id);
          if (workflowPos && taskPos) {
            return (
              <line
                key={`${task.workflowId}-${task.id}`}
                x1={workflowPos.x}
                y1={workflowPos.y}
                x2={taskPos.x}
                y2={taskPos.y}
                stroke="#2a2a2a"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          }
          return null;
        })}

        {nodePositions.map(node => (
          <GraphNode
            key={node.id}
            label={node.label}
            type={node.type as 'project' | 'workflow' | 'task'}
            status={node.status}
            x={node.x}
            y={node.y}
            onClick={() => handleNodeClick(node.type, node.id)}
          />
        ))}
      </svg>
    </div>
  );
};
