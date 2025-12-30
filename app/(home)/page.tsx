import Link from 'next/link';
import { Pre } from 'fumadocs-ui/components/codeblock';
import { highlight } from 'fumadocs-core/highlight';
import { CodeShowcase } from '@/components/CodeShowcase';
import { showcaseTabs } from '@/lib/showcase-data';

// Official Haskell logo
function HaskellLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 481.89 340.16" className={className}>
      <path fill="currentColor" fillOpacity="0.6" d="M0 340.16 L113.39 170.08 L0 0 L85.04 0 L198.43 170.08 L85.04 340.16 L0 340.16 Z" />
      <path fill="currentColor" d="M113.39 340.16 L226.77 170.08 L113.39 0 L198.43 0 L425.2 340.16 L340.16 340.16 L269.29 233.86 L198.43 340.16 L113.39 340.16 Z" />
      <path fill="currentColor" fillOpacity="0.6" d="M387.4 240.95 L349.61 184.25 L481.89 184.25 L481.89 240.95 L387.4 240.95 Z" />
      <path fill="currentColor" fillOpacity="0.6" d="M330.71 155.91 L292.91 99.21 L481.89 99.21 L481.89 155.91 L330.71 155.91 Z" />
    </svg>
  );
}

// Official Agda logo
function AgdaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 1000" className={className} fill="none" stroke="currentColor" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round">
      <path d="M400,0 L0,400 L200,400 L200,600 C200,820 380,1000 600,1000 C820,1000 1000,820 1000,600 L1000,400 L1200,200" />
      <path d="M1000,0 L600,400" />
      <path d="M1200,100 L1000,300" />
      <path d="M1200,0 L1000,200" />
      <path d="M500,0 L300,200" />
      <path d="M600,0 L400,200" />
      <circle cx="240" cy="270" r="18" fill="currentColor" />
      <circle cx="340" cy="270" r="18" fill="currentColor" />
    </svg>
  );
}

// Arrow icon for CTA
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default async function HomePage() {
  // Highlight code for showcase tabs
  const highlightedShowcase: Record<string, React.ReactNode> = {};
  for (const tab of showcaseTabs) {
    highlightedShowcase[tab.id] = await highlight(tab.code, {
      lang: 'haskell',
      components: { pre: Pre },
    });
  }

  return (
    <main className="flex-1 bg-gradient-to-b from-fd-background to-fd-accent/10">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">

        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text Content */}
            <div className="order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-fd-accent border border-fd-border text-xs font-medium text-fd-muted-foreground mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Now in Development
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-fd-foreground mb-6 leading-[1.1] tracking-tight">
                The Polished Web Framework for Haskell
              </h1>

              {/* Subheading */}
              <p className="text-lg lg:text-xl text-fd-muted-foreground mb-10 leading-relaxed max-w-lg">
                Elegant, composable DSLs with formal guarantees. Build type-safe APIs layer by layer.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Link
                  href="/docs"
                  className="nacre-hover group inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-medium transition-all"
                >
                  Get Started
                  <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/docs/concepts/request"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm border border-fd-border text-fd-foreground font-medium transition-all hover:bg-fd-accent hover:border-fd-border/80"
                >
                  View Examples
                </Link>
              </div>

              {/* Powered by */}
              <div className="flex items-center gap-8">
                <span className="text-xs text-fd-muted-foreground/60 uppercase tracking-widest">
                  Powered by
                </span>
                <div className="flex items-center gap-6">
                  <a
                    href="https://www.haskell.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-fd-muted-foreground/70 hover:text-fd-foreground transition-colors"
                  >
                    <HaskellLogo className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm font-medium">Haskell</span>
                  </a>
                  <a
                    href="https://wiki.portal.chalmers.se/agda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-fd-muted-foreground/70 hover:text-fd-foreground transition-colors"
                  >
                    <AgdaLogo className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm font-medium">Agda</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Code Showcase */}
            <div className="order-2 relative">
              {/* Glow effect behind code block */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded blur-2xl opacity-60" />
              <div className="relative">
                <CodeShowcase highlightedCode={highlightedShowcase} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
