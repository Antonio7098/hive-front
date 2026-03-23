import { useProjects } from '../hooks';
import { EntityCard, PageHeader, SectionHeader, PageFooter } from '../components/common';
import { useViewMode } from '../hooks/useViewMode';

export function Projects() {
  const { projects, isLoading } = useProjects();
  const { viewMode, setViewMode } = useViewMode();

  const recentProjects = projects.slice(0, 3);
  const allProjects = projects.slice(3);

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-center h-64">
          <span className="font-mono text-primary-container">LOADING...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader
        breadcrumb="Directory / Root / Projects"
        title="PROJECTS"
        actionLabel="+ NEW_PROJECT"
      />

      <section className="mb-16">
        <SectionHeader label="Section_01 // Recent_Activity" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentProjects.map((project) => (
            <EntityCard key={project.id} entity={project} type="project" variant="default" />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          label="Section_02 // Project_Manifest"
          dividerWidth="short"
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allProjects.map((project) => (
            <EntityCard key={project.id} entity={project} type="project" variant="compact" />
          ))}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
