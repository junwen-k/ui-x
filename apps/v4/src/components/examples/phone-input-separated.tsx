"use client";

import { PhoneIcon } from "lucide-react";
import * as React from "react";
import { getCountryCallingCode } from "react-phone-number-input";

import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base";
import {
  Country,
  PhoneInput,
  PhoneInputCountrySelect,
  PhoneInputCountrySelectContent,
  PhoneInputCountrySelectOptions,
  PhoneInputCountrySelectTrigger,
  PhoneInputCountrySelectValue,
  PhoneInputFlag,
} from "@/registry/new-york/ui/phone-input";
import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

export default function PhoneInputSeparated() {
  const [country, setCountry] = React.useState<Country | null>(null);

  return (
    <PhoneInput
      country={country}
      onCountryChange={setCountry}
      preferredCountry="MY"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <PhoneInputCountrySelect>
            <PhoneInputCountrySelectTrigger>
              <PhoneInputCountrySelectValue
                placeholder={
                  <PhoneInputFlag country={null} title="International" />
                }
              >
                <PhoneInputFlag country={country} title={country!} />
              </PhoneInputCountrySelectValue>
            </PhoneInputCountrySelectTrigger>
            <PhoneInputCountrySelectContent>
              <PhoneInputCountrySelectOptions />
            </PhoneInputCountrySelectContent>
          </PhoneInputCountrySelect>
          <InputBase>
            <InputBaseAdornment>
              {country ? `+${getCountryCallingCode(country)}` : <PhoneIcon />}
            </InputBaseAdornment>
            <InputBaseControl>
              <PhoneInputPrimitive.Input asChild>
                <InputBaseInput
                  placeholder={country === null ? "012-345 6789" : undefined}
                />
              </PhoneInputPrimitive.Input>
            </InputBaseControl>
          </InputBase>
        </div>
        <p className="text-muted-foreground text-sm">
          Preferred country has been set to{" "}
          <code className="font-medium">MY</code> (Malaysia).
        </p>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="text-muted-foreground">National format (default):</dt>
          <dd className="text-foreground">012-345 6789</dd>
          <dt className="text-muted-foreground">International format:</dt>
          <dd className="text-foreground">+60 12 345 6789</dd>
        </dl>
      </div>
    </PhoneInput>
  );
}
