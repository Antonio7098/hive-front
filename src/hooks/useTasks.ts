import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { Task } from '../types/entities';

export function useTasks() {
  const { getTasks, isLoading: contextLoading } = useData();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading || !getTasks) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load tasks'));
    } finally {
      setIsLoading(false);
    }
  }, [getTasks, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { tasks, isLoading: isLoading || contextLoading, error, refresh };
}

export function useTask(id: string | undefined) {
  const { getTask, isLoading: contextLoading } = useData();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id || contextLoading || !getTask) {
      setIsLoading(false);
      setTask(null);
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
          setError(err instanceof Error ? err : new Error('Failed to load task'));
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

  return { task, isLoading: isLoading || contextLoading, error };
}

export function useTasksByWorkflow(workflowId: string | undefined) {
  const { getTasksByWorkflow, isLoading: contextLoading } = useData();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!workflowId || contextLoading || !getTasksByWorkflow) {
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
          setError(err instanceof Error ? err : new Error('Failed to load tasks'));
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

  return { tasks, isLoading: isLoading || contextLoading, error };
}
