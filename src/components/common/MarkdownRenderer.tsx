import { ReactNode } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function parseInline(text: string): ReactNode {
  const result: ReactNode[] = [];
  const lines = text.split('\n');

  lines.forEach((line, lineIndex) => {
    const parts: ReactNode[] = [];
    let remaining = line;
    let keyOffset = lineIndex * 1000;

    const codeRegex = /`([^`]+)`/g;
    let match;
    let lastIdx = 0;

    while ((match = codeRegex.exec(remaining)) !== null) {
      if (match.index > lastIdx) {
        parts.push(remaining.slice(lastIdx, match.index));
      }
      parts.push(
        <code
          key={`code-${keyOffset + match.index}`}
          className="bg-black/50 px-1.5 py-0.5 font-mono text-xs text-primary-container border border-outline-variant"
        >
          {match[1]}
        </code>
      );
      lastIdx = codeRegex.lastIndex;
    }

    if (lastIdx < remaining.length) {
      parts.push(remaining.slice(lastIdx));
    }

    result.push(
      <span key={lineIndex} className="inline">
        {parts.length > 0 ? parts : line}
      </span>
    );

    if (lineIndex < lines.length - 1) {
      result.push(<br key={`br-${lineIndex}`} />);
    }
  });

  return <>{result}</>;
}

function parseMarkdown(content: string): ReactNode[] {
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let i = 0;
  let keyIndex = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={`code-${keyIndex++}`} className="bg-black/50 border border-outline-variant p-4 overflow-x-auto my-4">
          <code className="font-mono text-xs text-primary-container leading-relaxed">
            {codeLines.join('\n')}
          </code>
        </pre>
      );
      i++;
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${keyIndex++}`} className="text-3xl font-black font-headline text-primary-container mt-8 mb-4 tracking-tight">
          {parseInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${keyIndex++}`} className="text-2xl font-black font-headline text-primary-container mt-8 mb-4 tracking-tight">
          {parseInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${keyIndex++}`} className="text-xl font-black font-headline text-primary-container mt-6 mb-3 tracking-tight">
          {parseInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={`h4-${keyIndex++}`} className="text-lg font-black font-headline text-on-surface mt-4 mb-2 tracking-tight">
          {parseInline(line.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${keyIndex++}`} className="list-none space-y-2 my-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-primary-container mt-1">▸</span>
              <span className="text-on-surface leading-relaxed flex-1">{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.match(/^\d+\.\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${keyIndex++}`} className="list-none counterincrement: ol-counter space-y-2 my-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-primary-container font-mono text-sm mt-0.5">{idx + 1}.</span>
              <span className="text-on-surface leading-relaxed flex-1">{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={`quote-${keyIndex++}`}
          className="border-l-4 border-secondary-container pl-4 py-2 my-4 bg-surface-container-low"
        >
          <span className="text-on-surface-variant italic">{parseInline(quoteLines.join(' '))}</span>
        </blockquote>
      );
      continue;
    }

    if (line.match(/^[-]{3,}$/)) {
      elements.push(<hr key={`hr-${keyIndex++}`} className="border-outline my-6" />);
      i++;
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    elements.push(
      <p key={`p-${keyIndex++}`} className="text-on-surface leading-relaxed my-3">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose-custom ${className}`}>
      <style>{`
        .prose-custom h1:first-child,
        .prose-custom h2:first-child,
        .prose-custom h3:first-child {
          margin-top: 0;
        }
      `}</style>
      {parseMarkdown(content)}
    </div>
  );
}
