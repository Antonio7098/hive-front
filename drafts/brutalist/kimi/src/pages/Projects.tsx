import { Plus, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { EntityCard } from '../components/common/EntityCard';
import { mockProjects, getRecentProjects } from '../data/mock';

export default function Projects() {
  const recentProjects = getRecentProjects(3);
  const allProjects = mockProjects.filter(
    p => !recentProjects.find(rp => rp.id === p.id)
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-primary uppercase tracking-wide">
            Projects
          </h1>
          <p className="mt-2 font-mono text-text-secondary">
            Manage your work across all initiatives
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>
          New Project
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search projects..."
          leftIcon={<Search className="w-4 h-4 text-text-secondary" />}
        />
      </div>

      {/* Recent Section */}
      <section>
        <h2 className="font-display font-bold text-xl text-text-primary uppercase tracking-wider mb-4">
          Recent
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProjects.map((project) => (
            <EntityCard key={project.id} entity={project} variant="expanded" />
          ))}
        </div>
      </section>

      {/* All Projects Section */}
      <section>
        <h2 className="font-display font-bold text-xl text-text-primary uppercase tracking-wider mb-4">
          All Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allProjects.map((project) => (
            <EntityCard key={project.id} entity={project} variant="default" />
          ))}
        </div>
      </section>
    </div>
  );
}
