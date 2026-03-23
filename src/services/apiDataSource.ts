import type { IDataSource, ProjectDto, WorkflowDto, TaskDto } from './IDataSource';
import type { Project, Workflow, Task } from '../types/entities';

const API_BASE = 'http://127.0.0.1:8787';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

interface UiStateResponse {
  success: boolean;
  data: {
    projects: ProjectDto[];
    tasks: TaskDto[];
    graphs: unknown[];
    flows: unknown[];
    workflows: WorkflowDto[];
    workflow_runs: unknown[];
    merge_states: unknown[];
    events: unknown[];
  };
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

async function fetchUiState(): Promise<UiStateResponse> {
  return apiFetch<UiStateResponse>('/api/state');
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
    projectId: dto.project_id ?? '',
    name: dto.name,
    description: dto.description ?? '',
    status: (dto.status as 'todo' | 'active' | 'completed') ?? 'todo',
    taskCount: dto.task_count ?? 0,
    lastRun: dto.last_run ?? '',
    trigger: dto.trigger ?? '',
  };
}

function mapTask(dto: TaskDto): Task {
  return {
    id: dto.id,
    workflowId: dto.workflow_id ?? '',
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
  private uiStateCache: UiStateResponse | null = null;
  readonly isConnected = true;
  readonly name = 'api';

  private async getUiState(): Promise<UiStateResponse> {
    if (!this.uiStateCache) {
      this.uiStateCache = await fetchUiState();
    }
    return this.uiStateCache;
  }

  invalidateCache() {
    this.uiStateCache = null;
  }

  async getProjects(): Promise<Project[]> {
    const state = await this.getUiState();
    return state.data.projects.map(mapProject);
  }

  async getProject(id: string): Promise<Project | null> {
    const state = await this.getUiState();
    const dto = state.data.projects.find(p => p.id === id);
    return dto ? mapProject(dto) : null;
  }

  async createProject(_data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    await apiFetch('/api/projects/create', {
      method: 'POST',
      body: JSON.stringify({ name: _data.name, description: _data.description }),
    });
    this.invalidateCache();
    const state = await this.getUiState();
    const dto = state.data.projects.find(p => p.name === _data.name);
    return dto ? mapProject(dto) : _data as Project;
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    await apiFetch('/api/projects/update', {
      method: 'POST',
      body: JSON.stringify({ project: id, name: data.name, description: data.description }),
    });
    this.invalidateCache();
    return (await this.getProject(id))!;
  }

  async deleteProject(id: string): Promise<void> {
    await apiFetch('/api/projects/delete', {
      method: 'POST',
      body: JSON.stringify({ project: id }),
    });
    this.invalidateCache();
  }

  async getWorkflows(): Promise<Workflow[]> {
    const state = await this.getUiState();
    return state.data.workflows.map(mapWorkflow);
  }

  async getWorkflow(id: string): Promise<Workflow | null> {
    const state = await this.getUiState();
    const dto = state.data.workflows.find(w => w.id === id);
    return dto ? mapWorkflow(dto) : null;
  }

  async getWorkflowsByProject(projectId: string): Promise<Workflow[]> {
    const all = await this.getWorkflows();
    return all.filter(w => w.projectId === projectId);
  }

  async createWorkflow(_data: Omit<Workflow, 'id'>): Promise<Workflow> {
    await apiFetch('/api/workflows/create', {
      method: 'POST',
      body: JSON.stringify(_data),
    });
    this.invalidateCache();
    const state = await this.getUiState();
    const dto = state.data.workflows.find(w => w.name === _data.name);
    return dto ? mapWorkflow(dto) : _data as Workflow;
  }

  async updateWorkflow(id: string, data: Partial<Workflow>): Promise<Workflow> {
    await apiFetch('/api/workflows/update', {
      method: 'POST',
      body: JSON.stringify({ workflow_id: id, ...data }),
    });
    this.invalidateCache();
    return (await this.getWorkflow(id))!;
  }

  async deleteWorkflow(id: string): Promise<void> {
    await apiFetch('/api/workflows/delete', {
      method: 'POST',
      body: JSON.stringify({ workflow_id: id }),
    });
    this.invalidateCache();
  }

  async getTasks(): Promise<Task[]> {
    const state = await this.getUiState();
    return state.data.tasks.map(mapTask);
  }

  async getTask(id: string): Promise<Task | null> {
    const state = await this.getUiState();
    const dto = state.data.tasks.find(t => t.id === id);
    return dto ? mapTask(dto) : null;
  }

  async getTasksByWorkflow(workflowId: string): Promise<Task[]> {
    const all = await this.getTasks();
    return all.filter(t => t.workflowId === workflowId);
  }

  async createTask(_data: Omit<Task, 'id'>): Promise<Task> {
    await apiFetch('/api/tasks/create', {
      method: 'POST',
      body: JSON.stringify(_data),
    });
    this.invalidateCache();
    const state = await this.getUiState();
    const dto = state.data.tasks.find(t => t.title === _data.name);
    return dto ? mapTask(dto) : _data as Task;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    await apiFetch('/api/tasks/update', {
      method: 'POST',
      body: JSON.stringify({ task_id: id, ...data }),
    });
    this.invalidateCache();
    return (await this.getTask(id))!;
  }

  async deleteTask(id: string): Promise<void> {
    await apiFetch('/api/tasks/delete', {
      method: 'POST',
      body: JSON.stringify({ task_id: id }),
    });
    this.invalidateCache();
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
