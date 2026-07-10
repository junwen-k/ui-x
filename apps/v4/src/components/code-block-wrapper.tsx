"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
}

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <div className={cn("relative isolate", className)} {...props}>
      <div className={cn(!isOpened && "max-h-32 overflow-hidden")}>
        <div
          className={cn(
            "p-px [&_[data-slot='code-block-pre']]:my-0 [&_[data-slot='code-block-pre']]:pb-[8rem]",
            !isOpened && "[&_[data-slot='code-block-pre']]:overflow-hidden",
            isOpened && "[&_[data-slot='code-block-pre']]:max-h-none",
          )}
        >
          {children}
        </div>
      </div>
      <div
        className={cn(
          "from-background z-10 flex items-center justify-center bg-gradient-to-t py-4",
          isOpened && "to-background/80 sticky bottom-0",
          !isOpened && "to-via-background/80 absolute inset-0",
        )}
      >
        <Button
          variant="secondary"
          className="h-8 text-xs"
          aria-expanded={isOpened}
          onClick={() => setIsOpened((opened) => !opened)}
        >
          {isOpened ? "Collapse" : expandButtonTitle}
        </Button>
      </div>
    </div>
  );
}
