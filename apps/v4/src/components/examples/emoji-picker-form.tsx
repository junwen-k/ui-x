"use client";

import { SmilePlusIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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

export default function EmojiPickerForm() {
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
        <CardDescription>We would love to hear what you think.</CardDescription>
      </CardHeader>
      <CardContent>
        <Popover open={open} onOpenChange={setOpen}>
          <Field>
            <FieldLabel htmlFor="emoji-picker-form-message">Message</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="emoji-picker-form-message"
                ref={textareaRef}
                rows={3}
                placeholder="Type a message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <InputGroupAddon align="block-end">
                <PopoverTrigger
                  render={
                    <InputGroupButton size="icon-xs" className="ml-auto" />
                  }
                >
                  <SmilePlusIcon />
                  <span className="sr-only">Pick emoji</span>
                </PopoverTrigger>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Use the emoji picker to add some personality.
            </FieldDescription>
          </Field>
          <PopoverContent className="w-fit p-0" align="end" side="bottom">
            <EmojiPicker
              className="h-84"
              onEmojiSelect={({ emoji }) => {
                const textarea = textareaRef.current;
                if (!textarea) {
                  return;
                }

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                setMessage(
                  [message.slice(0, start), emoji, message.slice(end)].join(""),
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
          </PopoverContent>
        </Popover>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Send
        </Button>
      </CardFooter>
    </Card>
  );
}
