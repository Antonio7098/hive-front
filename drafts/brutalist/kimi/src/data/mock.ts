import type { Project, Workflow, Task } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Neural Network Optimization',
    description: 'Optimizing deep learning models for edge deployment with custom quantization and pruning techniques.',
    status: 'active',
    taskCount: 12,
    workflowCount: 4,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20'),
    recentActivity: new Date('2024-03-20'),
    owner: 'Dr. Sarah Chen',
    tags: ['ml', 'optimization', 'edge']
  },
  {
    id: 'proj-2',
    name: 'Distributed Consensus Protocol',
    description: 'Building a Byzantine-fault-tolerant consensus mechanism for decentralized systems.',
    status: 'active',
    taskCount: 8,
    workflowCount: 3,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-18'),
    recentActivity: new Date('2024-03-19'),
    owner: 'Marcus Rodriguez',
    tags: ['distributed', 'consensus', 'security']
  },
  {
    id: 'proj-3',
    name: 'Real-time Data Pipeline',
    description: 'Streaming analytics pipeline processing 10M events per second with sub-100ms latency.',
    status: 'draft',
    taskCount: 15,
    workflowCount: 5,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-15'),
    recentActivity: new Date('2024-03-15'),
    owner: 'Alex Kim',
    tags: ['streaming', 'analytics', 'performance']
  },
  {
    id: 'proj-4',
    name: 'Quantum Key Distribution',
    description: 'Implementing BB84 protocol for quantum-safe cryptography in network communications.',
    status: 'archived',
    taskCount: 6,
    workflowCount: 2,
    createdAt: new Date('2023-11-10'),
    updatedAt: new Date('2024-02-28'),
    recentActivity: new Date('2024-02-28'),
    owner: 'Dr. Yuki Tanaka',
    tags: ['quantum', 'cryptography', 'network']
  },
  {
    id: 'proj-5',
    name: 'Zero-Knowledge Proof Engine',
    description: 'SNARK-based proof generation system for private transaction validation.',
    status: 'active',
    taskCount: 20,
    workflowCount: 6,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-21'),
    recentActivity: new Date('2024-03-21'),
    owner: 'Elena Volkov',
    tags: ['zkp', 'privacy', 'crypto']
  },
  {
    id: 'proj-6',
    name: 'CRDT Document Sync',
    description: 'Conflict-free replicated data types for collaborative document editing at scale.',
    status: 'draft',
    taskCount: 10,
    workflowCount: 3,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-10'),
    recentActivity: new Date('2024-03-12'),
    owner: 'James O\'Brien',
    tags: ['crdt', 'collaboration', 'sync']
  }
];

export const mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    projectId: 'proj-1',
    name: 'Model Training Pipeline',
    description: 'End-to-end training workflow with hyperparameter tuning and checkpointing.',
    status: 'active',
    taskCount: 5,
    lastRun: new Date('2024-03-20'),
    trigger: 'Scheduled (daily at 02:00 UTC)'
  },
  {
    id: 'wf-2',
    projectId: 'proj-1',
    name: 'Evaluation Suite',
    description: 'Comprehensive model evaluation across multiple datasets and metrics.',
    status: 'todo',
    taskCount: 3,
    lastRun: new Date('2024-03-18'),
    trigger: 'Manual'
  },
  {
    id: 'wf-3',
    projectId: 'proj-1',
    name: 'Deployment Pipeline',
    description: 'Automated deployment to staging and production environments.',
    status: 'completed',
    taskCount: 4,
    lastRun: new Date('2024-03-15'),
    trigger: 'On merge to main'
  },
  {
    id: 'wf-4',
    projectId: 'proj-2',
    name: 'Consensus Simulation',
    description: 'Monte Carlo simulation of consensus under various fault conditions.',
    status: 'active',
    taskCount: 4,
    lastRun: new Date('2024-03-19'),
    trigger: 'On commit'
  },
  {
    id: 'wf-5',
    projectId: 'proj-2',
    name: 'Security Audit',
    description: 'Automated security analysis and vulnerability scanning.',
    status: 'todo',
    taskCount: 2,
    lastRun: new Date('2024-03-10'),
    trigger: 'Weekly'
  },
  {
    id: 'wf-6',
    projectId: 'proj-5',
    name: 'Proof Generation',
    description: 'Parallel proof generation for batch transactions.',
    status: 'active',
    taskCount: 8,
    lastRun: new Date('2024-03-21'),
    trigger: 'Event-driven'
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    workflowId: 'wf-1',
    projectId: 'proj-1',
    name: 'Implement gradient checkpointing',
    description: 'Add memory-efficient gradient checkpointing for large model training.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Dr. Sarah Chen',
    dueDate: new Date('2024-03-25'),
    subtasks: [
      { id: 'st-1', name: 'Research optimal checkpointing strategy', completed: true },
      { id: 'st-2', name: 'Implement forward pass checkpointing', completed: true },
      { id: 'st-3', name: 'Add backward pass recomputation', completed: false },
      { id: 'st-4', name: 'Benchmark memory vs speed tradeoff', completed: false }
    ]
  },
  {
    id: 'task-2',
    workflowId: 'wf-1',
    projectId: 'proj-1',
    name: 'Configure distributed training',
    description: 'Set up multi-node training across 4 GPUs with proper synchronization.',
    status: 'todo',
    priority: 'high',
    assignee: 'Marcus Rodriguez',
    dueDate: new Date('2024-03-28'),
    subtasks: [
      { id: 'st-5', name: 'Configure NCCL backend', completed: false },
      { id: 'st-6', name: 'Implement gradient synchronization', completed: false },
      { id: 'st-7', name: 'Add checkpoint sharding', completed: false }
    ]
  },
  {
    id: 'task-3',
    workflowId: 'wf-4',
    projectId: 'proj-2',
    name: 'Implement PBFT consensus',
    description: 'Practical Byzantine Fault Tolerance consensus algorithm implementation.',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Alex Kim',
    dueDate: new Date('2024-03-30'),
    subtasks: [
      { id: 'st-8', name: 'Define message types', completed: true },
      { id: 'st-9', name: 'Implement pre-prepare phase', completed: true },
      { id: 'st-10', name: 'Implement prepare phase', completed: false },
      { id: 'st-11', name: 'Implement commit phase', completed: false }
    ]
  },
  {
    id: 'task-4',
    workflowId: 'wf-6',
    projectId: 'proj-5',
    name: 'Optimize FFT for prime fields',
    description: 'Implement Number Theoretic Transform for efficient polynomial multiplication.',
    status: 'backlog',
    priority: 'high',
    assignee: 'Elena Volkov',
    dueDate: new Date('2024-04-05'),
    subtasks: [
      { id: 'st-12', name: 'Select optimal prime modulus', completed: true },
      { id: 'st-13', name: 'Implement iterative NTT', completed: false },
      { id: 'st-14', name: 'Add SIMD optimizations', completed: false }
    ]
  },
  {
    id: 'task-5',
    workflowId: 'wf-6',
    projectId: 'proj-5',
    name: 'Parallel prover architecture',
    description: 'Design multi-threaded proof generation with work stealing.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'James O\'Brien',
    dueDate: new Date('2024-03-24'),
    subtasks: [
      { id: 'st-15', name: 'Design thread pool architecture', completed: true },
      { id: 'st-16', name: 'Implement task queue', completed: true },
      { id: 'st-17', name: 'Add work stealing scheduler', completed: false }
    ]
  },
  {
    id: 'task-6',
    workflowId: 'wf-6',
    projectId: 'proj-5',
    name: 'Recursive proof composition',
    description: 'Enable proof aggregation through recursive SNARK composition.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Dr. Yuki Tanaka',
    dueDate: new Date('2024-04-10'),
    subtasks: [
      { id: 'st-18', name: 'Design proof verification circuit', completed: false },
      { id: 'st-19', name: 'Implement aggregation logic', completed: false }
    ]
  }
];

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find(p => p.id === id);
}

export function getWorkflowsByProjectId(projectId: string): Workflow[] {
  return mockWorkflows.filter(w => w.projectId === projectId);
}

export function getWorkflowById(id: string): Workflow | undefined {
  return mockWorkflows.find(w => w.id === id);
}

export function getTasksByWorkflowId(workflowId: string): Task[] {
  return mockTasks.filter(t => t.workflowId === workflowId);
}

export function getTasksByProjectId(projectId: string): Task[] {
  return mockTasks.filter(t => t.projectId === projectId);
}

export function getTaskById(id: string): Task | undefined {
  return mockTasks.find(t => t.id === id);
}

export function getActiveTasks(): Task[] {
  return mockTasks.filter(t => t.status === 'in_progress');
}

export function getTodoTasks(): Task[] {
  return mockTasks.filter(t => t.status === 'todo' || t.status === 'backlog');
}

export function getRecentProjects(limit: number = 3): Project[] {
  return [...mockProjects]
    .sort((a, b) => b.recentActivity.getTime() - a.recentActivity.getTime())
    .slice(0, limit);
}
