"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { Slottable } from "@radix-ui/react-slot";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { X } from "lucide-react";
import * as React from "react";

import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type BadgeGroupContextProps =
  | {
      type: "single";
      value: string;
      onValueChange: (value: string) => void;
      onRemove?: (value: string) => void;
    }
  | {
      type: "multiple";
      value: string[];
      onValueChange: (value: string[]) => void;
      onRemove: (value: string[]) => void;
    };

const BadgeGroupContext = React.createContext<BadgeGroupContextProps>({
  type: "single",
  value: "",
  onValueChange: () => {},
  onRemove: undefined,
});

function useBadgeGroup() {
  const context = React.useContext(BadgeGroupContext);
  if (!context) {
    throw new Error("useBadgeGroup must be used within a BadgeGroup.");
  }

  return context;
}

export type BadgeGroupType = "single" | "multiple";

export type BadgeGroupValue<T extends BadgeGroupType = "single"> =
  T extends "single" ? string : T extends "multiple" ? string[] : never;

export type BadgeGroupProps = BadgeGroupSingleProps | BadgeGroupMultipleProps;

export interface BadgeGroupSingleProps
  extends ToggleGroupPrimitive.ToggleGroupSingleProps {
  onRemove?: (value: string) => void;
}

export interface BadgeGroupMultipleProps
  extends ToggleGroupPrimitive.ToggleGroupMultipleProps {
  onRemove?: (value: string[]) => void;
}

function BadgeGroup<T extends BadgeGroupType = "single">({
  type = "single" as T,
  className,
  children,
  onRemove,
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}: BadgeGroupProps) {
  const [value = type === "multiple" ? [] : "", setValue] =
    useControllableState<BadgeGroupValue<T>>({
      prop: valueProp as BadgeGroupValue<T>,
      defaultProp: defaultValue as BadgeGroupValue<T>,
      onChange: onValueChange as (value: BadgeGroupValue<T>) => void,
    });

  return (
    <ToggleGroupPrimitive.Root
      data-slot="badge-group"
      className={cn("flex gap-2", className)}
      {...({
        type,
        value,
        onValueChange: setValue,
      } as React.ComponentProps<typeof ToggleGroupPrimitive.Root>)}
      {...props}
    >
      <BadgeGroupContext.Provider
        value={
          {
            type,
            onRemove,
            value,
            onValueChange: setValue,
          } as BadgeGroupContextProps
        }
      >
        <Slottable>{children}</Slottable>
      </BadgeGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}
BadgeGroup.displayName = "BadgeGroup";

function BadgeGroupItem({
  value: valueProp,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>) {
  const { type, onRemove, value } = useBadgeGroup();

  return (
    <BadgeGroupItemImpl
      data-slot="badge-group-item"
      value={valueProp}
      className={cn(
        badgeVariants({ variant: "outline" }),
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:[a&]:hover:bg-primary/90 data-[state=on]:border-transparent",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onRemove={
        onRemove &&
        ((_, reason) => {
          if (reason === "closeClick") {
            if (type === "single") {
              onRemove(valueProp);
            }
            if (type === "multiple") {
              onRemove([valueProp]);
            }
          } else {
            if (type === "single") {
              onRemove?.(valueProp);
            }
            if (type === "multiple") {
              onRemove?.(value.includes(valueProp) ? value : [valueProp]);
            }
          }
        })
      }
      {...props}
    />
  );
}

interface BadgeGroupItemImplProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
  onRemove?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason: "closeClick" | "backspaceKeyDown" | "deleteKeyDown",
  ) => void;
}

function BadgeGroupItemImpl({
  onRemove,
  onKeyDown,
  children,
  ...props
}: BadgeGroupItemImplProps) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="badge-group-item-impl"
      onKeyDown={composeEventHandlers(onKeyDown, (event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          onRemove?.(
            event,
            event.key === "Backspace" ? "backspaceKeyDown" : "deleteKeyDown",
          );
        }
      })}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {onRemove && (
        <div
          aria-hidden
          onClick={(event) => {
            event.stopPropagation();
            onRemove(event, "closeClick");
          }}
          className="cursor-pointer rounded-sm opacity-70 transition-opacity group-data-[disabled]:pointer-events-none hover:opacity-100"
        >
          <X className="size-4" />
          <span className="sr-only">Remove</span>
        </div>
      )}
    </ToggleGroupPrimitive.Item>
  );
}

export { BadgeGroup, BadgeGroupItem };
