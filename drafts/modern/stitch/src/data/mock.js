export const projects = [
  {
    id: 'proj-1',
    name: 'Aether Flux',
    description: 'Next-generation propulsion system research and development',
    status: 'active',
    taskCount: 24,
    workflowCount: 5,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20'),
    recentActivity: new Date('2024-03-22T10:30:00'),
    owner: 'Alex Mercer',
    tags: [' propulsion', 'R&D', 'classified']
  },
  {
    id: 'proj-2',
    name: 'Quantum Lattice',
    description: 'Quantum computing architecture and error correction protocols',
    status: 'active',
    taskCount: 18,
    workflowCount: 3,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-19'),
    recentActivity: new Date('2024-03-21T15:45:00'),
    owner: 'Alex Mercer',
    tags: ['quantum', 'computing']
  },
  {
    id: 'proj-3',
    name: 'Neon Spire',
    description: 'Urban infrastructure modernization initiative',
    status: 'active',
    taskCount: 31,
    workflowCount: 7,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-18'),
    recentActivity: new Date('2024-03-20T09:15:00'),
    owner: 'Alex Mercer',
    tags: ['infrastructure', 'urban']
  },
  {
    id: 'proj-4',
    name: 'Solaris Core',
    description: 'Renewable energy grid optimization system',
    status: 'archived',
    taskCount: 42,
    workflowCount: 8,
    createdAt: new Date('2023-11-10'),
    updatedAt: new Date('2024-02-28'),
    recentActivity: new Date('2024-02-28T14:00:00'),
    owner: 'Alex Mercer',
    tags: ['energy', 'grid']
  },
  {
    id: 'proj-5',
    name: 'Nexus Protocol',
    description: 'Inter-system communication standards development',
    status: 'draft',
    taskCount: 6,
    workflowCount: 2,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-15'),
    recentActivity: new Date('2024-03-15T11:30:00'),
    owner: 'Alex Mercer',
    tags: ['protocols', 'communication']
  }
]

export const workflows = [
  {
    id: 'wf-1',
    projectId: 'proj-1',
    name: 'Neural Engine',
    description: 'Synaptic mapping and neural pathway optimization workflow',
    status: 'active',
    taskCount: 8,
    lastRun: new Date('2024-03-22T12:00:00'),
    trigger: 'scheduled',
    avgDuration: '45m'
  },
  {
    id: 'wf-2',
    projectId: 'proj-1',
    name: 'Global Relay',
    description: 'Global communication relay synchronization',
    status: 'active',
    taskCount: 5,
    lastRun: new Date('2024-03-22T14:10:00'),
    trigger: 'event',
    avgDuration: '12m'
  },
  {
    id: 'wf-3',
    projectId: 'proj-2',
    name: 'Core Security',
    description: 'Security protocol validation and heuristic analysis',
    status: 'active',
    taskCount: 6,
    lastRun: new Date('2024-03-22T13:30:00'),
    trigger: 'manual',
    avgDuration: '30m'
  },
  {
    id: 'wf-4',
    projectId: 'proj-2',
    name: 'System Integration',
    description: 'API documentation review and integration testing',
    status: 'todo',
    taskCount: 4,
    lastRun: null,
    trigger: 'manual',
    avgDuration: 'N/A'
  },
  {
    id: 'wf-5',
    projectId: 'proj-3',
    name: 'Infrastructure Deploy',
    description: 'Automated deployment pipeline for urban infrastructure',
    status: 'active',
    taskCount: 12,
    lastRun: new Date('2024-03-21T08:00:00'),
    trigger: 'scheduled',
    avgDuration: '2h'
  }
]

export const tasks = [
  {
    id: 'task-1',
    workflowId: 'wf-1',
    projectId: 'proj-1',
    name: 'Synaptic Mapping Phase 4',
    description: 'Complete neural pathway mapping for sector 7',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Alex Mercer',
    dueDate: new Date('2024-03-22'),
    progress: 84,
    subtasks: [
      { id: 'st-1', name: 'Initialize mapping sequence', completed: true },
      { id: 'st-2', name: 'Scan sector 7 neurons', completed: true },
      { id: 'st-3', name: 'Validate pathway connections', completed: true },
      { id: 'st-4', name: 'Generate report', completed: false }
    ]
  },
  {
    id: 'task-2',
    workflowId: 'wf-2',
    projectId: 'proj-1',
    name: 'Satellite Uplink Handshake',
    description: 'Establish secure uplink with orbital relay stations',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Alex Mercer',
    dueDate: new Date('2024-03-22'),
    progress: 31,
    subtasks: [
      { id: 'st-5', name: 'Authenticate station credentials', completed: true },
      { id: 'st-6', name: 'Establish encrypted channel', completed: false },
      { id: 'st-7', name: 'Verify data throughput', completed: false }
    ]
  },
  {
    id: 'task-3',
    workflowId: 'wf-3',
    projectId: 'proj-2',
    name: 'Heuristic Pattern Scrub',
    description: 'Scan and analyze security patterns across nodes',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Alex Mercer',
    dueDate: new Date('2024-03-22'),
    progress: 57,
    subtasks: [
      { id: 'st-8', name: 'Load pattern database', completed: true },
      { id: 'st-9', name: 'Scan segment B-12', completed: true },
      { id: 'st-10', name: 'Generate threat assessment', completed: false }
    ]
  },
  {
    id: 'task-4',
    workflowId: 'wf-4',
    projectId: 'proj-2',
    name: 'Review API Documentation',
    description: 'Comprehensive review of API docs for v2.0 release',
    status: 'todo',
    priority: 'medium',
    assignee: 'Alex Mercer',
    dueDate: new Date('2024-03-25'),
    progress: 0,
    subtasks: []
  },
  {
    id: 'task-5',
    workflowId: 'wf-1',
    projectId: 'proj-1',
    name: 'Optimize Shader Kernels',
    description: 'Optimize neural rendering shader performance',
    status: 'todo',
    priority: 'low',
    assignee: 'Alex Mercer',
    dueDate: new Date('2024-03-28'),
    progress: 0,
    subtasks: []
  },
  {
    id: 'task-6',
    workflowId: 'wf-3',
    projectId: 'proj-2',
    name: 'Finalize Security Protocol',
    description: 'Complete security protocol documentation',
    status: 'todo',
    priority: 'high',
    assignee: 'Alex Mercer',
    dueDate: new Date('2024-03-24'),
    progress: 0,
    subtasks: []
  }
]

export const metrics = {
  computeLoad: 62.8,
  uptime: 99.9,
  synapses: 1.2,
  activeTasks: 3,
  totalProjects: 5
}

export const activeTasks = tasks.filter(t => t.status === 'in_progress')
export const todoTasks = tasks.filter(t => t.status === 'todo')
export const recentProjects = [...projects]
  .sort((a, b) => b.recentActivity - a.recentActivity)
  .slice(0, 3)