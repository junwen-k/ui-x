"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import * as DateTimeFieldPrimitive from "@/registry/new-york/ui/date-time-field-primitive";
import {
  InputBase,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base";

function DateTimeField({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DateTimeFieldPrimitive.Root>) {
  return (
    <DateTimeFieldPrimitive.Root data-slot="date-time-field" asChild {...props}>
      <InputBase className={cn("gap-0", className)}>{children}</InputBase>
    </DateTimeFieldPrimitive.Root>
  );
}

function DateTimeFieldSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DateTimeFieldPrimitive.Separator>) {
  return (
    <DateTimeFieldPrimitive.Separator
      data-slot="date-time-field-separator"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

const dateTimeFieldInputStyle =
  "focus:bg-primary focus:text-primary-foreground focus:placeholder:text-primary-foreground box-content h-fit flex-initial rounded-sm px-0.5 tabular-nums";

function DateTimeFieldYears({
  placeholder = "yyyy",
  className,
  ...props
}: React.ComponentProps<typeof DateTimeFieldPrimitive.Years>) {
  return (
    <InputBaseControl>
      <DateTimeFieldPrimitive.Years
        data-slot="date-time-field-years"
        asChild
        placeholder={placeholder}
        {...props}
      >
        <InputBaseInput
          className={cn(
            dateTimeFieldInputStyle,
            "max-w-[calc(4ch_+_0.5rem)]",
            className,
          )}
        />
      </DateTimeFieldPrimitive.Years>
    </InputBaseControl>
  );
}

function DateTimeFieldMonths({
  placeholder = "mm",
  className,
  ...props
}: React.ComponentProps<typeof DateTimeFieldPrimitive.Months>) {
  return (
    <InputBaseControl>
      <DateTimeFieldPrimitive.Months
        data-slot="date-time-field-months"
        asChild
        placeholder={placeholder}
        {...props}
      >
        <InputBaseInput
          className={cn(
            dateTimeFieldInputStyle,
            "max-w-[calc(2ch_+_0.5rem)]",
            className,
          )}
        />
      </DateTimeFieldPrimitive.Months>
    </InputBaseControl>
  );
}

function DateTimeFieldDays({
  placeholder = "dd",
  className,
  ...props
}: React.ComponentProps<typeof DateTimeFieldPrimitive.Days>) {
  return (
    <InputBaseControl>
      <DateTimeFieldPrimitive.Days
        data-slot="date-time-field-days"
        asChild
        placeholder={placeholder}
        {...props}
      >
        <InputBaseInput
          className={cn(
            dateTimeFieldInputStyle,
            "max-w-[calc(2ch_+_0.5rem)]",
            className,
          )}
        />
      </DateTimeFieldPrimitive.Days>
    </InputBaseControl>
  );
}

function DateTimeFieldHours({
  placeholder = "--",
  className,
  ...props
}: React.ComponentProps<typeof DateTimeFieldPrimitive.Hours>) {
  return (
    <InputBaseControl>
      <DateTimeFieldPrimitive.Hours
        data-slot="date-time-field-hours"
        asChild
        placeholder={placeholder}
        {...props}
      >
        <InputBaseInput
          className={cn(
            dateTimeFieldInputStyle,
            "max-w-[calc(2ch_+_0.5rem)]",
            className,
          )}
        />
      </DateTimeFieldPrimitive.Hours>
    </InputBaseControl>
  );
}

function DateTimeFieldMinutes({
  placeholder = "--",
  className,
  ...props
}: React.ComponentProps<typeof DateTimeFieldPrimitive.Minutes>) {
  return (
    <InputBaseControl>
      <DateTimeFieldPrimitive.Minutes
        data-slot="date-time-field-minutes"
        asChild
        placeholder={placeholder}
        {...props}
      >
        <InputBaseInput
          className={cn(
            dateTimeFieldInputStyle,
            "max-w-[calc(2ch_+_0.5rem)]",
            className,
          )}
        />
      </DateTimeFieldPrimitive.Minutes>
    </InputBaseControl>
  );
}

function DateTimeFieldSeconds({
  placeholder = "--",
  className,
  ...props
}: React.ComponentProps<typeof DateTimeFieldPrimitive.Seconds>) {
  return (
    <InputBaseControl>
      <DateTimeFieldPrimitive.Seconds
        data-slot="date-time-field-seconds"
        asChild
        placeholder={placeholder}
        {...props}
      >
        <InputBaseInput
          className={cn(
            dateTimeFieldInputStyle,
            "max-w-[calc(2ch_+_0.5rem)]",
            className,
          )}
        />
      </DateTimeFieldPrimitive.Seconds>
    </InputBaseControl>
  );
}

function DateTimeFieldAmPm({
  placeholder = "--",
  className,
  ...props
}: React.ComponentProps<typeof DateTimeFieldPrimitive.AmPm>) {
  return (
    <InputBaseControl>
      <DateTimeFieldPrimitive.AmPm
        data-slot="date-time-field-am-pm"
        asChild
        placeholder={placeholder}
        {...props}
      >
        <InputBaseInput
          className={cn(
            dateTimeFieldInputStyle,
            "max-w-[calc(2ch_+_0.5rem)] text-center",
            className,
          )}
        />
      </DateTimeFieldPrimitive.AmPm>
    </InputBaseControl>
  );
}

export {
  DateTimeField,
  DateTimeFieldSeparator,
  DateTimeFieldYears,
  DateTimeFieldMonths,
  DateTimeFieldDays,
  DateTimeFieldHours,
  DateTimeFieldMinutes,
  DateTimeFieldSeconds,
  DateTimeFieldAmPm,
};
