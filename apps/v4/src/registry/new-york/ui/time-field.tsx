"use client";

import * as React from "react";

import {
  DateTimeField,
  DateTimeFieldAmPm,
  DateTimeFieldHours,
  DateTimeFieldMinutes,
  DateTimeFieldSeconds,
  DateTimeFieldSeparator,
} from "@/registry/new-york/ui/date-time-field";

function TimeField(props: React.ComponentProps<typeof DateTimeField>) {
  return <DateTimeField data-slot="time-field" {...props} />;
}

function TimeFieldSeparator({
  children = ":",
  ...props
}: React.ComponentProps<typeof DateTimeFieldSeparator>) {
  return (
    <DateTimeFieldSeparator data-slot="time-field-separator" {...props}>
      {children}
    </DateTimeFieldSeparator>
  );
}

function TimeFieldHours(
  props: React.ComponentProps<typeof DateTimeFieldHours>,
) {
  return <DateTimeFieldHours data-slot="time-field-hours" {...props} />;
}

function TimeFieldMinutes(
  props: React.ComponentProps<typeof DateTimeFieldMinutes>,
) {
  return <DateTimeFieldMinutes data-slot="time-field-minutes" {...props} />;
}

function TimeFieldSeconds(
  props: React.ComponentProps<typeof DateTimeFieldSeconds>,
) {
  return <DateTimeFieldSeconds data-slot="time-field-seconds" {...props} />;
}

function TimeFieldAmPm(props: React.ComponentProps<typeof DateTimeFieldAmPm>) {
  return <DateTimeFieldAmPm data-slot="time-field-am-pm" {...props} />;
}

export {
  TimeField,
  TimeFieldSeparator,
  TimeFieldHours,
  TimeFieldMinutes,
  TimeFieldSeconds,
  TimeFieldAmPm,
};
