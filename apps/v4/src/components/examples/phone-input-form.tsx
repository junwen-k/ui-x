"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { parsePhoneNumber } from "react-phone-number-input";
import { codeToHtml } from "shiki";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  PhoneInput,
  PhoneInputInput,
  Value,
} from "@/registry/new-york/ui/phone-input";

// Based on https://github.com/colinhacks/zod/issues/3378#issuecomment-2067591844.
const zPhoneNumber = z.custom<Value>().transform((value, ctx) => {
  const phoneNumber = parsePhoneNumber(value);

  if (!phoneNumber?.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid phone number",
    });
    return z.NEVER;
  }

  return phoneNumber.number;
});

const FormSchema = z.object({
  phoneNumber: zPhoneNumber,
});

export default function PhoneInputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const html = await codeToHtml(
      JSON.stringify(
        {
          ...data,
          parsed: parsePhoneNumber(data.phoneNumber),
        },
        null,
        2,
      ),
      {
        lang: "json",
        theme: "github-dark-dimmed",
        colorReplacements: {
          "#22272e": "var(--color-zinc-900)",
        },
      },
    );

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Controller
        control={form.control}
        name="phoneNumber"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
            <PhoneInput value={field.value} onValueChange={field.onChange}>
              <PhoneInputInput
                id={field.name}
                placeholder="Phone number"
                aria-invalid={fieldState.invalid}
              />
            </PhoneInput>
            <FieldDescription>
              Your phone number is used to contact you.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
