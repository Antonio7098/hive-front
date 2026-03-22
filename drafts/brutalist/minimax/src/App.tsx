import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import {
  Dashboard,
  Projects,
  ProjectDetail,
  WorkflowDetail,
  TaskDetail,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/workflows/:id" element={<WorkflowDetail />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
