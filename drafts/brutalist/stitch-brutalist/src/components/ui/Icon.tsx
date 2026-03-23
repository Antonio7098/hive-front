import {
  Grid3X3, GitBranch, List, CheckSquare, BarChart3, Settings,
  Rocket, Search, Bell, Terminal, UserCircle, ChevronRight, Clock,
  PlusSquare, FileText, Kanban, Filter,
  FileJson, AlignLeft, Database, MoreHorizontal,
  Copy, Download, ExternalLink, AlertTriangle, Timer,
  Check, ChevronUp, ChevronDown, Eye, Code, Sliders,
  Zap, ArrowRight, Webhook, Server, RotateCcw
} from 'lucide-react';

type IconName = string;

const iconMap: Record<string, any> = {
  grid_view: Grid3X3,
  account_tree: GitBranch,
  reorder: List,
  task_alt: CheckSquare,
  bar_chart: BarChart3,
  settings: Settings,
  rocket_launch: Rocket,
  search: Search,
  notifications: Bell,
  terminal: Terminal,
  account_circle: UserCircle,
  chevron_right: ChevronRight,
  schedule: Clock,
  add_box: PlusSquare,
  schema: FileText,
  view_kanban: Kanban,
  filter_list: Filter,
  data_object: FileJson,
  rule: AlignLeft,
  database: Database,
  more_vert: MoreHorizontal,
  more_horizontal: MoreHorizontal,
  content_copy: Copy,
  download: Download,
  open_in_new: ExternalLink,
  warning: AlertTriangle,
  timer: Timer,
  check: Check,
  expand_more: ChevronUp,
  expand_less: ChevronDown,
  visibility: Eye,
  code: Code,
  tune: Sliders,
  person: UserCircle,
  bolt: Zap,
  arrow_forward: ArrowRight,
  webhook: Webhook,
  dns: Server,
  settings_backup_restore: RotateCcw,
};

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export function Icon({ name, className = '', size = 24 }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} size={size} />;
}
