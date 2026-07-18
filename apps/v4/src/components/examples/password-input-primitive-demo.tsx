import { EyeIcon, EyeOffIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import * as PasswordInputPrimitive from "@/registry/new-york/ui/password-input-primitive";

export default function PasswordInputPrimitiveDemo() {
  return (
    <PasswordInputPrimitive.Root>
      <InputGroup>
        <PasswordInputPrimitive.Input
          placeholder="Password"
          render={<InputGroupInput />}
        />
        <InputGroupAddon align="inline-end">
          <PasswordInputPrimitive.Toggle
            className="group"
            render={<InputGroupButton size="icon-xs" />}
          >
            <EyeIcon className="hidden size-4 group-data-visible:block" />
            <EyeOffIcon className="block size-4 group-data-visible:hidden" />
          </PasswordInputPrimitive.Toggle>
        </InputGroupAddon>
      </InputGroup>
    </PasswordInputPrimitive.Root>
  );
}
