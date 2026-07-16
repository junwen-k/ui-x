"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { useRender } from "@base-ui/react/use-render";
import { useControlled } from "@base-ui/utils/useControlled";
import { useStableCallback } from "@base-ui/utils/useStableCallback";
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
  anchor: HTMLElement | null;
  onAnchorChange: (anchor: HTMLElement | null) => void;
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

const DatePickerContext = React.createContext<DatePickerContextProps | null>(
  null,
);

function useDatePicker() {
  const context = React.useContext(DatePickerContext);
  if (!context) {
    throw new Error("useDatePicker must be used within a <DatePicker />.");
  }

  return context;
}

export interface DatePickerBaseProps extends PopoverPrimitive.Root.Props {
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
  children,
  month: monthProp,
  defaultMonth,
  onMonthChange,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  required = false,
  ...props
}: DatePickerProps) {
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueProp as DatePickerValue<T> | null | undefined,
    default: (defaultValue ?? null) as DatePickerValue<T> | null,
    name: "DatePicker",
    state: "value",
  });
  const setValue = useStableCallback(
    (nextValue: DatePickerValue<T> | null) => {
      setValueUnwrapped(nextValue);
      (
        onValueChange as
          | ((value: DatePickerValue<T> | null) => void)
          | undefined
      )?.(nextValue);
    },
  );
  const { current: thisMonth } = React.useRef(new Date());
  const [month, setMonthUnwrapped] = useControlled({
    controlled: monthProp,
    default: defaultMonth ?? thisMonth,
    name: "DatePicker",
    state: "month",
  });
  const setMonth = useStableCallback((nextMonth: Date) => {
    setMonthUnwrapped(nextMonth);
    onMonthChange?.(nextMonth);
  });
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

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
          anchor,
          onAnchorChange: setAnchor,
        } as DatePickerContextProps
      }
    >
      <PopoverPrimitive.Root data-slot="date-picker" {...props}>
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
  render,
  ...props
}: useRender.ComponentProps<"button">) {
  const { required, value, onValueChange } = useDatePicker();

  return useRender({
    render,
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        "data-slot": "date-picker-clear",
        type: "button",
        disabled: required || !value,
        onClick: () => !required && onValueChange(null),
      } as React.ComponentProps<"button">,
      props,
    ),
  });
}

export interface DatePickerValueProps
  extends useRender.ComponentProps<"span"> {
  placeholder?: React.ReactNode;
}

function DatePickerValue({
  placeholder,
  children,
  render,
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

  return useRender({
    render,
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        "data-slot": "date-picker-value",
        "data-placeholder": isValueEmpty ? true : undefined,
        children: isValueEmpty ? placeholder : (children ?? formattedValue),
      } as React.ComponentProps<"span">,
      props,
    ),
  });
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
  render?: React.ReactElement<DayPickerPrimitiveProps>;
}

function DatePickerCalendar({
  render,
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

  const calendarProps = {
    "data-slot": "date-picker-calendar",
    mode,
    selected: value === null ? undefined : value,
    required,
    onSelect: (value: Date | Date[] | DateRange | undefined) => {
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
    },
    month,
    onMonthChange,
    disabled,
    autoFocus,
    ...props,
  } as DayPickerPrimitiveProps;

  if (render) {
    return React.cloneElement(render, mergeProps(calendarProps, render.props));
  }

  return <DayPicker {...calendarProps} />;
}

function DatePickerTrigger(props: PopoverPrimitive.Trigger.Props) {
  return (
    <PopoverPrimitive.Trigger data-slot="date-picker-trigger" {...props} />
  );
}

function DatePickerPositioner(props: PopoverPrimitive.Positioner.Props) {
  const { anchor } = useDatePicker();

  return (
    <PopoverPrimitive.Positioner
      data-slot="date-picker-positioner"
      anchor={anchor ?? undefined}
      {...props}
    />
  );
}

function DatePickerContent(props: PopoverPrimitive.Popup.Props) {
  return <PopoverPrimitive.Popup data-slot="date-picker-content" {...props} />;
}

function DatePickerPortal(props: PopoverPrimitive.Portal.Props) {
  return <PopoverPrimitive.Portal data-slot="date-picker-portal" {...props} />;
}

function DatePickerAnchor({
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const { onAnchorChange } = useDatePicker();

  return useRender({
    render,
    defaultTagName: "div",
    ref: onAnchorChange,
    props: mergeProps<"div">(
      {
        "data-slot": "date-picker-anchor",
      } as React.ComponentProps<"div">,
      props,
    ),
  });
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
  DatePickerPositioner as Positioner,
  DatePickerContent as Content,
  DatePickerCalendar as Calendar,
  useDatePicker,
};
