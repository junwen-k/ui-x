"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useControlled } from "@base-ui/utils/useControlled";
import { useStableCallback } from "@base-ui/utils/useStableCallback";
import { XIcon } from "lucide-react";
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

const BadgeGroupContext = React.createContext<BadgeGroupContextProps | null>(
  null,
);

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

interface BadgeGroupBaseProps
  extends Omit<
    ToggleGroup.Props,
    "value" | "defaultValue" | "onValueChange" | "multiple"
  > {}

export interface BadgeGroupSingleProps extends BadgeGroupBaseProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onRemove?: (value: string) => void;
}

export interface BadgeGroupMultipleProps extends BadgeGroupBaseProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
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
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueProp as BadgeGroupValue<T> | undefined,
    default: (defaultValue ??
      (type === "multiple" ? [] : "")) as BadgeGroupValue<T>,
    name: "BadgeGroup",
    state: "value",
  });
  const setValue = useStableCallback((nextValue: BadgeGroupValue<T>) => {
    setValueUnwrapped(nextValue);
    (onValueChange as ((value: BadgeGroupValue<T>) => void) | undefined)?.(
      nextValue,
    );
  });

  return (
    <ToggleGroup
      data-slot="badge-group"
      className={cn("flex gap-2", className)}
      multiple={type === "multiple"}
      value={(type === "multiple" ? value : value ? [value] : []) as string[]}
      onValueChange={(groupValue) =>
        setValue(
          (type === "multiple"
            ? groupValue
            : (groupValue[0] ?? "")) as BadgeGroupValue<T>,
        )
      }
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
        {children}
      </BadgeGroupContext.Provider>
    </ToggleGroup>
  );
}

interface BadgeGroupItemProps extends Toggle.Props {
  value: string;
}

function BadgeGroupItem({
  value: valueProp,
  className,
  ...props
}: BadgeGroupItemProps) {
  const { type, onRemove, value } = useBadgeGroup();

  return (
    <BadgeGroupItemImpl
      data-slot="badge-group-item"
      value={valueProp}
      className={cn(
        badgeVariants({ variant: "outline" }),
        "data-[pressed]:bg-primary data-[pressed]:text-primary-foreground data-[pressed]:[a&]:hover:bg-primary/90 data-[pressed]:border-transparent",
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

interface BadgeGroupItemImplProps extends Toggle.Props {
  onRemove?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason: "closeClick" | "backspaceKeyDown" | "deleteKeyDown",
  ) => void;
}

function BadgeGroupItemImpl({
  onRemove,
  children,
  ...props
}: BadgeGroupItemImplProps) {
  return (
    <Toggle
      data-slot="badge-group-item-impl"
      {...mergeProps<typeof Toggle>(
        {
          onKeyDown: (event) => {
            if (event.key === "Backspace" || event.key === "Delete") {
              onRemove?.(
                event,
                event.key === "Backspace"
                  ? "backspaceKeyDown"
                  : "deleteKeyDown",
              );
            }
          },
        },
        props,
      )}
    >
      {children}
      {onRemove && (
        <div
          aria-hidden
          onClick={(event) => {
            event.stopPropagation();
            onRemove(event, "closeClick");
          }}
          className="cursor-pointer rounded-sm opacity-70 transition-opacity group-data-[disabled]:pointer-events-none hover:opacity-100"
        >
          <XIcon className="size-4" />
          <span className="sr-only">Remove</span>
        </div>
      )}
    </Toggle>
  );
}

export { BadgeGroup, BadgeGroupItem };
