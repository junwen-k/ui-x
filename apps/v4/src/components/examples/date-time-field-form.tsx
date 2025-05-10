"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  DateTimeField,
  DateTimeFieldAmPm,
  DateTimeFieldDays,
  DateTimeFieldHours,
  DateTimeFieldMinutes,
  DateTimeFieldMonths,
  DateTimeFieldSeconds,
  DateTimeFieldSeparator,
  DateTimeFieldYears,
} from "@/registry/new-york/ui/date-time-field";

const FormSchema = z.object({
  eventDate: z.date({
    required_error: "Event date is required.",
  }),
});

export default function DateTimeFieldForm() {
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
          name="eventDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event date</FormLabel>
              <DateTimeField value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <DateTimeFieldDays />
                </FormControl>
                <DateTimeFieldSeparator>/</DateTimeFieldSeparator>
                <DateTimeFieldMonths />
                <DateTimeFieldSeparator>/</DateTimeFieldSeparator>
                <DateTimeFieldYears />
                <DateTimeFieldSeparator>·</DateTimeFieldSeparator>
                <DateTimeFieldHours />
                <DateTimeFieldSeparator>:</DateTimeFieldSeparator>
                <DateTimeFieldMinutes />
                <DateTimeFieldSeparator>:</DateTimeFieldSeparator>
                <DateTimeFieldSeconds />
                <DateTimeFieldAmPm />
              </DateTimeField>
              <FormDescription>
                Schedule your event by selecting a date and time.
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
