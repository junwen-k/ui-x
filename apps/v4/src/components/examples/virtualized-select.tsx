"use client";

import * as React from "react";
import { VirtualizerHandle } from "virtua";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Virtualized,
  VirtualizedVirtualizer,
} from "@/registry/new-york/ui/virtualized";

const items = Array.from({ length: 10000 }, (_, index) => ({
  label: `Item ${index + 1}`,
  value: index.toString(),
}));

export default function VirtualizedSelect() {
  const [value, setValue] = React.useState<string | null>(null);
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

      const selectedElement = viewportRef.current?.querySelector(
        "[data-selected]",
      ) as HTMLElement;

      // Recover focus.
      selectedElement?.focus({ preventScroll: true });
    });
  }, [open, value, activeIndex]);

  return (
    <Select
      items={items}
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={setValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>
      <SelectContent
        alignItemWithTrigger={false}
        className="max-h-96"
        render={<Virtualized ref={viewportRef} />}
      >
        <VirtualizedVirtualizer
          ref={virtualizerRef}
          keepMounted={activeIndex !== -1 ? [activeIndex] : undefined}
        >
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </VirtualizedVirtualizer>
      </SelectContent>
    </Select>
  );
}
