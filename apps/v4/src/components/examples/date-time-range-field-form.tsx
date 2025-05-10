"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DateRange } from "react-day-picker";
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
import {
  DateTimeRangeField,
  DateTimeRangeFieldDays,
  DateTimeRangeFieldFrom,
  DateTimeRangeFieldMonths,
  DateTimeRangeFieldSeparator,
  DateTimeRangeFieldTo,
  DateTimeRangeFieldYears,
} from "@/registry/new-york/ui/date-time-range-field";

const FormSchema = z.object({
  eventPeriod: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      {
        required_error: "Event period is required.",
      },
    )
    .superRefine((data, ctx) => {
      if (!data.from || !data.to) {
        ctx.addIssue({
          message: "Event period is required.",
          code: "custom",
        });
      }
    }),
});

export default function DateTimeRangeFieldForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
          name="eventPeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event period</FormLabel>
              <DateTimeRangeField
                value={field.value as DateRange}
                onValueChange={field.onChange}
              >
                <DateTimeRangeFieldFrom>
                  <FormControl>
                    <DateTimeRangeFieldDays />
                  </FormControl>
                  <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
                  <DateTimeRangeFieldMonths />
                  <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
                  <DateTimeRangeFieldYears />
                </DateTimeRangeFieldFrom>
                <DateTimeRangeFieldSeparator>-</DateTimeRangeFieldSeparator>
                <DateTimeRangeFieldTo>
                  <DateTimeRangeFieldDays />
                  <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
                  <DateTimeRangeFieldMonths />
                  <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
                  <DateTimeRangeFieldYears />
                </DateTimeRangeFieldTo>
              </DateTimeRangeField>
              <FormDescription>
                Schedule your event by selecting a start and end date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
