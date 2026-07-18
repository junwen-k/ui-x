import { CalendarIcon, XIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive";

const fieldInputStyle =
  "focus:bg-primary dark:focus:bg-primary focus:text-primary-foreground focus:placeholder:text-primary-foreground box-content h-fit flex-initial rounded-sm px-0.5 py-0.5 tabular-nums";

export default function DatePickerPrimitiveInput() {
  return (
    <DatePickerPrimitive.Root mode="single">
      <DatePickerPrimitive.Anchor render={<InputGroup className="pl-2" />}>
        <DatePickerPrimitive.DateField className="flex flex-1 items-center">
          <DatePickerPrimitive.DateFieldDays
            placeholder="dd"
            render={
              <InputGroupInput
                className={`${fieldInputStyle} max-w-[calc(2ch+0.5rem)]`}
              />
            }
          />
          <DatePickerPrimitive.DateFieldSeparator className="text-muted-foreground">
            /
          </DatePickerPrimitive.DateFieldSeparator>
          <DatePickerPrimitive.DateFieldMonths
            placeholder="mm"
            render={
              <InputGroupInput
                className={`${fieldInputStyle} max-w-[calc(2ch+0.5rem)]`}
              />
            }
          />
          <DatePickerPrimitive.DateFieldSeparator className="text-muted-foreground">
            /
          </DatePickerPrimitive.DateFieldSeparator>
          <DatePickerPrimitive.DateFieldYears
            placeholder="yyyy"
            render={
              <InputGroupInput
                className={`${fieldInputStyle} max-w-[calc(4ch+0.5rem)]`}
              />
            }
          />
        </DatePickerPrimitive.DateField>
        <InputGroupAddon align="inline-end">
          <DatePickerPrimitive.Clear
            render={<InputGroupButton size="icon-xs" />}
          >
            <span className="sr-only">Clear date</span>
            <XIcon />
          </DatePickerPrimitive.Clear>
          <DatePickerPrimitive.Trigger
            render={<InputGroupButton size="icon-xs" />}
          >
            <CalendarIcon />
          </DatePickerPrimitive.Trigger>
        </InputGroupAddon>
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
