import { useMemo } from 'react';

interface YamlRendererProps {
  content: string;
  className?: string;
}

interface ParsedLine {
  indent: number;
  key?: string;
  value?: string;
  type: 'key-value' | 'list-item' | 'comment' | 'blank';
}

function parseYaml(content: string): ParsedLine[] {
  const lines = content.split('\n');
  return lines.map((line) => {
    const indent = line.search(/\S/);
    const trimmed = line.trim();

    if (trimmed === '' || trimmed.startsWith('#')) {
      return { indent: indent >= 0 ? indent : 0, type: trimmed.startsWith('#') ? 'comment' : 'blank' as const };
    }

    if (trimmed.startsWith('- ')) {
      const value = trimmed.slice(2);
      return { indent, value, type: 'list-item' as const };
    }

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.slice(0, colonIndex);
      const value = trimmed.slice(colonIndex + 1).trim();
      return { indent, key, value, type: 'key-value' as const };
    }

    return { indent, value: trimmed, type: 'key-value' as const };
  });
}

export function YamlRenderer({ content, className = '' }: YamlRendererProps) {
  const lines = useMemo(() => parseYaml(content), [content]);

  return (
    <pre className={`bg-black/50 border border-outline-variant p-4 overflow-x-auto font-mono text-xs leading-relaxed ${className}`}>
      <code>
        {lines.map((line, i) => {
          if (line.type === 'blank') {
            return <br key={i} />;
          }

          if (line.type === 'comment') {
            return (
              <span key={i} className="text-outline italic">
                {'  '.repeat(line.indent)}{line.type === 'comment' ? content.split('\n')[i].trim() : ''}
                <br />
              </span>
            );
          }

          return (
            <div key={i}>
              {'  '.repeat(line.indent)}
              {line.type === 'list-item' ? (
                <>
                  <span className="text-secondary">- </span>
                  <span className="text-primary-container">{line.value}</span>
                </>
              ) : (
                <>
                  <span className="text-tertiary">{line.key}</span>
                  <span className="text-outline">: </span>
                  {line.value ? (
                    line.value.startsWith('[') || line.value.startsWith('{') || line.value === 'true' || line.value === 'false' || !isNaN(Number(line.value)) ? (
                      <span className="text-secondary">{line.value}</span>
                    ) : line.value.includes(':') || line.value.includes('#') ? (
                      <>
                        <span className="text-primary-container">"</span>
                        <span className="text-primary-container">{line.value}</span>
                        <span className="text-primary-container">"</span>
                      </>
                    ) : (
                      <span className="text-primary-container">"{line.value}"</span>
                    )
                  ) : null}
                </>
              )}
              <br />
            </div>
          );
        })}
      </code>
    </pre>
  );
}
