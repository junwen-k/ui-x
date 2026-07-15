"use client";

import * as React from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
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
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      filteredItems={filtered}
      virtualized
    >
      <ComboboxInput placeholder="Search item..." />
      <ComboboxContent>
        <ComboboxEmpty>No item found.</ComboboxEmpty>
        <Virtualized asChild>
          <ComboboxList>
            <VirtualizedVirtualizer>
              {filtered.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </VirtualizedVirtualizer>
          </ComboboxList>
        </Virtualized>
      </ComboboxContent>
    </Combobox>
  );
}
