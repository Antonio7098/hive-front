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

export const mockProjects: Project[] = [
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

export const mockWorkflows: Workflow[] = [
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

export const mockTasks: Task[] = [
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

export const mockActiveItems = [
  { id: 'act-1', name: 'Data Migration', target: 'AWS_US_EAST_PROD', progress: 72 },
  { id: 'act-2', name: 'API Endpoint Test', target: 'CORE_SERVICES_V2', progress: 15 },
  { id: 'act-3', name: 'Neural Net Retraining', target: 'PATTERN_ENGINE_09', progress: 94 },
  { id: 'act-4', name: 'Kernel Cleanup', target: 'SYS_ROOT', progress: 45 },
];

export const mockTodoItems = [
  { id: 'todo-1', name: 'Refactor Auth Service', project: 'HIVEMIND_CORE', priority: 'high' as const },
  { id: 'todo-2', name: 'Update Schema', project: 'DB_ARCHITECTURE', priority: 'medium' as const },
  { id: 'todo-3', name: 'Review PR #204', project: 'NEXUS_UI', priority: 'low' as const },
  { id: 'todo-4', name: 'SSL Cert Renewal', project: 'OPS_INFRA', priority: 'low' as const },
];

export const mockRecentProjects = [
  { id: 'orion', name: 'Project Orion', lastEdit: '2M_AGO', icon: 'rocket_launch' },
  { id: 'titan', name: 'Project Nexus', lastEdit: '5H_AGO', icon: 'hub' },
];
