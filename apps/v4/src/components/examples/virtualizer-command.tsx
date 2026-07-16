"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  Virtualized,
  VirtualizedVirtualizer,
} from "@/registry/new-york/ui/virtualized";

const items = Array.from({ length: 1000 }, (_, index) => ({
  label: `Item ${index + 1}`,
  value: index.toString(),
}));

export default function VirtualizerCommand() {
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
      itemToStringLabel={(value: string) =>
        items.find((item) => item.value === value)?.label ?? ""
      }
      filteredItems={filtered}
      virtualized
    >
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="w-[200px] justify-between font-normal"
          />
        }
      >
        <ComboboxValue placeholder="Select item..." />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search item..." showTrigger={false} />
        <ComboboxEmpty>No item found.</ComboboxEmpty>
        <Virtualized render={<ComboboxList />}>
          <VirtualizedVirtualizer>
            {filtered.map((item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            ))}
          </VirtualizedVirtualizer>
        </Virtualized>
      </ComboboxContent>
    </Combobox>
  );
}
