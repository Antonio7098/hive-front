export interface ServerProject {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  repositories: Array<{
    name: string;
    path: string;
    access_mode: string;
  }>;
  runtime: {
    adapter_name: string;
    binary_path: string;
    model: string | null;
    args: string[];
    env: Record<string, string>;
    timeout_ms: number;
    max_parallel_tasks: number;
  } | null;
}

export interface ServerTask {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  scope: unknown | null;
  run_mode: string;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface ServerWorkflow {
  id: string;
  name: string;
  description: string;
  status: string;
  steps: unknown[];
  created_at: string;
}

export interface ServerGraph {
  id: string;
  name: string;
  nodes: unknown[];
  edges: unknown[];
}

export interface UiState {
  projects: ServerProject[];
  tasks: ServerTask[];
  graphs: ServerGraph[];
  flows: unknown[];
  workflows: ServerWorkflow[];
  workflow_runs: unknown[];
  merge_states: unknown[];
  events: unknown[];
}
