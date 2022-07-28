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
        "px-5 py-1.5 rounded-md outline-transparent focus-visible:outline-amber-400 font-medium text-gray-700 hover:bg-amber-100",
        pathname.includes(href)
          ? "text-amber-700 bg-amber-100"
          : "bg-transparent text-gray-500"
      )}
    >
      {children}
    </LinkTo>
  );
};

export default NavLink;
