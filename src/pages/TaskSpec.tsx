import { useParams } from 'react-router-dom';
import { Toolbar, SpecNode, JsonDisplay } from '../components/common';
import { Badge } from '../components/ui';
import { useTask } from '../hooks';

const MOCK_TASK_SPEC = {
  id: "spec-step-001",
  kind: "task" as const,
  title: "Parse JSON Telemetry",
  intent: "High-performance recursive parser for Hivemind neural telemetry streams. Must handle malformed input gracefully and recover without data loss.",
  scope: "All incoming JSON telemetry from cluster 7, maximum item size 1MB, UTF-8 encoding",
  constraints: [
    "Maximum nesting depth: 20 levels",
    "Timeout per item: 100ms",
    "Memory limit: 50MB per parse operation",
    "Must not throw unhandled exceptions"
  ],
  acceptance_criteria: [
    "Parse 1000 items/second sustained",
    "Handle nested depth up to 20 levels",
    "Recovery on parse failure with error reporting",
    "Preserve original ordering"
  ],
  verification: {
    posture: "unit_tests_with_edge_cases",
    instructions: [
      "Unit tests with edge cases",
      "Integration tests with real telemetry samples"
    ],
    checkpoints: [
      "malformed_input_recovery",
      "large_payload_handling",
      "memory_leak_detection"
    ]
  },
  step_id: "11111111-1111-1111-1111-111111111111",
  execution_context: {
    runtime_adapter: "codex",
    model: "gpt-4o",
    timeout_ms: 300000,
    max_retries: 3,
    retry_delay_ms: 1000
  },
  attached_artifacts: [
    "schema/orbital_v2.json",
    "tests/parser_fixtures/"
  ]
};

export function TaskSpec() {
  const { id } = useParams();
  const { task, isLoading } = useTask(id);

  if (isLoading || !task) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center h-64">
          <span className="font-mono text-primary-container">LOADING...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Toolbar
        tabs={[
          { label: 'Overview', path: `/tasks/${id}` },
          { label: 'Spec', path: `/tasks/${id}/spec` },
        ]}
        activeTab="Spec"
      />

      <div className="flex-1 overflow-hidden p-6">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge variant="primary">TASK SPEC</Badge>
              <h1 className="text-3xl font-black font-headline text-primary-container mt-2 uppercase tracking-tight">
                {task.name}
              </h1>
              <p className="font-mono text-sm text-outline mt-1">
                ID: {task.id.toUpperCase()} // STEP: {MOCK_TASK_SPEC.step_id.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 flex-1 overflow-hidden">
            <div className="flex flex-col overflow-hidden">
              <h2 className="font-headline font-black text-sm uppercase tracking-widest text-outline mb-4">
                Spec Node View
              </h2>
              <div className="flex-1 overflow-y-auto pr-2">
                <SpecNode node={MOCK_TASK_SPEC} />
              </div>
            </div>

            <div className="flex flex-col overflow-hidden">
              <h2 className="font-headline font-black text-sm uppercase tracking-widest text-outline mb-4">
                Spec JSON
              </h2>
              <div className="flex-1 overflow-hidden bg-surface-container border-2 border-outline">
                <JsonDisplay data={MOCK_TASK_SPEC} className="h-full" />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-surface-container-low border border-outline-variant">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                <span className="font-mono text-xs text-on-surface-variant uppercase">Spec Binding: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                <span className="font-mono text-xs text-on-surface-variant uppercase">Spec Version: 1</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-tertiary-container"></div>
                <span className="font-mono text-xs text-on-surface-variant uppercase">Verification: {task.status === 'done' ? 'PASSED' : 'PENDING'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
