"use client";

import {
  PasswordInput,
  PasswordInputAdornmentToggle,
  PasswordInputInput,
} from "@/registry/new-york/ui/password-input";

export default function PasswordInputDemo() {
  return (
    <PasswordInput>
      <PasswordInputInput placeholder="Password" />
      <PasswordInputAdornmentToggle />
    </PasswordInput>
  );
}
