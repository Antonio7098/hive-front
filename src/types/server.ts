export interface ServerRepository {
  name: string;
  path: string;
  access_mode: string;
}

export interface ServerRuntimeConfig {
  adapter_name: string;
  binary_path: string;
  model: string | null;
  args: string[];
  env: Record<string, string>;
  timeout_ms: number;
  max_parallel_tasks: number;
}

export interface ServerProject {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  repositories: ServerRepository[];
  runtime: ServerRuntimeConfig | null;
  runtime_defaults?: Record<string, unknown>;
  constitution_digest?: string | null;
  constitution_schema_version?: string | null;
  constitution_version?: number | null;
  constitution_updated_at?: string | null;
}

export interface ServerTask {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  checkpoints_required?: boolean;
  scope: unknown | null;
  runtime_override?: ServerRuntimeConfig | null;
  runtime_overrides?: Record<string, unknown>;
  run_mode: 'auto' | 'manual';
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface ServerWorkflowStepDefinition {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface ServerWorkflow {
  id: string;
  project_id: string;
  name: string;
  description: string | null;
  spec?: unknown;
  steps: Record<string, ServerWorkflowStepDefinition>;
  created_at: string;
  updated_at: string;
}

export interface ServerStepRun {
  id: string;
  step_id: string;
  state: 'pending' | 'ready' | 'running' | 'verifying' | 'retry' | 'waiting' | 'succeeded' | 'failed' | 'skipped' | 'aborted';
  updated_at: string;
  reason?: string | null;
  wait_status?: string | null;
}

export interface ServerWorkflowRun {
  id: string;
  workflow_id: string;
  project_id: string;
  root_workflow_run_id: string;
  parent_workflow_run_id?: string | null;
  parent_step_id?: string | null;
  state: 'created' | 'running' | 'paused' | 'completed' | 'aborted';
  step_runs?: Record<string, ServerStepRun>;
  created_at: string;
  started_at?: string | null;
  completed_at?: string | null;
  updated_at: string;
}

export interface ServerMergeState {
  flow_id: string;
  status: 'prepared' | 'approved' | 'completed';
  target_branch?: string | null;
  conflicts: string[];
  commits: string[];
  updated_at: string;
}

export interface ServerCorrelationIds {
  project_id?: string | null;
  graph_id?: string | null;
  flow_id?: string | null;
  workflow_id?: string | null;
  workflow_run_id?: string | null;
  task_id?: string | null;
  attempt_id?: string | null;
  step_id?: string | null;
  step_run_id?: string | null;
}

export interface ServerEvent {
  id: string;
  type: string;
  category: string;
  timestamp: string;
  sequence?: number | null;
  correlation: ServerCorrelationIds;
  payload: Record<string, unknown>;
}

export interface UiState {
  projects: ServerProject[];
  tasks: ServerTask[];
  workflows: ServerWorkflow[];
  workflow_runs: ServerWorkflowRun[];
  merge_states: ServerMergeState[];
  events: ServerEvent[];
  /** @deprecated Legacy TaskGraph data — not consumed by the frontend */
  graphs: unknown[];
  /** @deprecated Legacy TaskFlow data — not consumed by the frontend */
  flows: unknown[];
}
