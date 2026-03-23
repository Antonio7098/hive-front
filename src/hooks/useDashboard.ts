import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { ActiveItem, TodoItem, RecentProject } from '../services/IDataSource';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';

export function useActiveItems() {
  const { getActiveItems, isLoading: contextLoading, isConnected } = useData();
  const [items, setItems] = useState<ActiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getActiveItems();
      setItems(data);
    } catch (err) {
      const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(`Failed to load active items: ${errorMessage}`));
      structuredLogger.error(
        'Failed to load active items',
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
  }, [getActiveItems, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { 
    items, 
    isLoading: isLoading || contextLoading, 
    error, 
    refresh,
    isDemoMode: !isConnected 
  };
}

export function useTodoItems() {
  const { getTodoItems, isLoading: contextLoading, isConnected } = useData();
  const [items, setItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTodoItems();
      setItems(data);
    } catch (err) {
      const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(`Failed to load todo items: ${errorMessage}`));
      structuredLogger.error(
        'Failed to load todo items',
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
  }, [getTodoItems, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { 
    items, 
    isLoading: isLoading || contextLoading, 
    error, 
    refresh,
    isDemoMode: !isConnected 
  };
}

export function useRecentProjects() {
  const { getRecentProjects, isLoading: contextLoading, isConnected } = useData();
  const [projects, setProjects] = useState<RecentProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRecentProjects();
      setProjects(data);
    } catch (err) {
      const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(`Failed to load recent projects: ${errorMessage}`));
      structuredLogger.error(
        'Failed to load recent projects',
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
  }, [getRecentProjects, contextLoading]);

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
