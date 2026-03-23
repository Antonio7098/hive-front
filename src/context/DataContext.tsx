import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { IDataSource, ActiveItem, TodoItem, RecentProject } from '../services/IDataSource';
import { ApiDataSource } from '../services/apiDataSource';
import { MockDataSource } from '../services/mockDataSource';
import type { Project, Workflow, Task } from '../types/entities';

const API_HEALTH_URL = 'http://127.0.0.1:8787/health';

interface DataContextValue {
  dataSource: IDataSource;
  isConnected: boolean;
  isLoading: boolean;
  error: Error | null;
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
    const response = await fetch(API_HEALTH_URL, {
      method: 'GET',
      signal: AbortSignal.timeout(2000),
    });
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

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const connected = await checkApiConnection();
        if (mounted) {
          if (connected) {
            setDataSource(new ApiDataSource());
            setIsConnected(true);
          } else {
            setDataSource(new MockDataSource());
            setIsConnected(false);
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setDataSource(new MockDataSource());
          setIsConnected(false);
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const value: DataContextValue = {
    get dataSource() {
      if (!dataSource) throw new Error('DataSource not initialized');
      return dataSource;
    },
    get isConnected() {
      return isConnected;
    },
    get isLoading() {
      return isLoading;
    },
    get error() {
      return error;
    },
    getProjects: () => dataSource!.getProjects(),
    getProject: (id) => dataSource!.getProject(id),
    getWorkflows: () => dataSource!.getWorkflows(),
    getWorkflow: (id) => dataSource!.getWorkflow(id),
    getWorkflowsByProject: (projectId) => dataSource!.getWorkflowsByProject(projectId),
    getTasks: () => dataSource!.getTasks(),
    getTask: (id) => dataSource!.getTask(id),
    getTasksByWorkflow: (workflowId) => dataSource!.getTasksByWorkflow(workflowId),
    getActiveItems: () => dataSource!.getActiveItems(),
    getTodoItems: () => dataSource!.getTodoItems(),
    getRecentProjects: () => dataSource!.getRecentProjects(),
  };

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
