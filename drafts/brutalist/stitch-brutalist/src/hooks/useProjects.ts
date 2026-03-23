import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { Project } from '../types/entities';

export function useProjects() {
  const { getProjects, dataSource } = useData();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load projects'));
    } finally {
      setIsLoading(false);
    }
  }, [getProjects]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { projects, isLoading, error, refresh, dataSource };
}

export function useProject(id: string | undefined) {
  const { getProject } = useData();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setProject(null);
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
          setError(err instanceof Error ? err : new Error('Failed to load project'));
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
  }, [id, getProject]);

  return { project, isLoading, error };
}
