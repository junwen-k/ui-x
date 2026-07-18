"use client";

import en from "react-phone-number-input/locale/en";

import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

export default function PhoneInputPrimitiveDemo() {
  return (
    <PhoneInputPrimitive.Root>
      <PhoneInputPrimitive.CountrySelect>
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
      <PhoneInputPrimitive.Input />
    </PhoneInputPrimitive.Root>
  );
}
