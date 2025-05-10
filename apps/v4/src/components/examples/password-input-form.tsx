"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
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
  PasswordInput,
  PasswordInputAdornment,
  PasswordInputAdornmentToggle,
  PasswordInputInput,
} from "@/registry/new-york/ui/password-input";

const FormSchema = z
  .object({
    password: z.string().min(12, {
      message: "Password must be at least 12 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function PasswordInputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <PasswordInput>
                <PasswordInputAdornment>
                  <LockKeyhole />
                </PasswordInputAdornment>
                <FormControl>
                  <PasswordInputInput
                    autoComplete="new-password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <PasswordInputAdornmentToggle />
              </PasswordInput>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <PasswordInput>
                <PasswordInputAdornment>
                  <LockKeyhole />
                </PasswordInputAdornment>
                <FormControl>
                  <PasswordInputInput
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <PasswordInputAdornmentToggle />
              </PasswordInput>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
