"use client";

import {
  PasswordInput,
  PasswordInputAdornmentToggle,
  PasswordInputInput,
} from "@/registry/new-york/ui/password-input";

export default function PasswordInputDemo() {
  return (
    <PasswordInput className="max-w-xs">
      <PasswordInputInput placeholder="Password" />
      <PasswordInputAdornmentToggle />
    </PasswordInput>
  );
}
