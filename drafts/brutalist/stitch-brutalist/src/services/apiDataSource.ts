import type { IDataSource, ProjectDto, WorkflowDto, TaskDto } from './IDataSource';
import type { Project, Workflow, Task } from '../types/entities';

const API_BASE = 'http://127.0.0.1:8787';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  const body = await response.json();
  return body.data ?? body;
}

function mapProject(dto: ProjectDto): Project {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description ?? '',
    status: 'active',
    taskCount: 0,
    workflowCount: 0,
    createdAt: new Date(dto.created_at),
    updatedAt: new Date(dto.updated_at),
    recentActivity: '',
    priority: undefined,
  };
}

function mapWorkflow(dto: WorkflowDto): Workflow {
  return {
    id: dto.id,
    projectId: dto.project_id,
    name: dto.name,
    description: dto.description,
    status: dto.status as 'todo' | 'active' | 'completed',
    taskCount: dto.task_count,
    lastRun: dto.last_run,
    trigger: dto.trigger,
  };
}

function mapTask(dto: TaskDto): Task {
  return {
    id: dto.id,
    workflowId: dto.workflow_id,
    projectId: dto.project_id,
    name: dto.title,
    description: dto.description ?? '',
    status: dto.state === 'open' ? 'in_progress' : 'done',
    priority: 'medium',
    assignee: undefined,
    dueDate: undefined,
    subtasks: [],
  };
}

export class ApiDataSource implements IDataSource {
  readonly isConnected = true;
  readonly name = 'api';

  async getProjects(): Promise<Project[]> {
    const dtos = await apiFetch<ProjectDto[]>('/api/projects');
    return dtos.map(mapProject);
  }

  async getProject(id: string): Promise<Project | null> {
    try {
      const dto = await apiFetch<ProjectDto>(`/api/projects/${id}`);
      return mapProject(dto);
    } catch {
      return null;
    }
  }

  async createProject(_data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const dto = await apiFetch<ProjectDto>('/api/projects/create', {
      method: 'POST',
      body: JSON.stringify({ name: _data.name, description: _data.description }),
    });
    return mapProject(dto);
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const dto = await apiFetch<ProjectDto>(`/api/projects/update`, {
      method: 'POST',
      body: JSON.stringify({ project: id, name: data.name, description: data.description }),
    });
    return mapProject(dto);
  }

  async deleteProject(id: string): Promise<void> {
    await apiFetch(`/api/projects/delete`, {
      method: 'POST',
      body: JSON.stringify({ project: id }),
    });
  }

  async getWorkflows(): Promise<Workflow[]> {
    const dtos = await apiFetch<WorkflowDto[]>('/api/workflows');
    return dtos.map(mapWorkflow);
  }

  async getWorkflow(id: string): Promise<Workflow | null> {
    try {
      const dto = await apiFetch<WorkflowDto>(`/api/workflows/${id}`);
      return mapWorkflow(dto);
    } catch {
      return null;
    }
  }

  async getWorkflowsByProject(projectId: string): Promise<Workflow[]> {
    const all = await this.getWorkflows();
    return all.filter(w => w.projectId === projectId);
  }

  async createWorkflow(_data: Omit<Workflow, 'id'>): Promise<Workflow> {
    const dto = await apiFetch<WorkflowDto>('/api/workflows/create', {
      method: 'POST',
      body: JSON.stringify(_data),
    });
    return mapWorkflow(dto);
  }

  async updateWorkflow(id: string, data: Partial<Workflow>): Promise<Workflow> {
    const dto = await apiFetch<WorkflowDto>(`/api/workflows/update`, {
      method: 'POST',
      body: JSON.stringify({ id, ...data }),
    });
    return mapWorkflow(dto);
  }

  async deleteWorkflow(id: string): Promise<void> {
    await apiFetch(`/api/workflows/delete`, {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  }

  async getTasks(): Promise<Task[]> {
    const dtos = await apiFetch<TaskDto[]>('/api/tasks');
    return dtos.map(mapTask);
  }

  async getTask(id: string): Promise<Task | null> {
    try {
      const dto = await apiFetch<TaskDto>(`/api/tasks/${id}`);
      return mapTask(dto);
    } catch {
      return null;
    }
  }

  async getTasksByWorkflow(workflowId: string): Promise<Task[]> {
    const all = await this.getTasks();
    return all.filter(t => t.workflowId === workflowId);
  }

  async createTask(_data: Omit<Task, 'id'>): Promise<Task> {
    const dto = await apiFetch<TaskDto>('/api/tasks/create', {
      method: 'POST',
      body: JSON.stringify(_data),
    });
    return mapTask(dto);
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const dto = await apiFetch<TaskDto>(`/api/tasks/update`, {
      method: 'POST',
      body: JSON.stringify({ task_id: id, ...data }),
    });
    return mapTask(dto);
  }

  async deleteTask(id: string): Promise<void> {
    await apiFetch(`/api/tasks/delete`, {
      method: 'POST',
      body: JSON.stringify({ task_id: id }),
    });
  }

  async getActiveItems() {
    return [];
  }

  async getTodoItems() {
    return [];
  }

  async getRecentProjects() {
    const projects = await this.getProjects();
    return projects.slice(0, 5).map(p => ({
      id: p.id,
      name: p.name,
      lastEdit: p.recentActivity || '',
      icon: 'folder',
    }));
  }
}
