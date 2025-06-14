"use client";

import * as React from "react";

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

export default function ComboboxPrimitiveMultiSelect() {
  const [value, setValue] = React.useState(fruits.map((fruit) => fruit.value));
  const [inputValue, setInputValue] = React.useState("");

  return (
    <ComboboxPrimitive.Root
      type="multiple"
      value={value}
      onValueChange={setValue}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
    >
      <ComboboxPrimitive.Anchor>
        <ComboboxPrimitive.TagGroup className="flex gap-2">
          {value.map((v) => (
            <ComboboxPrimitive.TagGroupItem key={v} value={v}>
              {fruits.find((fruit) => fruit.value === v)?.label}
              <ComboboxPrimitive.TagGroupItemRemove>
                &#215;
              </ComboboxPrimitive.TagGroupItemRemove>
            </ComboboxPrimitive.TagGroupItem>
          ))}
        </ComboboxPrimitive.TagGroup>
        <ComboboxPrimitive.Input placeholder="Search fruit..." />
        <ComboboxPrimitive.Clear>&#215;</ComboboxPrimitive.Clear>
        <ComboboxPrimitive.Trigger>&#8595;</ComboboxPrimitive.Trigger>
      </ComboboxPrimitive.Anchor>
      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Content asChild>
          <ComboboxPrimitive.List>
            <ComboboxPrimitive.Empty>No fruit found.</ComboboxPrimitive.Empty>
            <ComboboxPrimitive.Group heading="Fruits">
              {fruits.map((fruit) => (
                <ComboboxPrimitive.Item
                  key={fruit.value}
                  value={fruit.value}
                  className="data-[selected=true]:ring"
                >
                  <ComboboxPrimitive.ItemText>
                    {fruit.label}
                  </ComboboxPrimitive.ItemText>
                  <ComboboxPrimitive.ItemIndicator>
                    &#x2714;
                  </ComboboxPrimitive.ItemIndicator>
                </ComboboxPrimitive.Item>
              ))}
            </ComboboxPrimitive.Group>
          </ComboboxPrimitive.List>
        </ComboboxPrimitive.Content>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  );
}
