'use client';

import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { Check, Copy } from 'lucide-react';

interface CopyMarkdownButtonProps {
  markdown: string;
  title: string;
}

export function CopyMarkdownButton({ markdown, title }: CopyMarkdownButtonProps) {
  const [checked, onClick] = useCopyButton(() => {
    const fullText = `# ${title}\n\n${markdown}`;
    void navigator.clipboard.writeText(fullText);
  });

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-fd-muted-foreground hover:text-fd-foreground bg-fd-accent/50 hover:bg-fd-accent border border-fd-border rounded-md transition-colors"
      title="Copy page as markdown for LLMs"
    >
      {checked ? (
        <>
          <Check className="size-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          Copy as Markdown
        </>
      )}
    </button>
  );
}
