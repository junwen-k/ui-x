import fs from "node:fs/promises";
import path from "node:path";

import { Loader2Icon } from "lucide-react";
import * as React from "react";

import { ComponentCode } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import {
  UnderlinedTabs,
  UnderlinedTabsContent,
  UnderlinedTabsList,
  UnderlinedTabsTrigger,
} from "@/components/underlined-tabs";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  // TODO: potentially improve name typing
  name: string;
}

export async function ComponentPreview({ name }: ComponentPreviewProps) {
  const filePath = path.join(
    process.cwd(),
    `src/components/examples/${name}.tsx`,
  );

  let code = await fs.readFile(filePath, "utf8");

  // Replace imports.
  // TODO: Use @swc/core and a visitor to replace this.
  // For now a simple regex should do.
  code = code.replaceAll(`@/registry/new-york/`, "@/components/");
  code = code.replaceAll("export default", "export");

  const highlightedCode = await highlightCode(code, "tsx");

  return (
    <UnderlinedTabs defaultValue="preview" className="mt-6 flex flex-col gap-4">
      <UnderlinedTabsList>
        <UnderlinedTabsTrigger value="preview">Preview</UnderlinedTabsTrigger>
        <UnderlinedTabsTrigger value="code">Code</UnderlinedTabsTrigger>
      </UnderlinedTabsList>
      <UnderlinedTabsContent value="preview">
        <ComponentCanvas>
          <ComponentCanvasHeader>
            <OpenInV0Button url={`https://ui-x.junwen-k.dev/r/${name}.json`} />
            <CopyButton value={code} />
          </ComponentCanvasHeader>
          <ComponentCanvasExample
            className="flex min-h-[350px] w-full items-center justify-center p-10"
            name={name}
          />
        </ComponentCanvas>
      </UnderlinedTabsContent>
      <UnderlinedTabsContent
        value="code"
        className="[&_[data-slot='code-block-pre']]:my-0"
      >
        <ComponentCode code={code} highlightedCode={highlightedCode} />
      </UnderlinedTabsContent>
    </UnderlinedTabs>
  );
}

export async function ComponentCanvas({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("rounded-md border", className)} {...props} />;
}

interface ComponentCanvasExampleProps extends React.ComponentProps<"div"> {
  name: string;
}

export async function ComponentCanvasExample({
  name,
  ...props
}: ComponentCanvasExampleProps) {
  const Component = (await import(`@/components/examples/${name}`)).default;

  return (
    <div {...props}>
      <React.Suspense
        fallback={
          <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
            <Loader2Icon className="mr-2 size-4 animate-spin" />
            Loading...
          </div>
        }
      >
        <Component />
      </React.Suspense>
    </div>
  );
}

export function ComponentCanvasHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-end gap-2 p-4", className)}
      {...props}
    />
  );
}
