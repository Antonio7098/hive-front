import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type { IDataSource, ActiveItem, TodoItem, RecentProject } from '../services/IDataSource';
import { ApiDataSource } from '../services/apiDataSource';
import { MockDataSource } from '../services/mockDataSource';
import type { Project, Workflow, Task } from '../types/entities';
import { ErrorTaxonomy } from '../types/errors';
import { structuredLogger } from '../lib/logger';

const API_HEALTH_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8787';

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
  getActiveItems(): Promise<ActiveItem[]>;
  getTodoItems(): Promise<TodoItem[]>;
  getRecentProjects(): Promise<RecentProject[]>;
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
            setConnectionWarning(`API unavailable. Using demo mode.`);
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

  const value = useMemo<DataContextValue>(() => {
    if (!dataSource) {
      return {
        dataSource: null as unknown as IDataSource,
        isConnected: false,
        isLoading: true,
        error: null,
        connectionWarning: 'Initializing...',
        getProjects: async () => { throw new Error('DataSource not initialized'); },
        getProject: async () => { throw new Error('DataSource not initialized'); },
        getWorkflows: async () => { throw new Error('DataSource not initialized'); },
        getWorkflow: async () => { throw new Error('DataSource not initialized'); },
        getWorkflowsByProject: async () => { throw new Error('DataSource not initialized'); },
        getTasks: async () => { throw new Error('DataSource not initialized'); },
        getTask: async () => { throw new Error('DataSource not initialized'); },
        getTasksByWorkflow: async () => { throw new Error('DataSource not initialized'); },
        getActiveItems: async () => { throw new Error('DataSource not initialized'); },
        getTodoItems: async () => { throw new Error('DataSource not initialized'); },
        getRecentProjects: async () => { throw new Error('DataSource not initialized'); },
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
      getActiveItems: () => dataSource.getActiveItems(),
      getTodoItems: () => dataSource.getTodoItems(),
      getRecentProjects: () => dataSource.getRecentProjects(),
    };
  }, [dataSource, isConnected, isLoading, error, connectionWarning]);

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
