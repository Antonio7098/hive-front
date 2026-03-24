import { useState, useEffect, useCallback, useMemo } from 'react';
import { useData } from '../context/DataContext';
import type { MergeState } from '../types/entities';
import { ErrorTaxonomy, ErrorCategory, ErrorSeverity } from '../types/errors';
import { structuredLogger } from '../lib/logger';
import { PageHeader, PageFooter, SectionHeader, StatsBar } from '../components/common';
import { Card, Badge, Icon } from '../components/ui';
import { BrutalSpinner } from '../components/ui/Loading';

function useMergeStatesFeed() {
  const { getMergeStates, isLoading: contextLoading } = useData();
  const [merges, setMerges] = useState<MergeState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (contextLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMergeStates();
      setMerges(data);
    } catch (err) {
      const taxonomy = ErrorTaxonomy.API_REQUEST_FAILED;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(`Failed to load merge states: ${errorMessage}`));
      structuredLogger.error(
        'Failed to load merge states',
        { code: taxonomy.code, category: ErrorCategory.API, severity: ErrorSeverity.MEDIUM, message: errorMessage }
      );
    } finally {
      setIsLoading(false);
    }
  }, [getMergeStates, contextLoading]);

  useEffect(() => { refresh(); }, [refresh]);

  return { merges, isLoading: isLoading || contextLoading, error, refresh };
}

const statusVariant = {
  prepared: 'warning' as const,
  approved: 'primary' as const,
  completed: 'success' as const,
};

const statusIcon = {
  prepared: 'schedule',
  approved: 'check',
  completed: 'check',
};

function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function Merges() {
  const { merges, isLoading } = useMergeStatesFeed();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return merges;
    return merges.filter(m => m.status === statusFilter);
  }, [merges, statusFilter]);

  const prepared = merges.filter(m => m.status === 'prepared').length;
  const approved = merges.filter(m => m.status === 'approved').length;
  const completed = merges.filter(m => m.status === 'completed').length;

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

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader breadcrumb="Directory / Root" title="MERGES" />

      <StatsBar
        cells={[
          { label: 'Prepared', value: prepared },
          { label: 'Approved', value: approved },
          { label: 'Completed', value: completed },
        ]}
      />

      <div className="mt-6 flex items-center gap-4">
        {['all', 'prepared', 'approved', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`
              px-3 py-1 font-mono text-xs uppercase tracking-wider border-2 transition-all
              ${statusFilter === status
                ? 'bg-primary-container text-on-primary-container border-black'
                : 'bg-surface-container border-outline text-on-surface-variant hover:border-primary-container'
              }
            `}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <SectionHeader label="MERGE_QUEUE" dividerWidth="full" />

        {filtered.length === 0 ? (
          <Card variant="outlined" padding="lg" className="text-center mt-4">
            <p className="font-mono text-sm text-outline">NO_MERGES_MATCH_FILTER</p>
          </Card>
        ) : (
          <div className="mt-4 space-y-2">
            {filtered.map((merge) => (
              <div
                key={merge.flowId}
                className="bg-surface-container border-2 border-outline p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <Icon name={statusIcon[merge.status]} className="text-on-surface-variant shrink-0" size={18} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-on-surface truncate">
                        FLOW: {merge.flowId.slice(0, 8).toUpperCase()}
                      </span>
                      <Badge variant={statusVariant[merge.status]} size="sm">
                        {merge.status}
                      </Badge>
                    </div>
                    {merge.targetBranch && (
                      <span className="text-[10px] font-mono text-outline block mt-0.5">
                        TARGET: {merge.targetBranch}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  {merge.commits.length > 0 && (
                    <div className="hidden md:block text-right">
                      <div className="text-[10px] font-mono uppercase text-outline">Commits</div>
                      <div className="text-xs font-mono text-on-surface-variant">{merge.commits.length}</div>
                    </div>
                  )}
                  {merge.conflicts.length > 0 && (
                    <div className="hidden md:block text-right">
                      <div className="text-[10px] font-mono uppercase text-error">Conflicts</div>
                      <div className="text-xs font-mono text-error">{merge.conflicts.length}</div>
                    </div>
                  )}
                  <div className="hidden lg:block text-right">
                    <div className="text-[10px] font-mono uppercase text-outline">Updated</div>
                    <div className="text-xs font-mono text-on-surface-variant">{formatDate(merge.updatedAt)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PageFooter />
    </div>
  );
}
