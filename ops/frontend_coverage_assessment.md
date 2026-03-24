# Frontend API Coverage Assessment

Generated: 2026-03-24
Updated: 2026-03-24 (All backend improvements complete)

## Current State

All reads use per-resource endpoints instead of the monolithic `/api/state`. The frontend builds data models from targeted endpoints with server-side filtering and pagination.

The primary execution model is `WorkflowDefinition`/`WorkflowRun` (Phase 5 workflow engine).

---

## Read Operations — Coverage

| Category | Read Endpoints | Coverage |
|----------|---------------|----------|
| Projects | 2 | 2 ✅ |
| Tasks | 1 | 1 ✅ |
| Workflows (WorkflowDefinition) | 2 | 2 ✅ |
| Workflow Runs | 2 | 2 ✅ |
| Merge States | 1 | 1 ✅ |
| Events | 2 | 2 ✅ |
| Runtime | 3 | 0 ❌ |
| Chat | 2 | 0 ❌ |
| Governance | 8 | 0 ❌ |
| Verification | 1 | 0 ❌ |
| Checkpoints | 1 | 0 ❌ |
| Worktrees | 2 | 0 ❌ |
| Attempts | 3 | 0 ❌ |
| UI Meta | 4 | 2 ✅ |
| **Active totals** | **31** | **13 (42%)** |

---

## Backend Improvements — Complete

### Priority 1 — Wire missing GET handlers ✅

| Endpoint | Registry Method | Status |
|----------|----------------|---------|
| `GET /api/workflows?project=<id>` | `Registry::list_workflows(project)` | ✅ Implemented |
| `GET /api/workflows/inspect?workflow_id=<id>` | `Registry::get_workflow(id_or_name)` | ✅ Implemented |
| `GET /api/workflow-runs?project=<id>&workflow=<id>` | `Registry::list_workflow_runs(project, workflow)` | ✅ Implemented |
| `GET /api/workflow-runs/inspect?workflow_run_id=<id>` | `Registry::inspect_workflow_run(id)` | ✅ Implemented |

### Priority 2 — Event filtering with pagination ✅

| Query Param | EventFilter Field | Status |
|-------------|------------------|---------|
| `?limit=<n>` | `limit` | ✅ Always existed |
| `?offset=<n>` | `offset` | ✅ **NEW** — server-side pagination |
| `?workflow_run_id=<id>` | `workflow_run_id` | ✅ Implemented |
| `?project_id=<id>` | `project_id` | ✅ Implemented |
| `?workflow_id=<id>` | `workflow_id` | ✅ Implemented |
| `?task_id=<id>` | `task_id` | ✅ Implemented |
| `?since=<iso>` | `since` | ✅ Implemented |
| `?until=<iso>` | `until` | ✅ Implemented |

**Note:** `category` and `type` filters remain client-side (category is derived from payload, not stored separately).

---

## Server Proxy Pattern

The server (`hivemind serve`) is a proxy for CLI functionality. New CLI commands must exist before server endpoints are added.

**CLI commands added:**
- `hivemind events list --offset <n>` — pagination support

**Server endpoints added:**
- `GET /api/events?offset=<n>` — proxies CLI pagination

---

## Phase 2 Changes (Complete)

### New pages
- `/workflows/:id/runs` — Run list with stats and linked items
- `/workflows/:workflowId/runs/:runId` — Run detail with step list + event stream
- `/events` — Global event timeline with server-side pagination (50/page) + client-side category/text filters
- `/merges` — Merge states queue with status filters

### New components
- `WorkflowRunListItem` — Run row (links to detail)
- `EventTimelineItem` — Timeline row with category, type, timestamp, payload

### New hooks
- `useWorkflowRuns(workflowId)` — Uses `getWorkflowRunsByWorkflow()` server-side filtering
- `useWorkflowRun(runId)` — Uses `getEventsFiltered({workflowRunId})` server-side filtering

### Enriched entities
- `Task` — `state`, `runMode`
- `Project` — `runtime`, `constitutionVersion`, `constitutionUpdatedAt`
- `WorkflowRun` — `stepRuns: StepRun[]`
- `StepRun` — New type

### Sidebar
- Added EVENTS + MERGES nav items

---

## Remaining Gaps

| Item | Difficulty | Notes |
|------|-----------|-------|
| Runtime endpoints | Medium | 3 endpoints, 0 UI built |
| Chat endpoints | Medium | 2 endpoints, 0 UI built |
| Governance UI | High | 8 endpoints, complex UI |
| `/api/state` scoping | Low | Works but returns full blob |
