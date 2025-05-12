"use client";

import * as React from "react";

import {
  UnderlinedTabs,
  UnderlinedTabsContent,
  UnderlinedTabsList,
  UnderlinedTabsTrigger,
} from "@/components/underlined-tabs";
import { PackageManager, usePackageManager } from "@/hooks/use-package-manager";

export interface CodeBlockCommandCommand {
  packageManager: PackageManager;
  command: string;
}

export interface CodeBlockCommandProps extends React.ComponentProps<"pre"> {
  /**
   * The following props are added by rehype-npm-command plugin during build time.
   * See rehype-npm-command.ts for implementation details.
   */

  /** Command JSON string. */
  commands: string;
  /** The code block element for syntax highlighting. */
  children: React.ReactNode[];
}

export function CodeBlockCommand({
  commands,
  children,
}: CodeBlockCommandProps) {
  const [packageManager, setPackageManager] = usePackageManager();

  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const cmds = JSON.parse(commands) as CodeBlockCommandCommand[];

  return (
    <div className="relative mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 dark:bg-zinc-900">
      <UnderlinedTabs
        defaultValue={packageManager}
        onValueChange={(value) =>
          setPackageManager(value as "pnpm" | "npm" | "yarn" | "bun")
        }
      >
        <UnderlinedTabsList className="border-b border-zinc-800 bg-zinc-900 px-3 pt-2.5">
          {cmds.map(({ packageManager }) => (
            <UnderlinedTabsTrigger
              key={packageManager}
              value={packageManager}
              className="border-b px-2 pt-1 pb-2 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
            >
              {packageManager}
            </UnderlinedTabsTrigger>
          ))}
        </UnderlinedTabsList>
        {cmds.map(({ packageManager }, index) => (
          <UnderlinedTabsContent
            key={packageManager}
            value={packageManager}
            className="[&_[data-slot=code-block-pre]]:my-0 [&_[data-slot=code-block-pre]]:shadow-none"
          >
            {children[index]}
          </UnderlinedTabsContent>
        ))}
      </UnderlinedTabs>
    </div>
  );
}
