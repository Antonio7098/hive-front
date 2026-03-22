# HiveMind - Project/Workflow/Task Management Dashboard

A brutalist-inspired project management dashboard built with React, TypeScript, Tailwind CSS, and Vite.

## Features

- **Dashboard**: Overview with Active, Todo, and Recent widgets
- **Projects**: Grid view with Recent and All Projects sections
- **Project Detail**: Two-column layout with metadata, workflows, and settings
- **Workflow Detail**: Task management with Kanban/List/Graph view switcher
- **Task Detail**: Subtask tracking with progress indicators

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18+ with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with CSS custom properties
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono, Space Grotesk

## Design System

### Brutalist Theme
- Sharp corners (minimal border-radius)
- Heavy black borders (2-3px)
- Bold, blocky shadows
- Uppercase headings with heavy font weights
- Monospace font for body text
- High contrast color scheme

### Color Palette
- **Black**: `#0a0a0a` (backgrounds)
- **Dark Gray**: `#141414`, `#1a1a1a` (elevated surfaces)
- **Amber/Yellow**: `#fbbf24` (primary accent)
- **Orange**: `#f97316` (warnings)
- **Cream**: `#fef3c7` (primary text)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Primitives (Button, Card, Badge, Input, Toggle)
│   └── common/       # Composed components (EntityCard, ViewSwitcher, etc.)
├── layouts/
│   └── AppLayout.tsx # Main layout with sidebar
├── pages/
│   ├── Dashboard.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── WorkflowDetail.tsx
│   └── TaskDetail.tsx
├── data/
│   └── mock.ts       # Mock data for development
├── types/
│   └── index.ts      # TypeScript interfaces
└── styles/
    └── theme.css     # Design tokens and animations
```

## Navigation Routes

- `/` - Dashboard
- `/projects` - Projects list
- `/projects/:id` - Project detail
- `/workflows/:id` - Workflow detail
- `/tasks/:id` - Task detail
