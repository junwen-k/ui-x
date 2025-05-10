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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BadgeGroup, BadgeGroupItem } from "@/registry/new-york/ui/badge-group";

const FormSchema = z.object({
  options: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .array(),
  selected: z.string().array(),
});

const flavours = [
  {
    label: "Chocolate",
    value: "chocolate",
  },
  {
    label: "Mint",
    value: "mint",
  },
  {
    label: "Strawberry",
    value: "strawberry",
  },
  {
    label: "Vanilla",
    value: "vanilla",
  },
];

export default function BadgeGroupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      options: flavours,
      selected: flavours.map((option) => option.value).slice(0, 2),
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

  const options = form.watch("options");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="selected"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ice cream flavor</FormLabel>
              <FormControl>
                <BadgeGroup
                  type="multiple"
                  value={field.value}
                  onValueChange={field.onChange}
                  onRemove={(value) => {
                    form.setValue(
                      "options",
                      options.filter((option) => !value.includes(option.value)),
                    );
                    field.onChange(
                      field.value.filter(
                        (selected) => !value.includes(selected),
                      ),
                    );
                  }}
                >
                  {options.map((option) => (
                    <BadgeGroupItem key={option.value} value={option.value}>
                      {option.label}
                    </BadgeGroupItem>
                  ))}
                </BadgeGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
