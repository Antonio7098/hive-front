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
  tags: string[];
  owner: string;
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
  avgDuration?: string;
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
  timeEstimate?: string;
}

export interface Subtask {
  id: string;
  name: string;
  completed: boolean;
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Orbital Logistics',
    description: 'Space mission payload coordination system for interstellar cargo transport',
    status: 'active',
    taskCount: 24,
    workflowCount: 5,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-03-20'),
    recentActivity: new Date('2026-03-22'),
    tags: ['space', 'logistics', 'critical'],
    owner: 'Marcus Chen'
  },
  {
    id: 'proj-2',
    name: 'Neon District',
    description: 'Urban infrastructure monitoring grid for metropolitan power networks',
    status: 'active',
    taskCount: 18,
    workflowCount: 3,
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-03-18'),
    recentActivity: new Date('2026-03-21'),
    tags: ['infrastructure', 'monitoring'],
    owner: 'Sarah Kim'
  },
  {
    id: 'proj-3',
    name: 'Cipher Protocol',
    description: 'Next-gen encryption framework for secure communications',
    status: 'active',
    taskCount: 31,
    workflowCount: 7,
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-03-19'),
    recentActivity: new Date('2026-03-20'),
    tags: ['security', 'encryption'],
    owner: 'Alex Rivera'
  },
  {
    id: 'proj-4',
    name: 'Pulse Engine',
    description: 'Real-time analytics engine for financial market data',
    status: 'active',
    taskCount: 12,
    workflowCount: 2,
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-03-15'),
    recentActivity: new Date('2026-03-19'),
    tags: ['analytics', 'finance'],
    owner: 'Jordan Lee'
  },
  {
    id: 'proj-5',
    name: 'Vertex AI',
    description: 'Machine learning pipeline for predictive maintenance',
    status: 'draft',
    taskCount: 8,
    workflowCount: 1,
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-10'),
    recentActivity: new Date('2026-03-18'),
    tags: ['ml', 'predictive'],
    owner: 'Emily Watson'
  },
  {
    id: 'proj-6',
    name: 'Helix Biotech',
    description: 'Genomic sequencing analysis platform',
    status: 'archived',
    taskCount: 45,
    workflowCount: 8,
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2026-02-28'),
    recentActivity: new Date('2026-02-28'),
    tags: ['biotech', 'genomics'],
    owner: 'Dr. Nina Patel'
  }
];

export const workflows: Workflow[] = [
  {
    id: 'wf-1',
    projectId: 'proj-1',
    name: 'Launch Sequence',
    description: 'Automated pre-launch checklist and countdown procedures',
    status: 'active',
    taskCount: 8,
    lastRun: new Date('2026-03-22'),
    trigger: 'Scheduled (T-24h)',
    avgDuration: '2h 15m'
  },
  {
    id: 'wf-2',
    projectId: 'proj-1',
    name: 'Cargo Manifest',
    description: 'Generate and verify payload manifest for each mission',
    status: 'completed',
    taskCount: 12,
    lastRun: new Date('2026-03-21'),
    trigger: 'On cargo upload',
    avgDuration: '45m'
  },
  {
    id: 'wf-3',
    projectId: 'proj-2',
    name: 'Grid Monitor',
    description: 'Continuous monitoring of power grid status across sectors',
    status: 'active',
    taskCount: 5,
    lastRun: new Date('2026-03-22'),
    trigger: 'Real-time',
    avgDuration: 'Continuous'
  },
  {
    id: 'wf-4',
    projectId: 'proj-2',
    name: 'Alert Cascade',
    description: 'Notify relevant teams when anomalies are detected',
    status: 'todo',
    taskCount: 6,
    lastRun: new Date('2026-03-15'),
    trigger: 'On anomaly detection',
    avgDuration: '5m'
  },
  {
    id: 'wf-5',
    projectId: 'proj-3',
    name: 'Key Rotation',
    description: 'Periodic encryption key rotation and distribution',
    status: 'active',
    taskCount: 4,
    lastRun: new Date('2026-03-20'),
    trigger: 'Weekly',
    avgDuration: '30m'
  },
  {
    id: 'wf-6',
    projectId: 'proj-3',
    name: 'Audit Trail',
    description: 'Generate compliance audit logs for all communications',
    status: 'active',
    taskCount: 9,
    lastRun: new Date('2026-03-22'),
    trigger: 'Daily',
    avgDuration: '1h 20m'
  },
  {
    id: 'wf-7',
    projectId: 'proj-4',
    name: 'Market Feed',
    description: 'Ingest and normalize real-time market data streams',
    status: 'active',
    taskCount: 7,
    lastRun: new Date('2026-03-22'),
    trigger: 'Real-time',
    avgDuration: 'Continuous'
  }
];

export const tasks: Task[] = [
  {
    id: 'task-1',
    workflowId: 'wf-1',
    projectId: 'proj-1',
    name: 'Verify fuel cell levels',
    description: 'Check and confirm fuel cell containment at 98% capacity',
    status: 'done',
    priority: 'high',
    assignee: 'Marcus Chen',
    dueDate: new Date('2026-03-22'),
    subtasks: [
      { id: 'st-1', name: 'Check primary sensors', completed: true },
      { id: 'st-2', name: 'Verify backup sensors', completed: true },
      { id: 'st-3', name: 'Log readings', completed: true }
    ],
    timeEstimate: '30m'
  },
  {
    id: 'task-2',
    workflowId: 'wf-1',
    projectId: 'proj-1',
    name: 'Pressurize cabin',
    description: 'Equalize cabin pressure to 14.7 PSI',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Marcus Chen',
    dueDate: new Date('2026-03-22'),
    subtasks: [
      { id: 'st-4', name: 'Open valve A', completed: true },
      { id: 'st-5', name: 'Monitor pressure', completed: false },
      { id: 'st-6', name: 'Seal at target PSI', completed: false }
    ],
    timeEstimate: '45m'
  },
  {
    id: 'task-3',
    workflowId: 'wf-1',
    projectId: 'proj-1',
    name: 'Run diagnostics',
    description: 'Execute full systems diagnostic before launch',
    status: 'backlog',
    priority: 'medium',
    assignee: 'Sarah Kim',
    dueDate: new Date('2026-03-23'),
    subtasks: [
      { id: 'st-7', name: 'Engine systems', completed: false },
      { id: 'st-8', name: 'Life support', completed: false },
      { id: 'st-9', name: 'Navigation', completed: false }
    ],
    timeEstimate: '2h'
  },
  {
    id: 'task-4',
    workflowId: 'wf-3',
    projectId: 'proj-2',
    name: 'Sector 7 monitoring',
    description: 'Monitor power consumption in district sector 7',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Jordan Lee',
    subtasks: [],
    timeEstimate: '4h'
  },
  {
    id: 'task-5',
    workflowId: 'wf-5',
    projectId: 'proj-3',
    name: 'Generate new key pair',
    description: 'Create RSA-4096 key pair for rotation cycle',
    status: 'done',
    priority: 'high',
    assignee: 'Alex Rivera',
    dueDate: new Date('2026-03-20'),
    subtasks: [
      { id: 'st-10', name: 'Generate public key', completed: true },
      { id: 'st-11', name: 'Generate private key', completed: true },
      { id: 'st-12', name: 'Secure key storage', completed: true }
    ],
    timeEstimate: '15m'
  },
  {
    id: 'task-6',
    workflowId: 'wf-6',
    projectId: 'proj-3',
    name: 'Process audit logs',
    description: 'Aggregate and index communication logs for compliance',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Alex Rivera',
    dueDate: new Date('2026-03-22'),
    subtasks: [
      { id: 'st-13', name: 'Collect logs', completed: true },
      { id: 'st-14', name: 'Parse entries', completed: true },
      { id: 'st-15', name: 'Index for search', completed: false }
    ],
    timeEstimate: '1h'
  },
  {
    id: 'task-7',
    workflowId: 'wf-7',
    projectId: 'proj-4',
    name: 'Configure data source',
    description: 'Set up connection to NYSE feed endpoint',
    status: 'backlog',
    priority: 'high',
    assignee: 'Jordan Lee',
    dueDate: new Date('2026-03-24'),
    subtasks: [
      { id: 'st-16', name: 'Get API credentials', completed: false },
      { id: 'st-17', name: 'Configure endpoint', completed: false },
      { id: 'st-18', name: 'Test connection', completed: false }
    ],
    timeEstimate: '1h'
  },
  {
    id: 'task-8',
    workflowId: 'wf-2',
    projectId: 'proj-1',
    name: 'Verify cargo weight',
    description: 'Confirm payload weight within tolerance limits',
    status: 'done',
    priority: 'high',
    assignee: 'Emily Watson',
    dueDate: new Date('2026-03-21'),
    subtasks: [
      { id: 'st-19', name: ' Weigh containers', completed: true },
      { id: 'st-20', name: 'Compare to manifest', completed: true }
    ],
    timeEstimate: '20m'
  }
];

export const getProjectById = (id: string): Project | undefined => 
  projects.find(p => p.id === id);

export const getWorkflowsByProjectId = (projectId: string): Workflow[] => 
  workflows.filter(w => w.projectId === projectId);

export const getTasksByWorkflowId = (workflowId: string): Task[] => 
  tasks.filter(t => t.workflowId === workflowId);

export const getTasksByProjectId = (projectId: string): Task[] => 
  tasks.filter(t => t.projectId === projectId);

export const getActiveWorkflows = (): Workflow[] => 
  workflows.filter(w => w.status === 'active');

export const getActiveTasks = (): Task[] => 
  tasks.filter(t => t.status === 'in_progress');

export const getTodoTasks = (): Task[] => 
  tasks.filter(t => t.status === 'backlog');

export const getRecentProjects = (count: number = 3): Project[] => 
  [...projects]
    .sort((a, b) => b.recentActivity.getTime() - a.recentActivity.getTime())
    .slice(0, count);
