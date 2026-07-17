"use client";

import "@ncdai/react-wheel-picker/style.css";

import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";
import { WheelPickerOption } from "@ncdai/react-wheel-picker";
import * as React from "react";

import { cn } from "@/lib/utils";

function WheelPickerWrapper({
  className,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) {
  return (
    <WheelPickerPrimitive.WheelPickerWrapper
      data-slot="wheel-picker-wrapper"
      className={cn(
        "border-input ring-ring/50 rounded-lg border px-1",
        "[&>[data-rwp]]:first:[&>[data-rwp-highlight-wrapper]]:rounded-s-md",
        "[&>[data-rwp]]:last:[&>[data-rwp-highlight-wrapper]]:rounded-e-md",
        className,
      )}
      {...props}
    />
  );
}

function WheelPicker<T extends WheelPickerPrimitive.WheelPickerValue = string>({
  classNames,
  ...props
}: WheelPickerPrimitive.WheelPickerProps<T>) {
  return (
    <WheelPickerPrimitive.WheelPicker
      data-slot="wheel-picker"
      classNames={{
        optionItem: cn("text-muted-foreground", classNames?.optionItem),
        highlightWrapper: cn(
          "bg-secondary text-secondary-foreground",
          classNames?.highlightWrapper,
        ),
        ...classNames,
      }}
      {...props}
    />
  );
}

export { WheelPicker, WheelPickerWrapper, type WheelPickerOption };
