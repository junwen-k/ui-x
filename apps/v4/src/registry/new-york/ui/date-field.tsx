"use client";

import * as React from "react";

import {
  DateTimeField,
  DateTimeFieldDays,
  DateTimeFieldMonths,
  DateTimeFieldSeparator,
  DateTimeFieldYears,
} from "@/registry/new-york/ui/date-time-field";

function DateField(props: React.ComponentProps<typeof DateTimeField>) {
  return <DateTimeField data-slot="date-field" {...props} />;
}

function DateFieldSeparator({
  children = "/",
  ...props
}: React.ComponentProps<typeof DateTimeFieldSeparator>) {
  return (
    <DateTimeFieldSeparator data-slot="date-field-separator" {...props}>
      {children}
    </DateTimeFieldSeparator>
  );
}

function DateFieldYears(
  props: React.ComponentProps<typeof DateTimeFieldYears>,
) {
  return <DateTimeFieldYears data-slot="date-field-years" {...props} />;
}

function DateFieldMonths(
  props: React.ComponentProps<typeof DateTimeFieldMonths>,
) {
  return <DateTimeFieldMonths data-slot="date-field-months" {...props} />;
}

function DateFieldDays(props: React.ComponentProps<typeof DateTimeFieldDays>) {
  return <DateTimeFieldDays data-slot="date-field-days" {...props} />;
}

export {
  DateField,
  DateFieldSeparator,
  DateFieldYears,
  DateFieldMonths,
  DateFieldDays,
};
