"use client";

import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import * as PasswordInputPrimitive from "@/registry/new-york/ui/password-input-primitive";

export default function PasswordInputPrimitiveCheckbox() {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="grid gap-3">
      <PasswordInputPrimitive.Root
        visible={visible}
        onVisibleChange={setVisible}
      >
        <InputGroup>
          <PasswordInputPrimitive.Input
            placeholder="Password"
            render={<InputGroupInput />}
          />
        </InputGroup>
      </PasswordInputPrimitive.Root>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="toggle-password"
          checked={visible}
          onCheckedChange={(checked) => setVisible(Boolean(checked))}
        />
        <Label htmlFor="toggle-password">Show password</Label>
      </div>
    </div>
  );
}
