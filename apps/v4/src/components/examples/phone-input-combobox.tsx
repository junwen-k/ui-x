"use client";

import { CheckIcon, ChevronsUpDown, SearchIcon } from "lucide-react";
import * as React from "react";
import { getCountryCallingCode } from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import {
  CommandGroup as ComboboxGroup,
  CommandList as ComboboxList,
} from "@/components/ui/command";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxEmpty,
  comboboxItemStyle,
} from "@/registry/new-york/ui/combobox";
import * as ComboboxPrimitive from "@/registry/new-york/ui/combobox-primitive";
import {
  ControlGroup,
  ControlGroupItem,
} from "@/registry/new-york/ui/control-group";
import {
  Country,
  PhoneInput,
  PhoneInputFlag,
} from "@/registry/new-york/ui/phone-input";
import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

const regionNames = new Intl.DisplayNames(["en"], {
  type: "region",
});

export default function PhoneInputCombobox() {
  const [open, setOpen] = React.useState(false);
  const [country, setCountry] = React.useState<Country | null>(null);

  return (
    <PhoneInput country={country} onCountryChange={setCountry}>
      <Combobox
        type="single"
        value={country ?? ""}
        onValueChange={(value) => setCountry(value as Country)}
        open={open}
        onOpenChange={setOpen}
      >
        <ComboboxPrimitive.Anchor>
          <ControlGroup>
            <ControlGroupItem>
              <ComboboxPrimitive.Trigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open}>
                  <PhoneInputFlag
                    country={country}
                    title={country ?? "International"}
                  />
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </ComboboxPrimitive.Trigger>
            </ControlGroupItem>
            <ComboboxPrimitive.Portal>
              <ComboboxPrimitive.Content asChild>
                <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                  <div
                    data-slot="command-input-wrapper"
                    className="flex h-9 items-center gap-2 border-b px-3"
                  >
                    <SearchIcon className="size-4 shrink-0 opacity-50" />
                    <ComboboxPrimitive.Input
                      placeholder="Search country..."
                      className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <ComboboxList>
                    <ComboboxEmpty>No country found.</ComboboxEmpty>
                    <ComboboxGroup>
                      {PhoneInputPrimitive.getCountryOptions().map((option) => (
                        <ComboboxPrimitive.Item
                          value={option.countryCode}
                          data-slot="combobox-item"
                          className={cn(
                            comboboxItemStyle(),
                            "justify-between gap-4 pr-8",
                          )}
                          key={option.countryCode}
                        >
                          <div className="flex flex-1 items-center gap-2">
                            <div>
                              <PhoneInputFlag
                                country={option.countryCode}
                                title={option.countryCode}
                              />
                            </div>
                            <div className="line-clamp-1">
                              <ComboboxPrimitive.ItemText>
                                {regionNames.of(option.countryCode)!}
                              </ComboboxPrimitive.ItemText>
                            </div>
                          </div>
                          <div className="text-muted-foreground">
                            {`+${getCountryCallingCode(option.countryCode)}`}
                          </div>
                          <span className="absolute right-2 flex size-3.5 items-center justify-center">
                            <ComboboxPrimitive.ItemIndicator>
                              <CheckIcon className="size-4" />
                            </ComboboxPrimitive.ItemIndicator>
                          </span>
                        </ComboboxPrimitive.Item>
                      ))}
                    </ComboboxGroup>
                  </ComboboxList>
                </PopoverContent>
              </ComboboxPrimitive.Content>
            </ComboboxPrimitive.Portal>
            <ControlGroupItem>
              <InputGroup>
                <PhoneInputPrimitive.Input asChild>
                  <InputGroupInput />
                </PhoneInputPrimitive.Input>
              </InputGroup>
            </ControlGroupItem>
          </ControlGroup>
        </ComboboxPrimitive.Anchor>
      </Combobox>
    </PhoneInput>
  );
}
