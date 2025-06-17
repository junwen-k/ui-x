"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, GlobeIcon } from "lucide-react";
import * as React from "react";
import { getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

interface PhoneInputFlagProps
  extends React.ComponentProps<
    NonNullable<(typeof flags)[keyof typeof flags]>
  > {
  country: PhoneInputPrimitive.Country | null;
}

function PhoneInputFlag({ country, ...props }: PhoneInputFlagProps) {
  const CountryFlag = country ? flags[country] : null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xs [&>svg:not([class*='size-'])]:size-full",
        CountryFlag &&
          "[&>svg:not([class*='size-'])]:h-4 [&>svg:not([class*='size-'])]:w-6",
      )}
    >
      {CountryFlag ? (
        <CountryFlag {...props} />
      ) : (
        <GlobeIcon className="text-muted-foreground size-4" />
      )}
    </div>
  );
}

function PhoneInput(
  props: React.ComponentProps<typeof PhoneInputPrimitive.Root>,
) {
  return <PhoneInputPrimitive.Root data-slot="phone-input" {...props} />;
}

function PhoneInputInput(
  props: React.ComponentProps<typeof PhoneInputPrimitive.Input>,
) {
  return (
    <PhoneInputPrimitive.Input data-slot="phone-input-input" asChild {...props}>
      {React.useMemo(
        () => (
          <Input />
        ),
        [],
      )}
    </PhoneInputPrimitive.Input>
  );
}

type PhoneInputCountrySelectProps = Omit<
  React.ComponentProps<typeof Select>,
  "value" | "onValueChange"
>;

function PhoneInputCountrySelect(props: PhoneInputCountrySelectProps) {
  const { country, onCountryChange } = PhoneInputPrimitive.usePhoneInput();

  return (
    <Select
      data-slot="phone-input-country-select"
      value={country ?? ""}
      onValueChange={(value) =>
        onCountryChange(
          value === PhoneInputPrimitive.INTERNATIONAL_COUNTRY_CODE
            ? null
            : (value as PhoneInputPrimitive.Country),
        )
      }
      {...props}
    />
  );
}

function PhoneInputCountrySelectValue(
  props: React.ComponentProps<typeof SelectValue>,
) {
  return (
    <SelectValue data-slot="phone-input-country-select-value" {...props} />
  );
}

function PhoneInputCountrySelectTrigger(
  props: React.ComponentProps<typeof SelectTrigger>,
) {
  return (
    <SelectTrigger data-slot="phone-input-country-select-trigger" {...props} />
  );
}

function PhoneInputCountrySelectContent(
  props: React.ComponentProps<typeof SelectContent>,
) {
  return (
    <SelectContent data-slot="phone-input-country-select-content" {...props} />
  );
}

function PhoneInputCountrySelectOptions() {
  return (
    <>
      <PhoneInputCountrySelectInternationalItem />
      {PhoneInputPrimitive.getCountryOptions().map((option) => (
        <PhoneInputCountrySelectItem
          key={option.countryCode}
          value={option.countryCode}
        />
      ))}
    </>
  );
}

function PhoneInputCountrySelectInternationalItem(
  props: Omit<React.ComponentProps<typeof SelectItem>, "value">,
) {
  const { country } = PhoneInputPrimitive.usePhoneInput();

  return (
    <SelectPrimitive.Item
      data-slot="phone-input-country-select-international-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center justify-between gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      )}
      value={PhoneInputPrimitive.INTERNATIONAL_COUNTRY_CODE}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-4 w-6 items-center justify-center">
          <PhoneInputFlag country={null} title="International" />
        </div>
        <SelectPrimitive.ItemText>International</SelectPrimitive.ItemText>
      </div>
      {country === null && (
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
          <CheckIcon className="size-4" />
        </span>
      )}
    </SelectPrimitive.Item>
  );
}

interface PhoneInputCountrySelectItemProps
  extends Omit<React.ComponentProps<typeof SelectPrimitive.Item>, "value"> {
  value: PhoneInputPrimitive.Country;
}

const regionNames = new Intl.DisplayNames(["en"], {
  type: "region",
});

function PhoneInputCountrySelectItem({
  className,
  value,
  ...props
}: PhoneInputCountrySelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="phone-input-country-select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center justify-between gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      value={value}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div>
          <PhoneInputFlag country={value} title={value} />
        </div>
        <SelectPrimitive.ItemText>
          {regionNames.of(value)}
        </SelectPrimitive.ItemText>
      </div>
      <div className="text-muted-foreground">
        {`+${getCountryCallingCode(value)}`}
      </div>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

export type {
  Country,
  Value,
} from "@/registry/new-york/ui/phone-input-primitive";

export {
  PhoneInput,
  PhoneInputFlag,
  PhoneInputInput,
  PhoneInputCountrySelect,
  PhoneInputCountrySelectContent,
  PhoneInputCountrySelectInternationalItem,
  PhoneInputCountrySelectItem,
  PhoneInputCountrySelectOptions,
  PhoneInputCountrySelectTrigger,
  PhoneInputCountrySelectValue,
};
