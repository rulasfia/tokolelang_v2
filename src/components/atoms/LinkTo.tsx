import type { ReactNode } from "react";
import { useRef } from "react";
import { useLink } from "@react-aria/link";
import clsx from "clsx";
import { AriaLinkProps } from "@react-types/link";
import Link from "next/link";

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
            "border-2 capitalize inline-block transition duration-75",
            "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
            "py-2.5 px-6 rounded-md",
            "focus-visible:ring-amber-400",
            "bg-amber-700 border-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 hover:bg-amber-600 disabled:bg-amber-600 disabled:border-amber-600 hover:border-amber-600 dark:border-amber-600 dark:hover:border-amber-700 text-white dark:text-white"
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
