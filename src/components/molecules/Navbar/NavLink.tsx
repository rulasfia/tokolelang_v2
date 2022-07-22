import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

type ComponentProps = {
  children: string;
  href: string;
};

const NavLink = ({ children, href }: ComponentProps) => {
  const { pathname } = useRouter();
  return (
    <Link href={href} passHref>
      <a
        className={clsx(
          "px-5 py-1.5 rounded-md font-medium text-gray-700 hover:bg-amber-100",
          pathname.includes(href)
            ? "text-amber-700 bg-amber-100"
            : "bg-transparent text-gray-500"
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
