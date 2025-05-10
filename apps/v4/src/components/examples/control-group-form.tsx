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
  ControlGroup,
  ControlGroupItem,
} from "@/registry/new-york/ui/control-group";
import {
  InputBase,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base";

const FormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string(),
  })
  .refine(({ lastName }) => z.string().min(2).safeParse(lastName).success, {
    message: "Last name must be at least 2 characters.",
    path: ["firstName"],
  });

export default function ControlGroupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
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
          name="firstName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <ControlGroup>
                <ControlGroupItem>
                  <InputBase error={Boolean(fieldState.error)}>
                    <InputBaseControl>
                      <FormControl>
                        <InputBaseInput placeholder="First Name" {...field} />
                      </FormControl>
                    </InputBaseControl>
                  </InputBase>
                </ControlGroupItem>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <ControlGroupItem>
                      <InputBase error={Boolean(fieldState.error)}>
                        <InputBaseControl>
                          <InputBaseInput placeholder="Last Name" {...field} />
                        </InputBaseControl>
                      </InputBase>
                    </ControlGroupItem>
                  )}
                />
                <ControlGroupItem>
                  <Button type="submit">Submit</Button>
                </ControlGroupItem>
              </ControlGroup>
              <FormDescription>
                Enter your legal name as it appears on your government-issued
                ID.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
