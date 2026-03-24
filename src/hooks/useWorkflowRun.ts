import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import type { WorkflowRun, Event } from '../types/entities';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

export function useWorkflowRun(runId: string | undefined) {
  const { getWorkflowRun, getEventsFiltered, isLoading: contextLoading, isConnected } = useData();
  const [run, setRun] = useState<WorkflowRun | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!runId || contextLoading) {
      if (!runId) setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function load(id: string) {
      setIsLoading(true);
      setError(null);
      try {
        const [runData, filteredEvents] = await Promise.all([
          getWorkflowRun(id),
          getEventsFiltered({ workflowRunId: id }),
        ]);
        if (!cancelled) {
          setRun(runData);
          setEvents(filteredEvents);
        }
      } catch (err) {
        if (!cancelled) {
          const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(new Error(`Failed to load workflow run: ${errorMessage}`));
          structuredLogger.error(
            'Failed to load workflow run',
            {
              code: taxonomy.code,
              category: ErrorCategory.API,
              severity: ErrorSeverity.MEDIUM,
              message: errorMessage,
            },
            { runId: id }
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load(runId);

    return () => {
      cancelled = true;
    };
  }, [runId, getWorkflowRun, getEventsFiltered, contextLoading]);

  return {
    run,
    events,
    isLoading: isLoading || contextLoading,
    error,
    isDemoMode: !isConnected,
  };
}
