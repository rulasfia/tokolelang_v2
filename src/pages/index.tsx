import { useSession } from "next-auth/react";
import Link from "next/link";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  const { status } = useSession();

  return (
    <>
      <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-amber-50 p-4">
        <h2 className="text-[3rem] font-extrabold text-gray-700 md:text-[5rem] lg:text-[5rem]">
          Welcome to <span className="text-amber-600">Tokolelang</span>
        </h2>
        {status === "authenticated" ? (
          <Link href="/lelang-terbuka" passHref>
            <a className="mt-3 text-2xl font-medium text-gray-700 hover:underline">
              Lihat Lelang Terbuka
            </a>
          </Link>
        ) : (
          <Link href="/login" passHref>
            <a className="mt-3 text-2xl font-medium text-gray-700 hover:underline">
              Log in
            </a>
          </Link>
        )}
      </div>
    </>
  );
};

export default HomePage;
