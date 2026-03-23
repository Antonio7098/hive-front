import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { Workflow } from '../types/entities';

export function useWorkflows() {
  const { getWorkflows, isLoading: contextLoading } = useData();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading || !getWorkflows) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWorkflows();
      setWorkflows(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load workflows'));
    } finally {
      setIsLoading(false);
    }
  }, [getWorkflows, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { workflows, isLoading: isLoading || contextLoading, error, refresh };
}

export function useWorkflow(id: string | undefined) {
  const { getWorkflow, isLoading: contextLoading } = useData();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id || contextLoading || !getWorkflow) {
      setIsLoading(false);
      setWorkflow(null);
      return;
    }

    let cancelled = false;

    async function load(workflowId: string) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getWorkflow(workflowId);
        if (!cancelled) {
          setWorkflow(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load workflow'));
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
  }, [id, getWorkflow, contextLoading]);

  return { workflow, isLoading: isLoading || contextLoading, error };
}

export function useWorkflowsByProject(projectId: string | undefined) {
  const { getWorkflowsByProject, isLoading: contextLoading } = useData();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId || contextLoading || !getWorkflowsByProject) {
      setWorkflows([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function load(pid: string) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getWorkflowsByProject(pid);
        if (!cancelled) {
          setWorkflows(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load workflows'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load(projectId);

    return () => {
      cancelled = true;
    };
  }, [projectId, getWorkflowsByProject, contextLoading]);

  return { workflows, isLoading: isLoading || contextLoading, error };
}
