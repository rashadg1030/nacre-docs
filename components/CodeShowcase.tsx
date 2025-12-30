'use client';

import { useState } from 'react';
import { CodeBlock } from 'fumadocs-ui/components/codeblock';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { showcaseTabs } from '@/lib/showcase-data';

interface CodeShowcaseProps {
  highlightedCode: Record<string, React.ReactNode>;
}

export function CodeShowcase({ highlightedCode }: CodeShowcaseProps) {
  const [activeTab, setActiveTab] = useState('request');

  return (
    <div className="relative">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {showcaseTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="min-h-[420px]">
          {showcaseTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <CodeBlock>{highlightedCode[tab.id]}</CodeBlock>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
