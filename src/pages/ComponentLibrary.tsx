import { useState } from 'react';
import { PageHeader, PageFooter } from '../components/common';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Toggle } from '../components/ui/Toggle';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusDot } from '../components/ui/StatusDot';
import { Icon } from '../components/ui/Icon';
import { BrutalSpinner, PulseLoader, WaveLoader, TypingLoader, OrbitLoader, StackLoader, DotsLoader, Skeleton, SkeletonCard, LoadingOverlay, PageLoader, InlineLoader, HoneycombLoader } from '../components/ui/Loading';
import { EntityCard } from '../components/common/EntityCard';
import type { Project } from '../types/entities';

type TabId = 'ui' | 'common' | 'features' | 'loading';

interface Tab {
  id: TabId;
  label: string;
  description: string;
}

const tabs: Tab[] = [
  { id: 'ui', label: 'UI Primitives', description: 'Basic building blocks: Button, Badge, Card, Input, Toggle, ProgressBar, StatusDot, Icon' },
  { id: 'loading', label: 'Loading States', description: 'Animated loading components: Spinners, Pulsers, Skeletons, Overlays. All use CSS variables to adapt to theme changes.' },
  { id: 'common', label: 'Common Components', description: 'Reusable composite components: EntityCard, PageHeader, PageFooter, SectionHeader, etc.' },
  { id: 'features', label: 'Feature Components', description: 'Domain-specific components: TacticalVisualizer' },
];

const mockProject: Project = {
  id: 'proj-001',
  name: 'Sample Project',
  description: 'This is a sample project used for component demonstration.',
  status: 'active',
  priority: 'high',
  taskCount: 12,
  lastActivity: '2h ago',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
  recentActivity: '2h ago',
  workflowCount: 3,
  runtime: null,
  constitutionVersion: null,
  constitutionUpdatedAt: null,
};

function UiTab() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Button</h2>
        <Card variant="outlined" padding="md">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Badge</h2>
        <Card variant="outlined" padding="md">
          <div className="flex flex-wrap gap-4">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Card</h2>
        <Card variant="outlined" padding="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" padding="md">
              <p className="font-headline uppercase text-sm">Default Variant</p>
            </Card>
            <Card variant="elevated" padding="md">
              <p className="font-headline uppercase text-sm">Elevated Variant</p>
            </Card>
            <Card variant="outlined" padding="md">
              <p className="font-headline uppercase text-sm">Outlined Variant</p>
            </Card>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Input</h2>
        <Card variant="outlined" padding="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <Input label="Default Input" placeholder="Enter text..." />
            <Input label="With Error" placeholder="Enter text..." error="This field is required" />
            <Input label="Disabled" placeholder="Cannot edit" disabled />
            <Input label="With Default Value" defaultValue="Pre-filled" />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Toggle</h2>
        <Card variant="outlined" padding="md">
          <div className="space-y-4">
            <Toggle label="Toggle Me" defaultChecked />
            <Toggle label="Disabled Off" disabled />
            <Toggle label="Disabled On" disabled defaultChecked />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">ProgressBar</h2>
        <Card variant="outlined" padding="md">
          <div className="space-y-6 max-w-xl">
            <ProgressBar value={0} />
            <ProgressBar value={25} />
            <ProgressBar value={50} />
            <ProgressBar value={75} />
            <ProgressBar value={100} />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">StatusDot</h2>
        <Card variant="outlined" padding="md">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <StatusDot status="online" />
              <span className="font-mono text-sm">online</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status="offline" />
              <span className="font-mono text-sm">offline</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status="warning" />
              <span className="font-mono text-sm">warning</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status="error" />
              <span className="font-mono text-sm">error</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status="online" pulse />
              <span className="font-mono text-sm">online (pulsing)</span>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Icon</h2>
        <Card variant="outlined" padding="md">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Icon name="grid_view" size={24} />
              <span className="font-mono text-[10px]">grid_view</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="task_alt" size={24} />
              <span className="font-mono text-[10px]">task_alt</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="bar_chart" size={24} />
              <span className="font-mono text-[10px]">bar_chart</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="settings" size={24} />
              <span className="font-mono text-[10px]">settings</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="rocket_launch" size={24} />
              <span className="font-mono text-[10px]">rocket_launch</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="arrow_forward" size={24} />
              <span className="font-mono text-[10px]">arrow_forward</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="check" size={24} />
              <span className="font-mono text-[10px]">check</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="warning" size={24} />
              <span className="font-mono text-[10px]">warning</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

function LoadingTab() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Spinners</h2>
        <Card variant="outlined" padding="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <BrutalSpinner size="sm" thickness="thin" />
              <span className="font-mono text-xs text-outline">Thin</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <BrutalSpinner size="md" thickness="medium" />
              <span className="font-mono text-xs text-outline">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <BrutalSpinner size="lg" thickness="thick" />
              <span className="font-mono text-xs text-outline">Thick</span>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Orbit Loader</h2>
        <Card variant="outlined" padding="md">
          <div className="flex justify-center py-4">
            <OrbitLoader size="lg" />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Pulse Loaders</h2>
        <Card variant="outlined" padding="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center gap-4 py-4">
              <PulseLoader size="sm" />
              <span className="font-mono text-xs text-outline">Pulse Small</span>
            </div>
            <div className="flex flex-col items-center gap-4 py-4">
              <PulseLoader size="md" />
              <span className="font-mono text-xs text-outline">Pulse Medium</span>
            </div>
            <div className="flex flex-col items-center gap-4 py-4">
              <DotsLoader size="sm" />
              <span className="font-mono text-xs text-outline">Dots Small</span>
            </div>
            <div className="flex flex-col items-center gap-4 py-4">
              <DotsLoader size="lg" />
              <span className="font-mono text-xs text-outline">Dots Large</span>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Wave & Typing</h2>
        <Card variant="outlined" padding="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center gap-4 py-4">
              <WaveLoader size="sm" />
              <span className="font-mono text-xs text-outline">Wave Small</span>
            </div>
            <div className="flex flex-col items-center gap-4 py-4">
              <WaveLoader size="lg" />
              <span className="font-mono text-xs text-outline">Wave Large</span>
            </div>
            <div className="flex flex-col items-center gap-4 py-4">
              <TypingLoader size="sm" />
              <span className="font-mono text-xs text-outline">Typing Small</span>
            </div>
            <div className="flex flex-col items-center gap-4 py-4">
              <TypingLoader size="lg" />
              <span className="font-mono text-xs text-outline">Typing Large</span>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Stack Loader</h2>
        <Card variant="outlined" padding="md">
          <div className="flex justify-center gap-8 py-4">
            <StackLoader size="sm" />
            <StackLoader size="md" />
            <StackLoader size="lg" />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Inline Loader</h2>
        <Card variant="outlined" padding="md">
          <div className="flex items-center gap-4">
            <span className="font-headline uppercase text-sm">Processing</span>
            <InlineLoader size="sm" />
            <InlineLoader size="md" />
            <InlineLoader size="lg" />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Honeycomb Loader</h2>
        <Card variant="outlined" padding="md">
          <div className="flex justify-center gap-8 py-4">
            <HoneycombLoader size="sm" />
            <HoneycombLoader size="md" />
            <HoneycombLoader size="lg" />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Skeleton</h2>
        <Card variant="outlined" padding="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Skeleton width={120} height={16} />
              <Skeleton width="80%" height={24} />
              <Skeleton width="100%" height={48} />
            </div>
            <SkeletonCard />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Page Loader</h2>
        <Card variant="outlined" padding="md">
          <div className="py-8">
            <PageLoader message="INITIALIZING" />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">Loading Overlay</h2>
        <Card variant="outlined" padding="none">
          <div className="relative h-64">
            <LoadingOverlay message="SYNCING DATA" variant="spinner" />
            <div className="p-4 opacity-50 pointer-events-none">
              <p className="font-headline uppercase text-sm mb-4">Content Behind Overlay</p>
              <Skeleton width="60%" height={20} className="mb-2" />
              <Skeleton width="80%" height={16} className="mb-2" />
              <Skeleton width="40%" height={16} />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

function CommonTab() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">EntityCard</h2>
        <Card variant="outlined" padding="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EntityCard entity={mockProject} type="project" variant="default" />
            <EntityCard entity={mockProject} type="project" variant="compact" />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">PageHeader</h2>
        <Card variant="outlined" padding="none">
          <PageHeader breadcrumb="SHOWCASE" title="Page Title" />
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">CardHeader</h2>
        <Card variant="outlined" padding="none">
          <CardHeader title="Card Title" subtitle="Optional subtitle" />
          <div className="p-4">
            <p className="text-sm text-on-surface-variant">Card content goes here...</p>
          </div>
        </Card>
      </section>
    </div>
  );
}

function FeaturesTab() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-black font-headline uppercase mb-6 border-b-2 border-outline pb-2">TacticalVisualizer</h2>
        <Card variant="outlined" padding="md">
          <p className="text-sm text-on-surface-variant mb-4">
            Domain-specific component for visualizing workflows and task relationships.
          </p>
          <div className="bg-surface-container-lowest border-2 border-dashed border-outline p-8 text-center">
            <Icon name="account_tree" size={48} className="mx-auto text-outline mb-4" />
            <p className="font-mono text-sm text-outline">TacticalVisualizer renders here</p>
          </div>
        </Card>
      </section>
    </div>
  );
}

export function ComponentLibrary() {
  const [activeTab, setActiveTab] = useState<TabId>('loading');

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader breadcrumb="DOCUMENTATION" title="Component Library" />
      
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="border-b-3 border-outline mb-10">
            <nav className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-6 py-4 font-headline font-bold uppercase tracking-widest text-sm
                    border-b-[3px] transition-all
                    ${activeTab === tab.id
                      ? 'border-primary-container text-primary-container bg-surface-container-low'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <p className="text-on-surface-variant mb-8 max-w-2xl">
            {tabs.find(t => t.id === activeTab)?.description}
          </p>

          {activeTab === 'ui' && <UiTab />}
          {activeTab === 'loading' && <LoadingTab />}
          {activeTab === 'common' && <CommonTab />}
          {activeTab === 'features' && <FeaturesTab />}
        </div>
      </main>

      <PageFooter />
    </div>
  );
}