"use client";

import { getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { ClockIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroupButton } from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TimeField,
  TimeFieldAmPm,
  TimeFieldHours,
  TimeFieldMinutes,
  TimeFieldSeconds,
  TimeFieldSeparator,
} from "@/registry/new-york/ui/time-field";
import {
  WheelPicker,
  WheelPickerOption,
  WheelPickerWrapper,
} from "@/registry/new-york/ui/wheel-picker";

const hours: WheelPickerOption[] = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString(),
  label: i.toString().padStart(2, "0"),
}));

const minutes: WheelPickerOption[] = Array.from({ length: 60 }, (_, i) => ({
  value: i.toString(),
  label: i.toString().padStart(2, "0"),
}));

const periods: WheelPickerOption[] = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];

export default function WheelPickerForm() {
  const [eventTime, setEventTime] = React.useState<Date | null>(new Date());

  const hour = eventTime ? getHours(eventTime) : 0;
  const minute = eventTime ? getMinutes(eventTime) : 0;
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Schedule your event</CardTitle>
        <CardDescription>
          Let attendees know when your event takes place.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>Event time</FieldLabel>
          <Popover>
            <TimeField hour12 value={eventTime} onValueChange={setEventTime}>
              <TimeFieldHours />
              <TimeFieldSeparator />
              <TimeFieldMinutes />
              <TimeFieldSeparator />
              <TimeFieldSeconds />
              <TimeFieldAmPm />
              <PopoverTrigger
                className="ml-auto"
                render={<InputGroupButton size="icon-xs" />}
              >
                <ClockIcon />
              </PopoverTrigger>
            </TimeField>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="border-none p-0 shadow-none"
            >
              <WheelPickerWrapper>
                <WheelPicker
                  infinite
                  options={hours.slice(1, 13)}
                  value={hour12.toString()}
                  onValueChange={(value) => {
                    const newHour =
                      parseInt(value) + (period === "PM" ? 12 : 0);
                    setEventTime((eventTime) =>
                      setHours(eventTime ?? new Date(), newHour),
                    );
                  }}
                />
                <WheelPicker
                  infinite
                  options={minutes}
                  value={minute.toString()}
                  onValueChange={(value) =>
                    setEventTime((eventTime) =>
                      setMinutes(eventTime ?? new Date(), parseInt(value)),
                    )
                  }
                />
                <WheelPicker
                  options={periods}
                  value={period}
                  onValueChange={(value) => {
                    const newHour = (hour % 12) + (value === "PM" ? 12 : 0);
                    setEventTime((eventTime) =>
                      setHours(eventTime ?? new Date(), newHour),
                    );
                  }}
                />
              </WheelPickerWrapper>
            </PopoverContent>
          </Popover>
          <FieldDescription>
            Schedule your event by selecting a time.
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
