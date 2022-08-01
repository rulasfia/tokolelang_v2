import LinkTo from "@components/atoms/LinkTo";
import clsx from "clsx";
import { useRouter } from "next/router";

type ComponentProps = {
  children: string;
  href: string;
};

const NavLink = ({ children, href }: ComponentProps) => {
  const { pathname } = useRouter();

  return (
    <LinkTo
      href={href}
      className={clsx(
        "relative inline-block cursor-pointer rounded-md py-3 text-base font-medium outline-none",
        "rounded-none py-2 hover:text-primary-600",
        "-mb-0.5 border-b-2 ",
        pathname.includes(href)
          ? "border-primary-600 text-primary-600"
          : "border-gray-200 text-gray-500"
      )}
    >
      {children}
    </LinkTo>
  );
};

export default NavLink;
