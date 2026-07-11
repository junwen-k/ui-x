"use client";

import * as React from "react";

import { CopyButton } from "@/components/copy-button";
import {
  UnderlinedTabs,
  UnderlinedTabsContent,
  UnderlinedTabsList,
  UnderlinedTabsTrigger,
} from "@/components/underlined-tabs";
import { PackageManager, usePackageManager } from "@/hooks/use-package-manager";

export interface CodeBlockCommandProps extends React.ComponentProps<"pre"> {
  /**
   * The following props are added by the shiki transformers during build time.
   * See highlight-code.ts for implementation details.
   */
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: CodeBlockCommandProps) {
  const [packageManager, setPackageManager] = usePackageManager();

  const tabs = React.useMemo(
    () => ({
      npm: __npm__,
      yarn: __yarn__,
      pnpm: __pnpm__,
      bun: __bun__,
    }),
    [__npm__, __yarn__, __pnpm__, __bun__],
  );

  return (
    <div className="relative mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 dark:bg-zinc-900">
      <UnderlinedTabs
        value={packageManager}
        onValueChange={(value) => setPackageManager(value as PackageManager)}
      >
        <UnderlinedTabsList className="border-b border-zinc-800 bg-zinc-900 px-3 pt-2.5">
          {Object.entries(tabs).map(([packageManager]) => (
            <UnderlinedTabsTrigger
              key={packageManager}
              value={packageManager}
              className="border-b px-2 pt-1 pb-2 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
            >
              {packageManager}
            </UnderlinedTabsTrigger>
          ))}
        </UnderlinedTabsList>
        {Object.entries(tabs).map(([packageManager, command]) => (
          <UnderlinedTabsContent
            key={packageManager}
            value={packageManager}
            className="group relative"
          >
            <pre className="overflow-x-auto px-4 py-4">
              <code
                className="relative font-mono text-sm leading-none text-zinc-50"
                data-language="bash"
              >
                {command}
              </code>
            </pre>
            {command && (
              <CopyButton
                data-slot="code-block-copy-button"
                className="group/button absolute top-2 right-4 overflow-hidden opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100"
                value={command}
              />
            )}
          </UnderlinedTabsContent>
        ))}
      </UnderlinedTabs>
    </div>
  );
}
