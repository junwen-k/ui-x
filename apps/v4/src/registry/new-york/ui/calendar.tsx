"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import * as React from "react";
import { DayPicker, UI, useDayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function Calendar({
  captionLayout = "label",
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn("p-3", className)}
      classNames={{
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 opacity-50 hover:opacity-100",
        ),
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 opacity-50 hover:opacity-100",
        ),
        caption_label: "text-sm font-medium aria-hidden:hidden",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 font-normal",
        ),
        day: "p-0 text-center text-sm",
        disabled: "*:text-muted-foreground *:opacity-50",
        dropdown: "first:basis-3/5 last:basis-2/5",
        dropdowns: "flex basis-full items-center gap-2 text-sm font-medium",
        hidden: "invisible",
        month_caption: "flex items-center justify-center pt-1",
        month_grid: "w-full border-collapse space-y-1",
        month: cn(
          "space-y-4",
          captionLayout !== "label" && !props.hideNavigation && "mt-9",
        ),
        months:
          "relative flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0",
        nav: "absolute flex w-full items-center justify-between space-x-1 px-1",
        outside: "[&>button]:text-muted-foreground",
        // Join start cell.
        range_end:
          "before:bg-accent relative isolate before:absolute before:inset-0 before:rounded-r-md after:hidden [&>button]:relative [&>button]:z-10",
        range_middle: cn(
          "relative isolate",
          "before:bg-accent relative before:absolute before:inset-0 before:rounded-r-md first:before:rounded-l-md [&>button]:relative [&>button]:z-10",
          "after:bg-accent relative after:absolute after:inset-0 after:rounded-l-md last:after:rounded-r-md [&>button]:relative [&>button]:z-10",
          "aria-selected:[&>button]:bg-accent aria-selected:[&>button]:text-accent-foreground",
        ),
        // Join end cell.
        range_start:
          "after:bg-accent relative isolate before:hidden after:absolute after:inset-0 after:rounded-l-md [&>button]:relative [&>button]:z-10",
        selected: cn(
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        ),
        today:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        week: "mt-2 flex w-full",
        weekday: "text-muted-foreground w-8 text-[0.8rem] font-normal",
        weekdays: "flex",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          switch (orientation) {
            case "up":
              return <ChevronUp className="size-4" />;
            case "down":
              return <ChevronDown className="size-4" />;
            case "left":
              return <ChevronLeft className="size-4" />;
            case "right":
            default:
              return <ChevronRight className="size-4" />;
          }
        },
        Dropdown: ({
          "aria-label": ariaLabel,
          disabled,
          value,
          onChange,
          options,
          className,
        }) => {
          const { classNames } = useDayPicker();

          return (
            <Select
              disabled={disabled}
              value={`${value}`}
              onValueChange={(value) =>
                onChange?.({
                  target: { value },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <SelectTrigger
                aria-label={ariaLabel}
                className={cn(classNames[UI.Dropdown], className)}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={`${option.value}`}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

export { Calendar };
