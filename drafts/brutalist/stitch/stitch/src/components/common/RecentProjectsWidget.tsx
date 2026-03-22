import { Link } from 'react-router-dom';
import { Icon } from '../ui';

interface RecentProjectsWidgetProps {
  projects: {
    id: string;
    name: string;
    lastEdit: string;
    icon?: string;
  }[];
  className?: string;
}

export function RecentProjectsWidget({ projects, className = '' }: RecentProjectsWidgetProps) {
  return (
    <div className={`bg-surface-container border-3 border-outline shadow-[8px_8px_0px_0px_#0e0e0e] ${className}`}>
      <div className="border-b-3 border-outline p-5 flex items-center gap-3 bg-surface-container-high">
        <Icon name="schedule" />
        <h2 className="font-headline font-black text-xl tracking-widest uppercase">RECENT</h2>
      </div>
      <div className="p-5 grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="bg-surface-container-lowest border-2 border-outline p-4 flex items-center gap-4 group cursor-pointer hover:border-primary-container hover:translate-x-1 transition-all"
          >
            <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center border border-outline group-hover:bg-primary-container group-hover:text-black transition-colors">
              <Icon name={(project.icon as any) || 'rocket_launch'} />
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-tight">{project.name}</h4>
              <p className="text-[10px] mono-utility text-on-surface-variant">LAST_EDIT: {project.lastEdit}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
