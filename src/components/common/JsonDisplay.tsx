import { useState } from 'react';

interface JsonDisplayProps {
  data: unknown;
  className?: string;
}

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function isObject(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function JsonNode({ value, depth = 0 }: { value: JsonValue; depth?: number }) {
  if (value === null) {
    return <span className="text-outline italic">null</span>;
  }

  if (typeof value === 'string') {
    return <span className="text-primary-container">"{value}"</span>;
  }

  if (typeof value === 'number') {
    return <span className="text-secondary">"{value}"</span>;
  }

  if (typeof value === 'boolean') {
    return <span className="text-tertiary">{value.toString()}</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-outline">[]</span>;
    }

    const entries: { key: string; value: JsonValue }[] = value.map((v, i) => ({ key: String(i), value: v }));

    return (
      <span className="inline">
        <span className="text-outline">[</span>
        <div className="pl-6 border-l border-outline-variant ml-1">
          {entries.map((entry, i) => (
            <div key={entry.key}>
              <span className="text-outline mr-2">{entry.key}:</span>
              <JsonNode value={entry.value} depth={depth + 1} />
              {i < entries.length - 1 && <span className="text-outline">,</span>}
            </div>
          ))}
        </div>
        <span className="text-outline">]</span>
      </span>
    );
  }

  if (isObject(value)) {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return <span className="text-outline">{'{}'}</span>;
    }

    return (
      <span className="inline">
        <span className="text-outline">{'{'}</span>
        <div className="pl-6 border-l border-outline-variant ml-1">
          {entries.map(([key, val], i) => (
            <div key={key}>
              <span className="text-tertiary">"{key}"</span>
              <span className="text-outline">: </span>
              <JsonNode value={val} depth={depth + 1} />
              {i < entries.length - 1 && <span className="text-outline">,</span>}
            </div>
          ))}
        </div>
        <span className="text-outline">{'}'}</span>
      </span>
    );
  }

  return <span className="text-outline">{String(value)}</span>;
}

export function JsonDisplay({ data, className = '' }: JsonDisplayProps) {
  const [isRaw, setIsRaw] = useState(false);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center justify-end mb-3">
        <div className="flex items-center gap-2 bg-surface-container border border-outline">
          <button
            onClick={() => setIsRaw(false)}
            className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              !isRaw
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Formatted
          </button>
          <button
            onClick={() => setIsRaw(true)}
            className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              isRaw
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Raw
          </button>
        </div>
      </div>

      <div className="bg-black/50 border border-outline-variant overflow-hidden">
        {isRaw ? (
          <pre className="p-4 font-mono text-xs text-primary-container leading-relaxed overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
            <JsonNode value={data as JsonValue} />
          </div>
        )}
      </div>
    </div>
  );
}
