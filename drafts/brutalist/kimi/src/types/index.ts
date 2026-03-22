export interface Subtask {
  id: string;
  name: string;
  completed: boolean;
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
  recentActivity: Date;
  owner?: string;
  tags?: string[];
}

export interface Workflow {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: 'todo' | 'active' | 'completed';
  taskCount: number;
  lastRun: Date;
  trigger: string;
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
  dueDate?: Date;
  subtasks: Subtask[];
}

export type Entity = Project | Workflow | Task;
export type EntityType = 'project' | 'workflow' | 'task';
