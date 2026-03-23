import { Icon } from '../ui';

interface AddCardProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export function AddCard({ label, onClick, className = '' }: AddCardProps) {
  return (
    <div
      onClick={onClick}
      className={`border-2 border-dashed border-outline p-6 flex flex-col items-center justify-center text-outline hover:border-primary-container hover:text-primary-container transition-colors cursor-pointer group ${className}`}
    >
      <Icon name="add_box" className="mb-2" size={40} />
      <span className="font-headline font-black uppercase tracking-widest text-sm">{label}</span>
    </div>
  );
}
