"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useControlled } from "@base-ui/utils/useControlled";
import { useStableCallback } from "@base-ui/utils/useStableCallback";
import * as React from "react";

export interface PasswordInputState {
  /**
   * Whether the password is currently visible.
   */
  visible: boolean;
}

interface PasswordInputContextValue {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const PasswordInputContext =
  React.createContext<PasswordInputContextValue | null>(null);

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
  defaultVisible = false,
  onVisibleChange,
  children,
}: PasswordInputProps) {
  const [visible, setVisibleUnwrapped] = useControlled({
    controlled: visibleProp,
    default: defaultVisible,
    name: "PasswordInput",
    state: "visible",
  });

  const setVisible = useStableCallback((nextVisible: boolean) => {
    setVisibleUnwrapped(nextVisible);
    onVisibleChange?.(nextVisible);
  });

  return (
    <PasswordInputContext.Provider value={{ visible, setVisible }}>
      {children}
    </PasswordInputContext.Provider>
  );
}

function PasswordInputInput({
  render,
  ...props
}: useRender.ComponentProps<"input">) {
  const { visible } = usePasswordInput();

  return useRender({
    render,
    defaultTagName: "input",
    props: mergeProps<"input">(
      {
        "data-slot": "password-input-input",
        type: visible ? "text" : "password",
      } as React.ComponentProps<"input">,
      props,
    ),
  });
}

function PasswordInputToggle({
  render,
  ...props
}: useRender.ComponentProps<"button", PasswordInputState>) {
  const { visible, setVisible } = usePasswordInput();

  return useRender({
    render,
    state: { visible },
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        "data-slot": "password-input-toggle",
        type: "button",
        onClick: () => setVisible(!visible),
      } as React.ComponentProps<"button">,
      props,
    ),
  });
}

function PasswordInputIndicator({
  render,
  ...props
}: useRender.ComponentProps<"span", PasswordInputState>) {
  const { visible } = usePasswordInput();

  return useRender({
    render,
    state: { visible },
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        "data-slot": "password-input-indicator",
        "aria-hidden": true,
      } as React.ComponentProps<"span">,
      props,
    ),
  });
}

export {
  PasswordInput as Root,
  PasswordInputInput as Input,
  PasswordInputToggle as Toggle,
  PasswordInputIndicator as Indicator,
};
