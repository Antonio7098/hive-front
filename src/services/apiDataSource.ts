import type { IDataSource, ProjectDto, WorkflowDto, TaskDto, GraphDto, FlowDto, WorkflowRunDto, MergeStateDto, EventDto } from './IDataSource';
import type { Project, Workflow, Task } from '../types/entities';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8787';

class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public isNetworkError?: boolean
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface UiStateResponse {
  success: boolean;
  data: {
    projects: ProjectDto[];
    tasks: TaskDto[];
    graphs: GraphDto[];
    flows: FlowDto[];
    workflows: WorkflowDto[];
    workflow_runs: WorkflowRunDto[];
    merge_states: MergeStateDto[];
    events: EventDto[];
  };
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      const taxonomy = ErrorTaxonomy.NETWORK_CONNECTION_FAILED;
      
      structuredLogger.error(
        `API request failed: ${path}`,
        {
          code: taxonomy.code,
          category: ErrorCategory.NETWORK,
          severity: ErrorSeverity.HIGH,
          message: `HTTP ${response.status}: ${errorText}`,
        },
        { path, status: response.status }
      );
      
      throw new ApiError(response.status, taxonomy.code, `HTTP ${response.status}: ${errorText}`);
    }

    const body: ApiResponse<T> = await response.json();
    
    if (!body.success) {
      structuredLogger.error(
        `API returned success: false`,
        {
          code: ErrorTaxonomy.API_SUCCESS_FALSE.code,
          category: ErrorCategory.API,
          severity: ErrorSeverity.MEDIUM,
          message: body.error || 'No error message provided',
        },
        { path }
      );
      throw new ApiError(response.status, ErrorTaxonomy.API_SUCCESS_FALSE.code, body.error || 'API returned success: false');
    }
    
    return body.data ?? (body as T);
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    
    const taxonomy = ErrorTaxonomy.NETWORK_CONNECTION_FAILED;
    const message = err instanceof Error ? err.message : 'Unknown network error';
    
    structuredLogger.error(
      'Network error',
      {
        code: taxonomy.code,
        category: ErrorCategory.NETWORK,
        severity: ErrorSeverity.HIGH,
        message,
      },
      { path }
    );
    
    throw new ApiError(0, taxonomy.code, message, true);
  }
}

async function fetchUiState(): Promise<UiStateResponse> {
  return apiFetch<UiStateResponse>('/api/state');
}

function validateString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

function validateNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' ? value : fallback;
}

function validateDate(value: unknown): Date {
  if (typeof value === 'string') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? new Date() : date;
  }
  return new Date();
}

function validateStatus(value: unknown, validStatuses: string[]): string {
  if (typeof value === 'string' && validStatuses.includes(value)) {
    return value;
  }
  return validStatuses[0];
}

function mapProject(dto: ProjectDto): Project {
  return {
    id: validateString(dto.id, 'unknown'),
    name: validateString(dto.name, 'Unnamed Project'),
    description: validateString(dto.description, ''),
    status: 'active',
    taskCount: 0,
    workflowCount: 0,
    createdAt: validateDate(dto.created_at),
    updatedAt: validateDate(dto.updated_at),
    recentActivity: '',
    priority: undefined,
  };
}

function mapWorkflow(dto: WorkflowDto): Workflow {
  return {
    id: validateString(dto.id, 'unknown'),
    projectId: validateString(dto.project_id, ''),
    name: validateString(dto.name, 'Unnamed Workflow'),
    description: validateString(dto.description, ''),
    status: validateStatus(dto.status, ['todo', 'active', 'completed']) as 'todo' | 'active' | 'completed',
    taskCount: validateNumber(dto.task_count, 0),
    lastRun: validateString(dto.last_run, 'Never'),
    trigger: validateString(dto.trigger, 'manual'),
  };
}

function mapTask(dto: TaskDto): Task {
  const stateMap: Record<string, 'backlog' | 'in_progress' | 'done'> = {
    open: 'in_progress',
    closed: 'done',
  };
  
  return {
    id: validateString(dto.id, 'unknown'),
    workflowId: validateString(dto.workflow_id, ''),
    projectId: validateString(dto.project_id, ''),
    name: validateString(dto.title, 'Unnamed Task'),
    description: validateString(dto.description, ''),
    status: stateMap[validateString(dto.state, 'open')] ?? 'in_progress',
    priority: 'medium',
    assignee: undefined,
    dueDate: undefined,
    subtasks: [],
  };
}

export class ApiDataSource implements IDataSource {
  private uiStateCache: UiStateResponse | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 30000;
  readonly isConnected = true;
  readonly name = 'api';

  private async getUiState(): Promise<UiStateResponse> {
    const now = Date.now();
    
    if (this.uiStateCache && (now - this.cacheTimestamp) < this.CACHE_TTL) {
      return this.uiStateCache;
    }
    
    this.uiStateCache = await fetchUiState();
    this.cacheTimestamp = now;
    return this.uiStateCache;
  }

  invalidateCache(): void {
    this.uiStateCache = null;
    this.cacheTimestamp = 0;
    structuredLogger.debug('Cache invalidated');
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
    const response = await apiFetch<ProjectDto>('/api/projects/create', {
      method: 'POST',
      body: JSON.stringify({ name: _data.name, description: _data.description }),
    });
    
    this.invalidateCache();
    
    if (response) {
      return mapProject(response);
    }
    
    const taxonomy = ErrorTaxonomy.CLIENT_CREATE_FAILED;
    structuredLogger.error(
      'Failed to create project',
      {
        code: taxonomy.code,
        category: ErrorCategory.CLIENT,
        severity: taxonomy.severity,
        message: 'Could not retrieve created project from server',
      }
    );
    throw new ApiError(500, taxonomy.code, 'Failed to create project: could not retrieve from server');
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    await apiFetch('/api/projects/update', {
      method: 'POST',
      body: JSON.stringify({ project: id, name: data.name, description: data.description }),
    });
    
    this.invalidateCache();
    
    const updated = await this.getProject(id);
    
    if (!updated) {
      const taxonomy = ErrorTaxonomy.NOT_FOUND_PROJECT;
      structuredLogger.error(
        `Failed to update project: not found after update`,
        {
          code: taxonomy.code,
          category: ErrorCategory.NOT_FOUND,
          severity: taxonomy.severity,
          message: `Project ${id} not found after update`,
        },
        { projectId: id }
      );
      throw new ApiError(404, taxonomy.code, `Project ${id} not found after update`);
    }
    
    return updated;
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
    const workflows = await this.getWorkflows();
    return workflows.filter(w => w.projectId === projectId);
  }

  async createWorkflow(_data: Omit<Workflow, 'id'>): Promise<Workflow> {
    const response = await apiFetch<WorkflowDto>('/api/workflows/create', {
      method: 'POST',
      body: JSON.stringify(_data),
    });
    
    this.invalidateCache();
    
    if (response) {
      return mapWorkflow(response);
    }
    
    const taxonomy = ErrorTaxonomy.CLIENT_CREATE_FAILED;
    structuredLogger.error(
      'Failed to create workflow',
      {
        code: taxonomy.code,
        category: ErrorCategory.CLIENT,
        severity: taxonomy.severity,
        message: 'Could not retrieve created workflow from server',
      }
    );
    throw new ApiError(500, taxonomy.code, 'Failed to create workflow: could not retrieve from server');
  }

  async updateWorkflow(id: string, data: Partial<Workflow>): Promise<Workflow> {
    await apiFetch('/api/workflows/update', {
      method: 'POST',
      body: JSON.stringify({ workflow_id: id, ...data }),
    });
    
    this.invalidateCache();
    
    const updated = await this.getWorkflow(id);
    
    if (!updated) {
      const taxonomy = ErrorTaxonomy.NOT_FOUND_WORKFLOW;
      structuredLogger.error(
        `Failed to update workflow: not found after update`,
        {
          code: taxonomy.code,
          category: ErrorCategory.NOT_FOUND,
          severity: taxonomy.severity,
          message: `Workflow ${id} not found after update`,
        },
        { workflowId: id }
      );
      throw new ApiError(404, taxonomy.code, `Workflow ${id} not found after update`);
    }
    
    return updated;
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
    const tasks = await this.getTasks();
    return tasks.filter(t => t.workflowId === workflowId);
  }

  async createTask(_data: Omit<Task, 'id'>): Promise<Task> {
    const response = await apiFetch<TaskDto>('/api/tasks/create', {
      method: 'POST',
      body: JSON.stringify(_data),
    });
    
    this.invalidateCache();
    
    if (response) {
      return mapTask(response);
    }
    
    const taxonomy = ErrorTaxonomy.CLIENT_CREATE_FAILED;
    structuredLogger.error(
      'Failed to create task',
      {
        code: taxonomy.code,
        category: ErrorCategory.CLIENT,
        severity: taxonomy.severity,
        message: 'Could not retrieve created task from server',
      }
    );
    throw new ApiError(500, taxonomy.code, 'Failed to create task: could not retrieve from server');
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    await apiFetch('/api/tasks/update', {
      method: 'POST',
      body: JSON.stringify({ task_id: id, ...data }),
    });
    
    this.invalidateCache();
    
    const updated = await this.getTask(id);
    
    if (!updated) {
      const taxonomy = ErrorTaxonomy.NOT_FOUND_TASK;
      structuredLogger.error(
        `Failed to update task: not found after update`,
        {
          code: taxonomy.code,
          category: ErrorCategory.NOT_FOUND,
          severity: taxonomy.severity,
          message: `Task ${id} not found after update`,
        },
        { taskId: id }
      );
      throw new ApiError(404, taxonomy.code, `Task ${id} not found after update`);
    }
    
    return updated;
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

export { ApiError };
