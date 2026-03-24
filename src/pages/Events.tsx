import { useState, useMemo, useCallback } from 'react';
import { useData } from '../context/DataContext';
import type { Event } from '../types/entities';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';
import { PageHeader, PageFooter, SectionHeader } from '../components/common';
import { Card, Button } from '../components/ui';
import { EventTimelineItem } from '../components/features/EventTimelineItem';
import { BrutalSpinner } from '../components/ui/Loading';

const PAGE_SIZE = 50;

function usePaginatedEvents() {
  const { getEventsFiltered, isLoading: contextLoading, isConnected } = useData();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadEvents = useCallback(async (loadOffset: number, append: boolean) => {
    if (contextLoading) return;
    if (loadOffset === 0) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);
    try {
      const data = await getEventsFiltered({ limit: PAGE_SIZE, offset: loadOffset });
      if (append) {
        setEvents(prev => [...prev, ...data]);
      } else {
        setEvents(data);
      }
      setHasMore(data.length === PAGE_SIZE);
      setOffset(loadOffset + data.length);
    } catch (err) {
      const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(`Failed to load events: ${errorMessage}`));
      structuredLogger.error(
        'Failed to load events',
        { code: taxonomy.code, category: ErrorCategory.API, severity: ErrorSeverity.MEDIUM, message: errorMessage }
      );
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [getEventsFiltered, contextLoading]);

  const loadMore = useCallback(() => {
    loadEvents(offset, true);
  }, [loadEvents, offset]);

  const refresh = useCallback(() => {
    setOffset(0);
    setHasMore(true);
    loadEvents(0, false);
  }, [loadEvents]);

  useMemo(() => {
    loadEvents(0, false);
  }, []);

  return { events, isLoading: isLoading || contextLoading, isLoadingMore, error, hasMore, loadMore, refresh, isDemoMode: !isConnected };
}

const CATEGORIES = ['all', 'lifecycle', 'execution', 'merge', 'verification', 'governance'] as const;

export function Events() {
  const { events, isLoading, isLoadingMore, error, hasMore, loadMore, refresh, isDemoMode } = usePaginatedEvents();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filtered = useMemo(() => {
    return events.filter(e => {
      if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        const matchesType = e.type.toLowerCase().includes(q);
        const matchesProject = e.correlation.projectId?.toLowerCase().includes(q);
        const matchesWorkflow = e.correlation.workflowId?.toLowerCase().includes(q);
        const matchesTask = e.correlation.taskId?.toLowerCase().includes(q);
        if (!matchesType && !matchesProject && !matchesWorkflow && !matchesTask) return false;
      }
      return true;
    });
  }, [events, categoryFilter, searchFilter]);

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <BrutalSpinner size="lg" thickness="thick" />
          <span className="font-headline font-bold uppercase tracking-widest text-primary-container">LOADING</span>
        </div>
      </div>
    );
  }

  if (error && events.length === 0) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <PageHeader breadcrumb="ERROR" title="EVENTS" />
        <Card variant="outlined" padding="lg" className="bg-error-container border-error">
          <p className="font-mono text-sm text-error">{error.message}</p>
          <Button variant="primary" size="sm" onClick={refresh} className="mt-4">
            RETRY
          </Button>
        </Card>
        <PageFooter />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader breadcrumb="Directory / Root" title="EVENTS" />

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`
                px-3 py-1 font-mono text-xs uppercase tracking-wider border-2 transition-all
                ${categoryFilter === cat
                  ? 'bg-primary-container text-on-primary-container border-black'
                  : 'bg-surface-container border-outline text-on-surface-variant hover:border-primary-container'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder="FILTER: type, project, workflow, task..."
            className="w-full bg-surface-container border-2 border-outline px-3 py-1.5 font-mono text-xs text-on-surface placeholder:text-outline focus:border-primary-container outline-none"
          />
        </div>
        <span className="font-mono text-xs text-outline">{filtered.length} events</span>
        {isDemoMode && (
          <span className="font-mono text-xs text-warning">DEMO_MODE</span>
        )}
      </div>

      <SectionHeader label="EVENT_TIMELINE" dividerWidth="full" />

      <div className="mt-4">
        {filtered.length === 0 ? (
          <Card variant="outlined" padding="lg" className="text-center">
            <p className="font-mono text-sm text-outline">NO_EVENTS_MATCH_FILTER</p>
          </Card>
        ) : (
          <>
            {filtered.map(event => (
              <EventTimelineItem key={event.id} event={event} />
            ))}
            {hasMore && (
              <div className="mt-4 flex justify-center">
                <Button
                  variant="secondary"
                  onClick={loadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <>
                      <BrutalSpinner size="sm" thickness="thin" />
                      LOADING
                    </>
                  ) : (
                    `LOAD_MORE`
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <PageFooter />
    </div>
  );
}