export type EntityStatus = 'active' | 'archived' | 'draft' | 'todo' | 'completed' | 'in_progress' | 'backlog' | 'done';

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
}

export type Entity = Project | Workflow | Task;
export type EntityType = 'project' | 'workflow' | 'task';
