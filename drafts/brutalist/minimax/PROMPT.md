# HiveMind - Project/Workflow/Task Management Dashboard

## Tech Stack
- **Build Tool**: Vite
- **Framework**: React 18+ with functional components and hooks
- **Routing**: React Router v6
- **Styling**: Tailwind CSS (with CSS custom properties for theming)
- **Icons**: Lucide React or Heroicons

---

## Architecture Principles

### 1. Centralized Theme System
All colors, spacing, and design tokens defined as CSS custom properties in `src/styles/theme.css`. Theme is applied via `data-theme` attribute on root element.

```css
:root {
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #141414;
  --color-bg-elevated: #1a1a1a;
  --color-border: #2a2a2a;
  --color-text-primary: #fef3c7;
  --color-text-secondary: #d97706;
  --color-accent: #fbbf24;
  --color-accent-hover: #f59e0b;
  --color-accent-light: #fcd34d;
  --color-warning: #f97316;
}
```

### 2. Component Reusability Strategy

**Layer 1 - Primitives** (in `src/components/ui/`)
- **Examples:**
- `Button` - variants: primary, secondary, ghost, danger; sizes: sm, md, lg
- `Card` - base container with configurable padding, border, hover states
- `Badge` - status indicators (todo, active, completed, etc.)
- `Input`, `Select`, `Toggle` - form primitives
- `Avatar` - user/entity representation
- `Icon` - wrapper for icon library

**Layer 2 - Composed Components** (in `src/components/common/`)
- **Examples:**
- `EntityCard` - used for Project/Workflow/Task cards everywhere
- `ViewSwitcher` - Kanban/List/Graph toggle
- `MetadataRow` - key-value display for metadata sections
- `SectionPanel` - left overview / right metadata layout
- `Toolbar` - navigation tabs with active state
- `StatusToggle` - active/inactive toggle with visual feedback
- `ExpandableItem` - click to expand row in lists
- `HoneycombBackground` - subtle hexagonal pattern background

**Layer 3 - Feature Components** (in `src/components/features/`)
- **Examples:**
- `TaskBoard` / `WorkflowBoard` - kanban board
- `ListView` - generic list with expandable rows
- `GraphView` - node-based visualization
- `ProjectGrid` - grid of EntityCards for projects page
- `DashboardWidgets` - Todo, Active, Recent widgets

### 3. Layout Structure

```
src/
├── components/
│   ├── ui/              # Primitives (Button, Card, Badge, etc.)
│   ├── common/          # Composed reusable (EntityCard, ViewSwitcher, etc.)
│   └── features/       # Feature-specific (TaskBoard, etc.)
├── layouts/
│   └── AppLayout.tsx   # Main layout with sidebar/header
├── pages/
│   ├── Dashboard.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── WorkflowDetail.tsx
│   └── TaskDetail.tsx
├── styles/
│   └── theme.css       # All design tokens
├── hooks/
│   └── useTheme.ts     # Theme switching hook
├── context/
│   └── ThemeContext.tsx
└── data/
    └── mock.ts         # Mock data for all entities
```

---

## Page Specifications

### Dashboard (`/`)
**Layout**: 2-column grid on desktop, stacked on mobile

**Active Widget (Left)**
- Header: "ACTIVE" with pulsing indicator
- Currently running tasks/workflows
- Shows progress/activity indicator

**Todo Widget (Top Right)**
- Header: "TODO" with badge count
- List of TaskSummary items marked as todo
- Each item: task name, parent workflow/project, status dot
- Click navigates to task detail

**Recent Projects Widget (Bottom Right)**
- Header: "RECENT" with clock icon
- Last projects worked on
- Card shows: project title/name only

### Projects Page (`/projects`)
**Layout**: Full width grid

**Header**: "PROJECTS" title + "New Project" button

**Section 1 - Recent** (larger cards, 3-column)
- Top 3 most recently modified projects
- Card shows: name, description snippet, task count, last activity

**Section 2 - All Projects** (smaller cards, 4-column grid)
- Remaining projects in smaller format
- Card shows: name, task count, status badge

### Project Detail (`/projects/:id`)
**Layout**: Two-column - fixed left sidebar, scrollable main content

**Toolbar** (top navigation):
- [Overview] [Workflows] [Docs] [Settings]

**Left Panel (40%)**:
- Project name (editable)
- Description/spec block
- Created date, owner, tags

**Right Panel (60%, top to bottom)**:
1. **Metadata Grid**: task count, workflow count, status, health指标
2. **Active State**: toggle showing if project is active/archived
3. **Workflows Section**: ViewSwitcher (kanban/list/graph) + workflow cards
4. **Quick Actions**: buttons for common operations

### Workflow Detail (`/workflows/:id`)
**Layout**: Same two-column structure

**Toolbar**: [Overview] [Tasks] [Spec] [Config]

**Left Panel**:
- Workflow name
- Purpose/overview text
- Linked project
- Trigger conditions

**Right Panel**:
1. **Metadata**: task count, avg duration, last run
2. **Active State**: toggle
3. **Tasks Section**: ViewSwitcher + task cards/list
4. **Spec Section**: JSON/yaml spec display

### Task Detail (`/tasks/:id`)
**Layout**: Same two-column

**Toolbar**: [Overview] [Spec] [Subtasks] [Config]

**Left Panel**:
- Task name
- Objective/description
- Assigned to, due date

**Right Panel**:
1. **Metadata**: status, priority, time estimate
2. **Active State**: toggle
3. **Subtasks**: checklist or subtask list
4. **Spec**: detailed specifications

---

## View Modes (Kanban / List / Graph)

### Kanban View
- Columns: based on entity status (e.g., Backlog, In Progress, Done)
- Cards: EntityCard in compact mode
- Drag-and-drop between columns (if time permits, otherwise static)
- Click card → expand inline or navigate to detail

### List View
- Table-like rows
- Columns: Name, Status, Created, Modified, Assignee
- Expandable rows showing additional detail inline
- Hover reveals quick actions

### Graph View
- Node-based visualization using react-xarrows or similar
- Shows relationships between entities
- Nodes are clickable to navigate
- Zoom/pan controls

---

## EntityCard Component Props
```tsx
interface EntityCardProps {
  entity: Project | Workflow | Task;
  variant: 'default' | 'compact' | 'expanded';
  showActions?: boolean;
  onClick?: () => void;
  onToggleActive?: (id: string, active: boolean) => void;
}
```

---

## Brutalist Theme Details

### Visual Language
- Sharp corners (no border-radius or minimal 2px)
- Heavy black borders (2-3px)
- Bold, blocky shadows (offset, not blurred)
- Uppercase headings with heavy font weights
- Monospace or industrial fonts (JetBrains Mono, Space Grotesk fallback)
- High contrast

### Honeycomb Hints
- Subtle hexagonal pattern in backgrounds (CSS or SVG)
- Hexagonal favicons/badges
- Cell-like grid structures in layouts
- Slight organic geometry in an otherwise rigid brutalist structure

### Color Application
- **Black**: backgrounds, heavy borders
- **Dark gray**: elevated surfaces, cards
- **Yellow/Amber**: primary actions, active states, highlights
- **Orange**: warnings, secondary accents
- **White/Cream**: text on dark backgrounds

---

## Component Inventory

| Component | States | Notes |
|-----------|--------|-------|
| Button | default, hover, active, disabled, loading | 3 variants, 3 sizes |
| Card | default, hover, selected, expanded | EntityCard base |
| Badge | todo, active, completed, archived | Color-coded |
| ViewSwitcher | kanban, list, graph | Toggle group |
| Toolbar | default, with count badges | Tab navigation |
| StatusToggle | on, off, loading | For active state |
| MetadataRow | default, editable | Key-value display |
| ExpandableItem | collapsed, expanded | For list views |
| EntityCard | default, compact, expanded | All 3 entity types |

---

## Mock Data Structure

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'draft';
  taskCount: number;
  workflowCount: number;
  createdAt: Date;
  updatedAt: Date;
  recentActivity: Date;
}

interface Workflow {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: 'todo' | 'active' | 'completed';
  taskCount: number;
  lastRun: Date;
  trigger: string;
}

interface Task {
  id: string;
  workflowId: string;
  projectId: string;
  name: string;
  description: string;
  status: 'backlog' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: Date;
  subtasks: Subtask[];
}
```

---

## Implementation Priority
1. Theme system + CSS variables
2. UI primitives (Button, Card, Badge, Input)
3. Common composed components (EntityCard, ViewSwitcher, Toolbar)
4. Layout structure (AppLayout with routing)
5. Dashboard page
6. Projects page
7. Project detail + Workflow detail + Task detail pages
8. Kanban/List/Graph views for each entity
9. Polish: animations, honeycomb background, hover states
