export type EntityStatus = 'active' | 'archived' | 'draft' | 'todo' | 'completed' | 'in_progress' | 'backlog' | 'done';

export interface ProjectRuntime {
  adapterName: string;
  binaryPath: string;
  model: string | null;
  timeoutMs: number;
  maxParallelTasks: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'draft';
  taskCount: number;
  workflowCount: number;
  createdAt: Date;
  updatedAt: Date;
  recentActivity: string;
  lastActivity?: string;
  priority?: string;
  runtime: ProjectRuntime | null;
  constitutionVersion: number | null;
  constitutionUpdatedAt: Date | null;
}

export interface Workflow {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: 'todo' | 'active' | 'completed';
  taskCount: number;
  lastRun: string;
  trigger: string;
}

export interface Subtask {
  id: string;
  name: string;
  completed: boolean;
}

export interface Task {
  id: string;
  workflowId: string;
  projectId: string;
  name: string;
  description: string;
  status: 'backlog' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  subtasks: Subtask[];
  state: 'open' | 'closed';
  runMode: 'auto' | 'manual';
}

export interface MergeState {
  flowId: string;
  status: 'prepared' | 'approved' | 'completed';
  targetBranch: string | null;
  conflicts: string[];
  commits: string[];
  updatedAt: Date;
}

export interface CorrelationIds {
  projectId: string | null;
  graphId: string | null;
  flowId: string | null;
  workflowId: string | null;
  workflowRunId: string | null;
  taskId: string | null;
  attemptId: string | null;
}

export interface Event {
  id: string;
  type: string;
  category: string;
  timestamp: Date;
  sequence: number | null;
  correlation: CorrelationIds;
  payload: Record<string, unknown>;
}

export interface StepRun {
  id: string;
  stepId: string;
  state: 'pending' | 'ready' | 'running' | 'verifying' | 'retry' | 'waiting' | 'succeeded' | 'failed' | 'skipped' | 'aborted';
  updatedAt: Date;
  reason: string | null;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  projectId: string;
  rootWorkflowRunId: string;
  parentWorkflowRunId: string | null;
  state: 'created' | 'running' | 'paused' | 'completed' | 'aborted';
  stepRuns: StepRun[];
  createdAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;
  updatedAt: Date;
}

export type Entity = Project | Workflow | Task;
export type EntityType = 'project' | 'workflow' | 'task';
