"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";

import { cn } from "@/lib/utils";

type TimelineContextProps = {
  orientation: "horizontal" | "vertical";
};

const TimelineContext = React.createContext<TimelineContextProps | null>(null);

function useTimeline() {
  const context = React.useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within a <Timeline />.");
  }

  return context;
}

export interface TimelineProps extends React.ComponentProps<"ol"> {
  orientation?: "horizontal" | "vertical";
}

function Timeline({
  className,
  orientation = "vertical",
  ...props
}: TimelineProps) {
  return (
    <TimelineContext value={{ orientation }}>
      <ol
        data-slot="timeline"
        role="list"
        data-orientation={orientation}
        className={cn(
          "flex",
          orientation === "vertical" && "flex-col",
          className,
        )}
        {...props}
      />
    </TimelineContext>
  );
}

export interface TimelineItemProps extends useRender.ComponentProps<"li"> {}

function TimelineItem({ className, render, ...props }: TimelineItemProps) {
  const { orientation } = useTimeline();

  return useRender({
    render,
    defaultTagName: "li",
    props: mergeProps<"li">(
      {
        "data-slot": "timeline-item",
        "data-orientation": orientation,
        className: cn(
          "flex gap-4",
          orientation === "horizontal" && "flex-col",
          className,
        ),
      } as React.ComponentProps<"li">,
      props,
    ),
  });
}

export interface TimelineSeparatorProps extends useRender.ComponentProps<"div"> {}

function TimelineSeparator({
  className,
  render,
  ...props
}: TimelineSeparatorProps) {
  const { orientation } = useTimeline();

  return useRender({
    render,
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-slot": "timeline-separator",
        "data-orientation": orientation,
        className: cn(
          "flex items-center",
          orientation === "vertical" && "flex-col",
          className,
        ),
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

export interface TimelineDotProps extends useRender.ComponentProps<"div"> {
  variant?: "default" | "outline";
}

function TimelineDot({
  variant = "default",
  className,
  render,
  ...props
}: TimelineDotProps) {
  const { orientation } = useTimeline();

  return useRender({
    render,
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-slot": "timeline-dot",
        "data-orientation": orientation,
        className: cn(
          "flex size-4 items-center justify-center empty:after:block empty:after:rounded-full empty:after:outline-current [&_svg:not([class*='size-'])]:size-4",
          orientation === "vertical" && "mt-1",
          variant === "default" &&
            "empty:after:size-2.5 empty:after:bg-current",
          variant === "outline" && "empty:after:size-2 empty:after:outline",
          className,
        ),
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

export interface TimelineConnectorProps extends useRender.ComponentProps<"div"> {}

function TimelineConnector({
  className,
  render,
  ...props
}: TimelineConnectorProps) {
  const { orientation } = useTimeline();

  return useRender({
    render,
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-slot": "timeline-connector",
        "data-orientation": orientation,
        className: cn(
          "bg-border flex-1",
          orientation === "vertical" && "my-2 w-0.5",
          orientation === "horizontal" && "mx-2 h-0.5",
          className,
        ),
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

export interface TimelineContentProps extends useRender.ComponentProps<"div"> {}

function TimelineContent({
  className,
  render,
  ...props
}: TimelineContentProps) {
  const { orientation } = useTimeline();

  return useRender({
    render,
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-slot": "timeline-content",
        "data-orientation": orientation,
        className: cn(
          "flex-1",
          orientation === "vertical" && "pb-7 first:text-right last:text-left",
          orientation === "horizontal" && "pr-7",
          className,
        ),
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

export interface TimelineTitleProps extends useRender.ComponentProps<"div"> {}

function TimelineTitle({ className, render, ...props }: TimelineTitleProps) {
  const { orientation } = useTimeline();

  return useRender({
    render,
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-slot": "timeline-title",
        "data-orientation": orientation,
        className,
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

export interface TimelineDescriptionProps extends useRender.ComponentProps<"div"> {}

function TimelineDescription({
  className,
  render,
  ...props
}: TimelineDescriptionProps) {
  const { orientation } = useTimeline();

  return useRender({
    render,
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-slot": "timeline-description",
        "data-orientation": orientation,
        className: cn("text-muted-foreground text-[0.8em]", className),
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  useTimeline,
};
