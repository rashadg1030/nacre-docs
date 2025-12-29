'use client';

import { useEffect, useState } from 'react';

export function LigatureToggle() {
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('ligatures');
    if (stored !== null) {
      setEnabled(stored === 'true');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('ligatures', String(enabled));
    document.documentElement.classList.toggle('no-ligatures', !enabled);
  }, [enabled, mounted]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="inline-flex items-center justify-center rounded-md p-1.5 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
      title={enabled ? 'Disable ligatures' : 'Enable ligatures'}
      aria-label={enabled ? 'Disable ligatures' : 'Enable ligatures'}
    >
      <code className="text-sm font-medium" style={{ fontFamily: 'Fira Code, monospace' }}>
        {'::'}
      </code>
    </button>
  );
}
