import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import * as PasswordInputPrimitive from "@/registry/new-york/ui/password-input-primitive";

type PasswordInputProps = React.ComponentProps<
  typeof PasswordInputPrimitive.Root
> &
  React.ComponentProps<typeof InputGroup>;

function PasswordInput({
  visible,
  defaultVisible,
  onVisibleChange,
  ...props
}: PasswordInputProps) {
  return (
    <PasswordInputPrimitive.Root
      visible={visible}
      defaultVisible={defaultVisible}
      onVisibleChange={onVisibleChange}
    >
      <InputGroup data-slot="password-input" {...props} />
    </PasswordInputPrimitive.Root>
  );
}

function PasswordInputAdornment(
  props: React.ComponentProps<typeof InputGroupAddon>,
) {
  return <InputGroupAddon data-slot="password-input-adornment" {...props} />;
}

function PasswordInputAdornmentButton(
  props: React.ComponentProps<typeof InputGroupButton>,
) {
  return (
    <InputGroupButton
      data-slot="password-input-adornment-button"
      size="icon-xs"
      {...props}
    />
  );
}

function PasswordInputInput(
  props: React.ComponentProps<typeof PasswordInputPrimitive.Input>,
) {
  return (
    <PasswordInputPrimitive.Input
      data-slot="password-input-input"
      asChild
      {...props}
    >
      <InputGroupInput />
    </PasswordInputPrimitive.Input>
  );
}

function PasswordInputAdornmentToggle({
  className,
  ...props
}: React.ComponentProps<typeof PasswordInputPrimitive.Toggle>) {
  return (
    <InputGroupAddon align="inline-end">
      <PasswordInputPrimitive.Toggle
        data-slot="password-input-adornment-toggle"
        asChild
        className={cn("group", className)}
        {...props}
      >
        <InputGroupButton size="icon-xs">
          <EyeIcon className="hidden size-4 group-data-[state=visible]:block" />
          <EyeOffIcon className="block size-4 group-data-[state=visible]:hidden" />
        </InputGroupButton>
      </PasswordInputPrimitive.Toggle>
    </InputGroupAddon>
  );
}

export {
  PasswordInput,
  PasswordInputAdornment,
  PasswordInputAdornmentButton,
  PasswordInputInput,
  PasswordInputAdornmentToggle,
};
