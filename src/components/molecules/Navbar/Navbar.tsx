import { BellIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import BreadCrumb from "./BreadCrumb";
import NavLink from "./NavLink";
import UserAvatar from "./UserAvatar";

const NAV_MENUS = [
  {
    label: "Lelang Terbuka",
    href: "/lelang-terbuka",
  },
  {
    label: "Lelang Dibuat",
    href: "/lelang-dibuat",
  },
  {
    label: "Pesan",
    href: "/pesan",
  },
  {
    label: "Riwayat",
    href: "/riwayat",
  },
];

const Navbar = () => {
  return (
    <nav className="container sticky top-0 mx-auto flex h-36 flex-col justify-center bg-white px-6 sm:px-0">
      {/* navbar top content */}
      <div className="mb-2 flex flex-row items-center justify-start gap-x-4">
        <h3 className="text-2xl font-bold text-gray-700">TokoLelang</h3>
        <BreadCrumb />
      </div>

      {/* navbar bottom content */}
      <div className="hidden w-full flex-row items-center justify-between border-b-2 border-gray-200 md:flex">
        <div className="flex flex-row items-center justify-start gap-x-12">
          {/* navigation menu */}
          {NAV_MENUS.map((menu) => (
            <NavLink href={menu.href} key={menu.href}>
              {menu.label}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-row items-center justify-end gap-x-4">
          {/* notification & profile */}
          <span className="cursor-pointer rounded-md px-2 py-2 text-gray-500 hover:bg-primary-100 hover:text-primary-600">
            <BellIcon />
          </span>

          <UserAvatar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
