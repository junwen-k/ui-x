import * as React from "react";

import { CodeBlockCommand } from "@/components/code-block-command";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

interface CodeProps extends React.ComponentProps<"code"> {
  /**
   * The following props are added by the shiki transformers during build time.
   * See highlight-code.ts for implementation details.
   */
  __raw__?: string;
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}

export function CodeBlock({
  className,
  children,
  ...props
}: React.ComponentProps<"pre">) {
  const codeProps = React.isValidElement(children)
    ? (children.props as CodeProps)
    : undefined;

  if (
    codeProps?.__npm__ &&
    codeProps?.__yarn__ &&
    codeProps?.__pnpm__ &&
    codeProps?.__bun__
  ) {
    return (
      <CodeBlockCommand
        __npm__={codeProps.__npm__}
        __yarn__={codeProps.__yarn__}
        __pnpm__={codeProps.__pnpm__}
        __bun__={codeProps.__bun__}
      />
    );
  }

  return (
    <div data-slot="code-block" className="group relative">
      <pre
        data-slot="code-block-pre"
        className={cn(
          "my-6 grid max-h-[650px] overflow-auto rounded-xl shadow-[0_1.5px_2px_0_theme(colors.black/32%),0_0_0_1px_theme(colors.white/10%),0_-1px_0_0_theme(colors.white/4%)]",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
      {codeProps?.__raw__ && (
        <CopyButton
          data-slot="code-block-copy-button"
          className="group/button absolute top-3.5 right-4 overflow-hidden opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100"
          value={codeProps.__raw__}
        />
      )}
    </div>
  );
}

interface ComponentCodeProps extends React.ComponentProps<"div"> {
  code: string;
  highlightedCode: string;
}

export function ComponentCode({
  code,
  highlightedCode,
  className,
  ...props
}: ComponentCodeProps) {
  return (
    <div
      data-slot="code-block"
      className={cn("group relative", className)}
      {...props}
    >
      <figure
        data-rehype-pretty-code-figure=""
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      <CopyButton
        data-slot="code-block-copy-button"
        className="group/button absolute top-3.5 right-4 overflow-hidden opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100"
        value={code}
      />
    </div>
  );
}
