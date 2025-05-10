"use client";

import { addDays } from "date-fns";
import * as React from "react";
import { DateRange } from "react-day-picker";

import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive";

export default function DatePickerPrimitiveRange() {
  const [value, setValue] = React.useState<DateRange | null>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <DatePickerPrimitive.Root
      mode="range"
      value={value}
      onValueChange={setValue}
      formatStr="P"
    >
      <DatePickerPrimitive.Anchor>
        <DatePickerPrimitive.DateRangeField className="flex">
          <DatePickerPrimitive.DateRangeFieldFrom className="flex">
            <DatePickerPrimitive.DateRangeFieldDays placeholder="dd" />
            <DatePickerPrimitive.DateRangeFieldSeparator>
              /
            </DatePickerPrimitive.DateRangeFieldSeparator>
            <DatePickerPrimitive.DateRangeFieldMonths placeholder="mm" />
            <DatePickerPrimitive.DateRangeFieldSeparator>
              /
            </DatePickerPrimitive.DateRangeFieldSeparator>
            <DatePickerPrimitive.DateRangeFieldYears placeholder="yyyy" />
          </DatePickerPrimitive.DateRangeFieldFrom>

          <DatePickerPrimitive.DateRangeFieldSeparator>
            -
          </DatePickerPrimitive.DateRangeFieldSeparator>

          <DatePickerPrimitive.DateRangeFieldTo className="flex">
            <DatePickerPrimitive.DateRangeFieldDays placeholder="dd" />
            <DatePickerPrimitive.DateRangeFieldSeparator>
              /
            </DatePickerPrimitive.DateRangeFieldSeparator>
            <DatePickerPrimitive.DateRangeFieldMonths placeholder="mm" />
            <DatePickerPrimitive.DateRangeFieldSeparator>
              /
            </DatePickerPrimitive.DateRangeFieldSeparator>
            <DatePickerPrimitive.DateRangeFieldYears placeholder="yyyy" />
          </DatePickerPrimitive.DateRangeFieldTo>
        </DatePickerPrimitive.DateRangeField>
        <DatePickerPrimitive.Clear>&#215;</DatePickerPrimitive.Clear>
        <DatePickerPrimitive.Trigger>&#8595;</DatePickerPrimitive.Trigger>
      </DatePickerPrimitive.Anchor>
      <DatePickerPrimitive.Portal>
        <DatePickerPrimitive.Content>
          <DatePickerPrimitive.Calendar />
        </DatePickerPrimitive.Content>
      </DatePickerPrimitive.Portal>
    </DatePickerPrimitive.Root>
  );
}
