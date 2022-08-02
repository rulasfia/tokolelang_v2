import { useLink } from "@react-aria/link";
import { AriaLinkProps } from "@react-types/link";
import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";

interface ComponentProps extends AriaLinkProps {
  children: ReactNode;
  href: string;
  target?: string;
  asButton?: boolean;
  className?: string;
}

const LinkTo = (props: ComponentProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { linkProps } = useLink(props, ref);

  const { href, children, target, asButton = false, className } = props;

  if (asButton) {
    return (
      <Link href={href} passHref>
        <a
          {...linkProps}
          ref={ref}
          target={target}
          className={clsx(
            "inline-block border-2 text-center text-sm font-medium capitalize transition duration-75",
            "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
            "rounded-md py-2.5 px-6",
            "focus-visible:ring-primary-400",
            "border-primary-700 bg-primary-700 text-white hover:border-primary-600 hover:bg-primary-600 disabled:border-primary-600 disabled:bg-primary-600 dark:border-primary-600 dark:bg-primary-600 dark:text-white dark:hover:border-primary-700 dark:hover:bg-primary-700"
          )}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <Link href={href} passHref>
      <a {...linkProps} ref={ref} className={className} target={target}>
        {children}
      </a>
    </Link>
  );
};

export default LinkTo;
