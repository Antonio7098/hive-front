import { Icon, Badge } from '../ui';
import type { SpecTreeNode, SpecStepNode } from '../../types/entities';

interface SpecNodeProps {
  node: SpecTreeNode | SpecStepNode;
  className?: string;
}

function isTreeNode(node: SpecTreeNode | SpecStepNode): node is SpecTreeNode {
  return 'kind' in node && (node.kind === 'workflow' || node.kind === 'task');
}

function getNodeId(node: SpecTreeNode | SpecStepNode): string {
  if (isTreeNode(node) && node.step_id) return node.step_id;
  return node.id;
}

export function SpecNode({ node, className = '' }: SpecNodeProps) {
  const kind = isTreeNode(node) ? node.kind : 'task';
  const isWorkflow = kind === 'workflow';

  return (
    <div className={`bg-surface-container border-2 border-outline p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 border ${isWorkflow ? 'bg-secondary-container/20 border-secondary-container' : 'bg-primary-container/20 border-primary-container'}`}>
            <Icon
              name={isWorkflow ? 'account_tree' : 'task_alt'}
              className={isWorkflow ? 'text-secondary-container' : 'text-primary-container'}
              size={18}
            />
          </div>
          <div>
            <Badge variant={isWorkflow ? 'secondary' : 'primary'}>
              {kind.toUpperCase()}
            </Badge>
            <p className="font-mono text-xs text-outline mt-1 uppercase tracking-widest">
              ID: {getNodeId(node)}
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-black font-headline text-on-surface mb-4 uppercase tracking-tight">
        {node.title}
      </h3>

      {node.intent && (
        <div className="mb-6">
          <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-outline mb-2">
            Intent
          </h4>
          <p className="text-on-surface-variant leading-relaxed border-l-4 border-primary-container pl-4">
            {node.intent}
          </p>
        </div>
      )}

      {node.scope && (
        <div className="mb-6">
          <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-outline mb-2">
            Scope
          </h4>
          <p className="text-on-surface-variant leading-relaxed">
            {node.scope}
          </p>
        </div>
      )}

      {node.constraints && node.constraints.length > 0 && (
        <div className="mb-6">
          <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-outline mb-2">
            Constraints
          </h4>
          <ul className="space-y-1">
            {node.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">▸</span>
                <span className="text-on-surface-variant text-sm">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {node.acceptance_criteria && node.acceptance_criteria.length > 0 && (
        <div className="mb-6">
          <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-outline mb-2">
            Acceptance Criteria
          </h4>
          <ul className="space-y-1">
            {node.acceptance_criteria.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary-container mt-0.5">▸</span>
                <span className="text-on-surface-variant text-sm">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {node.verification && (
        <div className="pt-4 border-t border-outline-variant">
          <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-outline mb-2">
            Verification Posture
          </h4>
          <p className="text-on-surface-variant text-sm mb-2">
            {node.verification.posture}
          </p>
          {node.verification.instructions && node.verification.instructions.length > 0 && (
            <ul className="space-y-1 mt-2">
              {node.verification.instructions.map((ins, i) => (
                <li key={i} className="text-on-surface-variant text-xs">
                  → {ins}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {isTreeNode(node) && node.children && node.children.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 border-outline">
          <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-outline mb-4">
            Child Nodes ({node.children.length})
          </h4>
          <div className="space-y-3">
            {node.children.map((child) => (
              <SpecNode key={child.id} node={child} className="border-dashed" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
