import fs from "node:fs/promises";
import path from "node:path";

import * as React from "react";

import { ComponentPreviewTabs } from "@/components/component-preview-tabs";
import { ComponentCode } from "@/components/component-source";
import { highlightCode } from "@/lib/highlight-code";

export async function ComponentPreview({
  name,
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: string;
  previewClassName?: string;
  align?: "center" | "start" | "end";
  hideCode?: boolean;
  chromeLessOnMobile?: boolean;
}) {
  const filePath = path.join(
    process.cwd(),
    `src/components/examples/${name}.tsx`,
  );

  let code: string | undefined;
  try {
    code = await fs.readFile(filePath, "utf8");
  } catch {
    code = undefined;
  }

  if (!code) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found.
      </p>
    );
  }

  // Replace imports.
  // TODO: Use @swc/core and a visitor to replace this.
  // For now a simple regex should do.
  code = code.replaceAll(`@/registry/new-york/`, "@/components/");
  code = code.replaceAll("export default", "export");

  const Component = (await import(`@/components/examples/${name}`)).default;

  const highlightedCode = await highlightCode(code, "tsx");
  const previewCode = code.split("\n").slice(0, 3).join("\n");
  const highlightedPreviewCode = await highlightCode(previewCode, "tsx");

  return (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      chromeLessOnMobile={chromeLessOnMobile}
      component={<Component />}
      source={
        <ComponentCode
          code={code}
          highlightedCode={highlightedCode}
          language="tsx"
          title={undefined}
        />
      }
      sourcePreview={
        <ComponentCode
          code={previewCode}
          highlightedCode={highlightedPreviewCode}
          language="tsx"
          title={undefined}
        />
      }
      {...props}
    />
  );
}
