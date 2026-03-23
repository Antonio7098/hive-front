import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { Workflow } from '../types/entities';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

export function useWorkflows() {
  const { getWorkflows, isLoading: contextLoading, isConnected } = useData();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWorkflows();
      setWorkflows(data);
    } catch (err) {
      const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(`Failed to load workflows: ${errorMessage}`));
      structuredLogger.error(
        'Failed to load workflows',
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
  }, [getWorkflows, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { 
    workflows, 
    isLoading: isLoading || contextLoading, 
    error, 
    refresh,
    isDemoMode: !isConnected 
  };
}

export function useWorkflow(id: string | undefined) {
  const { getWorkflow, isLoading: contextLoading, isConnected } = useData();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id || contextLoading) {
      if (!id) {
        setWorkflow(null);
        setIsLoading(false);
      }
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
          const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(new Error(`Failed to load workflow "${workflowId}": ${errorMessage}`));
          structuredLogger.error(
            `Failed to load workflow: ${workflowId}`,
            {
              code: taxonomy.code,
              category: ErrorCategory.API,
              severity: ErrorSeverity.MEDIUM,
              message: errorMessage,
            },
            { workflowId }
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
  }, [id, getWorkflow, contextLoading]);

  return { 
    workflow, 
    isLoading: isLoading || contextLoading, 
    error,
    isDemoMode: !isConnected 
  };
}

export function useWorkflowsByProject(projectId: string | undefined) {
  const { getWorkflowsByProject, isLoading: contextLoading, isConnected } = useData();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId || contextLoading) {
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
          const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(new Error(`Failed to load workflows for project: ${errorMessage}`));
          structuredLogger.error(
            `Failed to load workflows for project: ${pid}`,
            {
              code: taxonomy.code,
              category: ErrorCategory.API,
              severity: ErrorSeverity.MEDIUM,
              message: errorMessage,
            },
            { projectId: pid }
          );
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

  return { 
    workflows, 
    isLoading: isLoading || contextLoading, 
    error,
    isDemoMode: !isConnected 
  };
}
