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
  TimeField,
  TimeFieldAmPm,
  TimeFieldHours,
  TimeFieldMinutes,
  TimeFieldSeconds,
  TimeFieldSeparator,
} from "@/registry/new-york/ui/time-field";

const FormSchema = z.object({
  eventTime: z.date({
    required_error: "Event time is required.",
  }),
});

export default function TimeFieldForm() {
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
          name="eventTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event time</FormLabel>
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
              </TimeField>
              <FormDescription>
                Schedule your event by selecting a time.
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
