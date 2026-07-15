import * as PasswordInputPrimitive from "@/registry/new-york/ui/password-input-primitive";

export default function PasswordInputPrimitiveDemo() {
  return (
    <PasswordInputPrimitive.Root>
      <PasswordInputPrimitive.Input />
      <PasswordInputPrimitive.Toggle>
        <PasswordInputPrimitive.Indicator className="group">
          <span className="hidden group-data-visible:block">👁</span>
          <span className="block group-data-visible:hidden">🙈</span>
        </PasswordInputPrimitive.Indicator>
      </PasswordInputPrimitive.Toggle>
    </PasswordInputPrimitive.Root>
  );
}
