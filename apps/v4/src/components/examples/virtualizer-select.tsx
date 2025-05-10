"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import { VirtualizerHandle } from "virtua";

import {
  Select,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { VirtualizedVirtualizer } from "@/registry/new-york/ui/virtualized";

const items = Array.from({ length: 10000 }, (_, index) => ({
  label: `Item ${index + 1}`,
  value: index.toString(),
}));

export default function VirtualizerSelect() {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const virtualizerRef = React.useRef<VirtualizerHandle>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const activeIndex = React.useMemo(
    () => items.findIndex((item) => item.value === value),
    [value],
  );

  React.useLayoutEffect(() => {
    if (!open || !value || activeIndex === -1) return;

    setTimeout(() => {
      // Recover scroll position.
      virtualizerRef.current?.scrollToIndex(activeIndex, { align: "end" });

      const checkedElement = viewportRef.current?.querySelector(
        "[data-state=checked]",
      ) as HTMLElement;

      // Recover focus.
      checkedElement?.focus({ preventScroll: true });
    });
  }, [open, value, activeIndex]);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={setValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border shadow-md",
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          )}
          position="popper"
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            ref={viewportRef}
            className={cn(
              "p-1",
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
            )}
          >
            <VirtualizedVirtualizer
              ref={virtualizerRef}
              keepMounted={activeIndex !== -1 ? [activeIndex] : undefined}
              overscan={2}
            >
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </VirtualizedVirtualizer>
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </Select>
  );
}
