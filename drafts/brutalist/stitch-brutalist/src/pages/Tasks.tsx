import { EntityCard, PageHeader, SectionHeader, PageFooter } from '../components/common';
import { mockTasks } from '../data/mock';
import { useViewMode } from '../hooks/useViewMode';

export function Tasks() {
  const { viewMode, setViewMode } = useViewMode();

  const inProgressTasks = mockTasks.filter((t) => t.status === 'in_progress');
  const backlogTasks = mockTasks.filter((t) => t.status === 'backlog');
  const doneTasks = mockTasks.filter((t) => t.status === 'done');

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader
        breadcrumb="Directory / Root / Tasks"
        title="TASKS"
        actionLabel="+ NEW_TASK"
      />

      <section className="mb-16">
        <SectionHeader label="Section_01 // In_Progress" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {inProgressTasks.map((task) => (
            <EntityCard key={task.id} entity={task} type="task" variant="default" />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          label="Section_02 // Task_Manifest"
          dividerWidth="short"
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...backlogTasks, ...doneTasks].map((task) => (
            <EntityCard key={task.id} entity={task} type="task" variant="compact" />
          ))}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
