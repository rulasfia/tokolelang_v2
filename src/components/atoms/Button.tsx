import { useButton } from "@react-aria/button";
import { AriaButtonProps } from "@react-types/button";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useRef } from "react";

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
        "border-2 text-sm font-medium capitalize transition duration-75",
        "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
        "rounded-md py-2 px-6",
        "focus-visible:ring-primary-400",
        "border-primary-700 bg-primary-700 text-white hover:border-primary-600 hover:bg-primary-600 disabled:border-primary-600 disabled:bg-primary-600 dark:border-primary-600 dark:bg-primary-600 dark:text-white dark:hover:border-primary-700 dark:hover:bg-primary-700"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
