import type { ReactNode } from "react";
import { useButton } from "@react-aria/button";
import { useRef } from "react";
import clsx from "clsx";
import { AriaButtonProps } from "@react-types/button";

interface ComponentProps extends AriaButtonProps<"button"> {
  children: ReactNode;
}

const Button = (props: ComponentProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={clsx(
        "border-2 font-medium capitalize transition duration-75",
        "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
        "py-2.5 px-6 rounded-md",
        "focus-visible:ring-amber-400",
        "bg-amber-700 border-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 hover:bg-amber-600 disabled:bg-amber-600 disabled:border-amber-600 hover:border-amber-600 dark:border-amber-600 dark:hover:border-amber-700 text-white dark:text-white"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
