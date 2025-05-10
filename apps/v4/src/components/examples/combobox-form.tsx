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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxTag,
  ComboboxTagsInput,
} from "@/registry/new-york/ui/combobox";

const fruits = [
  {
    value: "apple",
    label: "Apple",
  },
  {
    value: "banana",
    label: "Banana",
  },
  {
    value: "blueberry",
    label: "Blueberry",
  },
  {
    value: "grapes",
    label: "Grapes",
  },
  {
    value: "pineapple",
    label: "Pineapple",
  },
];

const FormSchema = z.object({
  fruit: z
    .string()
    .array()
    .min(1, { message: "Please select at least 1 fruit" }),
});

export default function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fruit: [],
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fruit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fruit</FormLabel>
              <Combobox
                type="multiple"
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <ComboboxTagsInput placeholder="Search fruit...">
                    {field.value.map((value) => (
                      <ComboboxTag key={value} value={value}>
                        {fruits.find((fruit) => fruit.value === value)?.label}
                      </ComboboxTag>
                    ))}
                  </ComboboxTagsInput>
                </FormControl>
                <ComboboxContent>
                  <ComboboxEmpty>No fruit found.</ComboboxEmpty>
                  <ComboboxGroup heading="Fruits">
                    {fruits.map((fruit) => (
                      <ComboboxItem key={fruit.value} value={fruit.value}>
                        {fruit.label}
                      </ComboboxItem>
                    ))}
                  </ComboboxGroup>
                </ComboboxContent>
              </Combobox>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
