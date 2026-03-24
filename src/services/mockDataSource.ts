import type { Project, Workflow, Task, MergeState, Event, WorkflowRun } from '../types/entities';
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
      runtime: { adapterName: 'codex', binaryPath: '/usr/local/bin/codex', model: 'gpt-4o', timeoutMs: 300000, maxParallelTasks: 4 },
      constitutionVersion: 2,
      constitutionUpdatedAt: new Date('2024-02-15'),
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
      runtime: { adapterName: 'claude', binaryPath: '/usr/local/bin/claude', model: 'claude-3-opus', timeoutMs: 600000, maxParallelTasks: 8 },
      constitutionVersion: 3,
      constitutionUpdatedAt: new Date('2024-03-01'),
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
      runtime: null,
      constitutionVersion: 1,
      constitutionUpdatedAt: new Date('2023-09-01'),
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
      runtime: { adapterName: 'codex', binaryPath: '/usr/local/bin/codex', model: 'gpt-4o-mini', timeoutMs: 120000, maxParallelTasks: 2 },
      constitutionVersion: null,
      constitutionUpdatedAt: null,
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
      runtime: { adapterName: 'codex', binaryPath: '/usr/local/bin/codex', model: 'gpt-4o', timeoutMs: 300000, maxParallelTasks: 4 },
      constitutionVersion: 1,
      constitutionUpdatedAt: new Date('2024-02-20'),
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
      runtime: null,
      constitutionVersion: null,
      constitutionUpdatedAt: null,
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
      runtime: { adapterName: 'claude', binaryPath: '/usr/local/bin/claude', model: 'claude-3-sonnet', timeoutMs: 180000, maxParallelTasks: 6 },
      constitutionVersion: 4,
      constitutionUpdatedAt: new Date('2024-03-14'),
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
      runtime: { adapterName: 'codex', binaryPath: '/usr/local/bin/codex', model: 'gpt-4o', timeoutMs: 300000, maxParallelTasks: 4 },
      constitutionVersion: null,
      constitutionUpdatedAt: null,
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
      state: 'open',
      runMode: 'auto',
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
      state: 'open',
      runMode: 'auto',
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
      state: 'open',
      runMode: 'manual',
    },
  ];

  private readonly mergeStates: MergeState[] = [
    {
      flowId: 'run-003',
      status: 'prepared',
      targetBranch: 'main',
      conflicts: [],
      commits: ['a1b2c3d', 'e4f5g6h'],
      updatedAt: new Date('2024-03-12T16:00:00Z'),
    },
    {
      flowId: 'run-007',
      status: 'approved',
      targetBranch: 'develop',
      conflicts: ['src/server/routes/tasks.rs'],
      commits: ['x9y8z7w'],
      updatedAt: new Date('2024-03-14T10:30:00Z'),
    },
  ];

  private readonly events: Event[] = [
    {
      id: 'evt-001',
      type: 'workflow.created',
      category: 'lifecycle',
      timestamp: new Date('2024-03-10T09:00:00Z'),
      sequence: 1,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: null, taskId: null, attemptId: null },
      payload: { workflow_id: 'wf-ing-001' },
    },
    {
      id: 'evt-002',
      type: 'workflow_run.started',
      category: 'execution',
      timestamp: new Date('2024-03-10T10:00:00Z'),
      sequence: 2,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-001', taskId: null, attemptId: null },
      payload: { run_id: 'run-001' },
    },
    {
      id: 'evt-003',
      type: 'step.completed',
      category: 'execution',
      timestamp: new Date('2024-03-10T10:05:00Z'),
      sequence: 3,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-001', taskId: 't-4092', attemptId: 'att-001' },
      payload: { step_id: 'step-parse', state: 'success' },
    },
    {
      id: 'evt-004',
      type: 'step.completed',
      category: 'execution',
      timestamp: new Date('2024-03-10T10:12:00Z'),
      sequence: 4,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-001', taskId: 't-4093', attemptId: 'att-002' },
      payload: { step_id: 'step-validate', state: 'success' },
    },
    {
      id: 'evt-005',
      type: 'workflow_run.completed',
      category: 'execution',
      timestamp: new Date('2024-03-10T10:20:00Z'),
      sequence: 5,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-001', taskId: null, attemptId: null },
      payload: { run_id: 'run-001', state: 'completed' },
    },
    {
      id: 'evt-006',
      type: 'workflow_run.started',
      category: 'execution',
      timestamp: new Date('2024-03-11T08:00:00Z'),
      sequence: 6,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-002', taskId: null, attemptId: null },
      payload: { run_id: 'run-002' },
    },
    {
      id: 'evt-007',
      type: 'step.failed',
      category: 'execution',
      timestamp: new Date('2024-03-11T08:08:00Z'),
      sequence: 7,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-002', taskId: 't-4093', attemptId: 'att-003' },
      payload: { step_id: 'step-validate', state: 'failed', error: 'Schema validation timeout' },
    },
    {
      id: 'evt-008',
      type: 'workflow_run.aborted',
      category: 'execution',
      timestamp: new Date('2024-03-11T08:10:00Z'),
      sequence: 8,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-002', taskId: null, attemptId: null },
      payload: { run_id: 'run-002', state: 'aborted' },
    },
    {
      id: 'evt-009',
      type: 'workflow_run.started',
      category: 'execution',
      timestamp: new Date('2024-03-12T14:00:00Z'),
      sequence: 9,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-003', taskId: null, attemptId: null },
      payload: { run_id: 'run-003' },
    },
    {
      id: 'evt-010',
      type: 'merge.prepared',
      category: 'merge',
      timestamp: new Date('2024-03-12T16:00:00Z'),
      sequence: 10,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-003', taskId: null, attemptId: null },
      payload: { target_branch: 'main', commits: ['a1b2c3d', 'e4f5g6h'] },
    },
    {
      id: 'evt-011',
      type: 'workflow.created',
      category: 'lifecycle',
      timestamp: new Date('2024-03-13T09:00:00Z'),
      sequence: 11,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ana-002', workflowRunId: null, taskId: null, attemptId: null },
      payload: { workflow_id: 'wf-ana-002' },
    },
    {
      id: 'evt-012',
      type: 'merge.approved',
      category: 'merge',
      timestamp: new Date('2024-03-14T10:30:00Z'),
      sequence: 12,
      correlation: { projectId: 'orion', graphId: null, flowId: null, workflowId: 'wf-ing-001', workflowRunId: 'run-007', taskId: null, attemptId: null },
      payload: { target_branch: 'develop' },
    },
  ];

  private readonly workflowRuns: WorkflowRun[] = [
    {
      id: 'run-001',
      workflowId: 'wf-ing-001',
      projectId: 'orion',
      rootWorkflowRunId: 'run-001',
      parentWorkflowRunId: null,
      state: 'completed',
      stepRuns: [
        { id: 'sr-001a', stepId: 'step-parse', state: 'succeeded', updatedAt: new Date('2024-03-10T10:05:00Z'), reason: null },
        { id: 'sr-001b', stepId: 'step-validate', state: 'succeeded', updatedAt: new Date('2024-03-10T10:12:00Z'), reason: null },
        { id: 'sr-001c', stepId: 'step-load', state: 'succeeded', updatedAt: new Date('2024-03-10T10:20:00Z'), reason: null },
      ],
      createdAt: new Date('2024-03-10T09:55:00Z'),
      startedAt: new Date('2024-03-10T10:00:00Z'),
      completedAt: new Date('2024-03-10T10:20:00Z'),
      updatedAt: new Date('2024-03-10T10:20:00Z'),
    },
    {
      id: 'run-002',
      workflowId: 'wf-ing-001',
      projectId: 'orion',
      rootWorkflowRunId: 'run-002',
      parentWorkflowRunId: null,
      state: 'aborted',
      stepRuns: [
        { id: 'sr-002a', stepId: 'step-parse', state: 'succeeded', updatedAt: new Date('2024-03-11T08:04:00Z'), reason: null },
        { id: 'sr-002b', stepId: 'step-validate', state: 'failed', updatedAt: new Date('2024-03-11T08:08:00Z'), reason: 'Schema validation timeout after 30s' },
        { id: 'sr-002c', stepId: 'step-load', state: 'skipped', updatedAt: new Date('2024-03-11T08:10:00Z'), reason: 'Upstream step failed' },
      ],
      createdAt: new Date('2024-03-11T07:55:00Z'),
      startedAt: new Date('2024-03-11T08:00:00Z'),
      completedAt: new Date('2024-03-11T08:10:00Z'),
      updatedAt: new Date('2024-03-11T08:10:00Z'),
    },
    {
      id: 'run-003',
      workflowId: 'wf-ing-001',
      projectId: 'orion',
      rootWorkflowRunId: 'run-003',
      parentWorkflowRunId: null,
      state: 'completed',
      stepRuns: [
        { id: 'sr-003a', stepId: 'step-parse', state: 'succeeded', updatedAt: new Date('2024-03-12T14:05:00Z'), reason: null },
        { id: 'sr-003b', stepId: 'step-validate', state: 'succeeded', updatedAt: new Date('2024-03-12T14:10:00Z'), reason: null },
        { id: 'sr-003c', stepId: 'step-load', state: 'succeeded', updatedAt: new Date('2024-03-12T14:18:00Z'), reason: null },
      ],
      createdAt: new Date('2024-03-12T13:55:00Z'),
      startedAt: new Date('2024-03-12T14:00:00Z'),
      completedAt: new Date('2024-03-12T14:18:00Z'),
      updatedAt: new Date('2024-03-12T14:18:00Z'),
    },
    {
      id: 'run-004',
      workflowId: 'wf-ing-001',
      projectId: 'orion',
      rootWorkflowRunId: 'run-004',
      parentWorkflowRunId: null,
      state: 'running',
      stepRuns: [
        { id: 'sr-004a', stepId: 'step-parse', state: 'succeeded', updatedAt: new Date('2024-03-14T11:05:00Z'), reason: null },
        { id: 'sr-004b', stepId: 'step-validate', state: 'running', updatedAt: new Date(), reason: null },
        { id: 'sr-004c', stepId: 'step-load', state: 'pending', updatedAt: new Date(), reason: null },
      ],
      createdAt: new Date('2024-03-14T11:00:00Z'),
      startedAt: new Date('2024-03-14T11:00:00Z'),
      completedAt: null,
      updatedAt: new Date(),
    },
    {
      id: 'run-005',
      workflowId: 'wf-ing-001',
      projectId: 'orion',
      rootWorkflowRunId: 'run-005',
      parentWorkflowRunId: null,
      state: 'paused',
      stepRuns: [
        { id: 'sr-005a', stepId: 'step-parse', state: 'succeeded', updatedAt: new Date('2024-03-13T16:05:00Z'), reason: null },
        { id: 'sr-005b', stepId: 'step-validate', state: 'waiting', updatedAt: new Date('2024-03-13T16:30:00Z'), reason: 'Awaiting operator approval' },
        { id: 'sr-005c', stepId: 'step-load', state: 'pending', updatedAt: new Date(), reason: null },
      ],
      createdAt: new Date('2024-03-13T16:00:00Z'),
      startedAt: new Date('2024-03-13T16:00:00Z'),
      completedAt: null,
      updatedAt: new Date('2024-03-13T16:30:00Z'),
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

  // Projects

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

  // Workflows

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

  // Tasks

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

  // Merge States

  async getMergeStates(): Promise<MergeState[]> {
    await delay(100);
    return [...this.mergeStates];
  }

  async getMergeState(flowId: string): Promise<MergeState | null> {
    await delay(50);
    return this.mergeStates.find(m => m.flowId === flowId) ?? null;
  }

  // Events

  async getEvents(limit?: number): Promise<Event[]> {
    await delay(100);
    const events = [...this.events];
    if (typeof limit === 'number' && limit > 0) {
      return events.slice(0, limit);
    }
    return events;
  }

  async getEventsByCorrelation(filters: { projectId?: string; flowId?: string; taskId?: string }): Promise<Event[]> {
    await delay(50);
    return this.events.filter(e => {
      if (filters.projectId && e.correlation.projectId !== filters.projectId) return false;
      if (filters.flowId && e.correlation.flowId !== filters.flowId) return false;
      if (filters.taskId && e.correlation.taskId !== filters.taskId) return false;
      return true;
    });
  }

  async getEventsFiltered(filters: { workflowRunId?: string; projectId?: string; workflowId?: string; taskId?: string; limit?: number; offset?: number }): Promise<Event[]> {
    await delay(50);
    let filtered = this.events.filter(e => {
      if (filters.workflowRunId && e.correlation.workflowRunId !== filters.workflowRunId) return false;
      if (filters.projectId && e.correlation.projectId !== filters.projectId) return false;
      if (filters.workflowId && e.correlation.workflowId !== filters.workflowId) return false;
      if (filters.taskId && e.correlation.taskId !== filters.taskId) return false;
      return true;
    });
    if (filters.offset && filters.offset > 0) {
      filtered = filtered.slice(filters.offset);
    }
    if (filters.limit && filters.limit > 0) {
      filtered = filtered.slice(0, filters.limit);
    }
    return filtered;
  }

  // Workflow Runs

  async getWorkflowRuns(): Promise<WorkflowRun[]> {
    await delay(100);
    return [...this.workflowRuns];
  }

  async getWorkflowRun(id: string): Promise<WorkflowRun | null> {
    await delay(50);
    return this.workflowRuns.find(r => r.id === id) ?? null;
  }

  async getWorkflowRunsByWorkflow(workflowId: string): Promise<WorkflowRun[]> {
    await delay(50);
    return this.workflowRuns.filter(r => r.workflowId === workflowId);
  }

  // Dashboard helpers

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
