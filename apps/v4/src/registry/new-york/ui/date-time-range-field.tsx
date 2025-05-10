"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  DateTimeFieldAmPm,
  DateTimeFieldDays,
  DateTimeFieldHours,
  DateTimeFieldMinutes,
  DateTimeFieldMonths,
  DateTimeFieldSeconds,
  DateTimeFieldSeparator,
  DateTimeFieldYears,
} from "@/registry/new-york/ui/date-time-field";
import * as DateTimeRangeFieldPrimitive from "@/registry/new-york/ui/date-time-range-field-primitive";
import { InputBase } from "@/registry/new-york/ui/input-base";

function DateTimeRangeField({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Root>) {
  return (
    <DateTimeRangeFieldPrimitive.Root
      data-slot="date-time-range-field"
      asChild
      {...props}
    >
      <InputBase className={cn("gap-1.5", className)}>{children}</InputBase>
    </DateTimeRangeFieldPrimitive.Root>
  );
}

function DateTimeRangeFieldFrom({
  className,
  ...props
}: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.From>) {
  return (
    <DateTimeRangeFieldPrimitive.From
      data-slot="date-time-range-field-from"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function DateTimeRangeFieldTo({
  className,
  ...props
}: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.To>) {
  return (
    <DateTimeRangeFieldPrimitive.To
      data-slot="date-time-range-field-to"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function DateTimeRangeFieldSeparator(
  props: React.ComponentProps<typeof DateTimeFieldSeparator>,
) {
  return (
    <DateTimeFieldSeparator
      data-slot="date-time-range-field-separator"
      {...props}
    />
  );
}

function DateTimeRangeFieldYears(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Years>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Years
      data-slot="date-time-range-field-years"
      asChild
      {...props}
    >
      <DateTimeFieldYears />
    </DateTimeRangeFieldPrimitive.Years>
  );
}

function DateTimeRangeFieldMonths(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Months>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Months
      data-slot="date-time-range-field-months"
      asChild
      {...props}
    >
      <DateTimeFieldMonths />
    </DateTimeRangeFieldPrimitive.Months>
  );
}

function DateTimeRangeFieldDays(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Days>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Days
      data-slot="date-time-range-field-days"
      asChild
      {...props}
    >
      <DateTimeFieldDays />
    </DateTimeRangeFieldPrimitive.Days>
  );
}

function DateTimeRangeFieldHours(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Hours>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Hours
      data-slot="date-time-range-field-hours"
      asChild
      {...props}
    >
      <DateTimeFieldHours />
    </DateTimeRangeFieldPrimitive.Hours>
  );
}

function DateTimeRangeFieldMinutes(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Minutes>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Minutes
      data-slot="date-time-range-field-minutes"
      asChild
      {...props}
    >
      <DateTimeFieldMinutes />
    </DateTimeRangeFieldPrimitive.Minutes>
  );
}

function DateTimeRangeFieldSeconds(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Seconds>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Seconds
      data-slot="date-time-range-field-seconds"
      asChild
      {...props}
    >
      <DateTimeFieldSeconds />
    </DateTimeRangeFieldPrimitive.Seconds>
  );
}

function DateTimeRangeFieldAmPm(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.AmPm>,
) {
  return (
    <DateTimeRangeFieldPrimitive.AmPm
      data-slot="date-time-range-field-am-pm"
      asChild
      {...props}
    >
      <DateTimeFieldAmPm />
    </DateTimeRangeFieldPrimitive.AmPm>
  );
}

export {
  DateTimeRangeField,
  DateTimeRangeFieldFrom,
  DateTimeRangeFieldTo,
  DateTimeRangeFieldSeparator,
  DateTimeRangeFieldYears,
  DateTimeRangeFieldMonths,
  DateTimeRangeFieldDays,
  DateTimeRangeFieldHours,
  DateTimeRangeFieldMinutes,
  DateTimeRangeFieldSeconds,
  DateTimeRangeFieldAmPm,
};
