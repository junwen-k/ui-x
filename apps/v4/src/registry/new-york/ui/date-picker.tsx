"use client";

import { CalendarIcon, XIcon } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/registry/new-york/ui/calendar";
import {
  DateFieldDays,
  DateFieldMonths,
  DateFieldSeparator,
  DateFieldYears,
} from "@/registry/new-york/ui/date-field";
import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive";
import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseFlexWrapper,
} from "@/registry/new-york/ui/input-base";

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

function DatePickerInputBase({
  children,
  ...props
}: React.ComponentProps<typeof InputBase>) {
  return (
    <DatePickerPrimitive.Anchor asChild>
      <InputBase data-slot="date-picker-input-base" {...props}>
        <InputBaseFlexWrapper>{children}</InputBaseFlexWrapper>
        <InputBaseAdornment>
          <InputBaseAdornmentButton asChild>
            <DatePickerPrimitive.Clear>
              <span className="sr-only">Clear date</span>
              <XIcon />
            </DatePickerPrimitive.Clear>
          </InputBaseAdornmentButton>
        </InputBaseAdornment>
        <InputBaseAdornment>
          <InputBaseAdornmentButton asChild>
            <DatePickerPrimitive.Trigger>
              <CalendarIcon />
            </DatePickerPrimitive.Trigger>
          </InputBaseAdornmentButton>
        </InputBaseAdornment>
      </InputBase>
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
        <DatePickerPrimitive.DateRangeFieldYears asChild>
          <DateFieldYears />
        </DatePickerPrimitive.DateRangeFieldYears>
        <DatePickerPrimitive.DateRangeFieldSeparator asChild>
          <DateFieldSeparator />
        </DatePickerPrimitive.DateRangeFieldSeparator>
        <DatePickerPrimitive.DateRangeFieldMonths asChild>
          <DateFieldMonths />
        </DatePickerPrimitive.DateRangeFieldMonths>
        <DatePickerPrimitive.DateRangeFieldSeparator asChild>
          <DateFieldSeparator />
        </DatePickerPrimitive.DateRangeFieldSeparator>
        <DatePickerPrimitive.DateRangeFieldDays asChild>
          <DateFieldDays />
        </DatePickerPrimitive.DateRangeFieldDays>
      </DatePickerPrimitive.DateRangeFieldFrom>

      <DatePickerPrimitive.DateRangeFieldSeparator>
        -
      </DatePickerPrimitive.DateRangeFieldSeparator>

      <DatePickerPrimitive.DateRangeFieldTo className="flex items-center">
        <DatePickerPrimitive.DateRangeFieldYears asChild>
          <DateFieldYears />
        </DatePickerPrimitive.DateRangeFieldYears>
        <DatePickerPrimitive.DateRangeFieldSeparator asChild>
          <DateFieldSeparator />
        </DatePickerPrimitive.DateRangeFieldSeparator>
        <DatePickerPrimitive.DateRangeFieldMonths asChild>
          <DateFieldMonths />
        </DatePickerPrimitive.DateRangeFieldMonths>
        <DatePickerPrimitive.DateRangeFieldSeparator asChild>
          <DateFieldSeparator />
        </DatePickerPrimitive.DateRangeFieldSeparator>
        <DatePickerPrimitive.DateRangeFieldDays asChild>
          <DateFieldDays />
        </DatePickerPrimitive.DateRangeFieldDays>
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
      <DatePickerPrimitive.DateFieldYears asChild>
        <DateFieldYears />
      </DatePickerPrimitive.DateFieldYears>
      <DatePickerPrimitive.DateFieldSeparator asChild>
        <DateFieldSeparator />
      </DatePickerPrimitive.DateFieldSeparator>
      <DatePickerPrimitive.DateFieldMonths asChild>
        <DateFieldMonths />
      </DatePickerPrimitive.DateFieldMonths>
      <DatePickerPrimitive.DateFieldSeparator asChild>
        <DateFieldSeparator />
      </DatePickerPrimitive.DateFieldSeparator>
      <DatePickerPrimitive.DateFieldDays asChild>
        <DateFieldDays />
      </DatePickerPrimitive.DateFieldDays>
    </DatePickerPrimitive.DateField>
  );
}

function DatePickerInput(
  props: React.ComponentProps<
    typeof DatePickerDateField | typeof DatePickerDateRangeField
  >,
) {
  const { mode } = DatePickerPrimitive.useDatePicker();

  return (
    <DatePickerInputBase>
      {mode === "range" ? (
        <DatePickerDateRangeField
          {...(props as React.ComponentProps<typeof DatePickerDateRangeField>)}
        />
      ) : (
        <DatePickerDateField
          {...(props as React.ComponentProps<typeof DatePickerDateField>)}
        />
      )}
    </DatePickerInputBase>
  );
}

function DatePickerTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DatePickerPrimitive.Trigger>) {
  return (
    <InputBase
      data-slot="date-picker-trigger"
      asChild
      className={cn(
        buttonVariants({ variant: "outline" }),
        "cursor-pointer font-normal",
        className,
      )}
    >
      <DatePickerPrimitive.Trigger {...props}>
        <InputBaseAdornment>
          <CalendarIcon />
        </InputBaseAdornment>
        <InputBaseFlexWrapper>{children}</InputBaseFlexWrapper>
      </DatePickerPrimitive.Trigger>
    </InputBase>
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
  ...props
}: React.ComponentProps<typeof DatePickerPrimitive.Content>) {
  return (
    <DatePickerPrimitive.Portal>
      <DatePickerPrimitive.Content
        data-slot="date-picker-content"
        align={align}
        alignOffset={alignOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 w-auto overflow-hidden rounded-md border p-0 shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        {...props}
      />
    </DatePickerPrimitive.Portal>
  );
}

function DatePickerCalendar(props: React.ComponentProps<typeof Calendar>) {
  return (
    <DatePickerPrimitive.Calendar data-slot="date-picker-calendar" asChild>
      <Calendar {...props} />
    </DatePickerPrimitive.Calendar>
  );
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
