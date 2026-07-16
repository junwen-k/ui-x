"use client";

import * as React from "react";
import { getCountryCallingCode } from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
  Country,
  PhoneInput,
  PhoneInputFlag,
} from "@/registry/new-york/ui/phone-input";
import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

const regionNames = new Intl.DisplayNames(["en"], {
  type: "region",
});

const countries = PhoneInputPrimitive.getCountryOptions().map(
  (option) => option.countryCode,
);

export default function PhoneInputCombobox() {
  const [country, setCountry] = React.useState<Country | null>(null);
  const anchor = useComboboxAnchor();

  return (
    <PhoneInput country={country} onCountryChange={setCountry}>
      <Combobox
        items={countries}
        value={country}
        onValueChange={(value) => setCountry(value as Country)}
        itemToStringLabel={(value) => regionNames.of(value as Country) ?? ""}
      >
        <ButtonGroup ref={anchor}>
          <ComboboxTrigger
            render={<Button variant="outline" />}
            aria-label="Select country"
          >
            <PhoneInputFlag country={country} title={country ?? "International"} />
          </ComboboxTrigger>
          <InputGroup>
            <PhoneInputPrimitive.Input render={<InputGroupInput />} />
          </InputGroup>
        </ButtonGroup>
        <ComboboxContent anchor={anchor}>
          <ComboboxInput placeholder="Search country..." showTrigger={false} />
          <ComboboxEmpty>No country found.</ComboboxEmpty>
          <ComboboxList>
            {(countryCode: Country) => (
              <ComboboxItem key={countryCode} value={countryCode}>
                <PhoneInputFlag country={countryCode} title={countryCode} />
                <span className="line-clamp-1">
                  {regionNames.of(countryCode)}
                </span>
                <span className="text-muted-foreground ml-auto">
                  {`+${getCountryCallingCode(countryCode)}`}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </PhoneInput>
  );
}
