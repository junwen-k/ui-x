"use client";

import en from "react-phone-number-input/locale/en";

import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

const countrySelectStyle =
  "border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-8 border bg-transparent px-2 text-sm outline-none focus-visible:ring-3";

export default function PhoneInputPrimitiveDisabled() {
  return (
    <PhoneInputPrimitive.Root disabled>
      <ButtonGroup>
        <PhoneInputPrimitive.CountrySelect className={countrySelectStyle}>
          <PhoneInputPrimitive.CountryInternationalSelectOption>
            International
          </PhoneInputPrimitive.CountryInternationalSelectOption>
          {PhoneInputPrimitive.getCountryOptions().map((option) => (
            <PhoneInputPrimitive.CountrySelectOption
              key={option.countryCode}
              value={option.countryCode}
            >
              {`${en[option.countryCode]} +${option.countryCallingCode}`}
            </PhoneInputPrimitive.CountrySelectOption>
          ))}
        </PhoneInputPrimitive.CountrySelect>
        <PhoneInputPrimitive.Input render={<Input />} />
      </ButtonGroup>
    </PhoneInputPrimitive.Root>
  );
}
