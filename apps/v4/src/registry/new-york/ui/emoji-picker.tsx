"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import {
  type EmojiPickerListCategoryHeaderProps,
  type EmojiPickerListEmojiProps,
  type EmojiPickerListRowProps,
  EmojiPicker as EmojiPickerPrimitive,
  SkinTone,
  useActiveEmoji,
  useSkinTone,
} from "frimousse";
import { LoaderIcon, SearchIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function EmojiPicker({
  className,
  ...props
}: React.ComponentProps<typeof EmojiPickerPrimitive.Root>) {
  return (
    <EmojiPickerPrimitive.Root
      data-slot="emoji-picker"
      className={cn(
        "bg-popover text-popover-foreground isolate flex h-full w-fit flex-col overflow-hidden rounded-lg",
        className,
      )}
      {...props}
    />
  );
}

function EmojiPickerSearch({
  className,
  ...props
}: React.ComponentProps<typeof EmojiPickerPrimitive.Search>) {
  return (
    <div
      data-slot="emoji-picker-search-wrapper"
      className={cn("p-1 pb-0", className)}
    >
      <InputGroup className="border-input/30 bg-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <EmojiPickerPrimitive.Search
          data-slot="emoji-picker-search"
          className="placeholder:text-muted-foreground w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function EmojiPickerRow({ children, ...props }: EmojiPickerListRowProps) {
  return (
    <div data-slot="emoji-picker-row" className="scroll-my-1 px-1" {...props}>
      {children}
    </div>
  );
}

function EmojiPickerEmoji({
  emoji,
  className,
  ...props
}: EmojiPickerListEmojiProps) {
  return (
    <button
      data-slot="emoji-picker-emoji"
      className={cn(
        "data-[active]:bg-accent flex size-7 items-center justify-center rounded-sm text-base",
        className,
      )}
      {...props}
    >
      {emoji.emoji}
    </button>
  );
}

function EmojiPickerCategoryHeader({
  category,
  ...props
}: EmojiPickerListCategoryHeaderProps) {
  return (
    <div
      data-slot="emoji-picker-category-header"
      className="bg-popover text-muted-foreground px-3 pt-3.5 pb-2 text-xs leading-none"
      {...props}
    >
      {category.label}
    </div>
  );
}

function EmojiPickerContent({
  className,
  ...props
}: React.ComponentProps<typeof EmojiPickerPrimitive.Viewport>) {
  return (
    <EmojiPickerPrimitive.Viewport
      data-slot="emoji-picker-viewport"
      className={cn("relative flex-1 outline-hidden", className)}
      {...props}
    >
      <EmojiPickerPrimitive.Loading
        data-slot="emoji-picker-loading"
        className="text-muted-foreground absolute inset-0 flex items-center justify-center"
      >
        <LoaderIcon className="size-4 animate-spin" />
      </EmojiPickerPrimitive.Loading>
      <EmojiPickerPrimitive.Empty
        data-slot="emoji-picker-empty"
        className="text-muted-foreground absolute inset-0 flex items-center justify-center text-sm"
      >
        No emoji found.
      </EmojiPickerPrimitive.Empty>
      <EmojiPickerPrimitive.List
        data-slot="emoji-picker-list"
        className="pb-1 select-none"
        components={{
          Row: EmojiPickerRow,
          Emoji: EmojiPickerEmoji,
          CategoryHeader: EmojiPickerCategoryHeader,
        }}
      />
    </EmojiPickerPrimitive.Viewport>
  );
}

function EmojiPickerFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="emoji-picker-footer"
      className={cn(
        "flex w-full max-w-(--frimousse-viewport-width) min-w-0 items-center justify-between gap-1 border-t p-2",
        className,
      )}
      {...props}
    >
      <EmojiPickerActiveEmojiPreview />
      <EmojiPickerSkinToneSelector />
    </div>
  );
}

function EmojiPickerActiveEmojiPreview({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const emoji = useActiveEmoji();

  if (!emoji) {
    return (
      <div
        className="text-muted-foreground ml-1.5 flex h-7 items-center truncate text-xs"
        {...props}
      >
        Select an emoji…
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      <div className="flex items-center gap-1">
        <div className="flex size-7 flex-none items-center justify-center text-lg">
          {emoji.emoji}
        </div>
        <span className="text-secondary-foreground truncate text-xs">
          {emoji.label}
        </span>
      </div>
    </div>
  );
}

function EmojiPickerSkinToneSelector() {
  const [skinTone, setSkinTone, skinToneVariations] = useSkinTone();

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" size="icon" className="size-7" />}
      >
        {
          skinToneVariations.find(
            (variation) => variation.skinTone === skinTone,
          )?.emoji
        }
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="center"
        className="w-fit overflow-hidden p-0"
      >
        <ToggleGroup
          value={[skinTone]}
          onValueChange={([value]) => value && setSkinTone(value as SkinTone)}
          aria-label="Select skin tone"
          orientation="horizontal"
        >
          {skinToneVariations.map((variation) => (
            <Toggle
              key={variation.skinTone}
              aria-label={`${variation.skinTone} skin tone`}
              value={variation.skinTone}
              className="data-[pressed]:bg-accent data-[pressed]:text-accent-foreground hover:bg-muted focus-visible:ring-ring size-7"
            >
              {variation.emoji}
            </Toggle>
          ))}
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );
}

export {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
};
