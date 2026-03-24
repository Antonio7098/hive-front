import type { Project, Workflow, Task, MergeState, Event, WorkflowRun, Constitution, GovernanceDocument, Notepad } from '../types/entities';

export type {
  ServerProject as ProjectDto,
  ServerTask as TaskDto,
  ServerWorkflow as WorkflowDto,
  ServerWorkflowRun as WorkflowRunDto,
  ServerMergeState as MergeStateDto,
  ServerEvent as EventDto,
  ServerConstitution as ConstitutionDto,
  ServerGovernanceDocument as GovernanceDocumentDto,
  ServerNotepad as NotepadDto,
} from '../types/server';

export interface ActiveItem {
  id: string;
  name: string;
  target?: string;
  progress?: number;
}

export interface TodoItem {
  id: string;
  name: string;
  project: string;
  priority: 'low' | 'medium' | 'high';
}

export interface RecentProject {
  id: string;
  name: string;
  lastEdit: string;
  icon?: string;
}

export interface IDataSource {
  readonly isConnected: boolean;
  readonly name: string;

  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  updateProject(id: string, data: Partial<Project>): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  getWorkflows(): Promise<Workflow[]>;
  getWorkflow(id: string): Promise<Workflow | null>;
  getWorkflowsByProject(projectId: string): Promise<Workflow[]>;
  createWorkflow(data: Omit<Workflow, 'id'>): Promise<Workflow>;
  updateWorkflow(id: string, data: Partial<Workflow>): Promise<Workflow>;
  deleteWorkflow(id: string): Promise<void>;

  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | null>;
  getTasksByWorkflow(workflowId: string): Promise<Task[]>;
  createTask(data: Omit<Task, 'id'>): Promise<Task>;
  updateTask(id: string, data: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<void>;

  getMergeStates(): Promise<MergeState[]>;
  getMergeState(flowId: string): Promise<MergeState | null>;

  getEvents(limit?: number): Promise<Event[]>;
  getEventsByCorrelation(filters: { projectId?: string; flowId?: string; taskId?: string }): Promise<Event[]>;
  getEventsFiltered(filters: { workflowRunId?: string; projectId?: string; workflowId?: string; taskId?: string; limit?: number; offset?: number }): Promise<Event[]>;

  getWorkflowRuns(): Promise<WorkflowRun[]>;
  getWorkflowRun(id: string): Promise<WorkflowRun | null>;
  getWorkflowRunsByWorkflow(workflowId: string): Promise<WorkflowRun[]>;

  getActiveItems(): Promise<ActiveItem[]>;
  getTodoItems(): Promise<TodoItem[]>;
  getRecentProjects(): Promise<RecentProject[]>;

  getConstitution(projectId: string): Promise<Constitution | null>;
  getGovernanceDocuments(projectId: string): Promise<GovernanceDocument[]>;
  inspectGovernanceDocument(projectId: string, documentId: string): Promise<GovernanceDocument | null>;
  getProjectNotepad(projectId: string): Promise<Notepad | null>;
  getGlobalNotepad(): Promise<Notepad | null>;
}
