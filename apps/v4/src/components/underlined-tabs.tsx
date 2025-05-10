"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";

function UnderlinedTabs(
  props: React.ComponentProps<typeof TabsPrimitive.Root>,
) {
  return <TabsPrimitive.Root data-slot="underlined-tabs" {...props} />;
}

function UnderlinedTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="underlined-tabs-list"
      className={cn("text-muted-foreground border-b", className)}
      {...props}
    />
  );
}

function UnderlinedTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="underlined-tabs-trigger"
      className={cn(
        "text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-primary border-b-2 border-transparent px-4 py-2 text-sm font-semibold transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function UnderlinedTabsContent(
  props: React.ComponentProps<typeof TabsPrimitive.Content>,
) {
  return (
    <TabsPrimitive.Content data-slot="underlined-tabs-content" {...props} />
  );
}

export {
  UnderlinedTabs,
  UnderlinedTabsList,
  UnderlinedTabsTrigger,
  UnderlinedTabsContent,
};
