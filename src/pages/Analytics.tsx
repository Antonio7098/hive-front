import { Icon } from '../components/ui';
import { PageHeader, PageFooter } from '../components/common';

export function Analytics() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <PageHeader breadcrumb="Directory / Root / Analytics" title="ANALYTICS" />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <section className="card-brutal p-6">
            <h3 className="font-headline font-black text-xl uppercase tracking-widest mb-6">System_Throughput</h3>
            <div className="h-48 border-2 border-outline bg-surface-container-lowest flex items-center justify-center">
              <div className="text-center">
                <Icon name="bar_chart" size={48} className="text-outline mb-4" />
                <span className="text-outline font-mono text-sm">THROUGHPUT_GRAPH_PLACEHOLDER</span>
              </div>
            </div>
          </section>

          <section className="card-brutal p-6">
            <h3 className="font-headline font-black text-xl uppercase tracking-widest mb-6">Resource_Utilization</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="border-2 border-outline p-4 text-center">
                <div className="text-3xl font-black font-headline text-primary-container mb-2">24%</div>
                <div className="text-xs font-mono text-outline uppercase">CPU_LOAD</div>
              </div>
              <div className="border-2 border-outline p-4 text-center">
                <div className="text-3xl font-black font-headline text-secondary-container mb-2">6.2GB</div>
                <div className="text-xs font-mono text-outline uppercase">MEM_USAGE</div>
              </div>
              <div className="border-2 border-outline p-4 text-center">
                <div className="text-3xl font-black font-headline text-tertiary mb-2">120MB/s</div>
                <div className="text-xs font-mono text-outline uppercase">DISK_IO</div>
              </div>
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="card-brutal p-6">
            <h3 className="font-headline font-black text-xl uppercase tracking-widest mb-6">Project_Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-2 border-outline pb-4">
                <span className="text-sm font-headline">ACTIVE_PROJECTS</span>
                <span className="text-xl font-black text-primary-container">08</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-outline pb-4">
                <span className="text-sm font-headline">TOTAL_WORKFLOWS</span>
                <span className="text-xl font-black text-secondary-container">24</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-outline pb-4">
                <span className="text-sm font-headline">TOTAL_TASKS</span>
                <span className="text-xl font-black text-tertiary">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-headline">COMPLETED_TODAY</span>
                <span className="text-xl font-black text-on-surface">12</span>
              </div>
            </div>
          </section>

          <section className="card-brutal p-6">
            <h3 className="font-headline font-black text-xl uppercase tracking-widest mb-6">Health_Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 bg-primary-container animate-pulse"></span>
                <span className="text-sm font-headline">SYSTEM_NOMINAL</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 bg-secondary-container"></span>
                <span className="text-sm font-headline">DATABASE_SYNCED</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 bg-primary-container"></span>
                <span className="text-sm font-headline">SECURE_LINK_ESTABLISHED</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
