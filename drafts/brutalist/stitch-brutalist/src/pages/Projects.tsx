import { useState } from 'react';
import { EntityCard, ViewSwitcher } from '../components/common';
import { Button } from '../components/ui';
import { mockProjects } from '../data/mock';

export function Projects() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'graph'>('kanban');

  const recentProjects = mockProjects.slice(0, 3);
  const allProjects = mockProjects.slice(3);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="font-mono text-primary-container text-xs mb-2 tracking-[0.4em] uppercase">
            Directory / Root / Projects
          </div>
          <h2 className="text-6xl font-black font-headline tracking-tighter text-on-surface">PROJECTS</h2>
        </div>
        <Button variant="primary" size="lg">
          + NEW_PROJECT
        </Button>
      </div>

      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h3 className="font-headline font-bold text-xl uppercase tracking-widest text-[#d3c5ac]">
            Section_01 // Recent_Activity
          </h3>
          <div className="h-[2px] flex-1 bg-outline opacity-30"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentProjects.map((project) => (
            <EntityCard key={project.id} entity={project} type="project" variant="default" />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="font-headline font-bold text-xl uppercase tracking-widest text-[#d3c5ac]">
              Section_02 // Project_Manifest
            </h3>
            <div className="h-[2px] flex-1 bg-outline opacity-30 w-32"></div>
          </div>
          <ViewSwitcher activeView={viewMode} onViewChange={setViewMode} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allProjects.map((project) => (
            <EntityCard key={project.id} entity={project} type="project" variant="compact" />
          ))}
        </div>
      </section>

      <footer className="mt-16 bg-surface-container-highest border-t-3 border-[#9c8f79] px-6 py-2 flex justify-between items-center text-[10px] font-mono tracking-widest text-on-surface-variant">
        <div className="flex gap-6">
          <span>SYSTEM_STATUS: <span className="text-primary-container">OPTIMAL</span></span>
          <span>LATENCY: 14MS</span>
          <span>DATABASE: SYNCED</span>
        </div>
        <div>
          <span>© 2024 HIVEMIND COMMAND</span>
        </div>
      </footer>
    </div>
  );
}
