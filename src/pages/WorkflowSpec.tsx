import { useParams } from 'react-router-dom';
import { Toolbar, SpecNode, JsonDisplay } from '../components/common';
import { Badge } from '../components/ui';
import { useWorkflow } from '../hooks';

const MOCK_WORKFLOW_SPEC_BINDING = {
  schema: "workflow_spec",
  schema_version: 1,
  binding_hash: "a3f2b8c9d4e5f6a7b8c0d1e2f3a4b5c6d7e8f9a0",
  root: {
    id: "spec-root-001",
    kind: "workflow" as const,
    title: "Ingestion Pipeline",
    intent: "Process incoming telemetry data from edge nodes with validation and transformation",
    scope: "All telemetry from cluster 7 edge nodes",
    constraints: [
      "Must complete within 5 minute window",
      "Max 500ms per item latency"
    ],
    acceptance_criteria: [
      "Process 10k items/minute",
      "Zero data loss",
      "Schema validation on all items"
    ],
    verification: {
      posture: "automated",
      instructions: [
        "Run unit test suite",
        "Run integration tests"
      ],
      checkpoints: [
        "pre_deploy",
        "post_deploy"
      ]
    },
    children: [
      {
        id: "spec-step-001",
        kind: "task" as const,
        title: "Parse JSON Telemetry",
        intent: "High-performance recursive parser for Hivemind neural telemetry streams",
        constraints: [
          "Must handle malformed input gracefully"
        ],
        acceptance_criteria: [
          "Parse 1000 items/second",
          "Handle nested depth up to 20",
          "Recovery on parse failure"
        ],
        verification: {
          posture: "unit_tests",
          instructions: [
            "Unit tests with edge cases"
          ],
          checkpoints: []
        },
        step_id: "11111111-1111-1111-1111-111111111111"
      },
      {
        id: "spec-step-002",
        kind: "task" as const,
        title: "Validate Schema",
        intent: "Schema validation for orbital strict v2 telemetry format",
        constraints: [
          "Must reject invalid schemas with clear error messages"
        ],
        acceptance_criteria: [
          "Reject invalid schemas",
          "Pass valid schemas",
          "Return error details"
        ],
        verification: {
          posture: "integration_tests",
          instructions: [
            "Integration tests with known schema variations"
          ],
          checkpoints: []
        },
        step_id: "22222222-2222-2222-2222-222222222222"
      },
      {
        id: "spec-step-003",
        kind: "workflow" as const,
        title: "Transform & Aggregate",
        intent: "Transform validated data and aggregate metrics",
        scope: "Data from parse and validate steps",
        constraints: [
          "Maintain ordering where required"
        ],
        acceptance_criteria: [
          "Output aggregated metrics",
          "Preserve data lineage",
          "Handle partial failures"
        ],
        verification: {
          posture: "e2e_integration",
          instructions: [
            "End-to-end integration tests"
          ],
          checkpoints: []
        },
        workflow_id: "33333333-3333-3333-3333-333333333333",
        children: [
          {
            id: "spec-substep-001",
            kind: "task" as const,
            title: "Calculate Metrics",
            intent: "Calculate derived metrics from validated data",
            constraints: [],
            acceptance_criteria: [
              "Output metrics JSON",
              "Include timestamp",
              "Include source node ID"
            ],
            verification: {
              posture: "unit_tests",
              instructions: [],
              checkpoints: []
            },
            step_id: "44444444-4444-4444-4444-444444444444"
          },
          {
            id: "spec-substep-002",
            kind: "task" as const,
            title: "Aggregate by Node",
            intent: "Aggregate metrics grouped by source node",
            constraints: [],
            acceptance_criteria: [
              "Group correctly",
              "Sum numeric values",
              "Preserve timestamps"
            ],
            verification: {
              posture: "unit_tests",
              instructions: [],
              checkpoints: []
            },
            step_id: "55555555-5555-5555-5555-555555555555"
          }
        ]
      },
      {
        id: "spec-step-004",
        kind: "task" as const,
        title: "Load to Delta Cluster",
        intent: "Persist aggregated data to cluster delta 01",
        constraints: [
          "Write must be atomic, rollback on failure"
        ],
        acceptance_criteria: [
          "Successful write confirmation",
          "Rollback on error",
          "Consistent read-back"
        ],
        verification: {
          posture: "integration_tests",
          instructions: [
            "Integration test with rollback scenarios"
          ],
          checkpoints: []
        },
        step_id: "66666666-6666-6666-6666-666666666666"
      }
    ]
  }
};

export function WorkflowSpec() {
  const { id } = useParams();
  const { workflow, isLoading } = useWorkflow(id);

  if (isLoading || !workflow) {
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
          { label: 'Overview', path: `/workflows/${id}` },
          { label: 'Tasks', path: `/workflows/${id}/tasks` },
          { label: 'Runs', path: `/workflows/${id}/runs` },
          { label: 'Spec', path: `/workflows/${id}/spec` },
          { label: 'Config', path: `/workflows/${id}/config` },
        ]}
        activeTab="Spec"
      />

      <div className="flex-1 overflow-hidden p-6">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge variant="primary">WORKFLOW SPEC</Badge>
              <h1 className="text-3xl font-black font-headline text-primary-container mt-2 uppercase tracking-tight">
                {workflow.name}
              </h1>
              <p className="font-mono text-sm text-outline mt-1">
                ID: {workflow.id.toUpperCase()} // SPEC BINDING: ACTIVE
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 flex-1 overflow-hidden">
            <div className="flex flex-col overflow-hidden">
              <h2 className="font-headline font-black text-sm uppercase tracking-widest text-outline mb-4">
                Spec Tree View
              </h2>
              <div className="flex-1 overflow-y-auto pr-2">
                <SpecNode node={MOCK_WORKFLOW_SPEC_BINDING.root} />
              </div>
            </div>

            <div className="flex flex-col overflow-hidden">
              <h2 className="font-headline font-black text-sm uppercase tracking-widest text-outline mb-4">
                Spec JSON
              </h2>
              <div className="flex-1 overflow-hidden bg-surface-container border-2 border-outline">
                <JsonDisplay data={MOCK_WORKFLOW_SPEC_BINDING} className="h-full" />
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
                <span className="font-mono text-xs text-on-surface-variant uppercase">4 Steps, 2 Nested Workflows</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
