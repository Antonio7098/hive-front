import { Icon, Button } from '../ui';

interface CodeViewerProps {
  filename?: string;
  code: string;
  className?: string;
}

export function CodeViewer({ filename, code, className = '' }: CodeViewerProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {filename && (
        <div className="bg-outline text-black font-headline font-black px-4 py-2 text-xs tracking-widest uppercase flex justify-between">
          <span>{filename}</span>
          <span>ENC: AES-256</span>
        </div>
      )}
      <div className="p-6">
        <div className="bg-black/50 p-4 border border-outline-variant mono-text text-xs leading-relaxed text-primary-container overflow-x-auto">
          <pre>{code}</pre>
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" size="sm" className="flex-1">
            <Icon name="content_copy" className="align-middle mr-1" size={18} /> Copy
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            <Icon name="download" className="align-middle mr-1" size={18} /> Export
          </Button>
        </div>
      </div>
    </div>
  );
}
