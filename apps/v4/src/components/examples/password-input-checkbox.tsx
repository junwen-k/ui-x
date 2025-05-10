"use client";

import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  PasswordInput,
  PasswordInputInput,
} from "@/registry/new-york/ui/password-input";

export default function PasswordInputCheckbox() {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="grid gap-3">
      <PasswordInput visible={visible} onVisibleChange={setVisible}>
        <PasswordInputInput />
      </PasswordInput>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="toggle-password"
          checked={visible}
          onCheckedChange={(checked) => setVisible(Boolean(checked))}
        />
        <label
          htmlFor="toggle-password"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show password
        </label>
      </div>
    </div>
  );
}
