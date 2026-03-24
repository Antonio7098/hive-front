import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type { IDataSource, ActiveItem, TodoItem, RecentProject } from '../services/IDataSource';
import { ApiDataSource } from '../services/apiDataSource';
import { MockDataSource } from '../services/mockDataSource';
import type { Project, Workflow, Task, MergeState, Event, WorkflowRun, Constitution, GovernanceDocument, Notepad } from '../types/entities';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

const API_HEALTH_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8787';

class DataSourceNotInitializedError extends Error {
  constructor(
    public code: string,
    message: string,
    public category: ErrorCategory,
    public severity: ErrorSeverity
  ) {
    super(message);
    this.name = 'DataSourceNotInitializedError';
  }
}

interface DataContextValue {
  dataSource: IDataSource;
  isConnected: boolean;
  isLoading: boolean;
  error: Error | null;
  connectionWarning: string | null;
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  getWorkflows(): Promise<Workflow[]>;
  getWorkflow(id: string): Promise<Workflow | null>;
  getWorkflowsByProject(projectId: string): Promise<Workflow[]>;
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | null>;
  getTasksByWorkflow(workflowId: string): Promise<Task[]>;
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

const DataContext = createContext<DataContextValue | null>(null);

async function checkApiConnection(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(`${API_HEALTH_URL}/health`, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [dataSource, setDataSource] = useState<IDataSource | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [connectionWarning, setConnectionWarning] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const connected = await checkApiConnection();
        
        if (mounted) {
          if (connected) {
            setDataSource(new ApiDataSource());
            setIsConnected(true);
            structuredLogger.info('Connected to API', { url: API_HEALTH_URL });
          } else {
            const mockSource = new MockDataSource();
            setDataSource(mockSource);
            setIsConnected(false);
            setConnectionWarning('API unavailable. Using demo mode.');
            structuredLogger.warn('API unreachable, using mock data', {
              url: API_HEALTH_URL,
              errorCode: ErrorTaxonomy.NETWORK_CONNECTION_FAILED.code,
            });
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to initialize';
          const appError = ErrorTaxonomy.CLIENT_INIT_FAILED;
          setError(new Error(errorMessage));
          setDataSource(new MockDataSource());
          setIsConnected(false);
          setConnectionWarning('Failed to connect to API. Using demo mode.');
          structuredLogger.error(
            'DataContext initialization failed',
            {
              code: appError.code,
              category: appError.category,
              severity: appError.severity,
              message: errorMessage,
            },
            { url: API_HEALTH_URL }
          );
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const notInitializedError = useMemo(() => 
    new DataSourceNotInitializedError(
      ErrorTaxonomy.CLIENT_INVALID_STATE.code,
      'DataSource not initialized',
      ErrorCategory.CLIENT,
      ErrorSeverity.CRITICAL
    ), []);

  const value = useMemo<DataContextValue>(() => {
    if (!dataSource) {
      return {
        dataSource: null as unknown as IDataSource,
        isConnected: false,
        isLoading: true,
        error: null,
        connectionWarning: 'Initializing...',
        getProjects: async () => { throw notInitializedError; },
        getProject: async () => { throw notInitializedError; },
        getWorkflows: async () => { throw notInitializedError; },
        getWorkflow: async () => { throw notInitializedError; },
        getWorkflowsByProject: async () => { throw notInitializedError; },
        getTasks: async () => { throw notInitializedError; },
        getTask: async () => { throw notInitializedError; },
        getTasksByWorkflow: async () => { throw notInitializedError; },
        getMergeStates: async () => { throw notInitializedError; },
        getMergeState: async () => { throw notInitializedError; },
        getEvents: async () => { throw notInitializedError; },
        getEventsByCorrelation: async () => { throw notInitializedError; },
        getEventsFiltered: async () => { throw notInitializedError; },
        getWorkflowRuns: async () => { throw notInitializedError; },
        getWorkflowRun: async () => { throw notInitializedError; },
        getWorkflowRunsByWorkflow: async () => { throw notInitializedError; },
        getActiveItems: async () => { throw notInitializedError; },
        getTodoItems: async () => { throw notInitializedError; },
        getRecentProjects: async () => { throw notInitializedError; },
        getConstitution: async () => { throw notInitializedError; },
        getGovernanceDocuments: async () => { throw notInitializedError; },
        inspectGovernanceDocument: async () => { throw notInitializedError; },
        getProjectNotepad: async () => { throw notInitializedError; },
        getGlobalNotepad: async () => { throw notInitializedError; },
      };
    }

    return {
      dataSource,
      isConnected,
      isLoading,
      error,
      connectionWarning,
      getProjects: () => dataSource.getProjects(),
      getProject: (id) => dataSource.getProject(id),
      getWorkflows: () => dataSource.getWorkflows(),
      getWorkflow: (id) => dataSource.getWorkflow(id),
      getWorkflowsByProject: (projectId) => dataSource.getWorkflowsByProject(projectId),
      getTasks: () => dataSource.getTasks(),
      getTask: (id) => dataSource.getTask(id),
      getTasksByWorkflow: (workflowId) => dataSource.getTasksByWorkflow(workflowId),
      getMergeStates: () => dataSource.getMergeStates(),
      getMergeState: (flowId) => dataSource.getMergeState(flowId),
      getEvents: (limit?) => dataSource.getEvents(limit),
      getEventsByCorrelation: (filters) => dataSource.getEventsByCorrelation(filters),
      getEventsFiltered: (filters) => dataSource.getEventsFiltered(filters),
      getWorkflowRuns: () => dataSource.getWorkflowRuns(),
      getWorkflowRun: (id) => dataSource.getWorkflowRun(id),
      getWorkflowRunsByWorkflow: (workflowId) => dataSource.getWorkflowRunsByWorkflow(workflowId),
      getActiveItems: () => dataSource.getActiveItems(),
      getTodoItems: () => dataSource.getTodoItems(),
      getRecentProjects: () => dataSource.getRecentProjects(),
      getConstitution: (projectId) => dataSource.getConstitution(projectId),
      getGovernanceDocuments: (projectId) => dataSource.getGovernanceDocuments(projectId),
      inspectGovernanceDocument: (projectId, documentId) => dataSource.inspectGovernanceDocument(projectId, documentId),
      getProjectNotepad: (projectId) => dataSource.getProjectNotepad(projectId),
      getGlobalNotepad: () => dataSource.getGlobalNotepad(),
    };
  }, [dataSource, isConnected, isLoading, error, connectionWarning, notInitializedError]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used within DataProvider');
  }
  return ctx;
}
