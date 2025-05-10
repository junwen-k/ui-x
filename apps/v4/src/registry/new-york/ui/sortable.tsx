"use client";

import type { DndContextProps, UniqueIdentifier } from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  NewIndexGetter,
  SortableContext,
  SortableContextProps,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable as useDndSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";
import { composeEventHandlers } from "@radix-ui/primitive";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as PortalPrimitive from "@radix-ui/react-portal";
import { Primitive } from "@radix-ui/react-primitive";
import * as React from "react";

import { cn } from "@/lib/utils";

const SortableImplContext = React.createContext<
  Pick<SortableProps, "getNewIndex"> &
    Required<Pick<SortableProps, "getTransformStyle">> & {
      activeId: UniqueIdentifier | null;
    }
>({
  activeId: null,
  getTransformStyle: CSS.Transform.toString,
});

function useSortable() {
  const context = React.useContext(SortableImplContext);
  if (!context) {
    throw new Error("useSortable must be used within a <Sortable />.");
  }

  return context;
}

export interface SortableProps extends DndContextProps {
  onReorder?: (oldIndex: number, newIndex: number) => void;
  getNewIndex?: NewIndexGetter;
  getTransformStyle?: (
    transform: Transform | null,
  ) => React.CSSProperties["transform"];
}

function Sortable({
  onDragStart,
  onDragEnd,
  onDragCancel,
  getNewIndex,
  collisionDetection = closestCenter,
  getTransformStyle = CSS.Transform.toString,
  ...props
}: SortableProps) {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <SortableImplContext.Provider
      value={{
        activeId,
        getTransformStyle,
        getNewIndex,
      }}
    >
      <DndContext
        data-slot="sortable"
        onDragStart={composeEventHandlers(onDragStart, ({ active }) =>
          setActiveId(active.id),
        )}
        onDragEnd={composeEventHandlers(onDragEnd, () => setActiveId(null))}
        onDragCancel={composeEventHandlers(onDragCancel, () =>
          setActiveId(null),
        )}
        collisionDetection={collisionDetection}
        sensors={sensors}
        {...props}
      />
    </SortableImplContext.Provider>
  );
}

export interface SortableListProps
  extends Omit<SortableContextProps, "children">,
    React.ComponentProps<typeof Primitive.ul> {
  orientation?: "vertical" | "horizontal";
}

function SortableList({
  orientation = "vertical",
  strategy = orientation === "vertical"
    ? verticalListSortingStrategy
    : horizontalListSortingStrategy,
  items,
  disabled,
  id,
  ref,
  ...props
}: SortableListProps) {
  return (
    <SortableContext
      strategy={strategy}
      items={items}
      disabled={disabled}
      id={id}
    >
      <Primitive.ul
        data-slot="sortable-list"
        ref={ref}
        data-orientation={orientation}
        {...props}
      />
    </SortableContext>
  );
}

export type SortableGridProps = Omit<SortableContextProps, "children"> &
  React.ComponentProps<typeof Primitive.div>;

function SortableGrid({
  strategy,
  items,
  disabled,
  id,
  ref,
  ...props
}: SortableGridProps) {
  return (
    <SortableContext
      strategy={strategy}
      items={items}
      disabled={disabled}
      id={id}
    >
      <Primitive.div data-slot="sortable-grid" ref={ref} {...props} />
    </SortableContext>
  );
}

const SortableItemContext = React.createContext<
  Pick<SortableItemProps, "id" | "disabled">
>({
  id: "",
  disabled: false,
});

function useSortableItem() {
  const context = React.useContext(SortableItemContext);
  if (!context) {
    throw new Error("useSortableItem must be used within a <SortableItem />.");
  }

  return context;
}

export type SortableItemProps = Omit<
  React.ComponentProps<typeof Primitive.div>,
  "id"
> &
  Pick<Parameters<typeof useDndSortable>[0], "id" | "disabled">;

function SortableItem({
  id,
  disabled,
  style: styleProp,
  ref,
  ...props
}: SortableItemProps) {
  const { getTransformStyle, getNewIndex } = useSortable();
  const {
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
    isSorting,
  } = useDndSortable({
    id,
    disabled,
    getNewIndex,
  });

  const composedRefs = useComposedRefs(
    setNodeRef as React.RefCallback<HTMLDivElement>,
    ref,
  );
  const style = {
    transform: getTransformStyle(transform),
    transition,
    ...styleProp,
  };

  return (
    <SortableItemContext.Provider value={{ id, disabled }}>
      <Primitive.div
        data-slot="sortable-item"
        ref={composedRefs}
        style={style}
        data-dragging={isDragging || undefined}
        data-over={isOver || undefined}
        data-sorting={isSorting || undefined}
        {...attributes}
        {...props}
      />
    </SortableItemContext.Provider>
  );
}

function SortableItemTrigger({
  className,
  disabled: disabledProp,
  ref,
  ...props
}: React.ComponentProps<typeof Primitive.button>) {
  const { getNewIndex } = useSortable();
  const { id, disabled } = useSortableItem();
  const { listeners, setActivatorNodeRef, isDragging, isOver, isSorting } =
    useDndSortable({
      id,
      disabled: disabledProp || disabled,
      getNewIndex,
    });

  const composedRefs = useComposedRefs(
    setActivatorNodeRef as React.RefCallback<HTMLButtonElement>,
    ref,
  );

  return (
    <Primitive.button
      data-slot="sortable-item-trigger"
      ref={composedRefs}
      data-dragging={isDragging || undefined}
      data-over={isOver || undefined}
      data-sorting={isSorting || undefined}
      disabled={disabledProp}
      className={cn("touch-none", className)}
      {...listeners}
      {...props}
    />
  );
}

export interface SortableOverlayProps
  extends Omit<React.ComponentProps<typeof DragOverlay>, "children"> {
  children?: React.ReactNode | ((id: UniqueIdentifier) => React.ReactNode);
}

function SortableOverlay({ children, ...props }: SortableOverlayProps) {
  const { activeId } = useSortable();

  return (
    <PortalPrimitive.Root>
      <DragOverlay data-slot="sortable-overlay" {...props}>
        {activeId &&
          (typeof children === "function" ? children(activeId) : children)}
      </DragOverlay>
    </PortalPrimitive.Root>
  );
}

export {
  Sortable,
  SortableList,
  SortableGrid,
  SortableItem,
  SortableItemTrigger,
  SortableOverlay,
};
