import React from 'react';
import { Plus, Folder } from 'lucide-react';
import { Button } from '../components/ui';
import { EntityCard, HoneycombBackground } from '../components/common';
import { projects, getRecentProjects } from '../data/mock';

export const Projects: React.FC = () => {
  const recentProjects = getRecentProjects(3);
  const allProjects = projects.filter(
    p => !recentProjects.find(r => r.id === p.id)
  );

  return (
    <div className="p-6 lg:p-8 relative">
      <HoneycombBackground />
      
      <div className="relative">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-text-primary uppercase tracking-wider flex items-center gap-3">
              <Folder size={32} className="text-accent" />
              Projects
            </h1>
            <p className="text-text-secondary font-mono text-sm mt-2">
              {projects.length} total projects
            </p>
          </div>
          <Button variant="primary" size="lg">
            <Plus size={18} />
            New Project
          </Button>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-display font-bold text-text-secondary uppercase tracking-wider mb-4">
            Recent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EntityCard
                  entity={project}
                  variant="expanded"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-text-secondary uppercase tracking-wider mb-4">
            All Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 3) * 0.05}s` }}
              >
                <EntityCard
                  entity={project}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
