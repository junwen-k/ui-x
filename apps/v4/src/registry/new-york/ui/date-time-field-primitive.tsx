"use client";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Primitive } from "@radix-ui/react-primitive";
import * as React from "react";

import {
  UseTimescapeOptions,
  useTimescape,
} from "@/registry/new-york/hooks/use-timescape";

export type DateTimeFieldContextProps = {
  disabled?: boolean;
} & ReturnType<typeof useTimescape>;

const DateTimeFieldContext = React.createContext<DateTimeFieldContextProps>({
  getInputProps: () => ({ ref: () => null }),
  getRootProps: () => ({ ref: () => null }),
  options: {},
  disabled: false,
});

export function useDateTimeField() {
  const context = React.useContext(DateTimeFieldContext);
  if (!context) {
    throw new Error(
      "useDateTimeField must be used within a <DateTimeField />.",
    );
  }

  return context;
}

export interface DateTimeFieldProps
  extends UseTimescapeOptions,
    Omit<React.ComponentProps<typeof Primitive.div>, "value" | "defaultValue"> {
  disabled?: boolean;
}

export function DateTimeField({
  value,
  defaultValue,
  onValueChange,
  disabled,
  digits,
  hour12,
  maxDate,
  minDate,
  snapToStep,
  wheelControl,
  wrapAround,
  ref,
  ...props
}: DateTimeFieldProps) {
  const timescape = useTimescape({
    value,
    defaultValue,
    onValueChange,
    digits,
    hour12,
    maxDate,
    minDate,
    snapToStep,
    wheelControl,
    wrapAround,
  });

  const { ref: rootRef, ...rootProps } = timescape.getRootProps();
  const composedRefs = useComposedRefs(ref, (node) => rootRef(node)!);

  return (
    <DateTimeFieldContext.Provider value={{ ...timescape, disabled }}>
      <Primitive.div
        data-slot="date-time-field"
        ref={composedRefs}
        data-disabled={disabled}
        {...rootProps}
        {...props}
      />
    </DateTimeFieldContext.Provider>
  );
}

export function DateTimeFieldSeparator({
  ref,
  ...props
}: React.ComponentProps<typeof Primitive.span>) {
  const { disabled } = useDateTimeField();

  return (
    <Primitive.span
      data-slot="date-time-field-separator"
      ref={ref}
      aria-hidden="true"
      data-disabled={disabled}
      {...props}
    />
  );
}

export function DateTimeFieldYears({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeField();
  const { ref: inputRef, ...inputProps } = getInputProps("years");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-field-years"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeFieldMonths({
  disabled: disabledProp,
  ref,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeField();
  const { ref: inputRef, ...inputProps } = getInputProps("months");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-field-months"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeFieldDays({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeField();
  const { ref: inputRef, ...inputProps } = getInputProps("days");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-field-days"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeFieldHours({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeField();
  const { ref: inputRef, ...inputProps } = getInputProps("hours");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-field-hours"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeFieldMinutes({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeField();
  const { ref: inputRef, ...inputProps } = getInputProps("minutes");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-field-minutes"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeFieldSeconds({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeField();
  const { ref: inputRef, ...inputProps } = getInputProps("seconds");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-field-seconds"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeFieldAmPm({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled, options } = useDateTimeField();
  const { ref: inputRef, ...inputProps } = getInputProps("am/pm");
  const composedRefs = useComposedRefs(ref, inputRef);

  if (!options?.hour12) {
    return null;
  }

  return (
    <Primitive.input
      data-slot="date-time-field-am-pm"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export {
  DateTimeField as Root,
  DateTimeFieldSeparator as Separator,
  DateTimeFieldDays as Days,
  DateTimeFieldMonths as Months,
  DateTimeFieldYears as Years,
  DateTimeFieldHours as Hours,
  DateTimeFieldMinutes as Minutes,
  DateTimeFieldSeconds as Seconds,
  DateTimeFieldAmPm as AmPm,
};
