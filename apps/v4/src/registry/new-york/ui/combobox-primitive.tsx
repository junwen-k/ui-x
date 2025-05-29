"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Primitive } from "@radix-ui/react-primitive";
import * as RovingFocusGroupPrimitive from "@radix-ui/react-roving-focus";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

export type ComboboxContextProps = {
  inputValue: string;
  onInputValueChange: (
    inputValue: string,
    reason: "inputChange" | "itemSelect" | "clearClick",
  ) => void;
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTabStopId: string | null;
  onCurrentTabStopIdChange: (currentTabStopId: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  tagGroupRef: React.RefObject<React.ComponentRef<
    typeof RovingFocusGroupPrimitive.Root
  > | null>;
  disabled?: boolean;
  required?: boolean;
} & (
  | Required<Pick<ComboboxSingleProps, "type" | "value" | "onValueChange">>
  | Required<Pick<ComboboxMultipleProps, "type" | "value" | "onValueChange">>
);

const ComboboxContext = React.createContext<ComboboxContextProps>({
  type: "single",
  value: "",
  onValueChange: () => {},
  inputValue: "",
  onInputValueChange: () => {},
  onInputBlur: () => {},
  open: false,
  onOpenChange: () => {},
  currentTabStopId: null,
  onCurrentTabStopIdChange: () => {},
  inputRef: { current: null },
  tagGroupRef: { current: null },
  disabled: false,
  required: false,
});

function useCombobox() {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error("useCombobox must be used within a <Combobox />.");
  }

  return context;
}

export type ComboboxType = "single" | "multiple";

export interface ComboboxBaseProps
  extends React.ComponentProps<typeof PopoverPrimitive.Root>,
    Omit<
      React.ComponentProps<typeof CommandPrimitive>,
      "value" | "defaultValue" | "onValueChange"
    > {
  type?: ComboboxType | undefined;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (
    inputValue: string,
    reason: "inputChange" | "itemSelect" | "clearClick",
  ) => void;
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  disabled?: boolean;
  required?: boolean;
}

export type ComboboxValue<T extends ComboboxType = "single"> =
  T extends "single" ? string : T extends "multiple" ? string[] : never;

export interface ComboboxSingleProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface ComboboxMultipleProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ComboboxProps = ComboboxBaseProps &
  (ComboboxSingleProps | ComboboxMultipleProps);

function Combobox<T extends ComboboxType = "single">({
  type = "single" as T,
  open: openProp,
  onOpenChange,
  defaultOpen,
  modal,
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  inputValue: inputValueProp,
  defaultInputValue,
  onInputValueChange,
  onInputBlur,
  disabled,
  required,
  ...props
}: ComboboxProps) {
  const [value, setValue] = useControllableState<ComboboxValue<T>>({
    prop: valueProp as ComboboxValue<T>,
    defaultProp: ((defaultValue ?? type === "multiple")
      ? []
      : "") as ComboboxValue<T>,
    onChange: onValueChange as (value: ComboboxValue<T>) => void,
  });

  const [inputValue, setInputValue] = useControllableState({
    prop: inputValueProp,
    defaultProp: defaultInputValue ?? "",
  });

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const [currentTabStopId, setCurrentTabStopId] = React.useState<string | null>(
    null,
  );

  const inputRef = React.useRef<HTMLInputElement>(null);
  const tagGroupRef =
    React.useRef<React.ComponentRef<typeof RovingFocusGroupPrimitive.Root>>(
      null,
    );

  const handleInputValueChange: ComboboxContextProps["onInputValueChange"] =
    React.useCallback(
      (inputValue, reason) => {
        setInputValue(inputValue);
        onInputValueChange?.(inputValue, reason);
      },
      [setInputValue, onInputValueChange],
    );

  return (
    <ComboboxContext.Provider
      value={
        {
          type,
          value,
          onValueChange: setValue,
          inputValue,
          onInputValueChange: handleInputValueChange,
          onInputBlur,
          open,
          onOpenChange: setOpen,
          currentTabStopId,
          onCurrentTabStopIdChange: setCurrentTabStopId,
          inputRef,
          tagGroupRef,
          disabled,
          required,
        } as ComboboxContextProps
      }
    >
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen} modal={modal}>
        <CommandPrimitive data-slot="combobox" {...props}>
          {children}
          {!open && <CommandPrimitive.List aria-hidden hidden />}
        </CommandPrimitive>
      </PopoverPrimitive.Root>
    </ComboboxContext.Provider>
  );
}

function ComboboxTagGroup({
  ref,
  ...props
}: React.ComponentProps<typeof RovingFocusGroupPrimitive.Root>) {
  const { currentTabStopId, onCurrentTabStopIdChange, tagGroupRef, type } =
    useCombobox();

  if (type !== "multiple") {
    throw new Error(
      '<ComboboxTagGroup> should only be used when type is "multiple"',
    );
  }

  const composedRefs = useComposedRefs(ref, tagGroupRef);

  return (
    <RovingFocusGroupPrimitive.Root
      data-slot="combobox-tag-group"
      ref={composedRefs}
      tabIndex={-1}
      currentTabStopId={currentTabStopId}
      onCurrentTabStopIdChange={onCurrentTabStopIdChange}
      onBlur={() => onCurrentTabStopIdChange(null)}
      {...props}
    />
  );
}

export interface ComboboxTagGroupItemProps
  extends Omit<
    React.ComponentProps<typeof RovingFocusGroupPrimitive.Item>,
    "children"
  > {
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
}

const ComboboxTagGroupItemContext = React.createContext<
  Pick<ComboboxTagGroupItemProps, "value" | "disabled">
>({
  value: "",
  disabled: false,
});

function useComboboxTagGroupItem() {
  const context = React.useContext(ComboboxTagGroupItemContext);
  if (!context) {
    throw new Error(
      "<ComboboxTagGroupItemContext> should only be used within a <ComboboxTagGroupItem />.",
    );
  }

  return context;
}

function ComboboxTagGroupItem({
  onClick,
  onKeyDown,
  value: valueProp,
  disabled,
  ...props
}: ComboboxTagGroupItemProps) {
  const { value, onValueChange, inputRef, currentTabStopId, type } =
    useCombobox();

  if (type !== "multiple") {
    throw new Error(
      '<ComboboxTagGroupItem> should only be used when type is "multiple"',
    );
  }

  const lastItemValue = value.at(-1);

  return (
    <ComboboxTagGroupItemContext.Provider
      value={{ value: valueProp, disabled }}
    >
      <RovingFocusGroupPrimitive.Item
        data-slot="combobox-tag-group-item"
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Escape") {
            inputRef.current?.focus();
          }
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            inputRef.current?.focus();
          }
          if (
            event.key === "ArrowRight" &&
            currentTabStopId === lastItemValue
          ) {
            inputRef.current?.focus();
          }
          if (event.key === "Backspace" || event.key === "Delete") {
            onValueChange(value.filter((v) => v !== currentTabStopId));
            inputRef.current?.focus();
          }
        })}
        onClick={composeEventHandlers(
          onClick,
          () => disabled && inputRef.current?.focus(),
        )}
        tabStopId={valueProp}
        focusable={!disabled}
        data-disabled={disabled}
        active={valueProp === lastItemValue}
        {...props}
      />
    </ComboboxTagGroupItemContext.Provider>
  );
}

function ComboboxTagGroupItemRemove({
  onClick,
  ...props
}: React.ComponentProps<typeof Primitive.button>) {
  const { value, onValueChange, type } = useCombobox();

  if (type !== "multiple") {
    throw new Error(
      '<ComboboxTagGroupItemRemove> should only be used when type is "multiple"',
    );
  }

  const { value: valueProp, disabled } = useComboboxTagGroupItem();

  return (
    <Primitive.button
      data-slot="combobox-tag-group-item-remove"
      aria-hidden
      tabIndex={-1}
      disabled={disabled}
      onClick={composeEventHandlers(onClick, () =>
        onValueChange(value.filter((v) => v !== valueProp)),
      )}
      {...props}
    />
  );
}

function ComboboxInput({
  ref,
  onKeyDown,
  onMouseDown,
  onFocus,
  onBlur,
  ...props
}: Omit<
  React.ComponentProps<typeof CommandPrimitive.Input>,
  "value" | "onValueChange"
>) {
  const {
    type,
    inputValue,
    onInputValueChange,
    onInputBlur,
    open,
    onOpenChange,
    value,
    onValueChange,
    inputRef,
    disabled,
    required,
    tagGroupRef,
  } = useCombobox();

  const composedRefs = useComposedRefs(ref, inputRef);

  return (
    <CommandPrimitive.Input
      data-slot="combobox-input"
      ref={composedRefs}
      disabled={disabled}
      required={required}
      value={inputValue}
      onValueChange={(search) => {
        if (!open) {
          onOpenChange(true);
        }
        // Schedule input value change to the next tick.
        setTimeout(() => onInputValueChange(search, "inputChange"));
        if (!search && type === "single") {
          onValueChange("");
        }
      }}
      onKeyDown={composeEventHandlers(onKeyDown, (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          if (!open) {
            event.preventDefault();
            onOpenChange(true);
          }
        }
        if (type !== "multiple") {
          return;
        }
        if (event.key === "ArrowLeft" && !inputValue && value.length) {
          tagGroupRef.current?.focus();
        }
        if (event.key === "Backspace" && !inputValue) {
          onValueChange(value.slice(0, -1));
        }
      })}
      onMouseDown={composeEventHandlers(onMouseDown, () =>
        onOpenChange(!!inputValue || !open),
      )}
      onFocus={composeEventHandlers(onFocus, () => onOpenChange(true))}
      onBlur={composeEventHandlers(onBlur, (event) => {
        if (!event.relatedTarget?.hasAttribute("cmdk-list")) {
          onInputBlur?.(event);
        }
      })}
      {...props}
    />
  );
}

function ComboboxClear({
  onClick,
  ...props
}: React.ComponentProps<typeof Primitive.button>) {
  const { value, onValueChange, inputValue, onInputValueChange, type } =
    useCombobox();

  const isValueEmpty = type === "single" ? !value : !value.length;

  return (
    <Primitive.button
      data-slot="combobox-clear"
      disabled={isValueEmpty && !inputValue}
      onClick={composeEventHandlers(onClick, () => {
        if (type === "single") {
          onValueChange("");
        } else {
          onValueChange([]);
        }
        onInputValueChange("", "clearClick");
      })}
      {...props}
    />
  );
}

function ComboboxContent({
  onOpenAutoFocus,
  onInteractOutside,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Content
      data-slot="combobox-content"
      onOpenAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) =>
        event.preventDefault(),
      )}
      onCloseAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) =>
        event.preventDefault(),
      )}
      onInteractOutside={composeEventHandlers(onInteractOutside, (event) => {
        if (
          event.target instanceof Element &&
          event.target.hasAttribute("cmdk-input")
        ) {
          event.preventDefault();
        }
      })}
      {...props}
    />
  );
}

function ComboboxList(
  props: React.ComponentProps<typeof CommandPrimitive.List>,
) {
  return <CommandPrimitive.List data-slot="combobox-list" {...props} />;
}

const ComboboxItemContext = React.createContext({ isSelected: false });

function useComboboxItem() {
  const context = React.useContext(ComboboxItemContext);
  if (!context) {
    throw new Error(
      "<ComboboxItemContext> should only be used within a <ComboboxItem />.",
    );
  }

  return context;
}

function findComboboxItemText(children: React.ReactNode) {
  let text = "";

  React.Children.forEach(children, (child) => {
    if (text) {
      return;
    }

    if (React.isValidElement<{ children: React.ReactNode }>(child)) {
      if (child.type === ComboboxItemText) {
        text = child.props.children as string;
      } else {
        text = findComboboxItemText(child.props.children);
      }
    }
  });

  return text;
}

export interface ComboboxItemProps
  extends Omit<React.ComponentProps<typeof CommandPrimitive.Item>, "value"> {
  value: string;
}

function ComboboxItem({
  value: valueProp,
  children,
  onMouseDown,
  ...props
}: ComboboxItemProps) {
  const { type, value, onValueChange, onInputValueChange, onOpenChange } =
    useCombobox();

  const inputValue = React.useMemo(
    () => findComboboxItemText(children),
    [children],
  );

  const isSelected =
    type === "single" ? value === valueProp : value.includes(valueProp);

  return (
    <ComboboxItemContext.Provider value={{ isSelected }}>
      <CommandPrimitive.Item
        data-slot="combobox-item"
        onMouseDown={composeEventHandlers(onMouseDown, (event) =>
          event.preventDefault(),
        )}
        onSelect={() => {
          if (type === "multiple") {
            onValueChange(
              value.includes(valueProp)
                ? value.filter((v) => v !== valueProp)
                : [...value, valueProp],
            );
            onInputValueChange("", "itemSelect");
          } else {
            onValueChange(valueProp);
            onInputValueChange(inputValue, "itemSelect");
            // Schedule open change to the next tick.
            setTimeout(() => onOpenChange(false));
          }
        }}
        value={inputValue}
        {...props}
      >
        {children}
      </CommandPrimitive.Item>
    </ComboboxItemContext.Provider>
  );
}

function ComboboxItemIndicator(
  props: React.ComponentProps<typeof Primitive.span>,
) {
  const { isSelected } = useComboboxItem();

  if (!isSelected) {
    return null;
  }

  return (
    <Primitive.span
      data-slot="combobox-item-indicator"
      aria-hidden
      {...props}
    />
  );
}

export interface ComboboxItemTextProps
  extends React.ComponentProps<typeof React.Fragment> {
  children: string;
}

function ComboboxItemText(props: ComboboxItemTextProps) {
  return <React.Fragment {...props} />;
}

function ComboboxTrigger(
  props: React.ComponentProps<typeof PopoverPrimitive.Trigger>,
) {
  return <PopoverPrimitive.Trigger data-slot="combobox-trigger" {...props} />;
}

function ComboboxAnchor(
  props: React.ComponentProps<typeof PopoverPrimitive.Anchor>,
) {
  return <PopoverPrimitive.Anchor data-slot="combobox-anchor" {...props} />;
}

function ComboboxPortal(
  props: React.ComponentProps<typeof PopoverPrimitive.Portal>,
) {
  return <PopoverPrimitive.Portal data-slot="combobox-portal" {...props} />;
}

function ComboboxEmpty(
  props: React.ComponentProps<typeof CommandPrimitive.Empty>,
) {
  return <CommandPrimitive.Empty data-slot="combobox-empty" {...props} />;
}

function ComboboxLoading(
  props: React.ComponentProps<typeof CommandPrimitive.Loading>,
) {
  return <CommandPrimitive.Loading data-slot="combobox-loading" {...props} />;
}

function ComboboxGroup(
  props: React.ComponentProps<typeof CommandPrimitive.Group>,
) {
  return <CommandPrimitive.Group data-slot="combobox-group" {...props} />;
}

function ComboboxSeparator(
  props: React.ComponentProps<typeof CommandPrimitive.Separator>,
) {
  return (
    <CommandPrimitive.Separator data-slot="combobox-separator" {...props} />
  );
}

export {
  Combobox as Root,
  ComboboxTagGroup as TagGroup,
  ComboboxTagGroupItem as TagGroupItem,
  ComboboxTagGroupItemRemove as TagGroupItemRemove,
  ComboboxInput as Input,
  ComboboxClear as Clear,
  ComboboxTrigger as Trigger,
  ComboboxAnchor as Anchor,
  ComboboxPortal as Portal,
  ComboboxContent as Content,
  ComboboxList as List,
  ComboboxEmpty as Empty,
  ComboboxLoading as Loading,
  ComboboxItem as Item,
  ComboboxItemIndicator as ItemIndicator,
  ComboboxItemText as ItemText,
  ComboboxGroup as Group,
  ComboboxSeparator as Separator,
};
