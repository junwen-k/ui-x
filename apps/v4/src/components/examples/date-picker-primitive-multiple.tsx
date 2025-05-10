"use client";

import { format } from "date-fns";
import * as React from "react";

import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive";

const MAX_LENGTH = 3;

export default function DatePickerPrimitiveMultiple() {
  const [value, setValue] = React.useState<Date[] | null>([]);

  return (
    <DatePickerPrimitive.Root
      mode="multiple"
      value={value}
      onValueChange={setValue}
      formatStr="P"
    >
      <DatePickerPrimitive.Anchor>
        <DatePickerPrimitive.Trigger>
          <DatePickerPrimitive.Value placeholder="Pick a date">
            {value?.length &&
              [
                `${value
                  .slice(0, MAX_LENGTH)
                  .map((v) => format(v, "P"))
                  .join(", ")}`,
                value.length > MAX_LENGTH && `+${value.length - MAX_LENGTH}`,
              ]
                .filter(Boolean)
                .join(" ")}
          </DatePickerPrimitive.Value>
        </DatePickerPrimitive.Trigger>
        <DatePickerPrimitive.Clear>&#215;</DatePickerPrimitive.Clear>
      </DatePickerPrimitive.Anchor>
      <DatePickerPrimitive.Portal>
        <DatePickerPrimitive.Content>
          <DatePickerPrimitive.Calendar />
        </DatePickerPrimitive.Content>
      </DatePickerPrimitive.Portal>
    </DatePickerPrimitive.Root>
  );
}
