"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SmilePlusIcon } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { codeToHtml } from "shiki";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from "@/registry/new-york/ui/emoji-picker";

const FormSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
});

export default function EmojiPickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  const [open, setOpen] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Popover open={open} onOpenChange={setOpen}>
        <Controller
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Message</FieldLabel>
              <InputGroup className="w-96">
                <InputGroupTextarea
                  {...field}
                  id={field.name}
                  ref={textareaRef}
                  rows={3}
                  placeholder="Type a message..."
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <PopoverTrigger
                    render={
                      <InputGroupButton
                        size="icon-xs"
                        className="ml-auto"
                        aria-invalid={fieldState.invalid}
                      />
                    }
                  >
                    <SmilePlusIcon />
                    <span className="sr-only">Pick emoji</span>
                  </PopoverTrigger>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <PopoverContent className="w-fit p-0" align="end" side="bottom">
          <Controller
            control={form.control}
            name="message"
            render={({ field }) => (
              <EmojiPicker
                className="h-84"
                onEmojiSelect={({ emoji }) => {
                  const textarea = textareaRef.current;
                  if (!textarea) {
                    return;
                  }

                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;

                  field.onChange(
                    [
                      field.value.slice(0, start),
                      emoji,
                      field.value.slice(end),
                    ].join(""),
                  );

                  setOpen(false);

                  setTimeout(() => {
                    const position = start + emoji.length;
                    textarea.focus();
                    textarea.setSelectionRange(position, position);
                  });
                }}
              >
                <EmojiPickerSearch />
                <EmojiPickerContent />
                <EmojiPickerFooter />
              </EmojiPicker>
            )}
          />
        </PopoverContent>
      </Popover>
      <Button type="submit">Submit</Button>
    </form>
  );
}
