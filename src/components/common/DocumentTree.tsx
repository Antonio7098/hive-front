import { useState } from 'react';
import { Icon } from '../ui';
import type { GovernanceDocument } from '../../types/entities';

interface DocumentTreeProps {
  documents: GovernanceDocument[];
  constitutionName?: string;
  onSelectDocument: (doc: GovernanceDocument) => void;
  onSelectConstitution?: () => void;
  selectedDocumentId?: string;
  selectedType?: 'constitution' | 'document';
  className?: string;
}

interface TreeNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  document?: GovernanceDocument;
}

function buildTree(documents: GovernanceDocument[]): TreeNode[] {
  const root: TreeNode[] = [];
  const folders: Record<string, TreeNode> = {};

  documents.forEach((doc) => {
    const parts = doc.path.split('/').filter(Boolean);
    if (parts.length === 0) return;

    const fileName = parts[parts.length - 1];
    const folderParts = parts.slice(0, -1);
    
    let currentLevel = root;
    let currentPath = '';

    folderParts.forEach((folder) => {
      currentPath += '/' + folder;
      if (!folders[currentPath]) {
        const folderNode: TreeNode = {
          name: folder,
          path: currentPath,
          type: 'folder',
          children: [],
        };
        folders[currentPath] = folderNode;
        currentLevel.push(folderNode);
      }
      currentLevel = folders[currentPath].children!;
    });

    currentLevel.push({
      name: fileName,
      path: doc.path,
      type: 'file',
      document: doc,
    });
  });

  return root;
}

function getFileIcon(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'md':
    case 'markdown':
      return 'description';
    case 'yaml':
    case 'yml':
      return 'data_object';
    default:
      return 'rule';
  }
}

function sortNodes(nodes: TreeNode[]): TreeNode[] {
  return [...nodes].sort((a, b) => {
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });
}

function TreeNodeComponent({
  node,
  level,
  selectedDocumentId,
  selectedType,
  onSelectDocument,
  onSelectConstitution,
}: {
  node: TreeNode;
  level: number;
  selectedDocumentId?: string;
  selectedType?: 'constitution' | 'document';
  onSelectDocument: (doc: GovernanceDocument) => void;
  onSelectConstitution?: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const isSelected = node.document?.id === selectedDocumentId;

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-surface-container-high transition-colors text-left"
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          <Icon
            name={isExpanded ? 'expand_more' : 'chevron_right'}
            className="text-outline"
            size={16}
          />
          <Icon name="folder" className="text-primary-container" size={16} />
          <span className="text-on-surface text-sm font-medium">{node.name}</span>
        </button>
        {isExpanded && node.children && (
          <div>
            {sortNodes(node.children).map((child) => (
              <TreeNodeComponent
                key={child.path}
                node={child}
                level={level + 1}
                selectedDocumentId={selectedDocumentId}
                selectedType={selectedType}
                onSelectDocument={onSelectDocument}
                onSelectConstitution={onSelectConstitution}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => node.document && onSelectDocument(node.document)}
      className={`w-full flex items-center gap-2 px-2 py-1.5 transition-colors text-left ${
        isSelected
          ? 'bg-primary-container/20 text-primary-container'
          : 'hover:bg-surface-container-high text-on-surface-variant'
      }`}
      style={{ paddingLeft: `${level * 16 + 32}px` }}
    >
      <Icon name={getFileIcon(node.name)} className={isSelected ? 'text-primary-container' : 'text-outline'} size={16} />
      <span className="text-sm font-mono truncate">{node.name}</span>
    </button>
  );
}

export function DocumentTree({
  documents,
  constitutionName = 'Constitution',
  onSelectDocument,
  onSelectConstitution,
  selectedDocumentId,
  selectedType,
  className = '',
}: DocumentTreeProps) {
  const tree = buildTree(documents);
  const isConstitutionSelected = selectedType === 'constitution';

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="px-4 py-3 border-b border-outline bg-surface-container">
        <h3 className="font-headline font-bold text-xs uppercase tracking-widest text-on-surface-variant">
          Project Documents
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {onSelectConstitution && (
          <button
            onClick={onSelectConstitution}
            className={`w-full flex items-center gap-2 px-2 py-1.5 transition-colors text-left ${
              isConstitutionSelected
                ? 'bg-primary-container/20 text-primary-container'
                : 'hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            <Icon name="rule" className={isConstitutionSelected ? 'text-primary-container' : 'text-secondary'} size={16} />
            <span className="text-sm font-medium">{constitutionName}</span>
            <span className="ml-auto text-[10px] font-mono text-outline uppercase">v2</span>
          </button>
        )}
        {tree.length > 0 && (
          <div className="mt-2">
            {sortNodes(tree).map((node) => (
              <TreeNodeComponent
                key={node.path}
                node={node}
                level={0}
                selectedDocumentId={selectedDocumentId}
                selectedType={selectedType}
                onSelectDocument={onSelectDocument}
                onSelectConstitution={onSelectConstitution}
              />
            ))}
          </div>
        )}
        {documents.length === 0 && !onSelectConstitution && (
          <div className="px-4 py-8 text-center text-outline text-sm">
            No documents available
          </div>
        )}
      </div>
    </div>
  );
}
