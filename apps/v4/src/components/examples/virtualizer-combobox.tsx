"use client";

import * as React from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
} from "@/registry/new-york/ui/combobox";
import {
  Virtualized,
  VirtualizedVirtualizer,
} from "@/registry/new-york/ui/virtualized";

const items = Array.from({ length: 10000 }, (_, index) => ({
  label: `Item ${index + 1}`,
  value: index.toString(),
}));

export default function VirtualizerCombobox() {
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
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      shouldFilter={false}
    >
      <ComboboxInput placeholder="Search item..." />
      <Virtualized asChild>
        <ComboboxContent>
          {filtered.length === 0 && (
            <ComboboxEmpty>No item found.</ComboboxEmpty>
          )}
          {filtered.length > 0 && (
            <ComboboxGroup heading="Items">
              <VirtualizedVirtualizer startMargin={32}>
                {filtered.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </VirtualizedVirtualizer>
            </ComboboxGroup>
          )}
        </ComboboxContent>
      </Virtualized>
    </Combobox>
  );
}
