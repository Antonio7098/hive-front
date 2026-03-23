import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { Workflow } from '../types/entities';

export function useWorkflows() {
  const { getWorkflows } = useData();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
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
  }, [getWorkflows]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { workflows, isLoading, error, refresh };
}

export function useWorkflow(id: string | undefined) {
  const { getWorkflow } = useData();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
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
  }, [id, getWorkflow]);

  return { workflow, isLoading, error };
}

export function useWorkflowsByProject(projectId: string | undefined) {
  const { getWorkflowsByProject } = useData();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
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
  }, [projectId, getWorkflowsByProject]);

  return { workflows, isLoading, error };
}
