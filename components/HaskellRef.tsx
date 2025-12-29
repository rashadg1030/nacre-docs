'use client';

import { useState, useMemo, type ReactNode } from 'react';

// Types for different Haskell definitions
interface BaseRef {
  name: string;
  module?: string;
  description?: ReactNode;
  since?: string;
  deprecated?: string;
  example?: string;
}

interface ValueRef extends BaseRef {
  kind: 'value' | 'function';
  signature: string;
}

interface TypeRef extends BaseRef {
  kind: 'type' | 'newtype' | 'data';
  params?: string[];
  constructors?: ConstructorDef[];
  instances?: string[];
}

interface ConstructorDef {
  name: string;
  fields?: { name: string; type: string }[];
  args?: string[];
}

interface TypeclassRef extends BaseRef {
  kind: 'class';
  params: string[];
  constraints?: string[];
  methods: MethodDef[];
  laws?: string[];
}

interface MethodDef {
  name: string;
  signature: string;
  description?: string;
  default?: boolean;
}

export type HaskellDef = ValueRef | TypeRef | TypeclassRef;

// Kind badge colors
const kindColors: Record<string, string> = {
  value: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  function: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  type: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  newtype: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  data: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  class: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
};

// Badge component
function KindBadge({ kind }: { kind: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${kindColors[kind] || 'bg-fd-muted text-fd-muted-foreground'}`}>
      {kind}
    </span>
  );
}

function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'warning' | 'info' }) {
  const styles = {
    default: 'bg-fd-muted text-fd-muted-foreground',
    warning: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
    info: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  };

  return (
    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

// Simple Haskell syntax highlighting
function highlightHaskell(code: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  // Combined regex for all patterns
  const combined = /(\b(?:data|type|newtype|class|instance|where|let|in|case|of|if|then|else|do|module|import|forall)\b)|(::|\->|=>|<\-|\||\$|&|\.)|(\b[A-Z][a-zA-Z0-9_']*\b)|('[^']*')/g;

  let match;
  while ((match = combined.exec(code)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(code.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Keyword
      parts.push(
        <span key={match.index} className="text-pink-500 dark:text-pink-400">
          {match[0]}
        </span>
      );
    } else if (match[2]) {
      // Operator
      parts.push(
        <span key={match.index} className="text-cyan-500 dark:text-cyan-400">
          {match[0]}
        </span>
      );
    } else if (match[3]) {
      // Type (capitalized)
      parts.push(
        <span key={match.index} className="text-amber-500 dark:text-amber-400">
          {match[0]}
        </span>
      );
    } else if (match[4]) {
      // Type-level string
      parts.push(
        <span key={match.index} className="text-green-500 dark:text-green-400">
          {match[0]}
        </span>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < code.length) {
    parts.push(code.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [code];
}

// Get the full signature for display
function getSignature(def: HaskellDef): string {
  switch (def.kind) {
    case 'value':
    case 'function':
      return def.signature;
    case 'type':
    case 'newtype':
    case 'data':
      return `${def.kind} ${def.name}${def.params ? ' ' + def.params.join(' ') : ''}`;
    case 'class':
      const constraints = def.constraints?.length ? `(${def.constraints.join(', ')}) => ` : '';
      return `class ${constraints}${def.name} ${def.params.join(' ')} where`;
  }
}

// Check if there are any details to show
function hasDetails(def: HaskellDef): boolean {
  if (def.description || def.example || def.module || def.since || def.deprecated) return true;
  if (def.kind === 'data' || def.kind === 'newtype' || def.kind === 'type') {
    const typeDef = def as TypeRef;
    if (typeDef.constructors?.length || typeDef.instances?.length) return true;
  }
  if (def.kind === 'class') {
    const classDef = def as TypeclassRef;
    if (classDef.methods?.length || classDef.laws?.length) return true;
  }
  return false;
}

export function HaskellRef({ def }: { def: HaskellDef }) {
  const [expanded, setExpanded] = useState(false);
  const showDetails = hasDetails(def);

  return (
    <div className="border border-fd-border rounded-lg overflow-hidden">
      {/* Main signature row - grid with fixed badge column */}
      <div className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 p-3">
        <div>
          <KindBadge kind={def.kind} />
        </div>
        <code className="font-mono text-xs overflow-x-auto">
          {highlightHaskell(getSignature(def))}
        </code>
        <div className="flex items-center gap-2">
          {def.deprecated && <Badge variant="warning">deprecated</Badge>}
          {def.since && <Badge variant="info">{def.since}</Badge>}
        </div>
      </div>

      {/* Expand button row */}
      {showDetails && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-2 px-3 py-2 border-t border-fd-border text-sm text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-muted/30 transition-colors"
        >
          <span className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
          <span>{expanded ? 'Collapse' : 'Expand'}</span>
        </button>
      )}

      {/* Expanded details */}
      {expanded && showDetails && (
        <div className="border-t border-fd-border p-4 space-y-4 bg-fd-card/50">
          {/* Module */}
          {def.module && (
            <div>
              <div className="text-xs text-fd-muted-foreground mb-1">Module</div>
              <code className="text-sm">{def.module}</code>
            </div>
          )}

          {/* Description */}
          {def.description && (
            <div>
              <div className="text-xs text-fd-muted-foreground mb-1">Description</div>
              <div className="text-sm">{def.description}</div>
            </div>
          )}

          {/* Constructors (for data types) */}
          {(def.kind === 'data' || def.kind === 'newtype') && (def as TypeRef).constructors?.length ? (
            <div>
              <div className="text-xs text-fd-muted-foreground mb-1">Constructors</div>
              <div className="space-y-2">
                {(def as TypeRef).constructors!.map((ctor) => (
                  <div key={ctor.name} className="p-2 bg-fd-muted/30 rounded">
                    <code className="font-mono text-sm font-medium">{ctor.name}</code>
                    {ctor.fields && (
                      <div className="mt-1 pl-4 space-y-1">
                        {ctor.fields.map((field) => (
                          <div key={field.name} className="text-sm font-mono">
                            <span className="text-fd-muted-foreground">{field.name}</span>
                            <span className="text-cyan-500 dark:text-cyan-400"> :: </span>
                            <span className="text-amber-500 dark:text-amber-400">{field.type}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {ctor.args && (
                      <span className="text-sm text-fd-muted-foreground ml-2 font-mono">
                        {ctor.args.join(' ')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Instances (for data types) */}
          {(def.kind === 'data' || def.kind === 'newtype' || def.kind === 'type') && (def as TypeRef).instances?.length ? (
            <div>
              <div className="text-xs text-fd-muted-foreground mb-1">Instances</div>
              <div className="space-y-1">
                {(def as TypeRef).instances!.map((inst, i) => (
                  <code key={i} className="block text-sm font-mono">
                    {highlightHaskell(inst)}
                  </code>
                ))}
              </div>
            </div>
          ) : null}

          {/* Methods (for typeclasses) */}
          {def.kind === 'class' && (def as TypeclassRef).methods?.length ? (
            <div>
              <div className="text-xs text-fd-muted-foreground mb-1">Methods</div>
              <div className="space-y-2">
                {(def as TypeclassRef).methods.map((method) => (
                  <div key={method.name} className="p-2 bg-fd-muted/30 rounded">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-sm font-medium">{method.name}</code>
                      {method.default && <Badge>default</Badge>}
                    </div>
                    <code className="block text-sm mt-1 font-mono">
                      {highlightHaskell(method.signature)}
                    </code>
                    {method.description && (
                      <p className="text-sm mt-1">{method.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Laws (for typeclasses) */}
          {def.kind === 'class' && (def as TypeclassRef).laws?.length ? (
            <div>
              <div className="text-xs text-fd-muted-foreground mb-1">Laws</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {(def as TypeclassRef).laws!.map((law, i) => (
                  <li key={i}><code>{law}</code></li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Example */}
          {def.example && (
            <div>
              <div className="text-xs text-fd-muted-foreground mb-1">Example</div>
              <pre className="p-2 bg-fd-muted/50 rounded text-sm overflow-x-auto">
                <code>{def.example}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Filter button component
function FilterButton({
  kind,
  active,
  count,
  onClick
}: {
  kind: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  const baseColors = kindColors[kind] || 'bg-fd-muted text-fd-muted-foreground';

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        active
          ? `${baseColors} ring-2 ring-offset-2 ring-offset-fd-background ring-current`
          : 'bg-fd-muted/50 text-fd-muted-foreground hover:bg-fd-muted'
      }`}
    >
      {kind} <span className="opacity-60">({count})</span>
    </button>
  );
}

// Filterable list of Haskell definitions
export function HaskellRefList({ defs }: { defs: HaskellDef[] }) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  // Get unique kinds and their counts
  const kindCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const def of defs) {
      counts[def.kind] = (counts[def.kind] || 0) + 1;
    }
    return counts;
  }, [defs]);

  const kinds = Object.keys(kindCounts);

  // Filter definitions
  const filteredDefs = useMemo(() => {
    if (activeFilters.size === 0) return defs;
    return defs.filter(def => activeFilters.has(def.kind));
  }, [defs, activeFilters]);

  const toggleFilter = (kind: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(kind)) {
        next.delete(kind);
      } else {
        next.add(kind);
      }
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      {kinds.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-fd-muted/30 rounded-lg">
          <span className="text-xs text-fd-muted-foreground mr-1">Filter:</span>
          {kinds.map(kind => (
            <FilterButton
              key={kind}
              kind={kind}
              active={activeFilters.has(kind)}
              count={kindCounts[kind]}
              onClick={() => toggleFilter(kind)}
            />
          ))}
          {activeFilters.size > 0 && (
            <button
              onClick={clearFilters}
              className="ml-2 text-xs text-fd-muted-foreground hover:text-fd-foreground"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      {activeFilters.size > 0 && (
        <div className="text-sm text-fd-muted-foreground">
          Showing {filteredDefs.length} of {defs.length} items
        </div>
      )}

      {/* Definition list */}
      <div className="space-y-2">
        {filteredDefs.map((def, i) => (
          <HaskellRef key={`${def.name}-${i}`} def={def} />
        ))}
      </div>
    </div>
  );
}
