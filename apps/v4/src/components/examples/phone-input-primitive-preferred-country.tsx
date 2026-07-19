"use client";

import * as React from "react";

import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

export default function PhoneInputPrimitivePreferredCountry() {
  const [value, setValue] = React.useState<PhoneInputPrimitive.Value>(
    "+60123456789" as PhoneInputPrimitive.Value,
  );

  const input = React.useMemo(() => <input />, []);

  return (
    <div>
      <PhoneInputPrimitive.Root
        value={value}
        onValueChange={setValue}
        preferredCountry="MY"
        defaultInternationalForPreferredCountry
      >
        <PhoneInputPrimitive.Input render={input} />
      </PhoneInputPrimitive.Root>
      <p>
        Preferred country has been set to <code>MY</code> (Malaysia).
      </p>
      <dl>
        <dt>National format (default):</dt>
        <dd>012-345 6789</dd>
        <dt>International format:</dt>
        <dd>+60 12 345 6789</dd>
      </dl>
    </div>
  );
}
