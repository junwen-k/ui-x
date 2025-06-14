"use client";

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

export default function ComboboxPrimitiveDemo() {
  return (
    <ComboboxPrimitive.Root type="single">
      <ComboboxPrimitive.Anchor>
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
