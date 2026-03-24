import type { IDataSource } from './IDataSource';
import type { 
  ServerProject, ServerTask, ServerWorkflow, ServerWorkflowRun, ServerStepRun, ServerMergeState, ServerEvent 
} from '../types/server';
import type { 
  Project, Workflow, Task, MergeState, Event, WorkflowRun, StepRun, CorrelationIds 
} from '../types/entities';
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
    projects: ServerProject[];
    tasks: ServerTask[];
    workflows: ServerWorkflow[];
    workflow_runs: ServerWorkflowRun[];
    merge_states: ServerMergeState[];
    events: ServerEvent[];
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

function validateDate(value: unknown): Date {
  if (typeof value === 'string') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? new Date() : date;
  }
  return new Date();
}

function mapProject(dto: ServerProject): Project {
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
    runtime: dto.runtime ? {
      adapterName: validateString(dto.runtime.adapter_name, ''),
      binaryPath: validateString(dto.runtime.binary_path, ''),
      model: dto.runtime.model,
      timeoutMs: typeof dto.runtime.timeout_ms === 'number' ? dto.runtime.timeout_ms : 0,
      maxParallelTasks: typeof dto.runtime.max_parallel_tasks === 'number' ? dto.runtime.max_parallel_tasks : 1,
    } : null,
    constitutionVersion: typeof dto.constitution_version === 'number' ? dto.constitution_version : null,
    constitutionUpdatedAt: dto.constitution_updated_at ? validateDate(dto.constitution_updated_at) : null,
  };
}

function mapWorkflow(dto: ServerWorkflow): Workflow {
  return {
    id: validateString(dto.id, 'unknown'),
    projectId: validateString(dto.project_id, ''),
    name: validateString(dto.name, 'Unnamed Workflow'),
    description: validateString(dto.description, ''),
    status: 'active',
    taskCount: Object.keys(dto.steps ?? {}).length,
    lastRun: 'Never',
    trigger: 'manual',
  };
}

function mapTask(dto: ServerTask): Task {
  const stateMap: Record<string, 'backlog' | 'in_progress' | 'done'> = {
    open: 'in_progress',
    closed: 'done',
  };
  
  return {
    id: validateString(dto.id, 'unknown'),
    workflowId: '',
    projectId: validateString(dto.project_id, ''),
    name: validateString(dto.title, 'Unnamed Task'),
    description: validateString(dto.description, ''),
    status: stateMap[validateString(dto.state, 'open')] ?? 'in_progress',
    priority: 'medium',
    assignee: undefined,
    dueDate: undefined,
    subtasks: [],
    state: dto.state === 'closed' ? 'closed' : 'open',
    runMode: dto.run_mode === 'manual' ? 'manual' : 'auto',
  };
}

function mapMergeState(dto: ServerMergeState): MergeState {
  const validStatuses = ['prepared', 'approved', 'completed'];
  return {
    flowId: validateString(dto.flow_id, 'unknown'),
    status: validStatuses.includes(dto.status) ? dto.status : 'prepared',
    targetBranch: typeof dto.target_branch === 'string' ? dto.target_branch : null,
    conflicts: Array.isArray(dto.conflicts) ? dto.conflicts : [],
    commits: Array.isArray(dto.commits) ? dto.commits : [],
    updatedAt: validateDate(dto.updated_at),
  };
}

function mapCorrelation(dto: ServerEvent['correlation']): CorrelationIds {
  return {
    projectId: dto.project_id ?? null,
    graphId: dto.graph_id ?? null,
    flowId: dto.flow_id ?? null,
    workflowId: dto.workflow_id ?? null,
    workflowRunId: dto.workflow_run_id ?? null,
    taskId: dto.task_id ?? null,
    attemptId: dto.attempt_id ?? null,
  };
}

function mapEvent(dto: ServerEvent): Event {
  return {
    id: validateString(dto.id, 'unknown'),
    type: validateString(dto.type, 'unknown'),
    category: validateString(dto.category, 'unknown'),
    timestamp: validateDate(dto.timestamp),
    sequence: typeof dto.sequence === 'number' ? dto.sequence : null,
    correlation: mapCorrelation(dto.correlation ?? {}),
    payload: typeof dto.payload === 'object' && dto.payload !== null ? dto.payload as Record<string, unknown> : {},
  };
}

function mapStepRun(dto: ServerStepRun): StepRun {
  const validStates = ['pending', 'ready', 'running', 'verifying', 'retry', 'waiting', 'succeeded', 'failed', 'skipped', 'aborted'];
  return {
    id: validateString(dto.id, 'unknown'),
    stepId: validateString(dto.step_id, 'unknown'),
    state: validStates.includes(dto.state) ? dto.state : 'pending',
    updatedAt: validateDate(dto.updated_at),
    reason: typeof dto.reason === 'string' ? dto.reason : null,
  };
}

function mapWorkflowRun(dto: ServerWorkflowRun): WorkflowRun {
  const validStates = ['created', 'running', 'paused', 'completed', 'aborted'];
  const stepRuns = dto.step_runs
    ? Object.values(dto.step_runs).map(mapStepRun)
    : [];
  return {
    id: validateString(dto.id, 'unknown'),
    workflowId: validateString(dto.workflow_id, ''),
    projectId: validateString(dto.project_id, ''),
    rootWorkflowRunId: validateString(dto.root_workflow_run_id, ''),
    parentWorkflowRunId: typeof dto.parent_workflow_run_id === 'string' ? dto.parent_workflow_run_id : null,
    state: validStates.includes(dto.state) ? dto.state : 'created',
    stepRuns,
    createdAt: validateDate(dto.created_at),
    startedAt: dto.started_at ? validateDate(dto.started_at) : null,
    completedAt: dto.completed_at ? validateDate(dto.completed_at) : null,
    updatedAt: validateDate(dto.updated_at),
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

  // Projects

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
    const response = await apiFetch<ServerProject>('/api/projects/create', {
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

  // Workflows

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
    const response = await apiFetch<ServerWorkflow>('/api/workflows/create', {
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

  // Tasks

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
    const response = await apiFetch<ServerTask>('/api/tasks/create', {
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

  // Merge States

  async getMergeStates(): Promise<MergeState[]> {
    const state = await this.getUiState();
    return state.data.merge_states.map(mapMergeState);
  }

  async getMergeState(flowId: string): Promise<MergeState | null> {
    const state = await this.getUiState();
    const dto = state.data.merge_states.find(m => m.flow_id === flowId);
    return dto ? mapMergeState(dto) : null;
  }

  // Events

  async getEvents(limit?: number): Promise<Event[]> {
    const state = await this.getUiState();
    const events = state.data.events.map(mapEvent);
    if (typeof limit === 'number' && limit > 0) {
      return events.slice(0, limit);
    }
    return events;
  }

  async getEventsByCorrelation(filters: { projectId?: string; flowId?: string; taskId?: string }): Promise<Event[]> {
    const state = await this.getUiState();
    return state.data.events
      .map(mapEvent)
      .filter(e => {
        if (filters.projectId && e.correlation.projectId !== filters.projectId) return false;
        if (filters.flowId && e.correlation.flowId !== filters.flowId) return false;
        if (filters.taskId && e.correlation.taskId !== filters.taskId) return false;
        return true;
      });
  }

  async getEventsFiltered(filters: { workflowRunId?: string; projectId?: string; workflowId?: string; taskId?: string; limit?: number; offset?: number }): Promise<Event[]> {
    const params = new URLSearchParams();
    if (filters.workflowRunId) params.set('workflow_run_id', filters.workflowRunId);
    if (filters.projectId) params.set('project_id', filters.projectId);
    if (filters.workflowId) params.set('workflow_id', filters.workflowId);
    if (filters.taskId) params.set('task_id', filters.taskId);
    if (filters.limit) params.set('limit', String(filters.limit));
    if (filters.offset) params.set('offset', String(filters.offset));
    
    const queryString = params.toString();
    const path = queryString ? `/api/events?${queryString}` : '/api/events';
    const response = await apiFetch<{ success: boolean; data: ServerEvent[] }>(path);
    return (response.data ?? []).map(mapEvent);
  }

  // Workflow Runs

  async getWorkflowRuns(): Promise<WorkflowRun[]> {
    const state = await this.getUiState();
    return state.data.workflow_runs.map(mapWorkflowRun);
  }

  async getWorkflowRun(id: string): Promise<WorkflowRun | null> {
    const state = await this.getUiState();
    const dto = state.data.workflow_runs.find(r => r.id === id);
    return dto ? mapWorkflowRun(dto) : null;
  }

  async getWorkflowRunsByWorkflow(workflowId: string): Promise<WorkflowRun[]> {
    const params = new URLSearchParams();
    params.set('workflow', workflowId);
    const response = await apiFetch<{ success: boolean; data: ServerWorkflowRun[] }>(`/api/workflow-runs?${params.toString()}`);
    return (response.data ?? []).map(mapWorkflowRun);
  }

  // Dashboard helpers

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
