import type { Project, Workflow, Task } from '../types/entities';

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
  
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  createProject(data: Omit<Project, 'id'>): Promise<Project>;
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
