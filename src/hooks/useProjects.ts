import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { Project } from '../types/entities';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

export function useProjects() {
  const { getProjects, isLoading: contextLoading, isConnected } = useData();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(`Failed to load projects: ${errorMessage}`));
      structuredLogger.error(
        'Failed to load projects',
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
  }, [getProjects, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { 
    projects, 
    isLoading: isLoading || contextLoading, 
    error, 
    refresh,
    isDemoMode: !isConnected 
  };
}

export function useProject(id: string | undefined) {
  const { getProject, isLoading: contextLoading, isConnected } = useData();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id || contextLoading) {
      if (!id) {
        setProject(null);
        setIsLoading(false);
      }
      return;
    }

    let cancelled = false;

    async function load(projectId: string) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProject(projectId);
        if (!cancelled) {
          setProject(data);
        }
      } catch (err) {
        if (!cancelled) {
          const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(new Error(`Failed to load project "${projectId}": ${errorMessage}`));
          structuredLogger.error(
            `Failed to load project: ${projectId}`,
            {
              code: taxonomy.code,
              category: ErrorCategory.API,
              severity: ErrorSeverity.MEDIUM,
              message: errorMessage,
            },
            { projectId }
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
  }, [id, getProject, contextLoading]);

  return { 
    project, 
    isLoading: isLoading || contextLoading, 
    error,
    isDemoMode: !isConnected 
  };
}
