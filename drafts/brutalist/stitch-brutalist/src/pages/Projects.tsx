import { EntityCard, PageHeader, SectionHeader, PageFooter } from '../components/common';
import { mockProjects } from '../data/mock';
import { useViewMode } from '../hooks/useViewMode';

export function Projects() {
  const { viewMode, setViewMode } = useViewMode();

  const recentProjects = mockProjects.slice(0, 3);
  const allProjects = mockProjects.slice(3);

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
