"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyholeIcon, MailIcon, UserRoundPenIcon } from "lucide-react";
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
} from "@/registry/new-york/ui/date-picker";
import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base";
import {
  PasswordInput,
  PasswordInputAdornment,
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
    <Form {...form}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <InputBase error={Boolean(fieldState.error)}>
                    <InputBaseAdornment>
                      <UserRoundPenIcon />
                    </InputBaseAdornment>
                    <InputBaseControl>
                      <FormControl>
                        <InputBaseInput placeholder="junwen-k" {...field} />
                      </FormControl>
                    </InputBaseControl>
                  </InputBase>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <InputBase error={Boolean(fieldState.error)}>
                    <InputBaseAdornment>
                      <MailIcon />
                    </InputBaseAdornment>
                    <InputBaseControl>
                      <FormControl>
                        <InputBaseInput
                          placeholder="example@junwen-k.dev"
                          {...field}
                        />
                      </FormControl>
                    </InputBaseControl>
                  </InputBase>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: add phone number input here */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <PasswordInput>
                    <PasswordInputAdornment>
                      <LockKeyholeIcon />
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
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <DatePicker
                    mode="single"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <DatePickerInput />
                    </FormControl>
                    <DatePickerContent>
                      <DatePickerCalendar
                        hideNavigation
                        captionLayout="dropdown"
                      />
                    </DatePickerContent>
                  </DatePicker>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
