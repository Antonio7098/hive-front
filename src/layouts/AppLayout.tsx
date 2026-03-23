import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen honeycomb-pattern">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <TopBar />
        {children}
      </main>
    </div>
  );
}
