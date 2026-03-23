import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { ActiveItem, TodoItem, RecentProject } from '../services/IDataSource';

export function useActiveItems() {
  const { getActiveItems } = useData();
  const [items, setItems] = useState<ActiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
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
  }, [getActiveItems]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, isLoading, error, refresh };
}

export function useTodoItems() {
  const { getTodoItems } = useData();
  const [items, setItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
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
  }, [getTodoItems]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, isLoading, error, refresh };
}

export function useRecentProjects() {
  const { getRecentProjects } = useData();
  const [projects, setProjects] = useState<RecentProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
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
  }, [getRecentProjects]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { projects, isLoading, error, refresh };
}
