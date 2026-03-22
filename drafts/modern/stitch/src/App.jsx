import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import WorkflowDetail from './pages/WorkflowDetail'
import TaskDetail from './pages/TaskDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="workflows/:id" element={<WorkflowDetail />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
      </Route>
    </Routes>
  )
}

export default App