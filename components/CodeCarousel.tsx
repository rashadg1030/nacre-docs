'use client';

import { useState, useEffect } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

const examples = [
  {
    label: 'Request',
    code: `input = request
  & method GET
  & path do
      lit "users"
      userId <- capture @Int "id"
      pure userId
  & query do
      page <- param @Int "page"
      pure page`,
  },
  {
    label: 'Response',
    code: `output = response
  & status 200
  & headers none
  & body @User

notFound = response
  & status 404
  & body @ErrorMessage`,
  },
  {
    label: 'Route',
    code: `-- Connect request to response
route = input :-> output

-- Multiple possible responses
route = input :-> either notFound output`,
  },
  {
    label: 'Action',
    code: `action = route := \\Input{..} -> do
  user <- findUser pathData.userId
  case user of
    Nothing -> pure $ Left "Not found"
    Just u  -> pure $ Right u`,
  },
  {
    label: 'Server',
    code: `server = Server.do
  getUserAction
  createUserAction
  updateUserAction
  deleteUserAction`,
  },
];

export function CodeCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % examples.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDotClick = (index: number) => {
    setActive(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <div className="w-full">
      {/* Stack all code blocks, only show active */}
      <div className="relative rounded-lg overflow-hidden">
        <div className="grid">
          {examples.map((example, i) => (
            <div
              key={example.label}
              className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                active === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <DynamicCodeBlock lang="haskell" code={example.code} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {examples.map((example, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              active === i ? 'bg-fd-primary' : 'bg-fd-muted'
            }`}
            aria-label={`Go to ${example.label} example`}
          />
        ))}
      </div>
    </div>
  );
}
