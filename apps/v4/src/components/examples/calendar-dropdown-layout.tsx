"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@/registry/new-york/ui/calendar";

export default function CalendarDropdownLayout() {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <Calendar
      mode="range"
      captionLayout="dropdown"
      hideNavigation
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
}
