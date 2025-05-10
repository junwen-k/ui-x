import * as React from "react";

import { cn } from "@/lib/utils";

export interface LineDecoratorProps extends React.ComponentProps<"div"> {
  lineOffset?: number;
  lineWidth?: number;
  lineFadeStop?: number;
}

export interface LineDecoratorCSSProperties extends React.CSSProperties {
  "--line-offset": string;
  "--line-width": string;
  "--line-color": string;
  "--line-gap": string;
  "--line-fade-stop": string;
  "--line-background": string;
}

export function HorizontalLineDecorator({
  lineOffset = 0,
  lineWidth = 1,
  lineFadeStop = 93,
  style,
  className,
  ...props
}: LineDecoratorProps) {
  return (
    <div
      aria-hidden="true"
      style={
        {
          "--line-offset": `${lineOffset}px`,
          "--line-width": `${lineWidth}px`,
          "--line-color": "var(--foreground)",
          "--line-gap": "0.3125rem",
          "--line-fade-stop": `${lineFadeStop}%`,
          "--line-background": "var(--background)",
          ...style,
        } as LineDecoratorCSSProperties
      }
      className={cn(
        // Line
        "left-[calc(var(--line-offset)/2*-1)]",
        "h-(--line-width) w-[calc(100%+var(--line-offset))]",
        "bg-[linear-gradient(to_right,var(--line-color),var(--line-color)_50%,transparent_0,transparent)]",
        "bg-[size:var(--line-gap)_var(--line-width)]",
        // Mask / Gradient
        "mask-x-from-95%",
        // Animation
        "animate-landing-horizontal-line-intro w-0",
        className,
      )}
      {...props}
    />
  );
}

export function VerticalLineDecorator({
  lineOffset = 0,
  lineWidth = 1,
  lineFadeStop = 93,
  style,
  className,
  ...props
}: LineDecoratorProps) {
  return (
    <div
      aria-hidden="true"
      style={
        {
          "--line-offset": `${lineOffset}px`,
          "--line-width": `${lineWidth}px`,
          "--line-color": "var(--foreground)",
          "--line-gap": "0.3125rem",
          "--line-fade-stop": `${lineFadeStop}%`,
          "--line-background": "var(--background)",
          ...style,
        } as LineDecoratorCSSProperties
      }
      className={cn(
        // Line
        "top-[calc(var(--line-offset)/2*-1)]",
        "h-[calc(100%+var(--line-offset))] w-(--line-width)",
        "bg-[linear-gradient(to_top,var(--line-color),var(--line-color)_50%,transparent_0,transparent)]",
        "bg-[size:var(--line-width)_var(--line-gap)]",
        // Mask / Gradient
        "mask-y-from-95%",
        // Animation
        "animate-landing-vertical-line-intro h-0",
        className,
      )}
      {...props}
    />
  );
}
