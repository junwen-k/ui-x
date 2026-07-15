"use client";

import { Slottable } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  Loader2Icon,
  XIcon,
} from "lucide-react";
import * as React from "react";

import { badgeVariants } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import * as ComboboxPrimitive from "@/registry/new-york/ui/combobox-primitive";

export const Combobox = ComboboxPrimitive.Root;

function ComboboxInputGroup({
  children,
  ...props
}: React.ComponentProps<typeof InputGroup>) {
  return (
    <ComboboxPrimitive.Anchor asChild>
      <InputGroup data-slot="combobox-input-group" {...props}>
        {children}
        <InputGroupAddon align="inline-end">
          <ComboboxPrimitive.Clear asChild>
            <InputGroupButton size="icon-xs">
              <XIcon />
            </InputGroupButton>
          </ComboboxPrimitive.Clear>
          <ComboboxPrimitive.Trigger asChild>
            <InputGroupButton size="icon-xs">
              <ChevronsUpDownIcon />
            </InputGroupButton>
          </ComboboxPrimitive.Trigger>
        </InputGroupAddon>
      </InputGroup>
    </ComboboxPrimitive.Anchor>
  );
}

function ComboboxInput(
  props: React.ComponentProps<typeof ComboboxPrimitive.Input>,
) {
  return (
    <ComboboxInputGroup>
      <ComboboxPrimitive.Input asChild>
        <InputGroupInput data-slot="combobox-input" {...props} />
      </ComboboxPrimitive.Input>
    </ComboboxInputGroup>
  );
}

function ComboboxTagsInput({
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Input>) {
  return (
    <ComboboxInputGroup className="h-auto min-h-8">
      <ComboboxPrimitive.TagGroup asChild>
        <div
          data-slot="combobox-tags-input"
          className="flex flex-1 flex-wrap items-center gap-1.5 py-1 pl-2.5"
        >
          {children}
          <ComboboxPrimitive.Input asChild>
            <InputGroupInput className="h-6 px-0" {...props} />
          </ComboboxPrimitive.Input>
        </div>
      </ComboboxPrimitive.TagGroup>
    </ComboboxInputGroup>
  );
}

function ComboboxTag({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.TagGroupItem>) {
  return (
    <ComboboxPrimitive.TagGroupItem
      data-slot="combobox-tag"
      className={cn(
        badgeVariants({ variant: "outline" }),
        "group gap-1 pr-1.5 data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Slottable>{children}</Slottable>
      <ComboboxPrimitive.TagGroupItemRemove className="group-data-disabled:pointer-events-none">
        <XIcon className="size-4" />
        <span className="sr-only">Remove</span>
      </ComboboxPrimitive.TagGroupItemRemove>
    </ComboboxPrimitive.TagGroupItem>
  );
}

function ComboboxContent({
  children,
  className,
  align = "center",
  alignOffset = 4,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Content>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Content
        data-slot="combobox-content"
        asChild
        align={align}
        alignOffset={alignOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 w-(--radix-popover-trigger-width) origin-(--radix-popover-content-transform-origin) scroll-py-1 overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md outline-hidden",
          className,
        )}
        {...props}
      >
        <ComboboxPrimitive.List>{children}</ComboboxPrimitive.List>
      </ComboboxPrimitive.Content>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Empty>) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  );
}

function ComboboxLoading({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Loading>) {
  return (
    <ComboboxPrimitive.Loading
      data-slot="combobox-loading"
      className={cn("flex items-center justify-center px-1.5 py-2", className)}
      {...props}
    >
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className="size-4 animate-spin"
      />
    </ComboboxPrimitive.Loading>
  );
}

function ComboboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Group>) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Separator>) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

export const comboboxItemStyle = cva(
  "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
);

type ComboboxItemProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Item>,
  "children"
> &
  Pick<React.ComponentProps<typeof ComboboxPrimitive.ItemText>, "children">;

function ComboboxItem({ className, children, ...props }: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(comboboxItemStyle(), className)}
      {...props}
    >
      <ComboboxPrimitive.ItemText>{children}</ComboboxPrimitive.ItemText>
      <ComboboxPrimitive.ItemIndicator className="absolute right-2 flex size-3.5 items-center justify-center">
        <CheckIcon className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

export {
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxTagsInput,
  ComboboxTag,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxLoading,
  ComboboxGroup,
  ComboboxSeparator,
  ComboboxItem,
};
