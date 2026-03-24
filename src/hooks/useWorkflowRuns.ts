import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { WorkflowRun } from '../types/entities';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

export function useWorkflowRuns(workflowId: string | undefined) {
  const { getWorkflowRunsByWorkflow, isLoading: contextLoading, isConnected } = useData();
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading || !workflowId) {
      if (!workflowId) setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const runs = await getWorkflowRunsByWorkflow(workflowId);
      setRuns(runs);
    } catch (err) {
      const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(`Failed to load workflow runs: ${errorMessage}`));
      structuredLogger.error(
        'Failed to load workflow runs',
        {
          code: taxonomy.code,
          category: ErrorCategory.API,
          severity: ErrorSeverity.MEDIUM,
          message: errorMessage,
        },
        { workflowId }
      );
    } finally {
      setIsLoading(false);
    }
  }, [getWorkflowRunsByWorkflow, workflowId, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    runs,
    isLoading: isLoading || contextLoading,
    error,
    refresh,
    isDemoMode: !isConnected,
  };
}
