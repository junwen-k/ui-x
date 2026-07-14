"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible relative md:-mx-1", className)}
      {...props}
    >
      <CollapsibleTrigger
        nativeButton={false}
        render={
          <div className="absolute top-1.5 right-9 z-10 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 rounded-md px-2 text-muted-foreground"
            >
              {isOpened ? "Collapse" : "Expand"}
            </Button>
            <Separator orientation="vertical" className="mx-1.5 h-4!" />
          </div>
        }
      />
      {/* The code stays visible while collapsed (clipped to a preview), so it
          lives outside the collapsible panel and is styled off the root state. */}
      <div className="relative mt-6 overflow-hidden group-data-closed/collapsible:max-h-64 group-data-closed/collapsible:[content-visibility:auto] [&>figure]:mt-0 [&>figure]:md:mx-0!">
        {children}
      </div>
      <CollapsibleTrigger className="absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b from-code/70 to-code text-sm text-muted-foreground group-data-open/collapsible:hidden">
        {isOpened ? "Collapse" : "Expand"}
      </CollapsibleTrigger>
    </Collapsible>
  );
}
