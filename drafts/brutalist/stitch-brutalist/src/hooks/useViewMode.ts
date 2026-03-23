import { useState } from 'react';
import type { ViewMode } from '../components/common/types';

export function useViewMode(defaultMode: ViewMode = 'kanban') {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);
  return { viewMode, setViewMode };
}
