import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Toggle } from '../components/ui/Toggle';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusDot } from '../components/ui/StatusDot';
import { Icon } from '../components/ui/Icon';
import { BrutalSpinner, OrbitLoader, PulseLoader, WaveLoader, TypingLoader, StackLoader, DotsLoader, ShimmerLoader, HoneycombLoader, Skeleton, SkeletonCard, LoadingOverlay, PageLoader, InlineLoader, ButtonLoader } from '../components/ui/Loading';
import { EntityCard } from '../components/common/EntityCard';
import { PageHeader } from '../components/common/PageHeader';
import { PageFooter } from '../components/common/PageFooter';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatsBar } from '../components/common/StatsBar';
import { InfoGrid } from '../components/common/InfoGrid';
import { DetailFooter } from '../components/common/DetailFooter';
import { SubtaskList } from '../components/common/SubtaskList';
import { QuickLinks } from '../components/common/QuickLinks';
import { CodeViewer } from '../components/common/CodeViewer';
import { SpecBlock } from '../components/common/SpecBlock';
import { HealthBar } from '../components/common/HealthBar';
import { AddCard } from '../components/common/AddCard';
import { ViewSwitcher } from '../components/common/ViewSwitcher';
import { RecentProjectsWidget } from '../components/common/RecentProjectsWidget';
import { TodoWidget } from '../components/common/TodoWidget';
import { ActiveWidget } from '../components/common/ActiveWidget';
import { MetadataRow } from '../components/common/MetadataRow';
import { Toolbar } from '../components/common/Toolbar';
import { ExpandableItem } from '../components/common/ExpandableItem';
import { DetailSection } from '../components/common/DetailSection';
import { TacticalVisualizer } from '../components/features/TacticalVisualizer';

export interface ComponentCatalogEntry {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
  category: 'ui' | 'common' | 'features';
  description?: string;
}

export const componentCatalog: ComponentCatalogEntry[] = [
  { name: 'Button', component: Button, category: 'ui', description: 'Interactive button with variants: primary, secondary, ghost, danger' },
  { name: 'Badge', component: Badge, category: 'ui', description: 'Status indicator with variants: primary, secondary, success, warning, error, neutral' },
  { name: 'Card', component: Card, category: 'ui', description: 'Container component with variants: default, elevated, outlined' },
  { name: 'CardHeader', component: CardHeader, category: 'ui', description: 'Card header with title and optional subtitle' },
  { name: 'Input', component: Input, category: 'ui', description: 'Text input field with label and error states' },
  { name: 'Toggle', component: Toggle, category: 'ui', description: 'Boolean toggle switch with label' },
  { name: 'ProgressBar', component: ProgressBar, category: 'ui', description: 'Linear progress indicator with percentage' },
  { name: 'StatusDot', component: StatusDot, category: 'ui', description: 'Small status indicator: online, offline, warning, error' },
  { name: 'Icon', component: Icon, category: 'ui', description: 'Icon component with lucide-react icon library' },
  { name: 'BrutalSpinner', component: BrutalSpinner, category: 'ui', description: 'Hexagonal spinning loader' },
  { name: 'OrbitLoader', component: OrbitLoader, category: 'ui', description: 'Dual hexagonal orbit loader' },
  { name: 'PulseLoader', component: PulseLoader, category: 'ui', description: 'Pulsing hexagonal dots' },
  { name: 'WaveLoader', component: WaveLoader, category: 'ui', description: 'Staggered wave animation' },
  { name: 'TypingLoader', component: TypingLoader, category: 'ui', description: 'Typing indicator style' },
  { name: 'StackLoader', component: StackLoader, category: 'ui', description: 'Stacked elements animation' },
  { name: 'DotsLoader', component: DotsLoader, category: 'ui', description: 'Bouncing dots animation' },
  { name: 'ShimmerLoader', component: ShimmerLoader, category: 'ui', description: 'Shimmer sweep effect' },
  { name: 'HoneycombLoader', component: HoneycombLoader, category: 'ui', description: '3x3 honeycomb grid' },
  { name: 'Skeleton', component: Skeleton, category: 'ui', description: 'Content placeholder shape' },
  { name: 'SkeletonCard', component: SkeletonCard, category: 'ui', description: 'Full card skeleton' },
  { name: 'LoadingOverlay', component: LoadingOverlay, category: 'ui', description: 'Full overlay loading state' },
  { name: 'PageLoader', component: PageLoader, category: 'ui', description: 'Full page loading state' },
  { name: 'InlineLoader', component: InlineLoader, category: 'ui', description: 'Small inline spinner' },
  { name: 'ButtonLoader', component: ButtonLoader, category: 'ui', description: 'Button loading indicator' },
  { name: 'EntityCard', component: EntityCard, category: 'common', description: 'Card for displaying Project, Workflow, or Task entities' },
  { name: 'PageHeader', component: PageHeader, category: 'common', description: 'Page header with breadcrumb and title' },
  { name: 'PageFooter', component: PageFooter, category: 'common', description: 'Page footer component' },
  { name: 'SectionHeader', component: SectionHeader, category: 'common', description: 'Section header with title and action' },
  { name: 'StatsBar', component: StatsBar, category: 'common', description: 'Statistics display bar' },
  { name: 'InfoGrid', component: InfoGrid, category: 'common', description: 'Grid for key-value info display' },
  { name: 'DetailFooter', component: DetailFooter, category: 'common', description: 'Footer for detail pages' },
  { name: 'SubtaskList', component: SubtaskList, category: 'common', description: 'List of subtasks' },
  { name: 'QuickLinks', component: QuickLinks, category: 'common', description: 'Quick navigation links' },
  { name: 'CodeViewer', component: CodeViewer, category: 'common', description: 'Code/monospace content viewer' },
  { name: 'SpecBlock', component: SpecBlock, category: 'common', description: 'Specification block' },
  { name: 'HealthBar', component: HealthBar, category: 'common', description: 'System health indicator' },
  { name: 'AddCard', component: AddCard, category: 'common', description: 'Card for adding new items' },
  { name: 'ViewSwitcher', component: ViewSwitcher, category: 'common', description: 'Toggle between view modes' },
  { name: 'RecentProjectsWidget', component: RecentProjectsWidget, category: 'common', description: 'Recent projects list widget' },
  { name: 'TodoWidget', component: TodoWidget, category: 'common', description: 'Todo items widget' },
  { name: 'ActiveWidget', component: ActiveWidget, category: 'common', description: 'Active items widget' },
  { name: 'MetadataRow', component: MetadataRow, category: 'common', description: 'Metadata key-value row' },
  { name: 'Toolbar', component: Toolbar, category: 'common', description: 'Action toolbar' },
  { name: 'ExpandableItem', component: ExpandableItem, category: 'common', description: 'Expandable/collapsible item' },
  { name: 'DetailSection', component: DetailSection, category: 'common', description: 'Section for detail pages' },
  { name: 'TacticalVisualizer', component: TacticalVisualizer, category: 'features', description: 'Workflow and task relationship visualizer' },
];

export function getComponentsByCategory(category: 'ui' | 'common' | 'features') {
  return componentCatalog.filter(c => c.category === category);
}

export function getComponent(name: string) {
  return componentCatalog.find(c => c.name === name);
}
