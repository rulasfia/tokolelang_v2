import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { ComboBoxProps } from "@react-types/combobox";
import clsx from "clsx";
import type { ForwardedRef } from "react";
import { forwardRef, useRef } from "react";
import { useButton, useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";
import { ListBox } from "./AriaListbox";
import Popover from "./AriaPopover";

export { Item, Section } from "react-stately";

const ComboBox = forwardRef(function ComboBox<T extends object>(
  props: ComboBoxProps<T>,
  ref: ForwardedRef<unknown>
) {
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ ...props, defaultFilter: contains });

  let buttonRef = useRef(null);
  let inputRef = useRef(null);
  let listBoxRef = useRef(null);
  let popoverRef = useRef(null);

  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  let { buttonProps } = useButton(triggerProps, buttonRef);

  return (
    <div className="relative inline-flex flex-col">
      <label
        {...labelProps}
        className="hidden text-left text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <div
        className={clsx(
          `relative inline-flex flex-row overflow-hidden rounded-lg border hover:bg-gray-400`,
          state.isFocused
            ? "border-gray-200 ring-2 ring-primary-500"
            : "border-gray-200"
        )}
      >
        <input
          {...inputProps}
          ref={inputRef}
          className={clsx(
            "block disabled:cursor-not-allowed disabled:bg-gray-200 sm:text-sm",
            "border-none outline-none"
          )}
        />
        <button
          {...buttonProps}
          ref={buttonRef}
          className={clsx(
            `cursor-default border-l-2 bg-gray-100 px-1`,
            state.isFocused
              ? "text-primary-60 border-primary-500"
              : "border-gray-200 text-gray-500"
          )}
        >
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </div>
  );
});

export default ComboBox;
