"use client";

import * as React from "react";

import * as PasswordInputPrimitive from "@/registry/new-york/ui/password-input-primitive";

export default function PasswordInputPrimitiveCheckbox() {
  const [visible, setVisible] = React.useState(false);

  return (
    <PasswordInputPrimitive.Root visible={visible} onVisibleChange={setVisible}>
      <PasswordInputPrimitive.Input />
      <input
        id="password-toggle"
        type="checkbox"
        checked={visible}
        onChange={(event) => setVisible(event.target.checked)}
      />
      <label htmlFor="password-toggle">Show password</label>
    </PasswordInputPrimitive.Root>
  );
}
