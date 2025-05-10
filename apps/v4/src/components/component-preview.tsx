import { Loader2Icon } from "lucide-react";
import * as React from "react";

import { CopyButton } from "@/components/copy-button";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import {
  UnderlinedTabs,
  UnderlinedTabsContent,
  UnderlinedTabsList,
  UnderlinedTabsTrigger,
} from "@/components/underlined-tabs";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  // TODO: potentially improve name typing
  name: string;
  /**
   * The following props are added by rehype-component plugin during build time.
   * See rehype-component.ts for implementation details.
   */
  /** The raw source code of the component. */
  __rawString__: string;
  /** The code block element for syntax highlighting. */
  children: React.ReactNode;
}

export async function ComponentPreview({
  name,
  __rawString__,
  children,
}: ComponentPreviewProps) {
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
            <CopyButton value={__rawString__} />
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
        {children}
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
