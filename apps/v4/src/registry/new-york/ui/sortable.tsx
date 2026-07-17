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
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import * as ReactDOM from "react-dom";

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
  id,
  onDragStart,
  onDragEnd,
  onDragCancel,
  getNewIndex,
  collisionDetection = closestCenter,
  getTransformStyle = CSS.Transform.toString,
  ...props
}: SortableProps) {
  const instanceId = React.useId();
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
        id={id ?? instanceId}
        data-slot="sortable"
        onDragStart={(event) => {
          onDragStart?.(event);
          setActiveId(event.active.id);
        }}
        onDragEnd={(event) => {
          onDragEnd?.(event);
          setActiveId(null);
        }}
        onDragCancel={(event) => {
          onDragCancel?.(event);
          setActiveId(null);
        }}
        collisionDetection={collisionDetection}
        sensors={sensors}
        {...props}
      />
    </SortableImplContext.Provider>
  );
}

export interface SortableListProps
  extends Omit<SortableContextProps, "children">,
    useRender.ComponentProps<"ul"> {
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
  render,
  ...props
}: SortableListProps) {
  const element = useRender({
    render,
    defaultTagName: "ul",
    props: mergeProps<"ul">(
      {
        "data-slot": "sortable-list",
        "data-orientation": orientation,
      } as React.ComponentProps<"ul">,
      props,
    ),
  });

  return (
    <SortableContext
      strategy={strategy}
      items={items}
      disabled={disabled}
      id={id}
    >
      {element}
    </SortableContext>
  );
}

export type SortableGridProps = Omit<SortableContextProps, "children"> &
  useRender.ComponentProps<"div">;

function SortableGrid({
  strategy,
  items,
  disabled,
  id,
  render,
  ...props
}: SortableGridProps) {
  const element = useRender({
    render,
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-slot": "sortable-grid",
      } as React.ComponentProps<"div">,
      props,
    ),
  });

  return (
    <SortableContext
      strategy={strategy}
      items={items}
      disabled={disabled}
      id={id}
    >
      {element}
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

export type SortableItemProps = Omit<useRender.ComponentProps<"div">, "id"> &
  Pick<Parameters<typeof useDndSortable>[0], "id" | "disabled">;

function SortableItem({
  id,
  disabled,
  style: styleProp,
  render,
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

  const element = useRender({
    render,
    defaultTagName: "div",
    ref: setNodeRef as React.RefCallback<HTMLDivElement>,
    props: mergeProps<"div">(
      {
        "data-slot": "sortable-item",
        style: {
          transform: getTransformStyle(transform),
          transition,
          ...styleProp,
        },
        "data-dragging": isDragging || undefined,
        "data-over": isOver || undefined,
        "data-sorting": isSorting || undefined,
        ...attributes,
      } as React.ComponentProps<"div">,
      props,
    ),
  });

  return (
    <SortableItemContext.Provider value={{ id, disabled }}>
      {element}
    </SortableItemContext.Provider>
  );
}

function SortableItemTrigger({
  className,
  disabled: disabledProp,
  render,
  ...props
}: useRender.ComponentProps<"button">) {
  const { getNewIndex } = useSortable();
  const { id, disabled } = useSortableItem();
  const { listeners, setActivatorNodeRef, isDragging, isOver, isSorting } =
    useDndSortable({
      id,
      disabled: disabledProp || disabled,
      getNewIndex,
    });

  return useRender({
    render,
    defaultTagName: "button",
    ref: setActivatorNodeRef as React.RefCallback<HTMLButtonElement>,
    props: mergeProps<"button">(
      {
        "data-slot": "sortable-item-trigger",
        "data-dragging": isDragging || undefined,
        "data-over": isOver || undefined,
        "data-sorting": isSorting || undefined,
        disabled: disabledProp,
        className: cn("touch-none", className),
        ...listeners,
      } as React.ComponentProps<"button">,
      props,
    ),
  });
}

export interface SortableOverlayProps
  extends Omit<React.ComponentProps<typeof DragOverlay>, "children"> {
  children?: React.ReactNode | ((id: UniqueIdentifier) => React.ReactNode);
}

function SortableOverlay({ children, ...props }: SortableOverlayProps) {
  const { activeId } = useSortable();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <DragOverlay data-slot="sortable-overlay" {...props}>
      {activeId &&
        (typeof children === "function" ? children(activeId) : children)}
    </DragOverlay>,
    document.body,
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
