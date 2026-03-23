import { ReactNode } from 'react';

interface DetailFooterProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  className?: string;
}

export function DetailFooter({ leftContent, rightContent, className = '' }: DetailFooterProps) {
  return (
    <footer className={`mt-auto bg-surface-container-highest border-t-3 border-outline px-6 py-2 flex justify-between items-center ${className}`}>
      {leftContent}
      {rightContent}
    </footer>
  );
}
