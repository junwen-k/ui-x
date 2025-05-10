import * as React from "react";

import { cn } from "@/lib/utils";

export function CircleDecorator({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      height="75"
      width="75"
      className={cn("animate-landing-circle-intro opacity-0", className)}
      {...props}
    >
      <circle
        cx="37.5"
        cy="37.5"
        r="37.5"
        className="stroke-foreground"
        strokeWidth="1"
        strokeDasharray="2"
        fill="none"
      />
    </svg>
  );
}
