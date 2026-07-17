"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { BadgeGroup, BadgeGroupItem } from "@/registry/new-york/ui/badge-group";

const flavours = [
  {
    label: "Chocolate",
    value: "chocolate",
  },
  {
    label: "Mint",
    value: "mint",
  },
  {
    label: "Strawberry",
    value: "strawberry",
  },
  {
    label: "Vanilla",
    value: "vanilla",
  },
];

export default function BadgeGroupForm() {
  const [options, setOptions] = React.useState(flavours);
  const [selected, setSelected] = React.useState(
    flavours.map((option) => option.value).slice(0, 2),
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Customize your order</CardTitle>
        <CardDescription>
          Tell us how you would like your ice cream.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>Ice cream flavor</FieldLabel>
          <BadgeGroup
            type="multiple"
            value={selected}
            onValueChange={setSelected}
            onRemove={(value) => {
              setOptions((options) =>
                options.filter((option) => !value.includes(option.value)),
              );
              setSelected((selected) =>
                selected.filter((flavour) => !value.includes(flavour)),
              );
            }}
          >
            {options.map((option) => (
              <BadgeGroupItem key={option.value} value={option.value}>
                {option.label}
              </BadgeGroupItem>
            ))}
          </BadgeGroup>
          <FieldDescription>
            Select your favorite flavors, or remove the ones you dislike.
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
