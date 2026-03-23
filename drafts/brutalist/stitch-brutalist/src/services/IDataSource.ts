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
  project_id: string;
  name: string;
  description: string;
  status: 'todo' | 'active' | 'completed';
  task_count: number;
  last_run: string;
  trigger: string;
}

export interface TaskDto {
  id: string;
  workflow_id: string;
  project_id: string;
  title: string;
  description: string | null;
  scope: unknown | null;
  run_mode: string;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
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
