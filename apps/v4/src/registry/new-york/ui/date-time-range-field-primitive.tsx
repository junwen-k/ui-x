"use client";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Primitive } from "@radix-ui/react-primitive";
import * as React from "react";

import {
  UseTimescapeRangeOptions,
  useTimescapeRange,
} from "@/registry/new-york/hooks/use-timescape";

export type DateTimeRangeFieldContextProps = {
  disabled?: boolean;
} & ReturnType<typeof useTimescapeRange>;

const DateTimeRangeFieldContext =
  React.createContext<DateTimeRangeFieldContextProps>({
    from: {
      getInputProps: () => ({ ref: () => null }),
      options: {},
    },
    to: {
      getInputProps: () => ({ ref: () => null }),
      options: {},
    },
    getRootProps: () => ({ ref: () => null }),
    disabled: false,
  });

export function useDateTimeRangeField() {
  const context = React.useContext(DateTimeRangeFieldContext);
  if (!context) {
    throw new Error(
      "useDateTimeRangeField must be used within a <DateTimeRangeField />.",
    );
  }

  return context;
}

export interface DateTimeRangeFieldProps
  extends UseTimescapeRangeOptions,
    Omit<React.ComponentProps<typeof Primitive.div>, "value" | "defaultValue"> {
  disabled?: boolean;
}

export function DateTimeRangeField({
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
  from,
  to,
  ref,
  ...props
}: DateTimeRangeFieldProps) {
  const timescape = useTimescapeRange({
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
    from,
    to,
  });

  const { ref: rootRef, ...rootProps } = timescape.getRootProps();
  const composedRefs = useComposedRefs(ref, (node) => rootRef(node)!);

  return (
    <DateTimeRangeFieldContext.Provider value={{ ...timescape, disabled }}>
      <Primitive.div
        data-slot="date-time-range-field"
        ref={composedRefs}
        data-disabled={disabled}
        {...rootProps}
        {...props}
      />
    </DateTimeRangeFieldContext.Provider>
  );
}

export function DateTimeRangeFieldSeparator(
  props: React.ComponentProps<typeof Primitive.span>,
) {
  const { disabled } = useDateTimeRangeField();

  return (
    <Primitive.span
      data-slot="date-time-range-field-separator"
      aria-hidden="true"
      data-disabled={disabled}
      {...props}
    />
  );
}

const DateTimeRangeFieldFromContext = React.createContext(false);

export function DateTimeRangeFieldFrom(
  props: React.ComponentProps<typeof Primitive.div>,
) {
  return (
    <DateTimeRangeFieldFromContext.Provider value={true}>
      <Primitive.div data-slot="date-time-range-field-from" {...props} />
    </DateTimeRangeFieldFromContext.Provider>
  );
}

const DateTimeRangeFieldToContext = React.createContext(false);

export function DateTimeRangeFieldTo({
  ref,
  ...props
}: React.ComponentProps<typeof Primitive.div>) {
  return (
    <DateTimeRangeFieldToContext.Provider value={true}>
      <Primitive.div
        data-slot="date-time-range-field-to"
        ref={ref}
        {...props}
      />
    </DateTimeRangeFieldToContext.Provider>
  );
}

function useDateTimeFieldSegment() {
  const isFrom = React.useContext(DateTimeRangeFieldFromContext);
  const isTo = React.useContext(DateTimeRangeFieldToContext);
  const { disabled, from, to } = useDateTimeRangeField();

  if (!isFrom && !isTo) {
    throw new Error(
      "useDateTimeFieldSegment should be used within <DateTimeRangeFieldFrom /> or <DateTimeRangeFieldTo /> components",
    );
  }

  return {
    ...(isFrom ? from : to),
    disabled,
  };
}

export function DateTimeRangeFieldYears({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeFieldSegment();
  const { ref: inputRef, ...inputProps } = getInputProps("years");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-range-field-years"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeRangeFieldMonths({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeFieldSegment();
  const { ref: inputRef, ...inputProps } = getInputProps("months");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-range-field-months"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeRangeFieldDays({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeFieldSegment();
  const { ref: inputRef, ...inputProps } = getInputProps("days");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-range-field-days"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeRangeFieldHours({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeFieldSegment();
  const { ref: inputRef, ...inputProps } = getInputProps("hours");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-range-field-hours"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeRangeFieldMinutes({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeFieldSegment();
  const { ref: inputRef, ...inputProps } = getInputProps("minutes");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-range-field-minutes"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeRangeFieldSeconds({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, disabled } = useDateTimeFieldSegment();
  const { ref: inputRef, ...inputProps } = getInputProps("seconds");
  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <Primitive.input
      data-slot="date-time-range-field-seconds"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export function DateTimeRangeFieldAmPm({
  ref,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<typeof Primitive.input>) {
  const { getInputProps, options, disabled } = useDateTimeFieldSegment();
  const { ref: inputRef, ...inputProps } = getInputProps("am/pm");
  const composedRefs = useComposedRefs(ref, inputRef);

  if (!options?.hour12) {
    return null;
  }

  return (
    <Primitive.input
      data-slot="date-time-range-field-am-pm"
      ref={composedRefs}
      {...inputProps}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

export {
  DateTimeRangeField as Root,
  DateTimeRangeFieldFrom as From,
  DateTimeRangeFieldTo as To,
  DateTimeRangeFieldSeparator as Separator,
  DateTimeRangeFieldYears as Years,
  DateTimeRangeFieldMonths as Months,
  DateTimeRangeFieldDays as Days,
  DateTimeRangeFieldHours as Hours,
  DateTimeRangeFieldMinutes as Minutes,
  DateTimeRangeFieldSeconds as Seconds,
  DateTimeRangeFieldAmPm as AmPm,
};
