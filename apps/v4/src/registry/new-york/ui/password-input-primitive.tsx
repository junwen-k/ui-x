"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { Primitive } from "@radix-ui/react-primitive";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import * as React from "react";

export type PasswordInputContextProps = Required<
  Pick<PasswordInputProps, "visible" | "onVisibleChange">
>;

const PasswordInputContext = React.createContext<PasswordInputContextProps>({
  visible: false,
  onVisibleChange: () => {},
});

function usePasswordInput() {
  const context = React.useContext(PasswordInputContext);
  if (!context) {
    throw new Error(
      "usePasswordInput must be used within a <PasswordInput />.",
    );
  }

  return context;
}

export interface PasswordInputProps {
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  children?: React.ReactNode;
}

function PasswordInput({
  visible: visibleProp,
  defaultVisible,
  onVisibleChange,
  children,
}: PasswordInputProps) {
  const [visible = false, setVisible] = useControllableState({
    prop: visibleProp,
    defaultProp: defaultVisible,
    onChange: onVisibleChange,
  });

  return (
    <PasswordInputContext.Provider
      value={{
        visible,
        onVisibleChange: setVisible,
      }}
    >
      {children}
    </PasswordInputContext.Provider>
  );
}

function PasswordInputInput(
  props: React.ComponentProps<typeof Primitive.input>,
) {
  const { visible } = usePasswordInput();

  return (
    <Primitive.input
      data-slot="password-input-input"
      type={visible ? "text" : "password"}
      {...props}
    />
  );
}

function PasswordInputToggle({
  type = "button",
  onClick,
  ...props
}: React.ComponentProps<typeof Primitive.button>) {
  const { visible, onVisibleChange } = usePasswordInput();

  return (
    <Primitive.button
      data-slot="password-input-toggle"
      type={type}
      data-state={visible ? "visible" : "hidden"}
      onClick={composeEventHandlers(onClick, () => onVisibleChange(!visible))}
      {...props}
    />
  );
}

function PasswordInputIndicator({
  ...props
}: React.ComponentProps<typeof Primitive.span>) {
  const { visible } = usePasswordInput();

  return (
    <Primitive.span
      data-slot="password-input-indicator"
      aria-hidden="true"
      data-state={visible ? "visible" : "hidden"}
      {...props}
    />
  );
}

export {
  PasswordInput as Root,
  PasswordInputInput as Input,
  PasswordInputToggle as Toggle,
  PasswordInputIndicator as Indicator,
};
