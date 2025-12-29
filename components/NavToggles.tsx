'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function LigatureToggle() {
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

  if (!mounted) return <span className="w-6" />;

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="inline-flex items-center justify-center p-1.5 text-fd-muted-foreground hover:text-fd-accent-foreground transition-colors"
      title={enabled ? 'Disable ligatures' : 'Enable ligatures'}
      aria-label={enabled ? 'Disable ligatures' : 'Enable ligatures'}
    >
      <code className="text-sm font-medium" style={{ fontFamily: 'Fira Code, monospace' }}>
        {'::'}
      </code>
    </button>
  );
}

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span className="w-5 h-5" />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex items-center justify-center p-1.5 text-fd-muted-foreground hover:text-fd-accent-foreground transition-colors"
      title={isDark ? 'Light mode' : 'Dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </>
        ) : (
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        )}
      </svg>
    </button>
  );
}

export function NavToggles() {
  return (
    <div className="inline-flex items-center rounded-md border border-fd-border bg-fd-background">
      <ThemeToggle />
      <div className="w-px h-4 bg-fd-border" />
      <LigatureToggle />
    </div>
  );
}
