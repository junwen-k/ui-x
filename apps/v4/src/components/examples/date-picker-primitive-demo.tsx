import { CalendarIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive";

export default function DatePickerPrimitiveDemo() {
  return (
    <DatePickerPrimitive.Root mode="single">
      <DatePickerPrimitive.Anchor className="flex items-center gap-1.5">
        <DatePickerPrimitive.Trigger
          render={
            <Button
              variant="outline"
              className="w-[240px] justify-start font-normal"
            />
          }
        >
          <CalendarIcon className="text-muted-foreground" />
          <DatePickerPrimitive.Value
            placeholder="Pick a date"
            className="data-placeholder:text-muted-foreground/40"
          />
        </DatePickerPrimitive.Trigger>
        <DatePickerPrimitive.Clear
          render={<Button variant="ghost" size="icon" />}
        >
          <span className="sr-only">Clear date</span>
          <XIcon />
        </DatePickerPrimitive.Clear>
      </DatePickerPrimitive.Anchor>
      <DatePickerPrimitive.Portal>
        <DatePickerPrimitive.Positioner
          align="start"
          sideOffset={4}
          className="isolate z-50"
        >
          <DatePickerPrimitive.Content className="bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 relative z-50 max-h-96 w-auto origin-(--transform-origin) overflow-hidden rounded-lg p-0 shadow-md ring-1 outline-hidden duration-100">
            <DatePickerPrimitive.Calendar render={<Calendar />} />
          </DatePickerPrimitive.Content>
        </DatePickerPrimitive.Positioner>
      </DatePickerPrimitive.Portal>
    </DatePickerPrimitive.Root>
  );
}
