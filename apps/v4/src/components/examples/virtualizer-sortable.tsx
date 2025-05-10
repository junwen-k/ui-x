"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import * as React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Sortable,
  SortableItem,
  SortableItemTrigger,
  SortableList,
  SortableOverlay,
} from "@/registry/new-york/ui/sortable";
import { VirtualizedList } from "@/registry/new-york/ui/virtualized";

function Item({
  ref,
  title,
  description,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  description: string;
}) {
  return (
    <Card
      ref={ref}
      className={cn(
        "group focus-visible:ring-ring cursor-default flex-row items-stretch gap-0 overflow-hidden rounded-md p-0 focus-visible:ring-1 focus-visible:outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-pressed:z-10 aria-pressed:shadow-lg",
        className,
      )}
      {...props}
    >
      <div className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground flex cursor-grab items-center justify-center transition-colors aria-pressed:cursor-grabbing">
        <GripVertical className="size-4" />
      </div>
      <div className="flex flex-1 items-center gap-2 px-3 py-2 text-sm">
        <div className="flex flex-col gap-1">
          <div className="line-clamp-1 text-sm font-medium">{title}</div>
          <div className="text-muted-foreground line-clamp-1 text-xs">
            {description}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function VirtualizerSortable() {
  const [items, setItems] = React.useState(
    Array.from({ length: 1000 }, (_, index) => ({
      id: `item-${index}`,
      title: `Item ${index + 1}`,
      description: `Description ${index}`,
    })),
  );

  return (
    <Sortable
      onDragEnd={(event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);

          setItems((prevItems) => arrayMove(prevItems, oldIndex, newIndex));
        }
      }}
    >
      <SortableList items={items} className="flex size-80 flex-col gap-3">
        <VirtualizedList>
          {items.map((item, index) => (
            <SortableItem asChild key={item.id} id={item.id}>
              <SortableItemTrigger asChild>
                <Item
                  title={item.title}
                  description={item.description}
                  className={cn(
                    "mb-4 min-w-64 aria-pressed:opacity-50 aria-pressed:shadow-sm",
                    index === items.length - 1 && "mb-0",
                  )}
                />
              </SortableItemTrigger>
            </SortableItem>
          ))}
        </VirtualizedList>
      </SortableList>
      <SortableOverlay>
        {(activeId) => {
          const activeItem = items.find((item) => item.id === activeId);
          if (!activeItem) {
            return null;
          }

          return (
            <Item
              title={activeItem.title}
              description={activeItem.description}
              className="cursor-grabbing shadow-lg"
            />
          );
        }}
      </SortableOverlay>
    </Sortable>
  );
}
