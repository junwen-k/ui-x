"use client";

import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

const regionNames = new Intl.DisplayNames(["en"], {
  type: "region",
});

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
            {`${regionNames.of(option.countryCode)} +${option.countryCallingCode}`}
          </PhoneInputPrimitive.CountrySelectOption>
        ))}
      </PhoneInputPrimitive.CountrySelect>
      <PhoneInputPrimitive.Input />
    </PhoneInputPrimitive.Root>
  );
}
