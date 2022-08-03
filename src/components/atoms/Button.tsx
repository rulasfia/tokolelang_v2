import { AriaButtonProps } from "@react-types/button";
import clsx from "clsx";
import type { ForwardedRef } from "react";
import { forwardRef, ReactNode, useRef } from "react";
import { useButton } from "react-aria";

interface ComponentProps extends AriaButtonProps<"button"> {
  children: ReactNode;
  vari?: "primary" | "secondary";
  fullWidth?: boolean;
}

const Button = forwardRef(function Button(
  { vari = "primary", fullWidth = false, ...props }: ComponentProps,
  forwardedRef: ForwardedRef<unknown>
) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={clsx(
        "border-2 text-sm font-medium capitalize transition duration-75",
        "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
        "rounded-md py-2 px-6",
        //
        fullWidth && "w-full",
        //
        vari === "primary" && [
          "focus-visible:ring-primary-400",
          "border-primary-600 bg-primary-600 text-white hover:border-primary-700 hover:bg-primary-700",
          "disabled:border-primary-700 disabled:bg-primary-700 disabled:hover:border-primary-700 disabled:hover:bg-primary-700",
        ],
        //
        vari === "secondary" && [
          "focus-visible:ring-primary-400",
          "border-primary-100 bg-primary-100 text-primary-700 hover:border-primary-200 hover:bg-primary-200",
          "disabled:border-primary-200 disabled:bg-primary-200 disabled:hover:border-primary-200 disabled:hover:bg-primary-200",
        ]
      )}
    >
      {children}
    </button>
  );
});

export default Button;
