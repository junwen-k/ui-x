"use client";

import { arraySwap, rectSwappingStrategy } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Sortable,
  SortableItem,
  SortableItemTrigger,
  SortableList,
} from "@/registry/new-york/ui/sortable";

function Item({
  title,
  description,
  className,
  ...props
}: React.ComponentProps<"div"> & { title: string; description: string }) {
  return (
    <Card
      className={cn(
        "group focus-visible:ring-ring cursor-grab flex-row items-stretch gap-0 overflow-hidden rounded-md p-0 focus-visible:ring-1 focus-visible:outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-pressed:z-10 aria-pressed:cursor-grabbing aria-pressed:shadow-lg",
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

export default function SortableSwap() {
  const [items, setItems] = React.useState([
    {
      id: "item-1",
      title: "Introduction to React",
      description: "Learn the basics of React and component-based architecture",
    },
    {
      id: "item-2",
      title: "State Management",
      description: "Explore different state management solutions in React",
    },
    {
      id: "item-3",
      title: "React Hooks",
      description: "Master the use of hooks for state and side effects",
    },
    {
      id: "item-4",
      title: "Performance Optimization",
      description: "Techniques to optimize React application performance",
    },
    {
      id: "item-5",
      title: "Testing React Apps",
      description: "Learn testing strategies and tools for React applications",
    },
    {
      id: "item-6",
      title: "React Router",
      description: "Implement client-side routing in React applications",
    },
    {
      id: "item-7",
      title: "Server Components",
      description:
        "Build server-rendered React components for better performance",
    },
    {
      id: "item-8",
      title: "React Query",
      description: "Manage server state and caching in React applications",
    },
  ]);

  return (
    <Sortable
      onDragEnd={(event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);

          setItems((prevItems) => arraySwap(prevItems, oldIndex, newIndex));
        }
      }}
      getNewIndex={({ id, items, activeIndex, overIndex }) =>
        arraySwap(items, activeIndex, overIndex).indexOf(id)
      }
    >
      <SortableList
        strategy={rectSwappingStrategy}
        items={items}
        className="flex flex-col gap-3"
      >
        {items.map((item) => (
          <SortableItem asChild key={item.id} id={item.id}>
            <SortableItemTrigger asChild>
              <Item title={item.title} description={item.description} />
            </SortableItemTrigger>
          </SortableItem>
        ))}
      </SortableList>
    </Sortable>
  );
}
