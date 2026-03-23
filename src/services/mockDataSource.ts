import type { Project, Workflow, Task } from '../types/entities';
import type { IDataSource, ActiveItem, TodoItem, RecentProject } from './IDataSource';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockError extends Error {
  constructor(
    public code: string,
    message: string,
    public category: ErrorCategory,
    public severity: ErrorSeverity
  ) {
    super(message);
    this.name = 'MockError';
  }
}

function createNotFoundError(resource: string, id: string): MockError {
  const taxonomy = ErrorTaxonomy.NOT_FOUND_PROJECT;
  const message = `${resource} "${id}" not found`;
  return new MockError(
    taxonomy.code,
    message,
    ErrorCategory.NOT_FOUND,
    ErrorSeverity.MEDIUM
  );
}

export class MockDataSource implements IDataSource {
  readonly isConnected = false;
  readonly name = 'mock';

  private readonly projects: Project[] = [
    {
      id: 'orion',
      name: 'NEURAL_NEXUS',
      description: 'Optimization of decentralized compute clusters for deep-learning deployment in edge environments.',
      status: 'active',
      taskCount: 42,
      workflowCount: 5,
      createdAt: new Date('2023-11-24'),
      updatedAt: new Date(),
      recentActivity: '2M_AGO',
      priority: 'PRIORITY_ALPHA',
    },
    {
      id: 'titan',
      name: 'TITAN_SHIELD',
      description: 'Hardening layer-2 protocol security through biometric verification and encrypted handshakes.',
      status: 'active',
      taskCount: 158,
      workflowCount: 12,
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date(),
      recentActivity: '14_HRS_AGO',
      priority: 'ACTIVE_STATUS',
    },
    {
      id: 'core',
      name: 'CORE_LEGACY',
      description: 'Maintenance of legacy mainframe interfaces for modern API consumption and data bridging.',
      status: 'draft',
      taskCount: 12,
      workflowCount: 2,
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date(),
      recentActivity: '05_DAYS_AGO',
      priority: 'STABLE_FLOW',
    },
    {
      id: 'vortex',
      name: 'VORTEX_BLADE',
      description: 'High-performance data processing pipeline',
      status: 'active',
      taskCount: 14,
      workflowCount: 3,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date(),
      recentActivity: '1D_AGO',
    },
    {
      id: 'ghost',
      name: 'GHOST_SHELL',
      description: 'Stealth network protocol implementation',
      status: 'active',
      taskCount: 88,
      workflowCount: 8,
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date(),
      recentActivity: '3H_AGO',
    },
    {
      id: 'druid',
      name: 'DRUID_NET',
      description: 'Distributed caching system',
      status: 'archived',
      taskCount: 5,
      workflowCount: 1,
      createdAt: new Date('2023-06-15'),
      updatedAt: new Date(),
      recentActivity: '30_DAYS_AGO',
    },
    {
      id: 'zenith',
      name: 'ZENITH_OPS',
      description: 'Operations automation platform',
      status: 'active',
      taskCount: 231,
      workflowCount: 15,
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date(),
      recentActivity: '1H_AGO',
    },
    {
      id: 'kinetic',
      name: 'KINETIC_LINK',
      description: 'Real-time data synchronization',
      status: 'active',
      taskCount: 19,
      workflowCount: 4,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date(),
      recentActivity: '6H_AGO',
    },
  ];

  private readonly workflows: Workflow[] = [
    {
      id: 'wf-ing-001',
      projectId: 'orion',
      name: 'Ingestion Flow',
      description: 'Standard telemetry mapping for all edge nodes in cluster 7.',
      status: 'active',
      taskCount: 12,
      lastRun: '4m_ago',
      trigger: 'Webhook: GitHub Push',
    },
    {
      id: 'wf-ana-002',
      projectId: 'orion',
      name: 'Analytics Pipeline',
      description: 'Aggregating hourly metrics into centralized tactical dashboard views.',
      status: 'todo',
      taskCount: 8,
      lastRun: '0h_ago',
      trigger: 'CRON: 00 */6 * * *',
    },
  ];

  private readonly tasks: Task[] = [
    {
      id: 't-4092',
      workflowId: 'wf-ing-001',
      projectId: 'orion',
      name: 'Parse JSON',
      description: 'Implement a high-performance recursive parser for incoming Hivemind neural telemetry streams.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'OPERATOR_X42',
      dueDate: '2024.11.24 // 14:00',
      subtasks: [
        { id: 's1', name: 'DEF_SCHEMA_VALIDATOR', completed: true },
        { id: 's2', name: 'RECURSIVE_ITERATOR_01', completed: false },
        { id: 's3', name: 'OVERFLOW_SAFETY_NET', completed: false },
        { id: 's4', name: 'UNIT_TEST_RECOVERY', completed: false },
      ],
    },
    {
      id: 't-4093',
      workflowId: 'wf-ing-001',
      projectId: 'orion',
      name: 'Validate Schema',
      description: 'Schema validation for orbital strict v2.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'OPERATOR_X42',
      dueDate: '2024.11.25',
      subtasks: [],
    },
    {
      id: 't-4094',
      workflowId: 'wf-ing-001',
      projectId: 'orion',
      name: 'Load to DB',
      description: 'Load validated data to cluster delta 01.',
      status: 'backlog',
      priority: 'medium',
      dueDate: '2024.11.26',
      subtasks: [],
    },
  ];

  private readonly activeItems: ActiveItem[] = [
    { id: 'act-1', name: 'Data Migration', target: 'AWS_US_EAST_PROD', progress: 72 },
    { id: 'act-2', name: 'API Endpoint Test', target: 'CORE_SERVICES_V2', progress: 15 },
    { id: 'act-3', name: 'Neural Net Retraining', target: 'PATTERN_ENGINE_09', progress: 94 },
    { id: 'act-4', name: 'Kernel Cleanup', target: 'SYS_ROOT', progress: 45 },
  ];

  private readonly todoItems: TodoItem[] = [
    { id: 'todo-1', name: 'Refactor Auth Service', project: 'HIVEMIND_CORE', priority: 'high' },
    { id: 'todo-2', name: 'Update Schema', project: 'DB_ARCHITECTURE', priority: 'medium' },
    { id: 'todo-3', name: 'Review PR #204', project: 'NEXUS_UI', priority: 'low' },
    { id: 'todo-4', name: 'SSL Cert Renewal', project: 'OPS_INFRA', priority: 'low' },
  ];

  private readonly recentProjects: RecentProject[] = [
    { id: 'orion', name: 'Project Orion', lastEdit: '2M_AGO', icon: 'rocket_launch' },
    { id: 'titan', name: 'Project Nexus', lastEdit: '5H_AGO', icon: 'hub' },
  ];

  async getProjects(): Promise<Project[]> {
    await delay(100);
    return [...this.projects];
  }

  async getProject(id: string): Promise<Project | null> {
    await delay(50);
    return this.projects.find(p => p.id === id) ?? null;
  }

  async createProject(_data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    await delay(100);
    const project: Project = {
      ..._data,
      id: `proj-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.push(project);
    structuredLogger.debug('Mock project created', { projectId: project.id });
    return project;
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    await delay(100);
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) {
      const error = createNotFoundError('Project', id);
      structuredLogger.error(
        `Mock update failed: project not found`,
        { code: error.code, category: error.category, severity: error.severity, message: error.message },
        { projectId: id }
      );
      throw error;
    }
    this.projects[index] = { ...this.projects[index], ...data, updatedAt: new Date() };
    return this.projects[index];
  }

  async deleteProject(id: string): Promise<void> {
    await delay(100);
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.projects.splice(index, 1);
      structuredLogger.debug('Mock project deleted', { projectId: id });
    }
  }

  async getWorkflows(): Promise<Workflow[]> {
    await delay(100);
    return [...this.workflows];
  }

  async getWorkflow(id: string): Promise<Workflow | null> {
    await delay(50);
    return this.workflows.find(w => w.id === id) ?? null;
  }

  async getWorkflowsByProject(projectId: string): Promise<Workflow[]> {
    await delay(50);
    return this.workflows.filter(w => w.projectId === projectId);
  }

  async createWorkflow(_data: Omit<Workflow, 'id'>): Promise<Workflow> {
    await delay(100);
    const workflow: Workflow = { ..._data, id: `wf-${Date.now()}` };
    this.workflows.push(workflow);
    structuredLogger.debug('Mock workflow created', { workflowId: workflow.id });
    return workflow;
  }

  async updateWorkflow(id: string, data: Partial<Workflow>): Promise<Workflow> {
    await delay(100);
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) {
      const taxonomy = ErrorTaxonomy.NOT_FOUND_WORKFLOW;
      const error = new MockError(
        taxonomy.code,
        `Workflow "${id}" not found`,
        ErrorCategory.NOT_FOUND,
        ErrorSeverity.MEDIUM
      );
      structuredLogger.error(
        `Mock update failed: workflow not found`,
        { code: error.code, category: error.category, severity: error.severity, message: error.message },
        { workflowId: id }
      );
      throw error;
    }
    this.workflows[index] = { ...this.workflows[index], ...data };
    return this.workflows[index];
  }

  async deleteWorkflow(id: string): Promise<void> {
    await delay(100);
    const index = this.workflows.findIndex(w => w.id === id);
    if (index !== -1) {
      this.workflows.splice(index, 1);
      structuredLogger.debug('Mock workflow deleted', { workflowId: id });
    }
  }

  async getTasks(): Promise<Task[]> {
    await delay(100);
    return [...this.tasks];
  }

  async getTask(id: string): Promise<Task | null> {
    await delay(50);
    return this.tasks.find(t => t.id === id) ?? null;
  }

  async getTasksByWorkflow(workflowId: string): Promise<Task[]> {
    await delay(50);
    return this.tasks.filter(t => t.workflowId === workflowId);
  }

  async createTask(_data: Omit<Task, 'id'>): Promise<Task> {
    await delay(100);
    const task: Task = { ..._data, id: `task-${Date.now()}` };
    this.tasks.push(task);
    structuredLogger.debug('Mock task created', { taskId: task.id });
    return task;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    await delay(100);
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      const taxonomy = ErrorTaxonomy.NOT_FOUND_TASK;
      const error = new MockError(
        taxonomy.code,
        `Task "${id}" not found`,
        ErrorCategory.NOT_FOUND,
        ErrorSeverity.MEDIUM
      );
      structuredLogger.error(
        `Mock update failed: task not found`,
        { code: error.code, category: error.category, severity: error.severity, message: error.message },
        { taskId: id }
      );
      throw error;
    }
    this.tasks[index] = { ...this.tasks[index], ...data };
    return this.tasks[index];
  }

  async deleteTask(id: string): Promise<void> {
    await delay(100);
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      structuredLogger.debug('Mock task deleted', { taskId: id });
    }
  }

  async getActiveItems(): Promise<ActiveItem[]> {
    await delay(50);
    return [...this.activeItems];
  }

  async getTodoItems(): Promise<TodoItem[]> {
    await delay(50);
    return [...this.todoItems];
  }

  async getRecentProjects(): Promise<RecentProject[]> {
    await delay(50);
    return [...this.recentProjects];
  }
}
