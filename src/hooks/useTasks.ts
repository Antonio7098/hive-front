import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { Task } from '../types/entities';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

export function useTasks() {
  const { getTasks, isLoading: contextLoading, isConnected } = useData();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(`Failed to load tasks: ${errorMessage}`));
      structuredLogger.error(
        'Failed to load tasks',
        {
          code: taxonomy.code,
          category: ErrorCategory.API,
          severity: ErrorSeverity.MEDIUM,
          message: errorMessage,
        }
      );
    } finally {
      setIsLoading(false);
    }
  }, [getTasks, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { 
    tasks, 
    isLoading: isLoading || contextLoading, 
    error, 
    refresh,
    isDemoMode: !isConnected 
  };
}

export function useTask(id: string | undefined) {
  const { getTask, isLoading: contextLoading, isConnected } = useData();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id || contextLoading) {
      if (!id) {
        setTask(null);
        setIsLoading(false);
      }
      return;
    }

    let cancelled = false;

    async function load(taskId: string) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTask(taskId);
        if (!cancelled) {
          setTask(data);
        }
      } catch (err) {
        if (!cancelled) {
          const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(new Error(`Failed to load task "${taskId}": ${errorMessage}`));
          structuredLogger.error(
            `Failed to load task: ${taskId}`,
            {
              code: taxonomy.code,
              category: ErrorCategory.API,
              severity: ErrorSeverity.MEDIUM,
              message: errorMessage,
            },
            { taskId }
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load(id);

    return () => {
      cancelled = true;
    };
  }, [id, getTask, contextLoading]);

  return { 
    task, 
    isLoading: isLoading || contextLoading, 
    error,
    isDemoMode: !isConnected 
  };
}

export function useTasksByWorkflow(workflowId: string | undefined) {
  const { getTasksByWorkflow, isLoading: contextLoading, isConnected } = useData();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!workflowId || contextLoading) {
      setTasks([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function load(wid: string) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTasksByWorkflow(wid);
        if (!cancelled) {
          setTasks(data);
        }
      } catch (err) {
        if (!cancelled) {
          const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(new Error(`Failed to load tasks for workflow: ${errorMessage}`));
          structuredLogger.error(
            `Failed to load tasks for workflow: ${wid}`,
            {
              code: taxonomy.code,
              category: ErrorCategory.API,
              severity: ErrorSeverity.MEDIUM,
              message: errorMessage,
            },
            { workflowId: wid }
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load(workflowId);

    return () => {
      cancelled = true;
    };
  }, [workflowId, getTasksByWorkflow, contextLoading]);

  return { 
    tasks, 
    isLoading: isLoading || contextLoading, 
    error,
    isDemoMode: !isConnected 
  };
}
