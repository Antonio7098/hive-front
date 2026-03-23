import { Card, Icon } from '../ui';

interface QuickLink {
  label: string;
  icon: string;
  onClick?: () => void;
}

interface QuickLinksProps {
  links: QuickLink[];
  className?: string;
}

export function QuickLinks({ links, className = '' }: QuickLinksProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {links.map((link, i) => (
        <Card 
          key={i}
          variant="elevated" 
          padding="md" 
          className="flex items-center justify-between hover:bg-primary-container hover:text-black cursor-pointer transition-all"
        >
          <span className="font-headline font-black text-xs tracking-widest">{link.label}</span>
          <Icon name={link.icon as any} size={18} />
        </Card>
      ))}
    </div>
  );
}
