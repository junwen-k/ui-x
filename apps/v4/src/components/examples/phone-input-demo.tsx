"use client";

import * as React from "react";

import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
  ControlGroup,
  ControlGroupItem,
} from "@/registry/new-york/ui/control-group";
import {
  PhoneInput,
  PhoneInputCountrySelect,
  PhoneInputCountrySelectContent,
  PhoneInputCountrySelectOptions,
  PhoneInputCountrySelectTrigger,
  PhoneInputCountrySelectValue,
} from "@/registry/new-york/ui/phone-input";
import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

export default function PhoneInputDemo() {
  return (
    <PhoneInput>
      <ControlGroup>
        <PhoneInputCountrySelect>
          <ControlGroupItem>
            <PhoneInputCountrySelectTrigger>
              <PhoneInputCountrySelectValue />
            </PhoneInputCountrySelectTrigger>
          </ControlGroupItem>
          <PhoneInputCountrySelectContent>
            <PhoneInputCountrySelectOptions />
          </PhoneInputCountrySelectContent>
        </PhoneInputCountrySelect>
        <ControlGroupItem>
          <InputGroup>
            <PhoneInputPrimitive.Input asChild>
              <InputGroupInput />
            </PhoneInputPrimitive.Input>
          </InputGroup>
        </ControlGroupItem>
      </ControlGroup>
    </PhoneInput>
  );
}
