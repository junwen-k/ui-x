"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyholeIcon, MailIcon, UserRoundPenIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { codeToHtml } from "shiki";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
} from "@/registry/new-york/ui/date-picker";
import {
  PasswordInput,
  PasswordInputAdornmentToggle,
} from "@/registry/new-york/ui/password-input";
import { PasswordInputInput } from "@/registry/new-york/ui/password-input";

const FormSchema = z.object({
  username: z.string({
    required_error: "Please enter your username.",
  }),
  email: z
    .string({
      required_error: "Please enter your email.",
    })
    .email(),
  password: z.string({
    required_error: "Please enter your password.",
  }),
  dob: z
    .date({
      required_error: "Please enter your date of birth.",
    })
    .nullable(),
});

export function CardWithForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      dob: null,
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
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="card-demo-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Controller
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <UserRoundPenIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id={field.name}
                    placeholder="junwen-k"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id={field.name}
                    placeholder="example@junwen-k.dev"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* TODO: add phone number input here */}
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <PasswordInput>
                  <InputGroupAddon>
                    <LockKeyholeIcon />
                  </InputGroupAddon>
                  <PasswordInputInput
                    id={field.name}
                    autoComplete="new-password"
                    placeholder="Password"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <PasswordInputAdornmentToggle />
                </PasswordInput>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="dob"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Date of Birth</FieldLabel>
                <DatePicker
                  mode="single"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <DatePickerInput aria-invalid={fieldState.invalid} />
                  <DatePickerContent>
                    <DatePickerCalendar
                      hideNavigation
                      captionLayout="dropdown"
                    />
                  </DatePickerContent>
                </DatePicker>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="card-demo-form" className="w-full">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
