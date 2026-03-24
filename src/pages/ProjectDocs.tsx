import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Toolbar, DocumentTree, DocumentViewer, DocumentEmptyState, DocumentMetadata, MarkdownRenderer, YamlRenderer } from '../components/common';
import { Button, Icon } from '../components/ui';
import { useProject, useConstitution, useGovernanceDocuments, useGovernanceDocument } from '../hooks';
import type { GovernanceDocument, Constitution } from '../types/entities';

type ViewType = 'constitution' | 'document' | 'notepad' | 'empty';

export function ProjectDocs() {
  const { id } = useParams();
  const { project, isLoading: projectLoading } = useProject(id);
  const { constitution, isLoading: constitutionLoading } = useConstitution(id);
  const { documents, isLoading: documentsLoading } = useGovernanceDocuments(id);

  const [selectedType, setSelectedType] = useState<ViewType>('empty');
  const [selectedDocId, setSelectedDocId] = useState<string | undefined>();
  const { document: selectedDoc } = useGovernanceDocument(id, selectedDocId);

  useEffect(() => {
    if (!constitutionLoading && !documentsLoading) {
      if (documents.length > 0 && selectedType === 'empty') {
        setSelectedType('document');
        setSelectedDocId(documents[0].id);
      } else if (constitution && selectedType === 'empty') {
        setSelectedType('constitution');
      }
    }
  }, [constitutionLoading, documentsLoading, constitution, documents, selectedType]);

  const handleSelectConstitution = () => {
    setSelectedType('constitution');
    setSelectedDocId(undefined);
  };

  const handleSelectDocument = (doc: GovernanceDocument) => {
    setSelectedType('document');
    setSelectedDocId(doc.id);
  };

  const renderContent = () => {
    if (selectedType === 'constitution' && constitution) {
      return <ConstitutionView constitution={constitution} />;
    }

    if (selectedType === 'document' && selectedDoc) {
      return <DocumentView document={selectedDoc} />;
    }

    return (
      <DocumentEmptyState
        icon="rule"
        title="Select a Document"
        description="Choose a document from the tree on the left to view its contents"
      />
    );
  };

  const isLoading = projectLoading || constitutionLoading || documentsLoading;

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center h-64">
          <span className="font-mono text-primary-container">LOADING...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center h-64">
          <span className="font-mono text-error">PROJECT NOT FOUND</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Toolbar
        tabs={[
          { label: 'Overview', path: `/projects/${id}` },
          { label: 'Workflows', path: `/projects/${id}/workflows` },
          { label: 'Docs', path: `/projects/${id}/docs` },
          { label: 'Settings', path: `/projects/${id}/settings` },
        ]}
        activeTab="Docs"
      />

      <div className="flex-1 flex overflow-hidden p-6">
        <div className="w-72 flex-shrink-0 border-r-2 border-outline bg-surface-container-lowest overflow-hidden">
          <DocumentTree
            documents={documents}
            constitutionName={`Constitution v${project.constitutionVersion || '?'}`}
            onSelectConstitution={constitution ? handleSelectConstitution : undefined}
            onSelectDocument={handleSelectDocument}
            selectedDocumentId={selectedDocId}
            selectedType={selectedType === 'constitution' ? 'constitution' : 'document'}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function ConstitutionView({ constitution }: { constitution: Constitution }) {
  return (
    <DocumentViewer
      title="Constitution"
      subtitle={`Version ${constitution.version}`}
      actions={
        <div className="flex items-center gap-2">
          {constitution.digest && (
            <span className="font-mono text-[10px] text-outline">
              DIGEST: {constitution.digest.slice(0, 16)}...
            </span>
          )}
          <Button variant="ghost" size="sm">
            <Icon name="content_copy" size={16} />
          </Button>
        </div>
      }
    >
      <div className="max-w-4xl">
        <DocumentMetadata
          items={[
            { label: 'Version', value: String(constitution.version) },
            { label: 'Digest', value: constitution.digest ? constitution.digest.slice(0, 24) + '...' : 'N/A' },
            { label: 'Updated', value: constitution.updatedAt ? constitution.updatedAt.toLocaleDateString() : 'N/A' },
          ]}
          className="mb-8"
        />
        <div className="bg-surface-container border-2 border-outline p-6">
          <MarkdownRenderer content={constitution.content} />
        </div>
      </div>
    </DocumentViewer>
  );
}

function DocumentView({ document }: { document: GovernanceDocument }) {
  return (
    <DocumentViewer
      title={document.name}
      subtitle={document.path}
      actions={
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-outline uppercase">
            {document.documentType}
          </span>
          <span className="text-outline mx-2">|</span>
          <span className="font-mono text-[10px] text-outline">
            Updated: {document.updatedAt.toLocaleDateString()}
          </span>
          <Button variant="ghost" size="sm">
            <Icon name="content_copy" size={16} />
          </Button>
        </div>
      }
    >
      <div className="max-w-4xl">
        {document.documentType === 'markdown' || document.documentType === 'text' ? (
          <div className="bg-surface-container border-2 border-outline p-6">
            <MarkdownRenderer content={document.content} />
          </div>
        ) : document.documentType === 'yaml' ? (
          <div className="bg-surface-container border-2 border-outline p-6">
            <YamlRenderer content={document.content} />
          </div>
        ) : (
          <pre className="bg-black/50 border border-outline-variant p-4 overflow-x-auto font-mono text-xs text-primary-container">
            {document.content}
          </pre>
        )}
      </div>
    </DocumentViewer>
  );
}
