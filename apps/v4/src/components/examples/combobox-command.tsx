"use client";

import { ChevronsUpDown, SearchIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  CommandGroup as ComboboxGroup,
  CommandList as ComboboxList,
} from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxItem,
} from "@/registry/new-york/ui/combobox";
import * as ComboboxPrimitive from "@/registry/new-york/ui/combobox-primitive";

const fruits = [
  {
    value: "apple",
    label: "Apple",
  },
  {
    value: "banana",
    label: "Banana",
  },
  {
    value: "blueberry",
    label: "Blueberry",
  },
  {
    value: "grapes",
    label: "Grapes",
  },
  {
    value: "pineapple",
    label: "Pineapple",
  },
];

export default function ComboboxCommand() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Combobox
      type="single"
      value={value}
      onValueChange={setValue}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setInputValue(
            fruits.find((item) => item.value === value)?.label ?? "",
          );
        }
      }}
    >
      <ComboboxPrimitive.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? fruits.find((item) => item.value === value)?.label
            : "Select fruit..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </ComboboxPrimitive.Trigger>
      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Content asChild>
          <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
            <div
              data-slot="command-input-wrapper"
              className="flex h-9 items-center gap-2 border-b px-3"
            >
              <SearchIcon className="size-4 shrink-0 opacity-50" />
              <ComboboxPrimitive.Input
                placeholder="Search fruit..."
                className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <ComboboxList>
              <ComboboxEmpty>No fruit found.</ComboboxEmpty>
              <ComboboxGroup>
                {fruits.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </PopoverContent>
        </ComboboxPrimitive.Content>
      </ComboboxPrimitive.Portal>
    </Combobox>
  );
}
