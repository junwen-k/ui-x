"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Virtualized,
  VirtualizedVirtualizer,
} from "@/registry/new-york/ui/virtualized";

const tags = Array.from({ length: 10000 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function VirtualizerScrollArea() {
  return (
    <ScrollAreaPrimitive.Root className="relative h-72 w-48 overflow-hidden rounded-md border">
      <Virtualized asChild>
        <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
          <div className="p-4">
            <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
            <VirtualizedVirtualizer startMargin={30}>
              {tags.map((tag) => (
                <>
                  <div key={tag} className="text-sm">
                    {tag}
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </VirtualizedVirtualizer>
          </div>
        </ScrollAreaPrimitive.Viewport>
      </Virtualized>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}
