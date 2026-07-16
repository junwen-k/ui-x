"use client";

import { CalendarIcon, XIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  DateFieldDays,
  DateFieldMonths,
  DateFieldSeparator,
  DateFieldYears,
} from "@/registry/new-york/ui/date-field";
import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive";

function DatePicker(
  props: React.ComponentProps<typeof DatePickerPrimitive.Root>,
) {
  return <DatePickerPrimitive.Root data-slot="date-picker" {...props} />;
}

function DatePickerAnchor(
  props: React.ComponentProps<typeof DatePickerPrimitive.Anchor>,
) {
  return (
    <DatePickerPrimitive.Anchor data-slot="date-picker-anchor" {...props} />
  );
}

function DatePickerInputGroup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof InputGroup>) {
  return (
    <DatePickerPrimitive.Anchor
      render={
        <InputGroup
          data-slot="date-picker-input-group"
          className={cn("pl-2", className)}
          {...props}
        />
      }
    >
      <div className="flex flex-1 items-center">{children}</div>
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
  );
}

function DatePickerDateRangeField({
  disabled: disabledProp,
  className,
  ...props
}: React.ComponentProps<typeof DatePickerPrimitive.DateRangeField>) {
  const { disabled } = DatePickerPrimitive.useDatePicker();

  return (
    <DatePickerPrimitive.DateRangeField
      data-slot="date-picker-date-range-field"
      disabled={disabled || disabledProp}
      className={cn("flex gap-1.5", className)}
      {...props}
    >
      <DatePickerPrimitive.DateRangeFieldFrom className="flex items-center">
        <DatePickerPrimitive.DateRangeFieldYears render={<DateFieldYears />} />
        <DatePickerPrimitive.DateRangeFieldSeparator
          render={<DateFieldSeparator />}
        />
        <DatePickerPrimitive.DateRangeFieldMonths
          render={<DateFieldMonths />}
        />
        <DatePickerPrimitive.DateRangeFieldSeparator
          render={<DateFieldSeparator />}
        />
        <DatePickerPrimitive.DateRangeFieldDays render={<DateFieldDays />} />
      </DatePickerPrimitive.DateRangeFieldFrom>

      <DatePickerPrimitive.DateRangeFieldSeparator>
        -
      </DatePickerPrimitive.DateRangeFieldSeparator>

      <DatePickerPrimitive.DateRangeFieldTo className="flex items-center">
        <DatePickerPrimitive.DateRangeFieldYears render={<DateFieldYears />} />
        <DatePickerPrimitive.DateRangeFieldSeparator
          render={<DateFieldSeparator />}
        />
        <DatePickerPrimitive.DateRangeFieldMonths
          render={<DateFieldMonths />}
        />
        <DatePickerPrimitive.DateRangeFieldSeparator
          render={<DateFieldSeparator />}
        />
        <DatePickerPrimitive.DateRangeFieldDays render={<DateFieldDays />} />
      </DatePickerPrimitive.DateRangeFieldTo>
    </DatePickerPrimitive.DateRangeField>
  );
}

function DatePickerDateField({
  disabled: disabledProp,
  className,
  ...props
}: React.ComponentProps<typeof DatePickerPrimitive.DateField>) {
  const { disabled } = DatePickerPrimitive.useDatePicker();

  return (
    <DatePickerPrimitive.DateField
      data-slot="date-picker-date-field"
      disabled={disabled || disabledProp}
      className={cn("flex", className)}
      {...props}
    >
      <DatePickerPrimitive.DateFieldYears render={<DateFieldYears />} />
      <DatePickerPrimitive.DateFieldSeparator render={<DateFieldSeparator />} />
      <DatePickerPrimitive.DateFieldMonths render={<DateFieldMonths />} />
      <DatePickerPrimitive.DateFieldSeparator render={<DateFieldSeparator />} />
      <DatePickerPrimitive.DateFieldDays render={<DateFieldDays />} />
    </DatePickerPrimitive.DateField>
  );
}

function DatePickerInput({
  className,
  ...props
}: React.ComponentProps<
  typeof DatePickerDateField | typeof DatePickerDateRangeField
>) {
  const { mode } = DatePickerPrimitive.useDatePicker();

  return (
    <DatePickerInputGroup className={className}>
      {mode === "range" ? (
        <DatePickerDateRangeField
          {...(props as React.ComponentProps<typeof DatePickerDateRangeField>)}
        />
      ) : (
        <DatePickerDateField
          {...(props as React.ComponentProps<typeof DatePickerDateField>)}
        />
      )}
    </DatePickerInputGroup>
  );
}

function DatePickerTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DatePickerPrimitive.Trigger>) {
  return (
    <DatePickerPrimitive.Trigger
      data-slot="date-picker-trigger"
      render={
        <Button
          variant="outline"
          className={cn("w-full justify-start font-normal", className)}
        />
      }
      {...props}
    >
      <CalendarIcon className="text-muted-foreground" />
      {children}
    </DatePickerPrimitive.Trigger>
  );
}

function DatePickerValue({
  className,
  ...props
}: React.ComponentProps<typeof DatePickerPrimitive.Value>) {
  return (
    <DatePickerPrimitive.Value
      data-slot="date-picker-value"
      className={cn("data-placeholder:text-muted-foreground/40", className)}
      {...props}
    />
  );
}

function DatePickerContent({
  className,
  align = "start",
  alignOffset = 4,
  side = "bottom",
  sideOffset = 0,
  ...props
}: React.ComponentProps<typeof DatePickerPrimitive.Content> &
  Pick<
    React.ComponentProps<typeof DatePickerPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <DatePickerPrimitive.Portal>
      <DatePickerPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <DatePickerPrimitive.Content
          data-slot="date-picker-content"
          className={cn(
            "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 w-auto origin-(--transform-origin) overflow-hidden rounded-md border p-0 shadow-md outline-hidden",
            className,
          )}
          {...props}
        />
      </DatePickerPrimitive.Positioner>
    </DatePickerPrimitive.Portal>
  );
}

function DatePickerCalendar(props: React.ComponentProps<typeof Calendar>) {
  return <DatePickerPrimitive.Calendar render={<Calendar {...props} />} />;
}

export {
  DatePicker,
  DatePickerAnchor,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerValue,
  DatePickerContent,
  DatePickerCalendar,
};
