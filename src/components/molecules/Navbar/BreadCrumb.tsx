import LinkTo from "@components/atoms/LinkTo";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BreadCrumb() {
  const { pathname } = useRouter();

  const breadcrumbs = pathname
    .split("/")
    .slice(1)
    .map((str, i) => ({
      path: pathname.split("/").slice(1, i + 1) + "/" + str,
      label: str.replace("-", " "),
    }));
  return (
    <>
      {breadcrumbs.map((bc, i) => (
        <div
          key={bc.path}
          className={clsx(
            "mt-1 flex flex-row items-center gap-x-4 capitalize hover:text-gray-900",
            i === pathname.split("/").length - 2
              ? "text-gray-700"
              : "text-gray-500"
          )}
        >
          <span className="text-gray-300">/</span>
          {i === pathname.split("/").length - 2 ? (
            <span>{bc.label}</span>
          ) : (
            <LinkTo href={bc.path}>{bc.label}</LinkTo>
          )}
        </div>
      ))}
    </>
  );
}
