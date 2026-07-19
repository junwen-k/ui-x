"use client";

import * as React from "react";

import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { SelectTrigger } from "@/components/ui/select";
import {
  PhoneInput,
  PhoneInputCountrySelect,
  PhoneInputCountrySelectContent,
  PhoneInputCountrySelectOptions,
  PhoneInputCountrySelectValue,
} from "@/registry/new-york/ui/phone-input";
import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

export default function PhoneInputDemo() {
  return (
    <PhoneInput>
      <ButtonGroup>
        <PhoneInputCountrySelect>
          <SelectTrigger>
            <PhoneInputCountrySelectValue />
          </SelectTrigger>
          <PhoneInputCountrySelectContent>
            <PhoneInputCountrySelectOptions />
          </PhoneInputCountrySelectContent>
        </PhoneInputCountrySelect>
        <InputGroup>
          <PhoneInputPrimitive.Input render={<InputGroupInput />} />
        </InputGroup>
      </ButtonGroup>
    </PhoneInput>
  );
}
