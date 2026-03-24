import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts';
import { Dashboard, Projects, ProjectDetail, Workflows, WorkflowDetail, WorkflowRuns, WorkflowRunDetail, Tasks, TaskDetail, Events, Merges, Analytics, Settings, ComponentLibrary, ProjectWorkflows, WorkflowTasks } from './pages';
import { DataProvider } from './context/DataContext';

export function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id/workflows" element={<ProjectWorkflows />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/workflows/:id/tasks" element={<WorkflowTasks />} />
            <Route path="/workflows/:id/runs" element={<WorkflowRuns />} />
            <Route path="/workflows/:workflowId/runs/:runId" element={<WorkflowRunDetail />} />
            <Route path="/workflows/:id" element={<WorkflowDetail />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/merges" element={<Merges />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/components" element={<ComponentLibrary />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </DataProvider>
  );
}
