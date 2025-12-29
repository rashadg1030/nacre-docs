import Link from 'next/link';
import { CodeCarousel } from '@/components/CodeCarousel';

// Official Haskell logo (from github.com/haskell/haskell-mode)
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

// Official Agda logo - Hönan Agda (the hen) from github.com/agda/agda
function AgdaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 1000" className={className} fill="none" stroke="currentColor" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round">
      {/* Body */}
      <path d="M400,0 L0,400 L200,400 L200,600 C200,820 380,1000 600,1000 C820,1000 1000,820 1000,600 L1000,400 L1200,200" />
      {/* Wing */}
      <path d="M1000,0 L600,400" />
      {/* Tail */}
      <path d="M1200,100 L1000,300" />
      <path d="M1200,0 L1000,200" />
      {/* Head */}
      <path d="M500,0 L300,200" />
      <path d="M600,0 L400,200" />
      {/* Eyes */}
      <circle cx="240" cy="270" r="18" fill="currentColor" />
      <circle cx="340" cy="270" r="18" fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text */}
            <div className="order-2 lg:order-1">
              <h1 className="text-2xl lg:text-4xl text-fd-muted-foreground mb-8 leading-relaxed">
                A structured, composable web framework for Haskell.
                Build type-safe APIs layer by layer.
              </h1>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="/docs"
                  className="nacre-hover inline-flex items-center px-6 py-3 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium transition-colors hover:bg-fd-primary/90"
                >
                  Get Started
                </Link>
                <Link
                  href="/docs/concepts/request"
                  className="inline-flex items-center px-6 py-3 rounded-lg border border-fd-border text-fd-foreground font-medium transition-colors hover:bg-fd-accent"
                >
                  View Examples
                </Link>
              </div>

              {/* Powered by section */}
              <div className="pt-8 border-t border-fd-border/50">
                <p className="text-xs text-fd-muted-foreground/70 uppercase tracking-wider mb-4">
                  Powered by
                </p>
                <div className="flex items-center gap-6">
                  <a
                    href="https://www.haskell.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    <HaskellLogo className="w-10 h-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm font-medium">Haskell</span>
                  </a>
                  <a
                    href="https://wiki.portal.chalmers.se/agda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    <AgdaLogo className="w-10 h-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm font-medium">Agda</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Code Carousel */}
            <div className="order-1 lg:order-2">
              <CodeCarousel />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
