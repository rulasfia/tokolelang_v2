import type { NextPageWithLayout } from "./_app";
import Link from "next/link";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="w-screen min-h-screen bg-amber-50 flex flex-col justify-center items-center p-4">
        <h2 className="text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700">
          Welcome to <span className="text-amber-600">Tokolelang</span>
        </h2>
        <Link href="/login" passHref>
          <a className="font-medium text-2xl hover:underline text-gray-700 mt-3">
            Log in
          </a>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
