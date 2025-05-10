"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Primitive } from "@radix-ui/react-primitive";
import type * as Radix from "@radix-ui/react-primitive";
import { Slot } from "@radix-ui/react-slot";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { format } from "date-fns";
import * as React from "react";
import {
  type Mode as DatePickerMode,
  type DateRange,
  DayPicker,
  type DayPickerProps as DayPickerPrimitiveProps,
} from "react-day-picker";

import * as DateTimeFieldPrimitive from "@/registry/new-york/ui/date-time-field-primitive";
import * as DateTimeRangeFieldPrimitive from "@/registry/new-york/ui/date-time-range-field-primitive";

// TODO: start month / end month sync with calendar and date field

export type DatePickerContextProps = {
  formatStr: string;
  month?: Date;
  onMonthChange: (month: Date) => void;
  disabled?: boolean;
} & (
  | Required<
      Pick<
        DatePickerSingleProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerSingleRequiredProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerMultipleProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerMultipleRequiredProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerRangeProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerRangeRequiredProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
);

const DatePickerContext = React.createContext<DatePickerContextProps>({
  mode: "single",
  formatStr: "PPP",
  month: undefined,
  onMonthChange: () => {},
  value: null,
  onValueChange: () => {},
  disabled: false,
  required: false,
});

function useDatePicker() {
  const context = React.useContext(DatePickerContext);
  if (!context) {
    throw new Error("useDatePicker must be used within a <DatePicker />.");
  }

  return context;
}

export interface DatePickerBaseProps
  extends React.ComponentProps<typeof PopoverPrimitive.Root> {
  mode?: DatePickerMode | undefined;
  required?: boolean;
  formatStr?: string;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  disabled?: boolean;
}

export type DatePickerValue<T extends DatePickerMode = "single"> =
  T extends "single"
    ? Date
    : T extends "multiple"
      ? Date[]
      : T extends "range"
        ? DateRange
        : never;

export interface DatePickerSingleProps {
  mode: "single";
  required?: false | undefined;
  value?: Date | null;
  defaultValue?: Date;
  onValueChange?: (value: Date | null) => void;
}

export interface DatePickerSingleRequiredProps {
  mode: "single";
  required: true;
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (value: Date) => void;
}

export interface DatePickerMultipleProps {
  mode: "multiple";
  required?: false | undefined;
  value?: Date[] | null;
  defaultValue?: Date[];
  onValueChange?: (value: Date[] | null) => void;
}

export interface DatePickerMultipleRequiredProps {
  mode: "multiple";
  required: true;
  value?: Date[];
  defaultValue?: Date[];
  onValueChange?: (value: Date[]) => void;
}

export interface DatePickerRangeProps {
  mode: "range";
  required?: false | undefined;
  value?: DateRange | null;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange | null) => void;
}

export interface DatePickerRangeRequiredProps {
  mode: "range";
  required: true;
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange) => void;
}

export type DatePickerProps = DatePickerBaseProps &
  (
    | DatePickerSingleProps
    | DatePickerSingleRequiredProps
    | DatePickerMultipleProps
    | DatePickerMultipleRequiredProps
    | DatePickerRangeProps
    | DatePickerRangeRequiredProps
  );

function DatePicker<T extends DatePickerMode = "single">({
  mode = "single" as T,
  formatStr = "PPP",
  open,
  onOpenChange,
  defaultOpen,
  modal,
  children,
  month: monthProp,
  defaultMonth,
  onMonthChange,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  required = false,
}: DatePickerProps) {
  const [value, setValue] = useControllableState<DatePickerValue<T>>({
    prop: valueProp as DatePickerValue<T>,
    defaultProp: defaultValue as DatePickerValue<T>,
    onChange: onValueChange as (value: DatePickerValue<T>) => void,
  });
  const [month, setMonth] = useControllableState({
    prop: monthProp,
    defaultProp: defaultMonth,
    onChange: onMonthChange,
  });

  return (
    <DatePickerContext.Provider
      value={
        {
          mode,
          required,
          formatStr,
          month,
          onMonthChange: setMonth,
          value,
          onValueChange: setValue,
          disabled,
        } as DatePickerContextProps
      }
    >
      <PopoverPrimitive.Root
        data-slot="date-picker"
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        modal={modal}
      >
        {children}
      </PopoverPrimitive.Root>
    </DatePickerContext.Provider>
  );
}

function DatePickerDateField({
  disabled: disabledProp,
  ...props
}: Omit<
  React.ComponentProps<typeof DateTimeFieldPrimitive.Root>,
  "value" | "onValueChange"
>) {
  const { mode, onMonthChange, value, onValueChange, required, disabled } =
    useDatePicker();

  if (mode !== "single") {
    throw new Error(
      '<DatePickerDateField> should only be used when mode is "single"',
    );
  }

  return (
    <DateTimeFieldPrimitive.Root
      data-slot="date-picker-date-field"
      disabled={disabled || disabledProp}
      value={value}
      onValueChange={(date) => {
        if (date) {
          onValueChange(date);
          onMonthChange(date);
        } else if (!required) {
          onValueChange(null);
        }
      }}
      {...props}
    />
  );
}

function DatePickerDateRangeField({
  disabled: disabledProp,
  ...props
}: Omit<
  React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Root>,
  "value" | "onValueChange"
>) {
  const { mode, onMonthChange, value, onValueChange, required, disabled } =
    useDatePicker();

  if (mode !== "range") {
    throw new Error(
      '<DatePickerDateRangeField> should only be used when mode is "range"',
    );
  }

  return (
    <DateTimeRangeFieldPrimitive.Root
      data-slot="date-picker-date-range-field"
      disabled={disabled || disabledProp}
      value={value}
      onValueChange={(value) => {
        if (value) {
          onValueChange(value);
          if (value.from) {
            onMonthChange(value.from);
          }
        } else if (!required) {
          onValueChange(null);
        }
      }}
      {...props}
    />
  );
}

function DatePickerClear({
  onClick,
  ...props
}: React.ComponentProps<typeof Primitive.button>) {
  const { required, value, onValueChange } = useDatePicker();

  return (
    <Primitive.button
      data-slot="date-picker-clear"
      disabled={required || !value}
      onClick={composeEventHandlers(
        onClick,
        () => !required && onValueChange(null),
      )}
      {...props}
    />
  );
}

export interface DatePickerValueProps
  extends Radix.PrimitivePropsWithRef<typeof Primitive.span> {
  placeholder?: React.ReactNode;
}

function DatePickerValue({
  placeholder,
  children,
  ...props
}: DatePickerValueProps) {
  const { mode, formatStr, value } = useDatePicker();

  const isValueEmpty = React.useMemo(() => {
    if (mode === "single") {
      return !value;
    }
    if (mode === "multiple") {
      return !value?.length;
    }
    return !value?.from;
  }, [mode, value]);

  const formattedValue = React.useMemo(() => {
    if (!value) {
      return null;
    }
    if (mode === "single") {
      return format(value, formatStr);
    }
    if (mode === "multiple") {
      return value.map((v) => format(v, formatStr)).join(", ");
    }
    return `${value.from ? format(value.from, formatStr) : "Select a date"} - ${value.to ? format(value.to, formatStr) : "Select a date"}`;
  }, [mode, value, formatStr]);

  return (
    <Primitive.span
      data-slot="date-picker-value"
      data-placeholder={isValueEmpty ? true : undefined}
      {...props}
    >
      {isValueEmpty ? placeholder : (children ?? formattedValue)}
    </Primitive.span>
  );
}

export interface DatePickerCalendarProps
  extends Omit<
    DayPickerPrimitiveProps,
    | "mode"
    | "selected"
    | "onSelect"
    | "month"
    | "onMonthChange"
    | "disabled"
    | "required"
  > {
  asChild?: boolean;
  children?: React.ReactNode;
}

function DatePickerCalendar({
  asChild,
  autoFocus = true,
  ...props
}: DatePickerCalendarProps) {
  const {
    mode,
    month,
    onMonthChange,
    value,
    onValueChange,
    disabled,
    required,
  } = useDatePicker();

  const Comp = asChild ? (Slot as typeof DayPicker) : DayPicker;

  return (
    <Comp
      data-slot="date-picker-calendar"
      mode={mode}
      {...({
        selected: value === null ? undefined : value,
        required,
      } as React.ComponentProps<typeof Comp>)}
      onSelect={(value: Date | Date[] | DateRange | undefined) => {
        if (!value && !required) {
          onValueChange(null);
        }
        if (mode === "single") {
          onValueChange(value as Date);
        }
        if (mode === "multiple") {
          onValueChange(value as Date[]);
        }
        if (mode === "range") {
          onValueChange(value as DateRange);
        }
      }}
      month={month}
      onMonthChange={onMonthChange}
      disabled={disabled}
      autoFocus={autoFocus}
      {...props}
    />
  );
}

function DatePickerTrigger(
  props: React.ComponentProps<typeof PopoverPrimitive.Trigger>,
) {
  return (
    <PopoverPrimitive.Trigger data-slot="date-picker-trigger" {...props} />
  );
}

function DatePickerContent(
  props: React.ComponentProps<typeof PopoverPrimitive.Content>,
) {
  return (
    <PopoverPrimitive.Content data-slot="date-picker-content" {...props} />
  );
}

function DatePickerPortal(
  props: React.ComponentProps<typeof PopoverPrimitive.Portal>,
) {
  return <PopoverPrimitive.Portal data-slot="date-picker-portal" {...props} />;
}

function DatePickerAnchor(
  props: React.ComponentProps<typeof PopoverPrimitive.Anchor>,
) {
  return <PopoverPrimitive.Anchor data-slot="date-picker-anchor" {...props} />;
}

function DatePickerDateFieldSeparator(
  props: React.ComponentProps<typeof DateTimeFieldPrimitive.Separator>,
) {
  return (
    <DateTimeFieldPrimitive.Separator
      data-slot="date-picker-date-field-separator"
      {...props}
    />
  );
}

function DatePickerDateFieldYears(
  props: React.ComponentProps<typeof DateTimeFieldPrimitive.Years>,
) {
  return (
    <DateTimeFieldPrimitive.Years
      data-slot="date-picker-date-field-years"
      {...props}
    />
  );
}

function DatePickerDateFieldMonths(
  props: React.ComponentProps<typeof DateTimeFieldPrimitive.Months>,
) {
  return (
    <DateTimeFieldPrimitive.Months
      data-slot="date-picker-date-field-months"
      {...props}
    />
  );
}

function DatePickerDateFieldDays(
  props: React.ComponentProps<typeof DateTimeFieldPrimitive.Days>,
) {
  return (
    <DateTimeFieldPrimitive.Days
      data-slot="date-picker-date-field-days"
      {...props}
    />
  );
}

function DatePickerDateRangeFieldFrom(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.From>,
) {
  return (
    <DateTimeRangeFieldPrimitive.From
      data-slot="date-picker-date-range-field-from"
      {...props}
    />
  );
}

function DatePickerDateRangeFieldTo(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.To>,
) {
  return (
    <DateTimeRangeFieldPrimitive.To
      data-slot="date-picker-date-range-field-to"
      {...props}
    />
  );
}

function DatePickerDateRangeFieldSeparator(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Separator>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Separator
      data-slot="date-picker-date-range-field-separator"
      {...props}
    />
  );
}

function DatePickerDateRangeFieldYears(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Years>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Years
      data-slot="date-picker-date-range-field-years"
      {...props}
    />
  );
}

function DatePickerDateRangeFieldMonths(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Months>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Months
      data-slot="date-picker-date-range-field-months"
      {...props}
    />
  );
}

function DatePickerDateRangeFieldDays(
  props: React.ComponentProps<typeof DateTimeRangeFieldPrimitive.Days>,
) {
  return (
    <DateTimeRangeFieldPrimitive.Days
      data-slot="date-picker-date-range-field-days"
      {...props}
    />
  );
}

export {
  DatePicker as Root,
  DatePickerDateField as DateField,
  DatePickerDateFieldSeparator as DateFieldSeparator,
  DatePickerDateFieldYears as DateFieldYears,
  DatePickerDateFieldMonths as DateFieldMonths,
  DatePickerDateFieldDays as DateFieldDays,
  DatePickerDateRangeField as DateRangeField,
  DatePickerDateRangeFieldFrom as DateRangeFieldFrom,
  DatePickerDateRangeFieldTo as DateRangeFieldTo,
  DatePickerDateRangeFieldSeparator as DateRangeFieldSeparator,
  DatePickerDateRangeFieldYears as DateRangeFieldYears,
  DatePickerDateRangeFieldMonths as DateRangeFieldMonths,
  DatePickerDateRangeFieldDays as DateRangeFieldDays,
  DatePickerValue as Value,
  DatePickerClear as Clear,
  DatePickerTrigger as Trigger,
  DatePickerAnchor as Anchor,
  DatePickerPortal as Portal,
  DatePickerContent as Content,
  DatePickerCalendar as Calendar,
  useDatePicker,
};
