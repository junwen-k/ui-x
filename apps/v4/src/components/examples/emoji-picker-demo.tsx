"use client";

import { SmilePlusIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

export default function EmojiPickerDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button />}>
        <SmilePlusIcon />
        Try it
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit p-0">
        <EmojiPicker
          className="h-84"
          onEmojiSelect={({ emoji, label }) => toast(`${emoji} ${label}`)}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
          <EmojiPickerFooter />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
