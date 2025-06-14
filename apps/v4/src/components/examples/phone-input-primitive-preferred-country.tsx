"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import * as PhoneInputPrimitive from "@/registry/new-york/ui/phone-input-primitive";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn("border-input border", className)} {...props} />;
}

export default function PhoneInputPrimitivePreferredCountry() {
  const [value, setValue] = React.useState<PhoneInputPrimitive.Value>(
    "+60123456789" as PhoneInputPrimitive.Value,
  );

  return (
    <div className="flex flex-col gap-2">
      <PhoneInputPrimitive.Root
        value={value}
        onValueChange={setValue}
        preferredCountry="MY"
        defaultInternationalForPreferredCountry
      >
        <PhoneInputPrimitive.Input asChild>
          <Input />
        </PhoneInputPrimitive.Input>
      </PhoneInputPrimitive.Root>
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
  );
}
