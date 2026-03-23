import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { Task } from '../types/entities';

export function useTasks() {
  const { getTasks } = useData();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
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
  }, [getTasks]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { tasks, isLoading, error, refresh };
}

export function useTask(id: string | undefined) {
  const { getTask } = useData();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
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
  }, [id, getTask]);

  return { task, isLoading, error };
}

export function useTasksByWorkflow(workflowId: string | undefined) {
  const { getTasksByWorkflow } = useData();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!workflowId) {
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
  }, [workflowId, getTasksByWorkflow]);

  return { tasks, isLoading, error };
}
