"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { ClockIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { codeToHtml } from "shiki";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const FormSchema = z.object({
  eventTime: z.date({
    required_error: "Event time is required.",
  }),
});

export default function WheelPickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventTime: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const html = await codeToHtml(JSON.stringify(data, null, 2), {
      lang: "json",
      theme: "github-dark-dimmed",
      colorReplacements: {
        "#22272e": "var(--color-zinc-900)",
      },
    });

    toast("You submitted the following values:", {
      classNames: { content: "w-full" },
      description: (
        <div
          className="mt-2 [&>pre]:rounded-md [&>pre]:p-4 [&>pre]:shadow-[0_1.5px_2px_0_theme(colors.black/32%),0_0_0_1px_theme(colors.white/10%),0_-1px_0_0_theme(colors.white/4%)]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="eventTime"
          render={({ field }) => {
            const hour = getHours(field.value);
            const minute = getMinutes(field.value);
            const period = hour >= 12 ? "PM" : "AM";
            const hour12 = hour % 12 || 12;

            return (
              <FormItem>
                <FormLabel>Event time</FormLabel>
                <Popover>
                  <TimeField
                    hour12
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <TimeFieldHours />
                    </FormControl>
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
                          field.onChange(setHours(field.value, newHour));
                        }}
                      />
                      <WheelPicker
                        infinite
                        options={minutes}
                        value={minute.toString()}
                        onValueChange={(value) =>
                          field.onChange(
                            setMinutes(field.value, parseInt(value)),
                          )
                        }
                      />
                      <WheelPicker
                        options={periods}
                        value={period}
                        onValueChange={(value) => {
                          const newHour =
                            (hour % 12) + (value === "PM" ? 12 : 0);
                          field.onChange(setHours(field.value, newHour));
                        }}
                      />
                    </WheelPickerWrapper>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Schedule your event by selecting a time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
