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
import {
  Virtualized,
  VirtualizedVirtualizer,
} from "@/registry/new-york/ui/virtualized";

const items = Array.from({ length: 1000 }, (_, index) => ({
  label: `Item ${index + 1}`,
  value: index.toString(),
}));

export default function VirtualizerCommand() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!inputValue) {
      return items;
    }

    return items.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue]);

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
            filtered.find((item) => item.value === value)?.label ?? "",
          );
        }
      }}
      shouldFilter={false}
    >
      <ComboboxPrimitive.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : "Select item..."}
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
                placeholder="Search item..."
                className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Virtualized asChild>
              <ComboboxList>
                {filtered.length === 0 && (
                  <ComboboxEmpty>No item found.</ComboboxEmpty>
                )}
                {filtered.length > 0 && (
                  <ComboboxGroup>
                    <VirtualizedVirtualizer>
                      {filtered.map((item) => (
                        <ComboboxItem key={item.value} value={item.value}>
                          {item.label}
                        </ComboboxItem>
                      ))}
                    </VirtualizedVirtualizer>
                  </ComboboxGroup>
                )}
              </ComboboxList>
            </Virtualized>
          </PopoverContent>
        </ComboboxPrimitive.Content>
      </ComboboxPrimitive.Portal>
    </Combobox>
  );
}
