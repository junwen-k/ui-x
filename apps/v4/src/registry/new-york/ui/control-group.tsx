"use client";

import { Primitive } from "@radix-ui/react-primitive";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

const ControlGroupContext = React.createContext<
  Pick<ControlGroupProps, "orientation">
>({
  orientation: "horizontal",
});

function useControlGroup() {
  const context = React.useContext(ControlGroupContext);
  if (!context) {
    throw new Error("useControlGroup must be used within a <ControlGroup />.");
  }

  return context;
}

export interface ControlGroupProps
  extends React.ComponentProps<typeof Primitive.div> {
  orientation?: "horizontal" | "vertical";
}

function ControlGroup({
  className,
  orientation = "horizontal",
  ...props
}: ControlGroupProps) {
  return (
    <ControlGroupContext.Provider value={{ orientation }}>
      <Primitive.div
        data-slot="control-group"
        data-orientation={orientation}
        className={cn(
          "flex",
          orientation === "vertical" && "flex-col",
          className,
        )}
        {...props}
      />
    </ControlGroupContext.Provider>
  );
}

function ControlGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
  const { orientation } = useControlGroup();

  return (
    <Slot
      data-slot="control-group-item"
      className={cn(
        "rounded-none focus-within:z-10",
        orientation === "horizontal" &&
          "-me-px h-auto first:rounded-s-md last:-me-0 last:rounded-e-md",
        orientation === "vertical" &&
          "w-auto [margin-block-end:-1px] first:rounded-ss-md first:rounded-se-md last:rounded-ee-md last:rounded-es-md last:[margin-block-end:0]",
        className,
      )}
      {...props}
    />
  );
}

export { ControlGroup, ControlGroupItem };
