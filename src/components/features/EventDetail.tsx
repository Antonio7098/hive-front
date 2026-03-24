import type { Event } from '../../types/entities';
import { DetailPanel, PanelSection, DetailRow } from '../common/DetailPanel';
import { JsonDisplay } from '../common/JsonDisplay';

interface EventDetailProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatTimestamp(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function EventDetail({ event, isOpen, onClose }: EventDetailProps) {
  if (!event) return null;

  return (
    <DetailPanel
      isOpen={isOpen}
      onClose={onClose}
      title="EVENT DETAIL"
      subtitle={event.id.toUpperCase()}
    >
      <PanelSection title="Overview">
        <DetailRow label="Event ID" value={event.id} />
        <DetailRow label="Type" value={event.type} />
        <DetailRow label="Category" value={event.category} />
        <DetailRow label="Sequence" value={event.sequence !== null ? String(event.sequence) : null} />
        <div className="mt-3">
          <DetailRow label="Timestamp" value={formatTimestamp(event.timestamp)} />
        </div>
      </PanelSection>

      <PanelSection title="Lineage / Correlation">
        <DetailRow label="Project ID" value={event.correlation.projectId} />
        <DetailRow label="Graph ID" value={event.correlation.graphId} />
        <DetailRow label="Flow ID" value={event.correlation.flowId} />
        <DetailRow label="Workflow ID" value={event.correlation.workflowId} />
        <DetailRow label="Workflow Run ID" value={event.correlation.workflowRunId} />
        <DetailRow label="Task ID" value={event.correlation.taskId} />
        <DetailRow label="Attempt ID" value={event.correlation.attemptId} />
      </PanelSection>

      <PanelSection title="Payload">
        <div className="px-1">
          <JsonDisplay data={event.payload} />
        </div>
      </PanelSection>

      <PanelSection title="Raw Event">
        <div className="px-1">
          <JsonDisplay data={event} />
        </div>
      </PanelSection>
    </DetailPanel>
  );
}
