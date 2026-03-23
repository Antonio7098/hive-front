import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { ActiveItem, TodoItem, RecentProject } from '../services/IDataSource';

export function useActiveItems() {
  const { getActiveItems, isLoading: contextLoading } = useData();
  const [items, setItems] = useState<ActiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading || !getActiveItems) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getActiveItems();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load active items'));
    } finally {
      setIsLoading(false);
    }
  }, [getActiveItems, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, isLoading: isLoading || contextLoading, error, refresh };
}

export function useTodoItems() {
  const { getTodoItems, isLoading: contextLoading } = useData();
  const [items, setItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading || !getTodoItems) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTodoItems();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load todo items'));
    } finally {
      setIsLoading(false);
    }
  }, [getTodoItems, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, isLoading: isLoading || contextLoading, error, refresh };
}

export function useRecentProjects() {
  const { getRecentProjects, isLoading: contextLoading } = useData();
  const [projects, setProjects] = useState<RecentProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading || !getRecentProjects) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRecentProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load recent projects'));
    } finally {
      setIsLoading(false);
    }
  }, [getRecentProjects, contextLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { projects, isLoading: isLoading || contextLoading, error, refresh };
}
