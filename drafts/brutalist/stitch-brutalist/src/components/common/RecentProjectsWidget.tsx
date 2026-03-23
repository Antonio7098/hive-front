import { Link } from 'react-router-dom';
import { Icon } from '../ui';
import { CardHeader } from '../ui/Card';

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
    <div className={`card-brutal p-0 ${className}`}>
      <CardHeader title="RECENT" />
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
