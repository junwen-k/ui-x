import fs from "node:fs/promises";
import path from "node:path";

import * as React from "react";

import { ComponentCode } from "@/components/code-block";
import { CodeBlockWrapper } from "@/components/code-block-wrapper";
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

interface ComponentSourceProps extends React.ComponentProps<"div"> {
  name: string;
  type?: string;
  fileName?: string;
}

export async function ComponentSource({
  name,
  type = "ui",
  fileName,
  className,
}: ComponentSourceProps) {
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

  const language = path.extname(filePath).slice(1);
  const highlightedCode = await highlightCode(code, language);

  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("my-6 rounded-md", className)}
    >
      <ComponentCode code={code} highlightedCode={highlightedCode} />
    </CodeBlockWrapper>
  );
}
