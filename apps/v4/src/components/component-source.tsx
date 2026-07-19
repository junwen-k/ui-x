import fs from "node:fs/promises";
import path from "node:path";

import * as React from "react";

import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import { CopyButton } from "@/components/copy-button";
import { getIconForLanguageExtension } from "@/components/icons";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";

const registryTypes = ["ui", "components", "hooks", "lib"];
const registryExtensions = ["tsx", "ts"];

async function findRegistryFile(name: string, type: string) {
  const types = [type, ...registryTypes.filter((t) => t !== type)];

  for (const registryType of types) {
    for (const extension of registryExtensions) {
      const filePath = path.join(
        process.cwd(),
        `src/registry/new-york/${registryType}/${name}.${extension}`,
      );

      try {
        await fs.access(filePath);
        return filePath;
      } catch {
        // Try the next candidate.
      }
    }
  }

  return null;
}

export async function ComponentSource({
  name,
  type = "ui",
  fileName,
  title,
  language,
  collapsible = true,
  className,
}: React.ComponentProps<"div"> & {
  name: string;
  type?: string;
  fileName?: string;
  title?: string;
  language?: string;
  collapsible?: boolean;
}) {
  const filePath = await findRegistryFile(fileName ?? name, type);
  if (!filePath) {
    return null;
  }

  let code = await fs.readFile(filePath, "utf8");

  // Replace imports.
  // TODO: Use @swc/core and a visitor to replace this.
  // For now a simple regex should do.
  code = code.replaceAll(`@/registry/new-york/`, "@/components/");
  code = code.replaceAll("export default", "export");

  const lang = language ?? path.extname(filePath).slice(1);
  const highlightedCode = await highlightCode(code, lang);

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode
          code={code}
          highlightedCode={highlightedCode}
          language={lang}
          title={title}
        />
      </div>
    );
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        language={lang}
        title={title}
      />
    </CodeCollapsibleWrapper>
  );
}

export function ComponentCode({
  code,
  highlightedCode,
  language,
  title,
}: {
  code: string;
  highlightedCode: string;
  language: string;
  title: string | undefined;
}) {
  return (
    <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <CopyButton value={code} />
      <div
        data-not-typeset
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  );
}
