import type { Project, Workflow, Task } from '../types/entities';

export interface ProjectDto {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  repositories: Array<{
    name: string;
    path: string;
    access_mode: string;
  }>;
  runtime: {
    adapter_name: string;
    binary_path: string;
    model: string | null;
    args: string[];
    env: Record<string, string>;
    timeout_ms: number;
    max_parallel_tasks: number;
  } | null;
}

export interface WorkflowDto {
  id: string;
  project_id: string | null;
  name: string;
  description: string | null;
  status: string | null;
  task_count: number | null;
  last_run: string | null;
  trigger: string | null;
}

export interface TaskDto {
  id: string;
  workflow_id: string | null;
  project_id: string;
  title: string;
  description: string | null;
  scope: unknown | null;
  run_mode: string;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface GraphDto {
  id: string;
  name: string;
  type: string;
  config: unknown;
}

export interface FlowDto {
  id: string;
  name: string;
  workflow_id: string | null;
  config: unknown;
}

export interface WorkflowRunDto {
  id: string;
  workflow_id: string;
  status: string;
  started_at: string | null;
  finished_at: string | null;
  result: unknown;
}

export interface MergeStateDto {
  id: string;
  pr_number: number;
  repository: string;
  state: string;
  mergeable: boolean;
}

export interface EventDto {
  id: string;
  type: string;
  payload: unknown;
  timestamp: string;
  source: string;
}

export interface ActiveItem {
  id: string;
  name: string;
  target?: string;
  progress?: number;
}

export interface TodoItem {
  id: string;
  name: string;
  project: string;
  priority: 'low' | 'medium' | 'high';
}

export interface RecentProject {
  id: string;
  name: string;
  lastEdit: string;
  icon?: string;
}

export interface IDataSource {
  readonly isConnected: boolean;
  readonly name: string;

  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  updateProject(id: string, data: Partial<Project>): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  getWorkflows(): Promise<Workflow[]>;
  getWorkflow(id: string): Promise<Workflow | null>;
  getWorkflowsByProject(projectId: string): Promise<Workflow[]>;
  createWorkflow(data: Omit<Workflow, 'id'>): Promise<Workflow>;
  updateWorkflow(id: string, data: Partial<Workflow>): Promise<Workflow>;
  deleteWorkflow(id: string): Promise<void>;

  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | null>;
  getTasksByWorkflow(workflowId: string): Promise<Task[]>;
  createTask(data: Omit<Task, 'id'>): Promise<Task>;
  updateTask(id: string, data: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<void>;

  getActiveItems(): Promise<ActiveItem[]>;
  getTodoItems(): Promise<TodoItem[]>;
  getRecentProjects(): Promise<RecentProject[]>;
}
